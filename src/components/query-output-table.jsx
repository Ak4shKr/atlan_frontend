import { Text, Table } from "@mantine/core";

const QueryOutputTable = ({ error, output, columns }) => {
  if (error) {
    return (
      <Text c="red" size="sm">
        Error: {error}
      </Text>
    );
  }

  if (output.length === 0) {
    return (
      <Text c="dimmed" mt="sm">
        No data to display.
      </Text>
    );
  }

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      stickyHeader
    >
      <Table.Thead>
        <Table.Tr>
          {columns.map((col) => (
            <Table.Th key={col}>{col}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {output.map((row, index) => (
          <Table.Tr key={`row-${index}`}>
            {columns.map((col) => (
              <Table.Td key={`${index}-${col}`}>{row[col]}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default QueryOutputTable;
