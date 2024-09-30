import { createPortal } from "react-dom";
import TooltipContainer from "./TooltipContainer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Tooltip({ children, targetRect }: {
  children: React.ReactNode,
  targetRect: DOMRect,
}) {
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  // React会等待浏览器完成渲染，并且在下一帧之前不会更新屏幕，以确保副作用操作可以同步更新DOM。
  // 如果有新的state更新，React会重新计算组件的布局，然后重新渲染组件。
  useLayoutEffect(() => {
    const { height } = ref.current!.getBoundingClientRect();
    setTooltipHeight(height);
    console.log('useLayoutEffect')
  }, []);

  // 因修改了tooltipHeight状态，导致useEffect执行连续执行两次
  useEffect(() => {
    console.log(tooltipHeight, 'useEffect tooltipHeight');
  }, [tooltipHeight]);

  useEffect(() => {
    console.log('useEffect');
  }, []);

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