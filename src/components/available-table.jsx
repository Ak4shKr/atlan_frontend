import {
  Box,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useMemo } from "react";

const AvailableTables = ({ getAllData, dataReady }) => {
  const theme = useMantineTheme();

  const data = useMemo(() => {
    if (!dataReady) return null;
    return getAllData();
  }, [dataReady, getAllData]);

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
    <>
      <Text size="md" fw={600}>
        students Table
      </Text>
      <Table highlightOnHover withTableBorder withColumnBorders bg="white">
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
    </>
  );

  const marksTable = (
    <>
      <Text size="md" fw={600}>
        marks Table
      </Text>
      <Table highlightOnHover withTableBorder withColumnBorders bg="white">
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
    </>
  );

  return (
    <Paper
      mt="md"
      p="md"
      withBorder
      bg={theme.colors.myColor?.[0] || theme.colors.gray[0]}
      style={{
        border: `1px solid ${
          theme.colors.myColor?.[3] || theme.colors.gray[3]
        }`,
        height: "46%",
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
                <Box key={index}>
                  <Text size="md" fw={600}>
                    {tableName} Table
                  </Text>
                  <Table
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    bg="white"
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
                </Box>
              );
            })}
          </Stack>
        </ScrollArea>
      </Box>
    </Paper>
  );
};

export default AvailableTables;
