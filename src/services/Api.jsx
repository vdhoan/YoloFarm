// import Thresholds from "../pages/Thresholds/Thresholds";
import  {instance, adafruit } from "./AxiosCustomize";
// import axios from "axios";

export const getThresholds = async (token) => {
    const response = await instance.get("/api/thresholds",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }); 
  //  console.log(response)
    return response.data
};

export const postThresholds = async(token,data)=>{
    const response = await instance.post("/api/thresholds",data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    // console.log(response)
    return response;
}

export const deleteThresholds=async(token,ThresholdId)=>{
    const response =await instance.delete(`/api/thresholds/${ThresholdId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const getWatering = async (token)=>{
    const response = await instance.get("/api/watering/automatic",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}
export const deleteWatering = async (tokend,autoId)=>{
    const response = await instance.delete(`/api/watering/automatic/${autoId}`,{
        headers:{
            Authorization: `Bearer ${tokend}`
        }
    })
    console.log(response)
    return response;
}

export const postWatering = async (token,formData)=>{
    const response = await instance.post("/api/watering/automatic",formData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const getWarning = async (token)=>{
    const response = await instance.get("/api/warnings",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response
}

// export const postWarning = async (token,formData)=>{
//     const response = await instance.post("/api/warnings",formData,{
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     })
//     return response
// }
export const postWarning = async (token, formData) => {
    const response = await instance.post('/api/warnings', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

export const getTemperature = async ()=>{
    const response = await adafruit.get("/nhiet-do/data")
    return response
}

export const getHumidity = async () =>{
    const response = await adafruit.get("/do-am/data")
    return response
}

export const getSoilMoisture = async()=>{
    const response = await adafruit.get("/do-am-dat/data")
    return response
}

export const getStatusPump = async()=>{
    const response = await adafruit.get("/pump/data")
    return response
}
export const getStartTime = async()=>{
    const response = await adafruit.get("time-start/data")
    return response
}
export const getEndtTime = async()=>{
    const response = await adafruit.get("time-end/data")
    return response
}

const API_KEY = import.meta.env.VITE_ADAFRUIT_IO_KEY;
export const controlPump = async(status)=>{
  
    try {
        const response = await adafruit.post(
            "/pump/data",
            { value: status },
            {
                headers: {
                    "X-AIO-Key": API_KEY,
                    "Content-Type": "application/json",
                }
            }
        );

        console.log("Response:", response);
        return response
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
};
export const postTimeStart = async (value) => {
    try {
        console.log("trong ham postTimeStart", value)
        const response = await adafruit.post('/time-start/data', 
            { value: value },
            {
                headers: {
                    "X-AIO-Key": API_KEY,
                    "Content-Type": "application/json",
                }
            }
        );

        console.log('Cập nhật thành công:', response.data);
    } catch (error) {
        console.error('Lỗi khi cập nhật time-end:', error.response?.data || error.message);
    }
};
export const postTimeEnd = async (value) => {
    try {
        console.log("trong ham postTimeend", value)
        const response = await adafruit.post('/time-end/data', 
            { value: value },
            {
                headers: {
                    "X-AIO-Key": API_KEY,
                    "Content-Type": "application/json",
                }
            }
        );

        console.log('Cập nhật thành công:', response.data);
    } catch (error) {
        console.error('Lỗi khi cập nhật time-end:', error.response?.data || error.message);
    }
};


// export const deleteSchedule = async (scheduleId) =>{
//     try {
//         const response = await adafruit.delete(
//             `/time-end/data/${scheduleId}`,
//             {
//                 headers: {
//                     "X-AIO-Key": API_KEY,
//                     "Content-Type": "application/json",
//                 }
//             }
//         );

//         console.log("Response:", response);
//         return response
//     } catch (error) {
//         console.error("Error:", error.response ? error.response.data : error.message);
//     }
// }
export const postLogin =  (username, password)=>{
    try {
        const response = instance.post("/api/auth/signin",{username,password});
        return response
    } catch(err){
        console.log(err)
    }
}

export const profile = (token)=>{
    const response = instance.get("/api/auth/me",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    // console.log(response)
    return response
    
}

export const logout = (token)=>{
    const response = instance.post("/api/auth/signout",{},{
        headers:{
            Authorization: `Bearesr ${token}`
        }
    })
    
    return response
}

export const getIrrigationData = async (token) => {
    const response = await instance.get("/api/irrigation/test-schedule", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};


