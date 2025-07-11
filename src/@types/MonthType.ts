enum MonthType {
  JANUARY = 'Janeiro',
  FEBRUARY = 'Fevereiro',
  MARCH = 'Março',
  APRIL = 'Abril',
  MAY = 'Maio',
  JUNE = 'Junho',
  JULY = 'Julho',
  AUGUST = 'Agosto',
  SEPTEMBER = 'Setembro',
  OCTOBER = 'Outubro',
  NOVEMBER = 'Novembro',
  DECEMBER = 'Dezembro',
}

export function getMonthType(month: string | undefined): MonthType {
  if (month === undefined) throw new Error('Mês não pode ser undefined!')

  const monthEntry = Object.entries(MonthType).find(([key, value]) => value === month)

  if (!monthEntry) {
    throw new Error('Mês inválido!')
  }

  return monthEntry[0] as MonthType
}

export default MonthType
