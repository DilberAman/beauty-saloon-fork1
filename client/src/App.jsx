import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BookingPage from "./BookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
