// *https://colornames.org/
// *https://app.writesonic.com/chat/c2f69b2a-1d51-4d2a-a114-8aaaf5495451
// *https://coolors.co/
const predefinedColors = [
    /**
    * !RED
    */
    { hex: "#fdd4ce", name: "Pale Dogwood" },
    { hex: "#ff7d7d", name: "Light Red" },
    { hex: "#ff3a3a", name: "Vermilion" },
    { hex: "#ff0000", name: "Red" },
    { hex: "#960000", name: "Penn Red" },
    { hex: "#700000", name: "Blood Red" },
    { hex: "#520200", name: "Rosewood" },
    { hex: "#380106", name: "Black Bean" },
    { hex: "#af004b", name: "Amaranth Purple" },
    { hex: "#804f4f", name: "Rose Taupe" },
    { hex: "#7a3535", name: "Garnet" },
    { hex: "#512424", name: "Caput Mortuum" },
    /**
    * !ORANGE
    */
    { hex: "#ffb972", name: "Fawn" },
    { hex: "#ffa040", name: "Sandy Brown" },
    { hex: "#ff7d00", name: "Orange" },
    { hex: "#ff4b00", name: "Aerospace Orange" },
    { hex: "#af4b00", name: "Burnt Orange" },
    { hex: "#a36246", name: "Brown Sugar" },
    { hex: "#754936", name: "Coffee" },
    { hex: "#563528", name: "Caput Mortuum" },
    { hex: "#963200", name: "Brown" },
    { hex: "#66311e", name: "Seal Brown" },
    { hex: "#5b2700", name: "Coffee Bean" },
    { hex: "#472000", name: "Very Dark Orange" },
    /**
    * !YELLOW
    */        
    { hex: "#ffffc0", name: "Cream" },
    { hex: "#fffa7f", name: "Icterine" },
    { hex: "#ffff00", name: "Yellow" },
    { hex: "#7d7d00", name: "Olive" },
    { hex: "#fde0a0", name: "Peach Yellow" },
    { hex: "#ffb900", name: "Selective Yellow" },
    { hex: "#966400", name: "Golden Brown" },
    { hex: "#50320e", name: "Cafe Noir" },
    { hex: "#cda576", name: "Lion" },
    { hex: "#a77b4d", name: "Chamoisee" },
    { hex: "#6d5339", name: "Light Coffee" },
    { hex: "#513e2a", name: "Fudge Brownie" },
    /**
    * !GREEN
    */
    { hex: "#c0ffa0", name: "Light Green" },
    { hex: "#b1ff6d", name: "Green Yellow" },
    { hex: "#7dff00", name: "Chartreuse" },
    { hex: "#00ff00", name: "Green" },
    { hex: "#d2ff32", name: "Lime" },
    { hex: "#4baf00", name: "Kelly Green" },
    { hex: "#649600", name: "Avocado" },
    { hex: "#00af4b", name: "Pigment Green" },
    { hex: "#00ff7d", name: "Spring Green" },
    { hex: "#009600", name: "Forest Green" },
    { hex: "#006000", name: "Dartmouth Green" },
    { hex: "#004000", name: "Pakistan Green" },
    /**
    * !CYANS
    */
    { hex: "#c0ffe0", name: "Pale Mint" },
    { hex: "#94ffe4", name: "Aquamarine" },
    { hex: "#00ffc0", name: "Tuquoise Cyan" },
    { hex: "#00ffff", name: "Cyan" },
    { hex: "#7dffaf", name: "Pale Seafoam Cyan" },
    { hex: "#43a18a", name: "Zomp" },
    { hex: "#316d5f", name: "Hooker's Green" },
    { hex: "#265449", name: "Brunswick Green" },
    { hex: "#009664", name: "Shamrock Green" },
    { hex: "#007d7d", name: "Teal" },
    { hex: "#006060", name: "Caribbean Current" },
    { hex: "#004040", name: "Midnight Green" },
            /**
    * !BLUE
    */
    { hex: "#a0ffff", name: "Ice Blue" },
    { hex: "#00c8ff", name: "Vivid Sky Blue" },
    { hex: "#007dff", name: "Azure" },
    { hex: "#0000ff", name: "Blue" },
    { hex: "#004baf", name: "Cobalt Blue" },
    { hex: "#000096", name: "Duke Blue" },
    { hex: "#010770", name: "Navy Blue" },
    { hex: "#000a4c", name: "Federal Blue" },
    { hex: "#006496", name: "Lapis Lazuli" },
    { hex: "#00496d", name: "Indigo Dye" },
    { hex: "#00324c", name: "Midnight Blue" },
    { hex: "#002638", name: "Prussian Blue" },
    /**
     * !PURPLE
    */
    { hex: "#beb5ff", name: "Periwinkle" },
    { hex: "#7d7dff", name: "Tropical Indigo" },
    { hex: "#7d00ff", name: "Violet" },
    { hex: "#640096", name: "Indigo" },
    { hex: "#b680ff", name: "Lavender" },
    { hex: "#4b00af", name: "Dark Purple" },
    { hex: "#3d068c", name: "Deep Violet" },
    { hex: "#370860", name: "Persian Indigo" },
    { hex: "#4d4d8f", name: "Ultra Violet" },
    { hex: "#6f49a4", name: "Royal Purple" },
    { hex: "#54367f", name: "Tekhelet" },
    { hex: "#422a63", name: "Russian Violet" },
    /**
     * !PINK & PURPLE
    */
    { hex: "#fcb5ff", name: "Mauve" },
    { hex: "#ff007d", name: "Rose" },
    { hex: "#960064", name: "Murrey" },
    { hex: "#66033e", name: "Tyrian Purple" },
    { hex: "#ff00ff", name: "Fuchsia" },
    { hex: "#b900ff", name: "Electric Purple" },
    { hex: "#7d007d", name: "Purple" },
    { hex: "#470134", name: "Tyrian Purple" },
    { hex: "#fa7fff", name: "Ultra Pink" },
    { hex: "#af57af", name: "Purpureus" },
    { hex: "#824382", name: "Plum" },
    { hex: "#5e315e", name: "Japanese Violet" },
    /**
     * !ADITIONAL BLUES
    */
    { hex: "#76bdff", name: "Maya Blue" },
    { hex: "#5080ad", name: "Steel Blue" },
    { hex: "#335375", name: "YInMn Blue" },
    { hex: "#233c56", name: "Night Blue" },
    /**
     * !NEUTRALS
    */
    { hex: "#ffffff", name: "White" },
    { hex: "#e0e0e0", name: "Platinum" },
    { hex: "#afafaf", name: "Silver" },
    { hex: "#808080", name: "Gray" },
    { hex: "#5a5a5a", name: "Stone Cold Gray" },
    { hex: "#404040", name: "Onyx" },
    { hex: "#000000", name: "Black" }
];

// Mapa para lookup rápido
const colorMap = new Map(predefinedColors.map((c) => [c.hex.toLowerCase(), c]));

export const getColorHexClass = (color) => {
    if (!color) return ["", "", "", ""];

    const lowerColor = color.toLowerCase();
    let textColorClass = "";
    let iconClass = "ColorIcon";
    let colorName = "";

    switch (lowerColor) {
        case "rgb":
            return ["rgb-bg", "", "ColorIcon", "RGB"];
        case "transparent":
            return ["bg-transparent", "", "ColorIcon", "Transparent"];
        default:
            const match = colorMap.get(lowerColor);
                if (match) {
                    colorName = match.name;
                if (["#ffffff", '#fdd4ce', '#fffa7f',"#ffff00", "#ffffc0"].includes(lowerColor)) {
                    textColorClass = "text-black";
                    iconClass = "ColorIconBlack";
                }
            return ["custom-bg-dynamic", textColorClass, iconClass, colorName];
        } else {
            return getClosestColorMatch(color, getColorHexClass);
        }
    }
};

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
        const [_, textColorClass, iconClass] = getColorHexClassFn(closest.hex) || ["", "text-white", "ColorIcon"];
        return ["custom-bg-dynamic", textColorClass, iconClass, closest.name];
    }

        return null;
};