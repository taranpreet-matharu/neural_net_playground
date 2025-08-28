"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#F7F8FA", paper: "#FFFFFF" },
    primary: { main: "#2563EB" },
    secondary: { main: "#fbbf77" }, // peach/orange
    error: { main: "#F87171" },
    text: { primary: "#1E293B", secondary: "#64748B" },
    divider: "#E5E7EB",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 13,
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600, fontSize: 14 },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { boxShadow: "0 2px 10px rgba(0,0,0,0.06)" } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 10 } },
    },
    MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});
export default theme;
