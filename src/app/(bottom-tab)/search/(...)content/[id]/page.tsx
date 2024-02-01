import Page, { PageProps } from "@/app/(bottom-tab)/content/[id]";

export default function InterceptedPage(props: PageProps) {
  return <Page {...props} />;
}
