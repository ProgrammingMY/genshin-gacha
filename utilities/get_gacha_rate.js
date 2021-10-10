// define rate
const RATE = {
    standard_5: [0.006, 0.015, 0.3],
    standard_4: [0.051, 0.34],
    weapon_5: [0.007, 0.0175, 0.35],
    weapon_4: [0.06, 0.4],
    rigged: 0.5
}

module.exports = function(traveller, banner, rigged){
    var chance_4 = 0;
    var chance_5 = 0;

    // get rates based on current traveller pity
    switch(banner) {
        case 'standard':
        case 'character':
            if (rigged) chance_5 = RATE.rigged;
            else if (traveller[banner].pity_5 < 44) chance_5 = RATE.standard_5[0];
            else if (traveller[banner].pity_5 < 74) chance_5 = RATE.standard_5[1];
            else if (traveller[banner].pity_5 < 89) chance_5 = RATE.standard_5[2];
            else chance_5 = 1;

            if (traveller[banner].pity_4 < 6) chance_4 = RATE.standard_4[0];
            else if (traveller[banner].pity_4 < 9) chance_4 = RATE.standard_4[1];
            else chance_4 = 1;
        break;

        case 'weapon':
            if (rigged) chance_5 = RATE.rigged;
            else if (traveller[banner].pity_5 < 34) chance_5 = RATE.weapon_5[0];
            else if (traveller[banner].pity_5 < 64) chance_5 = RATE.weapon_5[1];
            else if (traveller[banner].pity_5 < 79) chance_5 = RATE.weapon_5[2];
            else chance_5 = 1;

            if (traveller[banner].pity_4 < 6) chance_4 = RATE.weapon_4[0];
            else if (traveller[banner].pity_4 < 9) chance_4 = RATE.weapon_4[1];
            else chance_4 = 1;
        break;
    }

    return [chance_4, chance_5];
}