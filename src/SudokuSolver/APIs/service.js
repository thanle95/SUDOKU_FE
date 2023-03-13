import axios from "axios";

const SERVER = 'https://localhost:7088'
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