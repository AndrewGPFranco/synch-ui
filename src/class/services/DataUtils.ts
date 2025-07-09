class DataUtils {
  static formatDate(data: Date): string {
    const date = new Date(data)

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const dayString: string = day.toString().length === 1 ? `0${day}` : day.toString()
    const monthString: string = month.toString().length === 1 ? `0${month}` : month.toString()

    return `${dayString}/${monthString}/${year}`
  }
}

export default DataUtils
