import React from 'react';
import { Pagination, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';

const PaginationControls = ({ currentPage, totalPosts, postsPerPage, onPageChange, onInputChange, onInputSubmit, inputPage, pageError }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className="justify-center flex flex-col items-center mt-8 space-y-4">
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(totalPosts / postsPerPage)}
                    page={currentPage}
                    onChange={onPageChange}
                    shape="rounded"
                    color="primary"
                    size={isSmallScreen ? "small" : "large"}
                    showFirstButton
                    showLastButton
                    sx={{
                        "& .MuiPagination-ul": {
                            justifyContent: 'center',
                        },
                        "& .MuiPaginationItem-root": {
                            color: "white",
                            borderColor: "white",
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                        },
                        "& .MuiPaginationItem-icon": {
                            color: "white",
                        },
                    }}
                />
            </Stack>
            <TextField
                type="number"
                value={inputPage}
                onChange={onInputChange}
                onKeyDown={onInputSubmit}
                InputProps={{
                    inputProps: {
                        min: 1,
                        max: Math.ceil(totalPosts / postsPerPage),
                    },
                    style: { textAlign: 'center' },
                }}
                label="Go to"
                size="small"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                            borderColor: "white",
                        },
                        "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.7)",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                    },
                }}
            />
            {pageError && <p className="text-red-500">{pageError}</p>} {/* Mostrar mensaje de error */}
        </div>
    );
};

export default PaginationControls;