import { TRIGGER_SHOW_SEARCH } from "../actionTypes/searchActionType";

/**
 * 切换“搜索页”显示状态
 * @param {boolean} data true/false
 */
export const triggerShowState = (data) => {
  return {
    type: TRIGGER_SHOW_SEARCH,
    showType: data,
  };
};
