import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Home } from "./screen/Home";
import { Loader } from "@mantine/core";
const NotFound = lazy(() => import("./screen/404"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader type="bars" size={"xs"} />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
