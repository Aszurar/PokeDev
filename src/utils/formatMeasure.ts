export function formatMeasure(value: number, measure: string): string {
    let sufix = (measure=== 'h') ? 'm' : 'kg';

    return String(value / 10) + sufix;
}
