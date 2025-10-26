import type {TableRow} from "@nuxt/ui";
import type {IExpense} from "~/types/IExpense";

export const getMonth = (row: TableRow<IExpense>): string => {
    switch (row.getValue("month")) {
        case "JANUARY":
            return "Janeiro";
        case "FEBRUARY":
            return "Fevereiro";
        case "MARCH":
            return "Março";
        case "APRIL":
            return "Abril";
        case "MAY":
            return "Maio";
        case "JUNE":
            return "Junho";
        case "JULY":
            return "Julho";
        case "AUGUST":
            return "Agosto";
        case "SEPTEMBER":
            return "Setembro";
        case "OCTOBER":
            return "Outubro";
        case "NOVEMBER":
            return "Novembro";
        case "DEZEMBER":
            return "Dezembro";
        default:
            return "Mês desconhecido!"
    }
}

export const getPaymentCategory = (row: TableRow<IExpense>): string => {
    switch (row.getValue("paymentCategory")) {
        case "FIXED":
            return "Despesa FIXA";
        case "VARIABLE":
            return "Despesa variável";
        case "UNFORESEEN":
            return "Despesa imprevísivel";
        default:
            return "Categoria desconhecida";
    }
}