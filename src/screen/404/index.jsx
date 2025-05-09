import { Box, Button, Paper, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Text size="xl" fw="700" c={"red"}>
        404 - Page Not Found
      </Text>
      <Text fw="500" size="md" mt="sm">
        The page you are looking for does not exist.
      </Text>
      <Link to="/">
        <Button variant="outline" size="xs" mt="md" color="red">
          {"<<"} Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
