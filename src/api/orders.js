import axios from "axios";
import Cookies from "js-cookie";


export const getOrders = async () => {
    const token = Cookies.get("authToken");
  
    let res = await axios.get("http://localhost:8888/orders/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(res)
    return res.data;
};

export const getAllOrders = async () => {
    const token = Cookies.get("authToken");
  
    let res = await axios.get("http://localhost:8888/orders/allOrders", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(res)
    return res.data;
};

export const checkout = async ({ total }) => {
    const token = Cookies.get("authToken");
    const body = {
        total
    };
    // console.log("1234")
    let res = await axios.post("http://localhost:8888/orders/", body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(res)
    return res.data;
};

export const addOrder = async (id) => {
    console.log(id);
    const token = Cookies.get("authToken");
    let res = await axios.post(`http://localhost:8888/orders/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
}