import axios from "axios"
import API from "./axiosInstance";

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data;
}

export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data;
}

export const getDetailsUser = async (id, access_token) => {
    const res = await API.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`)
    return res.data;
}

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    });
    return res.data;
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCrendentials: true
    })
    return res.data;
}

// export const logoutUser = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-out`)
//     return res.data;
// }

export const logoutUser = async () => {
    // Gửi yêu cầu đăng xuất đến server
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-out`);
    // Xóa access_token khỏi localStorage
    localStorage.removeItem('access_token');
    return res.data;
}


export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
            headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data;
}

export const deleteManyUser = async (data, access_token ) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
            headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data;
}





