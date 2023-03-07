import className from "classnames";

type ButtonProps = {
  xl?: boolean;
  children: string;
};

const Button = (props: ButtonProps) => {
  const btnClass = className({
    btn: true,
    "btn-xl": props.xl,
    "btn-base": !props.xl,
    "btn-primary": true,
  });

  return <div className={btnClass}>{props.children}</div>;
};

export { Button };
