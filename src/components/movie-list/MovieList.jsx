import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

import Button from "../button/Button";

import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import MovieCard from "../movie-card/MovieCard";

const Movielist = (props) => {
    // props trả về obj {category: 'movie', type: 'popular'} vv tương ứng
    const [items, setItems] = useState([]);
    // console.log(props);
    // 1
    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {
                            params,
                        });
                }
            } else {
                // chưa hiểu
                response = await tmdbApi.similar(props.category, props.id);
            }
            // trả về obj page:1; results là 20 phim để show ra vv
            setItems(response.results);
            // console.log(response);
            // console.log(response.results);
        };
        getList();
    }, []);

    return (
        <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
                {/* item = 20 phim trong results  */}
                {items.map((item, i) => (
                    <SwiperSlide key={i}>
                        {/* <img src={apiConfig.w500Image(item.poster_path)} alt="" /> */}
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

Movielist.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default Movielist;
