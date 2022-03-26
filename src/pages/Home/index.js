import React from 'react'
import { useEffect,useState } from "react";
import Posts from '../posts/posts'
import Form from '../form/form'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts, } from '../../actions/index';
import { getPostsBySearch } from '../../actions/index';
import { useSelector } from 'react-redux';
import  Paginate  from '../pagination';
import ReactChipInput from "react-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {

const [chips,setChips] =useState([])
  const dispatch = useDispatch();
  // const classes = useStyles();

  const posts = useSelector((state) => state.posts);

  const query = useQuery();
  const page = query.get('page') || 1;
  console.log(page,'page------------> number of page')
  const searchQuery = query.get('searchQuery');


  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

console.log(tags,'tags here-------------->')

  const history = useHistory();


  // console.log(posts)
// fetch all posts in app js
  useEffect(() => {
    dispatch(getPosts());
  }, [ dispatch]);



  const addChip = value => {
    const tags1 = tags.slice();
    tags1.push(value);
    setTags(tags1);
};


const removeChip = index => {
    const tags1 = tags.slice();
    tags1.splice(index, 1);
    setTags(tags1);
};




  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));




  return (
    <div className="pf-container  grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
    <div className="posts m-6  lg:col-span-8 md:col-span-4 sm:col-span-3">
      <Posts />

      {(!searchQuery && !tags.length) && (
<div className='pagination-container text-center'>
<Paginate page ={page}/>
</div>

      )}

    </div>

    <div className=" form shadow-lg  lg:col-span-4 md:col-span-2 sm:col-span-1">

{/* <h1>{tags}</h1> */}


<div className='search-keyword-container'>
  <input type="text" 
  onKeyDown={handleKeyPress} 
  value={search} onChange={(e) => setSearch(e.target.value)}
  />
</div>

    <div className="form-group">
      
            <ReactChipInput
                classes={"input-custom-chip  "}
                onKeyDown={handleKeyPress} 
                chips={tags}
                onSubmit={value => addChip(value)}
                onRemove={index => removeChip(index)}
             />
                  {/* <label className='  m-3 mb-5 ' >{chips}</label> */}
        </div>

<div>
<button 

type='submit' onClick={searchPost} >Search</button>

</div>



      <Form />



    </div>



  </div>


  )
}
