
import { toast } from "react-hot-toast"; // Import toast for notifications
import { apiConnector } from '../apiconnector';// Import the apiConnector function
import { catalogData } from '../api'; // Import the API endpoint details

// Function to fetch catalog page data for a specific category
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading..."); // Display loading toast notification
  let result = [null]; // Initialize result array with null
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
      { categoryId: categoryId, }); // Make API call to fetch category page data

    // Check if response indicates success
    if (!response.data)
      throw new Error("Could not Fetch Category page data");

    result = response.data; // Assign the fetched data to result

  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error); // Log error to console
    toast.error(error.message); // Display error toast notification
    result = error.response.data; // Assign error response data to result
  }
  toast.dismiss(toastId); // Dismiss the loading toast
  return result; // Return the result
}
