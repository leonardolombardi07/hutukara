import { useOnboardingContext } from "../index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";

export default function OnboardingPopoverContent({
  children,
  sx,
}: {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}) {
  return (
    <Paper
      sx={{
        pt: 4.5, // Leo: avoid overlap with close icon
        position: "relative",
        minWidth: 300,
        maxWidth: 450,
        ...sx,
      }}
    >
      <FixedCloseIconButton />
      <Divider />
      <Box
        sx={{
          p: 2,
        }}
      >
        {children}
      </Box>
      <StickyButtonsFooter />
    </Paper>
  );
}

function FixedCloseIconButton() {
  const { stopOnboarding } = useOnboardingContext();
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: (t) => t.zIndex.tooltip + 1,
      }}
      onClick={stopOnboarding}
    >
      <CloseIcon />
    </IconButton>
  );
}

function StickyButtonsFooter() {
  const router = useRouter();
  const {
    goToNextStep,
    goToPreviousStep,
    isLastStep,
    stopOnboarding,
    isInitialStep,
  } = useOnboardingContext();

  return (
    <Box component="footer" sx={{ position: "sticky", bottom: 0, zIndex: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          columnGap: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          onClick={goToPreviousStep}
          sx={{ flex: 1 }}
          variant="outlined"
          color="primary"
          disabled={isInitialStep}
          size="small"
        >
          Back
        </Button>

        <Button
          onClick={
            isLastStep
              ? function () {
                  stopOnboarding();
                  router.push("/search");
                }
              : goToNextStep
          }
          sx={{ flex: 1 }}
          variant="contained"
          color="primary"
          size="small"
        >
          {isLastStep ? "Let's rate content!" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
