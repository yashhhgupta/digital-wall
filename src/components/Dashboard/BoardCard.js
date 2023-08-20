import styles from "./BoardCard.module.css";
import { useNavigate } from "react-router-dom";
import { boardActions } from "../../store/board-slice";
import { useState,useRef,useEffect } from "react";
import { useDispatch } from "react-redux";
import Dots from "../../assets/DotsVerticalOutlined.svg";
import FloatCard from "../common/FloatCard";
import Modal from "../common/Modal";
import AddBoard from "../Forms/AddBoard";
const BoardCard= (prop)=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [card, setCard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const ClickHandler = ()=>{
    navigate(`/board/${prop.item.id}`);
  }
  const EditClickHandler = ()=>{
    openModal();
    setCard(false);
  }
  const DeleteClickHandler = ()=>{
    dispatch(boardActions.removeBoard(prop.item.id));
    setCard(false);
  }
  

    return (
      <>
        <div>
          <div className={styles.board}>
            <div
              className={styles.left}
              onClick={ClickHandler}
              style={{ backgroundColor: `var(--${prop.item.color})`,cursor:"pointer" }}
            ></div>
            <div className={styles.midright}>
              <div className={styles.mid} onClick={ClickHandler}>
                {prop.item.name}
              </div>
              <div className={styles.right}>
                <img
                  src={Dots}
                  alt="dots"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCard(!card);
                  }}
                />
              </div>
              {card && (
                <FloatCard
                  edit={EditClickHandler}
                  delete={DeleteClickHandler}
                />
              )}
            </div>
          </div>
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <AddBoard item={prop.item} />
        </Modal>
      </>
    );
}
export default BoardCard;