export enum IOperacoesCalculo {
    TODAS,
    A_PAGAR,
    JA_PAGAS
}

export function getOperacao(operacao: IOperacoesCalculo): string {
    switch (operacao) {
        case IOperacoesCalculo.TODAS:
            return "Valor total das despesas:";
        case IOperacoesCalculo.A_PAGAR:
            return "Valor a pagar:";
        case IOperacoesCalculo.JA_PAGAS:
            return "Valor já pago:"
        default:
            return "Operação inválida!";
    }
}