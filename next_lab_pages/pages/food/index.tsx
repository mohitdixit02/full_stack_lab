/*
    Next JS shows this page as Static Route.
    Exporting the getStaticProps function will opt the route into static rendering.
    Pages that use getStaticProps are pre-rendered at build time and will be served as static HTML.
    Useful if data is not changing as per request
*/

type Food = {
  id: number;
  name: string;
}

// Server Component
export async function getStaticProps() {
    const food = await fetch(`http://localhost:3000/api/food_list/`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .then(data => data.json())
    .catch(err => {
      console.log(err);
      return null;
    });
    console.log(food); // console log will be visible in terminal as it executes on server side
    return {props: {foods: food.list}}
}

// Client Component
export default function App({foods}: {foods: Food[]}) {
  return (
    <div>
      <h2>Food Page</h2>
      <p>
            Next JS shows this page as Static Route <br />
            Exporting the getStaticProps function will opt the route into static rendering. <br />
            Pages that use getStaticProps are pre-rendered at build time and will be served as static HTML. <br />
            Useful if data is not changing as per request
      </p>
      <div>
        <h3>Foods List</h3>
        {foods.map((food, index) => {
          return <div key={index}>
            <p>Id: {food?.id}</p>
            <p>Name: {food?.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}