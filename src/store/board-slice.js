import {createSlice} from '@reduxjs/toolkit'
import BoardsArr from '../data/boards';
const boardSlice = createSlice({
    name: 'board',
    initialState: {
        boardsarr : BoardsArr,
        searchText : ""
    },
    reducers: {
        addBoard(state,action){
            let id = action.payload.id;
            let boardExists = state.boardsarr.find((item)=>item.id===id);
            if(boardExists){
                //update board
                state.boardsarr = state.boardsarr.map((item)=>{
                    if(item.id===id){
                        item.name = action.payload.name;
                        item.color = action.payload.color;
                    }
                    return item;
                })
            }
            else{
                state.boardsarr.push(action.payload);
            }
        },
        removeBoard(state,action){
            state.boardsarr = state.boardsarr.filter((item)=>item.id!==action.payload);
        },
        setSearchText(state,action){
            state.searchText = action.payload;
        }
        
    }

})
export const boardActions = boardSlice.actions;
export default boardSlice;
