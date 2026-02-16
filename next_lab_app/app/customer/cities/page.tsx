type Cities = {
    id: number;
    name: string;
}

export default async function Cities() {
  const data = await fetch('http://localhost:3000/api/cities');
  const cities = await data.json();
  {/*
    Removing the below commented code will throw error due to use of useState in server component. 
    This will show fallback UI of error boundary component.
  */}
  // const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Cities Page</h2>
      <p>{`
        Cities page content called using fetch method in server component.
      `}
      </p>
      <p>{`
        Adding the hook useState in this server component will throw error and show fallback UI of error boundary component.
      `}
      </p>
      <ul>
        {cities.list.map((city: Cities) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
    </div>
  );
}
