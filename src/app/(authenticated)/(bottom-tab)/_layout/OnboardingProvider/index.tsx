"use client";

import * as React from "react";
import { OnboardingStep } from "./types";
import Popover from "@mui/material/Popover";
import useSteps from "./steps";
import { useUser } from "@/app/_layout/UserProvider";
import { User } from "firebase/auth";

interface OnboardingContext {
  isOnboarding: boolean;
  startOnboarding: () => void;
  stopOnboarding: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isInitialStep: boolean;
  isLastStep: boolean;
  onboardingRefs: OnboardingStep["anchorElRef"][];
}

type MaybeStep = OnboardingStep | null | undefined;

const OnboardingContext = React.createContext<OnboardingContext | null>(null);

let HAS_TRIED_TO_ONBOARD_USER = false;

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  const steps = useSteps();
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);

  const initialStep: MaybeStep = steps[0];
  const previousStep: MaybeStep = steps[currentStepIndex - 1];
  const currentStep: MaybeStep = steps[currentStepIndex];
  const nextStep: MaybeStep = steps[currentStepIndex + 1];

  const [isOnboarding, setIsOnboarding] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const isInitialStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const startOnboarding = React.useCallback(() => {
    setAnchorElIfNotNull(initialStep?.anchorElRef);
    setIsOnboarding(true);
    setCurrentStepIndex(0);
  }, [initialStep]);

  React.useEffect(
    function automaticallyOnboardUser() {
      if (
        // To make sure we only try to onboard the user once
        !HAS_TRIED_TO_ONBOARD_USER &&
        // We need to checkt the initialStep anchorElRef. Because the OnboardingProvider wraps the bottom-tab layout, which wraps multiple routes, we may try to start onboarding in a route that doesn't have the initialStep anchorElRef set and that would throw an error.
        initialStep.anchorElRef?.current &&
        shouldOnboardUser(user)
      ) {
        HAS_TRIED_TO_ONBOARD_USER = true;
        startOnboarding();
      }
    },
    [startOnboarding, user, initialStep.anchorElRef]
  );

  function setAnchorElIfNotNull(
    ref: React.RefObject<HTMLElement> | null | undefined
  ) {
    if (ref?.current) {
      setAnchorEl(ref.current);
    } else {
      if (process.env.NODE_ENV === "development") {
        throw new Error(
          "OnboardingProvider: anchorElRef is not set for the current step. You probably forgot to pass a ref to the component you want to highlight."
        );
      }
    }
  }

  function stopOnboarding() {
    setAnchorEl(null);
    setIsOnboarding(false);
  }

  function resetCurrentStepIndexAfterStopOnboarding() {
    if (isLastStep && isOnboarding === false) {
      setCurrentStepIndex(0);
      setAnchorElIfNotNull(initialStep?.anchorElRef);
    }
  }

  function goToNextStep() {
    setAnchorElIfNotNull(nextStep?.anchorElRef);
    setCurrentStepIndex((prev) => prev + 1);
  }

  function goToPreviousStep() {
    setAnchorElIfNotNull(previousStep?.anchorElRef);
    setCurrentStepIndex((prev) => prev - 1);
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboarding,
        isInitialStep,
        isLastStep,
        goToNextStep,
        goToPreviousStep,
        startOnboarding,
        stopOnboarding,
        onboardingRefs: steps.map((step) => step.anchorElRef),
      }}
    >
      {children}

      <Popover
        open={isOnboarding}
        anchorEl={anchorEl}
        onAnimationEnd={resetCurrentStepIndexAfterStopOnboarding}
        {...currentStep.popoverProps}
      >
        {currentStep.popoverContent}
      </Popover>
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingProvider"
    );
  }
  return context;
}

function shouldOnboardUser(user: User) {
  // if (process.env.NODE_ENV === "development") {
  //   return true;
  // }

  const { creationTime } = user.metadata;
  if (!creationTime) {
    // default to not onboard, otherwise is annoying
    return false;
  }

  const creationDate = new Date(creationTime);
  const now = new Date();

  const createdLessThan10SecondsAgo =
    now.getUTCMilliseconds() - creationDate.getUTCMilliseconds() < 10 * 1000;

  if (createdLessThan10SecondsAgo) {
    return true;
  }

  return false;
}
