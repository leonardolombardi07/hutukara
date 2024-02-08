import * as React from "react";
import LayoutProvider from "./_layout/LayoutProvider";
import GoRateContentProvider from "./_layout/GoRateContentProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <GoRateContentProvider>{children}</GoRateContentProvider>
    </LayoutProvider>
  );
}
