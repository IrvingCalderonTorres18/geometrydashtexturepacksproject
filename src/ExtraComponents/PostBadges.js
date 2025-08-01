import React from 'react';
import { differenceInHours, differenceInDays, parseISO } from 'date-fns';

const PostBadges = ({ postDate, dateModified }) => {
    const now = new Date();
    const parsedPostDate = parseISO(postDate);
    const parsedModifiedDate = dateModified ? parseISO(dateModified) : null;

    const isNew = differenceInDays(now, parsedPostDate) <= 1;
    const isNewUpdate = parsedModifiedDate && differenceInHours(now, parsedModifiedDate) < 24;

    // Prioriza el más reciente
    let showBadge = null;
    if (isNew && isNewUpdate) {
        showBadge = parsedModifiedDate > parsedPostDate ? 'UPDATE' : 'NEW';
    } else if (isNewUpdate) {
        showBadge = 'UPDATE';
    } else if (isNew) {
        showBadge = 'NEW';
    }

    return (
        <>
            {showBadge && (
                <div className="absolute top-2 left-2 newbg text-white text-xs font-bold py-1 px-2 rounded-md z-10 new-animation">
                    {showBadge}
                </div>
            )}
        </>
    );
};

export default PostBadges;
