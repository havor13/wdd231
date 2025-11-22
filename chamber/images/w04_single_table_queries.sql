USE v_art;
-- Query 1: Insert Johannes Vermeer
INSERT INTO artist (
    fname, mname, lname, dob, dod, country, local
) VALUES (
    'Johannes', NULL, 'Vermeer', 1632, 1674, 'Netherlands', 'n'
);

-- Query 2: List all artist records, sorted by last name
SELECT artist_id,
       fname,
       mname,
       lname,
       dob,
       dod,
       country,
       local
FROM artist
ORDER BY lname ASC;

-- Query 3: Update Vermeer’s date of death to 1675
UPDATE artist
SET dod = 1675
WHERE artist_id = 56;

-- Query 4: Delete Johannes Vermeer from the database
DELETE FROM artist
WHERE artist_id = 56;

USE bike;

-- Query 5: Houston customers’ first & last names and phone numbers
SELECT first_name, last_name, phone
FROM customer
WHERE city = 'Houston';

-- Query 6: Bikes with list_price >= 5000, show name, list_price, and $500 off, sorted high-to-low
SELECT product_name,
       list_price,
       (list_price - 500) AS `Discount Price`
FROM product
WHERE list_price >= 5000
ORDER BY list_price DESC;

-- Query 7: Staff (name + email) not from store_id 1
SELECT first_name, last_name, email
FROM staff
WHERE store_id <> 1;

-- Query 8: Bikes with “spider” in the product name (case-insensitive match)
SELECT product_name, model_year, list_price
FROM product
WHERE product_name LIKE '%spider%';

-- Query 9: Bike names priced between $500 and $550, lowest price first
SELECT product_name, list_price
FROM product
WHERE list_price BETWEEN 500 AND 550
ORDER BY list_price ASC;

-- Query 10: Customers with phone AND (city contains 'ach' or 'och') OR last_name = 'William', limit 5
SELECT first_name, last_name, phone, street, city, state, zip_code
FROM customer
WHERE phone IS NOT NULL
  AND (city LIKE '%ach%' OR city LIKE '%och%' OR last_name = 'William')
LIMIT 5;

-- Query 11: Products without year at the end of product_name; remove one or more trailing years; limit 14
-- MySQL 8+ REGEXP_REPLACE removes trailing " <year>" groups
SELECT product_id,
       REGEXP_REPLACE(product_name, '([[:space:]]*[0-9]{4})+$', '') AS product_name_no_year
FROM product
ORDER BY product_id
LIMIT 14;

-- Query 12: 2019 model year bikes; divide price into 3 equal payments formatted with $ and commas
SELECT product_name,
       CONCAT('$', FORMAT(list_price / 3, 2)) AS `Payment`
FROM product
WHERE model_year = 2019;

USE magazine;

DESCRIBE magazine;

USE magazine;

-- Query 13: Magazine name with 3% discount
SELECT magazineName,
       ROUND(magazinePrice * 0.97, 2) AS `Discount Price`
FROM magazine;

-- Query 14: Years since subscription started (as of 2020-12-20)
SELECT subscriberKey,
       ROUND(TIMESTAMPDIFF(MONTH, subscriptionStartDate, '2020-12-20') / 12) AS YearsSinceStart
FROM subscription;

-- Query 15: Subscription end date formatted as "Month day, Year"
SELECT subscriptionStartDate,
       subscriptionLength,
       DATE_FORMAT(
         DATE_ADD(subscriptionStartDate, INTERVAL subscriptionLength MONTH),
         '%M %e, %Y'
       ) AS SubscriptionEndFormatted
FROM subscription;
