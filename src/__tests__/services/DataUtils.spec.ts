import { describe, it, expect } from 'vitest'
import DataUtils from '../../class/services/DataUtils'

describe('DataUtils', () => {
  it('Deve retornar a data formatada', () => {
    const date: Date = new Date(2025, 6, 26)
    const result = DataUtils.formatDate(date)

    expect(result).toEqual('26/07/2025')
  })
})
