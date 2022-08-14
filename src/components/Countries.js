import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';


const Countries = () => {
    const [data, setData] = useState([])
    const [rangeValue, setRangeValue] = useState(36);
    // Le useEffect se joue lorque le composant est monté
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data));
    }, [])


    return (
        <div className='countries'>
            <ul className='radio-container'>

                {/* input type="range" correspond a une barre de réglages */}
                <input type="range"
                    min="1" max="250"
                    defaultValue={rangeValue}
                    onChange={(evt) => setRangeValue(evt.target.value)}
                    />
            </ul>
            <ul>
                {data
                    // .slice correspond au nombre de drapeaux voulu
                    .slice(0, rangeValue)
                    .map((country, index) => (
                        <Card key={index} country={country} />
                    ))}
            </ul>
        </div>
    );
};

export default Countries;