import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline-light" | "outline-dark";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 font-heading text-sm font-bold uppercase tracking-[0.06em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-bronze-500 text-warm-50 hover:bg-bronze-600",
  secondary: "bg-charcoal-950 text-warm-50 hover:bg-charcoal-800",
  "outline-light": "border border-warm-50/50 text-warm-50 hover:bg-warm-50/10",
  "outline-dark": "border border-charcoal-950/25 text-charcoal-950 hover:bg-charcoal-950/5",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
