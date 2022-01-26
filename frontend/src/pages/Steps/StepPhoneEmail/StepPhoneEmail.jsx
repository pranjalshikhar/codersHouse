import React from "react";
import Button from "../../../components/shared/Button/Button";


const StepPhoneEmail = ({ onClick }) => {
    return (
        <div>
            <Button onClick={onClick} text="Phone/Email" />                    
        </div>
    )
}

export default StepPhoneEmail