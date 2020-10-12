import React from 'react'

//Componente que genera el gif con su respectivo titulo
export const GifGridItem = ( {id,title,url} ) => {
    return (
        <div className='card'>
            <img src={url} alt={title} />
            <p>{title}</p>
        </div>
    )
}
