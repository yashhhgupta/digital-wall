import styles from "./FloatCard.module.css";
import Edit from "../../assets/PencilLineOutlined.svg";
import Delete from "../../assets/Delete.svg";

const FloatCard =(props)=>{
    const EditHandler = ()=>{
        props.edit();
    }
    const DeleteHandler = ()=>{
        props.delete();
    }
    const newStyles = props.for !== "post" ? {} : {
      margin: "150px 0px 0px 20px"
    }

    return (
      <div className={styles.card} style={newStyles} >
        <div className={styles.row} onClick={EditHandler}>
          <img
            src={Edit}
            alt="edit"
            style={{ height: "30px", marginRight: "10px" }}
          />
          Edit
        </div>
        <div
          className={styles.row}
          style={{ color: "#D33852" }}
          onClick={DeleteHandler}
        >
          <img
            src={Delete}
            alt="delete"
            style={{ height: "30px", marginRight: "10px" }}
          />
          Delete
        </div>
      </div>
    );
}
export default FloatCard;