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
          setTargetRect(btnRect);
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      <span children={children} />
      {targetRect !== null && <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>}
    </>
  );
}