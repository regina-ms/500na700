"use client";
import { PopupProvider, POPUPS } from "@/features/usePopup";
import CallPopupButton from "@/ui/Button/CallPopupButton";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.svg";
import styles from "./Header.module.scss";

function Header() {
  return (
    <PopupProvider registry={POPUPS}>
      <header className={styles.header}>
        <div className={`container ${styles.container}`}>
          <Image src={logo} alt={"logo"} className={styles.logo}/>
          <CallPopupButton popupName="call" variant={"light"}>
            Связаться с нами
          </CallPopupButton>
        </div>
      </header>
    </PopupProvider>
  );
}

export default Header;
