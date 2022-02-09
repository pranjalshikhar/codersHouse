import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http/index';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';
import { useEffect } from 'react';

const StepAvatar = ({ onNext }) => {
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/avatar.png');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    
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


    async function submit() {
        if(!name || !avatar) return;
        setLoading(true)
        try {
            const { data } = await activate({ name, avatar });
            console.log(data);
            if(data.auth) {
                // check
                if(!mounted) {
                    dispatch(setAuth(data));
                }
            }
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            setMounted(true);
        }
    }, []);

    if(loading) return <Loader message={'Activation in progress...'}/>
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
                    <Button onClick={submit} text="Next" />
                </div>
            </Card>
        </>
    )
}

export default StepAvatar