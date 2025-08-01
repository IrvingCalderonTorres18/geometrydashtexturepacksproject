// Type_Classic.jsx
import React from 'react';
import { ReactComponent as MenuIcon } from '../icons/menu.svg';
import { ReactComponent as ExtensionIcon } from '../icons/extension-icon.svg';

const Type_Classic = ({ type }) => {
  // Asegurarse de que `type` sea un arreglo
  const typeList = Array.isArray(type) ? type : [type];

  // Verificar si el campo está vacío
  if (!type || typeList.length === 0 || typeList.every(t => !t)) {
    return null; // No renderizar nada si el campo está vacío
  }

  return (
    <>
      {typeList.map((t, index) => {
        let icon;

        if (t === "Mod Menu") {
          icon = <MenuIcon className="w-4 h-4 mr-1" />;
        } else if (t === "Extension") {
          icon = <ExtensionIcon className="w-4 h-4 mr-1" />;
        }

        return (
          <span
            key={index}
            className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2"
          >
            {icon && <>{icon}</>}
            {t}
          </span>
        );
      })}
    </>
  );
};

export default Type_Classic;
