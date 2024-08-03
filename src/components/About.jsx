import { FaChess, FaRegStar, FaEnvelope } from "react-icons/fa";
import chessImage from "../assets/Images/chessImage.png";

const About = () => {
  return (
    <div className="bg-slate-900 flex flex-col items-center pt-16 ">
      <h1 className="text-[1.7rem] md:text-3xl mt-3  font-semibold text-green-300 mb-8 text-center">
        About Chess Master
      </h1>

      {/* welcome */}
      {/* max-w-4xl w-full bg-slate-900 p-6 rounded-lg shadow-lg */}
      <div className="w-[90%] md:w-[80%]  px-3 md:px-5 bg-slate-800 py-4 rounded-lg shadow-xl shadow-slate-800">
        <div>
          <p className="text-white text-lg mb-4">
            Welcome to{" "}
            <span className="font-semibold text-green-300">Chess Master</span>, the
            ultimate online chess experience! Whether you're a seasoned
            grandmaster or just starting, Chess Master provides an engaging and
            challenging environment for all skill levels.
          </p>
          <div className="w-full my-3">
            <img src={chessImage} className="w-72 mx-auto" alt="chessImage" />
          </div>
        </div>

        {/* features */}

        <div>
          <h2 className="text-2xl text-green-300 font-semibold mb-4 flex items-center">
            <FaChess className="mr-2" />
            Features
          </h2>
          <ul className="list-disc list-inside text-white mb-4 space-y-2">
            <li>Play online with friends or challenge players worldwide.</li>
            <li>Real-time multiplayer games with seamless synchronization.</li>
            <li>Advanced AI to challenge players in single-player mode.</li>
            <li>Customizable settings, including different game timers.</li>
            <li>Move undo and redo functionality for in-depth analysis.</li>
            <li>Detailed statistics and leaderboard to track your progress.</li>
            <li>Voice command moves and move display features.</li>
            <li>Responsive design for a seamless experience on any device.</li>
          </ul>
        </div>

        {/* mission */}
        <div>
          <h2 className="text-2xl text-green-300 font-semibold mb-4 flex items-center">
            <FaRegStar className="mr-2" />
            Our Mission
          </h2>
          <p className="text-white mb-4">
            Our mission is to make chess accessible and enjoyable for everyone.
            We strive to provide a platform where players can learn, compete,
            and connect with others who share their passion for the game.
            Whether you're looking to hone your skills, have a casual game with
            friends, or compete in serious matches, Chess Master is here for
            you.
          </p>
        </div>

        {/* contact us  */}
        <div>
          <h2 className="text-2xl text-green-300 font-semibold mb-4 flex items-center">
            <FaEnvelope className="mr-2" />
            Contact Us
          </h2>
          <p className="text-white mb-4">
            Have questions, feedback, or suggestions? We'd love to hear from
            you! Reach out to us at{" "}
            <a
              href="mailto:bittuathome1599@gmail.com"
              className="text-green-300 underline"
            >
              support@chessmaster.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
