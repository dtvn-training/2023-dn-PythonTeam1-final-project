import buildAPI from "../../const/buildAPI";
import "./Banner.scss";
import { useCallback, useEffect, useRef, useState } from "react";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(true);
  const isMounted = useRef(false);

  const nextSlide = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const fetchUserData = () => {
    buildAPI
      .get("/api/banner/get_banner")
      .then((response) => {
        const list_banner = response.data.list_banner;
        console.log(list_banner);
        const imgPreviews = list_banner.map((banner) => banner.img_preview);
        if (imgPreviews.length !== 2) {
          console.log("Error fetching data");
          return;
        }
        setImages(imgPreviews);
        setFetchDataTrigger(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
      fetchUserData();
  }, []);

  useEffect(() => {
    if (isMounted.current && fetchDataTrigger) {
      fetchUserData();
    } else {
      isMounted.current = true;
    }
  }, [isMounted, fetchDataTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [index, nextSlide]);

  useEffect(() => {
    setFetchDataTrigger(true);
  }, [index]);

  return (
    <div className="slider">
      {images.length === 2 && (
        <img className="imageSlider" src={images[index]} alt="" />
      )}
    </div>
  );
};

export default Banner;
