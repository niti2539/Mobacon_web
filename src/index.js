import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

if (module.hot) {
  module.hot.accept("./index.js", function() {
    console.log("Accepting the updated app module!");
  });
}

ReactDOM.render(<App />, document.getElementById("root"));


// disable ServiceWorker
// registerServiceWorker();
