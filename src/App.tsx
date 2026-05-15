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
  Monitor,
  LayoutDashboard,
  Sparkles,
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

// --- SMART INSTRUCTOR SEARCH ENGINE (Adapted for Primer Topics) ---
const typeSearchMap: Record<string, { yt: string; web: string }> = {
  Software: {
    yt: "Software Engineering Fundamentals tutorial",
    web: "Software Engineering Fundamentals documentation",
  },
  Web: {
    yt: "HTML JavaScript jQuery tutorial",
    web: "MDN Web Docs HTML JavaScript jQuery",
  },
  Python: {
    yt: "Python Programming tutorial for beginners",
    web: "Python 3 official documentation",
  },
  RDBMS: {
    yt: "MySQL RDBMS tutorial",
    web: "MySQL official documentation tutorial",
  },
  Agile: {
    yt: "Agile DevOps DevSecOps tutorial",
    web: "Agile DevOps DevSecOps methodology",
  },
  GenAI: {
    yt: "Generative AI Machine Learning Neural Networks",
    web: "Generative AI Architecture Transformers",
  },
  AWS: {
    yt: "AWS Cloud core services tutorial",
    web: "AWS documentation for beginners",
  },
};

// --- TypeScript Interfaces ---
interface Task {
  id: string;
  week: number;
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

// --- Accenture PRIMER 21-Day Curriculum ---
const curriculumData: Task[] = [
  // ==========================================
  // WEEK 1: Software Fundamentals & Web Tech
  // ==========================================
  {
    id: "w1d1",
    week: 1,
    phase: "Software Fundamentals",
    title: "Day 1: Logic & Algorithms",
    type: "Software",
    estDays: 1,
    subtopics: [
      "1. Logic Development",
      "2. Introduction to Algorithms, Flowcharts & Pseudocode",
    ],
  },
  {
    id: "w1d2",
    week: 1,
    phase: "Software Fundamentals",
    title: "Day 2: Core Programming Logic",
    type: "Software",
    estDays: 1,
    subtopics: [
      "3. Selection statements",
      "4. Looping statements",
      "5. Arrays",
    ],
  },
  {
    id: "w1d3",
    week: 1,
    phase: "Software Fundamentals",
    title: "Day 3: Software Engineering",
    type: "Software",
    estDays: 1,
    subtopics: [
      "6. Software Engineering Fundamentals",
      "7. Phases of Software Engineering",
      "8. Software Testing",
      "9. Software Configuration Management",
    ],
  },
  {
    id: "w1d4",
    week: 1,
    phase: "Web Technologies",
    title: "Day 4: HTML Essentials",
    type: "Web",
    estDays: 1,
    subtopics: ["1. HTML", "2. Debug- HTML"],
  },
  {
    id: "w1d5",
    week: 1,
    phase: "Web Technologies",
    title: "Day 5: JavaScript Fundamentals",
    type: "Web",
    estDays: 1,
    subtopics: ["3. JavaScript", "4. Javascript-debugging hands-on"],
  },
  {
    id: "w1d6",
    week: 1,
    phase: "Web Technologies",
    title: "Day 6: jQuery & Best Practices",
    type: "Web",
    estDays: 1,
    subtopics: [
      "5. JQuery",
      "6. Jquery-Debugging hands-on",
      "7. Web Design-Best Practices",
    ],
  },
  {
    id: "w1d7",
    week: 1,
    phase: "Programming using Python",
    title: "Day 7: Python Introduction",
    type: "Python",
    estDays: 1,
    subtopics: [
      "1. Python programming - Course Introduction",
      "2. Introduction to Python",
    ],
  },

  // ==========================================
  // WEEK 2: Python Mastery & RDBMS
  // ==========================================
  {
    id: "w2d8",
    week: 2,
    phase: "Programming using Python",
    title: "Day 8: Python Control Flow",
    type: "Python",
    estDays: 1,
    subtopics: ["3. Control Structures", "4. Collection Frameworks"],
  },
  {
    id: "w2d9",
    week: 2,
    phase: "Programming using Python",
    title: "Day 9: Functions & Files",
    type: "Python",
    estDays: 1,
    subtopics: ["5. Functions and Modules", "6. File Handling"],
  },
  {
    id: "w2d10",
    week: 2,
    phase: "Programming using Python",
    title: "Day 10: Code Quality",
    type: "Python",
    estDays: 1,
    subtopics: ["7. Code Analysis and Debugging"],
  },
  {
    id: "w2d11",
    week: 2,
    phase: "RDBMS using MySQL",
    title: "Day 11: RDBMS Concepts & ER",
    type: "RDBMS",
    estDays: 1,
    subtopics: ["1. RDBMS Concepts", "2. ER and Normalization"],
  },
  {
    id: "w2d12",
    week: 2,
    phase: "RDBMS using MySQL",
    title: "Day 12: SQL Syntax & Queries",
    type: "RDBMS",
    estDays: 1,
    subtopics: ["3. Data Definition Language", "4. Data Manipulation Language"],
  },
  {
    id: "w2d13",
    week: 2,
    phase: "RDBMS using MySQL",
    title: "Day 13: Filtering & Functions",
    type: "RDBMS",
    estDays: 1,
    subtopics: ["5. SQL Select Statement", "6. Function-Scalar & Aggregate"],
  },
  {
    id: "w2d14",
    week: 2,
    phase: "RDBMS using MySQL",
    title: "Day 14: Joins & Database Objects",
    type: "RDBMS",
    estDays: 1,
    subtopics: ["7. Joins & SubQuery", "8. DCL & Database Objects"],
  },

  // ==========================================
  // WEEK 3: Agile, Gen AI & AWS Cloud
  // ==========================================
  {
    id: "w3d15",
    week: 3,
    phase: "Agile & DevOps DevSecOps",
    title: "Day 15: Agile Methodologies",
    type: "Agile",
    estDays: 1,
    subtopics: [
      "1. Introduction to Agile",
      "2. Business Analytics and Design Thinking",
    ],
  },
  {
    id: "w3d16",
    week: 3,
    phase: "Agile & DevOps DevSecOps",
    title: "Day 16: DevOps & Security",
    type: "Agile",
    estDays: 1,
    subtopics: ["3. DevOps", "4. DevSecOps"],
  },
  {
    id: "w3d17",
    week: 3,
    phase: "Gen AI",
    title: "Day 17: Gen AI Foundations",
    type: "GenAI",
    estDays: 1,
    subtopics: [
      "1. Introduction to Generative AI",
      "2. Brief History of Generative AI",
      "3. Fundamentals of Machine Learning and Neural Networks",
    ],
  },
  {
    id: "w3d18",
    week: 3,
    phase: "Gen AI",
    title: "Day 18: Generative Models",
    type: "GenAI",
    estDays: 1,
    subtopics: [
      "4. Introduction to Generative Models",
      "5. Variational Autoencoders",
      "6. Generative Adversarial Networks",
    ],
  },
  {
    id: "w3d19",
    week: 3,
    phase: "Gen AI",
    title: "Day 19: Transformers & Applications",
    type: "GenAI",
    estDays: 1,
    subtopics: [
      "7. Sequence Generation with RNNs",
      "8. Transformers and Attention Mechanisms",
      "9. Generative AI in Industry and Real-World Applications",
    ],
  },
  {
    id: "w3d20",
    week: 3,
    phase: "AWS",
    title: "Day 20: AWS Core Services",
    type: "AWS",
    estDays: 1,
    subtopics: [
      "1. Introduction to AWS Cloud",
      "2. Technology - Core Services",
      "3. AWS Resources for Technology Support",
    ],
  },
  {
    id: "w3d21",
    week: 3,
    phase: "AWS",
    title: "Day 21: AWS Security & Arch",
    type: "AWS",
    estDays: 1,
    subtopics: [
      "4. Security and Compliance",
      "5. AWS cloud architecture design principles",
      "6. Billing and Pricing",
    ],
  },
];

export default function App() {
  // --- State Management ---
  // Default start date is May 14, 2026 based on user prompt
  const [startDate, setStartDate] = useState<string>(() => {
    const saved = localStorage.getItem("primer-tracker-start");
    return saved ? saved : "2026-05-14";
  });

  const [completedTasks, setCompletedTasks] = useState<Record<string, string>>(
    () => {
      const saved = localStorage.getItem("primer-tracker-tasks");
      return saved ? JSON.parse(saved) : {};
    },
  );

  const [completedSubtopics, setCompletedSubtopics] = useState<string[]>(() => {
    const saved = localStorage.getItem("primer-tracker-subtasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [customResources, setCustomResources] = useState<
    Record<string, CustomResource[]>
  >(() => {
    const saved = localStorage.getItem("primer-tracker-custom-resources");
    return saved ? JSON.parse(saved) : {};
  });

  const [bookmarkedSubtopics, setBookmarkedSubtopics] = useState<string[]>(
    () => {
      const saved = localStorage.getItem("primer-tracker-bookmarks");
      return saved ? JSON.parse(saved) : [];
    },
  );

  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>(
    {},
  );

  // Navigation: Allows Weeks 1-3 OR 'Revision'
  const [activeWeek, setActiveWeek] = useState<number | "Revision">(1);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSubtopicId, setActiveSubtopicId] = useState<string | null>(null);
  const [activeSubtopicName, setActiveSubtopicName] = useState<string>("");
  const [customTitle, setCustomTitle] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  // --- Save to LocalStorage ---
  useEffect(() => {
    localStorage.setItem("primer-tracker-start", startDate);
    localStorage.setItem(
      "primer-tracker-tasks",
      JSON.stringify(completedTasks),
    );
    localStorage.setItem(
      "primer-tracker-subtasks",
      JSON.stringify(completedSubtopics),
    );
    localStorage.setItem(
      "primer-tracker-custom-resources",
      JSON.stringify(customResources),
    );
    localStorage.setItem(
      "primer-tracker-bookmarks",
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
      "Software",
      "Web",
      "Python",
      "RDBMS",
      "Agile",
      "GenAI",
      "AWS",
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
      Software: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      Web: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      Python: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      RDBMS: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      Agile: "text-purple-400 bg-purple-400/10 border-purple-400/20",
      GenAI: "text-pink-400 bg-pink-400/10 border-pink-400/20",
      AWS: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    };
    return colors[type] || "text-slate-400 bg-slate-400/10 border-slate-400/20";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Software":
        return Monitor;
      case "Web":
        return LayoutDashboard;
      case "Python":
        return Code;
      case "RDBMS":
        return Database;
      case "Agile":
        return Workflow;
      case "GenAI":
        return Sparkles;
      case "AWS":
        return Cloud;
      default:
        return CheckCircle2;
    }
  };

  const getDiffColor = (diff: string) => {
    if (diff === "Easy")
      return "text-green-400 bg-green-400/10 border-green-400/20";
    if (diff === "Medium")
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    if (diff === "Hard") return "text-red-400 bg-red-400/10 border-red-400/20";
    return "text-slate-400 bg-slate-400/10 border-slate-400/20";
  };

  // --- Revision View Render Helper ---
  const renderRevisionView = () => {
    if (bookmarkedSubtopics.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Bookmark size={48} className="mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">
            No Revisions Saved
          </h3>
          <p className="max-w-md text-center">
            Click the bookmark icon next to any subtopic to save it here for
            quick review!
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

          const rawString = task.subtopics[subIdx];
          const parts = rawString.split("|");
          const subName = parts[0].trim();
          let difficulty = null;
          let directUrl = null;

          if (parts.length === 3) {
            difficulty = parts[1].trim();
            directUrl = parts[2].trim();
          } else if (parts.length === 2) {
            directUrl = parts[1].trim();
          }

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
                    <div className="flex items-center flex-wrap gap-2">
                      <span
                        className={`text-base font-medium leading-relaxed ${isSubCompleted ? "text-slate-500 line-through" : "text-slate-200"}`}
                      >
                        {subName}
                      </span>
                      {difficulty && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getDiffColor(difficulty)}`}
                        >
                          {difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 ml-9 xl:ml-0 flex-shrink-0">
                  <button
                    onClick={(e) => toggleBookmark(e, subId)}
                    className="flex items-center justify-center p-2 rounded-md bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors border border-yellow-500/30 shadow-sm mr-1"
                    title="Remove Revision"
                  >
                    <BookmarkCheck size={16} className="fill-current" />
                  </button>

                  {directUrl ? (
                    <a
                      href={directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-bold transition-colors border border-green-500/30 shadow-sm"
                    >
                      <Code size={14} /> Solve
                    </a>
                  ) : (
                    <>
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
                    </>
                  )}

                  <button
                    onClick={(e) => openModal(e, subId, subName)}
                    className="relative flex items-center justify-center p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 shadow-sm ml-1"
                  >
                    <LinkIcon size={16} />
                    {resourceCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-[#a855f7] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
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
              <HeartHandshake className="text-[#a855f7] w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-cyan-400">
                Accenture PRIMER Tracker
              </h1>
            </div>
            <p className="mt-2 text-slate-400 flex items-center gap-2 max-w-xl">
              21-Day rigorous completion tracker for your Primer modules.
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
                className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-[#a855f7]"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock size={16} /> Projected End
              </span>
              <span className="font-bold text-cyan-400">
                {formatDate(projectedEndDate)}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2.5 mt-2 border border-slate-700">
              <div
                className="bg-gradient-to-r from-[#a855f7] to-cyan-400 h-2.5 rounded-full transition-all duration-500"
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
            percentage={stats["Software"]}
            color="text-blue-400"
            label="Software Basics"
            icon={Monitor}
          />
          <CircularProgress
            percentage={stats["Web"]}
            color="text-orange-400"
            label="Web Tech"
            icon={LayoutDashboard}
          />
          <CircularProgress
            percentage={stats["Python"]}
            color="text-yellow-400"
            label="Python Mastery"
            icon={Code}
          />
          <CircularProgress
            percentage={stats["RDBMS"]}
            color="text-emerald-400"
            label="MySQL RDBMS"
            icon={Database}
          />
          <CircularProgress
            percentage={stats["Agile"]}
            color="text-purple-400"
            label="Agile & DevOps"
            icon={Workflow}
          />
          <CircularProgress
            percentage={stats["GenAI"]}
            color="text-pink-400"
            label="Generative AI"
            icon={Sparkles}
          />
          <CircularProgress
            percentage={stats["AWS"]}
            color="text-cyan-400"
            label="AWS Cloud"
            icon={Cloud}
          />
        </div>

        {/* Navigation Tabs (Horizontal scroll on small screens) */}
        <div className="flex overflow-x-auto gap-3 pb-2 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[1, 2, 3].map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`px-5 md:px-8 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base flex-shrink-0 ${
                activeWeek === week
                  ? "bg-[#a855f7] text-white shadow-lg shadow-purple-900/50"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              Week {week}
            </button>
          ))}
          {/* Revision Tab */}
          <button
            onClick={() => setActiveWeek("Revision")}
            className={`px-4 md:px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm md:text-base flex-shrink-0 flex items-center gap-2 ${
              activeWeek === "Revision"
                ? "bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20"
                : "bg-slate-800 text-yellow-500/70 hover:bg-slate-700 hover:text-yellow-400"
            }`}
          >
            <Bookmark
              size={18}
              className={activeWeek === "Revision" ? "fill-current" : ""}
            />{" "}
            Revision
          </button>
        </div>

        {/* Dynamic List Area (Tasks OR Revision) */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl mt-4">
          {activeWeek === "Revision" ? (
            <div className="max-h-[800px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {renderRevisionView()}
            </div>
          ) : (
            <>
              <div className="p-4 md:p-6 bg-slate-800/50 border-b border-slate-700">
                <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  {enrichedCurriculum.find((t) => t.week === activeWeek)?.phase}
                </h2>
              </div>

              <div className="divide-y divide-slate-700/50 max-h-[800px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {enrichedCurriculum
                  .filter((t) => t.week === activeWeek)
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
                        }`}
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

                                const parts = sub.split("|");
                                const subName = parts[0].trim();
                                let difficulty = null;
                                let directUrl = null;

                                if (parts.length === 3) {
                                  difficulty = parts[1].trim();
                                  directUrl = parts[2].trim();
                                } else if (parts.length === 2) {
                                  directUrl = parts[1].trim();
                                }

                                const isSubCompleted =
                                  completedSubtopics.includes(subId);
                                const isBookmarked =
                                  bookmarkedSubtopics.includes(subId);

                                const searchConfig = typeSearchMap[
                                  task.type
                                ] || { yt: task.type, web: task.type };
                                const cleanTaskTitle = task.title.replace(
                                  /^Day \d+: /,
                                  "",
                                );
                                const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${searchConfig.yt} ${cleanTaskTitle} ${subName}`)}`;
                                const readUrl = `https://www.google.com/search?q=${encodeURIComponent(`${searchConfig.web} ${cleanTaskTitle} ${subName}`)}`;

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
                                      <div className="flex items-center flex-wrap gap-2">
                                        <span
                                          className={`text-base font-medium leading-relaxed ${isSubCompleted ? "text-slate-500 line-through" : "text-slate-200"}`}
                                        >
                                          {subName}
                                        </span>
                                        {difficulty && (
                                          <span
                                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getDiffColor(difficulty)}`}
                                          >
                                            {difficulty}
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Resource Buttons */}
                                    <div
                                      className="flex flex-wrap items-center gap-2 ml-7 xl:ml-0 flex-shrink-0"
                                      onClick={(e) => e.stopPropagation()}
                                    >
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

                                      {directUrl ? (
                                        <a
                                          href={directUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-bold transition-colors border border-green-500/30 shadow-sm"
                                        >
                                          <Code size={14} /> Solve
                                        </a>
                                      ) : (
                                        <>
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
                                        </>
                                      )}

                                      <button
                                        onClick={(e) =>
                                          openModal(e, subId, subName)
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
