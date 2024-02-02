import Page from "@/app/(authenticated)/content/[id]";

// Fixing error "Error: You cannot have the same slug name "id" repeat within a single dynamic path"
interface PageProps {
  params: {
    contentId: string;
  };
}

export default function InterceptedPage(props: PageProps) {
  return (
    <Page
      params={{
        id: props.params.contentId,
      }}
    />
  );
}
