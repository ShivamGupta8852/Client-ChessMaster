
// configured the routes in client side
import {createBrowserRouter} from 'react-router-dom';
import Chessboard from "../components/Chessboard.jsx";
import Home from "../components/Home.jsx";
import About from '../components/About.jsx';
import App from '../App.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';

const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children : [
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/about",
                element:<About/>,
            },
            {
                path:"/signup",
                element:<SignUp/>,
            },
            {
                path:"/login",
                element:<Login/>,
            },
            {
                path:"/game/:roomID",
                element: <Chessboard/>,
            }
        ]
  
    }
])

export default route;