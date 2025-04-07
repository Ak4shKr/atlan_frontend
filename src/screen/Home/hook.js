import { useState, useRef, useEffect } from "react";
import alasql from "alasql";

const useHome = () => {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [historydrawerOpened, setHisttoryDrawerOpened] = useState(false);
  const [guidelinesdrawerOpened, setGuidelinesDrawerOpened] = useState(false);
  const [history, setHistory] = useState([]);
  const queryRef = useRef("");

  useEffect(() => {
    const initAlasql = async () => {
      if (!alasql.tables.students) {
        const { default: alasql } = await import("alasql");
        alasql(
          "CREATE TABLE students (id NUMBER, name STRING, age NUMBER,gender STRING, city STRING )"
        );
        alasql(
          "CREATE TABLE marks (studentId NUMBER, physics NUMBER, chemistry NUMBER,math NUMBER, english NUMBER, hindi NUMBER )"
        );
        const studentsData = await import("../../data/student1.json");
        const marksData = await import("../../data/marks1.json");
        alasql("INSERT INTO students SELECT * FROM ?", [studentsData.default]);
        alasql("INSERT INTO marks SELECT * FROM ?", [marksData.default]);
      }
    };
    initAlasql();
  }, []);

  const getAllData = () => {
    const students = alasql("SELECT * FROM students");
    const marks = alasql("SELECT * FROM marks");
    return { students, marks };
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("queryHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("queryHistory", JSON.stringify(history));
  }, [history]);

  const toggleHistoryDrawer = () => {
    setHisttoryDrawerOpened((prev) => !prev);
  };
  const toggleGuidelinesDrawer = () => {
    setGuidelinesDrawerOpened((prev) => !prev);
  };

  const addToHistory = (query) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      const newHistory = [query, ...prev.filter((q) => q !== query)];
      return newHistory.slice(0, 20);
    });
  };

  const handleRun = () => {
    const currentQuery = queryRef.current;
    if (!currentQuery) return;

    if (!currentQuery.trim().toUpperCase().startsWith("SELECT")) {
      setError("Only SELECT queries are allowed.");
      setOutput([]);
      setColumns([]);
      return;
    }

    try {
      const result = alasql(currentQuery);
      if (result.length > 0) {
        addToHistory(currentQuery);
        const newColumns = Object.keys(result[0]);
        setColumns(newColumns);
        setOutput(result);
        setError(null);
      } else {
        setColumns([]);
        setOutput([]);
        setError("No results found.");
      }
    } catch (err) {
      console.error("Query Error:", err.message);
      setError(err.message);
      setOutput([]);
      setColumns([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    queryRef.current = "";
    setOutput([]);
    setColumns([]);
    setError(null);
  };

  const handleEditorChange = (value) => {
    queryRef.current = value || "";
    setQuery(value || "");
  };

  const handleExampleClick = (exampleQuery) => {
    setQuery(exampleQuery);
    queryRef.current = exampleQuery;
  };

  return {
    query,
    output,
    columns,
    error,
    handleRun,
    handleClear,
    handleEditorChange,
    handleExampleClick,
    toggleGuidelinesDrawer,
    toggleHistoryDrawer,
    guidelinesdrawerOpened,
    historydrawerOpened,
    history,
    getAllData,
  };
};

export default useHome;
