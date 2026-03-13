import { useState, useEffect, useMemo, MouseEvent, ElementType } from "react";
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
interface Subtopic {
  label: string;
  videoUrl: string;
  readUrl: string;
}

interface Task {
  id: string;
  month: number;
  phase: string;
  title: string;
  type: string;
  estDays: number;
  subtopics?: Subtopic[];
}

// --- Comprehensive Day-by-Day Curriculum with Subtopics ---
const curriculumData: Task[] = [
  // ==========================================
  // MONTH 1: SQL FOUNDATIONS
  // ==========================================
  {
    id: "m1d1",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 1: What is a Database?",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Relational vs Non-Relational overview",
        videoUrl: "https://youtu.be/ztHopE5Wnpc",
        readUrl: "https://www.ibm.com/topics/relational-databases",
      },
      {
        label: "What is an RDBMS? Tables, Rows, Columns",
        videoUrl: "https://youtu.be/HXV3zeQKqGY",
        readUrl: "https://www.w3schools.com/sql/sql_intro.asp",
      },
    ],
  },
  {
    id: "m1d2",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 2: First Query! SELECT & LIMIT",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "SELECT * (Selecting everything)",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=286",
        readUrl: "https://www.w3schools.com/sql/sql_select.asp",
      },
      {
        label: "Using LIMIT to restrict results",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=480",
        readUrl:
          "https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-limit/",
      },
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
      {
        label: "The WHERE clause syntax",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=552",
        readUrl: "https://www.w3schools.com/sql/sql_where.asp",
      },
      {
        label: "Equality and Inequality operators",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=600",
        readUrl: "https://www.w3schools.com/sql/sql_operators.asp",
      },
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
      {
        label: "Combining conditions with AND / OR",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=670",
        readUrl: "https://www.w3schools.com/sql/sql_and_or.asp",
      },
      {
        label: "Excluding results with NOT",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=720",
        readUrl: "https://www.w3schools.com/sql/sql_not.asp",
      },
    ],
  },
  {
    id: "m1d5",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 5: Searching Patterns (LIKE)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "The LIKE operator and % wildcard",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=850",
        readUrl: "https://www.w3schools.com/sql/sql_like.asp",
      },
      {
        label: "Case sensitivity (ILIKE in Postgres)",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=900",
        readUrl:
          "https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-like/",
      },
    ],
  },
  {
    id: "m1d6",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 6: Handling Lists (IN, BETWEEN)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Filtering within a range using BETWEEN",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=960",
        readUrl: "https://www.w3schools.com/sql/sql_between.asp",
      },
      {
        label: "Filtering against a list using IN",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=1000",
        readUrl: "https://www.w3schools.com/sql/sql_in.asp",
      },
    ],
  },
  {
    id: "m1d7",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 7: Sorting results (ORDER BY)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Using ORDER BY (ASC vs DESC)",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=1100",
        readUrl: "https://www.w3schools.com/sql/sql_orderby.asp",
      },
    ],
  },
  {
    id: "m1d8",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 8: Aggregations Part 1 (COUNT, SUM)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Counting total rows with COUNT",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=3500",
        readUrl: "https://www.w3schools.com/sql/sql_count.asp",
      },
      {
        label: "Adding up values with SUM",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=3600",
        readUrl: "https://www.w3schools.com/sql/sql_sum.asp",
      },
    ],
  },
  {
    id: "m1d9",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 9: Aggregations Part 2 (MIN, MAX, AVG)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Finding lowest/highest with MIN/MAX",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=3700",
        readUrl: "https://www.w3schools.com/sql/sql_min_max.asp",
      },
      {
        label: "Calculating averages with AVG",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=3800",
        readUrl: "https://www.w3schools.com/sql/sql_avg.asp",
      },
    ],
  },
  {
    id: "m1d10",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 10: Grouping Data (GROUP BY)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "How GROUP BY works with aggregates",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=4000",
        readUrl: "https://www.w3schools.com/sql/sql_groupby.asp",
      },
    ],
  },
  {
    id: "m1d11",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 11: Filtering grouped data (HAVING)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Difference between WHERE and HAVING",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=4200",
        readUrl: "https://www.w3schools.com/sql/sql_having.asp",
      },
    ],
  },
  {
    id: "m1d12",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 12: Primary Keys & Foreign Keys",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "What makes a Primary Key unique?",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=1500",
        readUrl: "https://www.w3schools.com/sql/sql_primarykey.asp",
      },
      {
        label: "Linking tables with Foreign Keys",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=1600",
        readUrl: "https://www.w3schools.com/sql/sql_foreignkey.asp",
      },
    ],
  },
  {
    id: "m1d13",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 13: Combining Tables (INNER JOIN)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "INNER JOIN syntax and logic",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=4500",
        readUrl: "https://www.w3schools.com/sql/sql_join_inner.asp",
      },
    ],
  },
  {
    id: "m1d14",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 14: LEFT JOIN and RIGHT JOIN",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "When to use a LEFT JOIN",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=4800",
        readUrl: "https://www.w3schools.com/sql/sql_join_left.asp",
      },
      {
        label: "Understanding RIGHT JOIN",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=5000",
        readUrl: "https://www.w3schools.com/sql/sql_join_right.asp",
      },
    ],
  },
  {
    id: "m1d15",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 15: Subqueries",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Queries inside Queries (WHERE IN)",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=5500",
        readUrl:
          "https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-subquery/",
      },
    ],
  },
  {
    id: "m1d16",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 16: CTEs (Common Table Expressions)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "The WITH clause syntax",
        videoUrl: "https://youtu.be/HXV3zeQKqGY?t=6000",
        readUrl:
          "https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-cte/",
      },
    ],
  },
  {
    id: "m1d17",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 17: Window Functions (OVER, PARTITION BY)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "Window Function vs GROUP BY",
        videoUrl: "https://youtu.be/Ww71knvhQ-s",
        readUrl:
          "https://www.postgresqltutorial.com/postgresql-window-function/",
      },
    ],
  },
  {
    id: "m1d18",
    month: 1,
    phase: "Month 1: SQL Mastery",
    title: "Day 18: Window Functions (ROW_NUMBER, RANK)",
    type: "SQL",
    estDays: 1,
    subtopics: [
      {
        label: "ROW_NUMBER() and RANK()",
        videoUrl: "https://youtu.be/Ww71knvhQ-s?t=300",
        readUrl:
          "https://www.postgresqltutorial.com/postgresql-window-function/postgresql-row_number/",
      },
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
      {
        label: "Install Python & VS Code",
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=150",
        readUrl: "https://www.w3schools.com/python/python_getstarted.asp",
      },
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
      {
        label: "Strings, Integers, Floats, Booleans",
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=500",
        readUrl: "https://www.w3schools.com/python/python_variables.asp",
      },
    ],
  },
  {
    id: "m2d3",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 3: Intro to Lists",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Creating and indexing Lists",
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=1500",
        readUrl: "https://www.w3schools.com/python/python_lists.asp",
      },
    ],
  },
  {
    id: "m2d4",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 4: Dictionaries",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Key-Value pairs",
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=2200",
        readUrl: "https://www.w3schools.com/python/python_dictionaries.asp",
      },
    ],
  },
  {
    id: "m2d5",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 5: Logic and Conditionals (if/else)",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "The if, elif, and else statements",
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=2500",
        readUrl: "https://www.w3schools.com/python/python_conditions.asp",
      },
    ],
  },
  {
    id: "m2d6",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: 'Day 6: The "for" loop',
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Iterating through a List or Range",
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=3000",
        readUrl: "https://www.w3schools.com/python/python_for_loops.asp",
      },
    ],
  },
  {
    id: "m2d7",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 7: Defining Functions",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: 'The "def" keyword and Returns',
        videoUrl: "https://youtu.be/_uQrJ0TkZlc?t=3500",
        readUrl: "https://www.w3schools.com/python/python_functions.asp",
      },
    ],
  },
  {
    id: "m2d8",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 8: File I/O & JSON",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Reading/Writing text files & JSON",
        videoUrl: "https://youtu.be/Uh2ebFW8OYM",
        readUrl: "https://www.w3schools.com/python/python_file_handling.asp",
      },
    ],
  },
  {
    id: "m2d9",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 9: APIs (Requests Library)",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Making a GET request with pip install requests",
        videoUrl: "https://youtu.be/tb8gHvYlCFs",
        readUrl: "https://realpython.com/python-requests/",
      },
    ],
  },
  {
    id: "m2d10",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 10: Intro to Pandas Library",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Pandas DataFrames and Series",
        videoUrl: "https://youtu.be/vmEHCJofslg",
        readUrl:
          "https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html",
      },
    ],
  },
  {
    id: "m2d11",
    month: 2,
    phase: "Month 2: Python Foundations",
    title: "Day 11: Pandas Selecting and Filtering",
    type: "Python",
    estDays: 1,
    subtopics: [
      {
        label: "Filtering rows based on conditions",
        videoUrl: "https://youtu.be/vmEHCJofslg?t=900",
        readUrl:
          "https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html",
      },
    ],
  },

  // ==========================================
  // MONTH 3: DATABASES & DATA WAREHOUSING
  // ==========================================
  {
    id: "m3d1",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 1: Relational Data Modeling (ERDs)",
    type: "DB",
    estDays: 1,
    subtopics: [
      {
        label: "Primary/Foreign Keys and normalization",
        videoUrl: "https://youtu.be/ztHopE5Wnpc",
        readUrl: "https://www.guru99.com/database-normalization.html",
      },
    ],
  },
  {
    id: "m3d2",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 2: OLTP vs OLAP",
    type: "DB",
    estDays: 1,
    subtopics: [
      {
        label: "Transactional vs Analytical databases",
        videoUrl: "https://youtu.be/GetjvEU-T08",
        readUrl:
          "https://aws.amazon.com/compare/the-difference-between-olap-and-oltp/",
      },
    ],
  },
  {
    id: "m3d3",
    month: 3,
    phase: "Month 3: Databases & Architecture",
    title: "Day 3: Facts and Dimensions (Star Schema)",
    type: "DB",
    estDays: 1,
    subtopics: [
      {
        label: "Data Warehouse Star Schema design",
        videoUrl: "https://youtu.be/1mE-F8H2pIQ",
        readUrl: "https://www.databricks.com/glossary/star-schema",
      },
    ],
  },

  // ==========================================
  // MONTH 4: DATA PIPELINES & AIRFLOW
  // ==========================================
  {
    id: "m4d1",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 1: Intro to Apache Airflow",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      {
        label: "What is Airflow? DAGs and Tasks",
        videoUrl: "https://youtu.be/K9AnJ9peGfs",
        readUrl:
          "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html",
      },
    ],
  },
  {
    id: "m4d2",
    month: 4,
    phase: "Month 4: Pipelines & Airflow",
    title: "Day 2: Operators & Dependencies",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      {
        label: "PythonOperator, BashOperator, and Bitshifts (>>)",
        videoUrl: "https://youtu.be/K9AnJ9peGfs?t=600",
        readUrl:
          "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/operators.html",
      },
    ],
  },

  // ==========================================
  // MONTH 5: BIG DATA & CLOUD
  // ==========================================
  {
    id: "m5d1",
    month: 5,
    phase: "Month 5: Spark & Cloud",
    title: "Day 1: Intro to Apache Spark",
    type: "BigData",
    estDays: 1,
    subtopics: [
      {
        label: "Distributed computing & PySpark DataFrames",
        videoUrl: "https://youtu.be/_C8kWso4ne4",
        readUrl:
          "https://spark.apache.org/docs/latest/sql-getting-started.html",
      },
    ],
  },
  {
    id: "m5d2",
    month: 5,
    phase: "Month 5: Spark & Cloud",
    title: "Day 2: AWS S3 & Boto3",
    type: "Cloud",
    estDays: 1,
    subtopics: [
      {
        label: "Uploading files to AWS S3 using Python",
        videoUrl: "https://youtu.be/3hLmDS179YE",
        readUrl:
          "https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html",
      },
    ],
  },

  // ==========================================
  // MONTH 6: dbt & CAPSTONE
  // ==========================================
  {
    id: "m6d1",
    month: 6,
    phase: "Month 6: dbt & Capstone",
    title: "Day 1: What is dbt? (Data Build Tool)",
    type: "Pipeline",
    estDays: 1,
    subtopics: [
      {
        label: "Transforming data in the Warehouse (ELT)",
        videoUrl: "https://youtu.be/5rNxe8ikB2Q",
        readUrl: "https://docs.getdbt.com/docs/introduction",
      },
    ],
  },
  {
    id: "m6d2",
    month: 6,
    phase: "Month 6: dbt & Capstone",
    title: "Day 2: Version Control (Git)",
    type: "Project",
    estDays: 1,
    subtopics: [
      {
        label: "Git Init, Add, Commit, Push",
        videoUrl: "https://youtu.be/8JJ101D3knE",
        readUrl: "https://docs.github.com/en/get-started/using-git/about-git",
      },
    ],
  },
  {
    id: "p1",
    month: 6,
    phase: "Month 6: dbt & Capstone",
    title: "CAPSTONE: End-to-End Pipeline",
    type: "Project",
    estDays: 7,
    subtopics: [
      {
        label: "Write a Python script to fetch API data",
        videoUrl: "https://youtu.be/WpQSYbeEFGw",
        readUrl: "https://realpython.com/python-requests/",
      },
      {
        label: "Upload raw data to AWS S3",
        videoUrl: "https://youtu.be/3hLmDS179YE",
        readUrl:
          "https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html",
      },
      {
        label: "Clean data with PySpark",
        videoUrl: "https://youtu.be/_C8kWso4ne4",
        readUrl:
          "https://spark.apache.org/docs/latest/sql-getting-started.html",
      },
      {
        label: "Orchestrate daily with Airflow",
        videoUrl: "https://youtu.be/K9AnJ9peGfs",
        readUrl:
          "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html",
      },
    ],
  },
];

// --- Circular Progress Component Props ---
interface CircularProgressProps {
  percentage: number;
  color: string;
  label: string;
  icon: ElementType;
}

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
  const handleParentClick = (e: MouseEvent, task: Task) => {
    // If it has subtopics, expanding it is the only way to interact with it.
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
    e.stopPropagation(); // Prevents expanding/collapsing the parent row
    const subId = `${taskId}-${subIdx}`;

    // Calculate new subtopics array locally first
    const isCurrentlyCompleted = completedSubtopics.includes(subId);
    const newSubtopics = isCurrentlyCompleted
      ? completedSubtopics.filter((id) => id !== subId)
      : [...completedSubtopics, subId];

    setCompletedSubtopics(newSubtopics);

    // AUTO-COMPLETE ENGINE: Check if parent task should be marked as done
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
        // Subtopic unchecked! Unmark parent.
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
        let isCompleted = !!completedTasks[task.id];

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
                    onClick={(e) => handleParentClick(e, task)}
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
                                    {sub.label}
                                  </span>
                                </div>

                                {/* Resource Buttons */}
                                <div
                                  className="flex flex-wrap items-center gap-2 ml-7 xl:ml-0 flex-shrink-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <a
                                    href={sub.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-700 hover:border-red-500/30 shadow-sm"
                                  >
                                    <Youtube size={14} /> Watch
                                  </a>
                                  <a
                                    href={sub.readUrl}
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
