// Define la interfaz para la respuesta de la API
export interface MarvelResponse {
    data: Data;
}

// Define la interfaz para la propiedad `data` dentro de la respuesta
export interface Data {
    results: Character[];
}

// Define la interfaz para el personaje
export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    comics: {
        items: Array<{ name: string }>;
    };
    isSelected?: boolean;
}
