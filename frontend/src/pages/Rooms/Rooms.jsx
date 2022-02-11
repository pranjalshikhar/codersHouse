import React, { useState, useEffect } from "react";
import AddRoomModel from "../../components/AddRoomModel/AddRoomModel";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from './Rooms.module.css';
import { getAllRooms } from "../../http";

// const rooms = [
//     {
//         id: 1,
//         topic: 'Which Framework is best for Frontend?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//         ],
//         totalPeople: 40
//     },
//     {
//         id: 2,
//         topic: 'Which Framework is best for Frontend?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//         ],
//         totalPeople: 40
//     },
//     {
//         id: 3,
//         topic: 'Which Framework is best for Frontend?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//         ],
//         totalPeople: 40
//     },
//     {
//         id: 4,
//         topic: 'Which Framework is best for Frontend?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//         ],
//         totalPeople: 40
//     },
// ]

const Rooms = () => {
    const [showModel, setShowModel] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms  = async () => {
            const { data } = await getAllRooms();
            setRooms(data); 
        };
        fetchRooms();
    }, []);
    

    function openModel() {
        setShowModel(true);
    }
    return (
        <>
            <div className="container">
                <div className={styles.roomsHeader}>
                    <div className={styles.left}>
                        <span className={styles.heading}>All Voice Rooms</span>
                        <div className={styles.searchBox}>
                            <img src="/images/search-icon.png" alt="Search"/>
                            <input type="text" className={styles.searchInput} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={openModel} className={styles.startRoomButton}>
                            <img src="/images/add-room-icon.png" alt="Start a Room"/>
                            <span>Start a room</span>
                        </button>
                    </div>
                </div>

                <div className={styles.roomList}>
                    {
                        rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))
                    }
                </div>
            </div>
            {showModel && <AddRoomModel onClose={() => setShowModel(false)} />}
        </>
    )
}

export default Rooms