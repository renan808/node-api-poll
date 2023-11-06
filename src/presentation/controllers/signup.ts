export class SignUpController {
    handle (httpRequest: any): any {
        return {
            statuscode: 400,
            body: new Error('Missing param: name')
        }
    }
}
