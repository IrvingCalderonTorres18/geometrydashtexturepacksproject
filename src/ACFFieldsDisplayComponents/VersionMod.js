import React from 'react';
import { ReactComponent as Version_Mod } from '../icons/version-mod.svg'; // El ícono que usas para las versiones

const VersionMod = ({ version_mod }) => {
  if (!version_mod || version_mod === ": (dejar vacío)") return null;

  // Separar las versiones por comas y eliminar espacios
  const versionsArray = version_mod.split(',').map(version => version.trim());

  return (
    <div className="flex flex-wrap">
      {versionsArray.map((version, index) => (
        <span
          key={index}
          className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2"
        >
          <Version_Mod className="w-4 h-4 mr-1" />
          v{version}
        </span>
      ))}
    </div>
  );
};

export default VersionMod;
