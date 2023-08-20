import styles from "./Form.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { boardActions } from "../../store/board-slice";
import { useNavigate } from "react-router-dom";
const AddBoard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let nme =props.item?props.item.name:"";
  let clr =props.item?props.item.color:"blue";
  let id =props.item?props.item.id:null;
  const [name, setName] = useState(nme);
  const [color, setColor] = useState(clr);
  const colors = [
    {
      id: 1,
      name: "blue",
    },
    {
      id: 2,
      name: "pink",
    },
    {
      id: 3,
      name: "yellow",
    },
    {
      id: 4,
      name: "violet",
    },
  ];

  const addBoard = () => {
    if(id==null){
     id = Math.floor(Math.random() * 10000);
    }
    dispatch(boardActions.addBoard({
      id: id,
      name, color }));
    navigate(`/board/${id}`);
  }
  // console.log(b);
  return (
    <div className={styles.form}>
      <h2>Add a name for your board</h2>
      <input
        type="text"
        placeholder="Enter Board Name"
        className={styles.input}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <span style={{ fontWeight: "bold", fontSize: "25px" }}>
        Select post colour
      </span>
      <br />
      Here are some templates to help you get started
      <div className={styles.color}>
        {colors.map((item) => {
          return (
            <div key={item.id}>
              <div
                className={styles.colorBox}
                style={{
                  backgroundColor: `var(--${item.name})`,
                  border: `2px solid ${
                    item.name === color ? "black" : "white"
                  }`,
                }}
                onClick={() => {
                  setColor(item.name);
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button className={styles.btn} onClick={addBoard}>
          {id?"Update Board":"Create Board"}
          
          </button>
      </div>
    </div>
  );
};
export default AddBoard;
