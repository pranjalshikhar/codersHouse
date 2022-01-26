import React from "react";
import Button from "../../../components/shared/Button/Button";

const StepAvatar = ({ onClick }) => {
    return (
        <div>
            <Button onClick={onClick} text="Avatar" />
        </div>
    )
}

export default StepAvatar