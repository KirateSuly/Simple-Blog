import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  strong?: boolean;
  children?: ReactNode;
};

export default function GlassCard({
  strong = false,
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <div
      className={`${strong ? "glass-strong" : "glass"} rounded-3xl ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
