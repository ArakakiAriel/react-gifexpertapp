import React, {useState} from 'react'
import PropTypes from "prop-types";

export const AddCategory = ({setCategories}) => { //Importamos la funcion para modificar el array de categorias

    const [inputValue, setInputValue] = useState('');

    //Funcion que modifica el estado "inputValue" a medida que se va escribiendo sobre el input
    const handleInputChange = (e) =>{
        setInputValue(e.target.value); //e.target.value => Valor del texto extraído del input
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); //Esto hace que no se refreshee la página cuando se realiza la acción
        if(inputValue.trim().length > 2){
            setCategories(categories => [inputValue, ...categories]); //Importando 
            setInputValue(''); // Seteamos el valor del input devuelta en un string vacío
        }
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input 
                type='text'
                className='i-add-category'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Ingrese una categoría'
                
            />
        </form>
    );
}

AddCategory.propTypes = {
    setCategories: PropTypes.func.isRequired,
  };