import React, { useState } from "react";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";

const steps = {
    1: StepName,
    2: StepAvatar,
}

const Activate = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];
    function onClick() {
        setStep(step + 1);
    }

    return (
        <div>
            <Step onClick={onClick} />
        </div>
    )
}

export default Activate