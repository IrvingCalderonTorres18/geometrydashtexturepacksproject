// Rating.js
import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

const CustomRating = ({ value }) => {
    const ratingValue = parseFloat(value) || 0;

    const getRatingColor = (isHovered) => {
        if (ratingValue === 6) return isHovered ? 'url(#blueGradientHover)' : 'url(#blueGradient)';
        if (ratingValue === 7) return isHovered ? 'url(#pinkGradientHover)' : 'url(#pinkGradient)';
        return isHovered ? 'url(#goldGradientHover)' : 'url(#goldGradient)';
    };

    const getRatingShadow = (isHovered) => {
        if (ratingValue === 6) {
            return isHovered
                ? 'drop-shadow(0px 0px 6px #00caff)'
                : 'drop-shadow(0px 0px 3px #00AAFF)';
        }
        if (ratingValue === 7) {
            return isHovered
                ? 'drop-shadow(0px 0px 6px #ff00cc)'
                : 'drop-shadow(0px 0px 3px #FF66CC)';
        }
        return isHovered
            ? 'drop-shadow(0px 0px 6px #FFD700)'
            : 'drop-shadow(0px 0px 3px #FFD700)';
    };

    return (
        <>
            <div className="mt-2 flex items-center">
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Rating
                        name="read-only"
                        value={Math.min(ratingValue, 5)}
                        readOnly
                        precision={0.5}
                        icon={<GradeRoundedIcon fontSize="inherit" />}
                        emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
                        sx={{
                            '& .MuiRating-iconFilled svg path': {
                                transition: 'fill 0.3s ease-in-out, filter 0.3s ease-in-out',
                                fill: getRatingColor(false),
                            },
                            '& .MuiRating-iconFilled': {
                                filter: getRatingShadow(false),
                                transition: 'filter 0.3s ease-in-out',
                            },
                            '& .MuiRating-iconEmpty svg': {
                                color: '#fea703',
                            },
                            '.group:hover & .MuiRating-iconFilled svg path': {
                                fill: getRatingColor(true),
                            },
                            '.group:hover & .MuiRating-iconFilled': {
                                filter: getRatingShadow(true),
                            },
                        }}
                    />
                </Stack>

                {ratingValue === 6 && (
                    <GradeRoundedIcon
                        fontSize="medium"
                        sx={{
                            fill: getRatingColor(false),
                            filter: getRatingShadow(false),
                            transition: 'fill 0.3s ease-in-out, filter 0.3s ease-in-out',
                            '.group:hover &': {
                                fill: getRatingColor(true),
                                filter: getRatingShadow(true),
                            },
                        }}
                    />
                )}
                {ratingValue === 7 && (
                    <>
                        <GradeRoundedIcon
                            fontSize="medium"
                            sx={{
                                fill: getRatingColor(false),
                                filter: getRatingShadow(false),
                                transition: 'fill 0.3s ease-in-out, filter 0.3s ease-in-out',
                                '.group:hover &': {
                                    fill: getRatingColor(true),
                                    filter: getRatingShadow(true),
                                },
                            }}
                        />
                        <GradeRoundedIcon
                            fontSize="medium"
                            sx={{
                                fill: getRatingColor(false),
                                filter: getRatingShadow(false),
                                transition: 'fill 0.3s ease-in-out, filter 0.3s ease-in-out',
                                '.group:hover &': {
                                    fill: getRatingColor(true),
                                    filter: getRatingShadow(true),
                                },
                            }}
                        />
                    </>
                )}
            </div>

            {/* SVG para los degradados */}
            <svg style={{ height: 0, width: 0, position: 'absolute' }}>
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FEF42D' }} />
                        <stop offset="50%" style={{ stopColor: '#FEA703' }} />
                        <stop offset="100%" style={{ stopColor: '#D48806' }} />
                    </linearGradient>
                    <linearGradient id="goldGradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#FFFA80' }} />
                        <stop offset="50%" style={{ stopColor: '#FFD700' }} />
                        <stop offset="100%" style={{ stopColor: '#FFA500' }} />
                    </linearGradient>

                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#1FA2FF' }} />
                        <stop offset="50%" style={{ stopColor: '#12D8FA' }} />
                        <stop offset="100%" style={{ stopColor: '#A6FFCB' }} />
                    </linearGradient>
                    <linearGradient id="blueGradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#0095FF' }} />
                        <stop offset="50%" style={{ stopColor: '#37E4FF' }} />
                        <stop offset="100%" style={{ stopColor: '#40FF8F' }} />
                    </linearGradient>

                    <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ff006c' }} />
                        <stop offset="50%" style={{ stopColor: '#ff00cc' }} />
                        <stop offset="100%" style={{ stopColor: '#7e22ff' }} />
                    </linearGradient>
                    <linearGradient id="pinkGradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ff4e99' }} />
                        <stop offset="50%" style={{ stopColor: '#eb32ff' }} />
                        <stop offset="100%" style={{ stopColor: '#ff00cc' }} />
                    </linearGradient>
                </defs>
            </svg>
        </>
    );
};

export default CustomRating;
