import React, { createContext, useContext, useReducer } from "react";

// Scenario event shape (plain JS)
// { id: string, type: 'income' | 'expense', amount: number, startDate: string, description: string }

const ScenarioContext = createContext({ state: { scenarios: [] }, dispatch: () => null });

function scenarioReducer(state, action) {
  switch (action.type) {
    case "ADD_SCENARIO":
      return { ...state, scenarios: [...state.scenarios, action.payload] };
    case "REMOVE_SCENARIO":
      return { ...state, scenarios: state.scenarios.filter(s => s.id !== action.payload) };
    case "EDIT_SCENARIO":
      return {
        ...state,
        scenarios: state.scenarios.map(s => (s.id === action.payload.id ? action.payload : s)),
      };
    default:
      return state;
  }
}

export const ScenarioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scenarioReducer, { scenarios: [] });
  return (
    <ScenarioContext.Provider value={{ state, dispatch }}>
      {children}
    </ScenarioContext.Provider>
  );
};

export const useScenarioContext = () => useContext(ScenarioContext);
