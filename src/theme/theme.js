import { createTheme } from "@mantine/core";

const myColor = [
  "#e5f3ff",
  "#cde2ff",
  "#9ac2ff",
  "#64a0ff",
  "#3884fe",
  "#1d72fe",
  "#0969ff",
  "#0058e4",
  "#004ecd",
  "#0043b5",
];

export const theme = createTheme({
  primaryColor: "myColor",
  colors: { myColor },
});
