import { getLayouts, createLayout, updateLayout, deleteLayout } from "./api";
import { Layout } from "./types";

export const fetchLayouts = async (): Promise<Layout[]> => {
    try {
        return await getLayouts();
    } catch (error) {
        console.error("Error fetching layouts:", error);
        throw error;
    }
};

export const addLayout = async (newLayout: Layout): Promise<Layout> => {
    try {
        return await createLayout(newLayout);
    } catch (error) {
        console.error("Error adding layout:", error);
        throw error;
    }
};

//  to modify an existing layout
export const modifyLayout = async (id: string, updatedLayout: Layout): Promise<Layout> => {
    try {
        return await updateLayout(id, updatedLayout);
    } catch (error) {
        console.error("Error modifying layout:", error);
        throw error;
    }
};

export const removeLayout = async (id: string): Promise<void> => {
    try {
        await deleteLayout(id);
    } catch (error) {
        console.error("Error removing layout:", error);
        throw error;
    }
};
