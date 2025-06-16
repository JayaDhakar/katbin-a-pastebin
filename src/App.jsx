import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPaste from "./pages/ViewPaste";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paste/:id" element={<ViewPaste />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
