import React from "react";
import { SvgProps } from "react-native-svg";

import Bug from '../assets/icons/bug.svg';
import Dark from '../assets/icons/dark.svg';
import Dragon from '../assets/icons/dragon.svg';
import Electric from '../assets/icons/electric.svg';
import Fairy from '../assets/icons/fairy.svg';
import Fighting from '../assets/icons/fighting.svg';
import Fire from '../assets/icons/fire.svg';
import Flying from '../assets/icons/flying.svg';
import Ghost from '../assets/icons/ghost.svg';
import Grass from '../assets/icons/grass.svg';
import Ground from '../assets/icons/ground.svg';
import Ice from '../assets/icons/ice.svg';
import Normal from '../assets/icons/normal.svg';
import Poison from '../assets/icons/poison.svg';
import Psychic from '../assets/icons/psychic.svg';
import Rock from '../assets/icons/rock.svg';
import Steel from '../assets/icons/steel.svg';
import Water from '../assets/icons/water.svg';


export interface ISetColorandIconByTypeReturn {
    color: string;
    icon: React.FC<SvgProps>;
}

export function setColorandIconByType(type: string): ISetColorandIconByTypeReturn {
    let color = '#000000';
    let iconType = Normal;

    switch (type) {
        case 'bug':
            color = '#92BC2C';
            iconType = Bug;
            break;
        case 'dark':
            color = '#595761';
            iconType = Dark;
            break;
        case 'dragon':
            color = '#0C69C8';
            iconType = Dragon;
            break;
        case 'electric':
            color = '#F2D94E';
            iconType = Electric;
            break;
        case 'fairy':
            color = '#EE90E6';
            iconType = Fairy;
            break;
        case 'fighting':
            color = '#D3425F';
            iconType = Fighting;
            break;
        case 'fire':
            color = '#FBA54C';
            iconType = Fire;
            break;
        case 'flying':
            color = '#A1BBEC';
            iconType = Flying;
            break;
        case 'ghost':
            color = '#5F6DBC';
            iconType = Ghost;
            break;
        case 'grass':
            color = '#5FBD58';
            iconType = Grass;
            break;
        case 'ground':
            color = '#DA7C4D';
            iconType = Ground;
            break;
        case 'ice':
            color = '#75D0C1';
            iconType = Ice;
            break;
        case 'normal':
            color = '#A0A29F';
            iconType = Normal;
            break;
        case 'poison':
            color = '#B763CF';
            iconType = Poison;
            break;
        case 'psychic':
            color = '#FA8581';
            iconType = Psychic;
            break;
        case 'rock':
            color = '#C9BB8A';
            iconType = Rock;
            break;
        case 'steel':
            color = '#5695A3';
            iconType = Steel;
            break;
        case 'water':
            color = '#539DDF';
            iconType = Water;
            break;
        default:
            break;
    }

    return { color, icon: iconType };
}
