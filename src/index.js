import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
render(App);

if (module.hot) {
  module.hot.accept("./App.js", NextApp => {
    console.log("HMR Render Next APP module!");
    render(NextApp);
  });
}

function render(Component) {
  return ReactDOM.render(<Component />, document.getElementById("root"));
}

// disable ServiceWorker
// registerServiceWorker();
