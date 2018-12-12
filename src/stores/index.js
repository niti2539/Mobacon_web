import { createStore, applyMiddleware } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducers from "./reducers";
import midlewares from "./middlewares";

const dev = process.env.NODE_ENV === "development";

export const store = dev
  ? createStore(reducers, devToolsEnhancer())
  : createStore(reducers);
