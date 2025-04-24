// import React from 'react';
// import Leaderboard from './Leaderboard';
// import MatchStats from './MatchStats';
// import MatchHistory from './MatchHistory';
// import FriendsList from './FriendsList';
// import { useSelector } from 'react-redux';
// import { FaHandsClapping } from "react-icons/fa6";

// const Dashboard = () => {
//     const { profileImage, userName } = useSelector((state) => state.loggedUser);

//     return (
//         <div className="min-h-screen bg-slate-900 px-6 pb-6 pt-16">
//             {/* Header */}
//             <header className="bg-slate-800 shadow-md rounded-lg p-6 mt-4 mb-8 flex items-center space-x-4">
//                 {profileImage ? (
//                     <img
//                         src={profileImage}
//                         alt="Profile"
//                         className="w-12 h-12 rounded-full cursor-pointer"
//                     />
//                 ) : (
//                     <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center text-xl font-semibold cursor-pointer">
//                         {userName.charAt(0).toUpperCase()}
//                     </div>
//                 )}
//                 <div>
//                     <h1 className="text-2xl font-bold text-white">Welcome, {userName}!</h1>
//                     <p className="text-gray-400">Here’s your dashboard overview.</p>
//                 </div>
//             </header>

//             {/* Main Content */}
//             <div className="flex flex-col items-center space-y-8">
//                 {/* Centered Leaderboard */}
//                 <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-lg">
//                     <Leaderboard />
//                 </div>

//                 {/* Remaining Components */}
//                 <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-lg">
//                     <MatchStats />
//                 </div>
//                 <div className="w-full max-w-4xl bg-slate-800  rounded-lg shadow-lg">
//                     <MatchHistory />
//                 </div>
//                 {/* <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-lg">
//                     <FriendsList />
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState } from 'react';
import Leaderboard from './Leaderboard';
import MatchStats from './MatchStats';
import MatchHistory from './MatchHistory';
import { useSelector } from 'react-redux';
import { FaChartBar, FaTrophy, FaHistory, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const { profileImage, userName } = useSelector((state) => state.loggedUser);
    const [selectedSection, setSelectedSection] = useState('stats');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const renderSection = () => {
        switch (selectedSection) {
            case 'leaderboard':
                return <Leaderboard />;
            case 'history':
                return <MatchHistory />;
            case 'stats':
            default:
                return (
                    <>
                        <div className="mb-6 text-white text-xl font-semibold">
                            👋 Welcome back, {userName}!
                        </div>
                        <MatchStats />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-16">
            {/* Sidebar Toggle Button (Mobile) */}
            <div className={`absolute top-20 md:hidden z-50 transition-all duration-300`}
                style={{
                    left: sidebarOpen ? '55%' : '.4rem',
                }}
            >
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white text-2xl"
                >
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar - Fixed */}
            <aside
                className={`fixed top-0 left-0 h-full mt-16   w-64 bg-slate-800 p-6 z-40 transform transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                {/* Profile Section */}
                <div className="flex items-center space-x-4 mb-8 ">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center text-xl font-semibold">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h1 className="text-white font-bold text-lg">{userName}</h1>
                        <p className="text-gray-400 text-sm">Your dashboard</p>
                    </div>
                </div>

                {/* Navigation */}
                <button
                    onClick={() => setSelectedSection('stats')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-slate-700 transition ${
                        selectedSection === 'stats' ? 'bg-sky-600' : ''
                    }`}
                >
                    <FaChartBar />
                    Dashboard Stats
                </button>
                <button
                    onClick={() => setSelectedSection('leaderboard')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-slate-700 transition ${
                        selectedSection === 'leaderboard' ? 'bg-sky-600' : ''
                    }`}
                >
                    <FaTrophy />
                    Leaderboard
                </button>
                <button
                    onClick={() => setSelectedSection('history')}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-slate-700 transition ${
                        selectedSection === 'history' ? 'bg-sky-600' : ''
                    }`}
                >
                    <FaHistory />
                    Match History
                </button>
            </aside>

            {/* Main Content */}
            <main
                className="ml-0 md:ml-64 p-6 md:pl-10 pr-4 overflow-auto max-h-[calc(100vh-4rem)]"
            >
                <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;


