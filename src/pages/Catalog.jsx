import React from "react";
import { useParams } from "react-router";
import Pageheader from "../components/page-header/PageHeader";
import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/movieGrid/MovieGrid";
const Catalog = () => {
    const { category } = useParams();
    // category = click nav vd movie, tv

    return (
        <>
            <Pageheader>
                {category === cate.movie ? "Movie" : "TV Series"}
            </Pageheader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
        </>
    );
};

export default Catalog;
