type SizeUnit = "B" | "KB" | "MB" | "GB" | "TB";

const humanizeSize = (
  size: number,
  decimalPoints = 1,
  originalUnit: SizeUnit = "B"
): string => {
  let unit: SizeUnit = originalUnit;
  let newSize = size;
  while (newSize >= 1024 && unit !== "TB") {
    newSize /= 1024;
    switch (unit) {
      case "B":
        unit = "KB";
        break;
      case "KB":
        unit = "MB";
        break;
      case "MB":
        unit = "GB";
        break;
      case "GB":
        unit = "TB";
        break;
    }
  }
  return `${newSize.toFixed(decimalPoints)} ${unit}`;
};

export default humanizeSize;
