import { createPortal } from "react-dom";
import TooltipContainer from "./TooltipContainer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Tooltip({ children, targetRect }: {
  children: React.ReactNode,
  targetRect: DOMRect,
}) {
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { height } = ref.current!.getBoundingClientRect();
    setTooltipHeight(height);
    console.log(height, 111);
  }, []);

  // 因修改了tooltipHeight状态，导致useEffect执行连续执行两次
  useEffect(() => {
    console.log(tooltipHeight, 222);
  }, [tooltipHeight]);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // 它不适合上方，因此把它放在下面。
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>{children}</TooltipContainer>,
    document.body
  );
}