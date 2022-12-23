import React from 'react';
import loading from "../img/loading.gif";

const Loader = () => {
    return (
        <div className='loader'>
            <div>
                <img src={loading} alt="loading" />
            </div>
        </div>
    )
};

export default Loader;