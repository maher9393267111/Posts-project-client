import { CURRENTID_CHANGE,CURRENTID_CLEAR } from "../constants/actionTypes";


export default (state = {currentId:0}, action) => {
  switch (action.type) {
    case CURRENTID_CHANGE:
      return { ...state, currentId: action.payload };

case CURRENTID_CLEAR:

return {...state,currentId:0}

      default:
        return state;
  }
};
