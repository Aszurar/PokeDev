import { SpeciesDataDTO } from "../dtos/SpeciesDataDTO";

export function setRarity(speciesData: SpeciesDataDTO): string {
    if (speciesData.is_legendary) {
        return 'lendário';
    } else if (speciesData.is_mythical) {
        return 'mítico';
    } else {
        return 'comum';
    }
}
