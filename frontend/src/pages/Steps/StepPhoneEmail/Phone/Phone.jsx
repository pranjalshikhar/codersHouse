import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';

const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    async function submit() {
        // server request
        const {res} = await sendOtp();
        console.log(res);
        // onNext();
    }

    return (
        <Card title="Enter you Phone Number" icon="phone">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you're agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone