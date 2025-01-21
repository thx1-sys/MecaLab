import axios from "axios";
import Cookies from "js-cookie";

export const fetchUser = async () => {
  try {
    const token = Cookies.get("token") || sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return null;
    }

    const userResponse = await axios.get(
      `${import.meta.env.VITE_HOST_EXPRESS}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const profileImageUrl = userResponse.data.profile_image_url
      ? `${import.meta.env.VITE_HOST_EXPRESS}/api/profile-image?filename=${
          userResponse.data.profile_image_url
        }`
      : null;

    let imageUrl = null;
    if (profileImageUrl) {
      const imageResponse = await axios.get(profileImageUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      imageUrl =
        imageResponse.status === 200
          ? URL.createObjectURL(imageResponse.data)
          : null;
    }

    return {
      username: userResponse.data.first_name,
      profileImageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
