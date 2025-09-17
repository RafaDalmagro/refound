import foodSvg from "../assets/food.svg";
import otersSvg from "../assets/others.svg";
import servicesSvg from "../assets/services.svg";
import transportSvg from "../assets/transport.svg";
import accommodationSvg from "../assets/accommodation.svg";

export const CATEGORIES = {
    food: {
        name: "Alimentação",
        icon: foodSvg,
    },
    transport: {
        name: "Transporte",
        icon: transportSvg,
    },
    accommodation: {
        name: "Acomodação",
        icon: accommodationSvg,
    },
    others: {
        name: "Outros",
        icon: otersSvg,
    },
    services: {
        name: "Serviços",
        icon: servicesSvg,
    },
};

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
    keyof typeof CATEGORIES
>;
