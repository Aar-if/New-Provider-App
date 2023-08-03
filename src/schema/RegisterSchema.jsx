import * as yup from "yup";

const RegisterSchema = yup.object().shape({
  contentName: yup.string().required("*Field required"),
  language: yup.string().required("*Field required"),
  theme: yup.string().required("*Field required"),
  contentType: yup.string().required("*Field required"),

  contentLink: yup.string().required("*Field required"),
  description: yup.string().required("*Field required"),
  compentencies: yup.string().required("*Field required"),
});

export default RegisterSchema;
