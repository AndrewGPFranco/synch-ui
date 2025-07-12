class DataUtils {
  static formatDate(data: Date): string {
    const date = new Date(data)

    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    const dayString = day < 10 ? `0${day}` : day.toString()
    const monthString = month < 10 ? `0${month}` : month.toString()

    return `${dayString}/${monthString}/${year}`
  }
}

export default DataUtils
