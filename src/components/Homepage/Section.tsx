"use client";
import styles from "@/app/styles/Home.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Button from "../Button";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";

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
  const session = useSession();
  const isMobile = useAppSelector((state) => state.app.isMobile);
  return (
    <div className={styles.sectionWrapper}>
      <div
        className={clsx({
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
            {props.buttonLabel && !session?.data?.user && (
              <Button xl href={props.buttonHref} label={props.buttonLabel} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
