import { redirect } from "next/navigation";

interface PageProps {
  params: {
    id?: string;
  };
}

export default function Page({ params }: PageProps) {
  if (!params.id || typeof params.id !== "string") {
    throw new Error("Missing id");
  }

  return redirect(`/${params.id}/summary`);
}
