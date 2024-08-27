import axiosInstance from "../../Config/AxiosConfig";
import { Layout } from "./types";

// Example API function for getting layout data
export const getLayouts = async (): Promise<Layout[]> => {
    try {
        const response = await axiosInstance.get<Layout[]>("/layouts");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch layouts:", error);
        throw error;
    }
};

export const createLayout = async (layout: Layout): Promise<Layout> => {
    try {
        const response = await axiosInstance.post<Layout>("/layouts", layout);
        return response.data;
    } catch (error) {
        console.error("Failed to create layout:", error);
        throw error;
    }
};

// Example API function for updating an existing layout
export const updateLayout = async (id: string, layout: Layout): Promise<Layout> => {
    try {
        const response = await axiosInstance.put<Layout>(`/layouts/${id}`, layout);
        return response.data;
    } catch (error) {
        console.error("Failed to update layout:", error);
        throw error;
    }
};

export const deleteLayout = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/layouts/${id}`);
    } catch (error) {
        console.error("Failed to delete layout:", error);
        throw error;
    }
};
