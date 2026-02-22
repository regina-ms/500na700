import { SubmitEventHandler, useState } from "react";

type Validator = (value: string) => Validity;
type Valid = { error: false; valid: true };
type Invalid = { error: string; valid: false };
type Validity = Valid | Invalid;
type ValidateFormResult = { name: string; validity: Validity }[];

const validators: Record<string, Validator> = {
  name: (value: string) => {
    if (!value) {
      return { valid: false, error: "Поле не должно быть пустым" };
    }
    return { error: false, valid: true };
  },

  tel: (value: string) => {
    if (!value) {
      return { valid: false, error: "Поле не должно быть пустым" };
    }
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length < 11) {
      return { valid: false, error: "Телефон должен содержать 11 цифр" };
    }
    return { error: false, valid: true };
  },

  email: (value: string) => {
    if (!value) {
      return { valid: false, error: "Поле не должно быть пустым" };
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return { valid: false, error: "Некорректный email" };
    }
    return { error: false, valid: true };
  },

  policy: (value: string) => {
    if (value === "false") {
      return { valid: false, error: "Согласие обязательно" };
    }
    return { error: false, valid: true };
  },
};

/** Собирает значения инпутов в форме и использует валидатор по аттрибуту name
 * если валидатора нет, возвращает "валидность" */

export const validateForm = (
  form: HTMLFormElement,
  checkBoxValue: boolean,
): ValidateFormResult => {
  const formData = new FormData(form);
  formData.append("policy", `${checkBoxValue}`);
  const inputs = Array.from(formData.entries());

  return inputs.map(([name, value]) => {
    return {
      name,

      validity: validators[name]
        ? // @ts-ignore
          validators[name](value)
        : { error: false, valid: true },
    };
  });
};

type UseFormatValidation = {
  validateErrors: Record<string, string>;
  submitFormHandler: SubmitEventHandler<HTMLFormElement>;
  clearError: (inputName: string) => void;
};

export const useFormValidation = (
  checkBoxValue: boolean,
  customOnSubmit?: SubmitEventHandler<HTMLFormElement>,
): UseFormatValidation => {
  const [validateErrors, setValidateErrors] = useState<Record<string, string>>(
    {},
  );

  const submitFormHandler: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validatedInputs = validateForm(e.target, checkBoxValue);
    const invalidInputs = validatedInputs.filter((input) => {
      if (!input.validity.valid) {
        return { [input.name]: input.validity.error };
      }
    });

    if (!invalidInputs.length) {
      customOnSubmit && customOnSubmit(e);
      e.target.reset();
      return;
    }

    invalidInputs.forEach((input) =>
      setValidateErrors((prev) => ({
        ...prev,
        [input.name]: input.validity.error || "",
      })),
    );
  };

  const clearError = (name: string) => {
    const updatedValidateErrors: Record<string, string> = {};

    Object.entries(validateErrors)
      .filter(([inputName, errorText]) => inputName !== name)
      .map(
        ([inputName, errorText]) =>
          (updatedValidateErrors[inputName] = errorText),
      );

    setValidateErrors(updatedValidateErrors);
  };

  return { validateErrors, submitFormHandler, clearError };
};
