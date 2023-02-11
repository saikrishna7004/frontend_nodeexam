import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamPage = ({ isButtonPressed }) => {
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        axios.post('/api/hello')
            .then(res => {
                setShowPage(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {!isButtonPressed && <div>
                {showPage ? (
                    <div>
                        Hi
                    </div>
                ) : (
                    <div>
                        Loading...
                    </div>
                )}
            </div>}
        </>
    );
};

export default ExamPage;
