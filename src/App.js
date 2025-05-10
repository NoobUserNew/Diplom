import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Enterprises from './pages/Enterprises';
import Products from './pages/Products';
import Laboratory from './pages/Laboratory';
import Contacts from './pages/Contacts';
import Feedback from './pages/Feedback';
import News from './pages/News';
import PriceList from './pages/PriceList';
import Admin from './pages/Admin';
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import EnterpriseDetail from './pages/EnterpriseDetail';

function App() {
  return (
    <div style={{backgroundColor: '#f8f9fa'}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/enterprises" element={<Enterprises />} />
          <Route path="/enterprise/:id" element={<EnterpriseDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/news" element={<News />} />
          <Route path="/pricelist" element={<PriceList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;