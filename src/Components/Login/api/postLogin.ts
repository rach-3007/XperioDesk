import axiosInstance from "../../../Config/AxiosConfig";
 
 
export const postLogin = async (accessToken: string)=> {  
    const config = {
        access_token: accessToken
    };
    return await axiosInstance
        .post("api/loginAzure",config)
        .then((responce) => responce.data)
        .catch((err) => err);
};
 