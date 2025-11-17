import React from "react";
import AppRoutes from "./routes/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";

function App() {

  return (
  <>
      <PersistGate loading={<div>Loading session...</div>} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
  </>
  );
}

export default App;