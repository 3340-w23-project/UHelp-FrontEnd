import styles from "@/styles/Home.module.scss";
import className from "classnames";
import Image from "next/image";
import Button from "../Button";
import { useAppSelector } from "@/redux/store";

type SectionProps = {
  heading?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  buttonLabel?: string;
  buttonHref?: string;
  reverse?: boolean;
};

const Section = (props: SectionProps) => {
  const isMobile = useAppSelector((state) => state.app.isMobile);
  return (
    <div className={styles.sectionWrapper}>
      <div
        className={className({
          [styles.section]: true,
          [styles.reverse]: props.reverse && !isMobile,
        })}>
        {props.image && (
          <div className={styles.imageContainer}>
            <Image
              alt={props.imageAlt ? props.imageAlt : ""}
              src={props.image!}
              sizes={"(max-width: 768px) 100vw, 50vw"}
              object-fit={"fill"}
              quality={100}
              fill
            />
          </div>
        )}
        {(props.heading || props.description) && (
          <div className={styles.contentContainer}>
            <div>
              {props.heading && (
                <h2 className={styles.heading}>{props.heading}</h2>
              )}
              {props.description && (
                <div className={styles.description}>{props.description}</div>
              )}
            </div>
            {props.buttonLabel && (
              <Button xl href={props.buttonHref} label={props.buttonLabel} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
