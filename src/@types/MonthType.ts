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

/**
 * Responsável por retornar o mês do enum a partir de um mês selecionado pela tela.
 * @param month
 */
export function getMonthType(month: string | null | undefined): MonthType {
  if (month === null || month === undefined) throw new Error('Mês não pode ser undefined!')

  const monthEntry = Object.entries(MonthType).find(([, value]) => value === month)

  if (!monthEntry) {
    throw new Error('Mês inválido!')
  }

  return monthEntry[0] as MonthType
}

/**
 * Responsável por popular um mapa contendo nome do mês e número do mês. (ex: 1 -> Janeiro)
 */
function getMonthMap(): Map<number, string> {
  const monthMap: Map<number, string> = new Map<number, string>()

  Object.entries(MonthType).forEach(([, value]) => {
    monthMap.set(Object.values(MonthType).indexOf(value) + 1, String(value))
  })

  return monthMap
}

/**
 * Responsável por verificar o mês atual e só retornar os meses válidos a partir do atual.
 */
export function getMonthValidYear(): Array<string> {
  const validMonth: Array<string> = []
  const currentMonth = new Date().getMonth() + 1

  const monthMap: Map<number, string> = getMonthMap()
  monthMap.forEach((monthString, monthNumber) => {
    if (monthNumber >= currentMonth) {
      validMonth.push(monthString)
    }
  })

  return validMonth
}

/**
 * Responsável em a partir de um mês trazer o número do mesmo.
 * @param month
 */
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
