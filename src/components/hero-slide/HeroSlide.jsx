import PropTypes from "prop-types";
import "./hero-slide.scss";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { useEffect, useState, useRef } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router";
import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

const Heroslide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItem, setMovieItems] = useState([]);

    // 1
    useEffect(() => {
        const getMovies = async () => {
            // Tạo param để chọn trang muốn lấy
            const params = { page: 1 };

            try {
                // Ở file tmdbApi gọi hàm getMoviesList truyền vào movieType.popular = popular, params=1; Dùng axios get axiosClient.get(url, params); về
                const response = await tmdbApi.getMoviesList(
                    movieType.popular,
                    { params }
                );
                // response là 20 phim ở trang 1 và sẽ chỉ lấy 4 show ra làm 4 slide
                setMovieItems(response.results.slice(0, 4));
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, []);

    // 2
    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
            >
                {/* movieItem hiện là 4 phim đầu đã get về  */}
                {/* {console.log("check", movieItem)} */}
                {movieItem.map((item, i) => (
                    <SwiperSlide key={i}>
                        {/* isActive là biến boolean trong lib swiper  */}
                        {({ isActive }) => (
                            // goị hàm component HeroSlideItem
                            <HeroSlideItem
                                item={item}
                                className={`${isActive ? "active" : ""}`}
                            />
                            // <img src={apiConfig.originalImage(item.backdrop_path)}/>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItem.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))}
        </div>
    );
};

// 3
const HeroSlideItem = (props) => {
    // console.log(props);
    // truyền vào từng item của movieItem với class chuyển đến slide nào item đó dc add class active trong hero-slide.scss
    let history = useHistory();
    const item = props.item;

    // mỗi item(phim) có 1 backdrop_path và 1 poster_path truyền vào file apiConfig return về hình đó gán vào background (3 cái item chưa active)
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path
    );

    // console.log(background);
    // 5
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        // console.log(item.id);

        const videos = await tmdbApi.getVideos(category.movie, item.id);
        // videos= object promise có id và results
        // console.log(videos);

        if (videos.results.length > 0) {
            const videoSrc =
                "http://www.youtube.com/embed/" + videos.results[0].key;
            // videos = link youtube film đó
            // console.log(videoSrc);
            // thêm attri cho modal có src = videoSrc
            modal
                .querySelector(".modal__content > iframe")
                .setAttribute("src", videoSrc);
        } else {
            modal.querySelector(".modal__content").innerHTML = "No trailer";
        }
        modal.classList.toggle("active");
    };

    // 4
    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        {/* truyền props có onClick xuống component button  */}
                        <Button
                            // path='/:category/:id sẽ đến component={Detail}
                            onClick={() => history.push("/movie/" + item.id)}
                        >
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    {/* lấy poster  */}
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    // truyền vào obj từng item của movieItem (gồm 4 phim đã cắt)
    // console.log(props.item);
    // item = tưng phim đó
    const item = props.item;
    // iframeRef = obj key current, value = iframe
    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute("src", "");

    return (
        // gọi component modal
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="500px"
                    title="trailer"
                ></iframe>
            </ModalContent>
        </Modal>
    );
};

export default Heroslide;
