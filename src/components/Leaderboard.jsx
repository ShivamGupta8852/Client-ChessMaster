import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const { userName } = useSelector((state) => state.loggedUser);

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/user/leaderboard', {
                withCredentials: true,
            });
            if (response.data.success) {
                setLeaderboard(response.data.leaderboardData);
            }
        } catch (error) {
            console.log("Error in fetching leaderboard Data", error.message);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="bg-slate-800 text-white rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
            <div className="max-h-96 overflow-y-auto"> {/* Scrollable area */}
                <ul className="space-y-4">
                    {leaderboard.map((player, index) => (
                        <li
                            key={player._id}
                            className={`flex items-center space-x-4 p-4 border-b border-none ${
                                player.username === userName ? 'bg-slate-900 border-none ' : ''
                            } shadow-md shadow-slate-900 hover:bg-slate-700 rounded-lg transition duration-200`}
                        >
                            {player.profileImage ? (
                                <img
                                    src={player.profileImage}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center text-xl font-semibold">
                                    {player.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1">
                                <div className={`text-lg font-medium ${player.username === userName ? 'text-yellow-600' : ''}`}>
                                    {index + 1}. {player.username}
                                </div>
                                <div className="flex flex-col sm:flex-row text-gray-400">
                                    <div className="sm:mr-4">Rating: {player.rating}</div>
                                    <div className="sm:ml-4 mt-2 sm:mt-0">
                                        W/L/D: {player.winCount}/{player.lossCount}/{player.drawCount}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;
