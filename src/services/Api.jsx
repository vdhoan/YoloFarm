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