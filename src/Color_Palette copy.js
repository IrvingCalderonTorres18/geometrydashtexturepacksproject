export const getColorHexClass = (color) => {
    if (!color) return ["", "", "", ""]; // Agregamos un cuarto valor para el nombre del color

    const lowerColor = color.toLowerCase();
    let $backgroundColorClass = "";
    let $textColorClass = "";
    let $iconClass = "ColorIcon";
    let $colorName = "";

    switch (lowerColor) {
        /**
        * !RGB
        */
        case "rgb":
            $backgroundColorClass = "rgb-bg"; 
            $colorName = "RGB";
            break;
        case "transparent":
            $backgroundColorClass = "bg-transparent";
            $colorName = "Transparent";
            break;
        /**
        * !RED
        */
        case "#fdd4ce":
            $backgroundColorClass = "custom-bg-fdd4ce";
            $colorName = "Light Red";
            break;
        case "#ff7d7d":
            $backgroundColorClass = "custom-bg-ff7d7d";
            $colorName = "Pastel Red";
            break;
        case "#ff3a3a":
            $backgroundColorClass = "custom-bg-ff3a3a";
            $colorName = "Bright Red";
            break;
        case "#ff0000":
            $backgroundColorClass = "custom-bg-ff0000";
            $colorName = "Red";
            break;

        case "#960000":
            $backgroundColorClass = "custom-bg-960000";
            $colorName = "Dark Red";
            break;
        case "#700000":
            $backgroundColorClass = "custom-bg-700000";
            $colorName = "Deep Red";
            break;
        case "#520200":
            $backgroundColorClass = "custom-bg-520200";
            $colorName = "Wine Red";
            break;
        case "#380106":
            $backgroundColorClass = "custom-bg-380106";
            $colorName = "Very Dark Red";
            break;

        case "#af004b":
            $backgroundColorClass = "custom-bg-af004b";
            $colorName = "Magenta Red";
            break;
        case "#804f4f":
            $backgroundColorClass = "custom-bg-804f4f";
            $colorName = "Red Brown";
            break;
        case "#7a3535":
            $backgroundColorClass = "custom-bg-7a3535";
            $colorName = "Burnt Red";
            break;
        case "#512424":
            $backgroundColorClass = "custom-bg-512424";
            $colorName = "Earthy Red";
            break;
        /**
        * !ORANGE
        */
        case "#ffb972":
            $backgroundColorClass = "custom-bg-ffb972";
            $colorName = "Soft Orange";
            break;
        case "#ffa040":
            $backgroundColorClass = "custom-bg-ffa040";
            $colorName = "Warm Orange";
            break;
        case "#ff7d00":
            $backgroundColorClass = "custom-bg-ff7d00";
            $colorName = "Orange";
            break;
        case "#ff4b00":
            $backgroundColorClass = "custom-bg-ff4b00";
            $colorName = "Reddish Orange";
            break;
        
        case "#af4b00":
            $backgroundColorClass = "custom-bg-af4b00";
            $colorName = "Dark Orange";
            break;
        case "#a36246":
            $backgroundColorClass = "custom-bg-a36246";
            $colorName = "Earth Orange";
            break;
        case "#754936":
            $backgroundColorClass = "custom-bg-754936";
            $colorName = "Wood Orange";
            break;
        case "#563528":
            $backgroundColorClass = "custom-bg-563528";
            $colorName = "Deep Orange";
            break;
        
        case "#963200":
            $backgroundColorClass = "custom-bg-963200";
            $colorName = "Burnt Orange";
            break;
        case "#66311e":
            $backgroundColorClass = "custom-bg-66311e";
            $colorName = "Clay Orange";
            break;
        case "#5b2700":
            $backgroundColorClass = "custom-bg-5b2700";
            $colorName = "Rust Orange";
            break;
        case "#472000":
            $backgroundColorClass = "custom-bg-472000";
            $colorName = "Dark Orange";
            break;
        /**
        * !YELLOW
        */
        case "#ffffc0":
            $backgroundColorClass = "custom-bg-ffffc0";
            $textColorClass = "text-black";
            $iconClass = "http://localhost:10004/wp-content/uploads/2025/03/color-black.svg";
            $colorName = "Pastel Yellow";
            break;
        case "#fffa7f":
            $backgroundColorClass = "custom-bg-fffa7f";
            $textColorClass = "text-black";
            $iconClass = "http://localhost:10004/wp-content/uploads/2025/03/color-black.svg";
            $colorName = "Light Yellow";
            break;
        case "#ffff00":
            $backgroundColorClass = "custom-bg-ffff00";
            $textColorClass = "text-black";
            $iconClass = "http://localhost:10004/wp-content/uploads/2025/03/color-black.svg";
            $colorName = "Yellow";
            break;
        case "#7d7d00":
            $backgroundColorClass = "custom-bg-7d7d00";
            $colorName = "Olive Yellow";
            break;

        case "#fde0a0":
            $backgroundColorClass = "custom-bg-fde0a0";
            $colorName = "Golden Yellow";
            break;
        case "#ffb900":
            $backgroundColorClass = "custom-bg-ffb900";
            $colorName = "Deep Yellow";
            break;
        case "#966400":
            $backgroundColorClass = "custom-bg-966400";
            $colorName = "Mustard Yellow";
            break;
        case "#50320e":
            $backgroundColorClass = "custom-bg-50320e";
            $colorName = "Yellow Brown";
            break;

        case "#cda576":
            $backgroundColorClass = "custom-bg-cda576";
            $colorName = "Sand Yellow";
            break;
        case "#a77b4d":
            $backgroundColorClass = "custom-bg-a77b4d";
            $colorName = "Clay Yellow";
            break;
        case "#6d5339":
            $backgroundColorClass = "custom-bg-6d5339";
            $colorName = "Dark Yellow";
            break;
        case "#513e2a":
            $backgroundColorClass = "custom-bg-513e2a";
            $colorName = "Earth Yellow";
            break;
        /**
        * !GREEN
        */
        case "#c0ffa0":
            $backgroundColorClass = "custom-bg-c0ffa0";
            $colorName = "Pastel Green";
            break;
        case "#b1ff6d":
            $backgroundColorClass = "custom-bg-b1ff6d";
            $colorName = "Apple Green";
            break;
        case "#7dff00":
            $backgroundColorClass = "custom-bg-7dff00";
            $colorName = "Neon Green";
            break;
        case "#00ff00":
            $backgroundColorClass = "custom-bg-00ff00";
            $colorName = "Green";
            break;

        case "#d2ff32":
            $backgroundColorClass = "custom-bg-d2ff32";
            $colorName = "Lime Green";
            break;
        case "#4baf00":
            $backgroundColorClass = "custom-bg-4baf00";
            $colorName = "Leaf Green";
            break;
        case "#649600":
            $backgroundColorClass = "custom-bg-649600";
            $colorName = "Moss Green";
            break;
        case "#00af4b":
            $backgroundColorClass = "custom-bg-00af4b";
            $colorName = "Emerald Green";
            break;

        case "#00ff7d":
            $backgroundColorClass = "custom-bg-00ff7d";
            $colorName = "Aqua Green";
            break;
        case "#009600":
            $backgroundColorClass = "custom-bg-009600";
            $colorName = "Dark Green";
            break;
        case "#006000":
            $backgroundColorClass = "custom-bg-006000";
            $colorName = "Deep Green";
            break;
        case "#004000":
            $backgroundColorClass = "custom-bg-004000";
            $colorName = "Forest Green";
            break;
        /**
        * !CYANS
        */
        case "#c0ffe0":
            $backgroundColorClass = "custom-bg-c0ffe0";
            $colorName = "Pale Mint";	
            break;
        case "#94ffe4":
            $backgroundColorClass = "custom-bg-94ffe4";
            $colorName = "Mint Ice";
            break;
        case "#00ffc0":
            $backgroundColorClass = "custom-bg-00ffc0";
        $colorName = "Tuquoise Cyan";
            break;
        case "#00ffff":
            $backgroundColorClass = "custom-bg-00ffff";
            $colorName = "Cyan";
            break;

        case "#7dffaf":
            $backgroundColorClass = "custom-bg-7dffaf";
            $colorName = "Pale Seafoam Cyan";
            break;
        case "#43a18a":
            $backgroundColorClass = "custom-bg-43a18a";
            $colorName = "Deep Cyan";
            break;
        case "#316d5f":
            $backgroundColorClass = "custom-bg-316d5f";
            $colorName = "Dark Cyan";
            break;
        case "#265449":
            $backgroundColorClass = "custom-bg-265449";
            $colorName = "Ocean Cyan";
            break;

        case "#009664":
            $backgroundColorClass = "custom-bg-009664";
            $colorName = "Forest Cyan";
            break;
        case "#007d7d":
            $backgroundColorClass = "custom-bg-007d7d";
            $colorName = "Dark Teal Cyan";
            break;
        case "#006060":
            $backgroundColorClass = "custom-bg-006060";
            $colorName = "Charcoal Cyan";
            break;
        case "#004040":
            $backgroundColorClass = "custom-bg-004040";
            $colorName = "Deep Ocean Cyan";
            break;
        /**
        * !BLUE
        */
        case "#a0ffff":
            $backgroundColorClass = "custom-bg-a0ffff";
            $colorName = "Sky Blue";
            break;
        case "#00c8ff":
            $backgroundColorClass = "custom-bg-00c8ff";
            $colorName = "Neon Blue";
            break;
        case "#007dff":
            $backgroundColorClass = "custom-bg-007dff";
            $colorName = "Strong Blue";
            break;
        case "#0000ff":
            $backgroundColorClass = "custom-bg-0000ff";
            $colorName = "Blue";
            break;

        case "#004baf":
            $backgroundColorClass = "custom-bg-004baf";
            $colorName = "Deep Blue";
            break;
        case "#000096":
            $backgroundColorClass = "custom-bg-000096";
            $colorName = "Navy Blue";
            break;
        case "#010770":
            $backgroundColorClass = "custom-bg-010770";
            $colorName = "Electric Blue";
            break;
        case "#000a4c":
            $backgroundColorClass = "custom-bg-000a4c";
            $colorName = "Dark Blue";
            break;

        case "#006496":
            $backgroundColorClass = "custom-bg-006496";
            $colorName = "Ocean Blue";
            break;
        case "#00496d":
            $backgroundColorClass = "custom-bg-00496d";
            $colorName = "Deep Ocean Blue";
            break;
        case "#00324c":
            $backgroundColorClass = "custom-bg-00324c";
            $colorName = "Midnight Blue";
            break;
        case "#002638":
            $backgroundColorClass = "custom-bg-002638";
            $colorName = "Blue Almost Black";
            break;
        /**
        * !PURPLE
        */
        case "#beb5ff":
            $backgroundColorClass = "custom-bg-beb5ff";
            $colorName = "Pastel Purple";
            break;
        case "#7d7dff":
            $backgroundColorClass = "custom-bg-7d7dff";
            $colorName = "Strong Purple";
            break;
        case "#7d00ff":
            $backgroundColorClass = "custom-bg-7d00ff";
            $colorName = "Purple";
            break;
        case "#640096":
            $backgroundColorClass = "custom-bg-640096";
            $colorName = "Deep Purple";
            break;

        case "#b680ff":
            $backgroundColorClass = "custom-bg-b680ff";
            $colorName = "Lavender Purple";
            break;
        case "#4b00af":
            $backgroundColorClass = "custom-bg-4b00af";
            $colorName = "Dark Purple";
            break;
        case "#3d068c":
            $backgroundColorClass = "custom-bg-3d068c";
            $colorName = "Deep Violet";
            break;
        case "#370860":
            $backgroundColorClass = "custom-bg-370860";
            $colorName = "Midnight Purple";
            break;

        case "#4d4d8f":
            $backgroundColorClass = "custom-bg-4d4d8f";
            $colorName = "Bluish Purple";
            break;
        case "#6f49a4":
            $backgroundColorClass = "custom-bg-6f49a4";
            $colorName = "Grape Purple";
            break;
        case "#54367f":
            $backgroundColorClass = "custom-bg-54367f";
            $colorName = "Dark Slate Purple";
            break;
        case "#422a63":
            $backgroundColorClass = "custom-bg-422a63";
            $colorName = "Wine Purple";
            break;
        /**
        * !PINK & PURPLE
        */
        case "#fcb5ff":
            $backgroundColorClass = "custom-bg-fcb5ff";
            $colorName = "Light Pink";
            break;
        case "#ff007d":
            $backgroundColorClass = "custom-bg-ff007d";
            $colorName = "Pink";
            break;
        case "#960064":
            $backgroundColorClass = "custom-bg-960064";
            $colorName = "Dark Pink";
            break;
        case "#66033e":
            $backgroundColorClass = "custom-bg-66033e";
            $colorName = "Intense Wine";
            break;

        case "#ff00ff":
            $backgroundColorClass = "custom-bg-ff00ff";
            $colorName = "Magenta";
            break;
        case "#b900ff":
            $backgroundColorClass = "custom-bg-b900ff";
            $colorName = "Bright Purple";
            break;
        case "#7d007d":
            $backgroundColorClass = "custom-bg-7d007d";
            $colorName = "Dark Magenta";
            break;
        case "#470134":
            $backgroundColorClass = "custom-bg-470134";
            $colorName = "Indigo Purple";
            break;

        case "#fa7fff":
            $backgroundColorClass = "custom-bg-fa7fff";
            $colorName = "Bright Lavender";
            break;
        case "#af57af":
            $backgroundColorClass = "custom-bg-af57af";
            $colorName = "Dark Lavender";
            break;
        case "#824382":
            $backgroundColorClass = "custom-bg-824382";
            $colorName = "Deep Lavender";
            break;
        case "#5e315e":
            $backgroundColorClass = "custom-bg-5e315e";
            $colorName = "Deep Lavender Dark";
            break;
        /**
        * !ADDITIONAL BLUES
        */
        case "#76bdff":
            $backgroundColorClass = "custom-bg-76bdff";
            $colorName = "Light Blue";
            break;
        case "#5080ad":
            $backgroundColorClass = "custom-bg-5080ad";
            $colorName = "Steel Blue";
            break;
        case "#335375":
            $backgroundColorClass = "custom-bg-335375";
            $colorName = "Petrol Blue";
            break;
        case "#233c56":
            $backgroundColorClass = "custom-bg-233c56";
            $colorName = "Night Blue";
            break;

        /**
        * !NEUTRALS
        */
        case "#ffffff":
            $backgroundColorClass = "custom-bg-ffffff";
            $textColorClass = "text-black";
            $iconClass = "http://localhost:10004/wp-content/uploads/2025/03/color-black.svg";
            $colorName = "White";
            break;
        case "#e0e0e0":
            $backgroundColorClass = "custom-bg-e0e0e0";
            $colorName = "Light Gray";
            break;
        case "#afafaf":
            $backgroundColorClass = "custom-bg-afafaf";
            $colorName = "Medium Gray";
            break;
        case "#808080":
            $backgroundColorClass = "custom-bg-808080";
            $colorName = "Dark Gray";
            break;
        case "#5a5a5a":
            $backgroundColorClass = "custom-bg-5a5a5a";
            $colorName = "Gray";
            break;
        case "#404040":
            $backgroundColorClass = "custom-bg-404040";
            $colorName = "Charcoal Gray";
            break;
        case "#000000":
            $backgroundColorClass = "custom-bg-000000";
            $colorName = "Black";
            break;
            default:
                // Llamamos a la función que busca el color más cercano
                return getClosestColorMatch(color, getColorHexClass);
        }
    
        return [$backgroundColorClass, $textColorClass, $iconClass, $colorName];
    };

// Luego las otras funciones
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

// Función para encontrar el color más cercano
export const getClosestColorMatch = (inputHex, getColorHexClassFn) => {
    if (!inputHex) return null;

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

    if (closest) {
        const [_, $textColorClass, $iconClass] = getColorHexClassFn(closest.hex) || ["", "text-white", "ColorIcon"];
        return [
            "custom-bg-dynamic", // Clase genérica
            $textColorClass,
            $iconClass,
            closest.name
        ];
    }

    return null;
};

const predefinedColors = [
    /**
    * !RED
    */
    { hex: "#fdd4ce", name: "Light Red" },
    { hex: "#ff7d7d", name: "Pastel Red" },
    { hex: "#ff3a3a", name: "Bright Red" },
    { hex: "#ff0000", name: "Red" },
    { hex: "#960000", name: "Dark Red" },
    { hex: "#700000", name: "Deep Red" },
    { hex: "#520200", name: "Wine Red" },
    { hex: "#380106", name: "Very Dark Red" },
    { hex: "#af004b", name: "Magenta Red" },
    { hex: "#804f4f", name: "Red Brown" },
    { hex: "#7a3535", name: "Burnt Red" },
    { hex: "#512424", name: "Earthy Red" },
    /**
    * !ORANGE
    */
    { hex: "#ffb972", name: "Soft Orange" },
    { hex: "#ffa040", name: "Warm Orange" },
    { hex: "#ff7d00", name: "Orange" },
    { hex: "#ff4b00", name: "Reddish Orange" },
    { hex: "#af4b00", name: "Dark Orange" },
    { hex: "#a36246", name: "Earth Orange" },
    { hex: "#754936", name: "Wood Orange" },
    { hex: "#563528", name: "Deep Orange" },
    { hex: "#963200", name: "Burnt Orange" },
    { hex: "#66311e", name: "Clay Orange" },
    { hex: "#5b2700", name: "Rust Orange" },
    { hex: "#472000", name: "Dark Orange" },
    /**
    * !YELLOW
    */        
    { hex: "#ffffc0", name: "Pastel Yellow" },
    { hex: "#fffa7f", name: "Light Yellow" },
    { hex: "#ffff00", name: "Yellow" },
    { hex: "#7d7d00", name: "Olive Yellow" },
    { hex: "#fde0a0", name: "Golden Yellow" },
    { hex: "#ffb900", name: "Deep Yellow" },
    { hex: "#966400", name: "Mustard Yellow" },
    { hex: "#50320e", name: "Yellow Brown" },
    { hex: "#cda576", name: "Sand Yellow" },
    { hex: "#a77b4d", name: "Clay Yellow" },
    { hex: "#6d5339", name: "Dark Yellow" },
    { hex: "#513e2a", name: "Earth Yellow" },
    /**
    * !GREEN
    */
    { hex: "#c0ffa0", name: "Pastel Green" },
    { hex: "#b1ff6d", name: "Apple Green" },
    { hex: "#7dff00", name: "Neon Green" },
    { hex: "#00ff00", name: "Green" },
    { hex: "#d2ff32", name: "Lime Green" },
    { hex: "#4baf00", name: "Leaf Green" },
    { hex: "#649600", name: "Moss Green" },
    { hex: "#00af4b", name: "Emerald Green" },
    { hex: "#00ff7d", name: "Aqua Green" },
    { hex: "#009600", name: "Dark Green" },
    { hex: "#006000", name: "Deep Green" },
    { hex: "#004000", name: "Forest Green" },
    /**
    * !CYANS
    */
    { hex: "#c0ffe0", name: "Pale Mint" },
    { hex: "#94ffe4", name: "Mint Ice" },
    { hex: "#00ffc0", name: "Tuquoise Cyan" },
    { hex: "#00ffff", name: "Cyan" },
    { hex: "#7dffaf", name: "Pale Seafoam Cyan" },
    { hex: "#43a18a", name: "Deep Cyan" },
    { hex: "#316d5f", name: "Dark Cyan" },
    { hex: "#265449", name: "Ocean Cyan" },
    { hex: "#009664", name: "Forest Cyan" },
    { hex: "#007d7d", name: "Dark Teal Cyan" },
    { hex: "#006060", name: "Charcoal Cyan" },
    { hex: "#004040", name: "Deep Ocean Cyan" },
    /**
    * !BLUE
    */
    { hex: "#a0ffff", name: "Sky Blue" },
    { hex: "#00c8ff", name: "Neon Blue" },
    { hex: "#007dff", name: "Strong Blue" },
    { hex: "#0000ff", name: "Blue" },
    { hex: "#004baf", name: "Deep Blue" },
    { hex: "#000096", name: "Navy Blue" },
    { hex: "#010770", name: "Electric Blue" },
    { hex: "#000a4c", name: "Dark Blue" },
    { hex: "#006496", name: "Ocean Blue" },
    { hex: "#00496d", name: "Deep Ocean Blue" },
    { hex: "#00324c", name: "Midnight Blue" },
    { hex: "#002638", name: "Blue Almost Black" },
    /**
    * !PURPLE
    */
    { hex: "#beb5ff", name: "Pastel Purple" },
    { hex: "#7d7dff", name: "Strong Purple" },
    { hex: "#7d00ff", name: "Purple" },
    { hex: "#640096", name: "Deep Purple" },
    { hex: "#b680ff", name: "Lavender Purple" },
    { hex: "#4b00af", name: "Dark Purple" },
    { hex: "#3d068c", name: "Deep Violet" },
    { hex: "#370860", name: "Midnight Purple" },
    { hex: "#4d4d8f", name: "Bluish Purple" },
    { hex: "#6f49a4", name: "Grape Purple" },
    { hex: "#54367f", name: "Dark Slate Purple" },
    { hex: "#422a63", name: "Wine Purple" },
    /**
    * !PINK & PURPLE
    */
    { hex: "#fcb5ff", name: "Light Pink" },
    { hex: "#ff007d", name: "Pink" },
    { hex: "#960064", name: "Dark Pink" },
    { hex: "#66033e", name: "Intense Wine" },
    { hex: "#ff00ff", name: "Magenta" },
    { hex: "#b900ff", name: "Bright Purple" },
    { hex: "#7d007d", name: "Dark Magenta" },
    { hex: "#470134", name: "Indigo Purple" },
    { hex: "#fa7fff", name: "Bright Lavender" },
    { hex: "#af57af", name: "Dark Lavender" },
    { hex: "#824382", name: "Deep Lavender" },
    { hex: "#5e315e", name: "Deep Lavender Dark" },
    /**
    * !ADITIONAL BLUES
    */
    { hex: "#76bdff", name: "Light Blue" },
    { hex: "#5080ad", name: "Steel Blue" },
    { hex: "#335375", name: "Petrol Blue" },
    { hex: "#233c56", name: "Night Blue" },
    /**
    * !NEUTRALS
    */
    { hex: "#ffffff", name: "White" },
    { hex: "#e0e0e0", name: "Light Gray" },
    { hex: "#afafaf", name: "Medium Gray" },
    { hex: "#808080", name: "Dark Gray" },
    { hex: "#5a5a5a", name: "Gray" },
    { hex: "#404040", name: "Charcoal Gray" },
    { hex: "#000000", name: "Black" }
];
