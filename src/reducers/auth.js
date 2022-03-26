import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:

    //after register or login set userinfo and user.token in localstorage
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      // and set user data and token in authData object in redux
      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
        
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;



// data recived

// result: {googleId: "100738443818989595604",…}
// email: "gomemahero@gmail.com"
// familyName: "Gome"
// givenName: "Mahero"
// googleId: "100738443818989595604"
// imageUrl: "https://lh3.googleusercontent.com/a/AATXAJwwa7i3gMctJh5KEvwa66YPSybfExCWeJIPsPhk=s96-c"
// name: "Mahero Gome"
// token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyOTE4OTQ1MGQ0OTAy