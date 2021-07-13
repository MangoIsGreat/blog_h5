import { TRIGGER_SHOW_SEARCH } from "../actionTypes/searchActionType";

const initState = {
  isShowSearchPage: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case TRIGGER_SHOW_SEARCH:
      const newState1 = JSON.parse(JSON.stringify(state));
      newState1.isShowSearchPage = action.showType;
      return newState1;
    default:
      return state;
  }
};
