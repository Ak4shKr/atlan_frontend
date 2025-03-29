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
  };
};

export default useHome;
