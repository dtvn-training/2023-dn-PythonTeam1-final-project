import buildAPI from '../../const/buildAPI';
import './banner.scss'
import { useCallback, useEffect, useRef, useState } from "react";

const Banner = () => {
    const [index, setIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [fetchDataTrigger, setFetchDataTrigger] = useState(true);  // State để kích thích gọi lại API banner
    const isMounted = useRef(false);

    const nextSlide = useCallback(() => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await buildAPI.get("/api/banner/get_banner");
                const list_banner = response.data.list_banner;
                const imgPreviews = list_banner.map(banner => banner.img_preview);
                if (imgPreviews.length !== 2) {
                    console.log("Error fetching data");
                    return;
                }
                setImages(imgPreviews);
                setFetchDataTrigger(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

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
                <img className='imageSlider' src={images[index]} alt="" />
            )}
        </div>
    );
};

export default Banner;
