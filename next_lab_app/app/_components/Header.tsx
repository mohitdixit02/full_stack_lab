import Link from "next/link"
export default function Header() {
  return (
    <div
        style={{
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "backgroundColor": "#333",
            "color": "white",
            "padding": "1rem"
        }}
    >
        <h3>Header of Next Lab</h3>
        <div
            style={{
                "textDecoration": "none",
                "display": "flex",
                "gap": "1rem",
                color: "white",
                "fontSize": "1.2rem"
            }}
        >
            <Link href="/">Home</Link>
            <Link href="/receipe">Receipe</Link>
            <Link href="/customer">Customers</Link>
            <Link href="/customer/foods">Foods</Link>
            <Link href="/customer/cities">Cities</Link>
        </div>
    </div>
  )
}
