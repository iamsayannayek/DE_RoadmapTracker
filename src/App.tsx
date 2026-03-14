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
  Bookmark,
  BookmarkCheck,
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

// --- SMART INSTRUCTOR SEARCH ENGINE ---
const typeSearchMap: Record<string, { yt: string; web: string }> = {
  SQL: {
    yt: "Baraa Khatib Salkini Advanced SQL",
    web: "site:udemy.com Baraa Khatib Salkini SQL",
  },
  Python: {
    yt: "Hitesh Choudhary Python Pandas",
    web: "site:udemy.com Hitesh Choudhary Python",
  },
  DB: {
    yt: "Nikolai Schuler Snowflake Data Modeling",
    web: "site:udemy.com Nikolai Schuler Snowflake",
  },
  Pipeline: {
    yt: "Marc Lamberti Airflow Jack Colsey dbt",
    web: "site:udemy.com Marc Lamberti Airflow dbt",
  },
  BigData: {
    yt: "Prashant Kumar Pandey PySpark Frank Kane Databricks",
    web: "site:udemy.com Frank Kane PySpark",
  },
  Cloud: {
    yt: "Stephane Maarek AWS Terraform Kafka",
    web: "site:udemy.com Stephane Maarek AWS Kafka",
  },
  Project: {
    yt: "Darshil Parmar Data Engineering Project System Design",
    web: "Data Engineering Architecture Project Github",
  },
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

// --- Comprehensive 7-Month Master Curriculum ---
const curriculumData: Task[] = [
  // ==========================================
  // MONTH 1: SQL FOUNDATIONS & MODELING
  // ==========================================
  {
    id: "m1d1",
    month: 1,
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 1: What is a Database?",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 2: First Query! SELECT and LIMIT",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 5: Searching Text Patterns (LIKE)",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 6: Handling Lists (IN, BETWEEN)",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 7: Sorting results (ORDER BY)",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 10: Aggregations Part 2",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 11: Grouping Data (GROUP BY)",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 12: Filtering grouped data (HAVING)",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 14: Combining Tables (INNER JOIN)",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 16: FULL OUTER & CROSS JOIN",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 17: Conditional Logic (CASE WHEN)",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 23: Window Functions Intro",
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
    phase: "Month 1: SQL & Data Modeling",
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
    phase: "Month 1: SQL & Data Modeling",
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
    id: "m1d26",
    month: 1,
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 26: Data Modeling Fundamentals",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Differences between Inmon (EDW) and Kimball (Dimensional Modeling)",
      "Understanding the anatomy of Fact tables (additive, semi-additive)",
      "Understanding Dimension tables",
    ],
  },
  {
    id: "m1d27",
    month: 1,
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 27: Slowly Changing Dimensions",
    type: "DB",
    estDays: 1,
    subtopics: [
      "The critical concept of SCDs",
      "Tracking historical changes using SCD Type 2",
      "Effective dates and active flags in Dimension tables",
    ],
  },
  {
    id: "m1d28",
    month: 1,
    phase: "Month 1: SQL & Data Modeling",
    title: "Day 28: Advanced Modeling & Formats",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Comparing Star Schema vs Snowflake Schema",
      "One Big Table (OBT) architecture",
      "Big Data File Formats: Parquet and ORC vs CSV",
      "Columnar storage efficiency and compression",
    ],
  },
  {
    id: "p1",
    month: 1,
    phase: "Month 1: SQL & Data Modeling",
    title: "PROJECT: E-Commerce Star Schema Analysis",
    type: "Project",
    estDays: 5,
    subtopics: [
      "Find & download an E-commerce CSV dataset",
      "Design a conceptual Star Schema on draw.io",
      "Implement the Star Schema in a local PostgreSQL database",
      "Write a Window Function query to calculate Monthly Sales Growth on the Fact table",
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
      "Get a free API key from OpenWeatherMap or PokeAPI",
      "Write a Python script to fetch data for 10 cities/items",
      "Parse the JSON and load it into a Pandas DataFrame",
      "Clean the data (rename columns, handle missing values)",
      "Connect to a local SQLite database and insert the cleaned DataFrame",
      "Add try/except blocks to handle API connection failures",
    ],
  },

  // ==========================================
  // MONTH 3: DISTRIBUTED COMPUTE & SPARK
  // ==========================================
  {
    id: "m3d1",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 1: The Hadoop Legacy",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Hadoop Distributed File System (HDFS) concepts",
      "Understanding the MapReduce paradigm",
      "Why disk-based processing was replaced by memory",
    ],
  },
  {
    id: "m3d2",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 2: Apache Spark Architecture",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Spark Driver, Executors, and Cluster Managers",
      "Execution Hierarchy: Jobs, Stages, and Tasks",
      "In-memory processing mechanics",
    ],
  },
  {
    id: "m3d3",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 3: Setting Up Spark Environments",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Setting up a local PySpark environment",
      "Initializing SparkSession",
      "Navigating the Databricks Community Edition free tier",
    ],
  },
  {
    id: "m3d4",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 4: PySpark Core & Data Structures",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Understanding Resilient Distributed Datasets (RDDs)",
      "The evolution from RDDs to the PySpark DataFrame API",
      "Reading disparate file formats (CSV, JSON, Parquet)",
    ],
  },
  {
    id: "m3d5",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 5: PySpark Transformations",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Executing narrow transformations (filter, select, map)",
      "Executing wide transformations (groupBy, join)",
      "Translating Pandas syntax into PySpark",
    ],
  },
  {
    id: "m3d6",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 6: Lazy Evaluation & Catalyst Optimizer",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Transformations vs. Actions",
      "How Spark builds logical execution plans",
      "Understanding the Catalyst Optimizer engine",
    ],
  },
  {
    id: "m3d7",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 7: Spark SQL Integration",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Using spark.sql() to execute raw SQL queries",
      "Mapping advanced SQL (CTEs, Window Functions) to Spark",
      "Creating and managing temporary views",
    ],
  },
  {
    id: "m3d8",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 8: PySpark Optimization Fundamentals",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Understanding data shuffling costs",
      "Managing partitions effectively",
      "Resolving Out-Of-Memory (OOM) errors",
    ],
  },
  {
    id: "m3d9",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 9: Advanced Spark Joins",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "When the optimizer uses a Sort-Merge Join",
      "When the optimizer uses a Broadcast Hash Join",
      "Forcing Broadcast joins for performance",
    ],
  },
  {
    id: "m3d10",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 10: Handling Data Skew",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Identifying skewed data across partitions",
      "Resolving skew using salting techniques",
      "Tuning spark.sql.shuffle.partitions",
    ],
  },
  {
    id: "m3d11",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 11: The Data Lakehouse Platform",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Merging Data Lakes with Data Warehouses",
      "Databricks platform architecture",
      "Workspace, Compute, and Repos overviews",
    ],
  },
  {
    id: "m3d12",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 12: Delta Lake Fundamentals",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "ACID transactions on object storage (AWS S3)",
      "Understanding the Delta transaction logs",
      "Time travel and versioning in Delta Lake",
    ],
  },
  {
    id: "m3d13",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "Day 13: The Medallion Architecture",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Bronze Layer: Raw data ingestion",
      "Silver Layer: Filtered, cleaned, and conformed data",
      "Gold Layer: Business-level aggregates",
    ],
  },
  {
    id: "p3",
    month: 3,
    phase: "Month 3: Distributed Compute (Spark)",
    title: "PROJECT: Databricks Medallion Pipeline",
    type: "Project",
    estDays: 6,
    subtopics: [
      "Load a massive open dataset (e.g., NYC Taxi) to PySpark",
      "Save raw ingestion as a Bronze Delta Table",
      "Apply transformations to clean nulls and write to Silver",
      "Perform distributed aggregations to create a Gold table",
      "Optimize the final Gold table partitions",
    ],
  },

  // ==========================================
  // MONTH 4: CLOUD DATA WAREHOUSING & dbt
  // ==========================================
  {
    id: "m4d1",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 1: Snowflake Architecture",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Cloud Services layer overview",
      "Virtual Compute Warehouses (Compute layer)",
      "Centralized Storage layer mechanics",
    ],
  },
  {
    id: "m4d2",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 2: Data Ingestion in Snowflake",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Setting up External Stages (AWS S3/Azure)",
      "Using the COPY INTO command for bulk loading",
      "Handling structured and semi-structured (JSON) data",
    ],
  },
  {
    id: "m4d3",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 3: Storage & Micro-partitioning",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Columnar storage efficiency & compression",
      "Micro-partitioning vs traditional B-Tree indexing",
      "Understanding clustering depth",
    ],
  },
  {
    id: "m4d4",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 4: Compute & Cost Optimization",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Scaling compute resources dynamically",
      "Warehouse sizing strategies (X-Small to 4X-Large)",
      "Configuring auto-suspend and auto-resume to save money",
    ],
  },
  {
    id: "m4d5",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 5: Advanced Snowflake Capabilities",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Time Travel: Querying historical data states",
      "Zero-Copy Cloning for instant testing environments",
      "Snowflake Streams and Tasks basics",
    ],
  },
  {
    id: "m4d6",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 6: CDC Simulation in Snowflake",
    type: "DB",
    estDays: 1,
    subtopics: [
      "Capturing inserts and updates from a raw table",
      "Merging updates into a production dimension table",
      "Validating data integrity during upserts",
    ],
  },
  {
    id: "m4d7",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 7: Intro to Analytics Engineering & dbt",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "The shift from ETL to ELT",
      "Treating SQL as modular, version-controlled software",
      "Overview of the dbt workflow",
    ],
  },
  {
    id: "m4d8",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 8: dbt Core Setup & Configuration",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Installing dbt Core locally",
      "Configuring the profiles.yml file",
      "Connecting dbt to your Snowflake instance",
    ],
  },
  {
    id: "m4d9",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 9: Foundational dbt Models",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Writing models as simple SELECT statements",
      "Materializations: Tables vs Views vs Ephemeral",
      "Establishing lineage with the ref() function",
    ],
  },
  {
    id: "m4d10",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 10: Refactoring Legacy SQL",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Breaking monolithic scripts into staging models",
      "Building intermediate models for complex logic",
      "Creating final fact and dimension models",
    ],
  },
  {
    id: "m4d11",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 11: dbt Data Quality & Testing",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Configuring schema.yml files",
      "Generic tests: not_null, unique, accepted_values",
      "Writing custom singular tests in SQL",
    ],
  },
  {
    id: "m4d12",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 12: Advanced dbt (Jinja & Macros)",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Jinja templating fundamentals",
      "Writing macros for dynamic SQL generation",
      "Applying DRY (Don't Repeat Yourself) principles",
    ],
  },
  {
    id: "m4d13",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "Day 13: SCDs and dbt Snapshots",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Handling SCD Type 2 automatically",
      "Implementing dbt Snapshots",
      "Tracking effective dates and active flags",
    ],
  },
  {
    id: "p4",
    month: 4,
    phase: "Month 4: Cloud Data Warehousing",
    title: "PROJECT: End-to-End Snowflake & dbt Pipeline",
    type: "Project",
    estDays: 6,
    subtopics: [
      "Set up a free Snowflake trial and load staging data",
      "Build dbt staging models for raw data",
      "Transform staging data into a rigorous Star Schema",
      "Execute quality tests via dbt test",
      "Generate and host the dbt documentation site",
    ],
  },

  // ==========================================
  // MONTH 5: WORKFLOW ORCHESTRATION & AIRFLOW
  // ==========================================
  {
    id: "m5d1",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 1: Airflow Architecture",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "The role of the Scheduler, Webserver, and Metadata DB",
      "Executor mechanisms overview",
      "Why cron is insufficient for complex pipelines",
    ],
  },
  {
    id: "m5d2",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 2: Anatomy of a DAG",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Defining Directed Acyclic Graphs (DAGs)",
      "Defining tasks as code",
      "Setting dependencies using bitshift operators (>>)",
    ],
  },
  {
    id: "m5d3",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 3: Basic Operators & Idempotency",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Implementing the PythonOperator and BashOperator",
      "Concept of pipeline Idempotency",
      "Setting up Airflow locally via Docker Compose",
    ],
  },
  {
    id: "m5d4",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 4: The TaskFlow API",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Transitioning to modern Airflow practices",
      "Using @dag and @task decorators",
      "Writing cleaner, intuitive Python pipelines",
    ],
  },
  {
    id: "m5d5",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 5: XComs (Cross-Communication)",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Why tasks are isolated by default",
      "Using xcom_push to output small data (like an ID)",
      "Using xcom_pull in the next task to retrieve it",
    ],
  },
  {
    id: "m5d6",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 6: Scheduling & Backfilling",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Understanding strict cron syntax",
      "Logical dates vs Execution dates",
      "Catchup=True and backfilling historical runs",
    ],
  },
  {
    id: "m5d7",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 7: Airflow Sensors",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Waiting for external events (e.g., S3KeySensor)",
      "Poke vs Reschedule modes",
      "Understanding trigger rules",
    ],
  },
  {
    id: "m5d8",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 8: Cloud Providers & Connections",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Storing API keys securely in Airflow Variables UI",
      "Creating Database Connections in the UI",
      "Using hooks to access connections in code",
    ],
  },
  {
    id: "m5d9",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 9: Error Handling & Resilience",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "Configuring task retries and retry_delay",
      "Setting up email_on_failure in default_args",
      "Establishing SLAs (Service Level Agreements)",
    ],
  },
  {
    id: "m5d10",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "Day 10: Executors Deep Dive & Mapping",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      "LocalExecutor vs CeleryExecutor vs KubernetesPodExecutor",
      "Dynamic task mapping at runtime",
      "Airflow best practices (no heavy compute in DAGs)",
    ],
  },
  {
    id: "p5",
    month: 5,
    phase: "Month 5: Orchestration & Airflow",
    title: "PROJECT: Fully Automated ELT DAG",
    type: "Project",
    estDays: 6,
    subtopics: [
      "Take your Python script from Month 2 (Weather API)",
      "Break it into functions: fetch_data() and load_to_db()",
      "Create a new Airflow DAG scheduled to run @daily",
      "Create TaskFlow API functions mapped to your script",
      "Turn on the DAG in the UI and watch it run successfully!",
    ],
  },

  // ==========================================
  // MONTH 6: EVENT STREAMING & CLOUD INFRASTRUCTURE
  // ==========================================
  {
    id: "m6d1",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 1: Kafka Architecture & Commit Logs",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "Apache Kafka as the central nervous system",
      "Brokers, Topics, and Partitions",
      "Transitioning from Zookeeper to KRaft consensus",
      "The append-only commit log paradigm",
    ],
  },
  {
    id: "m6d2",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 2: Kafka Producers & Consumers",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "How producers write events sequentially",
      "How consumers maintain offsets to read data independently",
      "Consumer Groups: Achieving high throughput distributed reads",
      "Spinning up a local Kafka cluster via Docker",
    ],
  },
  {
    id: "m6d3",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 3: Stream Processing Engines",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "PySpark Structured Streaming (micro-batch aggregations)",
      "Apache Flink (stateful stream processing overview)",
      "Event time vs Processing time",
      "Handling late data with watermarks and Tumbling/Sliding windows",
    ],
  },
  {
    id: "m6d4",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 4: Change Data Capture (CDC)",
    type: "BigData",
    estDays: 1,
    subtopics: [
      "What is Change Data Capture?",
      "Utilizing Debezium to read database transaction logs",
      "Streaming Postgres updates directly into Kafka topics",
    ],
  },
  {
    id: "m6d5",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 5: AWS Ecosystem: Networking & IAM",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "Fundamental cloud networking (VPCs, Subnets)",
      "Rigorous Identity and Access Management (IAM) role configurations",
    ],
  },
  {
    id: "m6d6",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 6: AWS Ecosystem: Storage & Querying",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "Configuring S3 for scalable data lake storage",
      "Utilizing AWS Glue for serverless ETL and data cataloging",
      "Leveraging Amazon Athena for ad-hoc serverless querying over S3",
      "Amazon Redshift architecture overview",
    ],
  },
  {
    id: "m6d7",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 7: Infrastructure as Code (Terraform)",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "Why manual cloud configuration is an anti-pattern",
      "Defining cloud infrastructure using declarative config files",
      "Terraform init, plan, and apply",
      "Managing state files securely",
    ],
  },
  {
    id: "m6d8",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "Day 8: CI/CD & Containerization (Docker)",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "Introduction to GitHub Actions / GitLab CI",
      "Building Continuous Integration/Continuous Deployment pipelines",
      "Automated testing of dbt models and Airflow DAGs",
      "Containerization strategies using Docker",
    ],
  },
  {
    id: "p6",
    month: 6,
    phase: "Month 6: Streaming & Cloud Infra",
    title: "PROJECT: Streaming Clickstream Pipeline",
    type: "Project",
    estDays: 6,
    subtopics: [
      "Deploy Kafka via Docker",
      "Write a Python producer to simulate live clickstream data",
      "Use PySpark Structured Streaming to read the Kafka topic",
      "Apply schema validation and write to a Delta Lake Bronze layer",
      "Calculate rolling active user metrics continuously",
    ],
  },

  // ==========================================
  // MONTH 7: PORTFOLIO & JOB READINESS
  // ==========================================
  {
    id: "m7p1",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "PORTFOLIO 1: The Batch Analytics Pipeline",
    type: "Project",
    estDays: 5,
    subtopics: [
      "Extract from complex public API using Python back-off strategies",
      "Write raw JSON to AWS S3 Landing bucket",
      "Use Airflow to orchestrate COPY INTO Snowflake",
      "Use dbt to flatten arrays and model into a Star Schema",
      "Containerize and document exhaustively on GitHub",
    ],
  },
  {
    id: "m7p2",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "PORTFOLIO 2: The Streaming Lakehouse",
    type: "Project",
    estDays: 5,
    subtopics: [
      "Deploy Databricks environment and Kafka cluster",
      "Python producer simulates IoT telemetry into Kafka topic",
      "PySpark Structured Streaming writes to Delta Bronze layer",
      "Clean continuous pipeline to Silver layer",
      "Aggregate to Gold layer optimized for dashboards",
    ],
  },
  {
    id: "m7d11",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "Day 11: Advanced SQL Interview Prep",
    type: "SQL",
    estDays: 1,
    subtopics: [
      "Mastering complex window functions out loud",
      "Solving Recursive CTE problems",
      "Explaining Query Performance Tuning and EXPLAIN plans",
    ],
  },
  {
    id: "m7d12",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "Day 12: System Design Whiteboarding",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Relational Database vs NoSQL document store trade-offs",
      "Batch processing vs Streaming architecture decisions",
      "Whiteboarding architectures using draw.io",
    ],
  },
  {
    id: "m7d13",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "Day 13: High Availability & Fault Tolerance",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Designing systems that survive node failures",
      "Replication vs Partitioning strategies",
      "Understanding the CAP theorem practically",
    ],
  },
  {
    id: "m7d14",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "Day 14: Emerging Trends (AI Engineering)",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      "How data pipelines feed Large Language Models (LLMs)",
      "Introduction to Vector Databases (Pinecone, Weaviate)",
      "Retrieval-Augmented Generation (RAG) mechanics",
    ],
  },
  {
    id: "m7d15",
    month: 7,
    phase: "Month 7: Portfolio & Job Readiness",
    title: "Day 15: Job Strategy & Application",
    type: "Project",
    estDays: 1,
    subtopics: [
      "Optimize LinkedIn headline and featured section",
      "Tailor resume to highlight pipeline impact (not just tools)",
      "Mock behavioral interviews (STAR method)",
      "Start aggressive application outreach",
    ],
  },
];

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

  const [customResources, setCustomResources] = useState<
    Record<string, CustomResource[]>
  >(() => {
    const saved = localStorage.getItem("de-tracker-custom-resources-multi");
    return saved ? JSON.parse(saved) : {};
  });

  const [bookmarkedSubtopics, setBookmarkedSubtopics] = useState<string[]>(
    () => {
      const saved = localStorage.getItem("de-tracker-bookmarks");
      return saved ? JSON.parse(saved) : [];
    },
  );

  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>(
    {},
  );

  // Navigation: Allows 1-7 OR 'Revision'
  const [activeMonth, setActiveMonth] = useState<number | "Revision">(1);

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
    localStorage.setItem(
      "de-tracker-bookmarks",
      JSON.stringify(bookmarkedSubtopics),
    );
  }, [
    startDate,
    completedTasks,
    completedSubtopics,
    customResources,
    bookmarkedSubtopics,
  ]);

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

  const toggleBookmark = (e: MouseEvent, subId: string) => {
    e.stopPropagation();
    setBookmarkedSubtopics((prev) => {
      if (prev.includes(subId)) return prev.filter((id) => id !== subId);
      return [...prev, subId];
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

  // --- Bookmarks View Render Helper ---
  const renderBookmarksView = () => {
    if (bookmarkedSubtopics.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Bookmark size={48} className="mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">
            No Revisions Saved
          </h3>
          <p className="max-w-md text-center">
            Click the bookmark icon next to any subtopic to save it here for
            quick review before interviews!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 p-4">
        {bookmarkedSubtopics.map((subId) => {
          const splitIdx = subId.lastIndexOf("-");
          const taskId = subId.substring(0, splitIdx);
          const subIdx = parseInt(subId.substring(splitIdx + 1));

          const task = curriculumData.find((t) => t.id === taskId);
          if (!task || !task.subtopics || !task.subtopics[subIdx]) return null;

          const subName = task.subtopics[subIdx];
          const isSubCompleted = completedSubtopics.includes(subId);
          const searchConfig = typeSearchMap[task.type] || {
            yt: task.type,
            web: task.type,
          };
          const cleanTaskTitle = task.title.replace(/^Day \d+: /, "");
          const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${searchConfig.yt} ${cleanTaskTitle} ${subName}`)}`;
          const readUrl = `https://www.google.com/search?q=${encodeURIComponent(`${searchConfig.web} ${cleanTaskTitle} ${subName}`)}`;
          const subtopicResources = customResources[subId] || [];
          const resourceCount = subtopicResources.length;
          const Icon = getTypeIcon(task.type);

          return (
            <div
              key={subId}
              className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5 flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeColor(task.type)}`}
                    >
                      <Icon size={10} /> {task.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {task.phase} • {task.title}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-0.5 cursor-pointer"
                      onClick={(e) =>
                        toggleSubtopic(
                          e,
                          task.id,
                          subIdx,
                          task.subtopics!.length,
                        )
                      }
                    >
                      {isSubCompleted ? (
                        <CheckCircle2 size={20} className="text-teal-500" />
                      ) : (
                        <Circle
                          size={20}
                          className="text-slate-500 hover:text-blue-400"
                        />
                      )}
                    </div>
                    <span
                      className={`text-base font-medium leading-relaxed ${isSubCompleted ? "text-slate-500 line-through" : "text-slate-200"}`}
                    >
                      {subName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 ml-9 xl:ml-0 flex-shrink-0">
                  {/* Bookmark Toggle */}
                  <button
                    onClick={(e) => toggleBookmark(e, subId)}
                    className="flex items-center justify-center p-2 rounded-md bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors border border-yellow-500/30 shadow-sm mr-1"
                    title="Remove Revision"
                  >
                    <BookmarkCheck size={16} className="fill-current" />
                  </button>

                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-700 hover:border-red-500/30"
                  >
                    <Youtube size={14} /> Watch
                  </a>
                  <a
                    href={readUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-700 hover:border-blue-500/30"
                  >
                    <BookOpen size={14} /> Read
                  </a>
                  <button
                    onClick={(e) => openModal(e, subId, subName)}
                    className="relative flex items-center justify-center p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 ml-1"
                  >
                    <LinkIcon size={16} />
                    {resourceCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#a855f7] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {resourceCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-6 font-sans selection:bg-blue-500/30 text-left">
      {/* GLOBAL CSS TO HIDE MAIN WINDOW SCROLLBAR BUT KEEP SCROLLING */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        body::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8 relative">
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
            label="Data Warehousing"
            icon={Server}
          />
          <CircularProgress
            percentage={stats["Pipeline"]}
            color="text-purple-400"
            label="Airflow / dbt"
            icon={Workflow}
          />
          <CircularProgress
            percentage={stats["BigData"]}
            color="text-orange-400"
            label="Spark / Streaming"
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

        {/* Navigation Tabs (Horizontal scroll on small screens) */}
        <div className="flex overflow-x-auto gap-3 pb-2 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[1, 2, 3, 4, 5, 6, 7].map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`px-5 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base flex-shrink-0 ${
                activeMonth === month
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              M {month}
            </button>
          ))}
          {/* Revision Tab */}
          <button
            onClick={() => setActiveMonth("Revision")}
            className={`px-4 md:px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base flex-shrink-0 flex items-center gap-2 ${
              activeMonth === "Revision"
                ? "bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20"
                : "bg-slate-800 text-yellow-500/70 hover:bg-slate-700 hover:text-yellow-400"
            }`}
          >
            <Bookmark
              size={18}
              className={activeMonth === "Revision" ? "fill-current" : ""}
            />{" "}
            Revision
          </button>
        </div>

        {/* Dynamic List Area (Tasks OR Revision) */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl mt-4">
          {activeMonth === "Revision" ? (
            <div className="max-h-[800px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {renderBookmarksView()}
            </div>
          ) : (
            <>
              <div className="p-4 md:p-6 bg-slate-800/50 border-b border-slate-700">
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  {
                    enrichedCurriculum.find((t) => t.month === activeMonth)
                      ?.phase
                  }
                </h2>
              </div>

              <div className="divide-y divide-slate-700/50 max-h-[800px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {enrichedCurriculum
                  .filter((t) => t.month === activeMonth)
                  .map((task) => {
                    const Icon = getTypeIcon(task.type);
                    const isExpanded = expandedTasks[task.id];

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
                                    ✔ Completed on{" "}
                                    {formatDate(task.displayDate)}
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
                                const isBookmarked =
                                  bookmarkedSubtopics.includes(subId);

                                // Smart URL Generation based on category mapping
                                const searchConfig = typeSearchMap[
                                  task.type
                                ] || { yt: task.type, web: task.type };
                                const cleanTaskTitle = task.title.replace(
                                  /^Day \d+: /,
                                  "",
                                );
                                const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${searchConfig.yt} ${cleanTaskTitle} ${sub}`)}`;
                                const readUrl = `https://www.google.com/search?q=${encodeURIComponent(`${searchConfig.web} ${cleanTaskTitle} ${sub}`)}`;

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

                                    {/* Resource Buttons (Stops click propagation) */}
                                    <div
                                      className="flex flex-wrap items-center gap-2 ml-7 xl:ml-0 flex-shrink-0"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {/* Bookmark Toggle Button */}
                                      <button
                                        onClick={(e) =>
                                          toggleBookmark(e, subId)
                                        }
                                        className={`flex items-center justify-center p-2 rounded-md transition-colors border shadow-sm mr-1 ${isBookmarked ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/20" : "bg-slate-800 text-slate-500 border-slate-700 hover:text-yellow-500 hover:border-yellow-500/30"}`}
                                        title={
                                          isBookmarked
                                            ? "Remove Revision"
                                            : "Bookmark for Revision"
                                        }
                                      >
                                        {isBookmarked ? (
                                          <BookmarkCheck
                                            size={16}
                                            className="fill-current"
                                          />
                                        ) : (
                                          <Bookmark size={16} />
                                        )}
                                      </button>

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
                                        onClick={(e) =>
                                          openModal(e, subId, sub)
                                        }
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
            </>
          )}
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
                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
