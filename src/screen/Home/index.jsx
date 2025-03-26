import { Button, Card, Container, Text, useMantineTheme } from "@mantine/core";
import { Navbar } from "../../components/Navbar";

export const Home = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg">
      <Navbar />
    </Container>
  );
};
