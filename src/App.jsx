import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TagContent from "./pages/TagContent";
import MyCourses from "./pages/MyCourses";
import MyAnalytics from "./pages/MyAnalytics";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/tagcontent" element={<TagContent />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/myanalytics" element={<MyAnalytics />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
