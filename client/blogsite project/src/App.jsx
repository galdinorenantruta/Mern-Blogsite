import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import './App.css'
import Home  from './pages/home';

import CreateBlogPosts from './pages/createBlogPosts'
import SavedBlogPosts from './pages/savedBlogPosts';
import Navbar from './components/navbar';
import Register from './pages/register';
import Login from './pages/login';






function App() {
  

  return (
    <div>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create-post' element={<CreateBlogPosts/>}/>
          <Route path='/my-posts' element={<SavedBlogPosts/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
