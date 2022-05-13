import { SpeciesDataDTO } from "../dtos/SpeciesDataDTO";

export function setRarity(speciesData: SpeciesDataDTO): string {
    if (speciesData.is_legendary) {
        return 'Lendário';
    } else if (speciesData.is_mythical) {
        return 'Mítico';
    } else{
        return 'Normal';
    }
}
