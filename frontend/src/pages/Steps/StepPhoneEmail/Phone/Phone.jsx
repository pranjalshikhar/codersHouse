import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from '../StepPhoneEmail.module.css';

const Phone = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    return (
        <div>
            <Card title="Enter your Phone Number" icon="phone">

                {/* <ReactPlaceholder type='text' ready={false} rows={1} color='#0000ffff'> */}
                <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                {/* </ReactPlaceholder>     */}

                <div>
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                    By entering your number, you're agreeing to our Terms of Service and Privacy Policy.
                    </p>
                </div>
                
            </Card>
        </div>
    )
}

export default Phone