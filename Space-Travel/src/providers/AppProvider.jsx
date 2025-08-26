import spacecraftsContext from "../context/spacecraftsContext";
import planetsContext from "../context/planetsContext";
import { useState } from "react";

const AppProviders = ({ children }) => {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [movingSpacecraftId, setMovingSpacecraftId] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);
  
  
    return (
        <planetsContext.Provider value={{ planets, setPlanets }}>
          <spacecraftsContext.Provider value={{ spacecrafts, setSpacecrafts, selectedSpacecraft, setSelectedSpacecraft, movingSpacecraftId, setMovingSpacecraftId }}>
            {children} 
          </spacecraftsContext.Provider>
        </planetsContext.Provider>
    );
  };
  
  export default AppProviders;