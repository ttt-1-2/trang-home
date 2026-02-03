import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Projects from "./pages/projects/Projects";

export default function App(){
  return (
    <BrowserRouter basename="/trang-home">
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/projects" element={<Projects/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
