import { Types } from "mongoose"

export interface userDocument {
    _id: Types.ObjectId
    username: string
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null
    phone?: string | null
    password?: string | null
    isAuthenticated: boolean
}

export interface GoogleUser {
    email: string,
    username: string,
}

export interface createUserInput {
    username: string
    phone: string
    password: string 
} 

export interface loginUserInput {
    phone: string
    password: string
}

export interface updateUserInput {
    id: string | Types.ObjectId
    usename?: string
    firstName?: string | null
    lastName?: string | null
    email?: string | null
    phone?: string | null
}