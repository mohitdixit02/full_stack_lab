import { useState, createContext } from "react";

const LabContext = createContext();

export default function ContextProvider({children}) {
    const [name, setName] = useState("React Lab");
    return (
        <LabContext.Provider value={{name, setName}}>
            {children}
        </LabContext.Provider>
    )
}

export {LabContext};
