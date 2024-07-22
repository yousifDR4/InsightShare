import { createSlice } from "@reduxjs/toolkit";
const initialState={
    posts:[],
    pagination:1
}
const postsSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
        },
        setpagination:(state,action)=>{
            state.posts=[...state.posts,action.payload.posts];
            state.pagination=action.payload.pagination
        }
    }
})
export const {setPosts,setpagination} = postsSlice.actions;
export default postsSlice.reducer;
