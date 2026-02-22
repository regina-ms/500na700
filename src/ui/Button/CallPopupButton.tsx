import { POPUPS, usePopup } from "@/features/usePopup";
import Button from "@/ui/Button/Button";
import React, { PropsWithChildren } from "react";

type Props = {
  variant: "light" | "dark";
  popupName: keyof typeof POPUPS;
} & PropsWithChildren;

function CallPopupButton({ variant, popupName, children }: Props) {
  const { openPopup } = usePopup();
  return (
    <Button variant={variant} onClick={() => openPopup(popupName)}>
      {children}
    </Button>
  );
}

export default CallPopupButton;
