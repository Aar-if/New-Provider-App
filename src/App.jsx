import { Suspense, lazy, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
const TagContent = lazy(() => import("./pages/TagContent"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const MyAnalytics = lazy(() => import("./pages/MyAnalytics"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ProtectedRoutes = lazy(() =>
  import("./routes/ProtectedRoutes/ProtectedRoutes")
);

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoutes Component={Login} />} />
            <Route
              path="/home"
              element={<ProtectedRoutes Component={HomePage} />}
            />
            <Route
              path="/tagcontent"
              element={<ProtectedRoutes Component={TagContent} />}
            />
            <Route
              path="/mycourses"
              element={<ProtectedRoutes Component={MyCourses} />}
            />
            <Route
              path="/myanalytics"
              element={<ProtectedRoutes Component={MyAnalytics} />}
            />
            <Route
              path="/"
              element={<ProtectedRoutes Component={Register} />}
            />
            <Route
              path="/login"
              element={<ProtectedRoutes Component={Login} />}
            />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
