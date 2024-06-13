import type { AddAccount, AddAccountParams, AccountModel, httpRequest } from "../controllers/login/signup/signup-controler-protocols"
import { mockAccountModel } from "@/domain/test"
export const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
      async add (account: AddAccountParams): Promise<AccountModel> {
        return await new Promise(resolve => { resolve(mockAccountModel()) })
      }
    }
    return new AddAccountStub()
}

export const mockRequest = (): httpRequest => ({
  body: {
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password',
    password_confirm: 'any_password'
  }
})
