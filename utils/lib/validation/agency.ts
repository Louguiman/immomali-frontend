import * as yup from "yup";

export const getAgencyProfileSchema = (t: (key: string) => string): yup.ObjectSchema<any> =>
  yup.object().shape({
    name: yup
      .string()
      .required(t("profile.validation.nameRequired"))
      .min(2, t("profile.validation.nameMin")),
    description: yup.string().nullable(),
    address: yup.string().nullable(),
    phoneNumber: yup.string().nullable(),
    email: yup
      .string()
      .email(t("profile.validation.email"))
      .nullable()
      .transform((value) => (value === "" ? null : value)),
    website: yup
      .string()
      .url(t("profile.validation.website"))
      .nullable()
      .transform((value) => (value === "" ? null : value)),
  });
