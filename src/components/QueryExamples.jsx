import {
  Box,
  Button,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMemo } from "react";

const QUERY_EXAMPLES = [
  "select * from students;",
  "select * from students where age > 90 AND gender = 'Female';",
  "select name, gender, age from students;",
  "select country, count(*) as student_count from students group by country;",
];

const QueryExample = ({ handleExampleClick }) => {
  const theme = useMantineTheme();
  const queryExamplesList = useMemo(
    () =>
      QUERY_EXAMPLES.map((exampleQuery, index) => (
        <Text
          key={`example-${index}`}
          size="0.75rem"
          style={{
            backgroundColor: "white",
            padding: "6px",
            wordSpacing: "4px",
            borderRadius: "4px",
            color: theme.colors.myColor[6],
            fontWeight: "500",
            cursor: "pointer",
          }}
          onClick={() => handleExampleClick(exampleQuery)}
        >
          {exampleQuery}
        </Text>
      )),
    [handleExampleClick, theme.colors.myColor]
  );

  return (
    <Paper
      mt="md"
      p="md"
      withBorder
      bg={theme.colors.myColor[0]}
      style={{
        border: `1px solid ${theme.colors.myColor[3]}`,
        height: "46%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text size="lg" fw={700} mb="sm">
        Query Examples
      </Text>
      <Box style={{ flex: 1, minHeight: 0 }}>
        <ScrollArea
          style={{
            height: "100%",
            paddingRight: 10,
            scrollbarWidth: "none",
          }}
        >
          <Stack gap="xs" style={{ paddingRight: 4 }}>
            {queryExamplesList}
          </Stack>
        </ScrollArea>
      </Box>
    </Paper>
  );
};

export default QueryExample;
