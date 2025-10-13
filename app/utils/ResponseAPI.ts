/**
 * Classe responsável para facilitar o tratamento de erros, baseado no Golang
 * que retorna sempre uma tupla com error e resposta de sucesso!
 *
 * @author andrewgo
 */
class ResponseAPI<RESPONSE> {
    constructor(public error: boolean, public response: RESPONSE) {
    }

    getError(): boolean {
        return this.error;
    }

    getResponse(): RESPONSE {
        return this.response;
    }
}

export default ResponseAPI;