import Layout from "./layout";
import PageWithoutLayout, { PageProps } from "./page";

export type { PageProps };

export default function Page(props: PageProps) {
  return (
    <Layout>
      <PageWithoutLayout {...props} />
    </Layout>
  );
}
