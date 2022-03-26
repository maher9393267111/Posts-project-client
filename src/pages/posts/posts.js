import React from "react";
import { useSelector } from "react-redux";
import Post from "./post";

export default function Posts() {
  // const posts = useSelector((state) => state.posts);
  const { posts, isLoading } = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <div>
      <h1>posts page</h1>

      <div className="posts-grid  grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

        {posts?.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}
