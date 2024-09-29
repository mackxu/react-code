import './Tooltip.css';

export default function TooltipContainer({ children, x, y, contentRef }: {
  children: React.ReactNode,
  x: number,
  y: number,
  contentRef: React.RefObject<HTMLDivElement>,
}) {
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1000,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div ref={contentRef} className="tips">{children}</div>
    </div>
  );
}