import React from 'react'
import { GifGridItem } from './GifGridItem';
import { useFetchGifs } from '../hooks/useFetchGifs';

export const GifGrid = ({category}) => {

    // const [images, setImages] = useState([]);

    // useEffect( () => {
    //       getGifs(category).then(setImages); //Utilizamos el then para que espere a la respuesta de la funcion y luego seteamos las imagenes
    // }, [category]);

    const {data:images, loading} = useFetchGifs(category); //data:images lo que hace es que obtiene data y le cambia el nombre a la variable por images
    return (
        <>
            <h3><u>{category.toUpperCase()}</u></h3>
            {loading && <p className='animate__animated animate__flash'>Loading...</p> }
             <div className='card-grid'>
                    {
                        images.map((img) => (
                            <GifGridItem 
                                key={img.id}
                                { ...img }
                            />
                        ))
                    }
            </div> 
        </>
    )
}
