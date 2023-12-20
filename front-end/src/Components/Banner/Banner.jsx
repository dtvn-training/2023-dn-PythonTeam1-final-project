import buildAPI from '../../const/buildAPI';
import './Banner.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

const Banner = () => {
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [fetchDataTrigger, setFetchDataTrigger] = useState(true);
    const [currentBanner, setCurrentBanner] = useState(null);
    const firstRun = useRef(true);

  const nextSlide = useCallback(() => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

    const fetchDataAndDeduct = useCallback(() => {
        buildAPI
            .get('/api/banner/get_banner')
            .then((response) => {
                const list_banner = response.data.list_banner;
                console.log(list_banner[0].campaign_id);
                const imgPreviews = list_banner.map((banner) => banner.img_preview);
                if (imgPreviews.length !== 2) {
                    console.log('Error fetching data');
                    return;
                }

                setImages(imgPreviews);

                if (!firstRun.current) {
                    setFetchDataTrigger(false);
                    setCurrentBanner(list_banner[index].campaign_id);
                }

                firstRun.current = false;
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [firstRun, setImages, setFetchDataTrigger, setCurrentBanner, index]);

    const deductCurrentBanner = useCallback(() => {
        if (currentBanner) {
            buildAPI
                .put(`/api/banner/deduction/${currentBanner}`)
                .then((response) => {
                    console.log(response.data.message);
                })
                .catch((error) => {
                    console.error('Error deducting:', error);
                });
        }
    }, [currentBanner]);

    useEffect(() => {
        fetchDataAndDeduct();
    }, [fetchDataTrigger, fetchDataAndDeduct]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [index, nextSlide]);

    useEffect(() => {
        deductCurrentBanner();
    }, [index, deductCurrentBanner]);

    useEffect(() => {
        if (!firstRun.current) {
            setFetchDataTrigger(true);
        }
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
