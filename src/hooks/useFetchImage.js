import { useEffect, useState } from "react";
import axios from "axios";

const useFetchImage = (nameImage) => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const hostExpress = import.meta.env.VITE_HOST_EXPRESS;
    if (!hostExpress) {
      setError(new Error("VITE_HOST_EXPRESS no está definida"));
      return;
    }

    const fetchImage = () => {
      axios
        .get(`${hostExpress}/img/${nameImage}`)
        .then(() => {
          setImageUrl(`${hostExpress}/img/${nameImage}`);
          setError(null); // Clear error if the image loads successfully
        })
        .catch((error) => {
          setError(error);
          setRetry(true); // Set retry to true if there's an error
        });
    };

    fetchImage();

    let intervalId;
    if (retry) {
      intervalId = setInterval(() => {
        fetchImage();
      }, 60000); // 1 minute
    }

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [nameImage, retry]);

  return { imageUrl, error };
};

export default useFetchImage;
