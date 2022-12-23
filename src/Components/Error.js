import React from 'react';

const Error = ({ tryAgain, errMsg }) => {
    return (
        <div className='error-main'>
            <div>
                <p>{errMsg}</p>
                <button onClick={tryAgain}>Try Again</button>
            </div>
        </div>
    )
};

export default Error;