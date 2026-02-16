export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        {`
          All components in this directory are Server Components by default.
        `}  <br/>
        {`
          To make a Client Component, add the "use client" directive at the top of the file.
        `}
      </p>
    </div>
  );
}
