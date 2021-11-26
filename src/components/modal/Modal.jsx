import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./modal.scss";

// truyền vào props có active: false; id: modal_id phim
// có children là ModalContent
function Modal(props) {
    // console.log(props);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
        // false
        // console.log(active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${active ? "active" : ""} `}>
            {/* {console.log(props.id)}
            {console.log(props.children)} */}
            {props.children}
        </div>
    );
}

export const ModalContent = (props) => {
    // console.log(props);
    const contentRef = useRef(null);

    const closeModal = () => {
        // remove active ở thẻ cha là modal ở func modal
        contentRef.current.parentNode.classList.remove("active");
        if (props.onClose) props.onClose();
    };

    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    );
};

ModalContent.propTypes = {
    onClose: PropTypes.func,
};

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
};

export default Modal;
