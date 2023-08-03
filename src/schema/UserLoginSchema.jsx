import * as yup from "yup";

const UserLoginSchema = yup.object().shape({
  userEmail: yup.string().required("*Field required"),
  password: yup.string().required("*Field required"),
});

export default UserLoginSchema;
