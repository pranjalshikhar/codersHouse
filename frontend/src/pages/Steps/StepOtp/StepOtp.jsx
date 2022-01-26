import React from "react";
import Button from "../../../components/shared/Button/Button";

const StepOtp = ({ onClick }) => {
    return (
        <div>
            <Button onClick={onClick} text="OTP" />
        </div>
    )
}

export default StepOtp