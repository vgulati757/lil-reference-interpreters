import axios from "axios";

const backend_URL = import.meta.env.VITE_API_URL;

// ✅ POST Interpreter
export const createInterpreter = async (formData) => {
  try {
    const res = await axios.post(`${backend_URL}/interpreters`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || "Failed to add interpreter";
    console.error("Error adding interpreter:", errorMsg);
    throw new Error(errorMsg);
  }
};
