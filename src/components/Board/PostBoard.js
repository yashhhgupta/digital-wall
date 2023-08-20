import PostCard from "../Post/PostCard";
import styles from "./Board.module.css";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Image from "../../assets/bgImg.svg";
import { postActions } from "../../store/post-slice";
import { useSelector } from "react-redux";
const PostBoard = (props) => {
    const id  = props.boardId;
    const dispatch = useDispatch();
    const searchtxt = useSelector((state) => state.board.searchText);
    const bookmarked = useSelector((state) => state.post.bookmark);
    let posts = useSelector((state) => state.post.postsarr).filter((post) => {
        return (
            post.boardId == id &&
            //if searchtxt is empty then return all posts
            (searchtxt === "" ? true : 
            post.title.toLowerCase().includes(searchtxt.toLowerCase()) )&&
            (bookmarked ? post.bookmark : true)
        )
    }
    );
    const handleDragDrop =(results)=>{
        const {source,destination,type} = results;
        if(!destination){
            return;
        }
        if(source.droppableId === destination.droppableId && source.index === destination.index){
            return;
        }
        if(type==="group"){
            const reorderedPosts = [...posts];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [removed] = reorderedPosts.splice(sourceIndex,1);
            reorderedPosts.splice(destinationIndex,0,removed);
            return dispatch(postActions.setPostsArr({arr:reorderedPosts,boardId:id}));
        }
    }
  return (
    <>
      {posts.length === 0 && (
        <div className={styles.noPost}>
          <img src={Image} alt="background Image" />
          <h3>Nothing here yet</h3>
          <p>Create your first post by clicking on the '+' button above</p>
        </div>
      )}
      {posts.length !== 0 && (
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="droppable-1" type="group">
          {(provided) => (
            <div
              className={styles.posts}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {posts.map((post, index) => (
                <Draggable
                  draggableId={JSON.stringify(post.id)}
                  key={JSON.stringify(post.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <PostCard post={post} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>)}
    </>
  );
};
export default PostBoard;

//Outside Click disable
