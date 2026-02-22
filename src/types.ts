import { VALIDATE_INPUTS_NAMES } from "@/constants";

export type NewsItem = {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageSrc: string;
  date: number;
};

export type ValidateInputsNamesType = (typeof VALIDATE_INPUTS_NAMES)[number];
