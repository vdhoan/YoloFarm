// import Thresholds from "../pages/Thresholds/Thresholds";
import instance from "./AxiosCustomize";
import axios from "axios";

export const getThresholds = async () => {
    const response = await instance.get("/api/thresholds"); 
  //  console.log(response)
    return response.data
};

export const postThresholds = async(data)=>{
    const response = await instance.post("/api/thresholds",data);
    // console.log(response)
    return response;
}

export const deleteThresholds=async(ThresholdId)=>{
    const response =await instance.delete(`/api/thresholds/${ThresholdId}`);
    return response;
}

export const getWatering = async ()=>{
    const response = await instance.get("/api/watering/automatic");
    return response;
}
export const deleteWatering = async (autoId)=>{
    const response = await instance.delete(`/api/watering/automatic/${autoId}`)
    return response;
}

export const postWatering = async (formData)=>{
    const response = await instance.post("/api/watering/automatic",formData)
    return response
}

export const getWarning = async ()=>{
    const response = await instance.get("/api/warnings");
    return response
}

export const postWarning = async (formData)=>{
    const response = await instance.post("/api/warnings",formData)
    return response
}

export const getTemperature = async ()=>{
    const response = await axios.get("https://io.adafruit.com/api/v2/NgoKhang/feeds/nhiet-do/data")
    return response
}

export const getHumidity = async () =>{
    const response = await axios.get("https://io.adafruit.com/api/v2/NgoKhang/feeds/do-am/data")
    return response
}

export const getSoilMoisture = async()=>{
    const response = await axios.get("https://io.adafruit.com/api/v2/NgoKhang/feeds/do-am-dat/data")
    return response
}

export const getStatusPump = async()=>{
    const response = await axios.get("https://io.adafruit.com/api/v2/NgoKhang/feeds/pump/data")
    return response
}
const API_KEY = import.meta.env.VITE_ADAFRUIT_IO_KEY;
export const controlPump = async(status)=>{
  
    try {
        const response = await axios.post(
            "https://io.adafruit.com/api/v2/NgoKhang/feeds/pump/data",
            { value: status },
            {
                headers: {
                    "X-AIO-Key": API_KEY,
                    "Content-Type": "application/json",
                }
            }
        );

        console.log("Response:", response);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
};

