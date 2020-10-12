import React, { useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { GifGrid } from "./components/GifGrid";
import { RandomButton } from "./components/RandomButton";

const GifExpertApp = () => {

    const [categories, setCategories] = useState(['One Piece']);
    return (
        <>
            <h1 className='title animate__animated animate__bounce'>GifExpertApp</h1>
            <div className='input-plus-button'>
                <AddCategory setCategories={setCategories}/> 
                <RandomButton setCategories={setCategories}/>
            </div>
            
            <hr></hr>
            <ol>
                {
                    categories.map((category, index) => (
                        <GifGrid 
                            key={ category !== 'RANDOM GIF'? category : categories.length - index }
                            category={category}
                        />
                    ))
                }
            </ol>
        </>
    )
}

export default GifExpertApp
