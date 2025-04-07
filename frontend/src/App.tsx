import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store.ts";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </>
  );
}

export default App;
