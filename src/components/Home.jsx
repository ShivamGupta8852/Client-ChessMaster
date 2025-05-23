// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import chessImage from "../assets/Images/chessImage.png";
// import socket from "../utils/socket.jsx";
// import { useNavigate } from "react-router-dom";
// import WaitingOpponent from "./WaitingOpponent.jsx";
// import Swal from "sweetalert2";
import News from "./News.jsx";
import Footer from "./Footer.jsx";
import HeroSection from "./HeroSection.jsx";

const Home = () => {
  // const navigate = useNavigate();
  // const [waiting, setWaiting] = useState(false);
  // let userID = null;
  // // const userID = localStorage.getItem("userID") || uuidv4();
  // // localStorage.setItem("userID", userID);

  // useEffect(() => {
  //   socket.on("waiting", () => {
  //     setWaiting(true);
  //   });
  //   socket.on("startGame", (roomID) => {
  //     sessionStorage.setItem("userID",userID);
  //     setWaiting(false);
  //     navigate(`/game/${roomID}`);
  //   });

  //   return () => {
  //     socket.off("startGame");
  //     socket.off("waiting");
  //   };
  // }, []);

  // function handlePlayOnline() {
  //   setWaiting(true);
  //   userID = uuidv4();
  //   socket.emit("findOrCreateRoom", userID);
  // }

  // async function handleInviteFriend() {
  //   const { value: roomID } = await Swal.fire({
  //     title: "Input your Room",
  //     input: "text",
  //     inputPlaceholder: "Enter your room",
  //     showCancelButton: true,
  //     customClass: {
  //       title: "text-green-300",
  //       input:
  //         "border-1 border-slate-300 placeholder-white-500 text-white p-2 rounded focus:border-0",
  //       popup: "bg-gray-800",
  //       confirmButton:
  //         "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  //       cancelButton:
  //         "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
  //     },
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return "Need to enter some roomname!";
  //       }
  //     },
  //   });
  //   if (roomID) {
  //     setWaiting(true);
  //     userID = uuidv4();
  //     socket.emit("joinSpecificRoom", { roomID, userID });
  //   }
  // }

  return (
    <>
      <div className="pt-16 overflow-auto">
        <HeroSection/>
        {/* <div className="max-w-full min-h-[calc(100vh-4rem)] px-5 py-6 md:py-2 flex flex-col-reverse md:flex-row gap-4 bg-slate-900 text-white">
          <div>
            <img src={chessImage} alt="chessImage" />
          </div>
          {waiting ? (
            <WaitingOpponent setWaiting={setWaiting} userID={userID} />
          ) : (
            <div className="w-full flex flex-col gap-y-12 justify-center items-center my-20">
              <button
                onClick={handlePlayOnline}
                className="text-2xl shadow-md shadow-slate-500 w-4/5 md:w-1/2 font-semibold bg-slate-700 rounded-[10px] py-6"
              >
                Play Online
              </button>
              <button
                onClick={handleInviteFriend}
                className="text-2xl shadow-md shadow-slate-500 w-4/5 md:w-1/2 font-semibold bg-slate-700 rounded-[10px] py-6"
              >
                Invite friend
              </button>
            </div>
          )}
        </div> */}
        <News />
        <Footer />
      </div>
    </>
  );
};

export default Home;
