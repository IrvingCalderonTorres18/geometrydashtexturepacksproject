import React from 'react';
import { ReactComponent as GeodeIcon } from '../icons/geode.svg';
import { ReactComponent as DllIcon } from '../icons/dll-icon.svg';

const Category = ({ category }) => {
  if (!Array.isArray(category) || category.length === 0) return null;

  return (
    <div className="flex flex-wrap">
      {category.map((item) => {
        const IconComponent = item === 'Geode' ? GeodeIcon : DllIcon;
        const categoryClass = item === 'Geode' ? 'geodebg' : 'gdversion';

        return (
          <span
            key={item}
            className={`flex items-center ${categoryClass} text-xs font-semibold px-2 py-1 rounded mr-2 mb-2`}
          >
            <IconComponent className="w-4 h-4 mr-1" />
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Category;
