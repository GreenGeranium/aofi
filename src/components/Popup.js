import { useEffect } from "react";

function Popup(props) {
  // закрытие попапа по Esc
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [props.isOpen, props.onClose]);

  return (
    <div
      className={`popup ${props.isOpen ? `popup_opened` : ""}`}
      onClick={props.onClose}
    >
      <div
        className={`container container_${props.popupName}`}
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
