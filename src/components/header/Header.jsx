import React, { useRef, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import "./header.scss";

import logo from "../../assets/tmovie.png";

// Nếu tìm /X vào Catalog; /X/X... vào Detail; /X/search/X vào Catalog cụ thể trong routes.jsx
const headerNav = [
    {
        display: "Home",
        path: "/",
    },
    {
        display: "Movies",
        path: "/movie",
    },
    {
        display: "TV Series",
        path: "/tv",
    },
];

const Header = () => {
    // useLocation sẽ trả về location object hiện tại. Nó sẽ giúp ích trong trường hợp chúng ta muốn lấy thông tin từ URL hiện tại. Có pathname, key,..vv
    // pathname = link trang hiệN tại vd /;/tv;/movie
    // headerRef object key=current value div đặt ref
    const { pathname } = useLocation();
    const headerRef = useRef(null);

    // console.log(pathname)

    // home=0; movie=1...
    const active = headerNav.findIndex((e) => e.path === pathname);

    // console.log(useLocation());
    // useEffect(() => {
    //     console.log(headerRef);
    // });

    // hiệu ứng cuộn chuột header sẽ nhỏ lại
    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        };
        window.addEventListener("scroll", shrinkHeader);
        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">tMovies</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((e, i) => (
                        // e = từng headerNav
                        <li
                            key={i}
                            // nếu trang đc chọn thì i = 0,1,2 khác active sẽ đc gán bằng active còn lại rỗng
                            className={`${i === active ? "active" : ""}`}
                        >
                            {/* {console.log(e)} */}
                            {/* {console.log(i)} */}
                            <Link to={e.path}>{e.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
