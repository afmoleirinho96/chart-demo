import axios from "axios";

const API_KEY_VALUE = "9CB4A5BE-B4EF-46C9-BEEC-1300DE72032F";

const headers = {
	"Content-Type": "application/json",
	"X-CoinAPI-Key": `${API_KEY_VALUE}`,
};

const axiosClient = axios.create({
	headers,
	baseURL: `http://localhost:3100/api/v1/`,
});

export default axiosClient;
