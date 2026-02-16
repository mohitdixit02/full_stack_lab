// API Routing in NextJS
import type { NextApiRequest, NextApiResponse } from "next";

// NextApiRequest - extended from Node's IncomingMessage
// NextApiResponse - extended from Node's ServerResponse

type Food = {
    id: number;
    name: string;
}

type Data = {
    status: string;
    message: string;
    list: Food[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    if(req.method === "GET"){
        const foodList = [
            { id: 1, name: "Pizza" },
            { id: 2, name: "Burger" },
            { id: 3, name: "Pasta" }
        ]
        res.status(200).json({
            status: "success",
            message: `Food list retrieved successfully`,
            list: foodList
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