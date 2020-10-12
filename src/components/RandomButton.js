import React from 'react'
import PropTypes from "prop-types";

export const RandomButton = ({setCategories}) => {

    const randomGif = () => {
        const category = 'RANDOM GIF';
        setCategories(categories => [category, ...categories]); //Importando 
    }


    return (
        <>
            <button className='random-button' onClick={randomGif}>RANDOM GIF</button>
        </>
    )
}

RandomButton.propTypes = {
    setCategories: PropTypes.func.isRequired,
  };