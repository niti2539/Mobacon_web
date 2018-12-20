import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    console.log("Accepting the updated app module!");
    render(NextApp);
  });
}

function render(Component) {
  return ReactDOM.render(<Component />, document.getElementById("root"));
}

// disable ServiceWorker
// registerServiceWorker();
