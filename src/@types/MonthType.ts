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

  const monthEntry = Object.entries(MonthType).find(([, value]) => value === month)

  if (!monthEntry) {
    throw new Error('Mês inválido!')
  }

  return monthEntry[0] as MonthType
}

export function monthToNumber(month: string): number {
  switch (month) {
    case 'JANUARY':
      return 1
    case 'FEBRUARY':
      return 2
    case 'MARCH':
      return 3
    case 'APRIL':
      return 4
    case 'MAY':
      return 5
    case 'JUNE':
      return 6
    case 'JULY':
      return 7
    case 'AUGUST':
      return 8
    case 'SEPTEMBER':
      return 9
    case 'OCTOBER':
      return 10
    case 'NOVEMBER':
      return 11
    case 'DECEMBER':
      return 12
  }

  throw new Error('Mês inválido!')
}

export default MonthType
