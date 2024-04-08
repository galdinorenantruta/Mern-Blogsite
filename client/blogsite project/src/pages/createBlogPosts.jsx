import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


 const CreateBlogPosts = () => {
  const userID = window.localStorage.getItem("userID");
  
  const [blogPost, setBlogPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    date: Date.now(),
    user: userID

  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogPost({ ...blogPost, [name]: value });
  };

  

  

  const handleSubmit = async (event) => {
    console.log(blogPost)
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/posts",
        blogPost 
        
      );

      alert("Post Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label >Título</label>
        <input
          type="text"
          id="name"
          name="title"
          value={blogPost.title}
          onChange={handleChange}
        />
        <label >Postagem</label>
        <textarea
          id="description"
          name="content"
          value={blogPost.content}
          onChange={handleChange}
        ></textarea>
        
       
       
        <label >Imagem</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={blogPost.imageUrl}
          onChange={handleChange}
        />
        
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateBlogPosts