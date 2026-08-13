import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  href,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const styles = `
    inline-flex items-center justify-center
    rounded-full px-5 py-3
    text-sm font-semibold
    transition-all duration-200
    focus:outline-none
    focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
    ${
      className ||
      "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg"
    }
  `;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
