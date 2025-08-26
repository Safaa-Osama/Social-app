import axios from "axios";

export async function ChangePasswordApi(body, userToken) {
  try {
    const headers = { token: userToken };
    const data = await axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      body,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

export async function ChangePhotoApi(formData, userToken) {
  try {
    const headers = { token: userToken };
    const data = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}

export async function getLoggedUserDataApi(userToken) {
  try {
    const headers = { token: userToken };
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/users/profile-data",
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
}
