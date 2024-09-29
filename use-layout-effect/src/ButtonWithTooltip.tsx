import { useRef, useState } from "react";
import Tooltip from "./Tooltip";

export default function ButtonWithTooltip({ children, tooltipContent }: {
  tooltipContent: React.ReactNode,
  children: React.ReactNode
}) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        children={children}
        ref={btnRef}
        onPointerEnter={() => {
          const btnRect = btnRef.current!.getBoundingClientRect();
          // console.log(btnRect.x, btnRect.y);

          setTargetRect(btnRect);
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>}
    </>
  );
}