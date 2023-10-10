import axios, { AxiosResponse } from 'axios';
import ResponseExtendErrors from 'models/ResponseExtendErrors';
import ValidateResponseApis from './ValidateResponseApis';

export const axiosRequest =  ({url,payload}:any) : Promise<AxiosResponse<ResponseExtendErrors, any>>  => {
    //Interceptor para aplicar transformación a respuesta de MS.
    axios.interceptors.response.use(
        (response:AxiosResponse) => {
            const validRes = ValidateResponseApis.valid(response.status, response.statusText, response.data);
            response.data = validRes;
            return response;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    
    return axios.get<ResponseExtendErrors>(
        url,
        {
           ...payload,
           params : {...payload.params},
        },
    )
}

