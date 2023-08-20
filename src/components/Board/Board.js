import styles from "./Board.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PlusIcon from "../../assets/AddOutlined.svg";
import Modal from "../common/Modal";
import Navbar from "../Navbar/Navbar";
import AddPost from "../Forms/AddPost";
import PostBoard from "./PostBoard";
const Board = () => {
  const { id } = useParams();
  const boards = useSelector((state) => state.board.boardsarr);
  const myBoard = boards.filter((board) => board.id == id)[0];
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  

  return (
    <>
      <Navbar nav={myBoard.name} />

      <div
        className={styles.body}
        style={{ backgroundColor: `var(--${myBoard.color})` }}
      >
        <div className={styles.layout}>
          <div className={styles.header}>
            <h1>Your posts</h1>
            <button className={styles.btn} onClick={openModal}>
              <img src={PlusIcon} style={{ marginRight: "10px" }} /> Create new
              post
            </button>
          </div>
            <PostBoard boardId={id} />
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <AddPost id={id} onClose={closeModal} />
      </Modal>
    </>
  );
};
export default Board;
