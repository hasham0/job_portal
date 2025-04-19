import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store.ts";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
