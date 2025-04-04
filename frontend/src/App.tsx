import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/navbar";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
