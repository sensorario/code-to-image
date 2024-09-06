import html2canvas from "html2canvas";

export const handleDownloadImage = async () => {
  const element: HTMLElement | null = document.querySelector(".wrapper");
  const canvas = await html2canvas(element!, { backgroundColor: null });
  const data = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");

  link.href = data;
  link.download = "image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
