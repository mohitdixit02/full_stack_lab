// API Routing in NextJS
import type { NextApiRequest, NextApiResponse } from "next";

// NextApiRequest - extended from Node's IncomingMessage
// NextApiResponse - extended from Node's ServerResponse

type Customer = {
    id: number;
    name: string;
    isActive?: boolean; // ? - optional property
}

type Data = {
    status: string;
    message: string;
    list: Customer[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    if(req.method === "GET"){
        const { id } = req.query;
        const customer = {
            id: Number(id),
            name: `Customer ${id}`,
            isActive: true
        }
        res.status(200).json({
            status: "success",
            message: `Customer with id ${id} retrieved successfully`,
            list: [customer]
        });
    }
    else{
        res.status(405).json({
            status: "error",
            message: "Method not allowed",
            list: []
        });
    }
}