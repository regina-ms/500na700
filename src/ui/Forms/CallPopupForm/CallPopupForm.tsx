import { useFormValidation } from "@/features/useFormValidation";
import { usePopup } from "@/features/usePopup";
import Button from "@/ui/Button/Button";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Input from "@/ui/Input/Input";
import { SubmitEventHandler, useState } from "react";

export function CallPopupForm() {
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const { closePopup } = usePopup();

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.target);
    const inputs = Array.from(formData.entries());

    inputs.forEach(([name, value]) => {
      console.log({ [name]: value });
      closePopup();
    });
  };
  const { validateErrors, submitFormHandler, clearError } = useFormValidation(
    checkboxValue,
    onSubmit,
  );


  return (
    <form onSubmit={submitFormHandler} >
      <Input
        name={"name"}
        placeholder={"Имя"}
        error={validateErrors["name"]}
        onFocus={() => clearError("name")}
      />
      <Input
        name={"tel"}
        placeholder={"Телефон"}
        mask={"+{7}(000)000-00-00"}
        error={validateErrors["tel"]}
        onFocus={() => clearError("tel")}
      />
      <Input
        name={"email"}
        placeholder={"E-mail"}
        error={validateErrors["email"]}
        onFocus={() => clearError("email")}
      />

      <Checkbox onChange={setCheckboxValue} error={validateErrors["policy"]} />

      <Button variant="dark" type="submit">
        Отправить
      </Button>
    </form>
  );
}
