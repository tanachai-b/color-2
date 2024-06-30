import cx from "classnames";
import { MouseEventHandler } from "react";
import { countColors } from "src/common-functions";

export function SelectorItem({
  precisionLabel,
  precision,
  isSelected,
  onClick,
}: {
  precisionLabel: string;
  precision: number;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}) {
  const colorCount = countColors(precision);

  return (
    <div
      className={cx(
        "px-[30px]",
        "py-[15px]",

        "flex",
        "flex-row",

        "justify-center",
        "items-center",
        "gap-[10px]",

        "cursor-pointer",

        "hover:bg-[#ffffff10]",
        { "bg-[#ffffff10]": isSelected },
        "transition-all",
      )}
      onClick={onClick}
    >
      <div
        className={cx(
          "w-[2ch]",

          "text-[#ffffffc0]",
          "text-[15px]",
          "text-right",
        )}
      >
        {precisionLabel}
      </div>

      <div
        className={cx(
          "w-[11ch]",

          "text-[#ffffff60]",
          "text-[12px]",
          "text-right",
        )}
      >
        {colorCount.toLocaleString()} Colors
      </div>
    </div>
  );
}