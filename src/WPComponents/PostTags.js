// PostTags.js
import React from 'react';
import { ReactComponent as TagIcon } from '../icons/tag.svg'; // Asegúrate de que la ruta sea correcta

const PostTags = ({ tags, embedded }) => {
    if (!tags?.length) {
        return null;
    }

    return (
        <div className="flex flex-wrap mt-3">
            {tags.map((tag, index) => (
                <span key={index} className="flex items-center tag-bg text-white text-xs font-semibold py-1 px-2 mr-2 mb-2 rounded">
                    <TagIcon className="w-4 h-4 mr-2" />
                    {tag.name}
                </span>
            ))}
        </div>
    );
};

export default PostTags;