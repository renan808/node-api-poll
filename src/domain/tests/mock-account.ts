import type { AccountModel } from "../models/account"
import type { AddAccountParams } from "../use-cases/account/add-account"

export const mockAddAccountParams = (): AddAccountParams => ({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
    id: 'any_id',
    email: 'any_email@email.com',
    name: 'any_name',
    password: 'any_password',
    role: 'admin'
})
