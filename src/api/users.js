// REGISTER
import axios from "axios";

export const registerUser = async (user) => {
    const res = await axios.post("http://localhost:8888/users/register", user);
    return { data: res.data, status: res.status };
};

// LOGIN
export const login = async (user) => {
    const res = await axios.post("http://localhost:8888/users/login", user);
    return { data: res.data, status: res.status };
};
