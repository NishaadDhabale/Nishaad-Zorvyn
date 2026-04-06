// 1. Convert Array to CSV String
export const convertToCSV = (data: any[]) => {
  const headers = ["Order ID", "Name", "Price", "Status", "Date"];
  const rows = data.map(item => [
    item.id,
    item.name,
    // Remove internal commas from price (e.g., "$25,500" -> "$25500")
    // so they don't break the CSV columns
    `"${item.price.replace(/,/g, '')}"`,
    item.status,
    item.date
  ]);

  return [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
};

// 2. Trigger Browser Download
export const triggerDownload = (content: string, fileName: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};