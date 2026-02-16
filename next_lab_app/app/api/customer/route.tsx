// API Routing in NextJS - App based routing
type Customer = {
    id: number;
    name: string;
}

type Data = {
    status: string;
    message: string;
    list: Customer[];
}

export async function GET(request: Request) {
    const customersList = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        { id: 4, name: "Bob Brown" },
        { id: 5, name: "Charlie Davis" }
    ]

    // 2 seconds delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return new Response(
        JSON.stringify({
            status: "success",
            message: `Customers List retrieved successfully`,
            list: customersList
        }),
        { status: 200 }
    )
}