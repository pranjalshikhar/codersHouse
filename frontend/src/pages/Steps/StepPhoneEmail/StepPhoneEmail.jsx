import React, { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhoneEmail.module.css"

const PhoneEmailMap = {
    phone: Phone,
    email: Email,
}

const StepPhoneEmail = ({ onClick }) => {
    const [type, setType] = useState('phone');
    const Component = PhoneEmailMap[type];
    
    function onClick() {
        // setStep(type + 1)
    }

    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrap}>
                        <button className={`${styles.tabButton} ${type === 'phone' ? styles.active : ''}`} onClick={() => setType('phone')}>
                            <img src="/images/phone-white.png" alt="phone" />
                        </button>
                        <button className={`${styles.tabButton} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}>
                            <img src="/images/mail-white.png" alt="email" />
                        </button>
                    </div>
                    <Component onClick={onClick} />
                </div>
            </div>
        </>
    )
}

export default StepPhoneEmail