import API from "../api/axios";

export const getCompliance = async () => {
  const res = await API.get("/compliance");
  return res.data;
};

export const generateCompliance = async () => {
  const res = await API.post("/compliance/generate");
  return res.data;
};