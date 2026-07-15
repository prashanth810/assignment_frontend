import BaseUrl from "../Baseurl";

export const GetAllProductsApi = async () => {
    const res = await BaseUrl.get("/products/list");
    return res;
};