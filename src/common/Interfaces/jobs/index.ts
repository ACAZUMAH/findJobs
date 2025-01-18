import { Types } from "mongoose";
import { WorkArrangement } from "src/common/enums";

export interface jobDocument {
    _id: Types.ObjectId
    company: string
    location: string
    workArrangement: WorkArrangement
    position: string
    description: string
    requirements: string[]
    salary: number
    createdBy: string | Types.ObjectId
};

export interface createJob {
    createdBy: string | Types.ObjectId
    company: string
    location: string,
    workArrangement: WorkArrangement
    position: string
    description: string
    requirements: string[]
    salary: number
}; 

export interface jobsfilter {
    page?: string | number | null
    limit?: string | number | null
    createdBy?: string | null
    search?: string | null
    company?: string | null
    location?: string | null
    workArrangement?: WorkArrangement | null
    position?: string | null
    salary?: string | number | null
}