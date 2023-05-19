import React from "react";
import styles from "@/app/styles/Navbar.module.scss";
import { MenuItem } from "./MenuItem";
import Account from "./Account";
import Button from "../Button";

function DesktopMenu({ session }: any) {
  return (
    <nav className={styles.menu}>
      <ul>
        <MenuItem label="Home" href="/" />
        {session ? (
          <>
            <MenuItem href="/forum/1" label="Forum" />
            <Account />
          </>
        ) : (
          <>
            <MenuItem label="Sign In" href="/signin" />
            <li>
              <Button sm secondary href="/signup" label="Sign Up" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default DesktopMenu;
