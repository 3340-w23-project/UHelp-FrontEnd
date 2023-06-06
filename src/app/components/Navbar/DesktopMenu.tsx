import React from "react";
import styles from "@/app/styles/Navbar.module.scss";
import { MenuItem } from "./MenuItem";
import Account from "./Account";
import { Session } from "next-auth";

function DesktopMenu({
  session,
  pathname,
}: {
  session: Session | null;
  pathname: string;
}) {
  return (
    <nav className={styles.menu}>
      <ul>
        {session && pathname === "/" ? (
          <>
            <MenuItem href="/forum/1" label="Forum" />
            <Account />
          </>
        ) : (
          <>
            <MenuItem label="Sign In" href="/signin" />
            <MenuItem
              label="Sign Up"
              href="/signup"
              className="btn btn-sm btn-secondary"
            />
          </>
        )}
      </ul>
    </nav>
  );
}

export default DesktopMenu;
