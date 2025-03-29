import { Box, Paper, Text } from "@mantine/core";
import React from "react";

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
      <Text fw="400" size="md" mt="sm">
        The page you are looking for does not exist.
      </Text>
    </Box>
  );
};

export default NotFound;
