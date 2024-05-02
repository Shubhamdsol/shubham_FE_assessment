import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingPage from "./pages/ListingPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
