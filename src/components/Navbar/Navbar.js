import styles from "./Navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector ,useDispatch} from "react-redux";
import { postActions } from "../../store/post-slice";
import SearchOutlined from "../../assets/SearchOutlined.svg";
import { boardActions } from "../../store/board-slice";
import Back from "../../assets/Vector 266 (Stroke).svg"
import BrandLogo from "../../assets/Subtract.svg";
import PlusIcon from "../../assets/AddOutlined.svg";
import Bookmark from "../../assets/BookmarkOutlined.svg";
import BookmarkFilled from "../../assets/BookmarkFilled.svg";
import AddBoard from "../Forms/AddBoard";
import Modal from "../common/Modal";
const Navbar = (prop) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarked = useSelector(state=>state.post.bookmark);
  const [modalOpen, setModalOpen] = useState(false);
  const searchText = useSelector(state=>state.board.searchText);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const temp = prop.nav==="toddle";
  const BackHandler = ()=>{
    navigate("/");
  }
  const BookmarkHandler = ()=>{
    dispatch(postActions.setBookmark());
  }
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navList}>
          <div className={styles.flex}>
            {!temp ? (
              <img
                src={Back}
                alt="back"
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={BackHandler}
              />
            ) : (
              ""
            )}
            <img
              src={BrandLogo}
              alt="Brand Logo"
              style={{ margin: "5px 10px" ,cursor:"pointer"}}
              onClick ={()=>navigate("/")}

            />
            {(bookmarked)?"My bookmarks":prop.nav}
          </div>
          <div className={styles.navRight}>
            <div className={styles.flex2}>
              <img src={SearchOutlined} alt="search" />
              <input className={styles.input} placeholder="Search.."
              value={searchText}
              onChange={(e)=>{
                dispatch(boardActions.setSearchText(e.target.value));
              }}
              ></input>
            </div>
            <div>
              {temp && (
                <button className={styles.btn} onClick={openModal}>
                  <img src={PlusIcon} style={{ marginRight: "10px" }} alt="plus"/> Create
                  new board
                </button>
              )}
              {!temp && <img src={
                (bookmarked)?BookmarkFilled:Bookmark
                } alt="bookmark" 
                style={{width:"20px",cursor:"pointer"}}
                onClick={BookmarkHandler}
                />}
            </div>
          </div>
        </div>
      </nav>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <AddBoard />
      </Modal>
    </>
  );
};

export default Navbar;
