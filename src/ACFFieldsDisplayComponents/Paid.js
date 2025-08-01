import React from 'react';
import { ReactComponent as SparkleIcon } from '../icons/dollar.svg'; // O puedes usar otro icono si prefieres

const Paid = ({ paid }) => {
  if (!paid || paid === ": (dejar vacío)") return null;

  return (
    <span className="flex items-center paidbg text-xs font-semibold px-2 py-1 rounded mr-2 mb-2">
      <SparkleIcon className="w-4 h-4 mr-1" />
      {paid}
    </span>
  );
};

export default Paid;
