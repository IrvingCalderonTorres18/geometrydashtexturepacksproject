import { getColorClass } from './ColorBadge.js';
import { getColorHexClass } from './Color_Palette.js';
import React from 'react';
import './styles/Colors.css';
import { ReactComponent as ColorIcon } from './icons/color.svg';
import { ReactComponent as GraphicsIcon } from './icons/graphics.svg';
import { ReactComponent as ColorIconBlack } from './icons/color-black.svg';
import { ReactComponent as TextureIcon } from './icons/texture.svg';
import { ReactComponent as LevelIcon } from './icons/level.svg';
import Versions from './ACFFieldsDisplayComponents/Versions.js';
import Type from './ACFFieldsDisplayComponents/Type.js';
import Platform from './ACFFieldsDisplayComponents/Platform.js';
import Geode from './ACFFieldsDisplayComponents/Geode.js';
import Authors from './ACFFieldsDisplayComponents/Authors.js';

const levelColors = {
    Standard: 'standard',
    Enhanced: 'enhanced',
    Epic: 'epic',
    Ultra: 'ultra',
    Legendary: 'legendary',
    Mythic: 'mythic'
};

const LevelIcons = {
    Standard: <LevelIcon className="w-4 h-4 mr-1" />,
    Enhanced: <LevelIcon className="w-4 h-4 mr-1" />,
    Epic: <LevelIcon className="w-4 h-4 mr-1" />,
    Ultra: <LevelIcon className="w-4 h-4 mr-1" />,
    Legendary: <LevelIcon className="w-4 h-4 mr-1" />,
    Mythic: <LevelIcon className="w-4 h-4 mr-1" />
};

const validColors = [
    "RGB", "Transparent", "Light Red", "Pastel Red", "Bright Red", "Red", "Dark Red", "Deep Red", "Wine Red", "Very Dark Red", "Magenta Red", "Red Brown", "Burnt Red", "Earthy Red",
    "Soft Orange", "Warm Orange", "Orange", "Reddish Orange", "Dark Orange", "Earth Orange", "Wood Orange", "Deep Orange", "Burnt Orange", "Clay Orange", "Rust Orange", "Dark Orange",
    "Pastel Yellow", "Light Yellow", "Yellow", "Olive Yellow", "Golden Yellow", "Deep Yellow", "Mustard Yellow", "Yellow Brown", "Sand Yellow", "Clay Yellow", "Dark Yellow", "Earth Yellow",
    "Pastel Green", "Apple Green", "Neon Green", "Green", "Lime Green", "Leaf Green", "Moss Green", "Emerald Green", "Aqua Green", "Dark Green", "Deep Green", "Forest Green",
    "Pale Mint", "Mint Ice", "Tuquoise Cyan", "Cyan", "Pale Seafoam Cyan", "Deep Cyan", "Dark Cyan", "Ocean Cyan", "Forest Cyan", "Dark Teal Cyan", "Charcoal Cyan", "Deep Ocean Cyan",
    "Sky Blue", "Neon Blue", "Strong Blue", "Blue", "Deep Blue", "Navy Blue", "Electric Blue", "Dark Blue", "Ocean Blue", "Deep Ocean Blue", "Midnight Blue", "Blue Almost Black",
    "Pastel Purple", "Strong Purple", "Purple", "Deep Purple", "Lavender Purple", "Dark Purple", "Deep Violet", "Midnight Purple", "Bluish Purple", "Grape Purple", "Dark Slate Purple", "Wine Purple",
    "Light Pink", "Pink", "Dark Pink", "Intense Wine", "Magenta", "Bright Purple", "Dark Magenta", "Indigo Purple", "Bright Lavender", "Dark Lavender", "Deep Lavender", "Deep Lavender Dark",
    "Light Blue", "Steel Blue", "Petrol Blue", "Night Blue",
    "White", "Light Gray", "Medium Gray", "Dark Gray", "Gray", "Charcoal Gray", "Black"
];

const ACFFieldsDisplay = ({ acf }) => {

        /*if (acf?.principal_colour || acf?.secondary_color || acf?.tertiary_color) { //Comprobación de colores que está tomando
        console.log("Colores ACF:", {
            principal: acf?.principal_colour || '',
            secondary: acf?.secondary_color || '',
            tertiary: acf?.tertiary_color || '',
        });
    }*/
    return (
        <div className="flex flex-wrap mt-3 text-white">
            {/* Mostrar los campos color_1, color_2 y color_3 */}
            {[acf?.color_1, acf?.color_2, acf?.color_3].map((color, index) => {
                if (!color) return null; // Si el color no está definido, no renderizar nada

                // Obtener las clases y el nombre del color desde Color_Palette
                const [backgroundColorClass, textColorClass, iconClass, colorName] = getColorHexClass(color.toLowerCase()) || ["bg-gray-500", "text-white", "ColorIcon", color];

                // Verificar si es un color dinámico (no predefinido)
                const isDynamicColor = backgroundColorClass.startsWith("custom-bg-");

                return (
                    <span
                        key={`color-${index}`}
                        className={`flex items-center text-xs font-semibold px-2 py-1 rounded mr-2 mb-2 ${backgroundColorClass} ${textColorClass}`}
                        style={isDynamicColor ? { "--dynamic-color": color } : {}}
                    >
                        {iconClass === "ColorIcon" ? (
                            <ColorIcon className="w-4 h-4 mr-1" />
                        ) : (
                            <ColorIconBlack className="w-4 h-4 mr-1" />
                        )}
                        {colorName} {/* Mostrar el nombre del color */}
                    </span>
                );
            })}

            {/* Otros campos existentes */}
            {[acf?.principal_colour, acf?.secondary_color, acf?.tertiary_color].map((color, index) => {
                if (!color || !validColors.includes(color)) return null;
                return (
                    <span key={index} className={`flex items-center ${getColorClass(color)[0]} ${getColorClass(color)[1]} text-xs font-semibold px-2 py-1 rounded mr-2 mb-2`}>
                        {getColorClass(color)[2] === 'ColorIcon' ? <ColorIcon className="w-4 h-4 mr-1" /> : <ColorIconBlack className="w-4 h-4 mr-1" />}
                        {color || ''}
                    </span>
                );
            })}

            <Versions versiones={acf?.versiones} />
            <Platform platforms={acf?.platforms} />

            {acf?.graphics?.length > 0 && acf.graphics.map((graphic, index) => (
                <span key={index} className="flex items-center graphicsbg text-xs font-semibold px-2 py-1 rounded mr-2 mb-2">
                    <GraphicsIcon className="w-4 h-4 mr-1 text-white fill-white" />
                    {graphic || ''}
                </span>
            ))}

            <Type types={acf?.type} />

            {Array.isArray(acf?.style) && acf.style.length > 0 &&
                acf.style.map((style, index) => (
                    <span key={`style-${index}`} className="flex items-center gdversion text-xs font-semibold px-2 py-1 rounded mr-2 mb-2">
                        <TextureIcon className="w-4 h-4 mr-1" />
                        {style}
                    </span>
                ))
            }

            <Authors authors_acf={acf?.author_acf} authors={acf?.author} />

            {acf?.level && acf.level !== ': (dejar vacío)' && (
                <span key="level" className={`flex items-center ${levelColors[acf.level] || 'bg-gray-300'} text-xs font-semibold px-2 py-1 rounded mr-2 mb-2`}>
                    {LevelIcons[acf.level] || <LevelIcon className="w-4 h-4 mr-1" />}
                    {acf.level || ''}
                </span>
            )}
            <Geode geode={acf?.geode} />
        </div>
    );
};

export default ACFFieldsDisplay;
