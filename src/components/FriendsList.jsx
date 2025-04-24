import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/friends', {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setFriends(response.data);
                    setFilteredFriends(response.data);
                }
            } catch (error) {
                console.log("Error in Friend component and message:", error.message);
            }
        };
        fetchFriends();
    }, []);

    useEffect(() => {
        setFilteredFriends(
            friends.filter(friend => friend.username.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, friends]);

    const handleInvite = (friendId) => {
        // Emit invitation event using Socket.IO
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Friends List</h2>
            <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md shadow-sm"
            />
            <ul className="space-y-4">
                {filteredFriends.length > 0 && filteredFriends.map(friend => (
                    <li key={friend._id} className="flex items-center space-x-4 p-4 border-b border-gray-200">
                        <img src={friend.profileImage} alt={friend.username} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="text-lg font-medium">{friend.username}</div>
                            <button
                                onClick={() => handleInvite(friend._id)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Invite to Match
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
