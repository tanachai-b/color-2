import cx from "classnames";
import { MouseEventHandler, ReactNode, useState } from "react";
import { MouseScrollable } from "src/common-components";
import { toHcl, toHcv, toHsl, toHsv, toRgb } from "src/common-functions";
import { Bar, BarChart, Label, Value } from "./BarChart";

export function Detail({ color }: { color?: string }) {
  const [toggle, setToggle] = useState<string>("HCL");

  const rgb = toRgb(color ?? "#000000");
  const hcl = toHcl(color ?? "#000000");
  const hcv = toHcv(color ?? "#000000");
  const hsl = toHsl(color ?? "#000000");
  const hsv = toHsv(color ?? "#000000");

  return (
    <div
      className={cx(
        "grow",

        "overflow-hidden",
        "grid",
      )}
    >
      <MouseScrollable>
        <div
          className={cx(
            "p-[20px]",
            "py-[30px]",
            "gap-[30px]",

            "flex",
            "flex-col",

            "text-[#ffffff80]",
            "text-[13px]",
          )}
        >
          <div className={cx("grid", "place-items-center")}>
            <Toggle>
              <Button isSelected={toggle === "RGB"} onClick={() => setToggle("RGB")}>
                RGB
              </Button>
              <Button isSelected={toggle === "HCL"} onClick={() => setToggle("HCL")}>
                HCL
              </Button>
              <Button isSelected={toggle === "HCV"} onClick={() => setToggle("HCV")}>
                HCV
              </Button>
              <Button isSelected={toggle === "HSL"} onClick={() => setToggle("HSL")}>
                HSL
              </Button>
              <Button isSelected={toggle === "HSV"} onClick={() => setToggle("HSV")}>
                HSV
              </Button>
            </Toggle>
          </div>

          {toggle === "RGB" && (
            <BarChart>
              <Label>Red</Label>
              <Bar value={rgb.r / 255} />
              <Value value={rgb.r} isInteger={true} />

              <Label>Green</Label>
              <Bar value={rgb.g / 255} />
              <Value value={rgb.g} isInteger={true} />

              <Label>Blue</Label>
              <Bar value={rgb.b / 255} />
              <Value value={rgb.b} isInteger={true} />
            </BarChart>
          )}

          {toggle === "HCL" && (
            <BarChart>
              <Label>Hue</Label>
              <Bar value={hcl.h / 360} />
              <Value value={hcl.h} unit={"°"} />

              <Label>Chroma</Label>
              <Bar value={hcl.c / 100} />
              <Value value={hcl.c} unit={"%"} />

              <Label>Lightness</Label>
              <Bar value={hcl.l / 100} />
              <Value value={hcl.l} unit={"%"} />
            </BarChart>
          )}

          {toggle === "HCV" && (
            <BarChart>
              <Label>Hue</Label>
              <Bar value={hcv.h / 360} />
              <Value value={hcv.h} unit={"°"} />

              <Label>Chroma</Label>
              <Bar value={hcv.c / 100} />
              <Value value={hcv.c} unit={"%"} />

              <Label>Value</Label>
              <Bar value={hcv.l / 100} />
              <Value value={hcv.l} unit={"%"} />
            </BarChart>
          )}

          {toggle === "HSL" && (
            <BarChart>
              <Label>Hue</Label>
              <Bar value={hsl.h / 360} />
              <Value value={hsl.h} unit={"°"} />

              <Label>Saturation</Label>
              <Bar value={hsl.s / 100} />
              <Value value={hsl.s} unit={"%"} />

              <Label>Lightness</Label>
              <Bar value={hsl.l / 100} />
              <Value value={hsl.l} unit={"%"} />
            </BarChart>
          )}

          {toggle === "HSV" && (
            <BarChart>
              <Label>Hue</Label>
              <Bar value={hsv.h / 360} />
              <Value value={hsv.h} unit={"°"} />

              <Label>Saturation</Label>
              <Bar value={hsv.s / 100} />
              <Value value={hsv.s} unit={"%"} />

              <Label>Value</Label>
              <Bar value={hsv.v / 100} />
              <Value value={hsv.v} unit={"%"} />
            </BarChart>
          )}
        </div>
      </MouseScrollable>
    </div>
  );
}

function Toggle({ children }: { children: ReactNode }) {
  return (
    <div
      className={cx(
        "w-full",

        "flex",
        "flex-row",

        "border",
        "border-[1px]",
        "border-[#ffffff20]",

        "rounded-[10px]",
        "overflow-hidden",

        "divide-x-[1px]",
        "divide-[#ffffff20]",
      )}
    >
      {children}
    </div>
  );
}

function Button({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex-1",

        "py-[10px]",

        "text-center",

        "hover:bg-[#ffffff10]",
        { "bg-[#ffffff10]": isSelected },

        isSelected ? "text-[#ffffffc0]" : "text-[#ffffff40]",
        "hover:text-[#ffffffc0]",
        "hover:font-bold",
        { "font-bold": isSelected },

        "transition-all",

        "leading-none",
        // "tracking-[1px]",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
