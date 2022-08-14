import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';


const Countries = () => {
    const [data, setData] = useState([])
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRadio] = useState("")
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

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
                {radios.map((continent) => (
                    <li>
                        <input
                            type="radio"
                            id={continent}
                            name='continentRadio'
                            checked={continent === selectedRadio}
                            onChange={(evt) => setSelectedRadio(evt.target.id)} />

                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}

            </ul>

            {/* boutton pour annuler la recherche si un continent est séléctionné et revenir a l'etat initial */}
            {selectedRadio && <button onClick={() => setSelectedRadio ("") }>Annuler la recherche</button>}

            <ul>
                {data
                    // .filter classe les pays par continent
                    .filter((country) => country.continents[0].includes(selectedRadio))
                    // .sort classe les pays du plus pleuplés au moins peuplés
                    .sort((a, b) => b.population - a.population)
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