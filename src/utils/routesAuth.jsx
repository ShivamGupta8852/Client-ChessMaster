import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Chessboard from "../components/Chessboard";
import { login, logout } from "../Redux-Store/slices/loggedUserSlice.jsx";
import axios from "axios";

// GameRoute: Checks if userID exists in sessionStorage before allowing access to the game route.
const GameRoute = () => {
    const userID = sessionStorage.getItem("userID");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userID) {
            navigate("/");
        }
    }, [userID, navigate])

    return <Chessboard />;
};

// PublicRoute: Redirects to dashboard if the user is logged in.
const PublicRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.loggedUser.isLoggedIn);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isLoggedIn){
            navigate("/dashboard");
        }
    })

    return children;
}

// ProtectedRoutes: Protects routes that require the user to be logged in.
const ProtectedRoutes = () => {
    const isLoggedIn = useSelector((state) => state.loggedUser.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateSession = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/user/validate-session', {
                withCredentials: true, 
            });

            if (!response.data.isValid) {
                dispatch(logout());
                navigate('/login');
            }
        } catch (error) {
            console.error('Session validation failed:', error.message);
            dispatch(logout());
            navigate('/login');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            validateSession();  // Validate the session when the user is logged in
        } else {
            navigate('/login');
        }
    });

    return isLoggedIn ? <Outlet /> : null;
}

// // ProtectedRoutes: Protects routes that require the user to be logged in.
// const ProtectedRoutes = () => {  
//     const [isLoading,setIsLoading] = useState(true);
//     const isLoggedIn = useSelector((state) => state.loggedUser.isLoggedIn);
//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const checkTokenValidity = async () => {
//         try {
//             const response = await axios.get("http://localhost:8001/api/user/verify-token",{
//                 withCredentials: true,   // to ensure that cookies are send with request
//             });
//             if(response.data.success){
//                 dispatch(login(true));
//             }
//             else{
//                 dispatch(login(false));
//                 navigate("/login");
//             }
//         } catch (error) {
//             dispatch(login(false));
//             console.log("error in token validation : ", error);
//         }
//         finally{
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         // if(!isLoggedIn){
//         //     navigate("/login");
//         // }
//         checkTokenValidity();
//     }, [isLoggedIn])

//     if(isLoading){
//         return <div className="mt-16">Loading...</div>
//     }

//     return <Outlet/>;
// }

export { ProtectedRoutes, GameRoute, PublicRoute };