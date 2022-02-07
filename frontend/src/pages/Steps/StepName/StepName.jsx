import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';

const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    
    const [fullname, setFullname] = useState(name);
    const dispatch = useDispatch();

    function nextStep() {
        if (!fullname) {
            return;
        }
        dispatch(setName(fullname));
        onNext();
    }
    return (
        <div className={styles.cardWrapper}>
                <Card
                    title="What's your Full Name?"
                    icon="goggle-emoji"
                >
                    <TextInput
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={nextStep} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        People use real names at codershouse.
                    </p>
                </Card>
        </div>
    )
}

export default StepName