import React from "react";
import Button from "../../../components/shared/Button/Button";

const StepUserName = ({ onClick }) => {
    return (
        <div>
            <Button onClick={onClick} text="User Name" />
        </div>
    )
}

export default StepUserName