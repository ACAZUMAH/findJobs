import { Types } from "mongoose";

export interface user {
    name: string;
    email: string;
    password: string;
}

export interface jwtpayload {
    _id: string | Types.ObjectId;
    email: string;
}

export interface job {
    company: string;
    position: string;
    status: string;
    salary: string;
    createdBy: string | Types.ObjectId;
    createdAt: Date;
}

export interface update {
    userId: string | Types.ObjectId;
    jobId: string | Types.ObjectId;
    company?: string;
    position?: string;
    status?: string;  
    salary?: string;
}

export interface queryType {
    company?: string;
    position?: string;
    status?: string;
    salary?: string;
    page?: string;
    limits?: string;
    sortBy?: string;
}
