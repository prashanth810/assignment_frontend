import BaseUrl from "../Baseurl";

export const LoginApi = async (data) => {
    const res = await BaseUrl.post("/login", data);
    return res;
};