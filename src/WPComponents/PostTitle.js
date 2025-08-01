// PostTitle.js
import React from 'react';

const PostTitle = ({ title }) => {
    console.log("PostTitle received title:", title);

    if (!title || typeof title !== "string" || title.trim() === "") {
        return (
            <h2 className="text-xl font-bold text-[#7DFF00] mt-3 transition-colors duration-300 text-left">
                (Sin título)
            </h2>
        );
    }

    return (
        <h2 className="text-xl font-bold text-[#7DFF00] mt-3 transition-colors duration-300 text-left">
            {title}
        </h2>
    );
};

export default PostTitle;