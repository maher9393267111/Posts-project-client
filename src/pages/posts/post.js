import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCurrentid,
  likePost,
  deletePost,
  getPosts,
} from "../../actions/index";
import { useHistory } from "react-router-dom";
export default function Post({ post }) {
  // const current = useSelector((state)=>state.currentid)
  const dispatch = useDispatch();
  const history = useHistory();
  //single post filter

  const user = JSON.parse(localStorage.getItem("profile"));
  // console.log('POTS in singlee post page')
  // console.log(post)

  // console.log(current)

  // const Likes = () => {
  //   if (post?.likes?.length > 0) {
  //     return post.likes.find(
  //       (like) => like === (user?.result?.googleId || user?.result?._id)
  //     ) ? (
  //       <div>
  //         {post.likes.length > 2
  //           ? `You and ${post.likes.length - 1} others`
  //           : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
  //       </div>
  //     ) : (
  //       <div>
  //         {" "}
  //         &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
  //       </div>
  //     );
  //   }

  //   return (
  //     <>
  //       <div>&nbsp;Like </div>
  //     </>
  //   );
  // };

  // const msgLiked= ()=>{

  // // if (user?.result?._id === post.likes)

  // const  likedpost = post.likes.filter((like)=>{like === user?.result?._id})

  // if (likedpost){'you liked this post'}

  // }

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <div className="max-w-sm m-3   rounded text-center align-middle overflow-hidden shadow-lg">
      <div
        style={{ width: "100%", height: "100px" }}
        className="image-container  relative "
      >
        <img
          className="w-full h-full bg-cover rounded-lg  object-cover  transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          src={post.selectedFile}
          alt="Sunset in the mountains"
        />

        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <span
            onClick={() => dispatch(updateCurrentid(post._id))}
            className="  absolute top-2  right-1  "
          >
            <i
              style={{ width: "30px", fontSize: "20px" }}
              className="fas fa-edit"
            ></i>
          </span>
        )}
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.message}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {post.tags.map((tag) => {
          return (
            <span className="  border-r-0 p-2 ml-2  rounded-lg bg-yellow-200">
              {" "}
              {tag}
            </span>
          );
        })}

        <div className=" actions m-2 grid sm:grid-cols-1 lg:grid-cols-2 ">
          <button
            disabled={!user?.result}
            className=" sm:m-auto sm:w-16  grid grid-cols-2   sm:col-span-1 rounded-full  "
            onClick={() => dispatch(likePost(post._id))}
          >
            <i
              style={{ width: "50px", fontSize: "25px" }}
              className="far fa-thumbs-up"
            ></i>
            <span>{post?.likes?.length}</span>

            {/* show message to user if liked this post */}

            {/* {msgLiked()} */}
          </button>

          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <button
              className="  sm:w-16 sm:m-auto  sm:col-span-1 rounded-full  "
              onClick={() => dispatch(deletePost(post._id))}
            >
              <span>
                <i
                  style={{ width: "50px", fontSize: "25px" }}
                  className="      far fa-trash-alt"
                ></i>
              </span>
            </button>
          )}

          <h1 className=" mt-4 text-bold  rounded-lg ">
            Creator :{user?.result?.name}
          </h1>
          <p className="  mt-4  bg-green-300 rounded-lg ml-3 p-2" onClick={openPost}>open post</p>
        </div>
      </div>

      {/* {Likes()} */}
    </div>
  );
}
