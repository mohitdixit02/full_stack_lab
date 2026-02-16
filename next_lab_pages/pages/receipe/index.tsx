/*
    To enforce CSR, in page based routing, we can use dynamic import with ssr: false option. 
    This will ensure that the component is only rendered on the client side and not on the server side. 
    Format of dynamic import is as follows:
    const Component = dynamic(() => import('path/to/component'), { ssr: false });
*/
import dynamic from "next/dynamic";

// Client Component
const App = () => (
    <div>
      <h2>Receipe Page</h2>
      <p>
            Next JS shows this page as Static Route <br />
            Exporting the getStaticProps function will opt the route into static rendering. <br />
            Pages that use getStaticProps are pre-rendered at build time and will be served as static HTML. <br />
            Useful if data is not changing as per request
      </p>
      <div>
        <h3>Receipe List</h3>
        <p>
            How to make curry? <br />
            1. Take some vegetables and cut them into pieces. <br />
            2. Take some oil in a pan and add some spices to it. <br />
            3. Add the vegetables to the pan and cook them until they are soft. <br />
            4. Add some water to the pan and let it simmer for a while. <br />
            5. Serve the curry with rice or bread. <br />
        </p>
      </div>
    </div>
  );

// Inside Dyanmic, import is used to load the component asynchronously which is then rendered on client side.
// But here component is in same file, so we use Promise.resolve to resolve the component and render it on client side.
// ssr: false - this option is used to disable server side rendering for this component.
const Receipe = dynamic(() => Promise.resolve(App), {ssr: false});
export default Receipe;
