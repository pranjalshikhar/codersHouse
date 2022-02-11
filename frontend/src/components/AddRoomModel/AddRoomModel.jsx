import React, { useState } from "react";
import styles from './AddRoomModel.module.css';
import TextInput from '../shared/TextInput/TextInput';

const AddRoomModel = ({ onClose }) => {
    const [roomType, setRoomType] = useState('open');

    return (
        <div className={styles.modelMask}>
            <div className={styles.modelBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="Close" />
                </button>
                
                <div className={styles.modelHeader}>
                    <h3>Enter the topic to be disscussed</h3>
                    <TextInput fullwidth="true" />
                    <h2>Room Type</h2>
                    <div className={styles.roomType}>
                        <div onClick={() => setRoomType('open')} className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ''}`}>
                            <img src="/images/globe.png" alt="Open"/>
                            <span>Open</span>
                        </div>
                        <div onClick={() => setRoomType('social')} className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ''}`}>
                            <img src="/images/social.png" alt="Social"/>
                            <span>Social</span>
                        </div>
                        <div onClick={() => setRoomType('private')} className={`${styles.typeBox} ${roomType === 'private' ? styles.active : ''}`}>
                            <img src="/images/lock.png" alt="Private"/>
                            <span>Private</span>
                        </div>
                    </div>
                </div>

                <div className={styles.modelFooter}>
                    <h2>Start a room, open to everyone</h2>
                    <button  className={styles.footerButton}>
                        <img src="/images/celebration.png" alt="Let's Go" />
                        <span>Let's Go</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddRoomModel;