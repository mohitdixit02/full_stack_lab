import { resolve } from "path";

// API Routing in NextJS - App based routing
type Food = {
    id: number;
    name: string;
    foodid: string;
}

type Data = {
    status: string;
    message: string;
    list: Food[];
}

export async function GET(
        request: Request,
        { params }: { params: Promise<{ id: string }> }

    ) {
    const id = await params.then(p => p.id);
    console.log(`Received request for food with id:`, id);
    const foodList = [
        { id: 1, name: "Pizza", foodid: id },
        { id: 2, name: "Burger", foodid: id },
        { id: 3, name: "Pasta", foodid: id },
        { id: 4, name: "Salad", foodid: id },
        { id: 5, name: "Sushi", foodid: id }
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