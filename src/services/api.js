import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_BE || "https://yellow-taxi-trip-be.vercel.app/api/trips";
const API_URL_FILTER = process.env.REACT_APP_API_URL_BE_FILTER || "https://yellow-taxi-trip-be.vercel.app/api/trips/filter";

export const fetchAllTrips = async () => {
    return await fetchData(API_URL);
}

export const fetchTripsFilter = async (filters) => {
    return await fetchData(API_URL_FILTER, { params: filters });
};

const fetchData = async (url, config = {}) => {
    try {
        const response = await axios.get(url, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw new Error(`Fetching data failed: ${error.message}`);
    }
};