import { ReactNode } from "react";
import styles from "@/styles/Home.module.scss";
import className from "classnames";

type SectionProps = {
  heading?: string;
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
      {(props.heading || props.description) && (
        <div>
          {props.heading && <h2 className={styles.heading}>{props.heading}</h2>}
          {props.description && (
            <div className={styles.description}>{props.description}</div>
          )}
        </div>
      )}
      {props.children}
    </div>
  </div>
);

export { Section };
