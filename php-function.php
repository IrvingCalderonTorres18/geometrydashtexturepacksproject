<?php

    /**
    * * Extracción de campos
    * * *****************************
    */

$campos = [
    'author',
    'author_acf',
    'principal_colour',
    'secondary_color',
    'tertiary_color',
    'versiones',      // ARRAY
    'version_mod',
    'platforms',      // ARRAY
    'graphics',       // ARRAY
    'type',           // ARRAY
    'style',          // ARRAY
    'level',
    'geode',
    'type_classic',
    'category',
    'paid',
    'color_1',
    'color_2',
    'color_3',
    'numtop',
    'article_type',
    'resource_type',
    'tutorial_type'
];

    /**
    * * Función para traer SVG's localmente y no depender de un http
    * * *****************************
    */
function get_inline_svg_by_name($filename) {
    static $svg_cache = [];

    if (isset($svg_cache[$filename])) {
        return $svg_cache[$filename];
    }

    $path = WP_CONTENT_DIR . '/uploads/svg/' . $filename;

    if (file_exists($path)) {
        $svg_content = trim(file_get_contents($path));
        $svg_cache[$filename] = $svg_content;
        return $svg_content;
    }

    $svg_cache[$filename] = '<!-- SVG no encontrado: ' . esc_html($filename) . ' -->';
    return $svg_cache[$filename];
}



function get_svg_with_class($filename, $class) {
    $svg = get_inline_svg_by_name($filename);

    if (strpos($svg, '<svg') !== false) {
        // Si ya tiene atributo class, agregamos la clase extra, si no, la añadimos
        if (preg_match('/<svg\b([^>]*)class=["\']([^"\']*)["\']([^>]*)>/i', $svg, $matches)) {
            $existing_classes = $matches[2];
            $new_classes = trim($existing_classes . ' ' . $class);
            $svg = preg_replace(
                '/(<svg\b[^>]*class=["\'])([^"\']*)(["\'][^>]*>)/i',
                '$1' . esc_attr($new_classes) . '$3',
                $svg
            );
        } else {
            // No tiene clase, agregamos el atributo completo
            $svg = preg_replace(
                '/<svg\b([^>]*)>/i',
                '<svg$1 class="' . esc_attr($class) . '">',
                $svg
            );
        }
    }

    return $svg;
}


    /**
    * * Impresión de título y autor
    * * *****************************
    */
// Mostrar el título de la entrada
echo '<div class="flex flex-wrap gap-2 items-center">';
echo '<h1 class="text-[20px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-none title-block m-0 p-0" style="color:#7DFF00;">' . get_the_title() . '</h1>';
echo '</div>';




// Obtener todos los campos ACF de una sola vez al inicio
$acf_fields = get_fields(); // Obtiene todos los campos ACF del post actual

function format_author_acf($acf_fields) {
    $valor = isset($acf_fields['author_acf']) ? trim($acf_fields['author_acf']) : '';
    if (!empty($valor)) {
        $autores = array_map('trim', explode(',', $valor));
        return $autores; // Devuelve un array de autores
    } else {
        $author_name = isset($acf_fields['author']) ? trim($acf_fields['author']) : '';
        return !empty($author_name) ? [$author_name] : []; // Devuelve un array con un solo autor o vacío
    }
}

$autores_formateados = format_author_acf($acf_fields);

if (!empty($autores_formateados)) {
    $autores_texto = count($autores_formateados) > 1
        ? implode(', ', array_slice($autores_formateados, 0, -1)) . ' & ' . end($autores_formateados)
        : $autores_formateados[0];

    echo '<div class="flex flex-wrap gap-2 items-center">';
    echo '<h2 class="font-bold text-[18px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-none author-block m-0 p-0" style="color:#00FFFF;">By ' . esc_html($autores_texto) . '</h2>';
    echo '</div>';
}

    /**
    * * Impresión categoría
    * * *****************************
    */
// Obtener la categoría de la entrada
$categorias = get_the_category();
if (!empty($categorias)) {
    $categoria_nombre = esc_html($categorias[0]->name); // Toma la primera categoría

    $svg_filename = 'graphics.svg'; // Puedes cambiar este nombre según tu lógica

    $svg_content = get_inline_svg_by_name($svg_filename);

    // Añadir clases al SVG (solo si fue encontrado correctamente)
    if (strpos($svg_content, '<svg') !== false) {
        $svg_content = preg_replace(
            '/<svg\b([^>]*)>/',
            '<svg$1 class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9">',
            $svg_content
        );
    }

    echo '<div class="flex flex-wrap items-center gap-2 category-block">';
    echo $svg_content;
    echo '<span class="flex items-center font-bold text-white text-[15px] sm:text-[20px] md:text-[23px] lg:text-[28px] -ml-[3px]">' . $categoria_nombre . '</span>';
    echo '</div>';
}


    /**
    * * Impresión de fecha date-modified Campo ACF
    * * *****************************
    */
$date_modified = get_field('date-modified');

if ($date_modified) {
    $zona_horaria = new DateTimeZone('America/Mexico_City');
    $date = DateTime::createFromFormat('d/m/Y h:i a', $date_modified, $zona_horaria);

    if ($date) {
        $now = new DateTime('now', $zona_horaria);
        $seconds = $now->getTimestamp() - $date->getTimestamp();

        if ($seconds < 60) {
            $time_ago = 'Now';
        } elseif ($seconds < 3600) {
            $minutes = floor($seconds / 60);
            $time_ago = $minutes . ' minute' . ($minutes > 1 ? 's' : '') . ' ago';
        } elseif ($seconds < 86400) {
            $hours = floor($seconds / 3600);
            $time_ago = $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
        } elseif ($seconds < 604800) {
            $days = floor($seconds / 86400);
            $time_ago = ($days == 1) ? 'a day ago' : $days . ' days ago';
        } elseif ($seconds < 2592000) {
            $weeks = floor($seconds / 604800);
            $time_ago = ($weeks == 1) ? 'a week ago' : $weeks . ' weeks ago';
        } elseif ($seconds < 31536000) {
            $months = floor($seconds / 2592000);
            $time_ago = ($months == 1) ? 'a month ago' : $months . ' months ago';
        } else {
            $years = floor($seconds / 31536000);
            $time_ago = ($years == 1) ? 'a year ago' : $years . ' years ago';
        }

        $fecha_formateada = esc_html($date->format('F j, Y'));

        echo '<div class="responsive-date responsive-date-2 text-white/70 xl:text-sm lg:text-xs md:text-[0.5rem] sm:text-[0.44rem] flex items-center mb-1">';
        
        // Aquí insertamos el SVG inline con clases para el icono
        echo get_svg_with_class('updatetime.svg', 'inline align-middle mr-1.5 opacity-50 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6');
        
        echo $fecha_formateada . ' (' . $time_ago . ')';
        echo '</div>';
    }
}


    /**
    * * Impresión de fecha Wordpress Base
    * * *****************************
    */
$fecha_wp = get_the_date(DATE_ATOM);

if ($fecha_wp) {
    $zona_horaria = new DateTimeZone('America/Mexico_City');
    $date = new DateTime($fecha_wp);
    $date->setTimezone($zona_horaria);

    $now = new DateTime('now', $zona_horaria);
    $seconds = $now->getTimestamp() - $date->getTimestamp();

    if ($seconds < 60) {
        $time_ago = 'Now';
    } elseif ($seconds < 3600) {
        $minutes = floor($seconds / 60);
        $time_ago = $minutes . ' minute' . ($minutes > 1 ? 's' : '') . ' ago';
    } elseif ($seconds < 86400) {
        $hours = floor($seconds / 3600);
        $time_ago = $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
    } elseif ($seconds < 604800) {
        $days = floor($seconds / 86400);
        $time_ago = ($days == 1) ? 'a day ago' : $days . ' days ago';
    } elseif ($seconds < 2592000) {
        $weeks = floor($seconds / 604800);
        $time_ago = ($weeks == 1) ? 'a week ago' : $weeks . ' weeks ago';
    } elseif ($seconds < 31536000) {
        $months = floor($seconds / 2592000);
        $time_ago = ($months == 1) ? 'a month ago' : $months . ' months ago';
    } else {
        $years = floor($seconds / 31536000);
        $time_ago = ($years == 1) ? 'a year ago' : $years . ' years ago';
    }

    $fecha_formateada = esc_html($date->format('F j, Y'));

    echo '<div class="responsive-date responsive-date-3 text-white/70 xl:text-sm lg:text-xs md:text-[0.5rem] sm:text-[0.44rem] flex items-center mb-1">';
    
    echo get_svg_with_class('svgupload.svg', 'inline align-middle mr-1.5 opacity-50 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6');
    
    echo $fecha_formateada . ' (' . $time_ago . ')';
    echo '</div>';
}


    /**
    * * Impresión de estrellas de rating
    * * *****************************
    */
$rating = get_field('rating');

if (!empty($rating) && is_numeric($rating)) {
    // Definir el máximo de estrellas
    $max_stars = ($rating == 6 || $rating == 7) ? $rating : 5;

    // Calcular estrellas llenas, medias y vacías
    $filled_stars = ($rating == 6 || $rating == 7) ? $rating : floor($rating);
    $half_star = ($rating < 6 && ($rating - $filled_stars) >= 0.5) ? 1 : 0;
    $empty_stars = $max_stars - ($filled_stars + $half_star);

    // Contenedor del rating
    echo '<div class="acf-group rating-group">';
    echo '<div class="rating-stars" style="display: flex; gap: 0.25rem;">';

    // Clases para colores especiales
    $color_class = '';
    if ($rating == 6) {
        $color_class = 'blue-stars';  // Puedes definir el color en CSS
    } elseif ($rating == 7) {
        $color_class = 'pink-stars';
    }

    // Estilos base para los SVG (puedes personalizar)
    $base_class = 'rating-star'; // para estilos CSS

    // Imprimir estrellas llenas
    for ($i = 0; $i < $filled_stars; $i++) {
        echo get_svg_with_class('star-filled.svg', trim("$base_class filled $color_class"));
    }

    // Imprimir media estrella si corresponde
    if ($half_star) {
        echo get_svg_with_class('star-half.svg', trim("$base_class half $color_class"));
    }

    // Imprimir estrellas vacías
    for ($i = 0; $i < $empty_stars; $i++) {
        echo get_svg_with_class('star-empty.svg', trim("$base_class empty $color_class"));
    }

    echo '</div>'; // Cierre del contenedor de estrellas
    echo '</div>'; // Cierre del contenedor principal
}


    /**
    * * Impresión del Excerpt
    * * *****************************
    */
// Mostrar el excerpt debajo del autor con límite de 255 caracteres
$excerpt = get_the_excerpt();
if (!empty($excerpt)) {
    $excerpt_limitado = wp_trim_words($excerpt, 40, '...'); // Limitar a 40 palabras el excerpt
    echo '<div class="flex flex-wrap gap-2">';
    echo '<p class="acf-excerpt text-[16px] xl:text-[14px] lg:text-[12px] md:text-[10px] sm:text-[8px] max-sm:text-[7px] text-white/70 excerpt-block m-0 p-0">' . esc_html($excerpt_limitado) . (strlen($excerpt) > 255 ? '...' : '') . '</p>';
    echo '</div>';
}

    /**
    * * Impresión de campos ACF Buttons / ACFFieldsDisplay
    * * *****************************
    */
function render_acf_buttons($campos, $acf_fields) {
    $output = '';
    $tipos_especiales = [
        "Top 10 Epic Texture Packs",
        "Top 5 Best Icon Texture Packs",
        "Top 5 Full Android Texture Packs",
        "Top 5 Massive Icon Texture Packs",
        "Top 5 Of My Best Texture Packs",
        "Top 5 Best Minimalist Texture Packs",
        "Top 5 Best Neon Texture Packs",
        "Top 5 Anime Texture Packs",
        "Top 5 Best Guitar Hero Styles Texture Packs",
        "Top 10 Best Texture Packs Of The Year",
        "Texture Pack RGB Series"
    ];
    $icon_map = [
        'versiones' => 'version.svg',
        'platforms' => [
            'pc' => 'platform.svg',
            'android hack' => 'android.svg',
            'android' => 'android.svg',
            'windows' => 'windows.svg',
            'macos' => 'macos.svg',
        ],
        'type' => [
            'menu' => 'menu.svg',
            'icons' => 'icons.svg',
            'article' => 'article.svg',
            'tutorial' => 'tutorial.svg',
            'resource' => 'resource.svg',
        ],
        'graphics' => 'graphics.svg',
        'style' => 'texture.svg',
        'top_type' => 'trophy1.svg',
    ];
    foreach ($campos as $campo) {
        $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : null;
        if (!empty($valor) && $valor !== ": (dejar vacío)") {
            if (in_array($campo, ['versiones', 'platforms', 'type']) && !is_array($valor)) {
                $valor = [$valor];
            }
            if (is_array($valor)) {
                foreach ($valor as $item) {
                    if ($item !== ": (dejar vacío)") {
                        $svg_file = '';
                        switch ($campo) {
                            case 'versiones':
                                $svg_file = $icon_map['versiones'];
                                break;
                            case 'platforms':
                                $key = strtolower($item);
                                if (isset($icon_map['platforms'][$key])) {
                                    $svg_file = $icon_map['platforms'][$key];
                                }
                                break;
                            case 'type':
                                if (in_array($item, $tipos_especiales)) {
                                    $svg_file = $icon_map['top_type'];
                                } else {
                                    $key = strtolower($item);
                                    if (isset($icon_map['type'][$key])) {
                                        $svg_file = $icon_map['type'][$key];
                                    }
                                }
                                break;
                            case 'graphics':
                                $svg_file = $icon_map['graphics'];
                                break;
                            case 'style':
                                $svg_file = $icon_map['style'];
                                break;
                        }
                        $output .= '<button class="acf-button" style="">';
                        if (!empty($svg_file)) {
                            $output .= get_svg_with_class($svg_file, '');
                        }
                        $output .= esc_html($item);
                        $output .= '</button>';
                    }
                }
            } else {
                $output .= '<button class="acf-button">';
                $output .= esc_html($valor);
                $output .= '</button>';
            }
        }
    }
    if (!empty($output)) {
        echo $output;
    }
}


    /**
    * * Impresión de autores ACF (Varios autores MORE)
    * * *****************************
    */
function render_acf_author($campo, $acf_fields) {
    $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = '';
    if (empty($valor)) {
        $valor = isset($acf_fields['author']) ? $acf_fields['author'] : '';
    }
    if (!empty($valor)) {
        $autor_icon_svg = get_svg_with_class('user.svg', 'author-icon-svg');
        $autores = array_map('trim', explode(',', $valor));
        foreach ($autores as $autor) {
            if (!empty($autor)) {
                $output .= '<button class="acf-button">';
                $output .= $autor_icon_svg;
                $output .= esc_html($autor);
                $output .= '</button>';
            }
        }
    }
    echo $output;
}

    /**
    * * Impresión de campos ACF Texture Pack Level
    * * *****************************
    */
// Función para obtener la clase extra basada en el valor de 'level'
function obtener_clase_level($valor) {
    $clase_adicional = ''; // Inicializamos la clase adicional

    switch (strtolower($valor)) {
        case 'standard':
            $clase_adicional = 'standard';
            break;
        case 'enhanced':
            $clase_adicional = 'enhanced';
            break;
        case 'epic':
            $clase_adicional = 'epic';
            break;
        case 'ultra':
            $clase_adicional = 'ultra';
            break;
        case 'mythic':
                $clase_adicional = 'mythic';
            break;
        case 'legendary':
            $clase_adicional = 'legendary';
            break;

        // Puedes agregar más casos según tus necesidades

        default:
            // Si no hay clase definida, retornamos una cadena vacía
            $clase_adicional = '';
            break;
    }

    return $clase_adicional;
}

    /**
    * * Renderización de botones especiales (Level & Geode)
    * * *****************************
    */
// Modificar render_special_buttons para que reciba la clase adicional
function render_special_buttons($campo, $svg_src, $class, $acf_fields) {
    $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = '';
    if (!empty($valor) && $valor !== ": (dejar vacío)") {
        $clase_adicional = obtener_clase_level($valor);
        if (!empty($clase_adicional)) {
            $class .= ' ' . $clase_adicional;
        }
        $output .= '<button class="' . esc_attr($class) . '">';
        $output .= get_inline_svg_by_name($svg_src);
        $output .= esc_html($valor);
        $output .= '</button>';
    }
    echo $output;
}


/*
!importante para los tags
// Agregar la sección de Tags con el nuevo SVG (blanco)
$tags = get_the_tags();
if ($tags) {
    echo '<div class="acf-group tags-group">';
    foreach ($tags as $tag) {
        echo '<button class="tag-bg">';
        echo '<img src="http://localhost:10004/wp-content/uploads/2025/03/tag.svg" width="20" height="20" style="tag-icon vertical-align: text-bottom;" alt="Tag Icon" />';
        echo esc_html($tag->name);
        echo '</button>';
    }
    echo '</div>';
}

*/
        /**
        * * FUNCION DE COLORES 1, 2 y 3
        */
function obtener_colores_predefinidos() {
    return [
        /**
        * !RED
        */
        ["hex" => "#fdd4ce", "name" => "Pale Dogwood"],
        ["hex" => "#ff7d7d", "name" => "Light Red"],
        ["hex" => "#ff3a3a", "name" => "Vermilion"],
        ["hex" => "#ff0000", "name" => "Red"],
        ["hex" => "#960000", "name" => "Penn Red"],
        ["hex" => "#700000", "name" => "Blood Red"],
        ["hex" => "#520200", "name" => "Rosewood"],
        ["hex" => "#380106", "name" => "Black Bean"],
        ["hex" => "#af004b", "name" => "Amaranth Purple"],
        ["hex" => "#804f4f", "name" => "Rose Taupe"],
        ["hex" => "#7a3535", "name" => "Garnet"],
        ["hex" => "#512424", "name" => "Caput Mortuum"],
        /**
        * !ORANGE
        */
        ["hex" => "#ffb972", "name" => "Fawn"],
        ["hex" => "#ffa040", "name" => "Sandy Brown"],
        ["hex" => "#ff7d00", "name" => "Orange"],
        ["hex" => "#ff4b00", "name" => "Aerospace Orange"],
        ["hex" => "#af4b00", "name" => "Burnt Orange"],
        ["hex" => "#a36246", "name" => "Brown Sugar"],
        ["hex" => "#754936", "name" => "Coffee"],
        ["hex" => "#563528", "name" => "Caput Mortuum"],
        ["hex" => "#963200", "name" => "Brown"],
        ["hex" => "#66311e", "name" => "Seal Brown"],
        ["hex" => "#5b2700", "name" => "Coffee Bean"],
        ["hex" => "#472000", "name" => "Very Dark Orange"],
        /**
        * !YELLOW
        */   
        ["hex" => "#ffffc0", "name" => "Cream"],
        ["hex" => "#fffa7f", "name" => "Icterine"],
        ["hex" => "#ffff00", "name" => "Yellow"],
        ["hex" => "#7d7d00", "name" => "Olive"],
        ["hex" => "#fde0a0", "name" => "Peach Yellow"],
        ["hex" => "#ffb900", "name" => "Selective Yellow"],
        ["hex" => "#966400", "name" => "Golden Brown"],
        ["hex" => "#50320e", "name" => "Cafe Noir"],
        ["hex" => "#cda576", "name" => "Lion"],
        ["hex" => "#a77b4d", "name" => "Chamoisee"],
        ["hex" => "#6d5339", "name" => "Light Coffee"],
        ["hex" => "#513e2a", "name" => "Fudge Brownie"],
        /**
        * !GREEN
        */        
        ["hex" => "#c0ffa0", "name" => "Light Green"],
        ["hex" => "#b1ff6d", "name" => "Green Yellow"],
        ["hex" => "#7dff00", "name" => "Chartreuse"],
        ["hex" => "#00ff00", "name" => "Green"],
        ["hex" => "#d2ff32", "name" => "Lime"],
        ["hex" => "#4baf00", "name" => "Kelly Green"],
        ["hex" => "#649600", "name" => "Avocado"],
        ["hex" => "#00af4b", "name" => "Pigment Green"],
        ["hex" => "#00ff7d", "name" => "Spring Green"],
        ["hex" => "#009600", "name" => "Forest Green"],
        ["hex" => "#006000", "name" => "Dartmouth Green"],
        ["hex" => "#004000", "name" => "Pakistan Green"],
        /**
        * !CYANS
        */    
        ["hex" => "#c0ffe0", "name" => "Pale Mint"],
        ["hex" => "#94ffe4", "name" => "Aquamarine"],
        ["hex" => "#00ffc0", "name" => "Tuquoise Cyan"],
        ["hex" => "#00ffff", "name" => "Cyan"],
        ["hex" => "#7dffaf", "name" => "Pale Seafoam Cyan"],
        ["hex" => "#43a18a", "name" => "Zomp"],
        ["hex" => "#316d5f", "name" => "Hooker's Green"],
        ["hex" => "#265449", "name" => "Brunswick Green"],
        ["hex" => "#009664", "name" => "Shamrock Green"],
        ["hex" => "#007d7d", "name" => "Teal"],
        ["hex" => "#006060", "name" => "Caribbean Current"],
        ["hex" => "#004040", "name" => "Midnight Green"],
        /**
        * !BLUE
        */
        ["hex" => "#a0ffff", "name" => "Ice Blue"],
        ["hex" => "#00c8ff", "name" => "Vivid Sky Blue"],
        ["hex" => "#007dff", "name" => "Azure"],
        ["hex" => "#0000ff", "name" => "Blue"],
        ["hex" => "#004baf", "name" => "Cobalt Blue"],
        ["hex" => "#000096", "name" => "Duke Blue"],
        ["hex" => "#010770", "name" => "Navy Blue"],
        ["hex" => "#000a4c", "name" => "Federal Blue"],
        ["hex" => "#006496", "name" => "Lapis Lazuli"],
        ["hex" => "#00496d", "name" => "Indigo Dye"],
        ["hex" => "#00324c", "name" => "Midnight Blue"],
        ["hex" => "#002638", "name" => "Prussian Blue"],
        /**
        * !PURPLE
        */
        ["hex" => "#beb5ff", "name" => "Periwinkle"],
        ["hex" => "#7d7dff", "name" => "Tropical Indigo"],
        ["hex" => "#7d00ff", "name" => "Violet"],
        ["hex" => "#640096", "name" => "Indigo"],
        ["hex" => "#b680ff", "name" => "Lavender"],
        ["hex" => "#4b00af", "name" => "Dark Purple"],
        ["hex" => "#3d068c", "name" => "Deep Violet"],
        ["hex" => "#370860", "name" => "Persian Indigo"],
        ["hex" => "#4d4d8f", "name" => "Ultra Violet"],
        ["hex" => "#6f49a4", "name" => "Royal Purple"],
        ["hex" => "#54367f", "name" => "Tekhelet"],
        ["hex" => "#422a63", "name" => "Russian Violet"],
        /**
        * !PINK & PURPLE
        */
        ["hex" => "#fcb5ff", "name" => "Mauve"],
        ["hex" => "#ff007d", "name" => "Rose"],
        ["hex" => "#960064", "name" => "Murrey"],
        ["hex" => "#66033e", "name" => "Tyrian Purple"],
        ["hex" => "#ff00ff", "name" => "Fuchsia"],
        ["hex" => "#b900ff", "name" => "Electric Purple"],
        ["hex" => "#7d007d", "name" => "Purple"],
        ["hex" => "#470134", "name" => "Tyrian Purple"],
        ["hex" => "#fa7fff", "name" => "Ultra Pink"],
        ["hex" => "#af57af", "name" => "Purpureus"],
        ["hex" => "#824382", "name" => "Plum"],
        ["hex" => "#5e315e", "name" => "Japanese Violet"],
        /**
        * !ADITIONAL BLUES
        */
        ["hex" => "#76bdff", "name" => "Maya Blue"],
        ["hex" => "#5080ad", "name" => "Steel Blue"],
        ["hex" => "#335375", "name" => "YInMn Blue"],
        ["hex" => "#233c56", "name" => "Night Blue"],              
        /**
        * !NEUTRALS
        */
        ["hex" => "#ffffff", "name" => "White"],
        ["hex" => "#e0e0e0", "name" => "Platinum"],
        ["hex" => "#afafaf", "name" => "Silver"],
        ["hex" => "#808080", "name" => "Gray"],
        ["hex" => "#5a5a5a", "name" => "Stone Cold Gray"],
        ["hex" => "#404040", "name" => "Onyx"],
        ["hex" => "#000000", "name" => "Black"]
    ];
}

function obtener_valores_color($color) {
    $color = strtolower($color);
    $textColorClass = 'text-white';
    $iconClass = 'color.svg'; // Ruta local, solo el nombre del archivo SVG
    $backgroundColorClass = 'custom-bg-dynamic'; // Siempre la clase dinámica
    $colorName = '';

    $colores_claros_hex = ['#ffffff', '#fffa7f', '#ffff00', '#ffffc0'];
    $umbral_claridad = 60;

    switch ($color) {
        case "rgb":
            $backgroundColorClass = "rgb-bg";
            $colorName = "RGB";
            return [$backgroundColorClass, $textColorClass, $iconClass, $colorName, null]; // sin hex para css

        case "transparent":
            $backgroundColorClass = "bg-transparent";
            $colorName = "Transparent";
            return [$backgroundColorClass, $textColorClass, $iconClass, $colorName, null];

        default:
            $predefinidos = obtener_colores_predefinidos();
            foreach ($predefinidos as $c) {
                if ($c["hex"] === $color) {
                    $colorName = $c["name"];

                    // Verifica claridad
                    if (es_color_claro($color, $colores_claros_hex, $umbral_claridad)) {
                        $textColorClass = 'text-bg-class';
                        $iconClass = 'color-black.svg'; // Ruta local para el icono negro
                    }

                    return ['custom-bg-dynamic', $textColorClass, $iconClass, $colorName, $color];
                }
            }

            // No predefinido: procesar
            $resultado = procesar_color_personalizado($color);
            if (es_color_claro($color, $colores_claros_hex, $umbral_claridad)) {
                $resultado[1] = 'text-bg-class';
                $resultado[2] = 'color-black.svg'; // Ruta local para el icono negro
            }

            return array_merge($resultado, [$color]);
    }
}



function procesar_color_personalizado($color) {
    $rgb = sscanf($color, "#%02x%02x%02x");
    $predefinidos = obtener_colores_predefinidos();

    $color_mas_cercano = null;
    $distancia_minima = PHP_INT_MAX;

    foreach ($predefinidos as $c) {
        $rgb_definido = sscanf($c["hex"], "#%02x%02x%02x");
        $distancia = sqrt(
            pow($rgb[0] - $rgb_definido[0], 2) +
            pow($rgb[1] - $rgb_definido[1], 2) +
            pow($rgb[2] - $rgb_definido[2], 2)
        );

        if ($distancia < $distancia_minima) {
            $distancia_minima = $distancia;
            $color_mas_cercano = $c;
        }
    }

    // Defaults si no se encuentra
    if (!$color_mas_cercano) {
        return ['custom-bg-dynamic', 'text-white', 'color.svg', 'Unknown'];
    }

    // Evaluar si el color se parece a un color claro
    $colores_claros_hex = ['#ffffff', '#fffa7f', '#ffff00', '#ffffc0'];
    $umbral_claridad = 60; // Ajustable según qué tan estricto quieres el parecido
    $textColorClass = 'text-white';
    $iconClass = 'color.svg';

    foreach ($colores_claros_hex as $claro) {
        $rgb_claro = sscanf($claro, "#%02x%02x%02x");
        $distancia_claro = sqrt(
            pow($rgb[0] - $rgb_claro[0], 2) +
            pow($rgb[1] - $rgb_claro[1], 2) +
            pow($rgb[2] - $rgb_claro[2], 2)
        );

        if ($distancia_claro <= $umbral_claridad) {
            $textColorClass = 'text-bg-class';
            $iconClass = 'color-black.svg';
            break;
        }
    }

    return ['custom-bg-dynamic', $textColorClass, $iconClass, $color_mas_cercano["name"]];
}


function es_color_claro($color, $colores_referencia, $umbral = 50) {
    $rgb = hex_to_rgb($color);
    foreach ($colores_referencia as $ref) {
        $ref_rgb = hex_to_rgb($ref);
        $distancia = sqrt(
            pow($rgb['r'] - $ref_rgb['r'], 2) +
            pow($rgb['g'] - $ref_rgb['g'], 2) +
            pow($rgb['b'] - $ref_rgb['b'], 2)
        );
        if ($distancia <= $umbral) {
            return true;
        }
    }
    return false;
}

function hex_to_rgb($hex) {
    $hex = ltrim($hex, '#');
    if (strlen($hex) == 3) {
        $hex = $hex[0].$hex[0].$hex[1].$hex[1].$hex[2].$hex[2];
    }
    return [
        'r' => hexdec(substr($hex, 0, 2)),
        'g' => hexdec(substr($hex, 2, 2)),
        'b' => hexdec(substr($hex, 4, 2))
    ];
}

//Mejora de colores
function render_acf_colors($acf_fields) {
    $color_fields = ['color_1', 'color_2', 'color_3'];
    foreach ($color_fields as $field) {
        $color_value = isset($acf_fields[$field]) ? $acf_fields[$field] : '';
        if (!empty($color_value)) {
            list($backgroundColorClass, $textColorClass, $iconClass, $colorName) = obtener_valores_color($color_value);
            $style = '';
            if ($backgroundColorClass === 'custom-bg-dynamic') {
                $style = 'style="--dynamic-color: ' . esc_attr($color_value) . ';"';
            }
            echo "<script>console.log('Campo: " . esc_js($field) . " - Valor: " . esc_js($color_value) . "');</script>";
            echo "<script>console.log('Background Class: " . esc_js($backgroundColorClass) . "');</script>";
            echo "<script>console.log('Text Class: " . esc_js($textColorClass) . "');</script>";
            echo "<script>console.log('Icon Class: " . esc_js($iconClass) . "');</script>";
            echo "<script>console.log('Color Name: " . esc_js($colorName) . "');</script>";
            echo '<button class="color-button ' . esc_attr($backgroundColorClass) . ' ' . esc_attr($textColorClass) . '" ' . $style . '>';
            echo get_svg_with_class($iconClass, 'color-icon');
            echo esc_html($colorName ? $colorName : $color_value);
            echo '</button>';
        }
    }
}

        /**
        * * FINAL DE FUINCIONES DE COLORES
        */





    /**
    * * Impresión de campos ACF de Mods
    * * *****************************
    */
//Funciones para Mods
function render_version_mod_buttons($campo, $acf_fields) {
    $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = '';

    if (!empty($valor) && $valor !== ": (dejar vacío)") {
        // Separar las versiones por comas y agregar "v" al principio de cada una
        $versiones = array_map('trim', explode(',', $valor));
        $svg_filename = 'version-mod.svg'; // Solo el nombre del archivo SVG local

        foreach ($versiones as $version) {
            if (!empty($version)) {
                $output .= '<button class="acf-button">';
                $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
                $output .= 'v' . esc_html($version); // Agregar "v" antes de la versión
                $output .= '</button>';
            }
        }
    }

    echo $output; // Imprimir el contenido generado
}

function render_category_button($campo, $acf_fields) {
    $valores = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = ''; // Variable para almacenar el contenido generado

    if (!empty($valores) && is_array($valores)) { // Verificar que el campo no esté vacío y sea un array
        foreach ($valores as $valor) {
            $svg_filename = ''; // Nombre del archivo SVG local
            $additional_class = ''; // Clase adicional para el botón

            // Asignar íconos y clases según el valor
            if (strtolower($valor) === 'classic') {
                $svg_filename = 'dll-icon.svg'; // Ícono local para "Classic"
            } elseif (strtolower($valor) === 'geode') {
                $svg_filename = 'geode.svg'; // Ícono local para "Geode"
                $additional_class = ' geodebg'; // Clase adicional para "Geode"
            }

            // Generar el botón solo si hay un valor válido
            if (!empty($valor)) {
                $output .= '<button class="acf-button' . esc_attr($additional_class) . '">';
                if (!empty($svg_filename)) {
                    $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
                }
                $output .= esc_html($valor); // Imprimir el valor del campo
                $output .= '</button>';
            }
        }
    }

    echo $output; // Imprimir el contenido generado
}

function render_paid_button($campo, $acf_fields) {
    $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = ''; // Variable para almacenar el contenido generado

    if (!empty($valor) && strtolower($valor) === 'paid') { // Verificar que el valor sea "Paid"
        $svg_filename = 'dollar.svg'; // Solo el nombre del archivo SVG local

        // Generar el botón
        $output .= '<button class="paidbg acf-button">';
        $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
        $output .= esc_html($valor); // Imprimir el valor del campo
        $output .= '</button>';
    }

    echo $output; // Imprimir el contenido generado
}

function render_type_classic_buttons($campo, $acf_fields) {
    $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = ''; // Variable para almacenar el contenido generado

    if (!empty($valor)) {
        // Si el valor no es un array, convertirlo en uno
        if (!is_array($valor)) {
            $valor = [$valor];
        }

        foreach ($valor as $item) {
            if (!empty($item)) {
                $svg_filename = ''; // Nombre del archivo SVG local

                // Asignar íconos según el valor
                if (strtolower($item) === 'mod menu') {
                    $svg_filename = 'menu.svg';
                } elseif (strtolower($item) === 'extension') {
                    $svg_filename = 'extension-icon.svg';
                }

                // Generar el botón solo si hay un ícono asignado
                $output .= '<button class="acf-button">';
                if (!empty($svg_filename)) {
                    $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
                }
                $output .= esc_html($item); // Imprimir el valor del campo
                $output .= '</button>';
            }
        }
    }

    echo $output; // Imprimir el contenido generado
}

function render_type_geode_buttons($campo, $acf_fields) {
    $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = ''; // Variable para almacenar el contenido generado

    if (!empty($valor)) {
        // Si el valor no es un array, convertirlo en uno
        if (!is_array($valor)) {
            $valor = [$valor];
        }

        foreach ($valor as $item) {
            if (!empty($item)) {
                $svg_filename = ''; // Nombre del archivo SVG local

                // Asignar íconos según el valor
                switch (strtolower($item)) {
                    case 'universal':
                        $svg_filename = 'universal.svg';
                        break;
                    case 'gameplay':
                        $svg_filename = 'gameplay.svg';
                        break;
                    case 'editor':
                        $svg_filename = 'editor.svg';
                        break;
                    case 'offline':
                        $svg_filename = 'offline.svg';
                        break;
                    case 'online':
                        $svg_filename = 'online.svg';
                        break;
                    case 'enhancement':
                        $svg_filename = 'enhancement.svg';
                        break;
                    case 'music':
                        $svg_filename = 'music.svg';
                        break;
                    case 'interface':
                        $svg_filename = 'interface.svg';
                        break;
                    case 'bugfix':
                        $svg_filename = 'bugfix.svg';
                        break;
                    case 'utility':
                        $svg_filename = 'utility.svg';
                        break;
                    case 'performance':
                        $svg_filename = 'performance.svg';
                        break;
                    case 'customization':
                        $svg_filename = 'customization.svg';
                        break;
                    case 'content':
                        $svg_filename = 'content.svg';
                        break;
                    case 'developer':
                        $svg_filename = 'developer.svg';
                        break;
                    case 'cheat':
                        $svg_filename = 'cheat.svg';
                        break;
                    case 'joke':
                        $svg_filename = 'joke.svg';
                        break;
                    case 'modtober 2024':
                        $svg_filename = 'modtober.svg';
                        break;
                    case 'modtober 2024 winner':
                        $svg_filename = 'modtober-winner.svg';
                        break;
                    case 'featured':
                        $svg_filename = 'star.svg';
                        break;
                }

                // Generar el botón solo si hay un ícono asignado
                $output .= '<button class="acf-button">';
                if (!empty($svg_filename)) {
                    $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
                }
                $output .= esc_html($item); // Imprimir el valor del campo
                $output .= '</button>';
            }
        }
    }

    echo $output; // Imprimir el contenido generado
}

    /**
    * * Impresión de campos ACF de Tops
    * * *****************************
    */
    function render_numtop_button($campo, $acf_fields) {
        $valor = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
        $output = ''; // Variable para almacenar el contenido generado

        if (!empty($valor)) { // Verificar que el campo no esté vacío
            $svg_filename = 'hashtag.svg'; // Nombre del archivo SVG local en /assets/svg/

            // Generar el botón
            $output .= '<button class="acf-button num-top-button">';
            $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
            $output .= esc_html($valor); // Imprimir el valor del campo
            $output .= '</button>';
        }

        echo $output; // Imprimir el contenido generado
    }
    /**
    * * Impresión de campos ACF para content
    * * *****************************
    */
function render_type_buttons($campo, $acf_fields) {
    $valores = isset($acf_fields[$campo]) ? $acf_fields[$campo] : '';
    $output = ''; // Variable para almacenar el contenido generado

    if (!empty($valores) && is_array($valores)) { // Verificar que el campo no esté vacío y sea un arreglo
        foreach ($valores as $valor) {
            if (!empty($valor)) {
                $svg_filename = ''; // Nombre del archivo SVG local

                // Asignar íconos según el tipo y valor
                switch (strtolower($valor)) {
                    // Opciones para article_type
                    case 'news':
                        $svg_filename = 'news.svg';
                        break;
                    case 'history':
                        $svg_filename = 'history.svg';
                        break;
                    case 'opinion':
                        $svg_filename = 'opinion.svg';
                        break;
                    case 'updates':
                        $svg_filename = 'updates.svg';
                        break;
                    case 'analysis':
                        $svg_filename = 'analysis.svg';
                        break;
                    case 'community':
                        $svg_filename = 'community.svg';
                        break;
                    case 'events':
                        $svg_filename = 'celebration.svg';
                        break;

                    // Opciones para resource_type
                    case 'download files':
                        $svg_filename = 'download.svg';
                        break;
                    case 'sprites':
                        $svg_filename = 'sprites.svg';
                        break;
                    case 'sounds':
                        $svg_filename = 'sounds.svg';
                        break;
                    case 'templates':
                        $svg_filename = 'template.svg';
                        break;

                    // Opciones para tutorial_type
                    case 'install guide':
                        $svg_filename = 'install.svg';
                        break;
                    case 'configuration':
                        $svg_filename = 'configuration.svg';
                        break;
                    case 'editor':
                        $svg_filename = 'editor-1.svg';
                        break;
                    case 'gameplay':
                        $svg_filename = 'gameplay-1.svg';
                        break;
                    case 'modding':
                        $svg_filename = 'modding.svg';
                        break;
                }

                // Generar el botón solo si hay un ícono asignado
                $output .= '<button class="acf-button">';
                if (!empty($svg_filename)) {
                    $output .= get_inline_svg_by_name($svg_filename); // SVG inline, sin clases extra
                }
                $output .= esc_html($valor); // Imprimir el valor del campo
                $output .= '</button>';
            }
        }
    }

    echo $output; // Imprimir el contenido generado
}


    /**
    * * Zona de renderización real de los botones ACF
    * * *****************************
    */
function render_texture_packs($acf_fields) {
    echo '<div class="acf-group">'; // Contenedor único para todos los botones
    // Renderizar colores
    render_acf_colors($acf_fields);
    // Renderizar botones ACF
    render_acf_buttons(['versiones', 'platforms', 'graphics', 'type', 'style'], $acf_fields);
    render_acf_author('author_acf', $acf_fields);
    // Renderizar botones especiales
    render_special_buttons('level', 'level.svg', 'acf-button', $acf_fields);
    render_special_buttons('geode', 'geode.svg', 'acf-button geodebg', $acf_fields);

    echo '</div>'; // Cierre del contenedor único
}

function render_tops($acf_fields) {
    echo '<div class="acf-group">'; // Contenedor único para todos los botones
    // Renderizar botones ACF
    render_acf_buttons(['versiones', 'type'], $acf_fields);
    render_acf_author('author_acf', $acf_fields);
    render_numtop_button('numtop', $acf_fields);
    echo '</div>'; // Cierre del contenedor único
}

function render_mods($acf_fields) {
    echo '<div class="acf-group">';
    render_acf_buttons(['versiones'], $acf_fields);
    render_acf_buttons(['platforms'], $acf_fields);
    render_type_classic_buttons('type_classic', $acf_fields); 
    render_type_geode_buttons('type_geode', $acf_fields);
    render_acf_buttons(['style'], $acf_fields);
    render_version_mod_buttons('version_mod', $acf_fields);
    render_acf_author('author_acf', $acf_fields);
    render_category_button('category', $acf_fields);
    render_paid_button('paid', $acf_fields);
    echo '</div>'; // Cierre del contenedor único

}

function render_content($acf_fields) {
    echo '<div class="acf-group">';
    render_acf_buttons(['type'], $acf_fields);
    render_type_buttons('article_type', $acf_fields);
    render_type_buttons('resource_type', $acf_fields);
    render_type_buttons('tutorial_type', $acf_fields);
    echo '</div>';
}

$categorias = get_the_category();
if (!empty($categorias)) {
    // Convertir todas las categorías a minúsculas para comparación
    $categorias_nombres = array_map(function($categoria) {
        return strtolower($categoria->name);
    }, $categorias);

    echo '<div class="acf-group grouped-buttons">'; // Contenedor principal
    // Verificar si alguna categoría coincide con los casos
    if (in_array('texture packs', $categorias_nombres)) {
        render_texture_packs($acf_fields);
    } elseif (in_array('tops', $categorias_nombres)) {
        render_tops($acf_fields);
    } elseif (in_array('mods', $categorias_nombres)) {
        render_mods($acf_fields);
    } elseif (in_array('content', $categorias_nombres)) {
        render_content($acf_fields);
    } else {
        echo '<p>No se encontró una categoría válida.</p>';
    }

    echo '</div>'; // Cierre del contenedor principal
}

    /**
    * * Script para extraer data ACF de mi sitio web de wordpress para utilizarla en entradas recomendadas (test, prueba, se reemplazará por meilisearch)
    * * *****************************
    */
function enqueue_react_bundle() {
  wp_enqueue_script(
    'my-react-app',
    get_stylesheet_directory_uri() . '/build/index.js', // Ajusta la ruta a tu bundle
    array(),
    null,
    true
  );

  if (is_singular('post')) {
    global $post;
    wp_localize_script('my-react-app', 'WP_REACT_DATA', array(
      'postId' => $post->ID,
    ));
  }
}
add_action('wp_enqueue_scripts', 'enqueue_react_bundle');


    /**
    * * Script para automatizar el cambio de hash al hacer build en la app de reactpress
    * * Esto es para que no se tenga que cambiar el hash cada vez que se haga un build
    * * *****************************
    */
function render_react_app_script() {
    $js_dir = ABSPATH . 'wp-content/reactpress/apps/contacts/build/static/js/';
    $url_base = home_url('/wp-content/reactpress/apps/contacts/build/static/js/');

    $files = glob($js_dir . 'main.*.js');

    if (!empty($files)) {
        $latest_file = basename($files[0]);
        return '<div id="root"></div>' .
               '<script type="text/javascript" src="' . esc_url($url_base . $latest_file) . '"></script>';
    } else {
        return '<p>No se encontró el archivo JS de React.</p>';
    }
}
add_shortcode('react_app', 'render_react_app_script');




//First Commit for github
    /**
    * * Nota sobre como hacer el build
    * * Lo primero es que se necesita hacer un build con los 3 componentes o los que se necesiten
    * * Luego los estilos css que vaya a tener el componente de download vienen en downloadtemp.css que es algo temporal
    * * para que esas clases se vean en tiempo real en localhost:3000 esto con el objetivo de tener la app en tiempo real
    * * y mejorarla, sin embargo, esos estilos se tienen que copiar y pegar en el apartado de estilos de wordpress para utilizarlos
    * * desde ahí para hacer media queries, así que es necesario.
    * * Al final de todo el proyecto se borrará la carpeta downloadtemp.css o se restringirá solo para desarrollo.
    * * Al momento de hacer build es necesario copiar lo que se de en la carpeta de Statics/JS/main.js
    * * y pegarlo en el apartado de html incrustado que tienen las entradas individuales en los templates para lanzarse en todas
    * * las entradas que dependan de esa plantilla.
    * * Renderizado de páginas con request meilisearch importante: https://chatgpt.com/share/682959fe-531c-800f-bde7-ec245c121f6f
    * * Pendiente de ciberseguridad el deshabilitar la rest api para usuarios externos, generar una clave para que solo mi sistema la consulte
    * * Para lo de Geometry Dash de Robtop: https://uiverse.io/MeetJF/average-deer-50
    * * Download oficial: https://uxwing.com/download-file-icon/
    <div id="root"></div>
<script type="text/javascript" src="/wp-content/reactpress/apps/contacts/build/static/js/main.fc4c5cae.js"></script>
    * * *****************************
    */
?>