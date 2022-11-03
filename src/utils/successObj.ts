export class SuccessObj {
    code: number
    message: string
    data: any | null

    constructor(data) {
        this.code = 0
        this.message = 'success'
        this.data = data ?? null
    }
}