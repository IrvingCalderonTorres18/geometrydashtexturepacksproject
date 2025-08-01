import React from 'react';
import { ReactComponent as NewsIcon } from '../icons/content/news.svg';
import { ReactComponent as HistoryIcon } from '../icons/content/history.svg';
import { ReactComponent as OpinionIcon } from '../icons/content/opinion.svg';
import { ReactComponent as UpdatesIcon } from '../icons/content/updates.svg';
import { ReactComponent as AnalysisIcon } from '../icons/content/analysis.svg';
import { ReactComponent as CommunityIcon } from '../icons/content/community.svg';
import { ReactComponent as EventsIcon } from '../icons/content/celebration.svg';

const Type_Article = ({ type }) => {
  const typeList = Array.isArray(type) ? type : [type];

  return (
    <>
      {typeList.map((t, index) => {
        let icon;

        switch (t) {
          case 'News':
            icon = <NewsIcon className="w-4 h-4 mr-1" />;
            break;
          case 'History':
            icon = <HistoryIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Opinion':
            icon = <OpinionIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Updates':
            icon = <UpdatesIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Analysis':
            icon = <AnalysisIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Community':
            icon = <CommunityIcon className="w-4 h-4 mr-1" />;
            break;
          case 'Events':
            icon = <EventsIcon className="w-4 h-4 mr-1" />;
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

export default Type_Article;
