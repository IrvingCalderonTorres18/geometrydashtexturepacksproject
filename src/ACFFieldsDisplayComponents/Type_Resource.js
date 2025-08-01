// Type_Resource.jsx
import React from 'react';
import { ReactComponent as DownloadFilesIcon } from '../icons/content/download.svg';
import { ReactComponent as SpritesIcon } from '../icons/content/sprites.svg';
import { ReactComponent as SoundsIcon } from '../icons/content/sounds.svg';
import { ReactComponent as TemplatesIcon } from '../icons/content/template.svg';

const Type_Resource = ({ type }) => {
  const typeList = Array.isArray(type) ? type : [type];

  return (
    <>
      {typeList.map((t, index) => {
        let icon;

        switch (t) {
          case 'Download Files':
            icon = <DownloadFilesIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Sprites':
            icon = <SpritesIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Sounds':
            icon = <SoundsIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Templates':
            icon = <TemplatesIcon className="w-4 h-4 mr-1" />;
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

export default Type_Resource;
