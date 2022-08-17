import Header from './components/header-component.'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Added from './components/added-component'
import Wishlist from "./components/wishlist-component.js";
import Home from "./components/home-component"

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/success/:id" element={<Added />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
