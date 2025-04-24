import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MatchHistory = () => {
    const { userName } = useSelector((state) => state.loggedUser);
    const [matchHistory, setMatchHistory] = useState([]);

    const fetchMatchHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/matches/history', {
                withCredentials: true,
            });
            if (response.data.success) {
                setMatchHistory(response.data.matchesHistoryData);
            }
        } catch (error) {
            console.log("Error in fetching Match history", error.message);
        }
    };

    useEffect(() => {
        fetchMatchHistory();
    }, []);

    return (
        <div className="bg-slate-800 text-white shadow-md rounded-lg p-6 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Match History</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900">
                        <th className="py-2 px-4 text-left text-gray-300">Opponent</th>
                        <th className="py-2 px-4 text-left text-gray-300">Result</th>
                        <th className="py-2 px-4 text-left text-gray-300">Duration</th>
                        <th className="py-2 px-4 text-left text-gray-300">Total Time</th>
                        <th className="py-2 px-4 text-left text-gray-300">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {matchHistory.map(match => {
                        const opponent = match.players.find(p => p.username !== userName);
                        return (
                            <tr key={match._id} className="border-b">
                                <td className="py-2 px-4">{opponent ? opponent.username : 'N/A'}</td>
                                <td className="py-2 px-4">{match.result}</td>
                                <td className="py-2 px-4">{match.duration} sec</td>
                                <td className="py-2 px-4">
                                    {match.totalTimeEachPlayer.player1} / {match.totalTimeEachPlayer.player2}
                                </td>
                                <td className="py-2 px-4">{new Date(match.createdAt).toLocaleDateString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MatchHistory;
