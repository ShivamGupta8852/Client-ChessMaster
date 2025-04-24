import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { calculateStars } from '../utils/constants'; // Ensure the function is properly exported

ChartJS.register(ArcElement, Tooltip, Legend);

const MatchStats = () => {
    const [matchData, setMatchData] = useState({
        rating: 1200, // Default rating
        wins: 0,
        losses: 0,
        draws: 0,
        totalMatches: 0,
        rank: 0, 
        totalPlayers: 0,
    });

    useEffect(() => {
        const fetchMatchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/matches/stats', {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setMatchData(response.data);
                }
            } catch (error) {
                console.log("Error in fetching Match Stats", error.message);
            }
        };
        fetchMatchStats();
    }, []);

    // Checking if all values are 0
    const hasValidData = matchData.wins || matchData.losses || matchData.draws;

    const data = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                data: [matchData.wins, matchData.losses, matchData.draws],
                backgroundColor: ['#4caf50', '#f44336', '#9e9e9e'],
            },
        ],
    };

    const stars = calculateStars(matchData.rating);

    return (
        <div className="bg-slate-800 text-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Match Statistics</h2>
            <div className="flex justify-center">
                <div className="w-72 h-72">
                    {hasValidData ? (
                        <Pie data={data} options={{ maintainAspectRatio: false }} />
                    ) : (
                        <div className="w-72 h-72 flex justify-center items-center rounded-full bg-gray-300">
                            <span className="text-gray-600">No data available</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Improved Stats Layout */}
            <div className="mt-6 flex flex-col items-center bg-slate-700 p-4 rounded-lg space-y-4">
                <div className="text-center">
                    <p className="text-lg font-bold tracking-wide">
                        Rating: <span className="text-green-400">{matchData.rating}</span>
                    </p>
                    <div className="flex justify-center mt-2">
                        {Array.from({ length: stars }, (_, index) => (
                            <FaStar key={index} className="text-yellow-400 w-6 h-6" />
                        ))}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="text-lg font-bold tracking-wide">
                        Rank: <span className="text-yellow-400">#{matchData.rank}</span> out of {matchData.totalPlayers}
                    </p>
                </div>
                <div className="text-center mt-4 bg-slate-600 p-4 rounded-lg">
                    <p className="text-lg font-semibold">
                        Total Matches: <span className="text-green-400">{matchData.totalMatches}</span>
                    </p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <p className="text-md font-medium">
                            Wins: <span className="text-green-500">{matchData.wins}</span>
                        </p>
                        <p className="text-md font-medium">
                            Losses: <span className="text-red-500">{matchData.losses}</span>
                        </p>
                        <p className="text-md font-medium">
                            Draws: <span className="text-gray-400">{matchData.draws}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchStats;
