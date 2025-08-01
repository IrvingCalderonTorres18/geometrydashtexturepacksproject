export const getColorClass = (color) => {
    if (!color) return [""][""][""];

    const lowerColor = color.toLowerCase();
    let backgroundColorClass = "";
    let textColorClass = "";
    let iconClass = "ColorIcon"

    switch (lowerColor) {
        //RGB
        case "rgb":
            backgroundColorClass = "rgb-bg"; 
            break;
        case "transparent":
            backgroundColorClass = "bg-transparent";
            break;
        //RED
        case "light red":
            backgroundColorClass = "custom-bg-fdd4ce";
            break;
        case "pastel red":
            backgroundColorClass = "custom-bg-ff7d7d";
            break;
        case "bright red":
            backgroundColorClass = "custom-bg-ff3a3a";
            break;
        case "red":
            backgroundColorClass = "custom-bg-ff0000";
            break;

        case "dark red":
            backgroundColorClass = "custom-bg-960000";
            break;
        case "deep red":
            backgroundColorClass = "custom-bg-700000";
            break;
        case "wine red":
            backgroundColorClass = "custom-bg-520200";
            break;
        case "very dark red":
            backgroundColorClass = "custom-bg-380106";
            break;

        case "magenta red":
            backgroundColorClass = "custom-bg-af004b";
            break;
        case "red brown":
            backgroundColorClass = "custom-bg-804f4f";
            break;
        case "burnt red":
            backgroundColorClass = "custom-bg-7a3535";
            break;
        case "earthy red":
            backgroundColorClass = "custom-bg-512424";
            break;
        //ORANGE
        case "soft orange":
            backgroundColorClass = "custom-bg-ffb972";
            break;
        case "warm orange":
            backgroundColorClass = "custom-bg-ffa040";
            break;
        case "orange":
            backgroundColorClass = "custom-bg-ff7d00";
            break;
        case "reddish orange":
            backgroundColorClass = "custom-bg-ff4b00";
            break;

        case "dark orange":
            backgroundColorClass = "custom-bg-af4b00";
            break;
        case "earth orange":
            backgroundColorClass = "custom-bg-a36246";
            break;
        case "wood orange":
            backgroundColorClass = "custom-bg-754936";
            break;
        case "deep orange":
            backgroundColorClass = "custom-bg-563528";
            break;

        case "burnt orange":
            backgroundColorClass = "custom-bg-963200";
            break;
        case "clay orange":
            backgroundColorClass = "custom-bg-66311e";
            break;
        case "rust orange":
            backgroundColorClass = "custom-bg-5b2700";
            break;
        case "dark orange":
            backgroundColorClass = "custom-bg-472000";
            break;
        //YELLOW
        case "pastel yellow":
            backgroundColorClass = "custom-bg-ffffc0";
            textColorClass = "text-black";
            iconClass = "ColorIconBlack";
            break;
        case "light yellow":
            backgroundColorClass = "custom-bg-fffa7f";
            textColorClass = "text-black";
            iconClass = "ColorIconBlack";
            break;
        case "yellow":
            backgroundColorClass = "custom-bg-ffff00";
            textColorClass = "text-black";
            iconClass = "ColorIconBlack";
            break;
        case "olive yellow":
            backgroundColorClass = "custom-bg-7d7d00";
            break;

        case "golden yellow":
            backgroundColorClass = "custom-bg-fde0a0";
            break;
        case "deep yellow":
            backgroundColorClass = "custom-bg-ffb900";
            break;
        case "mustard yellow":
            backgroundColorClass = "custom-bg-966400";
            break;
        case "yellow brown":
            backgroundColorClass = "custom-bg-50320e";
            break;

        case "sand yellow":
            backgroundColorClass = "custom-bg-cda576";
            break;
        case "clay yellow":
            backgroundColorClass = "custom-bg-a77b4d";
            break;
        case "dark yellow":
            backgroundColorClass = "custom-bg-6d5339";
            break;
        case "earth yellow":
            backgroundColorClass = "custom-bg-513e2a";
            break;
        //GREEN
        case "pastel green":
            backgroundColorClass = "custom-bg-c0ffa0";
            break;
        case "apple green":
            backgroundColorClass = "custom-bg-b1ff6d";
            break;
        case "neon green":
            backgroundColorClass = "custom-bg-7dff00";
            break;
        case "green":
            backgroundColorClass = "custom-bg-00ff00";
            break;

        case "lime green":
            backgroundColorClass = "custom-bg-d2ff32";
            break;
        case "leaf green":
            backgroundColorClass = "custom-bg-4baf00";
            break;
        case "moss green":
            backgroundColorClass = "custom-bg-649600";
            break;
        case "emerald green":
            backgroundColorClass = "custom-bg-00af4b";
            break;
            
        case "aqua green":
            backgroundColorClass = "custom-bg-00ff7d";
            break;
        case "dark green":
            backgroundColorClass = "custom-bg-009600";
            break;
        case "deep green":
            backgroundColorClass = "custom-bg-006000";
            break;
        case "forest green":
            backgroundColorClass = "custom-bg-004000";
            break;

        //CYANS
        case "pale mint":
            backgroundColorClass = "custom-bg-c0ffe0";
            break;
        case "mint ice":
            backgroundColorClass = "custom-bg-94ffe4";
            break;
        case "tuquoise cyan":
            backgroundColorClass = "custom-bg-00ffc0";
            break;
        case "cyan":
            backgroundColorClass = "custom-bg-00ffff";
            break;

        case "pale seafoam cyan":
            backgroundColorClass = "custom-bg-7dffaf";
            break;
        case "deep cyan":
            backgroundColorClass = "custom-bg-43a18a";
            break;
        case "dark cyan":
            backgroundColorClass = "custom-bg-316d5f";
            break;
        case "ocean cyan":
            backgroundColorClass = "custom-bg-265449";
            break;

        case "forest cyan":
            backgroundColorClass = "custom-bg-009664";
            break;
        case "dark teal cyan":
            backgroundColorClass = "custom-bg-007d7d";
            break;
        case "charcoal cyan":
            backgroundColorClass = "custom-bg-006060";
            break;
        case "deep ocean cyan":
            backgroundColorClass = "custom-bg-004040";
            break;
        //BLUE
        case "sky blue":
            backgroundColorClass = "custom-bg-a0ffff";
            break;
        case "neon blue":
            backgroundColorClass = "custom-bg-00c8ff";
            break;
        case "strong blue":
            backgroundColorClass = "custom-bg-007dff";
            break;
        case "blue":
            backgroundColorClass = "custom-bg-0000ff";
            break;

        case "deep blue":
            backgroundColorClass = "custom-bg-004baf";
            break;
        case "navy blue":
            backgroundColorClass = "custom-bg-000096";
            break;
        case "electric blue":
            backgroundColorClass = "custom-bg-010770";
            break;
        case "dark blue":
            backgroundColorClass = "custom-bg-000a4c";
            break;

        case "ocean blue":
            backgroundColorClass = "custom-bg-006496";
            break;
        case "deep ocean blue":
            backgroundColorClass = "custom-bg-00496d";
            break;
        case "midnight blue":
            backgroundColorClass = "custom-bg-00324c";
            break;
        case "blue almost black":
            backgroundColorClass = "custom-bg-002638";
            break;
        //PURPLE
        case "pastel purple":
            backgroundColorClass = "custom-bg-beb5ff";
            break;
        case "strong purple":
            backgroundColorClass = "custom-bg-7d7dff";
            break;
        case "purple":
            backgroundColorClass = "custom-bg-7d00ff";
            break;
        case "deep purple":
            backgroundColorClass = "custom-bg-640096";
            break;

        case "lavender purple":
            backgroundColorClass = "custom-bg-b680ff";
            break;
        case "dark purple":
            backgroundColorClass = "custom-bg-4b00af";
            break;
        case "deep violet":
            backgroundColorClass = "custom-bg-3d068c";
            break;
        case "midnight purple":
            backgroundColorClass = "custom-bg-370860";
            break;

        case "bluish purple":
            backgroundColorClass = "custom-bg-4d4d8f";
            break;
        case "grape purple":
            backgroundColorClass = "custom-bg-6f49a4";
            break;
        case "dark slate purple":
            backgroundColorClass = "custom-bg-54367f";
            break;
        case "wine purple":
            backgroundColorClass = "custom-bg-422a63";
            break;
        //PINK & PURPLE
        case "light pink":
            backgroundColorClass = "custom-bg-fcb5ff";
            break;
        case "pink":
            backgroundColorClass = "custom-bg-ff007d";
            break;
        case "dark pink":
            backgroundColorClass = "custom-bg-960064";
            break;
        case "intense wine":
            backgroundColorClass = "custom-bg-66033e";
            break;

        case "magenta":
            backgroundColorClass = "custom-bg-ff00ff";
            break;
        case "bright purple":
            backgroundColorClass = "custom-bg-b900ff";
            break;
        case "dark magenta":
            backgroundColorClass = "custom-bg-7d007d";
            break;
        case "indigo purple":
            backgroundColorClass = "custom-bg-470134";
            break;

        case "bright lavender":
            backgroundColorClass = "custom-bg-fa7fff";
            break;
        case "dark lavender":
            backgroundColorClass = "custom-bg-af57af";
            break;
        case "deep lavender":
            backgroundColorClass = "custom-bg-824382";
            break;
        case "deep lavender dark":
            backgroundColorClass = "custom-bg-5e315e";
            break;
        //ADITIONAL BLUES
        case "light blue":
            backgroundColorClass = "custom-bg-76bdff";
            break;
        case "steel blue":
            backgroundColorClass = "custom-bg-5080ad";
            break;
        case "petrol blue":
            backgroundColorClass = "custom-bg-335375";
            break;
        case "night blue":
            backgroundColorClass = "custom-bg-233c56";
            break;
        //NEUTRALS
        case "white":
            backgroundColorClass = "custom-bg-ffffff";
            textColorClass = "text-black";
            iconClass = "ColorIconBlack";
            break;
        case "light gray":
            backgroundColorClass = "custom-bg-e0e0e0";
            break;
        case "medium gray":
            backgroundColorClass = "custom-bg-afafaf";
            break;
        case "dark gray":
            backgroundColorClass = "custom-bg-808080";
            break;
        case "gray":
            backgroundColorClass = "custom-bg-5a5a5a";
            break;
        case "charcoal gray":
            backgroundColorClass = "custom-bg-404040";
            break;
        case "black":
            backgroundColorClass = "custom-bg-000000";   
            break;
        }

        return [backgroundColorClass, textColorClass, iconClass]; // Regresa las clases de color y el icono
    };