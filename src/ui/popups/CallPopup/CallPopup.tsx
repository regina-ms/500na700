import { CallPopupForm } from "@/ui/Forms/CallPopupForm/CallPopupForm";
import styles from "./CallPopup.module.scss";

function CallPopup({ closePopup }: { closePopup: () => void }) {
  return (
    <div className={styles.popup}>
      <div className={styles.top}>
        <p className={styles.header}>Связаться с нами</p>
        <button className={styles.closeButton} onClick={closePopup}/>
      </div>
      <CallPopupForm />
    </div>
  );
}

export default CallPopup;
