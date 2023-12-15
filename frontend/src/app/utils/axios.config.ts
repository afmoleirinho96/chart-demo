import axios from "axios";


const headers = {
	"Content-Type": "application/json",
};

const axiosClient = axios.create({
	headers,
	baseURL: `http://localhost:3100/api/v1/`,
});

export default axiosClient;
