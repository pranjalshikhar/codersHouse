import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';

const StepAvatar = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/avatar.png');
    const dispatch = useDispatch();
    
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
            // console.log(reader.result);
        }
        // console.log(e);
    }


    function nextStep() {
        onNext();
    }
    return (
        <>
            <Card title={`Okay, ${name}`} icon="monkey-emoji">
                <p className={styles.subHeading}>How’s this photo?</p>
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        onChange={captureImage}
                        id="avatarInput"
                        type="file"
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose a different photo
                    </label>
                </div>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
            </Card>
        </>
    )
}

export default StepAvatar