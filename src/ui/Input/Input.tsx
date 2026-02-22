import { ValidateInputsNamesType } from "@/types";
import React from "react";
import { IMaskInput } from "react-imask";
import styles from './Input.module.scss'

type Props = {
  name: ValidateInputsNamesType;
  placeholder?: string;
  mask?: string | RegExp;
  error?: string;
  onFocus?: () => void;
};

function Input({ name, placeholder, mask, error, onFocus }: Props) {
  if (mask) {
    return (
      <div className={`${error ? styles.invalid : ""} ${styles.inputWrapper}`}>
        <IMaskInput
          mask={mask as any}
          name={name}
          unmask={true}
          placeholder={placeholder}
          onFocus={onFocus}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <div className={`${error ? styles.invalid : ""} ${styles.inputWrapper}`}>
      <input name={name} placeholder={placeholder} onFocus={onFocus} />
      {error && <p>{error}</p>}
    </div>
  );
}

export default Input;
