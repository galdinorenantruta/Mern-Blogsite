import  { useEffect, useState } from "react";

import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    

    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/savedPosts/ids/${userID}`
        );
        setSavedPosts(response.data.savedPosts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
    fetchSavedPosts();
   
  }, []);

  const savePost = async (postID) => {
    try {
      const response = await axios.put("http://localhost:3001/posts", {
        postID,
        userID,
      });
      console.log(response.data.savedPosts);
    } catch (err) {
      console.log(err);
    }
  };
  const isPostSaved = (id) => savedPosts.includes(id);
  

  return (
    <div>
      <h1>Postagens</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <div>
              <h2>{post.title}</h2>
              <button
                onClick={() => savePost(post._id)}
                disabled={isPostSaved(post._id)}
              >
                {isPostSaved(post._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{post.content}</p>
            </div>
            <img src={post.imageUrl} alt={post.title} />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home