import * as yup from "yup";

const UserRegisterSchema = yup.object().shape({
  userName: yup.string().required("*Field required"),
  userEmail: yup.string().required("*Field required"),
  password: yup.string().required("*Field required"),
  confirmPassword: yup.string().required("*Field required"),
  organization: yup.string().required("*Field required"),
  secretCode: yup.string().required("*Field required"),
});

export default UserRegisterSchema;
