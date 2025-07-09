class ResponseAPI<ERROR, RESPONSE> {
  constructor(
    public error: ERROR | null,
    public response: RESPONSE | null,
  ) {}

  getError(): ERROR | null {
    return this.error
  }

  getResponse(): RESPONSE | null {
    return this.response
  }
}

export default ResponseAPI
