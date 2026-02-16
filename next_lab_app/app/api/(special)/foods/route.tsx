import { resolve } from "path";

// API Routing in NextJS - App based routing
type Food = {
    id: number;
    name: string;
}

type Data = {
    status: string;
    message: string;
    list: Food[];
}

export async function GET(request: Request) {
    const foodList = [
        { id: 1, name: "Pizza" },
        { id: 2, name: "Burger" },
        { id: 3, name: "Pasta" }
    ]
    
    // 2 seconds delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return new Response(
        JSON.stringify({
            status: "success",
            message: `Food list retrieved successfully`,
            list: foodList
        }),
        { status: 200 }
    );
}