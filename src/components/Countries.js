import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

const Countries = () => {
    const [data, setData] = useState([])

    // Le useEffect se joue lorque le composant est monté
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data));
    }, [])


    return (
        <div className='countries'>
            <h1>Countries</h1>
            <ul>
                {data.map((country, index) => (
                    <Card key={index} country={country} />
                ))}
            </ul>
        </div>
    );
};

export default Countries;