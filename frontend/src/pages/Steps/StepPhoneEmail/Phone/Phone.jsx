/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import toast, { Toaster } from 'react-hot-toast';
import inputStyle from "./Phone.module.css"


const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit() {
        if(!phoneNumber) {
            // alert("Phone is required");
            <Toaster />
            toast.error("Phone field is required!")
        }
            
        // server request
        const { data } = await sendOtp({phone: phoneNumber});
        console.log(data);
        dispatch(setOtp({phone: data.phone, hash: data.hash}));
        onNext();
    }

    return (
        <Card title="Enter you Phone Number" icon="phone">
            {/* <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            /> */}
            <input className={styles.partitioned} type="text" maxLength="10" value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}/>

            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                    {!phoneNumber && <Toaster/>}
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you're agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    )
}

export default Phone;