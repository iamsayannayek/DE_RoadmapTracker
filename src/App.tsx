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
    title: "Day 1: Install PostgreSQL and DBeaver (or pgAdmin)",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d2",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 2: DDL Commands: CREATE, ALTER, and DROP Tables",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d3",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 3: DML Commands: INSERT, UPDATE, and DELETE data",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d4",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 4: Database Constraints (NOT NULL, UNIQUE, DEFAULT)",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d5",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 5: Understanding Database Transactions & ACID Properties",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d6",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 6: What is an Index? How does it speed up queries?",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d7",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title:
      "Day 7: Relational Database Modeling: Entity Relationship Diagrams (ERDs)",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d8",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title:
      "Day 8: Normalization concepts (1NF, 2NF, 3NF) - Removing redundancy",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d9",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 9: OLTP vs OLAP: Operational Databases vs Data Warehouses",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d10",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title:
      "Day 10: Data Warehouse Architecture: Fact Tables vs Dimension Tables",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d11",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 11: Dimensional Modeling: The Star Schema and Snowflake Schema",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d12",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 12: Slowly Changing Dimensions (SCD Type 1, 2, 3)",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d13",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title:
      "Day 13: Intro to Cloud Data Warehouses (Concepts of Snowflake/BigQuery)",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d14",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 14: Columnar Storage vs Row Storage",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d15",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 15: Intro to NoSQL: Document Databases (MongoDB basics)",
    type: "DB",
    estDays: 1,
  },
  {
    id: "m3d16",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 16: Key-Value stores and Column-Family NoSQL concepts",
    type: "DB",
    estDays: 1,
  },
  {
    id: "p3",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title:
      "PROJECT: Draw an ERD for an E-commerce store, then write the SQL scripts to CREATE all tables with foreign keys",
    type: "Project",
    estDays: 4,
  },

  // ==========================================
  // MONTH 4: DATA PIPELINES & AIRFLOW
  // ==========================================
  {
    id: "m4d1",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 1: What is ETL? (Extract, Transform, Load)",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d2",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 2: Modern approach: ETL vs ELT differences",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d3",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 3: Batch Processing vs Streaming Data",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d4",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 4: What is Orchestration? Introduction to Apache Airflow",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d5",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 5: Understanding DAGs (Directed Acyclic Graphs) and Tasks",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d6",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 6: Setting up Airflow locally (using Docker is easiest)",
    type: "Pipeline",
    estDays: 2,
  },
  {
    id: "m4d8",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 8: Airflow Web UI Tour (Graph view, Tree view, Logs)",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d9",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 9: Writing your first DAG file in Python",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d10",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 10: Using the BashOperator to run terminal commands",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d11",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 11: Using the PythonOperator to run Python functions",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d12",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 12: Setting Task Dependencies (Task A >> Task B)",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d13",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 13: Scheduling DAGs: Understanding Cron syntax (* * * * *)",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d14",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 14: Catchup and Backfilling concepts in Airflow",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d15",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 15: Passing data between tasks using XComs",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d16",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 16: Setting up Connections & Variables securely in Airflow UI",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m4d17",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 17: Handling failures: Retries and Email Alerts",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "p4",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title:
      "PROJECT: Build an Airflow DAG that runs daily, triggers your Python script from Month 2, and logs success/failure",
    type: "Project",
    estDays: 6,
  },

  // ==========================================
  // MONTH 5: BIG DATA (SPARK) & CLOUD BASICS
  // ==========================================
  {
    id: "m5d1",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 1: What is Big Data? The 3 Vs (Volume, Velocity, Variety)",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d2",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 2: Distributed Computing Concepts (Why we need clusters)",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d3",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title:
      "Day 3: Introduction to Apache Spark Architecture (Driver, Executors)",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d4",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 4: Setting up PySpark in a local Jupyter Notebook/VS Code",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d5",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 5: Understanding PySpark DataFrames (Lazy Evaluation)",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d6",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 6: Reading large CSV/JSON/Parquet files in PySpark",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d7",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 7: PySpark Transformations: Select, Filter, WithColumn",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d8",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 8: PySpark Aggregations: GroupBy, Agg, Count, Sum",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d9",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 9: Joining DataFrames in PySpark",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d10",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 10: Using Spark SQL (writing pure SQL queries on DataFrames)",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d11",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 11: Writing data back out to Parquet format",
    type: "BigData",
    estDays: 1,
  },
  {
    id: "m5d12",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 12: Intro to the Cloud: Create an AWS free tier account",
    type: "Cloud",
    estDays: 1,
  },
  {
    id: "m5d13",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 13: Cloud Storage: Understanding AWS S3 (Buckets, Objects)",
    type: "Cloud",
    estDays: 1,
  },
  {
    id: "m5d14",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 14: Security: IAM Users, Roles, and Policies basics",
    type: "Cloud",
    estDays: 1,
  },
  {
    id: "m5d15",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title: "Day 15: Connecting Python to AWS S3 using Boto3 library",
    type: "Cloud",
    estDays: 1,
  },
  {
    id: "p5",
    month: 5,
    phase: "Month 5: Spark & Cloud Data",
    title:
      "PROJECT: Use PySpark to process a 1GB+ dataset locally, clean it, and upload the final Parquet file to AWS S3 using Boto3",
    type: "Project",
    estDays: 6,
  },

  // ==========================================
  // MONTH 6: dbt, CAPSTONE & ESCAPE PLAN
  // ==========================================
  {
    id: "m6d1",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 1: Modern Data Stack: What is dbt (Data Build Tool)?",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m6d2",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 2: dbt Core setup and connecting to a Database/Warehouse",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m6d3",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 3: Writing your first dbt models (SELECT statements)",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m6d4",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 4: dbt Materializations (Table vs View) and `ref()` function",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m6d5",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 5: dbt Testing (Not Null, Unique) to ensure data quality",
    type: "Pipeline",
    estDays: 1,
  },
  {
    id: "m6d6",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 6: Version Control: Install Git and create a GitHub account",
    type: "Project",
    estDays: 1,
  },
  {
    id: "m6d7",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 7: Basic Git Commands: clone, add, commit, push, pull",
    type: "Project",
    estDays: 1,
  },
  {
    id: "p6",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "MEGA CAPSTONE (Part 1): Python extracts API data to AWS S3",
    type: "Project",
    estDays: 3,
  },
  {
    id: "p7",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title:
      "MEGA CAPSTONE (Part 2): PySpark cleans S3 data and loads to Warehouse",
    type: "Project",
    estDays: 3,
  },
  {
    id: "p8",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title:
      "MEGA CAPSTONE (Part 3): dbt transforms Warehouse data into Star Schema",
    type: "Project",
    estDays: 3,
  },
  {
    id: "p9",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title:
      "MEGA CAPSTONE (Part 4): Airflow orchestrates the entire pipeline daily",
    type: "Project",
    estDays: 3,
  },
  {
    id: "m6d20",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 20: Document your Capstone! Write a great README.md on GitHub",
    type: "Project",
    estDays: 1,
  },
  {
    id: "m6d21",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 21: Resume rewrite: Focus heavily on Projects & SQL/Python",
    type: "Project",
    estDays: 1,
  },
  {
    id: "m6d22",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: 'Day 22: Update LinkedIn profile and set title to "Data Engineer"',
    type: "Project",
    estDays: 1,
  },
  {
    id: "m6d23",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 23: Interview Prep: Practice standard SQL Interview Questions",
    type: "Project",
    estDays: 1,
  },
  {
    id: "m6d24",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title:
      "Day 24: Interview Prep: Be able to explain ETL vs ELT and Star Schema clearly",
    type: "Project",
    estDays: 1,
  },
  {
    id: "m6d25",
    month: 6,
    phase: "Month 6: The Escape Plan",
    title: "Day 25: START APPLYING. Your escape begins now.",
    type: "Project",
    estDays: 1,
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

  // Track which task rows are expanded to show subtopics
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>(
    {},
  );
  const [activeMonth, setActiveMonth] = useState<number>(1);

  // --- Save to LocalStorage ---
  useEffect(() => {
    localStorage.setItem("de-tracker-start", startDate);
    localStorage.setItem("de-tracker-tasks", JSON.stringify(completedTasks));
    localStorage.setItem(
      "de-tracker-subtasks",
      JSON.stringify(completedSubtopics),
    );
  }, [startDate, completedTasks, completedSubtopics]);

  // --- Task Toggle Logic ---
  const handleParentClick = (task: Task) => {
    // If it has subtopics, expanding it is the only way to interact with it.
    if (task.subtopics && task.subtopics.length > 0) {
      setExpandedTasks((prev) => ({
        ...prev,
        [task.id]: !prev[task.id],
      }));
    } else {
      // If no subtopics exist (e.g. older tasks), just toggle completion directly
      setCompletedTasks((prev) => {
        const newState = { ...prev };
        if (newState[task.id]) {
          delete newState[task.id];
        } else {
          newState[task.id] = new Date().toISOString().split("T")[0];
        }
        return newState;
      });
    }
  };

  const toggleSubtopic = (
    e: MouseEvent,
    taskId: string,
    subIdx: number,
    totalSubtopics: number,
  ) => {
    e.stopPropagation(); // Prevents expanding/collapsing the parent row
    const subId = `${taskId}-${subIdx}`;

    // Calculate new subtopics array locally first
    const isCurrentlyCompleted = completedSubtopics.includes(subId);
    const newSubtopics = isCurrentlyCompleted
      ? completedSubtopics.filter((id) => id !== subId)
      : [...completedSubtopics, subId];

    setCompletedSubtopics(newSubtopics);

    // AUTO-COMPLETE ENGINE: Check if parent task should be marked as done automatically
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
        // All subtopics checked! Mark parent complete today (if not already completed)
        if (!newTasks[taskId]) {
          newTasks[taskId] = new Date().toISOString().split("T")[0];
        }
      } else {
        // Subtopic unchecked! Unmark parent automatically.
        delete newTasks[taskId];
      }
      return newTasks;
    });
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

        // Calculate smooth overall progress based on subtopics
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

  // --- Dashboard Stats Calculations (ALL TOPICS BASED ON SUBTOPICS) ---
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
      <div className="max-w-6xl mx-auto space-y-8">
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

        {/* Dashboard Charts - ALL 8 TOPICS */}
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
      </div>
    </div>
  );
}
