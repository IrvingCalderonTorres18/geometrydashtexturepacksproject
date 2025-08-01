// Type_Tutorial.js
import React from 'react';
import { ReactComponent as InstallIcon } from '../icons/content/install.svg';
import { ReactComponent as ConfigIcon } from '../icons/content/configuration.svg';
import { ReactComponent as EditorIcon } from '../icons/content/editor.svg';
import { ReactComponent as GameplayIcon } from '../icons/content/gameplay.svg';
import { ReactComponent as ModdingIcon } from '../icons/content/modding.svg';

const Type_Tutorial = ({ type }) => {
  const typeList = Array.isArray(type) ? type : [type];

  return (
    <>
      {typeList.map((t, index) => {
        let icon;

        switch (t) {
          case 'Install Guide':
            icon = <InstallIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Configuration':
            icon = <ConfigIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Editor':
            icon = <EditorIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Gameplay':
            icon = <GameplayIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Modding':
            icon = <ModdingIcon className="w-4 h-4 mr-1" />;
            break;
          default:
            icon = null;
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

export default Type_Tutorial;
