# GIF-EXPERT-APP ([https://arakakiariel.github.io/react-gifexpertapp/](https://arakakiariel.github.io/react-gifexpertapp/))
- En esta sección del curso se creará una aplicación web que nos permita buscar GIF's 

## Contenido de la sección
- [useState](#useState)
- [Form, Input text y Estados (Componente)](#form-input-text-y-estados-componente)
- [Comunicación entre componentes](#comunicación-entre-componentes)
- [useEffect](#useeffect)
- [Custom Hooks](#custom-hooks)
- [Animaciones por CSS](#animaciones-por-css-animate)
- [Despliegue de aplicación web](#despliegue-de-aplicación-web)



## useState
- Es una función de react para crear estados dentro de nuestros componentes.

```js
    //En este caso creamos un estado "categories" que es un array
    const [categories, setCategories] = useState(['One Punch Man', 'Hunter x Hunter', 'One Piece', 'Hajime no Ippo']);
```
- En este caso el ````setCategories``` se utilizará para poder modificar nuestro estado ```categories```
- Ejemplo de uso: 
```js
//Nos creamos una funcion que agrega una categoría nueva por delante
const handleAddCategory = () => {
        setCategories(categories => ['Code Geass', ...categories]); //Así es como vamos a agregar nuevos elementos a nuestro array (IMPORTANTE)
    }
```
- Es importante entender el uso del callback para agregar otro elemento ya que cuando querramos enviar un estado a otro componente, sólo pasaremos el setEstado y podremos obtener el valor del estado de esta manera.

## Form, Input text y Estados (Componente)

### Form
- El elemento ```<form/>``` nos permite disparar un evento cuando realizamos un enter
- Dentro de un form puede haber uno o varios inputs y podremos utilizar el evento enter para realizar alguna función específica

### Input text y estados
- Podemos utilizar input text y modificar los estados con el valor dentro de nuestro input
```js
import React, {useState} from 'react'

//Componente de React que devuelve un input y a su vez un estado que almacena el texto ingresado.
export const AddCategory = () => {

    const [inputValue, setInputValue] = useState('');

    //Funcion que modifica el estado "inputValue" a medida que se va escribiendo sobre el input
    const handleInputChange = (e) =>{
        setInputValue(e.target.value); //e.target.value => Valor del texto extraído del input
    }

    const handleSubmit = (e)=>{
        e.preventDefault(); //Esto hace que no se refreshee la página cuando se realiza la acción
        console.log('submit hecho');
    }

    return (
        <form onSubmit={handleSubmit}>
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

```

## Comunicación entre componentes
- A los componentes de React se le pueden pasar tanto propiedades como funciones. De esta manera podremos modificar estados de componentes que llamen a otros componentes.
-Ejemplo:
```js
//Componente 1
import React, { useState } from "react";
import { AddCategory } from "./components/AddCategory";

const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Piece', 'Hajime no Ippo']); //nuestro estado categories
    return (
        <>
            <AddCategory setCategories={setCategories}/> 
        </>
    )
}
```
```js
//Componente 2
import React, {useState} from 'react'

export const AddCategory = ({setCategories}) => { //Importamos la funcion para modificar el array de categorias

    const [inputValue, setInputValue] = useState(''); //Estado que almacena el valor del input

    //Funcion que modifica el estado "inputValue" a medida que se va escribiendo sobre el input
    const handleInputChange = (e) =>{
        setInputValue(e.target.value); //e.target.value => Valor del texto extraído del input
    }

    //Funcion que guarda nuevo elemento en el estado categories del Componente 1 
    const handleSubmit = (e)=>{
        e.preventDefault(); //Esto hace que no se refreshee la página cuando se realiza la acción
        setCategories(categories => [inputValue, ...categories]); //Guardando valor en estado categories
        setInputValue(''); // Seteamos el valor del input devuelta en un string vacío
    }

    return (
        <form onSubmit={handleSubmit}>
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

```

## useEffect
- Es un hook que se utiliza para modificar el performance de tu componente 
- En esta sección se utilizará para que una función creada en un Componente sólo se ejecute una vez, ya que si no utilizamos el ```useEffect```, puede que generemos funciones que se iteren infinitamente rompiendo todo

```js
import React, {useEffect} from 'react'

export const UnComponente = () => {
    useEffect( () => {
        unaFuncion(); //Función que querramos ejecutar una sola vez
    }, [category]);//Este array, si está vacío sólo se ejecutará una vez, y se ejecutará nuevamente si le agregamos algún elemento (Por ejemplo en este caso si le mandamos "category" cada vez que se actualice dicho elemento se volverá a correr la funcion)

    const unaFuncion = () => {
        console.log("Solo quiero que lo muestre una vez");
    }

    //unaFuncion();  => Si ejecutamos la función acá, cada vez que se actualice nuestro componente va a llamar a "unaFuncion" y no es lo que queremos que pase
}
```
- A useEffect() se le van a enviar dos cosas:
    1. Un callback: Dentro del mismo vamos a indicar las funciones que se quieran ejecutar
    2. Un array: 
        - Si el array está vacío, las funciones dentro del callback sólo se ejecutarán 1 vez.
        - Le iremos agregando elementos al array en caso de que querramos que se vuelvan a ejecutar las funciones que se le pasen dichos elementos siempre que éstos sean modificados.


## Helpers
- Los helpers van a ser funciones que hacen cierto trabajo en específico, pueden recibir argumentos, lo procesan y hacen algún return 
- Clases que contiene una/varias funciones que devuelvan algo
- Suelen ir en la ruta "src/helpers"
Ejemplo:
```js
//getGifs.js
//En este caso exportamos una funcion que hace una llamada a un API y nos devuelve un array con objetos {id, title, url} referentes a gifs
export const getGifs = async (category) => {
  const apiKey = "wKeZ3oG4mz7cXDaH1EGAfcUtGygT5F68";
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURI(category)}&limit=10`; //El encodeURI cambia los espacios por +
  const resp = await fetch(apiUrl);
  const { data } = await resp.json();
  const gifs = data.map((gif) => {
    return {
      id: gif.id,
      title: gif.title,
      url: gif.images?.downsized_medium.url,
    };
  });
  return gifs;
};

```

## Custom Hooks
- Es una forma de extraer lógica de algún componente y que sea luego más sencillo de reutilizar.
- Suelen ir en la ruta "src/hooks"
- El estandar indica que el nombre de la clase empiece con "use" (Ej: useFetchGifs)

Ejemplo:
```js
//useFetchGifs.js
import { useEffect, useState } from "react"
import {getGifs} from '../helpers/getGifs'

export const useFetchGifs = (category) => {

    //Objeto que guarda un array con los gifs y un estado de loading = true
    const [state, setState] = useState({
        data: [],
        loading: true,
    });
    
    useEffect( () => {
        getGifs(category).then(async (imgs) =>{
                //Acá va a setear el loading en false y la info traida por getGifs en data
                setState({
                    data:imgs,
                    loading: false
                });
                
        }); //Utilizamos el then para que espere a la respuesta de la funcion y luego seteamos las imagenes
          
    }, [category]);
    

    return state
}
```
- En dicho ejemplo podemos ver que le sacamos carga al componente ```GifGrid``` para que sea más legible y en el hook useFetchGifs ejecutamos la función que trae la info de la API de GIPHY

## Animaciones por CSS [(ANIMATE)](https://animate.style/)
- Es una dependencia que se puede utilizar para darle animación CSS a los elementos
- La mejor forma de importarlo a nuestro proyecto es en el archivo index.html, dentro del tag <head> escribimos:
```html
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
```
Ejemplo:
```js
 <h2 className='animate__animated animate__bounce'>GifExpertApp</h2>
```

## Despliegue de aplicación web 
- Para poder desplegar nuestra aplicación, una vez terminado el proyecto le damos al siguiente comando en nuestra terminal
```terminal
$ npm run build
```
- Esto nos va a crear una carpeta build dentro de nuestro proyecto

### Despliegue de manera local [(LINK)](https://www.npmjs.com/package/http-server)
1. Se ejecuta el siguiente comando
``` terminal
$ npm install --global http-server
```