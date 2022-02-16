import React, { useState } from "react";
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Room = () => {
    const { id: roomId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const { clients, provideRef } = useWebRTC(roomId, user);

    return (
        <div>
            <h1>All connected clients.</h1>
            {clients.map((client) => {
                return (
                    <div key={client.id}>
                        <audio ref={(instance) => provideRef(instance, client.id)} 
                            controls 
                            autoPlay >   
                        </audio>
                        <h4>{client.name}</h4>
                    </div>
                )
            })}
        </div>
    );
}

export default Room;