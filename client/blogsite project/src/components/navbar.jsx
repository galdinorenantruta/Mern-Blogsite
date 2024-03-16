
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate()

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/login");
  };
  return (
    <div className='navbar'>
        
        
        {!cookies.access_token ? (
        <><Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link></>
      ) : (<>
            <Link to='/'>Home</Link>
            <Link to='/create-post'>new Post</Link>
            <Link to='/my-post'>My Posts</Link>
            <button onClick={logout} > Logout </button></>
        
      )}
        
    </div>
  )
}

export default Navbar