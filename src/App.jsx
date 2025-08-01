import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Summary from "./Pages/Summary";
import Success from "./Pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="summary" element={<Summary />} />
        <Route path="success" element={<Success />} />
      </Route>
    </Routes>
  );
}

export default App;
