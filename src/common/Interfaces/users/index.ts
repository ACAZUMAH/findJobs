import { Types } from "mongoose"

export interface userDocument {
    _id: Types.ObjectId
    username: string
    name?: string | null
    email?: string | null
    phone: string
    password: string
    isAuthenticated: boolean
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
    name?: string | null
    email?: string | null
    phone?: string | null
}