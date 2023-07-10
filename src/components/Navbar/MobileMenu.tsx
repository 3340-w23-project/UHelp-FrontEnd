"use client";
import React from "react";
import Link from "next/link";
import styles from "@/app/styles/Navbar.module.scss";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import MobileMenuBackdrop from "./MobileMenuBackdrop";

type Props = {
  active: boolean;
  setActive: Function;
};

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Forum", to: "/forum", id: 2 },
  { name: "Sign In", to: "/signin", id: 3 },
  { name: "Sign Up", to: "/signup", id: 4 },
];

function MobileMenu({ active, setActive }: Props) {
  const [open, cycleOpen] = useCycle(false, true);
  return (
    <>
      <AnimatePresence>
        {open && (
          <MobileMenuBackdrop onClick={() => cycleOpen()}>
            <motion.aside
              className={styles.mobileMenuWrapper}
              initial={{ x: -300 }}
              animate={{
                x: 0,
                transition: { duration: 0.3 },
              }}
              exit={{
                x: -300,
                transition: { duration: 0.3 },
              }}
              onAnimationStart={() => setActive(true)}>
              <motion.div className={styles.mobileMenuContainer}>
                {links.map(({ name, to, id }) => (
                  <Link key={id} href={to} className={styles.mobileMenuItem}>
                    {name}
                  </Link>
                ))}
              </motion.div>
            </motion.aside>
          </MobileMenuBackdrop>
        )}
      </AnimatePresence>
      <div className={styles.menu}>
        {open ? (
          <MdOutlineClose
            className={`${styles.mobileMenuButtton} ${active && styles.open}`}
            onClick={() => cycleOpen()}
          />
        ) : (
          <GiHamburgerMenu
            className={`${styles.mobileMenuButtton} ${active && styles.closed}`}
            onClick={() => cycleOpen()}
          />
        )}
      </div>
    </>
  );
}

export default MobileMenu;
