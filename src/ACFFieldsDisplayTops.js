import React from 'react';
import Versions from './ACFFieldsDisplayComponents/Versions.js';
import Type from './ACFFieldsDisplayComponents/Type.js';
import Authors from './ACFFieldsDisplayComponents/Authors.js';
import NumTop from './ACFFieldsDisplayComponents/NumTop.js';

const ACFFieldsDisplayTops = ({ acf }) => {

    return (
        <div className="flex flex-wrap mt-3 text-white">
            <Versions versiones={acf?.versiones} />
            <Type types={acf?.type} />
            <Authors authors_acf={acf?.author_acf} authors={acf?.author} />
            <NumTop numtop={acf?.numtop} />
        </div>
    );
};

export default ACFFieldsDisplayTops;
