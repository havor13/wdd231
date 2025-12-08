-- W06 Project: University Database
-- Forward engineer schema, load data, and required queries
-- RDBMS: MySQL

/* =========================
   1) Forward Engineer (Schema)
   ========================= */

DROP DATABASE IF EXISTS University;
CREATE DATABASE University;
USE University;

-- Colleges
CREATE TABLE College (
  CollegeID INT PRIMARY KEY,
  CollegeName VARCHAR(150) NOT NULL
);

-- Departments (each belongs to a college)
CREATE TABLE Department (
  DepartmentID INT PRIMARY KEY,
  DepartmentName VARCHAR(150) NOT NULL,
  DepartmentCode VARCHAR(20) NOT NULL,
  CollegeID INT NOT NULL,
  FOREIGN KEY (CollegeID) REFERENCES College(CollegeID)
);

-- Courses (catalog info)
CREATE TABLE Course (
  CourseID INT PRIMARY KEY,
  DepartmentID INT NOT NULL,
  CourseNum INT NOT NULL,
  CourseTitle VARCHAR(200) NOT NULL,
  Credits INT NOT NULL,
  FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID),
  UNIQUE (DepartmentID, CourseNum)  -- natural uniqueness like ECON 150
);

-- Terms
CREATE TABLE Term (
  TermID INT PRIMARY KEY,
  TermName VARCHAR(20) NOT NULL,  -- 'Winter', 'Fall'
  TermYear YEAR NOT NULL
);

-- Faculty
CREATE TABLE Faculty (
  FacultyID INT PRIMARY KEY,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  DepartmentID INT NOT NULL,
  FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

-- Sections (central table; one faculty teaches a section)
CREATE TABLE Section (
  SectionID INT PRIMARY KEY,
  CourseID INT NOT NULL,
  SectionNumber INT NOT NULL,
  FacultyID INT NOT NULL,
  TermID INT NOT NULL,
  Capacity INT NOT NULL,
  FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
  FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID),
  FOREIGN KEY (TermID) REFERENCES Term(TermID),
  UNIQUE (CourseID, TermID, SectionNumber) -- ensure uniqueness per offering
);

-- Students
CREATE TABLE Student (
  StudentID INT PRIMARY KEY,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  Gender CHAR(1) NOT NULL,
  City VARCHAR(100) NOT NULL,
  State VARCHAR(50) NOT NULL,
  BirthDate DATE NOT NULL
);

-- Enrollments (composite key: student enrolls in a section)
CREATE TABLE Enrollment (
  StudentID INT NOT NULL,
  SectionID INT NOT NULL,
  PRIMARY KEY (StudentID, SectionID),
  FOREIGN KEY (StudentID) REFERENCES Student(StudentID),
  FOREIGN KEY (SectionID) REFERENCES Section(SectionID)
);

/* =========================
   2) Insert Statements (Load Data)
   ========================= */

-- Colleges (from Catalog View)
INSERT INTO College (CollegeID, CollegeName) VALUES
  (1, 'College of Physical Science and Engineering'),
  (2, 'College of Business and Communication'),
  (3, 'College of Language and Letters');

-- Departments (map department codes to colleges)
INSERT INTO Department (DepartmentID, DepartmentName, DepartmentCode, CollegeID) VALUES
  (10, 'Computer Information Technology', 'ITM', 1),
  (20, 'Economics', 'ECON', 2),
  (30, 'Humanities and Philosophy', 'HUM', 3);

-- Courses
INSERT INTO Course (CourseID, DepartmentID, CourseNum, CourseTitle, Credits) VALUES
  (1001, 10, 111, 'Intro to Databases', 3),           -- ITM 111
  (2001, 20, 388, 'Econometrics', 4),                  -- ECON 388
  (2002, 20, 150, 'Micro Economics', 3),               -- ECON 150
  (3001, 30, 376, 'Classical Heritage', 2);            -- HUM 376

-- Terms
INSERT INTO Term (TermID, TermName, TermYear) VALUES
  (5001, 'Fall',   2019),
  (5002, 'Winter', 2018);

-- Faculty (from Section View)
INSERT INTO Faculty (FacultyID, FirstName, LastName, DepartmentID) VALUES
  (900, 'Marty', 'Morring', 10),
  (901, 'Nate',  'Norris',  20),
  (902, 'Ben',   'Barrus',  20),
  (903, 'John',  'Jensen',  30),
  (904, 'Bill',  'Barney',  10);

-- Sections (course offerings with capacity and one faculty per section)
-- 2019 Fall
INSERT INTO Section (SectionID, CourseID, SectionNumber, FacultyID, TermID, Capacity) VALUES
  (7001, 1001, 1, 900, 5001, 30),  -- ITM 111 Sec 1, Marty Morring, cap 30
  (7002, 2002, 1, 901, 5001, 50),  -- ECON 150 Sec 1, Nate Norris, cap 50
  (7003, 2002, 2, 901, 5001, 50),  -- ECON 150 Sec 2, Nate Norris, cap 50
  (7004, 2001, 1, 902, 5001, 35),  -- ECON 388 Sec 1, Ben Barrus, cap 35
  (7005, 3001, 1, 903, 5001, 30);  -- HUM 376 Sec 1, John Jensen, cap 30

-- 2018 Winter
INSERT INTO Section (SectionID, CourseID, SectionNumber, FacultyID, TermID, Capacity) VALUES
  (7101, 1001, 2, 900, 5002, 30),  -- ITM 111 Sec 2, Marty Morring, cap 30
  (7102, 1001, 3, 904, 5002, 35),  -- ITM 111 Sec 3, Bill Barney, cap 35
  (7103, 2002, 1, 901, 5002, 50),  -- ECON 150 Sec 1, Nate Norris, cap 50
  (7104, 2002, 2, 901, 5002, 50),  -- ECON 150 Sec 2, Nate Norris, cap 50
  (7105, 3001, 1, 903, 5002, 30);  -- HUM 376 Sec 1, John Jensen, cap 30

-- Students (from Student View)
INSERT INTO Student (StudentID, FirstName, LastName, Gender, City, State, BirthDate) VALUES
  (1,  'Paul',    'Miller',   'M', 'Dallas',   'TX', '1996-02-22'),
  (2,  'Katie',   'Smith',    'F', 'Provo',    'UT', '1995-07-22'),
  (3,  'Kelly',   'Jones',    'F', 'Provo',    'UT', '1998-06-22'),
  (4,  'Devon',   'Merrill',  'M', 'Mesa',     'AZ', '2000-07-22'),
  (5,  'Mandy',   'Murdock',  'F', 'Topeka',   'KS', '1996-11-22'),
  (6,  'Alece',   'Adams',    'F', 'Rigby',    'ID', '1997-05-22'),
  (7,  'Bryce',   'Carlson',  'M', 'Bozeman',  'MT', '1997-11-22'),
  (8,  'Preston', 'Larsen',   'M', 'Decatur',  'TN', '1996-09-22'),
  (9,  'Julia',   'Madsen',   'F', 'Rexburg',  'ID', '1998-09-22'),
  (10, 'Susan',   'Sorensen', 'F', 'Mesa',     'AZ', '1998-08-09');

-- Enrollments (composite key StudentID + SectionID)
-- Logic given in Enrollment View
INSERT INTO Enrollment (StudentID, SectionID) VALUES
  (6,  7102), -- Alece -> ITM 111 Winter 2018 Section 3
  (7,  7101), -- Bryce -> ITM 111 Winter 2018 Section 2
  (7,  7103), -- Bryce -> ECON 150 Winter 2018 Section 1
  (7,  7105), -- Bryce -> HUM 376 Winter 2018 Section 1
  (4,  7005), -- Devon -> HUM 376 Fall 2019 Section 1
  (9,  7104), -- Julia -> ECON 150 Winter 2018 Section 2
  (2,  7004), -- Katie -> ECON 388 Fall 2019 Section 1
  (3,  7004), -- Kelly -> ECON 388 Fall 2019 Section 1
  (5,  7004), -- Mandy -> ECON 388 Fall 2019 Section 1
  (5,  7005), -- Mandy -> HUM 376 Fall 2019 Section 1
  (1,  7001), -- Paul  -> ITM 111 Fall 2019 Section 1
  (1,  7003), -- Paul  -> ECON 150 Fall 2019 Section 2
  (8,  7104), -- Preston -> ECON 150 Winter 2018 Section 2
  (10, 7101); -- Susan -> ITM 111 Winter 2018 Section 2

/* =========================
   3) Queries (labelled per rubric)
   ========================= */

-- Query 1: Students, and their birthdays, born in September. Format date like 'Month D, YYYY'. Sort by last name.
SELECT
  FirstName,
  LastName,
  DATE_FORMAT(BirthDate, '%M %e, %Y') AS Birthday
FROM Student
WHERE MONTH(BirthDate) = 9
ORDER BY LastName;

-- Query 2: Student's age in years and days as of Jan 5, 2017. Assume 365-day year; use modulus for days.
SELECT
  FirstName,
  LastName,
  FLOOR(DATEDIFF('2017-01-05', BirthDate) / 365) AS AgeYears,
  MOD(DATEDIFF('2017-01-05', BirthDate), 365)    AS AgeDays,
  CONCAT(
    FLOOR(DATEDIFF('2017-01-05', BirthDate) / 365), ' years, ',
    MOD(DATEDIFF('2017-01-05', BirthDate), 365), ' days'
  ) AS AgeYearsAndDays
FROM Student
ORDER BY DATEDIFF('2017-01-05', BirthDate) DESC;

-- Query 3: Students taught by John Jensen. Sorted by student last name.
SELECT DISTINCT
  s.FirstName,
  s.LastName
FROM Student s
JOIN Enrollment e ON e.StudentID = s.StudentID
JOIN Section sec  ON sec.SectionID = e.SectionID
JOIN Faculty f    ON f.FacultyID = sec.FacultyID
WHERE f.FirstName = 'John' AND f.LastName = 'Jensen'
ORDER BY s.LastName;

-- Query 4: Instructors Bryce will have in Winter 2018. Sort by faculty last name.
SELECT DISTINCT
  f.FirstName,
  f.LastName
FROM Student s
JOIN Enrollment e ON e.StudentID = s.StudentID
JOIN Section sec  ON sec.SectionID = e.SectionID
JOIN Faculty f    ON f.FacultyID = sec.FacultyID
JOIN Term t       ON t.TermID = sec.TermID
WHERE s.FirstName = 'Bryce' AND s.LastName = 'Carlson'
  AND t.TermName = 'Winter' AND t.TermYear = 2018
ORDER BY f.LastName;

-- Query 5: Students that take Econometrics in Fall 2019. Sort by student last name.
SELECT
  s.FirstName,
  s.LastName
FROM Student s
JOIN Enrollment e ON e.StudentID = s.StudentID
JOIN Section sec  ON sec.SectionID = e.SectionID
JOIN Course c     ON c.CourseID = sec.CourseID
JOIN Term t       ON t.TermID = sec.TermID
WHERE c.CourseTitle = 'Econometrics'
  AND t.TermName = 'Fall' AND t.TermYear = 2019
ORDER BY s.LastName;

-- Query 6: Report showing all of Bryce Carlson's courses for Winter 2018. Sort by course name.
SELECT DISTINCT
  c.CourseTitle
FROM Student s
JOIN Enrollment e ON e.StudentID = s.StudentID
JOIN Section sec  ON sec.SectionID = e.SectionID
JOIN Course c     ON c.CourseID = sec.CourseID
JOIN Term t       ON t.TermID = sec.TermID
WHERE s.FirstName = 'Bryce' AND s.LastName = 'Carlson'
  AND t.TermName = 'Winter' AND t.TermYear = 2018
ORDER BY c.CourseTitle;

-- Query 7: The number of enrollments for Fall 2019.
SELECT COUNT(*) AS Fall2019Enrollments
FROM Enrollment e
JOIN Section sec ON sec.SectionID = e.SectionID
JOIN Term t      ON t.TermID = sec.TermID
WHERE t.TermName = 'Fall' AND t.TermYear = 2019;

-- Query 8: The number of courses in each college. Sort by college name.
SELECT
  col.CollegeName,
  COUNT(c.CourseID) AS NumCourses
FROM College col
JOIN Department d ON d.CollegeID = col.CollegeID
JOIN Course c     ON c.DepartmentID = d.DepartmentID
GROUP BY col.CollegeID, col.CollegeName
ORDER BY col.CollegeName;

-- Query 9: The total number of students each professor can teach in Winter 2018. Sort by total capacity.
SELECT
  f.FirstName,
  f.LastName,
  SUM(sec.Capacity) AS TeachingCapacity
FROM Faculty f
JOIN Section sec ON sec.FacultyID = f.FacultyID
JOIN Term t      ON t.TermID = sec.TermID
WHERE t.TermName = 'Winter' AND t.TermYear = 2018
GROUP BY f.FacultyID, f.FirstName, f.LastName
ORDER BY TeachingCapacity DESC;

-- Query 10: Each student's total credit load for Fall 2019 (>3). Sort by credit load descending.
SELECT
  s.FirstName,
  s.LastName,
  SUM(c.Credits) AS CreditLoad
FROM Student s
JOIN Enrollment e ON e.StudentID = s.StudentID
JOIN Section sec  ON sec.SectionID = e.SectionID
JOIN Course c     ON c.CourseID = sec.CourseID
JOIN Term t       ON t.TermID = sec.TermID
WHERE t.TermName = 'Fall' AND t.TermYear = 2019
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING SUM(c.Credits) > 3
ORDER BY CreditLoad DESC;
