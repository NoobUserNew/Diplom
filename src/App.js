import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation";
import About from "./pages/About";
import Enterprises from "./pages/Enterprises";
import Products from "./pages/Products";
import Laboratory from "./pages/Laboratory";
import Contacts from "./pages/Contacts";
import Feedback from "./pages/Feedback";
import News from "./pages/News";
import PriceList from "./pages/PriceList";
import NewsSlider from './components/NewsSlider';
import './App.css'; // Import as a CSS file, not a module

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <NewsSlider />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/enterprises" element={<Enterprises />} />
          <Route path="/products" element={<Products />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/news" element={<News />} />
          <Route path="/price-list" element={<PriceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
