
import React from 'react';
import Type from './ACFFieldsDisplayComponents/Type';
import Type_Article from './ACFFieldsDisplayComponents/Type_Article';
import Type_Resource from './ACFFieldsDisplayComponents/Type_Resource';
import Type_Tutorial from './ACFFieldsDisplayComponents/Type_Tutorial';

const ACFFieldsDisplayContent = ({ acf }) => {
  return (
    <div className="flex flex-wrap mt-3 text-white">
          <Type types={acf?.type} />
          <Type_Article type={acf?.article_type} />
          <Type_Resource type={acf?.resource_type}/>
          <Type_Tutorial type={acf?.tutorial_type} />
    </div>
  );
};

export default ACFFieldsDisplayContent;