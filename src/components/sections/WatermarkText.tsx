export function WatermarkText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none whitespace-nowrap leading-none ${className}`}
    >
      {children}
    </span>
  );
}
