import axios from 'axios';

const baseUrl = 'https://test.mobicom.mn/mobiapi'; 

export const saveInfo = async (saveInfo) => {
  try {
    const response = await axios.post(`${baseUrl}/globalesim/saveinfo`, saveInfo);
    return response.data;
  } catch (error) {
    console.error("Error saving info:", error);
    throw error;
  }
};

export const createInvoice = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}/globalesim/createInvoice`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};
