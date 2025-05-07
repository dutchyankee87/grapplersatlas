-- Add unique constraint on gyms table for name and address
ALTER TABLE gyms ADD CONSTRAINT name_address_idx UNIQUE (name, address); 