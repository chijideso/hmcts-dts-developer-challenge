import { createTheme, type MantineColorsTuple } from "@mantine/core";

// HMCTS Blue (Primary)
const brand: MantineColorsTuple = [
  "#eef3ff",
  "#dee2f2",
  "#bdc2de",
  "#9ba0cb",
  "#8084bc",
  "#6d72b3",
  "#6269af",
  "#52599c",
  "#484f8c",
  "#3d437d",
];

// Company Slate (Secondary/Neutral)
const company: MantineColorsTuple = [
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  "#334155",
  "#1e293b",
  "#0f172a",
];

export const theme = createTheme({
  primaryColor: "brand", 
  colors: {
    brand: brand, 
    company: company, 
  },

  fontFamily: "Inter, sans-serif",
  defaultRadius: "sm",

  components: {
    
    Button: {
      defaultProps: { loaderProps: { type: "bars" } },
    },
 
    Modal: {
      defaultProps: {
        withinPortal: true,
        overlayProps: { backgroundOpacity: 0.55, blur: 3 },
      },
    },
    Drawer: {
      defaultProps: {
        withinPortal: true,
        overlayProps: { backgroundOpacity: 0.55, blur: 3 },
      },
    },
  },
});
