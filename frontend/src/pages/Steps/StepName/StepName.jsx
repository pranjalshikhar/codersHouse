import React, { useState } from "react";
import styles from './StepName.module.css';
import Button from "../../../components/shared/Button/Button";
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import { useSelector, useDispatch } from "react-redux";
import { setName } from '../../../store/activateSlice';

const StepName = ({ onNext }) => {
    const {name} = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(name);
    function submit() {
        if(!fullName) return;
        dispatch(setName(fullName));
        onNext();
            
    }
    return (
        <div className={styles.cardWrapper}>
                <Card
                    title="What's your Full Name?"
                    icon="goggle-emoji"
                >
                    <TextInput
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        People use real names at codershouse :)
                    </p>
                </Card>
        </div>
    )
}

export default StepName