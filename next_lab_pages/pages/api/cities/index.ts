// API Routing in NextJS
import type { NextApiRequest, NextApiResponse } from "next";

// NextApiRequest - extended from Node's IncomingMessage
// NextApiResponse - extended from Node's ServerResponse

type City = {
    id: number;
    name: string;
}

type Data = {
    status: string;
    message: string;
    list: City[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    if(req.method === "GET"){
        const CitiesList = [
            { id: 1, name: "Delhi" },
            { id: 2, name: "Mumbai" },
            { id: 3, name: "Kolkata" },
            { id: 4, name: "Chennai" },
            { id: 5, name: "Bangalore" }
        ]
        res.status(200).json({
            status: "success",
            message: `Cities list retrieved successfully`,
            list: CitiesList
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