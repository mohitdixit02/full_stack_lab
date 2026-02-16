import { Suspense } from "react";

type Customer = {
  id: number;
  name: string;
}

const UI = async () => {
  const data = await fetch('http://localhost:3000/api/customer');
  const customers = await data.json();
  return (
    <div>
      <h2>
        Customer List
      </h2>
      <p>
        {`
          This is UI component which is wrapped inside <Suspense> component. It will be loaded and rendered after the data is fetched from API.
        `} <br/>
        {`
          2 second delay is added in API route to simulate loading state. During this time, the fallback content defined in <Suspense> will be displayed.
        `}
      </p>
      <ul>
        {customers.list.map((customer: Customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))
      }
      </ul>    
      </div>
  )
};

const SuspenseUI = () => {
  return (
    <div>
      <h2>
        Loading Customer List... (Suspense Component Fallback)
      </h2>
      <p>
        {`
          This is Fallback using <Suspense> component. It will be displayed until the UI component is loaded and rendered. 
          Once the UI component is ready, it will replace this fallback content with actual one.
        `}
      </p>
    </div>
  )
};
      

export default function Customer() {
  return (
    <Suspense fallback={<SuspenseUI />}>
      <UI />
    </Suspense>
  );
}
