import Page, { PageProps } from "@/app/(authenticated)/content/[id]";

export default function InterceptedPage(props: PageProps) {
  return <Page {...props} />;
}
