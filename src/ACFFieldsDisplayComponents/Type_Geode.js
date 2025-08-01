import React from 'react';
import { ReactComponent as UniversalIcon } from '../icons/geode/universal.svg';
import { ReactComponent as GameplayIcon } from '../icons/geode/gameplay.svg';
import { ReactComponent as EditorIcon } from '../icons/geode/editor.svg';
import { ReactComponent as OfflineIcon } from '../icons/geode/offline.svg';
import { ReactComponent as OnlineIcon } from '../icons/geode/online.svg';
import { ReactComponent as EnhancementIcon } from '../icons/geode/enhancement.svg';
import { ReactComponent as MusicIcon } from '../icons/geode/music.svg';
import { ReactComponent as InterfaceIcon } from '../icons/geode/interface.svg';
import { ReactComponent as BugfixIcon } from '../icons/geode/bugfix.svg';
import { ReactComponent as UtilityIcon } from '../icons/geode/utility.svg';
import { ReactComponent as PerformanceIcon } from '../icons/geode/performance.svg';
import { ReactComponent as CustomizationIcon } from '../icons/geode/customization.svg';
import { ReactComponent as ContentIcon } from '../icons/geode/content.svg';
import { ReactComponent as DeveloperIcon } from '../icons/geode/developer.svg';
import { ReactComponent as CheatIcon } from '../icons/geode/cheat.svg';
import { ReactComponent as JokeIcon } from '../icons/geode/joke.svg';
import { ReactComponent as ModtoberIcon } from '../icons/geode/modtober.svg';
import { ReactComponent as ModtoberWinnerIcon } from '../icons/geode/modtober-winner.svg';
import { ReactComponent as FeaturedIcon } from '../icons/geode/star.svg';

const typeIcons = {
  Universal: <UniversalIcon className="w-4 h-4 mr-1" />,
  Gameplay: <GameplayIcon className="w-4 h-4 mr-1" />,
  Editor: <EditorIcon className="w-4 h-4 mr-1" />,
  Offline: <OfflineIcon className="w-4 h-4 mr-1" />,
  Online: <OnlineIcon className="w-4 h-4 mr-1" />,
  Enhancement: <EnhancementIcon className="w-4 h-4 mr-1" />,
  Music: <MusicIcon className="w-4 h-4 mr-1" />,
  Interface: <InterfaceIcon className="w-4 h-4 mr-1" />,
  Bugfix: <BugfixIcon className="w-4 h-4 mr-1" />,
  Utility: <UtilityIcon className="w-4 h-4 mr-1" />,
  Performance: <PerformanceIcon className="w-4 h-4 mr-1" />,
  Customization: <CustomizationIcon className="w-4 h-4 mr-1" />,
  Content: <ContentIcon className="w-4 h-4 mr-1" />,
  Developer: <DeveloperIcon className="w-4 h-4 mr-1" />,
  Cheat: <CheatIcon className="w-4 h-4 mr-1" />,
  Joke: <JokeIcon className="w-4 h-4 mr-1" />,
  'Modtober 2024': <ModtoberIcon className="w-4 h-4 mr-1" />,
  'Modtober 2024 winner': <ModtoberWinnerIcon className="w-4 h-4 mr-1" />,
  Featured: <FeaturedIcon className="w-4 h-4 mr-1" />,
};

const Type_Geode = ({ types }) => {
  // Verificar si el campo está vacío o no contiene datos válidos
  if (!types || (Array.isArray(types) && types.length === 0)) {
    return null; // No renderizar nada si el campo está vacío
  }

  const typeList = Array.isArray(types) ? types : [types];

  return (
    <>
      {typeList.map((type, index) => (
        <span
          key={index}
          className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2"
        >
          {typeIcons[type] || (
            <svg
              className="w-4 h-4 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {type}
        </span>
      ))}
    </>
  );
};

export default Type_Geode;
