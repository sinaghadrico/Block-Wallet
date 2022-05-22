import { useMemo } from "react";
import axios from "axios";
const useRequest = () => {
    

    const request = useMemo(() => {
        return axios.create({
            baseURL: "https://api-rinkeby.etherscan.io/api",
            timeout: 10000,
            headers: {
                "content-type": "application/json",
            },
        });
    }, []);

    request.interceptors.response.use(
        (response) => {
            return response?.data ? response?.data : response;
        },
        (error) => {
        },
    );

    const get = (arg: any) => {
        return request.get(arg);
    };
    const deleteRequest = (arg: any) => {
        return request.delete(arg);
    };
    const post = (arg: any, body: any) => {
        return request.post(arg, body);
    };
    const patch = (arg: any, body: any) => {
        return request.patch(arg, body);
    };
    const put = (arg: any, body: any) => {
        return request.put(arg, body);
    };

    const all = axios.all;
    const spread = axios.spread;

    return { request, get, post, put, deleteRequest, patch, all, spread };
};

export default useRequest;
