"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}

export default function Section({ title, children, right }: SectionProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        {right}
      </Box>

      <Box sx={{ pt: 1 }}>{children}</Box>
    </Box>
  );
}
