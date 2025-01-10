import { Types } from "mongoose";

export interface authInput {
    username?: string
    phone: string
    password: string
}

export interface authDocument {
    _id: Types.ObjectId
    userId: Types.ObjectId
    token: string
    expiresIn: Date
}
