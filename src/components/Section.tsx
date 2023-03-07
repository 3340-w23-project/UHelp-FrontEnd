import { ReactNode } from "react";
import styles from "@/styles/Home.module.scss";
import className from "classnames";

type SectionProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  hero?: boolean;
};

const Section = (props: SectionProps) => (
  <div
    className={className({
      [styles.sectionWrapper]: !props.hero,
      [styles.heroSectionWrapper]: props.hero,
    })}>
    <div className={styles.section}>
      {(props.title || props.description) && (
        <div>
          {props.title && <h2>{props.title}</h2>}
          {props.description && <div>{props.description}</div>}
        </div>
      )}
      {props.children}
    </div>
  </div>
);

export { Section };
