import { useState, useRef, useEffect, useCallback } from "react";
import alasql from "alasql";

const useHome = () => {
  const [output, setOutput] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);
  const [historydrawerOpened, setHistoryDrawerOpened] = useState(false);
  const [guidelinesdrawerOpened, setGuidelinesDrawerOpened] = useState(false);
  const [history, setHistory] = useState([]);
  const [dataReady, setDataReady] = useState(false);

  const defaultQuery =
    "SELECT students.name, marks.physics FROM students JOIN marks ON students.id = marks.studentId;";
  const [query, setQuery] = useState(defaultQuery);
  const queryRef = useRef(defaultQuery);

  useEffect(() => {
    const initAlasql = async () => {
      if (!alasql.tables.students) {
        alasql(
          "CREATE TABLE students (id NUMBER, name STRING, age NUMBER, gender STRING, city STRING)"
        );
        alasql(
          "CREATE TABLE marks (studentId NUMBER, physics NUMBER, chemistry NUMBER, math NUMBER, english NUMBER, hindi NUMBER)"
        );

        const tableKeys = Object.keys(localStorage).filter((key) =>
          key.endsWith("_table")
        );

        tableKeys.forEach((tableKey) => {
          const tableData = JSON.parse(localStorage.getItem(tableKey));
          const tableName = tableKey.replace("_table", "");

          if (!alasql.tables[tableName]) {
            const keys = Object.keys(tableData[0]);
            const schema = keys.map((k) => `${k} STRING`).join(", ");
            alasql(`CREATE TABLE ${tableName} (${schema})`);
            alasql(`INSERT INTO ${tableName} SELECT * FROM ?`, [tableData]);
          }
        });
        const studentsData = await import("../../data/student1.json");
        const marksData = await import("../../data/marks1.json");

        alasql("INSERT INTO students SELECT * FROM ?", [studentsData.default]);
        alasql("INSERT INTO marks SELECT * FROM ?", [marksData.default]);
      }

      setDataReady(true);
    };

    initAlasql();
  }, []);

  const getAllData = useCallback(() => {
    const students = alasql("SELECT * FROM students");
    const marks = alasql("SELECT * FROM marks");

    return { students, marks };
  }, []);

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
    setHistoryDrawerOpened((prev) => !prev);
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

    // if (
    //   !currentQuery.trim().toUpperCase().startsWith("SELECT") &&
    //   !currentQuery.trim().toUpperCase().startsWith("CREATE")
    // ) {
    //   setError("Only SELECT & CREATE queries are allowed.");
    //   setOutput([]);
    //   setColumns([]);
    //   return;
    // }

    if (
      currentQuery.trim().toUpperCase().startsWith("CREATE") ||
      currentQuery.trim().toUpperCase().startsWith("INSERT")
    ) {
      try {
        const result = alasql(currentQuery);
        console.log("Table Created:", result);
        localStorage.setItem(
          `${currentQuery.split(" ")[2]}_table`,
          JSON.stringify(alasql("SELECT * FROM " + currentQuery.split(" ")[2]))
        );
        setError(null);
        setOutput([]);
        setColumns([]);
        setDataReady(!!dataReady);
        addToHistory(currentQuery);
        setQuery("");
        return;
      } catch (err) {
        console.error("Query Error:", err.message);
        setError(err.message);
        setOutput([]);
        setColumns([]);
      }
    } else if (currentQuery.trim().toUpperCase().startsWith("DROP")) {
      try {
        const result = alasql(currentQuery);
        console.log("Table Updated:", result);
        localStorage.removeItem(`${currentQuery.split(" ")[2]}_table`);
        setError(null);
        setOutput([]);
        setColumns([]);
        setDataReady(!!dataReady);
        addToHistory(currentQuery);
        setQuery("");
        queryRef.current = "";
        return;
      } catch (err) {
        console.error("Query Error:", err.message);
        setError(err.message);
        setOutput([]);
        setColumns([]);
      }
    } else {
      try {
        const result = alasql(currentQuery);
        console.log("Query Result:", result);
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
    dataReady,
  };
};

export default useHome;
