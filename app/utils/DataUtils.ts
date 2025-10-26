export function formataDataBrasilAsString(data: Date) {
    return new Date(data + 'T00:00:00').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

/**
 * Método para formatar a data do componente do Nuxt UI -> Date
 * @param dateValue
 */
export function dateValueToDate(dateValue: any): Date | null {
    if (!dateValue) return null;
    return new Date(dateValue.year, dateValue.month - 1, dateValue.day);
};