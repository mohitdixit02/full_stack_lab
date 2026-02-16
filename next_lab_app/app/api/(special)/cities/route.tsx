// API Routing in NextJS - App based routing
type City = {
    id: number;
    name: string;
}

type Data = {
    status: string;
    message: string;
    list: City[];
}

export async function GET(request: Request) {
    const CitiesList = [
        { id: 1, name: "Delhi" },
        { id: 2, name: "Mumbai" },
        { id: 3, name: "Kolkata" },
        { id: 4, name: "Chennai" },
        { id: 5, name: "Bangalore" }
    ]
    return new Response(
        JSON.stringify({
            status: "success",
            message: `Cities list retrieved successfully`,
            list: CitiesList
        }),
        { status: 200 }
        // JSON.stringify({
        //     status: "error",
        //     message: `Failed to retrieve cities list`,
        //     list: []   
        // }),
        // { status: 500 }
    )
}