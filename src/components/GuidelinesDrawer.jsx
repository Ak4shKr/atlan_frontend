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
            We've prepared two tables for you to explore:{" "}
            <span style={{ color: theme.colors.myColor[6], fontWeight: 600 }}>
              students
            </span>{" "}
            and{" "}
            <span style={{ color: theme.colors.myColor[6], fontWeight: 600 }}>
              marks
            </span>
            .
          </Text>

          <Title order={5} mt="md" style={{ color: theme.colors.myColor[6] }}>
            Students Table
          </Title>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              <Text span fw={500}>
                id
              </Text>{" "}
              (integer, primary key)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                name
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
                gender
              </Text>{" "}
              (text)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                city
              </Text>{" "}
              (text)
            </List.Item>
          </List>

          <Title order={5} mt="md" style={{ color: theme.colors.myColor[6] }}>
            Marks Table
          </Title>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              <Text span fw={500}>
                id
              </Text>{" "}
              (integer, primary key)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                studentId
              </Text>{" "}
              (integer, foreign key)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                physics
              </Text>{" "}
              (number)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                chemistry
              </Text>{" "}
              (number)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                math
              </Text>{" "}
              (number)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                english
              </Text>{" "}
              (number)
            </List.Item>
            <List.Item>
              <Text span fw={500}>
                hindi
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
              Get all students:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT * FROM students;
              </Text>
            </List.Item>
            <List.Item>
              Find students older than 18:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT name FROM students WHERE age {">"} 18;
              </Text>
            </List.Item>
          </List>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Join Operations
          </Title>
          <Text mt="xs">
            Use{" "}
            <span
              style={{
                color: theme.colors.myColor[6],
                fontFamily: "monospace",
              }}
            >
              JOIN
            </span>{" "}
            queries to combine data from both tables:
          </Text>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              Get student names with their physics marks:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT students.name, marks.physics FROM students JOIN marks ON
                students.id = marks.studentId;
              </Text>
            </List.Item>
            <List.Item>
              Find students who scored more than 80 in math:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT students.name FROM students JOIN marks ON students.id =
                marks.studentId WHERE marks.math {">"} 80;
              </Text>
            </List.Item>
          </List>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Query History
          </Title>
          <Text mt="xs">
            We automatically save your last 20 queries in this browser.
          </Text>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Pro Tips
          </Title>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              Use{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                LIKE
              </Text>{" "}
              for partial text searches:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT * FROM students WHERE name LIKE '%John%';
              </Text>
            </List.Item>
            <List.Item>
              Find total students per city:{" "}
              <Text span style={{ fontFamily: "monospace" }}>
                SELECT city, COUNT(*) FROM students GROUP BY city;
              </Text>
            </List.Item>
          </List>

          <Title order={4} mt="lg" style={{ color: theme.colors.myColor[6] }}>
            Important Notes
          </Title>
          <List size="sm" mt="xs" spacing="xs">
            <List.Item>
              You can only use{" "}
              <Text span fw={600} style={{ color: theme.colors.myColor[6] }}>
                students
              </Text>{" "}
              and{" "}
              <Text span fw={600} style={{ color: theme.colors.myColor[6] }}>
                marks
              </Text>{" "}
              tables.
            </List.Item>
            <List.Item>
              Table and column names are{" "}
              <Text span fw={600} style={{ color: theme.colors.myColor[6] }}>
                case-sensitive
              </Text>
              .
            </List.Item>
            <List.Item>
              You can only perform{" "}
              <Text span fw={600} style={{ color: theme.colors.myColor[6] }}>
                READ
              </Text>{" "}
              operations (no INSERT, UPDATE, DELETE).
            </List.Item>
            <List.Item>
              Running complex queries may take longer to execute.
            </List.Item>
            <List.Item>
              Always use{" "}
              <Text span fw={600} style={{ color: theme.colors.myColor[6] }}>
                proper syntax
              </Text>{" "}
              to avoid errors.
            </List.Item>
          </List>

          <Text mt="lg" size="sm" fw={500} c="pink">
            Experiment with different queries to uncover insights!
          </Text>
        </Box>
      </ScrollArea>
    </Drawer>
  );
};

export default GuidelinesDrawer;
