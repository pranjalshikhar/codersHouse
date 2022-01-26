import React from "react";
import Button from "../../../components/shared/Button/Button";

const StepName = ({ onClick }) => {
    return (
        <div>
            <Button onClick={onClick} text="Name" />
        </div>
    )
}

export default StepName