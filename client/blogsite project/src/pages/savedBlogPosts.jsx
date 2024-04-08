import  { useEffect, useState } from "react";

import axios from "axios";

const SavedBlogPosts = () => {
  
  const [savedPosts, setSavedPosts] = useState([]);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
       

    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/savedPosts/${userID}`
        );
        setSavedPosts(response.data.savedPosts);
        console.log(response.data.savedPosts)
      } catch (err) {
        console.log(err);
      }
    };

   
    fetchSavedPosts();
   
  }, []);

 
  

  return (
    <div>
      <h1>Postagens Salvas</h1>
      <ul>
        {savedPosts.map((post) => (
          <li key={post._id}>
            <div>
              <h2>{post.title}</h2>
             
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

export default SavedBlogPosts