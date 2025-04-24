import { Link } from "react-router-dom";
import chessImage from "../assets/Images/chessImage.png";

const HeroSection = () => {
  return (
    <section className="bg-slate-900 text-white py-4 flex items-center justify-center">
      <div className="mx-auto flex flex-col md:flex-row items-center px-6">
        <div className="w-full  mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Master the Game of Chess
          </h1>
          <p className="text-lg mb-6">
            Join now and challenge players from around the world. Whether you are a beginner or a grandmaster, 
            experience the thrill of chess with our advanced platform.
          </p>
          <div>
            <Link to={'play'} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Play Now
            </Link>
            <Link to={'about'} className="bg-transparent border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-semibold py-2 px-4 rounded-lg ml-4 transition duration-300">
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <img src={chessImage} alt="Chess" className="w-full h-auto max-w-md rounded-lg shadow-lg"/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
