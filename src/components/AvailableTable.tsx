import {
  Box,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useMemo } from "react";

/**
 * @param {{ handleExampleClick?: () => void, getAllData: () => { students: any[], marks: any[] } }} props
 */
const QueryExample = ({ handleExampleClick, getAllData }) => {
  const theme = useMantineTheme();

  const { studentTable, marksTable } = useMemo(() => {
    const { students, marks } = getAllData();

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

    return { studentTable, marksTable };
  }, [getAllData]);

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
      {/* <Text size="lg" fw={700} mb="sm">
        Query Examples
      </Text> */}
      <Box style={{ flex: 1, minHeight: 0 }}>
        <ScrollArea style={{ height: "100%", paddingRight: 4 }}>
          <Stack gap="xs">
            {studentTable}
            {marksTable}
          </Stack>
        </ScrollArea>
      </Box>
    </Paper>
  );
};

export default QueryExample;
