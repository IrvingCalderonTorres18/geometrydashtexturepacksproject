import React from 'react';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Authors = ({ authors_acf, authors }) => {
    // Usar authors_acf si está disponible, de lo contrario usar authors
    const authorData = authors_acf || authors;

    // Si no hay datos en ninguno de los campos, no renderizar nada
    if (!authorData) return null;

    // Separar los autores por comas y limpiar espacios
    const authorList = authorData.split(',').map(author => author.trim());

    return (
        <>
            {authorList.map((author, index) => (
                <span
                    key={index}
                    className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2"
                >
                    <PersonOutlinedIcon sx={{ fontSize: 16 }} />
                    {author}
                </span>
            ))}
        </>
    );
};

export default Authors;
