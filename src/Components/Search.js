import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Output from './Output';
import Loader from './Loader';
import Error from './Error';

const Search = () => {

    const nameUrl = process.env.REACT_APP_NAME;
    const regionUrl = process.env.REACT_APP_REGION;

    const [searchValue, setSearchValue] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [singleCountry, setSingleCountry] = useState([]);
    const [displaySingleCountry, setDisplaySingleCountry] = useState(false);


    const getRegionCountries = (e) => {
        setLoading(true);
        const region = e.target.dataset.regionbtn;
        axios.get(`${regionUrl}/${region}`)
            .then((response) => {
                response.data.sort((a, b) => {
                    if (a.name.common > b.name.common) {
                        return 1;
                    }
                    if (b.name.common > a.name.common) {
                        return -1
                    }
                    return 0;
                })
                setCountries(response.data);
                setDisplaySingleCountry(false);
                setLoading(false);
            })
            .catch((error) => {
                if (error) {
                    setErr(true);
                    setErrMsg("Something went wrong. Please, try again.");
                }
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (searchValue === "") {
            alert("Please, fill out the field!");
            setLoading(false);
            return false;
        } else {
            axios.get(`${nameUrl}/${searchValue}`)
                .then((response) => {
                    setCountries(response.data);
                    setDisplaySingleCountry(false);
                    setLoading(false);
                    setSearchValue("");
                })
                .catch((error) => {
                    if (error) {
                        setErr(true);
                        setErrMsg("Something went wrong. Make sure the name is correct and try again.");
                    }
                })
        }
    };

    const showMore = (e) => {
        const more = e.target.dataset.showmore;
        if (more === undefined) {
            return false;
        } else {
            setLoading(true);
            axios.get(`${nameUrl}/${more}?fullText=true`)
                .then((response) => {
                    setSingleCountry(response.data);
                    setDisplaySingleCountry(true);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error) {
                        setErr(true);
                        setErrMsg("Something went wrong. Please, try again.");
                    }
                })
        }
    };

    useEffect(() => {
        axios.get(`${regionUrl}/europe`)
            .then((response) => {
                response.data.sort((a, b) => {
                    if (a.name.common > b.name.common) {
                        return 1;
                    }
                    if (b.name.common > a.name.common) {
                        return -1
                    }
                    return 0;
                })
                const firstFour = response.data.slice(0, 4)
                setCountries(firstFour);
                setDisplaySingleCountry(false);
                setLoading(false);
            })
            .catch((error) => {
                if (error) {
                    setErr(true);
                    setErrMsg("Something went wrong. Please, try again.");
                }
            })
    }, []);

    const tryAgain = () => {
        window.location.reload();
    };

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <section className='main-search'>
                            <div className='regions-btns'>
                                <div>
                                    <button
                                        onClick={getRegionCountries}
                                        data-regionbtn="africa">Africa</button>
                                </div>
                                <div>
                                    <button
                                        onClick={getRegionCountries}
                                        data-regionbtn="americas">Americas</button>
                                </div>
                                <div>
                                    <button
                                        onClick={getRegionCountries}
                                        data-regionbtn="asia">Asia</button>
                                </div>
                                <div>
                                    <button
                                        onClick={getRegionCountries}
                                        data-regionbtn="europe">Europe</button>
                                </div>
                                <div>
                                    <button
                                        onClick={getRegionCountries}
                                        data-regionbtn="oceania">Oceania</button>
                                </div>
                            </div>
                            <div className='search-field'>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <input type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)} />
                                        <button type='submit'><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <Output
                            showMore={showMore}
                            countries={countries}
                            singleCountry={singleCountry}
                            displaySingleCountry={displaySingleCountry} />
                    </>
            }
            {
                err && <Error
                    tryAgain={tryAgain}
                    errMsg={errMsg} />
            }
        </>
    )
};

export default Search;