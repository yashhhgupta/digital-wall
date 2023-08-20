import styles from "./PostCard.module.css";
import { useState } from "react";
import { postActions } from "../../store/post-slice";
import { useDispatch } from "react-redux";
import Dots from "../../assets/DotsVerticalOutlined.svg";
import Bookmark from "../../assets/BookmarkOutlined.svg";
import Like from "../../assets/HeartOutlined.svg";
import FilledLike from "../../assets/HeartLikeFilled.svg";
import BookmarkFilled from "../../assets/BookmarkFilled.svg";
import FloatCard from "../common/FloatCard";
import Modal from "../common/Modal";
import AddPost from "../Forms/AddPost";

const PostCard =(props)=>{
    const [liked,setLiked] = useState(false);
    const dispatch = useDispatch();
    const [bookmarked,setBookmarked] = useState(props.post.bookmark);
    const [card, setCard] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    // console.log(props.post);
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    const EditClickHandler = () => {
      openModal();
      setCard(false);
    };
    const DeleteClickHandler = () => {
      dispatch(postActions.removePost(props.post.id));
      setCard(false);
    };
    const BookmarkClickHandler = () => {
      setBookmarked(!bookmarked);
      dispatch(postActions.bookmarkPost(props.post.id));
    }
    const LikeClickHandler = () => {
      if(!liked)
        dispatch(postActions.likePost(props.post.id));
      else
        dispatch(postActions.unlikePost(props.post.id));
      setLiked(!liked);
    }
    return (
      <>
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <div className={styles.title}>{props.post.title}</div>
              <span style={{ color: "#b0b0b0" }}>{props.post.date}</span>
            </div>
            <div className={styles.headerRight}>
              <img src={bookmarked ? BookmarkFilled : Bookmark} alt="dots"
              style={{ cursor: "pointer" }}
              onClick={BookmarkClickHandler}
               />
              <img
                src={Dots}
                alt="dots"
                style={{ cursor: "pointer", marginLeft: "5px" }}
                onClick={() => {
                  setCard(!card);
                }}
              />
              {card && (
                <FloatCard
                  edit={EditClickHandler}
                  delete={DeleteClickHandler}
                  for="post"
                />
              )}
            </div>
          </div>
          <img src={props.post.img} alt="Image" className={styles.img} />
          <div style={{ borderBottom: "2px solid #ebebeb" }}>
            <div className={styles.description}>{props.post.description}</div>
          </div>

          <div className={styles.footer}>
            <img
              src={liked ? FilledLike : Like}
              alt="Image"
              style={{ marginRight: "5px", cursor: "pointer" }}
              onClick={LikeClickHandler}
            />
            <span>{props.post.like}</span>
          </div>
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <AddPost item ={props.post} onClose={closeModal}/>
        </Modal>
      </>
    );
}
export default PostCard;