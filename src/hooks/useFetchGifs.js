import { useEffect, useState } from "react"
import {getGifs} from '../helpers/getGifs'
import {getRandomGif} from '../helpers/getRandomGif'

export const useFetchGifs = (category) => {
    const [state, setState] = useState({
        data: [],
        loading: true,
    });
    
    useEffect( () => {
        if(category !== 'RANDOM GIF'){
            
            setTimeout(() => {
                getGifs(category).then(async (imgs) =>{                        
                    setState({
                        data:imgs,
                        loading: false
                    });
                }); //Utilizamos el then para que espere a la respuesta de la funcion y luego seteamos las imagenes
            } ,1000);
        }else{
            setTimeout(() => {
                getRandomGif().then((img) => {
                    console.log('RANDOM GIF: ', img)
                    setState({
                        data:img,
                        loading: false
                    });
                });
            },1000);
            
        }  
    }, [category]);
    

    return state
}