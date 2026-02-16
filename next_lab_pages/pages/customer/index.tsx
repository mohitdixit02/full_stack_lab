/*
    Next JS shows this page as Dynamic Route
    Exporting the getServerSideProps function will opt the route into dynamic rendering. 
    This function will be called by the server on every request.
*/

type Customer = {
  id: number;
  name: string;
  isActive: boolean;
}

// Server Component
export async function getServerSideProps() {
  const res = [];
  const ids = [12, 34, 56];
  for (const id of ids) {
    const custm = await fetch(`http://localhost:3000/api/customer/`+id, {
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
    console.log(custm); // console log will be visible in terminal as it executes on server side
    res.push(custm.list[0]);
  }
  return {
    props: {customers: res},
  }
}

// Client Component
export default function App({customers}: {customers: Customer[]}) {
  return (
    <div>
      <h2>Customer Page</h2>
      <p>
          Next JS shows this page as Dynamic Route <br />
          Exporting the getServerSideProps function will opt the route into dynamic rendering.  <br />
          This function will be called by the server on every request.
      </p>
      <div>
        <h3>Customers List</h3>
        {customers.map((customer, index) => {
          return <div key={index}>
            <p>Id: {customer?.id}</p>
            <p>Name: {customer?.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}