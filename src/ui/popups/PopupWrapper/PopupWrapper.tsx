import React, { PropsWithChildren } from "react";
import styles from "./PopupWrapper.module.scss";

function PopupWrapper({ children }: PropsWithChildren) {
  return (
    <div className={`${styles.popupWrapper} popup-opened`}>{children}</div>
  );
}

export default PopupWrapper;
