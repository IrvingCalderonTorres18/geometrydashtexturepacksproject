// ACFFieldsDisplayMods.jsx
import React from 'react';
import Versions from './ACFFieldsDisplayComponents/Versions';
import Type_Classic from './ACFFieldsDisplayComponents/Type_Classic';
import Type_Geode from './ACFFieldsDisplayComponents/Type_Geode';
import VersionMod from './ACFFieldsDisplayComponents/VersionMod';
import Platform from './ACFFieldsDisplayComponents/Platform';
import Geode from './ACFFieldsDisplayComponents/Geode';
import Paid from './ACFFieldsDisplayComponents/Paid';
import Category from './ACFFieldsDisplayComponents/Category';
import Authors from './ACFFieldsDisplayComponents/Authors.js';

const ACFFieldsDisplayMods = ({ acf }) => {
  return (
    <div className="flex flex-wrap mt-3 text-white">
      <Versions versiones={acf?.versiones} />
      <Platform platforms={acf?.platforms} />
      <Type_Classic type={acf?.type_classic} />
      <Type_Geode types={acf?.type_geode} />
      <VersionMod version_mod={acf?.version_mod} />
      <Geode geode={acf?.geode} />
      <Authors authors_acf={acf?.author_acf} authors={acf?.author} />
      <Category category={acf?.category} />
      <Paid paid={acf?.paid} />
    </div>
  );
};

export default ACFFieldsDisplayMods;
