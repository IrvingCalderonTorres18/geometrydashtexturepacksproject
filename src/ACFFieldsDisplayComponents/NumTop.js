import React from 'react';
import { ReactComponent as HashtagIcon } from '../icons/hashtag.svg';

const NumTop = ({ numtop }) => {
    if (!numtop) return null;

    return (
        <span className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2">
            <HashtagIcon className="w-3 h-3 mr-1" />
            {numtop}
        </span>
    );
};

export default NumTop;
