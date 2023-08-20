import {createSlice} from '@reduxjs/toolkit'
import PostsArr from '../data/Posts';
const postSlice = createSlice({
    name: 'post',
    initialState: {
        postsarr : PostsArr,
        bookmark :false,
    },
    reducers: {
        addPost(state,action){
            let id = action.payload.id;
            let postExists = state.postsarr.find((item)=>item.id===id);
            if(postExists){
                //update post
                state.postsarr = state.postsarr.map((item)=>{
                    if(item.id===id){
                        item.title = action.payload.title;
                        item.description = action.payload.description;
                    }
                    return item;
                })
            }
            else{
                state.postsarr.push(action.payload);
            }
        },
        removePost(state,action){
            state.postsarr = state.postsarr.filter(post => post.id !== action.payload);
        },
        bookmarkPost(state,action){
            state.postsarr = state.postsarr.map((item)=>{
                if(item.id===action.payload){
                    item.bookmark = !item.bookmark;
                }
                return item;
            })
        },
        likePost(state,action){
            state.postsarr = state.postsarr.map((item)=>{
                if(item.id===action.payload){
                    item.like++;
                }
                return item;
            })
        },
        unlikePost(state,action){
            state.postsarr = state.postsarr.map((item)=>{
                if(item.id===action.payload){
                    item.like--;
                }
                return item;
            })
        },
        setBookmark(state,action){
            state.bookmark = !state.bookmark;
        },
        setPostsArr(state,action){
            let pArr= action.payload.arr;
            let id = action.payload.boardId;
            //add items where id is equal to boardId
            let arr=[];
            state.postsarr.forEach((item)=>{
                if(item.boardId!=id){
                    arr.push(item);
                }
            })
            state.postsarr = [...arr, ...pArr];

        }
        
    }

})
export const postActions = postSlice.actions;
export default postSlice;