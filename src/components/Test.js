import React, { useState } from "react";

function Test({setIsButtonPressed,  isButtonPressed}) {
    const [showPage, setShowPage] = useState(false);
    
    const handleButtonClick = () => {
        setShowPage(true);
        setIsButtonPressed(true);
        console.log(isButtonPressed)
        window.open("http://localhost:3000/exampage", "MyExam5056", "resizable=yes,status=0,toolbar=0,scrollbars=1");
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Open Page in New Window</button>
            {showPage && <div>Page is now open in a new window</div>}
        </div>
    );
}

export default Test;
