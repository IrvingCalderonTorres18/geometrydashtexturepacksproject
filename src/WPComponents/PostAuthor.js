// components/WPComponents/PostAuthor.js
import React from 'react';

const PostAuthor = ({ author }) => {
    if (!author) return null;

    return (
        <h3 className="text-lg font-bold text-[#00FFFF] transition-colors duration-300 text-left">
            By {author}
        </h3>
    );
};

export default PostAuthor;
