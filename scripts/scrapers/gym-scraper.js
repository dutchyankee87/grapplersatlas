"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var serpapi_1 = require("serpapi");
var dotenv = require("dotenv");
var url_1 = require("url");
var path_1 = require("path");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_1.dirname)(__filename);
// Load environment variables
dotenv.config();
// Initialize Supabase client
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.SUPABASE_ANON_KEY;
var serpApiKey = process.env.SERPAPI_KEY;
if (!supabaseUrl || !supabaseKey || !serpApiKey) {
    throw new Error('Missing required environment variables');
}
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Function to search for BJJ gyms in a city
function searchGymsInCity(city, country) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    params = {
                        api_key: serpApiKey,
                        engine: 'google_maps',
                        q: "Brazilian Jiu Jitsu gym ".concat(city, " ").concat(country),
                        type: 'search',
                        ll: '@0,0,15z', // This will be replaced by actual coordinates
                        data: '!4m5!3m4!1s0x0:0x0!8m2!3d0!4d0'
                    };
                    return [4 /*yield*/, (0, serpapi_1.getJson)(params)];
                case 1:
                    response = _a.sent();
                    results = response.local_results || [];
                    return [2 /*return*/, results.map(function (result) {
                            var _a, _b;
                            return ({
                                name: result.title,
                                address: result.address,
                                phone: result.phone,
                                website: result.website,
                                rating: result.rating,
                                reviews_count: result.reviews,
                                latitude: (_a = result.gps_coordinates) === null || _a === void 0 ? void 0 : _a.latitude,
                                longitude: (_b = result.gps_coordinates) === null || _b === void 0 ? void 0 : _b.longitude,
                                city: city,
                                country: country,
                                last_updated: new Date().toISOString()
                            });
                        })];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error searching gyms in ".concat(city, ", ").concat(country, ":"), error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to save gyms to Supabase
function saveGymsToSupabase(gyms) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, supabase
                            .from('gyms')
                            .upsert(gyms, {
                            onConflict: 'name,address',
                            ignoreDuplicates: false
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    console.log("Successfully saved ".concat(gyms.length, " gyms to Supabase"));
                    return [2 /*return*/, data];
                case 2:
                    error_2 = _b.sent();
                    console.error('Error saving to Supabase:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Main function to run the scraper
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var cities, _i, cities_1, _a, city, country, gyms;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cities = [
                        { city: 'New York', country: 'USA' },
                        { city: 'Los Angeles', country: 'USA' },
                        { city: 'London', country: 'UK' },
                        // Add more cities as needed
                    ];
                    _i = 0, cities_1 = cities;
                    _b.label = 1;
                case 1:
                    if (!(_i < cities_1.length)) return [3 /*break*/, 7];
                    _a = cities_1[_i], city = _a.city, country = _a.country;
                    console.log("Searching for gyms in ".concat(city, ", ").concat(country, "..."));
                    return [4 /*yield*/, searchGymsInCity(city, country)];
                case 2:
                    gyms = _b.sent();
                    if (!(gyms.length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, saveGymsToSupabase(gyms)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: 
                // Add a delay to avoid rate limiting
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 5:
                    // Add a delay to avoid rate limiting
                    _b.sent();
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Run the scraper
main().catch(console.error);
