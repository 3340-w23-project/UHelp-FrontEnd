import className from "classnames";
import Link from "next/link";

type ButtonProps = {
  xl?: boolean;
  sm?: boolean;
  children: string;
  href?: string;
};

const Button = (props: ButtonProps) => {
  const btnClass = className({
    btn: true,
    "btn-xl": props.xl,
    "btn-base": !props.xl && !props.sm,
    "btn-sm": props.sm,
    "btn-primary": true,
  });

  return (
    <div className={btnClass}>
      {props.href ? (
        <Link href={props.href}>{props.children}</Link>
      ) : (
        props.children
      )}
    </div>
  );
};

export { Button };
