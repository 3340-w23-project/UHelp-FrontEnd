import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import background from "/public/images/hero-background.png";

const BackgroundPage = () => (
  <>
    <div className={styles.background}></div>
    <div className={styles.backgroundImage}>
      <Image
        priority
        alt="Background"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  </>
);

export default BackgroundPage;
