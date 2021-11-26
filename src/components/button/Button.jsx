import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = (props) => {
    // {
    //     console.log(props);
    //     console.log(props.className);
    //     console.log(props.children);
    // }

    return (
        <button
            className={`btn ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    );
};

export const OutlineButton = (props) => {
    // {
    //     console.log(props);
    //     console.log(props.className);
    //     console.log(props.children);
    // }
    return (
        <Button
            className={`btn-outline ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};

export default Button;
