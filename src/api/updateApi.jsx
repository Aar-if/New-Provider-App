import axios from "axios";
import { create } from "../routes/links";

const updateApi = async (data, id) => {
  console.log("INSIDE UPDATE API");

  const title = data.contentName;
  const language = data.language;
  const theme = data.theme;
  const contentType = data.contentType;
  const contentLink = data.contentLink;
  const description = data.description;
  const competency = data.compentencies;
  const domain = data.contentDomain;
  const goal = data.contentGoal;

  let result;
  await axios
    .put("http://localhost:1337/api/fln-contents/" + id, {
      data: {
        title: title,
        description: description,
        language: language,
        link: contentLink,
        contentType: contentType,
        domain: domain,
        goal: goal,
        competency: competency,
        themes: theme,
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);

      if (res.status === 200) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch(function (error) {
      console.log(error.response.data.error);
      let err = 0;
      return err;
    });

  return result;
};

export default updateApi;
