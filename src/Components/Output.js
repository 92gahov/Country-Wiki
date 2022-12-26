import React from 'react';

const Output = ({ showMore,
    countries,
    singleCountry,
    displaySingleCountry }) => {

    const toThousands = (number) => {
        if (number === undefined) {
            return "-------------";
        } else {
            return number.toLocaleString('en-US');
        }
    };

    const haveInfo = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            return info;
        }
    };

    const getCurrency = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            const currency = Object.keys(info);
            if (currency.length === 1) {
                return currency;
            } else {
                return currency.join(', ');
            }
        }
    };

    const getCurrencyName = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            const currencyName = Object.values(info);
            if (currencyName.length === 1) {
                return currencyName[0].name;
            } else {
                let names = [];
                for (let i = 0; i < currencyName.length; i++) {
                    names.push(currencyName[i].name);
                }
                return names.join(', ');
            }
        }
    };

    const getCurrencySymbol = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            const currencySymbol = Object.values(info);
            if (currencySymbol.length === 1) {
                return currencySymbol[0].symbol;
            } else {
                let symbols = [];
                for (let i = 0; i < currencySymbol.length; i++) {
                    symbols.push(currencySymbol[i].symbol);
                }
                return symbols.join(', ');
            }
        }
    };

    const getLanguages = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            const languages = Object.values(info);
            if (languages.length === 1) {
                return languages;
            } else {
                return languages.join(', ');
            }
        }
    };

    const getCarSigns = (info) => {
        if (info == "") {
            return "-------------";
        } else {
            if (info.length === 1) {
                return info[0];
            } else {
                return info.join(', ');
            }
        }
    };

    const getCapital = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            const capital = Object.values(info);
            if (capital.length === 1) {
                return capital[0];
            } else {
                return capital.join(', ');
            }
        }
    };

    const getNativeName = (info) => {
        if (info === undefined) {
            return "-------------";
        } else {
            const nativeName = Object.values(info);
            return nativeName[0].official;
        }
    };

    return (
        <>
            {
                displaySingleCountry === false ? <section className='countries-output'>
                    {
                        countries.map((item, index) => {
                            return <div className='country' key={index}>
                                <div className='country-flag'>
                                    <img src={item.flags.png} alt={item.name} />
                                </div>
                                <div className='country-main-info'>
                                    <h2 style={{ textAlign: "center" }}>{item.name.common}</h2>
                                    <div className='underline'></div>
                                    <div className='country-info'>
                                        <h3>Official name:</h3>
                                        <p>{haveInfo(item.name.official)}</p>
                                        <h3>Capital:</h3>
                                        <p>{getCapital(item.capital)}</p>
                                        <h3>Region:</h3>
                                        <p>{haveInfo(item.region)}</p>
                                        <h3>Population:</h3>
                                        <p>{toThousands(item.population)}</p>
                                    </div>
                                    <div className='more-btn'>
                                        <button
                                            onClick={showMore}
                                            data-showmore={item.name.common}>MORE</button>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </section> : <section className='single-country-output'>
                    <div className='single-country'>
                        <div className='single-country-flag'>
                            <img src={singleCountry[0].flags.png} alt={singleCountry[0].name.common} />
                        </div>
                        <div className='single-country-info'>
                            <h2>{singleCountry[0].name.common}</h2>
                            <div className='underline'></div>
                            <h3>Official name:</h3>
                            <p>{haveInfo(singleCountry[0].name.official)}</p>
                            <h3>Native name:</h3>
                            <p>{getNativeName(singleCountry[0].name.nativeName)}</p>
                            <h3>Capital:</h3>
                            <p>{getCapital(singleCountry[0].capital)}</p>
                            <h3>Region:</h3>
                            <p>{haveInfo(singleCountry[0].region)}</p>
                            <h3>Subregion:</h3>
                            <p>{haveInfo(singleCountry[0].subregion)}</p>
                            <h3>Population:</h3>
                            <p>{toThousands(singleCountry[0].population)}</p>
                            <h3>Independent:</h3>
                            <p>{singleCountry[0].independent === true ? "Yes" : "No"}</p>
                            <h3>United Nations member:</h3>
                            <p>{singleCountry[0].unMember === true ? "Yes" : "No"}</p>
                            <h3>Currency:</h3>
                            <p>{getCurrency(singleCountry[0].currencies)}</p>
                            <h3>Currency name:</h3>
                            <p>{getCurrencyName(singleCountry[0].currencies)}</p>
                            <h3>Currency symbol:</h3>
                            <p>{getCurrencySymbol(singleCountry[0].currencies)}</p>
                            <h3>Languages:</h3>
                            <p>{getLanguages(singleCountry[0].languages)}</p>
                            <h3>Car sign:</h3>
                            <p>{getCarSigns(singleCountry[0].car.signs)}</p>
                            <h3>Driving side:</h3>
                            <p>{haveInfo(singleCountry[0].car.side)}</p>
                            <h3>Coat of arms:</h3>
                            {
                                singleCountry[0].coatOfArms.png === undefined ? <p>-------------</p> :
                                    <div className='coat-of-arms'>
                                        <img src={singleCountry[0].coatOfArms.png} alt={singleCountry[0].name.common} />
                                    </div>
                            }
                            <h3>Wikipedia:</h3>
                            <p><a href={`https://en.wikipedia.org/wiki/${singleCountry[0].name.common}`} rel="noreferrer" target="_blank">{singleCountry[0].name.common}</a></p>
                            <div className='map'>
                                <iframe title="myFrame" id="gmap_canvas" src={`https://maps.google.com/maps?q=${singleCountry[0].name.common}&t=&z=5&ie=UTF8&iwloc=&output=embed`}></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
};

export default Output;