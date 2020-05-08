/**
 * Provides a means to download documents/images
 */
export default class DownloadService {
  constructor(data, format, prefix) {
    this.data = data;
    this.format = format;
    this.prefix = prefix;
  }

  startDownload() {
    const timestamp = new Date().toLocaleString();
    let filename = `${this.prefix}-${timestamp}`
      .replace(/ /g, "-")
      .replace(/,/g, "");
    const element = document.createElement("a");
    let formatId, encoded;

    switch (this.format) {
      case "text":
        filename += `.md`;
        formatId = "data:text/plain;charset=utf-8,";
        encoded = encodeURIComponent(this.data);
        break;
      case "png":
        filename += `.png`;
        formatId = "";
        encoded = this.data;
        break;
      default:
        return console.error("Unsupported format");
    }

    element.setAttribute("href", `${formatId}${encoded}`);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
