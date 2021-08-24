import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relative from "dayjs/plugin/relativeTime";

dayjs.extend(relative);
dayjs.locale("zh-cn");

// 全局过滤器：处理相对时间
export const relativeTime = (value) => {
  return dayjs().to(dayjs(value));
};

// 全局过滤器：格式化时间
export const formatTime = (value) => {
  return dayjs(value).format("YYYY-MM-DD");
};
