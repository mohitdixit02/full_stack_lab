/*
    NextJS do SSG (static) if the page doesn't export getServerSideProps or getStaticProps is used
    NextJS do SSR (dynamic) if the page exports getServerSideProps
    NextJS do ISR (static with revalidation) if the page exports getStaticProps with revalidate property
*/

type City = {
    id: number;
    name: string;
}

// Server Component
export async function getStaticProps() {
    const cities = await fetch(`http://localhost:3000/api/cities/`, {
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
    console.log(cities); // console log will be visible in terminal as it executes on server side
    return {
        props: {cities: cities.list},
        revalidate: 10 // revalidate the page every 10 seconds
    }
}

// Client Component
export default function App({cities}: {cities: City[]}) {
  return (
    <div>
      <h2>Cities Page</h2>
      <p>
        {`
            NextJS do SSG (static) if the page doesn't" export getServerSideProps or getStaticProps is used \n
            NextJS do SSR (dynamic) if the page exports getServerSideProps \n
            NextJS do ISR (static with revalidation) if the page exports getStaticProps with revalidate property \n
        `}
      </p>
      <div>
        <h3>Famous Cities</h3>
        {cities.map((city, index) => {
          return <div key={index}>
            <p>Id: {city?.id}</p>
            <p>Name: {city?.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}