import React from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";

const Email = () => {
    return (
        <div>
            <Card title="Enter your Email ID" icon="email-emoji">
                
                <div>
                    <Button text="Next" />
                </div>
                
            </Card>
        </div>
    )
}

export default Email