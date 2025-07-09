class DataUtils {
  static formatDate(data: Date): string {
    const date: Date = new Date(data)

    const day: number = date.getDate()
    const month: number = date.getMonth() + 1
    const year: number = date.getFullYear()

    const dayString: string = day.toString().length === 1 ? `0${day}` : day.toString()
    const monthString: string = month.toString().length === 1 ? `0${month}` : month.toString()

    return `${dayString}/${monthString}/${year}`
  }
}

export default DataUtils
