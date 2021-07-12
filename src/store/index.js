import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// 导入根Reducer
import rootReducer from "./reducers";

// 使用中间件的同时在浏览器调试数据
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
