import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  ScrollArea,
  Flex,
  Paper,
  Stack,
  Text,
  useMantineTheme,
  Table,
} from "@mantine/core";
import { Navbar } from "../../components/Navbar";
import Editor from "@monaco-editor/react";
import students from "../../data/student.json";
import alasql from "alasql";

export const Home = () => {
  const [query, setQuery] = useState("");
  const queryRef = useRef("");
  // const [history, setHistory] = useState([]);
  const [output, setOutput] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!alasql.tables.students) {
      alasql(
        "CREATE TABLE students (name STRING, gender STRING, city STRING, country STRING, age NUMBER, marks NUMBER)"
      );
      alasql("INSERT INTO students SELECT * FROM ?", [students]);
    }
  }, []);
  const theme = useMantineTheme();

  const handleRun = () => {
    if (queryRef.current) {
      // setHistory((prev) => [queryRef.current, ...prev]);

      try {
        const result = alasql(queryRef.current); 

        if (result.length > 0) {
          setColumns(Object.keys(result[0])); 
        } else {
          setColumns([]);
        }

        setOutput(result); 
      } catch (error) {
        console.error("Query Error:", error.message);
        setOutput([{ error: error.message }]);
        setColumns(["error"]);
      }
    }
  };

  const handleClear = () => {
    queryRef.current = "";
    setQuery("");
    setOutput([]);
    setColumns([]);
  };

  return (
    <Box style={{ height: "100vh" }}>
      <Navbar />
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="md"
        p="lg"
        style={{ height: "calc(100% - 64px)" }}
      >
        <Box w={{ base: "100%", sm: "40%" }} style={{ height: "100%" }}>
          <Paper
            p="md"
            withBorder
            bg={theme.colors.myColor[0]}
            style={{
              height: "50%",
              border: `1px solid ${theme.colors.myColor[3]}`,
            }}
          >
            <Text size="lg" fw={700} mb="sm">
              SQL Editor
            </Text>
            <Editor
              height="calc(100% - 80px)"
              language="sql"
              theme="light"
              value={query}
              onChange={(value) => {
                queryRef.current = value;
                setQuery(value);
              }}
              options={{
                wordWrap: "on", 
              }}
            />
            <Flex mt="sm" gap="md">
              <Button size="xs" onClick={handleRun}>
                Run
              </Button>
              <Button size="xs" variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </Flex>
          </Paper>

          {/* <Paper
            mt="md"
            p="md"
            withBorder
            bg={theme.colors.myColor[0]}
            style={{
              height: "calc(50% - 16px)",
              overflowY: "auto",
              scrollbarWidth: "none",
              border: `1px solid ${theme.colors.myColor[3]}`,
            }}
          >
            <Text size="lg" fw={700} mb="sm">
              Query History
            </Text>
            <ScrollArea>
              <Stack gap="xs">
                {history.length === 0 ? (
                  <Text c={theme.colors.myColor[9]}>No queries yet !!</Text>
                ) : (
                  history.map((q, index) => (
                    <Text
                      key={index}
                      style={{
                        backgroundColor: "white",
                        padding: "6px",
                        wordSpacing: "6px",
                        borderRadius: "4px",
                        color: theme.colors.myColor[7],
                      }}
                    >
                      {q}
                    </Text>
                  ))
                )}
              </Stack>
            </ScrollArea>
          </Paper> */}
        </Box>

        {/* Right Panel - Output */}
        <Box w={{ base: "100%", sm: "60%" }} style={{ height: "100%" }}>
          <Paper p="md" shadow="sm" h="100%" withBorder>
            <Text size="lg" fw={700}>
              Query Output
            </Text>
            <ScrollArea style={{ height: "90%" }}>
              {output.length > 0 ? (
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      {columns.map((col) => (
                        <Table.Th key={col}>{col}</Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {output.map((row, index) => (
                      <Table.Tr key={index}>
                        {columns.map((col) => (
                          <Table.Td key={col}>{row[col]}</Table.Td>
                        ))}
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              ) : (
                <Text c="dimmed" mt="sm">
                  No data to display.
                </Text>
              )}
            </ScrollArea>
          </Paper>
        </Box>
      </Flex>
    </Box>
  );
};
