import React from "react";
import "./page-header.scss";
import bg from "../../assets/footer-bg.jpg";

const Pageheader = (props) => {
    // props = {children: 'Movie'}
    return (
        <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
            <h2>{props.children}</h2>
        </div>
    );
};

export default Pageheader;