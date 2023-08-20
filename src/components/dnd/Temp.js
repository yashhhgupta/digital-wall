import "./temp.css";
import { DragDropContext,Droppable,Draggable } from "react-beautiful-dnd";
const Temp = () =>{
    const items =[
        {
            name:"item 1",
            id:1
        },
        {
            name:"item 2",
            id:2
        },
        {
            name:"item 3",
            id:3
        }
    ]
    const handleDragDrop =(results)=>{
        // console.log("drag drop",results);
        const {source,destination,type} = results;
        if(!destination){
            return;
        }
        if(source.droppableId === destination.droppableId && source.index === destination.index){
            return;
        }
        if(type==="group"){
            const itemCopy = {...items[source.index]};
            items.splice(source.index,1);
            items.splice(destination.index,0,itemCopy);
        }
    }
    return (
      <>
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="droppable-1" type="group">
            {(provided) => (
              <div
                className="container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item, index) => (
                  <Draggable draggableId={JSON.stringify(item.id)} key={JSON.stringify(item.id)} index={index}>
                    {(provided) => (
                      <div
                        className="card"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div>{item.name}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
}
export default Temp;