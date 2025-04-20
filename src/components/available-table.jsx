import {
  Box,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import alasql from "alasql";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";

const AvailableTables = ({ getAllData, dataReady }) => {
  const theme = useMantineTheme();
  const [openStates, setOpenStates] = useState({});

  const toggleTable = (tableName) => {
    setOpenStates((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  const data = useMemo(() => {
    if (!dataReady) return null;
    return getAllData();
  }, [dataReady, getAllData]);

  console.log("data at alasql tables", alasql.tables);

  if (!data) return <Loader type="bars" size={"xs"} mt={"md"} />;

  const { students, marks } = data;

  const tables = Object.keys(localStorage).filter((key) =>
    key.endsWith("_table")
  );

  let tableData = [];
  let tableColumns = [];
  let tablename = [];
  tables.forEach((tableKey) => {
    const tableContent = localStorage.getItem(tableKey);
    if (tableContent) {
      const parsedContent = JSON.parse(tableContent);
      tablename.push(tableKey.replace("_table", ""));
      tableData.push(parsedContent);
      tableColumns.push(Object.keys(parsedContent[0] || {}));
    }
  });

  const studentColumns = Object.keys(students[0] || {});
  const marksColumns = Object.keys(marks[0] || {});

  const studentTable = (
    <Paper
      style={{
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Group
        justify="space-between"
        align="center"
        onClick={() => toggleTable("students")}
        style={{
          cursor: "pointer",
        }}
      >
        <Text size="md" fw={600}>
          students Table
        </Text>
        <ChevronDown
          style={{
            transform: openStates["students"]
              ? "rotate(180deg)"
              : "rotate(0deg)",
            transition: "0.3s",
          }}
        />
      </Group>
      {openStates["students"] && (
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          bg="white"
          mt="md"
        >
          <Table.Thead>
            <Table.Tr>
              {studentColumns.map((col) => (
                <Table.Th key={col}>{col}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {students.map((row, index) => (
              <Table.Tr key={`student-row-${index}`}>
                {studentColumns.map((col) => (
                  <Table.Td key={`${index}-${col}`}>{row[col]}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );

  const marksTable = (
    <Paper
      style={{
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      <Group
        justify="space-between"
        align="center"
        onClick={() => toggleTable("marks")}
        style={{
          cursor: "pointer",
        }}
      >
        <Text size="md" fw={600}>
          marks Table
        </Text>
        <ChevronDown />
      </Group>
      {openStates["marks"] && (
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          bg="white"
          mt="md"
        >
          <Table.Thead>
            <Table.Tr>
              {marksColumns.map((col) => (
                <Table.Th key={col}>{col}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {marks.map((row, index) => (
              <Table.Tr key={`marks-row-${index}`}>
                {marksColumns.map((col) => (
                  <Table.Td key={`${index}-${col}`}>{row[col]}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Paper>
  );

  return (
    <Paper
      p="md"
      withBorder
      bg={theme.colors.myColor?.[0] || theme.colors.gray[0]}
      style={{
        border: `1px solid ${
          theme.colors.myColor?.[3] || theme.colors.gray[3]
        }`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box style={{ flex: 1, minHeight: 0 }}>
        <ScrollArea style={{ height: "100%", paddingRight: 4 }}>
          <Stack gap="xs">
            {studentTable}
            {marksTable}
            {tables.map((table, index) => {
              const tableName = table.replace("_table", "");
              return (
                <Paper
                  key={tableName}
                  style={{
                    backgroundColor: "white",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                >
                  <Group
                    justify="space-between"
                    align="center"
                    onClick={() => toggleTable(tableName)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Text size="md" fw={600}>
                      {tableName} Table
                    </Text>
                    <ChevronDown
                      style={{
                        transform: openStates[tableName]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "0.3s",
                      }}
                    />
                  </Group>
                  {openStates[tableName] && (
                    <Table
                      highlightOnHover
                      withTableBorder
                      withColumnBorders
                      bg="white"
                      mt="md"
                    >
                      <Table.Thead>
                        <Table.Tr>
                          {tableColumns[index].map((col) => (
                            <Table.Th key={col}>{col}</Table.Th>
                          ))}
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {tableData[index].map((row, rowIndex) => (
                          <Table.Tr key={`row-${rowIndex}`}>
                            {tableColumns[index].map((col) => (
                              <Table.Td key={`${rowIndex}-${col}`}>
                                {row[col]}
                              </Table.Td>
                            ))}
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  )}
                </Paper>
              );
            })}
          </Stack>
        </ScrollArea>
      </Box>
    </Paper>
  );
};

export default AvailableTables;
