export interface MoveDTO {
    name: string;
    type: {
        name: string;
        url: string;
    };
    power: number;
    accuracy: number;
    pp: number;
    priority: number;
    target: {
        name: string;
    };
    damage_class: {
        name: string;
    };
    effect_chance: number;
    effect_entries: {
        effect: string;
        language: {
            name: string;
        }
    }[];
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        }
        version_group: {
            name: string;
        }
    }[];
    generation: {
        name: string;
        url: string;
    };
    meta: {
        ailment: {
            name: string;
        };
        category: {
            name: string;
        };
        min_hits: number;
        max_hits: number;
        min_turns: number;
        max_turns: number;
        drain: number;
        healing: number;
        crit_rate: number;
        ailment_chance: number;
        flinch_chance: number;
        stat_chance: number;
    };

    contest_combo: {

        normal:
        {
            use_before: {
                    name: string;
                }[],
            use_after: {
                name: string;
            }[];
        }
        super:
        {
            use_before: {
                name: string;
            }[],
            use_after: {
                name: string;
            }[];
        }
    };
    stat_changes: {
        stat: {
            name: string;
        }
    }[]
    learned_by_pokemon: {
        name: string;
    }[]


}
