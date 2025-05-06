import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function searchGyms(page, location) {
  await page.goto('https://www.google.com/maps');
  await page.waitForSelector('#searchboxinput');
  await page.type('#searchboxinput', `bjj gym ${location}`);
  await page.keyboard.press('Enter');
  await page.waitForSelector('[role="feed"]');
  
  // Wait for results to load
  await page.waitForTimeout(2000);
  
  const gyms = await page.evaluate(() => {
    const items = document.querySelectorAll('[role="feed"] > div');
    return Array.from(items).map(item => {
      const nameEl = item.querySelector('[role="heading"]');
      const ratingEl = item.querySelector('[role="img"]');
      const addressEl = item.querySelector('div[role="button"] + div');
      
      return {
        name: nameEl ? nameEl.textContent : '',
        rating: ratingEl ? parseFloat(ratingEl.getAttribute('aria-label')) : null,
        address: addressEl ? addressEl.textContent : '',
      };
    });
  });
  
  return gyms;
}

async function scrapeGymDetails(page, gym) {
  // Click on the gym to open details
  await page.click(`text/${gym.name}`);
  await page.waitForSelector('[data-attrid="title"]');
  
  const details = await page.evaluate(() => {
    const website = document.querySelector('a[data-item-id="authority"]')?.href;
    const phone = document.querySelector('[data-tooltip="Copy phone number"]')?.textContent;
    const hours = {};
    const hoursTable = document.querySelector('table');
    
    if (hoursTable) {
      const rows = hoursTable.querySelectorAll('tr');
      rows.forEach(row => {
        const [day, time] = row.querySelectorAll('td');
        if (day && time) {
          hours[day.textContent.trim()] = time.textContent.trim();
        }
      });
    }
    
    return {
      website,
      phone,
      openingHours: hours,
    };
  });
  
  return {
    ...gym,
    ...details,
  };
}

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Get cities from Supabase
  const { data: cities, error } = await supabase
    .from('cities')
    .select('id, name, country');
  
  if (error) {
    console.error('Error fetching cities:', error);
    return;
  }
  
  for (const city of cities) {
    console.log(`Scraping gyms in ${city.name}, ${city.country}`);
    
    const gyms = await searchGyms(page, `${city.name}, ${city.country}`);
    
    for (const gym of gyms) {
      const details = await scrapeGymDetails(page, gym);
      
      // Store in Supabase
      const { error: insertError } = await supabase
        .from('gyms')
        .upsert({
          city_id: city.id,
          name: details.name,
          address: details.address,
          website: details.website,
          phone: details.phone,
          rating: details.rating,
          opening_hours: details.openingHours,
        });
      
      if (insertError) {
        console.error('Error inserting gym:', insertError);
      }
    }
  }
  
  await browser.close();
}

main().catch(console.error);