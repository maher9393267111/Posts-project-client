import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
export default function Navbar() {
  // const user = useSelector(state=>state.auth)

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // console.log(location.pathname) ---> /auth /.. /...

  return (
    <div className="   grid grid-cols-2   ml-4 mt-4 p-4  mr-4  rounded-lg m-auto bg-slate-200 mb-4">
      {user?.result.imageUrl ? (
        <div className="  cursor-pointer logo-profile-container  justify-self-start ">
          <img
            className="w-16 rounded-full"
            src={user.result.imageUrl}
            alt=""
          />
        </div>
      ) : null}

      <div className="  mt-4 text-lg text-bold  auth-container  justify-self-center">
        {user ? (
          <button onClick={logout} type="submit">
            Logout
          </button>
        ) : (
          <Link to={location.pathname === "/auth" ? "/" : "auth"}>
            <button type="">
              {location.pathname === "/auth" ? "Home" : "sign in"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
