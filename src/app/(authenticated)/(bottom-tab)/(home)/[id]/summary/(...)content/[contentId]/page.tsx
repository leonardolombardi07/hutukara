import Page, { PageProps } from "@/app/(authenticated)/content/[contentId]";

export default function InterceptedPage(props: PageProps) {
  return <Page {...props} />;
}
