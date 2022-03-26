import React, { useState, useEffect } from "react";
import { createPost, updatePost, currentidclear } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
export default function () {
  const current = useSelector((state) => state.currentid);
  const { currentId } = current;
  // console.log(currentId)  // psot._id

  const [postData, setPostData] = useState({
    // creator: '',
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();

  console.log(post);
  console.log("form page post------->");

  const user = JSON.parse(localStorage.getItem("profile"));
  // console.log('user name --------->',user?.result?.name)

const history =useHistory()

  const clear = () => {
    dispatch(currentidclear());
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result.name },history));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };


  // 
  if (!user?.result?.name) {
    return (
      <div  className=" mt-6  text-lg" >
        <h1 variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </h1>
      </div>
    );
  }




  return (
    <div className=" text-center sm:ml-3   mt-2  align-middle">
      {/* <h1>{user?.result?.name}</h1> */}
      <h1>{currentId ? "update post" : " create post"}</h1>

      <div className="block mb-4 form-container border-slate-800 h- p-6 align-middle rounded-lg shadow-lg bg-white max-w-sm">
        <form onSubmit={handleSubmit} className="form-here border-red-600 ">
          {/* <div className="form-group ">
            <label
              for="exampleInputEmail2"
              className="form-label inline-block  text-gray-700"
            >
              creator Name
            </label>
            <input
              type="text"
              // value={currentId ? post.creator : postData.creator}
               value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
              className="form-control  h-7
        block
        
    
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder="creator"
            />
          </div> */}
          <div className="form-group ">
            <label
              for="exampleInputPassword2"
              class="form-label inline-block mb-2 text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              // value={currentId ? post.title : postData.title}
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              name="title"
              className="form-control block
      h-7
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword2"
              placeholder="Password"
            />
          </div>

          <div className="form-group ">
            <label
              for="exampleInputPassword2"
              class="form-label inline-block mb-2 text-gray-700"
            >
              message
            </label>
            <input
              type="text"
              // value={currentId ? post.message : postData.message}
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
              name="message"
              className="form-control block
        w-full
        h-7
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword2"
              placeholder="message"
            />
          </div>

          <div className="form-group ">
            <label
              for="exampleInputPassword2"
              class="form-label inline-block mb-2 text-gray-700"
            >
              tags
            </label>
            <input
              type="text"
              // value={currentId ? post.tags : postData.tags}
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
              name="tags"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputPassword2"
              placeholder="tags"
            />
          </div>

          <div className="   mb-2">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            {currentId ? "update post" : "create post"}
          </button>
        </form>
      </div>
    </div>
  );
}
