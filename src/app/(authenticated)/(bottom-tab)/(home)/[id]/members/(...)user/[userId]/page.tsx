import Page, { PageProps } from "@/app/(authenticated)/user/[userId]";

export default function InterceptedPage(props: PageProps) {
  return <Page {...props} />;
}
