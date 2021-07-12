import { combineReducers } from "redux";

// 导入子reducer
import search from "./search";

// 合并各子Reducer并且导出
export default combineReducers({
  search,
});
