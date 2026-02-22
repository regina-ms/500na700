import styles from "./Checkbox.module.scss";
import React, { Dispatch, SetStateAction, useState } from "react";

function Checkbox({
  onChange,
  error,
}: {
  onChange: Dispatch<SetStateAction<boolean>>;
  error?: string;
}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className={styles.checkboxLabel}>
      <span className={styles.fakeCheckbox} />
      <p>Я согласен (-а) на обработку персональных данных</p>
      <input
        type="checkbox"
        name="policy"
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          onChange(e.target.checked);
        }}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </label>
  );
}

export default Checkbox;
