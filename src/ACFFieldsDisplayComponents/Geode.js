import React from 'react';
import { ReactComponent as GeodeIcon } from '../icons/geode.svg';

const Geode = ({ geode }) => {
  if (!geode || geode === ": (dejar vacío)") return null;

  return (
    <span className="flex items-center geodebg text-xs font-semibold px-2 py-1 rounded mr-2 mb-2">
      <GeodeIcon className="w-4 h-4 mr-1" />
      {geode}
    </span>
  );
};

export default Geode;
