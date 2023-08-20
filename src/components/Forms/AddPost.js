import styles from './Form.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postActions } from '../../store/post-slice';
import ImageUplaod from '../../assets/Image upload.svg';
const AddPost = (props) => {
    let id = props.item ? props.item.id : null;
    let titl = props.item ? props.item.title : "";
    let desc = props.item ? props.item.description : "";
    let img = props.item ? props.item.img : "";
    const [title, setTitle] = useState(titl);
    const [description, setDescription] = useState(desc);
    const [image, setImage] = useState(img);
    const ImageChangeHandler = (e) => {
      e.preventDefault();
      if(e.target.files && e.target.files[0]){
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    }
    const dispatch = useDispatch();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const AddPost = () => {
      if(id==null){
        id = Math.floor(Math.random() * 10000);
      }
      const today = new Date();
      const day = today.getDate();
      const monthIndex = today.getMonth();
      const monthName = months[monthIndex];

      const formattedDate = `${day} ${monthName}`;
        let data = {
            boardId:props.id,
            id:id,
            title,
            description,
            img:image,
            like : 0,
            bookmark : false,
            date : formattedDate,
        }
        dispatch(postActions.addPost(data));
        props.onClose();
        // console.log(posts);
    }
    // console.log(posts);
    return (
      <div className={styles.form}>
        <span style={{ fontWeight: "bold", fontSize: "25px" }}>
          Create a post
        </span>
        <br />
        Write Something for your post
        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="title"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Subject
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Post Title"
            className={styles.input}
          />
          {!id?
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label className={styles.imageInput}>
              <input
                type="file"
                accept="image/*"
                className={styles.addImageButton}
                onChange={ImageChangeHandler}
              />
              Add your image
            </label>
            <img
              src={image ? image : ImageUplaod}
              alt="Image"
              className={styles.image}
            />
          </div>:""}
        </div>
        <hr />
        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="description"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            Whats on your mind?
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter Post Title"
            className={styles.input}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className={styles.btn} onClick={AddPost}>
            Publish
          </button>
        </div>
      </div>
    );
}
export default AddPost;