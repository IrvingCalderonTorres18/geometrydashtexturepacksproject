import React, { useState, useMemo, useRef, useEffect } from 'react';

// Colores predefinidos del código proporcionado
const predefinedColors = [
    // Rojos
    { hex: "#fdd4ce", name: "Light Red", category: "red" },
    { hex: "#ff7d7d", name: "Pastel Red", category: "red" },
    { hex: "#ff3a3a", name: "Bright Red", category: "red" },
    { hex: "#ff0000", name: "Red", category: "red" },
    { hex: "#960000", name: "Dark Red", category: "red" },
    { hex: "#700000", name: "Deep Red", category: "red" },
    { hex: "#520200", name: "Wine Red", category: "red" },
    { hex: "#380106", name: "Very Dark Red", category: "red" },
    { hex: "#af004b", name: "Magenta Red", category: "red" },
    { hex: "#804f4f", name: "Red Brown", category: "red" },
    { hex: "#7a3535", name: "Burnt Red", category: "red" },
    { hex: "#512424", name: "Earthy Red", category: "red" },
    // Naranjas
    { hex: "#ffb972", name: "Soft Orange", category: "orange" },
    { hex: "#ffa040", name: "Warm Orange", category: "orange" },
    { hex: "#ff7d00", name: "Orange", category: "orange" },
    { hex: "#ff4b00", name: "Reddish Orange", category: "orange" },
    { hex: "#af4b00", name: "Dark Orange", category: "orange" },
    { hex: "#a36246", name: "Earth Orange", category: "orange" },
    { hex: "#754936", name: "Wood Orange", category: "orange" },
    { hex: "#563528", name: "Deep Orange", category: "orange" },
    { hex: "#963200", name: "Burnt Orange", category: "orange" },
    { hex: "#66311e", name: "Clay Orange", category: "orange" },
    { hex: "#5b2700", name: "Rust Orange", category: "orange" },
    { hex: "#472000", name: "Dark Orange", category: "orange" },
    // Amarillos
    { hex: "#ffffc0", name: "Pastel Yellow", category: "yellow" },
    { hex: "#fffa7f", name: "Light Yellow", category: "yellow" },
    { hex: "#ffff00", name: "Yellow", category: "yellow" },
    { hex: "#7d7d00", name: "Olive Yellow", category: "yellow" },
    { hex: "#fde0a0", name: "Golden Yellow", category: "yellow" },
    { hex: "#ffb900", name: "Deep Yellow", category: "yellow" },
    { hex: "#966400", name: "Mustard Yellow", category: "yellow" },
    { hex: "#50320e", name: "Yellow Brown", category: "yellow" },
    { hex: "#cda576", name: "Sand Yellow", category: "yellow" },
    { hex: "#a77b4d", name: "Clay Yellow", category: "yellow" },
    { hex: "#6d5339", name: "Dark Yellow", category: "yellow" },
    { hex: "#513e2a", name: "Earth Yellow", category: "yellow" },
    // Verdes
    { hex: "#c0ffa0", name: "Pastel Green", category: "green" },
    { hex: "#b1ff6d", name: "Apple Green", category: "green" },
    { hex: "#7dff00", name: "Neon Green", category: "green" },
    { hex: "#00ff00", name: "Green", category: "green" },
    { hex: "#d2ff32", name: "Lime Green", category: "green" },
    { hex: "#4baf00", name: "Leaf Green", category: "green" },
    { hex: "#649600", name: "Moss Green", category: "green" },
    { hex: "#00af4b", name: "Emerald Green", category: "green" },
    { hex: "#00ff7d", name: "Aqua Green", category: "green" },
    { hex: "#009600", name: "Dark Green", category: "green" },
    { hex: "#006000", name: "Deep Green", category: "green" },
    { hex: "#004000", name: "Forest Green", category: "green" },
    // Cian
    { hex: "#c0ffe0", name: "Pale Mint", category: "cyan" },
    { hex: "#94ffe4", name: "Mint Ice", category: "cyan" },
    { hex: "#00ffc0", name: "Tuquoise Cyan", category: "cyan" },
    { hex: "#00ffff", name: "Cyan", category: "cyan" },
    { hex: "#7dffaf", name: "Pale Seafoam Cyan", category: "cyan" },
    { hex: "#43a18a", name: "Deep Cyan", category: "cyan" },
    { hex: "#316d5f", name: "Dark Cyan", category: "cyan" },
    { hex: "#265449", name: "Ocean Cyan", category: "cyan" },
    { hex: "#009664", name: "Forest Cyan", category: "cyan" },
    { hex: "#007d7d", name: "Dark Teal Cyan", category: "cyan" },
    { hex: "#006060", name: "Charcoal Cyan", category: "cyan" },
    { hex: "#004040", name: "Deep Ocean Cyan", category: "cyan" },
    // Azules
    { hex: "#a0ffff", name: "Sky Blue", category: "blue" },
    { hex: "#00c8ff", name: "Neon Blue", category: "blue" },
    { hex: "#007dff", name: "Strong Blue", category: "blue" },
    { hex: "#0000ff", name: "Blue", category: "blue" },
    { hex: "#004baf", name: "Deep Blue", category: "blue" },
    { hex: "#000096", name: "Navy Blue", category: "blue" },
    { hex: "#010770", name: "Electric Blue", category: "blue" },
    { hex: "#000a4c", name: "Dark Blue", category: "blue" },
    { hex: "#006496", name: "Ocean Blue", category: "blue" },
    { hex: "#00496d", name: "Deep Ocean Blue", category: "blue" },
    { hex: "#00324c", name: "Midnight Blue", category: "blue" },
    { hex: "#002638", name: "Blue Almost Black", category: "blue" },
    // Morados
    { hex: "#beb5ff", name: "Pastel Purple", category: "purple" },
    { hex: "#7d7dff", name: "Strong Purple", category: "purple" },
    { hex: "#7d00ff", name: "Purple", category: "purple" },
    { hex: "#640096", name: "Deep Purple", category: "purple" },
    { hex: "#b680ff", name: "Lavender Purple", category: "purple" },
    { hex: "#4b00af", name: "Dark Purple", category: "purple" },
    { hex: "#3d068c", name: "Deep Violet", category: "purple" },
    { hex: "#370860", name: "Midnight Purple", category: "purple" },
    { hex: "#4d4d8f", name: "Bluish Purple", category: "purple" },
    { hex: "#6f49a4", name: "Grape Purple", category: "purple" },
    { hex: "#54367f", name: "Dark Slate Purple", category: "purple" },
    { hex: "#422a63", name: "Wine Purple", category: "purple" },
    // Rosas y morados
    { hex: "#fcb5ff", name: "Light Pink", category: "pink" },
    { hex: "#ff007d", name: "Pink", category: "pink" },
    { hex: "#960064", name: "Dark Pink", category: "pink" },
    { hex: "#66033e", name: "Intense Wine", category: "pink" },
    { hex: "#ff00ff", name: "Magenta", category: "pink" },
    { hex: "#b900ff", name: "Bright Purple", category: "pink" },
    { hex: "#7d007d", name: "Dark Magenta", category: "pink" },
    { hex: "#470134", name: "Indigo Purple", category: "pink" },
    { hex: "#fa7fff", name: "Bright Lavender", category: "pink" },
    { hex: "#af57af", name: "Dark Lavender", category: "pink" },
    { hex: "#824382", name: "Deep Lavender", category: "pink" },
    { hex: "#5e315e", name: "Deep Lavender Dark", category: "pink" },
    // Azules adicionales
    { hex: "#76bdff", name: "Light Blue", category: "additionalBlue" },
    { hex: "#5080ad", name: "Steel Blue", category: "additionalBlue" },
    { hex: "#335375", name: "Petrol Blue", category: "additionalBlue" },
    { hex: "#233c56", name: "Night Blue", category: "additionalBlue" },
    // Neutrales
    { hex: "#ffffff", name: "White", category: "neutral" },
    { hex: "#e0e0e0", name: "Light Gray", category: "neutral" },
    { hex: "#afafaf", name: "Medium Gray", category: "neutral" },
    { hex: "#808080", name: "Dark Gray", category: "neutral" },
    { hex: "#5a5a5a", name: "Gray", category: "neutral" },
    { hex: "#404040", name: "Charcoal Gray", category: "neutral" },
    { hex: "#000000", name: "Black", category: "neutral" }
];

// Categorías disponibles
const categories = [
    { id: "all", name: "Todos" },
    { id: "red", name: "Rojos" },
    { id: "orange", name: "Naranjas" },
    { id: "yellow", name: "Amarillos" },
    { id: "green", name: "Verdes" },
    { id: "cyan", name: "Cian" },
    { id: "blue", name: "Azules" },
    { id: "purple", name: "Morados" },
    { id: "pink", name: "Rosas" },
    { id: "additionalBlue", name: "Azules adicionales" },
    { id: "neutral", name: "Neutrales" }
];

// Función para determinar si el texto debe ser negro o blanco según el fondo
const getTextColorForBackground = (hexColor) => {
  // Convertir hex a RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

  // Calcular la luminosidad (fórmula YIQ)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Usar texto negro si el fondo es claro
    return yiq >= 128 ? 'text-black' : 'text-white';
};

// Implementación para encontrar el color más cercano
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const colorDistance = (c1, c2) => {
    return Math.sqrt(
        Math.pow(c1[0] - c2[0], 2) +
        Math.pow(c1[1] - c2[1], 2) +
        Math.pow(c1[2] - c2[2], 2)
    );
};

const getClosestColorMatch = (inputHex) => {
    if (!inputHex || !inputHex.startsWith('#')) return null;

    const inputRgb = hexToRgb(inputHex);
    if (!inputRgb) return null;

    let closest = null;
    let minDistance = Infinity;

    for (const color of predefinedColors) {
        const colorRgb = hexToRgb(color.hex);
        const distance = colorDistance(inputRgb, colorRgb);
        if (distance < minDistance) {
        minDistance = distance;
        closest = color;
        }
    }

    return closest;
};

// Icono de verificación para usar en la notificación
const CheckIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="inline-block mr-1"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Componente para el modal de zoom del color
const ColorModal = ({ color, onClose, onCopy }) => {
    const textColorClass = getTextColorForBackground(color.hex);
    const [copyMessage, setCopyMessage] = useState('');
    
    const handleCopy = () => {
        navigator.clipboard.writeText(color.hex)
        .then(() => {
            setCopyMessage('¡Copiado!');
            setTimeout(() => setCopyMessage(''), 2000);
            if (onCopy) onCopy(color.hex);
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
            setCopyMessage('Error al copiar');
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <div 
            className={`w-full h-48 rounded-lg mb-4 flex items-center justify-center ${textColorClass}`}
            style={{ backgroundColor: color.hex }}
            >
            <span className="text-xl font-bold drop-shadow-md">{color.name}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
            <div>
                <h3 className="text-white text-lg font-semibold">{color.name}</h3>
                <p className="text-gray-300">{color.hex}</p>
            </div>
            
            <div className="relative">
                <button
                onClick={handleCopy}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                Copiar HEX
                </button>
                {copyMessage && (
                <div className="absolute right-0 bottom-full mb-1 bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    {copyMessage}
                </div>
                )}
            </div>
            </div>
            
            <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded py-2"
            >
            Cerrar
            </button>
        </div>
        </div>
    );
};

// Componente para la notificación de copiado
const CopyNotification = ({ show, color, onHide }) => {
    useEffect(() => {
        if (show) {
        const timer = setTimeout(() => {
            onHide();
        }, 2000);
        
        return () => clearTimeout(timer);
        }
    }, [show, onHide]);
    
    if (!show) return null;
    
    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-up">
        <div className="mr-2 bg-green-500 rounded-full p-1">
            <CheckIcon />
        </div>
        <div>
            <p className="font-medium">Color copiado</p>
            <div className="flex items-center">
            <div 
                className="w-4 h-4 rounded mr-2" 
                style={{ backgroundColor: color.hex }}
            ></div>
            <span className="text-sm">{color.hex}</span>
            </div>
        </div>
        </div>
    );
};

const GDColorPalette = ({ onColorSelect, initialColor }) => {
    const [selectedColor, setSelectedColor] = useState(initialColor || null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [customColor, setCustomColor] = useState("");
    const [zoomColor, setZoomColor] = useState(null);
    const [notification, setNotification] = useState({ show: false, color: null });

    // Filtrar colores según la categoría activa
    const filteredColors = useMemo(() => {
        return predefinedColors.filter(color => 
        activeCategory === "all" || color.category === activeCategory
        );
    }, [activeCategory]);

  // Organizar colores en filas de 16 para que coincida con la imagen
    const colorRows = useMemo(() => {
        const rows = [];
        const colorsPerGroup = 4; // Agrupar de 4 en 4

        for (let i = 0; i < filteredColors.length; i += colorsPerGroup) {
            rows.push(filteredColors.slice(i, i + colorsPerGroup));
        }

        return rows;
    }, [filteredColors]);

  // Manejar la selección de un color predefinido
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        if (onColorSelect) {
        onColorSelect(color);
        }
    };

  // Manejar el zoom de un color (mostrar modal)
    const handleColorZoom = (color, e) => {
        e.stopPropagation(); // Prevenir que se propague al clic del color
        setZoomColor(color);
    };

  // Manejar el cambio de color personalizado
    const handleCustomColorChange = (e) => {
        setCustomColor(e.target.value);
    };

    // Aplicar el color personalizado
    const applyCustomColor = () => {
        if (customColor) {
        // Intentar encontrar un color predefinido que coincida
        const matchedColor = predefinedColors.find(
            c => c.hex.toLowerCase() === customColor.toLowerCase()
        );

        if (matchedColor) {
            setSelectedColor(matchedColor);
            if (onColorSelect) {
            onColorSelect(matchedColor);
            }
        } else {
            // Buscar el color más cercano
            const closestColor = getClosestColorMatch(customColor);
            if (closestColor) {
            const newColor = { 
                hex: customColor, 
                name: `Similar a ${closestColor.name}`,
                isCustom: true 
            };
            setSelectedColor(newColor);
            if (onColorSelect) {
                onColorSelect(newColor);
            }
            } else {
            const newColor = { 
                hex: customColor, 
                name: "Color personalizado",
                isCustom: true 
            };
            setSelectedColor(newColor);
            if (onColorSelect) {
                onColorSelect(newColor);
            }
            }
        }
    }
};

  // Copiar el código hexadecimal al portapapeles
    const copyToClipboard = (color) => {
        navigator.clipboard.writeText(color.hex)
        .then(() => {
            // Mostrar notificación con icono
            setNotification({
            show: true,
            color: color
            });
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
            alert('Error al copiar el color al portapapeles');
        });
    };

  // Manejar el clic derecho en un color (copiar al portapapeles)
    const handleColorRightClick = (color, e) => {
        e.preventDefault(); // Prevenir el menú contextual por defecto
        copyToClipboard(color);
    };

  // Ocultar la notificación
    const hideNotification = () => {
        setNotification({ show: false, color: null });
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            {/* Controles */}
            <div className="flex flex-wrap gap-2 mb-4">
                {/* Selector de categorías */}
                <div className="flex-grow flex flex-wrap gap-1">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`px-2 py-1 text-xs rounded ${
                                activeCategory === category.id 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color personalizado */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="flex-grow px-2 py-1 bg-gray-700 text-white border border-gray-600 rounded-l"
                    placeholder="#RRGGBB"
                    value={customColor}
                    onChange={handleCustomColorChange}
                />
                <input 
                    type="color" 
                    className="h-[30px] w-[30px] rounded cursor-pointer"
                    value={customColor}
                    onChange={handleCustomColorChange}
                />
                <button 
                    className="px-2 bg-blue-500 text-white rounded-r"
                    onClick={applyCustomColor}
                >
                    Aplicar
                </button>
            </div>

            {/* Instrucciones de uso */}
            <div className="mb-4 text-gray-300 text-sm bg-gray-700 p-2 rounded">
                <p><span className="font-medium">Clic izquierdo:</span> Ver detalles del color</p>
                <p><span className="font-medium">Clic derecho:</span> Copiar código hexadecimal</p>
            </div>

            {/* Grid de colores */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out;
                }

                #colorList {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px; /* Espaciado entre los botones */
                    max-width: 700px; /* Limitar el ancho máximo */
                    margin: 0 auto; /* Centrar el contenedor */
                }

                .colorGroup {
                    display: flex;
                    flex-direction: row;
                    gap: 5px;
                }

                button {
                    border-radius: 80px; /* Opcional: redondear bordes */
                }
            `}</style>

            {/* Modal de zoom */}
            {zoomColor && (
                <ColorModal 
                    color={zoomColor} 
                    onClose={() => setZoomColor(null)} 
                    onCopy={() => copyToClipboard(zoomColor)}
                />
            )}

            {/* Notificación de copiado */}
            <CopyNotification 
                show={notification.show} 
                color={notification.color} 
                onHide={hideNotification} 
            />

            {/* Estilos para la animación de la notificación */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out;
                }

                #colorList {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px; /* Espaciado uniforme en ambas direcciones */
                    max-width: 700px; /* Limitar el ancho máximo */
                    margin: 0 auto; /* Centrar el contenedor */
                }

                .colorGroup {
                    display: flex;
                    flex-direction: row;
                    gap: 5px;
                }

                button {
                    padding: 5px; /* Espaciado interno */
                    border-radius: 4px; /* Opcional: redondear bordes */
                }
            `}</style>

            <div className="grid-container">
                {/* Primera fila de cuadrículas */}
                <div className="grid-row">
                    <div className="grid red-grid">
                        {predefinedColors.filter(color => color.category === "red").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)} // Mostrar modal al hacer clic
                                onContextMenu={(e) => handleColorRightClick(color, e)} // Copiar HEX al hacer clic derecho
                            />
                        ))}
                    </div>
                    <div className="grid orange-grid">
                        {predefinedColors.filter(color => color.category === "orange").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                    <div className="grid yellow-grid">
                        {predefinedColors.filter(color => color.category === "yellow").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                    <div className="grid green-grid">
                        {predefinedColors.filter(color => color.category === "green").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                </div>

                {/* Segunda fila de cuadrículas */}
                <div className="grid-row">
                    <div className="grid cyan-grid">
                        {predefinedColors.filter(color => color.category === "cyan").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                    <div className="grid blue-grid">
                        {predefinedColors.filter(color => color.category === "blue").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                    <div className="grid purple-grid">
                        {predefinedColors.filter(color => color.category === "purple").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                    <div className="grid pink-grid">
                        {predefinedColors.filter(color => color.category === "pink").map(color => (
                            <button
                                key={color.hex}
                                className="color-button"
                                style={{ backgroundColor: color.hex }}
                                title={`${color.name} (${color.hex})`}
                                onClick={(e) => handleColorZoom(color, e)}
                                onContextMenu={(e) => handleColorRightClick(color, e)}
                            />
                        ))}
                    </div>
                </div>


            </div>

            <div className="additional-neutral-container">
                {predefinedColors
                    .filter(color => color.category === "additionalBlue" || color.category === "neutral")
                    .map(color => (
                        <button
                            key={color.hex}
                            className="color-button"
                            style={{ backgroundColor: color.hex }}
                            title={`${color.name} (${color.hex})`}
                            onClick={(e) => handleColorZoom(color, e)} // Mostrar modal al hacer clic
                            onContextMenu={(e) => handleColorRightClick(color, e)} // Copiar HEX al hacer clic derecho
                        />
                    ))}
            </div>

            <style jsx>{`
                .grid-container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .grid-row {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                }

                .color-button {
                    width: 50px;
                    height: 50px;
                    border: 4px solid black;
                    padding: 5px;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .additional-neutral-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px; /* Espaciado entre los botones */
                    margin-top: 20px; /* Separación superior */
                }
            `}</style>
        </div>
    );
};

export default GDColorPalette;
