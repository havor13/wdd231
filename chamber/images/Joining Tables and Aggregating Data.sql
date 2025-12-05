-- Question 1: Artworks from Impressionism period
SELECT title
FROM v_art.artwork
WHERE period = 'Impressionism';

-- Question 2: Artworks with subject containing 'flower'
SELECT aw.title
FROM v_art.artwork aw
JOIN v_art.artwork_keyword ak ON aw.artwork_id = ak.artwork_id
JOIN v_art.keyword k ON ak.keyword_id = k.keyword_id
WHERE k.keyword LIKE '%flower%';

-- Question 3: Artists and their related artworks
SELECT ar.fname, ar.lname, aw.title
FROM v_art.artist ar
JOIN v_art.artwork aw ON ar.artist_id = aw.artist_id;

-- Question 4: Subscriptions with magazine and subscriber names
SELECT m.magazineName, s.subscriberLastName, s.subscriberFirstName
FROM magazine.subscription sub
JOIN magazine.magazine m ON sub.magazineKey = m.magazineKey
JOIN magazine.subscriber s ON sub.subscriberKey = s.subscriberKey
ORDER BY m.magazineName;

-- Question 5: Magazines subscribed by Samantha Sanders
SELECT m.magazineName
FROM magazine.subscription sub
JOIN magazine.magazine m ON sub.magazineKey = m.magazineKey
JOIN magazine.subscriber s ON sub.subscriberKey = s.subscriberKey
WHERE s.subscriberFirstName = 'Samantha' AND s.subscriberLastName = 'Sanders';


-- Question 6: First five Customer Service employees by last name
SELECT e.first_name, e.last_name
FROM employees e
JOIN dept_emp de ON e.emp_no = de.emp_no
JOIN departments d ON de.dept_no = d.dept_no
WHERE d.dept_name = 'Customer Service'
ORDER BY e.last_name
LIMIT 5;

-- Query 7: Get Berni Genin’s most recent salary and departmen
SELECT e.first_name, e.last_name, d.dept_name, s.salary
FROM employees e
JOIN dept_emp de ON e.emp_no = de.emp_no
JOIN departments d ON de.dept_no = d.dept_no
JOIN salaries s ON e.emp_no = s.emp_no
WHERE e.first_name = 'Berni' AND e.last_name = 'Genin'
ORDER BY s.from_date DESC
LIMIT 1;



-- Question 8: Average quantity of all bike stocks (rounded)
SELECT ROUND(AVG(quantity)) AS average_quantity
FROM bike.stock;

-- Question 9: Bikes that need to be reordered (quantity = 0), shown once
SELECT DISTINCT p.product_name
FROM bike.stock s
JOIN bike.product p ON s.product_id = p.product_id
WHERE s.quantity = 0
ORDER BY p.product_name;

-- Question 10: Inventory count per category at Baldwin Bikes (store_id = 2)
SELECT c.category_name, SUM(s.quantity) AS total_quantity
FROM bike.stock s
JOIN bike.product p ON s.product_id = p.product_id
JOIN bike.category c ON p.category_id = c.category_id
WHERE s.store_id = 2
GROUP BY c.category_name
ORDER BY total_quantity;

-- Question 11: Total number of employees
SELECT COUNT(*) AS total_employees
FROM employees;

-- Question 12: Departments with average salary below 60,000
SELECT d.dept_name, FORMAT(AVG(s.salary), 2) AS avg_salary
FROM employees e
JOIN salaries s ON e.emp_no = s.emp_no
JOIN dept_emp de ON e.emp_no = de.emp_no
JOIN departments d ON de.dept_no = d.dept_no
GROUP BY d.dept_name
HAVING AVG(s.salary) < 60000;

-- Question 13: Number of female employees per department--
SELECT d.dept_name, COUNT(*) AS female_count
FROM employees e
JOIN dept_emp de ON e.emp_no = de.emp_no
JOIN departments d ON de.dept_no = d.dept_no
WHERE e.gender = 'F'
GROUP BY d.dept_name
ORDER BY d.dept_name;



