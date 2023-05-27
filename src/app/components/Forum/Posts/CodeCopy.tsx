"use client";
import React, { useState } from "react";
import styles from "@/app/styles/Forum.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { fadeTransition } from "@/utils/Animations";
import { ImCheckmark } from "react-icons/im";
import { BsFillClipboard2Fill } from "react-icons/bs";
import clsx from "clsx";

function CodeCopy({ pre }: any) {
  const codeChunk = pre.node?.children[0].children[0].value;
  const [codeCopied, setCodeCopied] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleCopyCode = (codeChunk: string) => {
    setCodeCopied(true);
    navigator.clipboard.writeText(codeChunk);
    setTimeout(() => {
      setCodeCopied(false);
    }, 5000);
  };

  return (
    <div
      className={styles.copyCode}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
      {(isShown || codeCopied) && (
        <AnimatePresence>
          <motion.button
            variants={fadeTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            onClick={() => handleCopyCode(codeChunk)}
            className={clsx("btn-tertiary", "btn-icon")}>
            {codeCopied ? <ImCheckmark /> : <BsFillClipboard2Fill />}
          </motion.button>
        </AnimatePresence>
      )}
      <pre {...pre}></pre>
    </div>
  );
}

export default CodeCopy;
