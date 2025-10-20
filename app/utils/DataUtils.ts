export function formataDataBrasilAsString(data: Date) {
    return new Date(data + 'T00:00:00').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}