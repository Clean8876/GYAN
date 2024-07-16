
import { toast } from "react-hot-toast";
import { apiConnector } from '../apiconnector';
import { catalogData } from "../api";

// Function to fetch catalog page data for a specific category
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading..."); // Display loading toast notification
  let result = null; // Initialize result with null

  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
       categoryId
    });

    // Check if response indicates success
    if (!response.data) {
      throw new Error("Could not fetch category page data");
    }

    result = response.data; 
// Assign the fetched data to result
  } catch (error) {
    console.error("Error fetching catalog page data:", error); // Log error to console
    toast.error(error.message); // Display error toast notification
    result = null; // Assign null to result in case of error
  }

  toast.dismiss(toastId); // Dismiss the loading toast
  return result; // Return the result
};
