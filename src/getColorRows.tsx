export function getColorRows(steps: number) {
  const rgbColorRows = createFactorArray(steps + 1, (rf, ri) =>
    createFactorArray((steps - ri) * 6 + 1, (f) =>
      createFactorArray(ri + 1, (_, xi) =>
        add(multiply(getRgbColorFromHue(f), 1 - rf), xi * (1 / steps)),
      ),
    )
      .slice(0, -1)
      .flat(),
  );

  const colorRows = rgbColorRows.map((colorRow) =>
    colorRow.map((rgbColor) => convertRgbToHexColor(rgbColor)),
  );

  return colorRows;
}

function createFactorArray<T>(
  length: number,
  onGetValues: (factor: number, index: number) => T,
) {
  return Array.from({ length }, (_v, i) => onGetValues(i / (length - 1), i));
}

function getRgbColorFromHue(factor: number) {
  const section = Math.floor(factor * 6) % 6;
  const gradient = parseFloat(
    (-Math.abs((factor % (1 / 3)) * 3 * 2 - 1) + 1).toFixed(10),
  );

  if (section === 0) {
    return { red: 1, green: gradient, blue: 0 };
  } else if (section === 1) {
    return { red: gradient, green: 1, blue: 0 };
  } else if (section === 2) {
    return { red: 0, green: 1, blue: gradient };
  } else if (section === 3) {
    return { red: 0, green: gradient, blue: 1 };
  } else if (section === 4) {
    return { red: gradient, green: 0, blue: 1 };
  } else if (section === 5) {
    return { red: 1, green: 0, blue: gradient };
  }

  return { red: 0.5, green: 0.5, blue: 0.5 };
}

function add(
  { red, green, blue }: { red: number; green: number; blue: number },
  value: number,
) {
  return {
    red: red + value,
    green: green + value,
    blue: blue + value,
  };
}

function multiply(
  { red, green, blue }: { red: number; green: number; blue: number },
  value: number,
) {
  return {
    red: red * value,
    green: green * value,
    blue: blue * value,
  };
}

function convertRgbToHexColor({
  red,
  green,
  blue,
}: {
  red: number;
  green: number;
  blue: number;
}) {
  const red1 = Math.min(Math.floor(red * 256), 255);
  const green1 = Math.min(Math.floor(green * 256), 255);
  const blue1 = Math.min(Math.floor(blue * 256), 255);

  return (
    "#" +
    red1.toString(16).padStart(2, "0") +
    green1.toString(16).padStart(2, "0") +
    blue1.toString(16).padStart(2, "0")
  );
}