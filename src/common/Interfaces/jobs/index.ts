import { Types } from "mongoose";

export interface jobDocument {
    _id: Types.ObjectId
    company: string
    location: string
    position: string
    description: string
    requirements: Array<string>
    salary: string
    createdBy: string | Types.ObjectId
}