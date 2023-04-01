import className from "classnames";
import Link from "next/link";

type ButtonProps = {
  xl?: boolean;
  sm?: boolean;
  secondary?: boolean;
  label?: string;
  href?: string;
  icon?: React.FunctionComponent<any>;
  onClick?: () => void;
};

const Button = ({
  icon: Icon,
  label,
  href,
  xl,
  sm,
  secondary,
  onClick,
}: ButtonProps) => {
  const btnClass = className({
    btn: true,
    "btn-xl": xl,
    "btn-sm": sm,
    "btn-primary": !secondary,
    "btn-secondary": secondary,
    "btn-base": !xl && !sm && !Icon,
    "btn-icon": Icon && !label,
    "btn-gap": Icon && label,
  });

  return (
    <div className={btnClass} onClick={onClick}>
      <>
        {Icon && <Icon />}
        {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
      </>
    </div>
  );
};

export { Button };
