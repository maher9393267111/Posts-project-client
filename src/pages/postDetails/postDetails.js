import React, { useEffect } from "react";
import { Box, Paper, Rating, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useStyles from "./styles";
import Comments from './comments'
import { useParams, useHistory, Link } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/index";
export default function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      // fetch all posts with same tag
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  console.log(recommendedPosts)

  return (
    <div className="     container  mb-10">
      <div
        className="grid-container    grid sm:grid-cols-1
md:grid-cols-2 lg:grid-cols-2
h-full
 ml-6

"
      >

      {/* Descreption     */}

        <div className="post-details shadow-lg  mb-10 shadow-black h-4/4  border-black">
            
            <div className="title-container  mb-5 text-lg">
            {post.title}
            </div>
            
            <hr/>
            
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
            
            </Typography>
            
<hr/>

<Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.name}`}
            </Link>
          </Typography>

<hr/>

<Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>


<div>
    <Comments post={post}/>
</div>


<div className=" grid lg:grid-cols-4 sm:grid-cols-2" >
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div  className=" border-black" style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img className="  h-40 object-cover  mb-4" src={selectedFile} width="200px" />
              </div>
   ))}
</div>


            </div>

{/* image container */}


        <div className="image-container  h-3/4 mt-5   justify-self-center">
          <img
            style={{ height: "100%" }}
            className=""
            src={post.selectedFile}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
