import React from 'react';
import { ReactComponent as VersionIcon } from '../icons/version.svg';

const Versions = ({ versiones }) => {
    if (!versiones) return null;

    // Si "versiones" no es un array, lo convertimos en uno
    const versionList = Array.isArray(versiones) ? versiones : [versiones];

    return (
        <>
            {versionList.map((version, index) => (
                <span key={index} className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2">
                    <VersionIcon className="w-4 h-4 mr-1 text-white fill-white" />
                    {version || ''}
                </span>
            ))}
        </>
    );
};

export default Versions;
