import React, { useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import {
    format,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
    differenceInYears
} from 'date-fns';
import { enUS } from 'date-fns/locale';

const PostDate = ({ date }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000); // Actualiza cada 60 segundos

        return () => clearInterval(interval);
    }, []);

    if (!date) {
        console.log("Fecha no proporcionada.");
        return null;
    }

    const postDate = new Date(date);
    const minutesDiff = differenceInMinutes(now, postDate);
    const hoursDiff = differenceInHours(now, postDate);
    const daysDiff = differenceInDays(now, postDate);
    const weeksDiff = differenceInWeeks(now, postDate);
    const monthsDiff = differenceInMonths(now, postDate);
    const yearsDiff = differenceInYears(now, postDate);

    let timeAgo;
    if (minutesDiff < 1) {
        timeAgo = "now";
    } else if (minutesDiff < 60) {
        timeAgo = minutesDiff === 1 ? "1 minute ago" : `${minutesDiff} minutes ago`;
    } else if (hoursDiff < 24) {
        timeAgo = hoursDiff === 1 ? "1 hour ago" : `${hoursDiff} hours ago`;
    } else if (daysDiff < 7) {
        timeAgo = daysDiff === 1 ? "a day ago" : `${daysDiff} days ago`;
    } else if (weeksDiff < 5) {
        timeAgo = weeksDiff === 1 ? "a week ago" : `${weeksDiff} weeks ago`;
    } else if (monthsDiff < 12) {
        timeAgo = monthsDiff === 1 ? "a month ago" : `${monthsDiff} months ago`;
    } else {
        timeAgo = yearsDiff === 1 ? "a year ago" : `${yearsDiff} years ago`;
    }

    const formattedDate = format(postDate, "MMMM d, yyyy", { locale: enUS });

    return (
        <div className="flex items-center text-[#9CA3AF] text-sm mt-2">
            <UploadIcon className="w-5 h-5 mr-1 text-gray-400" />
            <span>{formattedDate} ({timeAgo})</span>
        </div>
    );
};

export default PostDate;
