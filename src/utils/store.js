const HISTORY_TOKEN = "history_token";

// 保存搜索历史记录
export const setHistory = (data) => {
  const originHistory = JSON.parse(window.localStorage.getItem(HISTORY_TOKEN));
  let history = [];
  if (originHistory) {
    history = [...originHistory, data];
  } else {
    history.push(data);
  }

  window.localStorage.setItem(HISTORY_TOKEN, JSON.stringify(history));
};

// 取出搜索历史记录
export const getHistory = () => {
  return window.localStorage.getItem(HISTORY_TOKEN) || "[]";
};

// 清空搜索历史记录
export const removeHistory = () => {
  window.localStorage.removeItem(HISTORY_TOKEN);
};
