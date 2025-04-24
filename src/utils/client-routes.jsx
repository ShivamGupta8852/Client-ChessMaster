// configured the routes in client side
import {createBrowserRouter, useNavigate} from 'react-router-dom';
import Chessboard from "../components/Chessboard.jsx";
import Home from "../components/Home.jsx";
import About from '../components/About.jsx';
import App from '../App.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Profile from '../components/Profile.jsx';
import {ProtectedRoutes,GameRoute,PublicRoute} from './routesAuth.jsx'
import EditProfile from '../components/EditProfile.jsx';
import PlaySection from '../components/PlaySection.jsx';

const route = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children : [
            {
                path:"",
                element:<Home/>,
            },
            {
                path:"about",
                element:<About/>,
            },
            {
                path:"play",
                element:<PlaySection/>,
            },
            {
                path:"signup",
                element:(
                    <PublicRoute>
                        <SignUp/>
                    </PublicRoute>
                ),
            },
            {
                path:"login",
                element:(
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                ),
            },
            {
                path:"game/:roomID",
                element: <GameRoute/>,
            },
            {
                element:<ProtectedRoutes/>,
                children:[
                    {
                        path:"dashboard",
                        element: <Dashboard/>,
                    },
                    {
                        path:"profile",
                        element: <Profile/>,
                    },
                    {
                        path:'edit-profile',
                        element:<EditProfile/>,
                    }
                ]
            },
        ]
  
    }
])

export default route;