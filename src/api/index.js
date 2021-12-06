import axios from "axios";

function mainCaller(path, method, data, headers = {}) {
	const url = "localhost:4000";

	const options = {
		url: `${url}/${path}`,
		headers: {
			...headers,
		},
		method,
	};

	if (data) {
		options.data = JSON.stringify(data);
	}

	return axios(options).then((r) => r.data);
}

export default mainCaller;
