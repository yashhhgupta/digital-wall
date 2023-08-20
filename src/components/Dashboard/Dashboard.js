import styles from "./Dashboard.module.css";
import { useSelector } from "react-redux";
import BoardCard from "./BoardCard";

const Dashboard = ()=>{
  const searchtxt = useSelector(state => state.board.searchText);
  let boards = useSelector((state)=>state.board.boardsarr);
  if(searchtxt!==""){
    boards = boards.filter((board)=>{
      return board.name.toLowerCase().includes(searchtxt.toLowerCase());
    })
  }
    return (
      <div className={styles.layout}>
        <h1> My Boards</h1>
        <div className={styles.dashboard}>
          {boards.map((board) => {
            return <BoardCard item ={board }/>;
          })}
        </div>
      </div>
    );
}

export default Dashboard;