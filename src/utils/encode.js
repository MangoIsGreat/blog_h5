import { Base64 } from "js-base64";

export const encode = token => {
  const base64 = Base64.encode(token + ":");
  return "Basic " + base64;
};
