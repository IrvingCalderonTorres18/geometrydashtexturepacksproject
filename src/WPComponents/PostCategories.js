import React from 'react';
import { ReactComponent as GraphicsIcon } from '../icons/graphics.svg';

const PostCategories = ({ categories }) => {
    // GraphQL: categories es un objeto con .nodes (array de categorías)
    const categoryNodes = Array.isArray(categories?.nodes) ? categories.nodes : [];
    if (!categoryNodes.length) return null;

    // Busca la categoría con slug 'tops' de forma segura
    let categoryToShow = null;
    for (let i = 0; i < categoryNodes.length; i++) {
        const cat = categoryNodes[i];
        if (cat && typeof cat.slug === 'string' && cat.slug.toLowerCase() === 'tops') {
            categoryToShow = cat;
            break;
        }
    }
    // Si no existe 'tops', toma la primera disponible
    if (!categoryToShow) categoryToShow = categoryNodes[0];
    if (!categoryToShow) return null;

    return (
        <div className="flex mt-2 items-center">
            <GraphicsIcon className="w-5 h-5 mr-2" />
            <span className="text-white text-left text-lg font-semibold">{categoryToShow.name}</span>
        </div>
    );
};

export default PostCategories;
