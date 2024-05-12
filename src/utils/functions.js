import { Modal } from "antd";


export const alertModal = (value) => {
  Modal.error({
    title: value,
  });
};

export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return !obj;
  else if (typeof obj === "number") return isNaN(obj);
  else if (typeof obj === "string" || Array.isArray(obj))
    return obj.length === 0;
  else if (typeof obj === "object") return Object.keys(obj).length === 0;
  else return !obj;
};
