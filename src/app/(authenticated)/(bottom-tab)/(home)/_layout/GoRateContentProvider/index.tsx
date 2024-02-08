"use client";

import React from "react";
import ConfirmDialog from "@/components/feedback/ConfirmDialog";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_layout/UserProvider";
import { useUserRatings } from "@/modules/api/client";
import { DialogContentText } from "@mui/material";

const GoRateContentContext = React.createContext<{
  openGoRateContentDialog: () => void;
} | null>(null);

export default function GoRateContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const openGoRateContentDialog = React.useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <GoRateContentContext.Provider value={{ openGoRateContentDialog }}>
      {children}

      <ConfirmDialog
        open={open}
        title="Go Rate Content"
        description={
          <DialogContentText>
            To find the best matches between you and your friends, we need to
            know what you like first. Go rate some content to get started.
          </DialogContentText>
        }
        cancelText="Not now"
        confirmText="Go Rate"
        onConfirm={() => {
          closeDialog();
          router.push("/search");
        }}
        onClose={closeDialog}
      />
    </GoRateContentContext.Provider>
  );
}

function useGoRateContentContent() {
  const context = React.useContext(GoRateContentContext);
  if (!context) {
    throw new Error(
      "useGoRateContent must be used within a GoRateContentProvider"
    );
  }
  return context;
}

const GO_RATED_CONTENT_BEFORE_PUSH_HREFS = ["/join", "/create"] as const;

type Href = (typeof GO_RATED_CONTENT_BEFORE_PUSH_HREFS)[number];

export function useNavigateOnlyIfContentRated() {
  const router = useRouter();
  const { user } = useUser();
  const [ratings = [], isLoading, error] = useUserRatings(user.uid);
  const { openGoRateContentDialog } = useGoRateContentContent();

  return React.useCallback(
    (href: Href, options?: Parameters<typeof router.push>[1]) => {
      if (isLoading) {
        // This is awful. We should somehow make sure we have user ratings at this point
        return alert(`Loading ratings... Sorry, try again in a moment.`);
      }

      if (!error && ratings.length === 0) {
        // Do not show dialog if there is an error...
        openGoRateContentDialog();
        return;
      }

      router.push(href, options);
    },
    [router, openGoRateContentDialog, ratings, isLoading, error]
  );
}
