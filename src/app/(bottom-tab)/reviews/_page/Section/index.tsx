import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}

export default function Section({ title, children, right }: SectionProps) {
  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          px: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        {right}
      </Box>

      <Box>{children}</Box>
    </Box>
  );
}
