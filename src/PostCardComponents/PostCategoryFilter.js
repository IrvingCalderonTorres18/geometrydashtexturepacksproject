import React from 'react';

/**
 * Componente para filtrar un post según su categoría (adaptado para GraphQL).
 * @param {Object} props
 * @param {Object} props.post - El post completo que contiene las categorías.
 * @param {string} props.filterCategory - La categoría que se debe filtrar.
 * @param {React.Component} props.children - Los elementos a renderizar si el post pasa el filtro.
 */
const PostCategoryFilter = ({ post, filterCategory, children }) => {
    console.log("PostCategoryFilter post:", post);
    const categoryNames = post.categories?.nodes?.map(term => term.name);

    if (!categoryNames?.includes(filterCategory)) {
        return null;
    }

    return <>{children}</>;
};

export default PostCategoryFilter;
