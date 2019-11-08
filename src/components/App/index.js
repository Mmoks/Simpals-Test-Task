import React, { lazy, Suspense } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/posts.css";
import "bootstrap3/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const Articles = lazy(() => import("../Articles"));

function App() {
  return (
    <div className="container">
      <section>
        <Router>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Route path="/home" component={Articles}></Route>
            <Redirect exact from="/" to="home" />
          </Suspense>
        </Router>
      </section>
    </div>
  );
}

export default App;
