import React from 'react';
import PostBadges from '../ExtraComponents/PostBadges';

const PostFeaturedMedia = ({ image, title, postDate, dateModified, alt }) => {
    if (!image) return null;

    return (
        <div className="relative w-full aspect-w-16 aspect-h-9">
            <PostBadges postDate={postDate} dateModified={dateModified} />
            <img
                src={image}
                alt={alt || title || ""}
                className="w-full h-full object-cover rounded-lg"
            />
        </div>
    );
};

export default PostFeaturedMedia;
