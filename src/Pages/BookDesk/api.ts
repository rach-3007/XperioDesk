import axiosInstance from "../../Config/AxiosConfig";
import { Booking } from "./types";

export const getUsers = async (): Promise<Booking[]> => {
    try {
        const response = await axiosInstance.get<Booking[]>("/admin/users");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Users:", error);
        throw error;
    }
};

export const createBooking = async (): Promise<Booking[]> => {
    try {
        const response = await axiosInstance.get<Booking[]>("/admin/assign-seat");
        return response.data;
    } catch (error) {
        console.error("Failed to Book a seat", error);
        throw error;
    }
};