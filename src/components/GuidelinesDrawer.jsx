import {
  Drawer,
  ScrollArea,
  Text,
  List,
  Title,
  useMantineTheme,
  Box,
} from "@mantine/core";

const GuidelinesDrawer = ({ opened, onClose }) => {
  const theme = useMantineTheme();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={
        <Text size="xl" fw={700}>
          Guidelines
        </Text>
      }
      size="md"
      position="right"
    >
      <ScrollArea h="calc(100% - 60px)">
        <Box
          style={{
            maxWidth: "90%",
            textWrap: "wrap",
          }}
        >
          <Title order={4} mt="sm" style={{ color: theme.colors.myColor[6] }}>
            Your Data Playground
          </Title>
          <Text mt="xs">
            We've prepared a{" "}
            <span style={{ color: theme.colors.myColor[6], fontWeight: 600 }}>
              students
            </span>{" "}
            table with real-world data for you to explore:
          </Text>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              <Text span fw={500}>
                name
              </Text>{" "}
              (text)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                city
              </Text>{" "}
              (text)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                country
              </Text>{" "}
              (text)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                age
              </Text>{" "}
              (number)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                marks
              </Text>{" "}
              (number)
            </List.Item>
          </List>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Query Basics
          </Title>
          <Text mt="xs">
            Run{" "}
            <span
              style={{
                color: theme.colors.myColor[6],
                fontFamily: "monospace",
              }}
            >
              SELECT
            </span>{" "}
            queries to analyze the data:
          </Text>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              Find all students:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT * FROM students
              </Text>
            </List.Item>
            <List.Item>
              Filter by age:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT name FROM students WHERE age {">"} 20
              </Text>
            </List.Item>
            <List.Item>
              Group results:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT country, AVG(marks) FROM students GROUP BY country
              </Text>
            </List.Item>
            <List.Item>
              Sort results:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT * FROM students ORDER BY marks DESC
              </Text>
            </List.Item>
          </List>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Your Query History
          </Title>
          <Text mt="xs">
            We automatically save your last 20 queries in this browser.
          </Text>
          <Text mt="xs">
            To clear history:{" "}
            <span style={{ fontFamily: "monospace" }}>
              chrome://settings/siteSetting
            </span>{" "}
            (Chrome) or equivalent in your browser.
          </Text>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Power User Tips
          </Title>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              Use{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                LIKE
              </Text>{" "}
              for text searches:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT * FROM students WHERE name LIKE '%John%'
              </Text>
            </List.Item>
            <List.Item>
              Combine conditions with{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                AND/OR
              </Text>
            </List.Item>
            <List.Item>
              Calculate aggregates:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                COUNT()
              </Text>
              ,{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SUM()
              </Text>
              ,{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                AVG()
              </Text>
            </List.Item>
            <List.Item>
              We have made{" "}
              <Text
                span
                style={{ fontFamily: "monospace" }}
                c={theme.colors.myColor[5]}
              >
                Run
              </Text>{" "}
              button as disabled in case of empty query.
            </List.Item>{" "}
            <List.Item>
              Please try to access only{" "}
              <Text
                span
                style={{ fontFamily: "monospace" }}
                c={theme.colors.myColor[5]}
              >
                students
              </Text>{" "}
              table else you will find error.
            </List.Item>
          </List>

          <Text mt="lg" size="sm" fw={500} c="pink">
            Start simple, then try complex queries to uncover insights!
          </Text>
        </Box>
      </ScrollArea>
    </Drawer>
  );
};

export default GuidelinesDrawer;
