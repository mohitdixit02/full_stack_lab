import React, {useState} from 'react'

export default function KeyRender() {
    const [items, setItems] = useState([
        { id: 3, name: "Item 1" },
        { id: 1, name: "Item 2" },
        { id: 2, name: "Item 3" },
        { id: 2, name: "Item 1" },
        { id: 2, name: "Item 4" }
    ]);

    const handleUpdate = (e) => {
        setItems(items.slice(1));
    }
  return (
    <div>
        <h2>Key Render</h2>
        <p>
            Keys act as Reconcilation hint for react to identify which items have changed, are added, or are removed.
        </p>

        <h4>With Non-Unique Keys</h4>
        <ul>
        {
            items.map(item => (
                <li key={item.id}>
                    {item.name}
                </li>
            ))
        }
        </ul>

        <h4>With Unique Keys</h4>
        <ul>
        {
            items.map((item, index) => (
                <li key={item.id + '-' + index + '-' + item.name}>
                    {item.name}
                </li>
            ))
        }
        </ul>

        <h4>Without Keys</h4>
        <ul>
        {
            items.map(item => (
                <li>
                    {item.name}
                </li>
            ))
        }
        </ul>

        <button onClick={handleUpdate}>Update</button>
    </div>
  )
}
