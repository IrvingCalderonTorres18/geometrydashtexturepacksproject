import React from 'react';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { ReactComponent as IconsIcon } from '../icons/icons.svg';
import { ReactComponent as MenuIcon } from '../icons/menu.svg';

// Nuevos íconos personalizados desde carpeta /icons/types/
import { ReactComponent as ArticleIcon } from '../icons/types/article.svg';
import { ReactComponent as TutorialIcon } from '../icons/types/tutorial.svg';
import { ReactComponent as ResourceIcon } from '../icons/types/resource.svg';

const Type = ({ types }) => {
  if (!types) return null;

  const typeList = Array.isArray(types) ? types : [types];

  const topListTypes = [
    "Top 10 Epic Texture Packs",
    "Top 5 Best Icon Texture Packs",
    "Top 5 Full Android Texture Packs",
    "Top 5 Massive Icon Texture Packs",
    "Top 5 Of My Best Texture Packs",
    "Top 5 Best Minimalist Texture Packs",
    "Top 5 Best Neon Texture Packs",
    "Top 5 Anime Texture Packs",
    "Top 5 Best Guitar Hero Styles Texture Packs",
    "Top 10 Best Texture Packs Of The Year",
    "Texture Pack RGB Series"
  ];

  return (
    <>
      {typeList.map((type, index) => {
        let icon;

        switch (type) {
          case "Icons":
            icon = <IconsIcon className="w-4 h-4 mr-1" />;
            break;
          case "Menu":
            icon = <MenuIcon className="w-4 h-4 mr-1" />;
            break;
          case "Article":
            icon = <ArticleIcon className="w-4 h-4 mr-1" />;
            break;
          case "Tutorial":
            icon = <TutorialIcon className="w-4 h-4 mr-1" />;
            break;
          case "Resource":
            icon = <ResourceIcon className="w-4 h-4 mr-1" />;
            break;
          default:
            if (topListTypes.includes(type)) {
              icon = <EmojiEventsOutlinedIcon sx={{ fontSize: 16 }} />;
            }
            break;
        }

        return (
          <span
            key={index}
            className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2"
          >
            {icon || ''}
            {type || ''}
          </span>
        );
      })}
    </>
  );
};

export default Type;
