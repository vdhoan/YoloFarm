import Thresholds from "../pages/Thresholds/Thresholds";
import instance from "./AxiosCustomize";

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