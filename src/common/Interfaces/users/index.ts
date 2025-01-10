import { Types } from "mongoose"

export interface userDocument {
    _id: Types.ObjectId
    username: string
    name?: string | null
    email?: string | null
    phone: string
    isAuthenticated: boolean
}