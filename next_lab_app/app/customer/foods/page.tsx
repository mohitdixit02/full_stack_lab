type Food = {
    id: number;
    name: string;
}

export default async function Food() {
  const data = await fetch('http://localhost:3000/api/foods');
  const foods = await data.json();
  return (
    <div>
      <h2>Food Page</h2>
      <p>{`
        Food page content called using fetch method in server component.
      `}
      </p>
      <p>{`
        2 seconds delay is added in API route to demonstrate loading state. loading.tsx is used to show loading state during this time.
      `}
      </p>
      <ul>
        {foods.list.map((food: Food) => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    </div>
  );
}
