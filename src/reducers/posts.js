

import { FETCH_ALL,COMMENT, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

      case FETCH_POST:   // post:{object}
      return { ...state, post: action.payload.post };

      case COMMENT:
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post._id == +action.payload._id) {
              return action.payload;
            }
            return post;
          }),
        };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};









// export default (posts = [], action) => {
//   switch (action.type) {
//     case FETCH_ALL:
//       return action.payload;
//     case LIKE:
//       return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
//     case CREATE:
//       return [...posts, action.payload];
//     case UPDATE:
//       return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
//     case DELETE:
//   //  itis true but have to refresh the page return    posts
//   // currently and speed deleted fro posts
//        return posts.filter((post) => post._id !== action.payload);
//     default:
//       return posts;
//   }
// };
