import { Link } from "react-router-dom";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import Modal from "react-modal";

import Publication from "../pages/Publications";

import logo from "../assets/wuphf.png";

import "./header.scss";

import { GrHomeRounded } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiExit } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";

interface IAvatar {
  avatar: string;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Header(props: IAvatar) {
  const { logout } = useAuth();
  const pathName = window.location.pathname;
  const [modalIsOpen, setIsOpen] = useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header className="header">
      <div className="container">
        <div>
          <img className="imageHeader" src={logo} alt="" />
        </div>
        <nav>
          <ul>
            <li className={pathName === "/" ? "active" : ""}>
              <Link to="/">
                <GrHomeRounded color="#FFF" size={25} />
              </Link>
            </li>
            <li className={pathName === "/notification" ? "active" : ""}>
              <Link to="/notification">
                <FiHeart size={25} />
              </Link>
            </li>
            <li  onClick={openModal}>
              <FiPlusSquare size={25} />
            </li>
            <li className={pathName === "/profile" ? "active" : ""}>
              <Link to="/profile">
                {props.avatar !==
                `${process.env.REACT_APP_API}/images/users/undefined` ? (
                  <img className="avatar" src={props.avatar} alt="avatar" />
                ) : (
                  <CgProfile size={25} />
                )}
              </Link>
            </li>
            <li onClick={logout}>
              <BiExit size={24} />
            </li>
          </ul>
        </nav>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>Close</button>
        <Publication />
      </Modal>
    </header>
  );
}

export default Header;
