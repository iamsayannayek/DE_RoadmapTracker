import { useState, useEffect, useMemo } from "react";
import type { MouseEvent, ElementType } from "react";
import {
  CheckCircle2,
  Circle,
  Database,
  Code,
  Server,
  Workflow,
  Cloud,
  Trophy,
  Activity,
  Calendar,
  Clock,
  Rocket,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  List,
  Youtube,
  BookOpen,
  Trash2,
  Link as LinkIcon,
  X,
  Plus,
} from "lucide-react";

// --- Helper Functions for Dates ---
const addDays = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// --- Smart Search Term Mapping ---
const typeSearchMap: Record<string, string> = {
  SQL: "SQL",
  Python: "Python 3",
  DB: "Database Data Warehouse",
  Pipeline: "Apache Airflow ETL",
  BigData: "Apache Spark PySpark Data Engineering",
  Cloud: "AWS Cloud S3",
  Project: "Data Engineering Project",
};

// --- TypeScript Interfaces ---
interface Task {
  id: string;
  month: number;
  phase: string;
  title: string;
  type: string;
  estDays: number;
  subtopics?: string[];
}

interface CircularProgressProps {
  percentage: number;
  color: string;
  label: string;
  icon: ElementType;
}

interface CustomResource {
  id: string;
  title: string;
  url: string;
}

// --- Comprehensive Day-by-Day Curriculum ---
const curriculumData: Task[] = [
  // ==========================================
  // MONTH 1: SQL FOUNDATIONS
  // ==========================================
  {
    id: "m1d1",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 1: What is a Database? Tables, Rows, and Columns",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Relational vs Non-Relational overview",
      "What is an RDBMS?",
      "Understanding Tables, Records (Rows), and Fields (Columns)",
      "Basic Data Types (INT, VARCHAR, DATE)",
    ],
  },
  {
    id: "m1d2",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 2: First Query! The SELECT and LIMIT statements",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "SELECT * (Selecting everything)",
      "Selecting specific columns",
      "Using LIMIT or TOP to restrict results",
      "Aliasing columns using AS",
    ],
  },
  {
    id: "m1d3",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 3: Filtering Data with WHERE",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "The WHERE clause syntax",
      "Equality (=) and Inequality (!= or <>)",
      "Greater than (>) and Less than (<)",
    ],
  },
  {
    id: "m1d4",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 4: Multiple Filters (AND, OR, NOT)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Combining conditions with AND",
      "Alternative conditions with OR",
      "Excluding results with NOT",
      "Order of operations (using parentheses)",
    ],
  },
  {
    id: "m1d5",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 5: Searching for Text Patterns using LIKE",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "The LIKE operator",
      "The % wildcard (any string of characters)",
      "The _ wildcard (single character)",
      "Case sensitivity (ILIKE in Postgres)",
    ],
  },
  {
    id: "m1d6",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 6: Handling Lists using IN and BETWEEN",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Filtering within a range using BETWEEN",
      "Filtering against a list using IN (...)",
      "Using NOT IN and NOT BETWEEN",
    ],
  },
  {
    id: "m1d7",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 7: Sorting your results with ORDER BY",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Using ORDER BY column_name",
      "Ascending (ASC) vs Descending (DESC)",
      "Sorting by multiple columns",
    ],
  },
  {
    id: "m1d8",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 8: Basic Math in SQL",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Addition, Subtraction, Multiplication, Division",
      "Calculating percentages between columns",
      "Rounding numbers using ROUND()",
    ],
  },
  {
    id: "m1d9",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 9: Aggregations Part 1 (COUNT, SUM)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Counting total rows with COUNT(*)",
      "Counting non-null values with COUNT(column)",
      "Adding up values with SUM()",
    ],
  },
  {
    id: "m1d10",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 10: Aggregations Part 2 (MIN, MAX, AVG)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Finding the lowest value with MIN()",
      "Finding the highest value with MAX()",
      "Calculating averages with AVG()",
    ],
  },
  {
    id: "m1d11",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 11: Grouping Data together using GROUP BY",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "How GROUP BY works with aggregates",
      "Grouping by a single column (e.g., total sales per department)",
      "Grouping by multiple columns",
    ],
  },
  {
    id: "m1d12",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 12: Filtering grouped data using HAVING",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Difference between WHERE and HAVING",
      "Using HAVING with COUNT/SUM",
      "Order of execution (WHERE -> GROUP BY -> HAVING)",
    ],
  },
  {
    id: "m1d13",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 13: Primary Keys and Foreign Keys",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "What makes a Primary Key unique?",
      "How Foreign Keys link tables together",
      "The concept of Referential Integrity",
    ],
  },
  {
    id: "m1d14",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 14: Combining Tables: INNER JOIN",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "INNER JOIN syntax and logic",
      "Joining on Primary/Foreign Keys",
      "Aliasing table names (e.g., FROM users u)",
    ],
  },
  {
    id: "m1d15",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 15: LEFT JOIN and RIGHT JOIN",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "When to use a LEFT JOIN (keeping all base records)",
      "Handling NULLs that result from a LEFT JOIN",
      "Understanding RIGHT JOIN (and why it is rarely used)",
    ],
  },
  {
    id: "m1d16",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 16: FULL OUTER JOIN & CROSS JOIN",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "FULL OUTER JOIN logic",
      "Creating combinations with CROSS JOIN",
      "Practice: Identify which join to use in 3 scenarios",
    ],
  },
  {
    id: "m1d17",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 17: Conditional Logic with CASE WHEN",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "CASE WHEN ... THEN ... ELSE ... END syntax",
      "Creating new categorical columns from data",
      "Using CASE WHEN inside an aggregate function (e.g., SUM(CASE WHEN))",
    ],
  },
  {
    id: "m1d18",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 18: Working with NULL values",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Checking for nulls with IS NULL / IS NOT NULL",
      "Replacing nulls using COALESCE()",
      "Null behavior in mathematical operations",
    ],
  },
  {
    id: "m1d19",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 19: Working with Text Functions",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "UPPER() and LOWER()",
      "Combining strings with CONCAT() or ||",
      "Extracting parts of text with SUBSTRING()",
      "Trimming whitespace with TRIM()",
    ],
  },
  {
    id: "m1d20",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 20: Working with Date Functions",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Getting current date (CURRENT_DATE)",
      "Extracting parts of a date (EXTRACT(MONTH FROM date))",
      "Adding/Subtracting intervals (DATE_ADD or INTERVAL)",
    ],
  },
  {
    id: "m1d21",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 21: Subqueries",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Subqueries in the WHERE clause (e.g., WHERE id IN (SELECT...))",
      "Subqueries in the SELECT clause",
      "Subqueries in the FROM clause (Derived tables)",
    ],
  },
  {
    id: "m1d22",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 22: CTEs (Common Table Expressions)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "The WITH clause syntax",
      "Why CTEs are better for readability than Subqueries",
      "Chaining multiple CTEs together",
    ],
  },
  {
    id: "m1d23",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 23: Window Functions Intro (OVER, PARTITION BY)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "What is a Window Function vs GROUP BY?",
      "The OVER() clause",
      "Creating groups within the window using PARTITION BY",
    ],
  },
  {
    id: "m1d24",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 24: Window Functions (Ranking)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "ROW_NUMBER() - assigning unique sequence",
      "RANK() vs DENSE_RANK()",
      "Sorting inside the window with ORDER BY",
    ],
  },
  {
    id: "m1d25",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 25: Window Functions (LEAD, LAG)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Accessing previous row data with LAG()",
      "Accessing next row data with LEAD()",
      "Calculating Month-over-Month growth",
    ],
  },
  {
    id: "p1",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "PROJECT: E-Commerce Data Analysis",
    type: "Project",
    estDays: 5,
    subtopics: [
      "1. Find & download an E-commerce CSV dataset from Kaggle",
      "2. Import the CSVs into a local database (DBeaver/PostgreSQL)",
      "3. Write a CTE query to find the Top 5 customers by revenue",
      "4. Write a Window Function query to calculate Monthly Sales Growth",
      "5. Save your queries in a .sql file to upload to your GitHub later",
    ],
  },

  // ==========================================
  // MONTH 2: PYTHON PROGRAMMING
  // ==========================================
  {
    id: "m2d1",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 1: Environment Setup",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Download and Install Python",
      "Install VS Code",
      "Install Python extension in VS Code",
      'Write and run your first print("Hello World") script',
    ],
  },
  {
    id: "m2d2",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 2: Variables and Data Types",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Strings (Text)",
      "Integers and Floats (Numbers)",
      "Booleans (True/False)",
      "Using the type() function",
    ],
  },
  {
    id: "m2d3",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 3: Basic Math & String manipulation",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Math operators (+, -, *, /, //, %)",
      'f-strings for formatting text (e.g., f"Hello {name}")',
      "String methods (.upper(), .replace(), .split())",
    ],
  },
  {
    id: "m2d4",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 4: Introduction to Lists",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Creating a List (brackets [])",
      "Zero-based indexing (Accessing list[0])",
      "List slicing (list[1:3])",
    ],
  },
  {
    id: "m2d5",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 5: Modifying Lists",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Adding items: .append() and .insert()",
      "Removing items: .remove() and .pop()",
      "Finding list length with len()",
    ],
  },
  {
    id: "m2d6",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 6: Dictionaries",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Creating Dictionaries (curly braces {})",
      "Key-Value pair concept",
      "Accessing values by key",
      "Adding and updating keys",
    ],
  },
  {
    id: "m2d7",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 7: Tuples and Sets",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Tuples (immutable lists)",
      "Sets (unordered, unique items only)",
      "When to use each data structure",
    ],
  },
  {
    id: "m2d8",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 8: Logic and Conditionals (if/else)",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Comparison operators (==, !=, >, <)",
      "The if, elif, and else statements",
      "Logical operators (and, or, not)",
      "Understanding indentation in Python",
    ],
  },
  {
    id: "m2d9",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: 'Day 9: The "for" loop',
    type: "Python",
    estDays: 1,
    subtopics: [
      "Iterating through a List",
      "Iterating through Dictionary keys/values",
      "Using the range() function",
    ],
  },
  {
    id: "m2d10",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: 'Day 10: The "while" loop',
    type: "Python",
    estDays: 1,
    subtopics: [
      "While loop syntax",
      "Preventing infinite loops",
      'Using "break" to exit early',
      'Using "continue" to skip an iteration',
    ],
  },
  {
    id: "m2d11",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 11: Defining Functions",
    type: "Python",
    estDays: 1,
    subtopics: [
      'The "def" keyword',
      "Writing reusable code blocks",
      "Calling a function",
    ],
  },
  {
    id: "m2d12",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 12: Function Parameters and Returns",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Passing arguments into functions",
      "Setting default parameter values",
      'Using the "return" statement to output data',
    ],
  },
  {
    id: "m2d13",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 13: Scope and Modules",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Local vs Global variables",
      "Importing built-in modules (e.g., import math, import datetime)",
      "Creating and importing your own .py files",
    ],
  },
  {
    id: "m2d14",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 14: Working with JSON",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Importing the json module",
      "json.loads() (String to Dictionary)",
      "json.dumps() (Dictionary to String)",
    ],
  },
  {
    id: "m2d15",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 15: File I/O (Reading/Writing)",
    type: "Python",
    estDays: 1,
    subtopics: [
      'Opening a text file using "with open()"',
      "Reading lines vs Reading whole file",
      "Writing and appending to a CSV file manually",
    ],
  },
  {
    id: "m2d16",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 16: Error Handling (try/except)",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Why programs crash (Exceptions)",
      "The try and except block",
      "Catching specific errors (e.g., FileNotFoundError)",
      "The finally block",
    ],
  },
  {
    id: "m2d17",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 17: Virtual Environments & Pip",
    type: "Python",
    estDays: 1,
    subtopics: [
      "What is pip? Installing external libraries",
      "Creating a virtual environment (python -m venv venv)",
      "Activating the venv",
      "Creating a requirements.txt file",
    ],
  },
  {
    id: "m2d18",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 18: APIs and the Requests Library",
    type: "Python",
    estDays: 1,
    subtopics: [
      "What is a REST API?",
      "pip install requests",
      "Making a GET request (requests.get())",
      "Checking status codes (200 is good, 404 is bad)",
    ],
  },
  {
    id: "m2d19",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 19: Parsing API Responses",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Converting response to JSON (response.json())",
      "Navigating deeply nested dictionaries to extract data",
      "Looping through API results to build a List",
    ],
  },
  {
    id: "m2d20",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 20: Intro to Pandas Library",
    type: "Python",
    estDays: 1,
    subtopics: [
      "pip install pandas",
      "What is a Pandas Series (1D)?",
      "What is a Pandas DataFrame (2D Table)?",
      "Creating a DataFrame from a Python Dictionary",
    ],
  },
  {
    id: "m2d21",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 21: Pandas: Reading and Inspecting",
    type: "Python",
    estDays: 1,
    subtopics: [
      "pd.read_csv() and pd.read_json()",
      "Viewing top rows with df.head()",
      "Checking data types with df.info()",
      "Getting summary stats with df.describe()",
    ],
  },
  {
    id: "m2d22",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 22: Pandas: Selecting and Filtering",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Selecting single vs multiple columns",
      'Filtering rows based on conditions (e.g., df[df["age"] > 25])',
      "Using multiple conditions (& and |)",
    ],
  },
  {
    id: "m2d23",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 23: Pandas: Data Cleaning",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Finding nulls (df.isna())",
      "Dropping rows with nulls (dropna())",
      "Filling nulls with defaults (fillna())",
      "Removing duplicate rows (drop_duplicates())",
    ],
  },
  {
    id: "m2d24",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 24: Database Connections in Python",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Installing psycopg2 (Postgres) or using built-in sqlite3",
      "Establishing a connection string",
      "Creating a cursor object",
    ],
  },
  {
    id: "m2d25",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 25: Loading Data into SQL via Python",
    type: "Python",
    estDays: 1,
    subtopics: [
      "Executing CREATE TABLE via Python",
      "Using pandas `to_sql()` method to load a DataFrame into a DB",
      "Committing transactions and closing connections",
    ],
  },
  {
    id: "p2",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "PROJECT: API to Database ETL Pipeline",
    type: "Project",
    estDays: 5,
    subtopics: [
      "1. Get a free API key from OpenWeatherMap or PokeAPI",
      "2. Write a Python script to fetch data for 10 cities/items",
      "3. Parse the JSON and load it into a Pandas DataFrame",
      "4. Clean the data (rename columns, handle missing values)",
      "5. Connect to a local SQLite database and insert the cleaned DataFrame",
      "6. Add try/except blocks to handle API connection failures",
    ],
  },

  // ==========================================
  // MONTH 3: DATABASES & DATA WAREHOUSING
  // ==========================================
  {
    id: "m3d1",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 1: PostgreSQL Setup",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Download and install PostgreSQL",
      "Install DBeaver (SQL Client)",
      "Connect DBeaver to your local Postgres database",
    ],
  },
  {
    id: "m3d2",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 2: DDL Commands (Data Definition)",
    type: "DB",
    estDays: 1,
    subtopics: [
      "CREATE TABLE syntax and choosing data types",
      "ALTER TABLE to add/remove columns",
      "DROP vs TRUNCATE table",
    ],
  },
  {
    id: "m3d3",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 3: DML Commands (Data Manipulation)",
    type: "DB",
    estDays: 1,
    subtopics: [
      "INSERT INTO syntax (single and multiple rows)",
      "UPDATE statement (always use a WHERE clause!)",
      "DELETE FROM statement",
    ],
  },
  {
    id: "m3d4",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 4: Database Constraints",
    type: "DB",
    estDays: 1,
    subtopics: [
      "NOT NULL constraint",
      "UNIQUE constraint",
      "DEFAULT values",
      "CHECK constraints",
    ],
  },
  {
    id: "m3d5",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 5: Transactions & ACID Properties",
    type: "DB",
    estDays: 1,
    subtopics: [
      "BEGIN, COMMIT, and ROLLBACK",
      "Atomicity (All or nothing)",
      "Consistency, Isolation, Durability definitions",
    ],
  },
  {
    id: "m3d6",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 6: Database Indexing",
    type: "DB",
    estDays: 1,
    subtopics: [
      "What is an Index? (The book index analogy)",
      "Creating a B-Tree index",
      "How indexes speed up SELECTs but slow down INSERTs",
    ],
  },
  {
    id: "m3d7",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 7: Relational Data Modeling (ERDs)",
    type: "DB",
    estDays: 1,
    subtopics: [
      "One-to-One relationships",
      "One-to-Many relationships",
      "Many-to-Many relationships (Junction tables)",
      "Drawing an ERD using draw.io or lucidchart",
    ],
  },
  {
    id: "m3d8",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 8: Normalization",
    type: "DB",
    estDays: 1,
    subtopics: [
      "What is Data Redundancy?",
      "1st Normal Form (Atomic values)",
      "2nd and 3rd Normal Form concepts",
    ],
  },
  {
    id: "m3d9",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 9: OLTP vs OLAP",
    type: "DB",
    estDays: 1,
    subtopics: [
      "OLTP: Online Transaction Processing (App databases)",
      "OLAP: Online Analytical Processing (Data Warehouses)",
      "Key differences in read/write patterns",
    ],
  },
  {
    id: "m3d10",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 10: Data Warehouse: Facts and Dimensions",
    type: "DB",
    estDays: 1,
    subtopics: [
      "What is a Fact Table? (Measurements, metrics, events)",
      "What is a Dimension Table? (Context, who, what, where)",
      "Surrogate Keys vs Natural Keys",
    ],
  },
  {
    id: "m3d11",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 11: Dimensional Modeling",
    type: "DB",
    estDays: 1,
    subtopics: [
      "The Star Schema architecture",
      "The Snowflake Schema architecture",
      "Pros and cons of Star vs Snowflake",
    ],
  },
  {
    id: "m3d12",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 12: Slowly Changing Dimensions (SCD)",
    type: "DB",
    estDays: 1,
    subtopics: [
      "SCD Type 1 (Overwrite old data)",
      "SCD Type 2 (Add new row, maintain history, valid_from/to dates)",
      "SCD Type 3 (Add new column)",
    ],
  },
  {
    id: "m3d13",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 13: Cloud Data Warehouses",
    type: "DB",
    estDays: 1,
    subtopics: [
      "How Cloud DWs differ from traditional DBs",
      "Separation of Storage and Compute",
      "Overview of Snowflake and BigQuery concepts",
    ],
  },
  {
    id: "m3d14",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 14: Columnar vs Row Storage",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Row-based storage (Postgres) - good for transactional writes",
      "Columnar storage (Snowflake/Parquet) - good for analytical reads",
      "Compression benefits of Columnar storage",
    ],
  },
  {
    id: "m3d15",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 15: Intro to NoSQL (Document DBs)",
    type: "DB",
    estDays: 1,
    subtopics: [
      "When to use NoSQL instead of Relational",
      "Document databases overview (MongoDB)",
      "Storing data as JSON-like documents",
    ],
  },
  {
    id: "m3d16",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 16: Intro to NoSQL (Other types)",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Key-Value stores (Redis)",
      "Column-family stores (Cassandra)",
      "Graph databases (Neo4j)",
    ],
  },
  {
    id: "p3",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "PROJECT: Data Modeling from Scratch",
    type: "Project",
    estDays: 4,
    subtopics: [
      "1. Design a Star Schema for a fictional Ride-Sharing app (Uber)",
      "2. Identify the Fact table (Rides) and 3 Dimension tables (Users, Drivers, Time)",
      "3. Draw the ERD showing Primary and Foreign keys",
      "4. Write the SQL DDL script to CREATE all these tables in Postgres",
    ],
  },

  // ==========================================
  // MONTH 4: DATA PIPELINES & AIRFLOW
  // ==========================================
  {
    id: "m4d1",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 1: What is ETL?",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Extract: Pulling data from source systems (APIs, DBs)",
      "Transform: Cleaning, joining, and aggregating",
      "Load: Pushing data into the Data Warehouse",
    ],
  },
  {
    id: "m4d2",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 2: ETL vs ELT",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "The shift to ELT in modern data stacks",
      "Why Cloud Data Warehouses made ELT popular",
      "Transformation happening inside the Warehouse",
    ],
  },
  {
    id: "m4d3",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 3: Batch vs Streaming",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Batch processing (Running on a schedule, e.g., nightly)",
      "Streaming/Real-time data (Processing as it arrives)",
      "Latency vs Throughput",
    ],
  },
  {
    id: "m4d4",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 4: Intro to Apache Airflow",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "What is data orchestration?",
      "Why cron is not enough for complex pipelines",
      "Airflow Core Components: Scheduler, Webserver, Worker, Metadata DB",
    ],
  },
  {
    id: "m4d5",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 5: Understanding DAGs",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Directed Acyclic Graphs (DAGs) explained",
      "Why DAGs cannot have loops",
      "Tasks and Operators concepts",
    ],
  },
  {
    id: "m4d6",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 6: Setting up Airflow locally",
    type: "Pipeline",
    estDays: 2,
    subtopics: [
      "Install Docker Desktop on your machine",
      "Download the official Airflow docker-compose.yaml file",
      "Run `docker-compose up` to start Airflow",
      "Access the Web UI at localhost:8080",
    ],
  },
  {
    id: "m4d8",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 8: Airflow Web UI Tour",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Navigating the DAGs list",
      "Graph View (visualizing task dependencies)",
      "Tree/Grid View (viewing historical runs)",
      "Checking Task Logs for errors",
    ],
  },
  {
    id: "m4d9",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 9: Writing your first DAG",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Importing DAG from airflow module",
      "Defining default_args (owner, retries)",
      "Instantiating the DAG object with a schedule_interval",
    ],
  },
  {
    id: "m4d10",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 10: The BashOperator",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Importing BashOperator",
      'Creating a task that runs a terminal command (e.g., echo "hello")',
      "Assigning the task to your DAG",
    ],
  },
  {
    id: "m4d11",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 11: The PythonOperator",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Importing PythonOperator",
      "Defining a standard Python function",
      "Passing the function to the python_callable argument",
    ],
  },
  {
    id: "m4d12",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 12: Setting Task Dependencies",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Using bitshift operators (>> and <<)",
      "Setting sequential execution (Task 1 >> Task 2)",
      "Setting parallel execution ([Task 2, Task 3] >> Task 4)",
    ],
  },
  {
    id: "m4d13",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 13: Scheduling and Cron Syntax",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Understanding the 5 cron fields (* * * * *)",
      "Setting a DAG to run daily at midnight (0 0 * * *)",
      "Using Airflow presets (@daily, @hourly)",
    ],
  },
  {
    id: "m4d14",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 14: Catchup and Backfilling",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Understanding start_date",
      "What catchup=True does (running historical missing dates)",
      "Execution date vs Logical date",
    ],
  },
  {
    id: "m4d15",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 15: XComs (Cross-Communication)",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Why tasks are isolated by default",
      "Using xcom_push to output small data (like an ID)",
      "Using xcom_pull in the next task to retrieve it",
    ],
  },
  {
    id: "m4d16",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 16: Connections & Variables",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Storing API keys securely in Airflow Variables UI",
      "Creating Database Connections in the UI",
      "Using hooks to access connections in code",
    ],
  },
  {
    id: "m4d17",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 17: Handling Failures",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Configuring task retries and retry_delay",
      "Setting up email_on_failure in default_args",
    ],
  },
  {
    id: "p4",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "PROJECT: Orchestrate your Python Script",
    type: "Project",
    estDays: 6,
    subtopics: [
      "1. Take your Python script from Month 2 (Weather API)",
      "2. Break it into two functions: fetch_data() and load_to_db()",
      "3. Create a new Airflow DAG scheduled to run @daily",
      "4. Create two PythonOperators mapping to your functions",
      "5. Set dependency: fetch_task >> load_task",
      "6. Turn on the DAG in the UI and watch it run successfully!",
    ],
  },

  // ==========================================
  // MONTH 5: BIG DATA (SPARK) & CLOUD BASICS
  // ==========================================
  {
    id: "m5d1",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 1: What is Big Data?",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "The 3 Vs: Volume, Velocity, Variety",
      'When does data become "Big"? (Memory limits)',
      "Vertical Scaling vs Horizontal Scaling",
    ],
  },
  {
    id: "m5d2",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 2: Distributed Computing Concepts",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "The Master-Worker Node architecture",
      "How data is partitioned across multiple machines",
      "Fault tolerance in distributed systems",
    ],
  },
  {
    id: "m5d3",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 3: Intro to Apache Spark",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "What is Spark? (In-memory processing engine)",
      "Spark Driver vs Executors",
      "RDDs (Resilient Distributed Datasets) vs DataFrames",
    ],
  },
  {
    id: "m5d4",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 4: Setting up PySpark locally",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "pip install pyspark",
      "Setting up a local SparkSession in a Python script/Jupyter Notebook",
    ],
  },
  {
    id: "m5d5",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 5: PySpark DataFrames & Lazy Eval",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Transformations vs Actions",
      "Why Spark uses Lazy Evaluation (building the execution plan)",
      "Using .show() and .printSchema()",
    ],
  },
  {
    id: "m5d6",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 6: Reading Data in PySpark",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Reading CSVs (spark.read.csv(header=True))",
      "Reading JSON files",
      "Understanding the Parquet file format (Columnar, compressed)",
    ],
  },
  {
    id: "m5d7",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 7: PySpark Transformations",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Selecting columns (.select())",
      "Filtering rows (.filter() or .where())",
      "Creating new columns (.withColumn())",
    ],
  },
  {
    id: "m5d8",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 8: PySpark Aggregations",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Importing pyspark.sql.functions as F",
      "Using .groupBy().agg()",
      "Calculating F.sum() and F.count()",
    ],
  },
  {
    id: "m5d9",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 9: Joining DataFrames in PySpark",
    type: "BigData",
    estDays: 1,
    subtopics: [
      'df1.join(df2, on="id", how="inner")',
      "Handling duplicate column names after joining",
    ],
  },
  {
    id: "m5d10",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 10: Spark SQL",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Creating temporary views (createOrReplaceTempView)",
      'Using spark.sql("SELECT ...") to write pure SQL instead of Python syntax',
    ],
  },
  {
    id: "m5d11",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 11: Writing Data Out",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Writing DataFrames back to disk (.write)",
      "Saving as partitioned Parquet files (partitionBy)",
    ],
  },
  {
    id: "m5d12",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 12: Intro to the Cloud (AWS)",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "Create an AWS Free Tier account",
      "Tour the AWS Management Console",
      "Understanding Regions and Availability Zones",
    ],
  },
  {
    id: "m5d13",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 13: AWS S3 (Cloud Storage)",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "What is Object Storage?",
      "Creating an S3 Bucket",
      "Uploading files manually via the UI",
      "Understanding S3 URIs (s3://bucket-name/file)",
    ],
  },
  {
    id: "m5d14",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 14: AWS Security (IAM)",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "Creating an IAM User",
      "Generating Access Keys and Secret Keys",
      "Attaching policies (e.g., AmazonS3FullAccess)",
    ],
  },
  {
    id: "m5d15",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 15: Python to AWS via Boto3",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "pip install boto3",
      "Configuring AWS CLI with your keys",
      "Writing a Python script to list S3 buckets and upload a local file",
    ],
  },
  {
    id: "p5",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "PROJECT: PySpark to AWS S3",
    type: "Project",
    estDays: 6,
    subtopics: [
      "1. Find a large dataset (e.g., NYC Taxi Trip data CSV)",
      "2. Write a PySpark script to load the data",
      "3. Filter out invalid rows and aggregate trips by day",
      "4. Save the cleaned DataFrame locally as Parquet",
      "5. Write a Boto3 function to upload that Parquet file to your AWS S3 bucket",
    ],
  },

  // ==========================================
  // MONTH 6: dbt, CAPSTONE & ESCAPE PLAN
  // ==========================================
  {
    id: "m6d1",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 1: What is dbt?",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Data Build Tool overview",
      'Transforming data inside the warehouse (The "T" in ELT)',
      "Why analytics engineers use dbt",
    ],
  },
  {
    id: "m6d2",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 2: dbt Core Setup",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "pip install dbt-postgres (or bigquery/snowflake)",
      "Running `dbt init` to scaffold a project",
      "Configuring the profiles.yml file to connect to your database",
    ],
  },
  {
    id: "m6d3",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 3: Writing dbt Models",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Understanding that a dbt model is just a SELECT statement in a .sql file",
      "Writing your first model in the /models folder",
      "Running `dbt run` to materialize it in the DB",
    ],
  },
  {
    id: "m6d4",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 4: dbt refs and materializations",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      'Using the {{ ref("model_name") }} macro to build dependencies',
      "Configuring materializations (table vs view)",
    ],
  },
  {
    id: "m6d5",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 5: dbt Testing and Docs",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Setting up schema.yml files",
      "Adding tests (unique, not_null, accepted_values)",
      "Running `dbt test` to check data quality",
    ],
  },
  {
    id: "m6d6",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 6: Version Control (Git)",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Install Git",
      "Create a GitHub account",
      "Git concepts (Repository, Branch, Commit)",
    ],
  },
  {
    id: "m6d7",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 7: Basic Git Commands",
    type: "Project",
    estDays: 1,
    subtopics: [
      "git init and git clone",
      'git add . and git commit -m "message"',
      "git push to send code to GitHub",
    ],
  },

  {
    id: "p6",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "MEGA CAPSTONE (Step 1): Data Extraction",
    type: "Project",
    estDays: 3,
    subtopics: [
      "1. Choose a public API (e.g., Reddit API, Crypto API)",
      "2. Write a Python script to extract JSON data daily",
      '3. Use Boto3 to upload the raw JSON directly to an AWS S3 "Landing" bucket',
    ],
  },
  {
    id: "p7",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "MEGA CAPSTONE (Step 2): Data Processing",
    type: "Project",
    estDays: 3,
    subtopics: [
      "1. Write a PySpark script to read the JSON from S3",
      "2. Clean data, enforce schema, and drop duplicates",
      '3. Save the clean data as Parquet back to a different S3 "Processed" bucket',
      "4. (Optional) Load from S3 into Postgres/Snowflake",
    ],
  },
  {
    id: "p8",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "MEGA CAPSTONE (Step 3): Data Modeling",
    type: "Project",
    estDays: 3,
    subtopics: [
      "1. Setup a dbt project connected to your Database",
      "2. Create staging models to clean column names",
      "3. Create a final Fact model (e.g., fact_crypto_prices)",
      "4. Add dbt tests to ensure no null IDs",
    ],
  },
  {
    id: "p9",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "MEGA CAPSTONE (Step 4): Orchestration",
    type: "Project",
    estDays: 3,
    subtopics: [
      "1. Build an Airflow DAG",
      "2. Task 1: PythonOperator (run extraction script)",
      "3. Task 2: BashOperator (run spark-submit script)",
      "4. Task 3: BashOperator (run dbt build)",
      "5. Schedule it to run automatically every night",
    ],
  },

  {
    id: "m6d20",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 20: Document your Capstone!",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Push all code to a public GitHub repository",
      "Write a README.md file",
      "Include an Architecture Diagram (draw.io)",
      "Explain what tools you used and why",
    ],
  },
  {
    id: "m6d21",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 21: Resume rewrite",
    type: "Project",
    estDays: 1,
    subtopics: [
      'Move "Projects" to the top of your resume',
      "Link your GitHub repo directly on the resume",
      "Highlight SQL, Python, Airflow, and Spark in your skills section",
    ],
  },
  {
    id: "m6d22",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 22: Update LinkedIn profile",
    type: "Project",
    estDays: 1,
    subtopics: [
      'Change headline to "Aspiring Data Engineer" or similar',
      "Post a screenshot of your Airflow DAG running successfully",
      "Link your GitHub project in the featured section",
    ],
  },
  {
    id: "m6d23",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 23: Interview Prep (SQL)",
    type: "Project",
    estDays: 1,
    subtopics: [
      'Do 5 "Medium" SQL questions on LeetCode/StrataScratch',
      "Practice explaining Window Functions out loud",
      "Review Joins vs Unions",
    ],
  },
  {
    id: "m6d24",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 24: Interview Prep (Concepts)",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Practice explaining the difference between ETL and ELT",
      'Prepare your "Tell me about your project" elevator pitch',
      "Review Star Schema concepts",
    ],
  },
  {
    id: "m6d25",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 25: START APPLYING.",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Apply to 5 Junior/Entry Data Engineer roles",
      "Apply to Data Analyst roles (they often do DE work!)",
      "Keep building, keep pushing. Your escape has begun.",
    ],
  },
];

// --- Circular Progress Component ---
const CircularProgress = ({
  percentage,
  color,
  label,
  icon: Icon,
}: CircularProgressProps) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-5 bg-slate-800 rounded-xl border border-slate-700 shadow-md w-full h-full">
      <div className="flex items-center gap-2 mb-4 text-slate-300 w-full justify-center">
        <Icon
          size={16}
          className={`flex-shrink-0 ${color.replace("text-", "text-")}`}
        />
        <span className="font-semibold text-xs sm:text-sm tracking-widest uppercase text-center line-clamp-1">
          {label}
        </span>
      </div>
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-700"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // --- State Management ---
  const [startDate, setStartDate] = useState<string>(() => {
    const saved = localStorage.getItem("de-tracker-start");
    return saved ? saved : new Date().toISOString().split("T")[0];
  });

  const [completedTasks, setCompletedTasks] = useState<Record<string, string>>(
    () => {
      const saved = localStorage.getItem("de-tracker-tasks");
      return saved ? JSON.parse(saved) : {};
    },
  );

  const [completedSubtopics, setCompletedSubtopics] = useState<string[]>(() => {
    const saved = localStorage.getItem("de-tracker-subtasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Now handles multiple resources per subtopic ID
  const [customResources, setCustomResources] = useState<
    Record<string, CustomResource[]>
  >(() => {
    const saved = localStorage.getItem("de-tracker-custom-resources-multi");
    return saved ? JSON.parse(saved) : {};
  });

  // Track which task rows are expanded to show subtopics
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>(
    {},
  );
  const [activeMonth, setActiveMonth] = useState<number>(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(null);
  const [activeSubtopicName, setActiveSubtopicName] = useState<string>("");
  const [customTitle, setCustomTitle] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  // --- Save to LocalStorage ---
  useEffect(() => {
    localStorage.setItem("de-tracker-start", startDate);
    localStorage.setItem("de-tracker-tasks", JSON.stringify(completedTasks));
    localStorage.setItem(
      "de-tracker-subtasks",
      JSON.stringify(completedSubtopics),
    );
    localStorage.setItem(
      "de-tracker-custom-resources-multi",
      JSON.stringify(customResources),
    );
  }, [startDate, completedTasks, completedSubtopics, customResources]);

  // --- Task Toggle Logic ---
  const handleParentClick = (task: Task) => {
    if (task.subtopics && task.subtopics.length > 0) {
      setExpandedTasks((prev) => ({
        ...prev,
        [task.id]: !prev[task.id],
      }));
    }
  };

  const toggleSubtopic = (
    e: MouseEvent,
    taskId: string,
    subIdx: number,
    totalSubtopics: number,
  ) => {
    e.stopPropagation();
    const subId = `${taskId}-${subIdx}`;

    const isCurrentlyCompleted = completedSubtopics.includes(subId);
    const newSubtopics = isCurrentlyCompleted
      ? completedSubtopics.filter((id) => id !== subId)
      : [...completedSubtopics, subId];

    setCompletedSubtopics(newSubtopics);

    // AUTO-COMPLETE ENGINE
    const taskSubtopicIds = Array.from(
      { length: totalSubtopics },
      (_, i) => `${taskId}-${i}`,
    );
    const completedCount = taskSubtopicIds.filter((id) =>
      newSubtopics.includes(id),
    ).length;

    setCompletedTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      if (completedCount === totalSubtopics) {
        if (!newTasks[taskId]) {
          newTasks[taskId] = new Date().toISOString().split("T")[0];
        }
      } else {
        delete newTasks[taskId];
      }
      return newTasks;
    });
  };

  // --- Multi-Resource Modal Logic ---
  const openModal = (e: MouseEvent, subId: string, subName: string) => {
    e.stopPropagation();
    setActiveSubtopicId(subId);
    setActiveSubtopicName(subName);
    setCustomTitle("");
    setCustomUrl("");
    setIsModalOpen(true);
  };

  const addCustomResource = () => {
    if (activeSubtopicId && customTitle && customUrl) {
      const newResource: CustomResource = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString(),
        title: customTitle,
        url: customUrl,
      };

      setCustomResources((prev) => {
        const existing = prev[activeSubtopicId] || [];
        return {
          ...prev,
          [activeSubtopicId]: [...existing, newResource],
        };
      });

      setCustomTitle("");
      setCustomUrl("");
    }
  };

  const deleteCustomResource = (resourceId: string) => {
    if (activeSubtopicId) {
      setCustomResources((prev) => {
        const existing = prev[activeSubtopicId] || [];
        const updated = existing.filter((r) => r.id !== resourceId);
        return {
          ...prev,
          [activeSubtopicId]: updated,
        };
      });
    }
  };

  // --- Dynamic Timeline Calculations ---
  const { enrichedCurriculum, projectedEndDate, totalProgress } =
    useMemo(() => {
      let currentPointerDate = startDate;
      let dynamicPointerDate = new Date().toISOString().split("T")[0];

      if (new Date(dynamicPointerDate) < new Date(startDate)) {
        dynamicPointerDate = startDate;
      }

      let totalSubCountOverall = 0;
      let completedSubCountOverall = 0;

      const enriched = curriculumData.map((task) => {
        const taskIdealDate = currentPointerDate;
        currentPointerDate = addDays(currentPointerDate, task.estDays);

        let taskDisplayDate = "";
        const isCompleted = !!completedTasks[task.id];

        const totalSubCount = task.subtopics ? task.subtopics.length : 1;
        const completedSubCount = task.subtopics
          ? task.subtopics.filter((_, idx) =>
              completedSubtopics.includes(`${task.id}-${idx}`),
            ).length
          : isCompleted
            ? 1
            : 0;

        totalSubCountOverall += totalSubCount;
        completedSubCountOverall += completedSubCount;

        if (isCompleted) {
          taskDisplayDate = completedTasks[task.id];
        } else {
          taskDisplayDate = dynamicPointerDate;
          dynamicPointerDate = addDays(dynamicPointerDate, task.estDays);
        }

        return {
          ...task,
          idealDate: taskIdealDate,
          displayDate: taskDisplayDate,
          isCompleted,
        };
      });

      return {
        enrichedCurriculum: enriched,
        projectedEndDate: dynamicPointerDate,
        totalProgress:
          totalSubCountOverall > 0
            ? Math.round(
                (completedSubCountOverall / totalSubCountOverall) * 100,
              )
            : 0,
      };
    }, [startDate, completedTasks, completedSubtopics]);

  // --- Dashboard Stats Calculations ---
  const stats = useMemo(() => {
    const types = [
      "SQL",
      "Python",
      "DB",
      "Pipeline",
      "BigData",
      "Cloud",
      "Project",
    ];
    const newStats: Record<string, number> = {};

    types.forEach((type) => {
      const tasks = curriculumData.filter((t) => t.type === type);
      let totalSub = 0;
      let completedSub = 0;

      tasks.forEach((t) => {
        if (t.subtopics && t.subtopics.length > 0) {
          totalSub += t.subtopics.length;
          completedSub += t.subtopics.filter((_, idx) =>
            completedSubtopics.includes(`${t.id}-${idx}`),
          ).length;
        } else {
          totalSub += 1;
          if (completedTasks[t.id]) completedSub += 1;
        }
      });

      newStats[type] = totalSub > 0 ? (completedSub / totalSub) * 100 : 0;
    });

    return newStats;
  }, [completedTasks, completedSubtopics]);

  // --- UI Helpers ---
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      SQL: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      Python: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      DB: "text-teal-400 bg-teal-400/10 border-teal-400/20",
      Pipeline: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      BigData: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      Cloud: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
      Project:
        "text-pink-400 bg-pink-500/20 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.15)]",
    };
    return colors[type] || "text-slate-400 bg-slate-400/10 border-slate-400/20";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SQL":
        return Database;
      case "Python":
        return Code;
      case "DB":
        return Server;
      case "Pipeline":
        return Workflow;
      case "Cloud":
        return Cloud;
      case "BigData":
        return Activity;
      case "Project":
        return Trophy;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-6 font-sans selection:bg-blue-500/30 text-left">
      <div className="max-w-6xl mx-auto space-y-8 relative">
        {/* Header & Date Configuration */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <HeartHandshake className="text-pink-500 w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                The Escape Plan
              </h1>
            </div>
            <p className="mt-2 text-slate-400 flex items-center gap-2 max-w-xl">
              <Rocket size={18} className="text-blue-400 flex-shrink-0" />
              From Support to Data Engineer. Built day-by-day for absolute
              beginners. You can do this.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3 min-w-[280px]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 flex items-center gap-2">
                <Calendar size={16} /> Start Date
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock size={16} /> Projected End
              </span>
              <span className="font-bold text-teal-400">
                {formatDate(projectedEndDate)}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2.5 mt-2 border border-slate-700">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Dashboard Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <CircularProgress
            percentage={totalProgress}
            color="text-teal-500"
            label="Overall Journey"
            icon={Trophy}
          />
          <CircularProgress
            percentage={stats["SQL"]}
            color="text-blue-500"
            label="SQL Mastery"
            icon={Database}
          />
          <CircularProgress
            percentage={stats["Python"]}
            color="text-yellow-500"
            label="Python Mastery"
            icon={Code}
          />
          <CircularProgress
            percentage={stats["DB"]}
            color="text-teal-400"
            label="Databases"
            icon={Server}
          />
          <CircularProgress
            percentage={stats["Pipeline"]}
            color="text-purple-400"
            label="Airflow / ETL"
            icon={Workflow}
          />
          <CircularProgress
            percentage={stats["BigData"]}
            color="text-orange-400"
            label="Spark / Big Data"
            icon={Activity}
          />
          <CircularProgress
            percentage={stats["Cloud"]}
            color="text-cyan-400"
            label="Cloud & AWS"
            icon={Cloud}
          />
          <CircularProgress
            percentage={stats["Project"]}
            color="text-pink-500"
            label="Projects Done"
            icon={Rocket}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-3 pb-2 pt-4 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6].map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`px-5 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base flex-shrink-0 ${
                activeMonth === month
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              Month {month}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl mt-4">
          <div className="p-4 md:p-6 bg-slate-800/50 border-b border-slate-700">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              {enrichedCurriculum.find((t) => t.month === activeMonth)?.phase}
            </h2>
          </div>

          <div className="divide-y divide-slate-700/50 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
            {enrichedCurriculum
              .filter((t) => t.month === activeMonth)
              .map((task) => {
                const Icon = getTypeIcon(task.type);
                const isExpanded = expandedTasks[task.id];

                // Calculate specific task progress
                const totalSubCount = task.subtopics
                  ? task.subtopics.length
                  : 0;
                const completedSubCount = task.subtopics
                  ? task.subtopics.filter((_, idx) =>
                      completedSubtopics.includes(`${task.id}-${idx}`),
                    ).length
                  : 0;
                const progressPercent =
                  totalSubCount > 0
                    ? (completedSubCount / totalSubCount) * 100
                    : 0;

                return (
                  <div
                    key={task.id}
                    onClick={() => handleParentClick(task)}
                    className={`flex flex-col p-4 sm:p-5 hover:bg-slate-700/30 transition-colors cursor-pointer group ${
                      task.isCompleted ? "bg-slate-800/40" : ""
                    } ${task.type === "Project" ? "bg-slate-700/40 border-l-4 border-pink-500" : ""}`}
                  >
                    {/* Top Row: Task Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full justify-between">
                      {/* Left: Checkmark & Title */}
                      <div className="flex items-start gap-4 flex-grow text-left">
                        <div className="flex-shrink-0 mt-0.5">
                          {task.isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-teal-500 transition-transform scale-110" />
                          ) : (
                            <Circle className="w-6 h-6 md:w-7 md:h-7 text-slate-500 group-hover:text-blue-400 transition-colors" />
                          )}
                        </div>

                        <div className="flex-grow flex flex-col justify-start text-left">
                          <h3
                            className={`font-medium text-base md:text-lg text-left transition-colors leading-tight md:leading-normal pr-4 ${
                              task.isCompleted
                                ? "text-slate-500 line-through"
                                : task.type === "Project"
                                  ? "text-pink-100 font-bold"
                                  : "text-slate-200"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p className="text-xs md:text-sm text-left text-slate-500 mt-1.5 flex items-center gap-2">
                            {task.isCompleted ? (
                              <span className="text-teal-500/80 font-medium">
                                ✔ Completed on {formatDate(task.displayDate)}
                              </span>
                            ) : (
                              <span>
                                Target: {formatDate(task.displayDate)} (
                                {task.estDays}{" "}
                                {task.estDays === 1 ? "day" : "days"})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Right: Progress Bar & Tags */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:ml-auto w-full lg:w-auto mt-2 lg:mt-0 pt-3 lg:pt-0 border-t border-slate-700 lg:border-t-0">
                        {/* Horizontal Progress Bar */}
                        {totalSubCount > 0 && (
                          <div className="flex-grow w-full sm:w-36 flex flex-col gap-1.5">
                            <div className="flex justify-between text-xs font-bold text-slate-400 w-full">
                              <span>Progress</span>
                              <span
                                className={
                                  task.isCompleted ? "text-teal-400" : ""
                                }
                              >
                                {completedSubCount}/{totalSubCount}
                              </span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-700 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${task.isCompleted ? "bg-teal-500" : "bg-blue-500"}`}
                                style={{ width: `${progressPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                          <span
                            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getTypeColor(task.type)}`}
                          >
                            <Icon size={12} />
                            {task.type}
                          </span>

                          {/* Expand/Collapse Button */}
                          {task.subtopics && task.subtopics.length > 0 && (
                            <button
                              className={`p-1.5 rounded-full border transition-all ${isExpanded ? "bg-slate-700 border-slate-600 text-white" : "border-slate-700 text-slate-400 group-hover:bg-slate-700 group-hover:text-white"}`}
                            >
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Expandable Subtopics & Resources */}
                    {isExpanded && task.subtopics && (
                      <div className="mt-5 ml-10 sm:ml-11 pl-4 border-l-2 border-slate-700">
                        <h4 className="text-xs font-bold text-slate-400 text-left uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <List size={14} /> Action Items & Resources
                        </h4>
                        <ul
                          className={`space-y-3 list-none mt-2 ${task.isCompleted ? "opacity-50" : ""}`}
                        >
                          {task.subtopics.map((sub, idx) => {
                            const subId = `${task.id}-${idx}`;
                            const isSubCompleted =
                              completedSubtopics.includes(subId);

                            // Smart URL Generation
                            const searchPrefix =
                              typeSearchMap[task.type] || task.type;
                            const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${searchPrefix} ${sub} tutorial`)}`;
                            const readUrl = `https://www.google.com/search?q=${encodeURIComponent(`${searchPrefix} ${sub} documentation tutorial example`)}`;

                            // Saved custom resources for this specific subtopic
                            const subtopicResources =
                              customResources[subId] || [];
                            const resourceCount = subtopicResources.length;

                            return (
                              <li
                                key={idx}
                                onClick={(e) =>
                                  toggleSubtopic(
                                    e,
                                    task.id,
                                    idx,
                                    task.subtopics?.length || 0,
                                  )
                                }
                                className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 text-sm cursor-pointer group/sub hover:bg-slate-700/20 p-2 sm:p-3 -ml-1.5 rounded-lg transition-colors text-left border border-transparent hover:border-slate-700/50"
                              >
                                <div className="flex items-start gap-3 flex-grow pr-2">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {isSubCompleted ? (
                                      <CheckCircle2
                                        size={18}
                                        className="text-teal-500"
                                      />
                                    ) : (
                                      <Circle
                                        size={18}
                                        className="text-slate-500 group-hover/sub:text-blue-400 transition-colors"
                                      />
                                    )}
                                  </div>
                                  <span
                                    className={`leading-relaxed transition-colors text-left ${isSubCompleted ? "text-slate-500 line-through" : "text-slate-300"}`}
                                  >
                                    {sub}
                                  </span>
                                </div>

                                {/* Resource Buttons (Stops click propagation so it doesn't check the box when clicked) */}
                                <div
                                  className="flex flex-wrap items-center gap-2 ml-7 xl:ml-0 flex-shrink-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-700 hover:border-red-500/30 shadow-sm"
                                  >
                                    <Youtube size={14} /> Watch
                                  </a>
                                  <a
                                    href={readUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-700 hover:border-blue-500/30 shadow-sm"
                                  >
                                    <BookOpen size={14} /> Read
                                  </a>

                                  {/* Multiple Resources Badge Button */}
                                  <button
                                    onClick={(e) => openModal(e, subId, sub)}
                                    className="relative flex items-center justify-center p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 shadow-sm ml-1"
                                    title="Manage custom resources"
                                  >
                                    <LinkIcon size={16} />
                                    {resourceCount > 0 && (
                                      <span className="absolute -top-1.5 -right-1.5 bg-[#a855f7] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                                        {resourceCount}
                                      </span>
                                    )}
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* --- Custom Resource Management Modal --- */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-[#1e2336] border border-slate-700 rounded-xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <LinkIcon size={20} className="text-[#a855f7]" /> Saved
                  Resources
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  <span className="font-semibold text-slate-300">Task:</span>{" "}
                  {activeSubtopicName}
                </p>

                {/* List of Existing Saved Resources */}
                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {(customResources[activeSubtopicId!] || []).map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center justify-between bg-[#151928] border border-slate-700 rounded-lg p-3 group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <BookOpen
                          size={16}
                          className="text-slate-500 flex-shrink-0"
                        />
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-200 text-sm font-medium hover:text-[#a855f7] truncate transition-colors"
                        >
                          {res.title}
                        </a>
                      </div>
                      <button
                        onClick={() => deleteCustomResource(res.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors ml-3 p-1 flex-shrink-0"
                        title="Delete resource"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}

                  {(!customResources[activeSubtopicId!] ||
                    customResources[activeSubtopicId!].length === 0) && (
                    <div className="text-center py-4 bg-[#151928]/50 border border-slate-700/50 rounded-lg border-dashed">
                      <p className="text-slate-500 text-sm">
                        No resources added yet.
                      </p>
                    </div>
                  )}
                </div>

                {/* Add New Resource Form */}
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Add New Resource
                </h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Resource Title (e.g. Medium Article)"
                    className="w-full bg-[#151928] border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addCustomResource();
                      }}
                      placeholder="https://..."
                      className="flex-grow w-full bg-[#151928] border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all text-sm"
                    />
                    <button
                      onClick={addCustomResource}
                      disabled={!customTitle || !customUrl}
                      className="px-4 py-2.5 rounded-lg bg-[#a855f7] text-white hover:bg-[#9333ea] disabled:bg-[#a855f7]/30 disabled:text-white/50 font-medium text-sm transition-colors flex items-center gap-1.5 shadow-lg shadow-purple-500/20 flex-shrink-0"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
