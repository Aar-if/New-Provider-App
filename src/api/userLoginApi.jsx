import axios from "axios";
import { create } from "../routes/links";

const userLoginApi = async (data) => {
  console.log(data);

  const identifier = data.userEmail;
  const password = data.password;

  console.log(identifier);
  console.log(password);

  let result;
  await axios
    .post("http://localhost:1337/api/auth/local/", {
      identifier: identifier,
      password: password,
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.jwt);

      localStorage.setItem("loginJwt", res.data.jwt);

      if (res.status === 200) {
        result = true;
      } else if (res.status === 400) {
        result = false;
      }
    })
    .catch(function (error) {
      console.log(error.response.data.error.message);
      let err = 0;
      alert(error.response.data.error.message);
      return err;
    });

  return result;
};

export default userLoginApi;
