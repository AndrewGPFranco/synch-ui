enum PaymentCategoryType {
  FIXED = 'Valor Fixo',
  VARIABLE = 'Valor Variável',
  UNFORESEEN = 'Valor Imprevisto',
}

export function getPaymentCategoryType(category: string): keyof typeof PaymentCategoryType {
  const entries = Object.entries(PaymentCategoryType) as [
    keyof typeof PaymentCategoryType,
    string,
  ][]

  for (const [key, value] of entries) {
    if (value === category) return key
  }

  throw new Error('Categoria desconhecida!')
}

export default PaymentCategoryType
