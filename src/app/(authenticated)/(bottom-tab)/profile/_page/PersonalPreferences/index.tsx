import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Theme from "./Theme";

export default function PersonalPreferences() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" component="div" gutterBottom>
        Personal Preferences
      </Typography>

      <Box sx={{ my: 2 }} />

      <Theme />
    </Paper>
  );
}
