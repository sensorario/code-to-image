export const HtmlToReact = ({ htmlString }: { htmlString: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};
