import {COMMENT,START_LOADING,FETCH_POST,FETCH_BY_SEARCH, END_LOADING, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,CURRENTID_CHANGE,CURRENTID_CLEAR } from '../constants/actionTypes';

import * as api from '../api/index.js';



export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};







// export const getPosts = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchPosts();

//     dispatch({ type: FETCH_ALL, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };



export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};



export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } }); 
    // data well be searched posts
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};



export const createPost = (post,history) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};



export const updateCurrentid = (postid) => async (dispatch) => {
  try {
   

    dispatch({ type: CURRENTID_CHANGE, payload: postid });
  } catch (error) {
    console.log(error.message);
  }
};



export const currentidclear = () => async (dispatch) => {
  try {
   

    dispatch({ type: CURRENTID_CLEAR });
  } catch (error) {
    console.log(error.message);
  }
};


export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};