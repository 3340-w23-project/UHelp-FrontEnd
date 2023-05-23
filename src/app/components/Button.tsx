"use client";
import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  xl?: boolean;
  sm?: boolean;
  full?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  label?: string;
  href?: string;
  icon?: React.FunctionComponent<any>;
  onClick?: () => void;
};

const Button = ({
  icon: Icon,
  label,
  href,
  full,
  xl,
  sm,
  secondary,
  tertiary,
  onClick,
}: ButtonProps) => {
  const btnClass = clsx({
    btn: true,
    "btn-full": full,
    "btn-xl": xl,
    "btn-sm": sm,
    "btn-primary": !secondary && !tertiary,
    "btn-secondary": secondary,
    "btn-tertiary": tertiary,
    "btn-base": !xl && !sm && !Icon,
    "btn-icon": Icon && !label,
    "btn-gap": Icon && label,
  });

  return (
    <>
      {href ? (
        <Link href={href}>
          <div className={btnClass} onClick={onClick}>
            <>
              {Icon && <Icon />}
              {label}
            </>
          </div>
        </Link>
      ) : (
        <div className={btnClass} onClick={onClick}>
          <>
            {Icon && <Icon />}
            {label}
          </>
        </div>
      )}
    </>
  );
};

export default Button;
