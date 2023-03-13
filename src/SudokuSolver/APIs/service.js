import axios from "axios";

export const SERVER = 'https://localhost:7088'

export const get = async (url)=>{
  try {
      const response = await axios.get(
        `${SERVER}${url}`
      );
      return { data: response.data }
    } catch (error) {
      return{ error }
    }
}
export const post = async (url, jsonData)=>{
    try {
        const response = await axios.post(
          `${SERVER}${url}`,jsonData
        );
        return { data: response.data }
      } catch (error) {
        return{ error }
      }
}