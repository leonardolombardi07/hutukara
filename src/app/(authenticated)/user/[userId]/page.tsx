import { Metadata } from "next";
import ClientPage from "./client";
import { APP_NAME } from "@/app/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} | User`,
  description: "User page",
};

export interface PageProps {
  params: {
    userId?: string;
  };
}

export default function Page({ params }: PageProps) {
  if (!params.userId) {
    throw new Error("No id");
  }

  if (typeof params.userId !== "string") {
    throw new Error(`Invalid user ID: ${params.userId}`);
  }

  return <ClientPage uid={params.userId} />;
}
