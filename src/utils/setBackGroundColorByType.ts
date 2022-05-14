interface setBackGroundColorByTypeReturn {
    color: string;
    textColor: string;
}

export function setBackGroundColorByType(type: string): setBackGroundColorByTypeReturn  {
    let color = '#000000';
    let textColor = '#FFFFFF';

    switch (type) {
        case 'bug':
            color = '#A8B822';
            break;
        case 'dark':
            color = '#707070';
            break;
        case 'dragon':
            color = '#F16E57';
            textColor = '#00ffed';
            break;
        case 'electric':
            color = '#F8D030';
            break;
        case 'fairy':
            color = '#FDB9E9';
            break;
        case 'fighting':
            color = '#C03028';
            break;
        case 'fire':
            color = '#FD7D24';
            break;
        case 'flying':
            color = '#00ffed';
            textColor = '#afacac';
            break;
        case 'ghost':
            color = '#7B62A3';
            break;
        case 'grass':
            color = '#78C850';
            break;
        case 'ground':
            color = '#AB9842';
            textColor = '#FFE242';
            break;
        case 'ice':
            color = '#51C4E7';
            break;
        case 'normal':
            color = '#A4ACAF';
            break;
        case 'poison':
            color = '#B97FC9';
            break;
        case 'psychic':
            color = '#F366B9';
            break;
        case 'rock':
            color = '#A38C21';
            break;
        case 'steel':
            color = '#9EB7B8';
            break;
        case 'water':
            color = '#6890F0';
            break;
        default:
            break;
    }

    return {color, textColor};
}
