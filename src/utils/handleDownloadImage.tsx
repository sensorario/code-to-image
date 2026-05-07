export const handleDownloadImage = async () => {
  const { default: html2canvas } = await import("html2canvas");
  const element: HTMLElement | null = document.querySelector(".wrapper");
  const canvas = await html2canvas(element!, { backgroundColor: null });
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/png", 1.0)
  );
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
};

export default handleDownloadImage;
