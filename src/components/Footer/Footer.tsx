import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={logo} alt={"logo"} className={styles.footerLogo} />
      <div className={styles.footerText}>Креативное агентство 500na700</div>
    </footer>
  );
}

export default Footer;
