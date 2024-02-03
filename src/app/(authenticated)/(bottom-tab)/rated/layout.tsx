import * as React from "react";
import LayoutProvider from "./_layout/LayoutProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
