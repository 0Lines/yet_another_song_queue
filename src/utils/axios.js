const axiosErrorTypes = {
	noResponse: 1,
	hadResponse: 2,
	other: 3,
}

function handleAxiosError(error) {
	let errorMessage = "";
	let errorType = 0;
	let errorStatus = 0;

	if (error.response) {
		// Request made and server responded
		errorStatus = error.response.status;
		errorMessage = error.response.statusText;
		errorType = axiosErrorTypes.hadResponse;

	} else if (error.request) {
		// The request was made but no response was received
		errorMessage = "There was no response";
		errorType = axiosErrorTypes.noResponse;

	} else {
		// Something happened in setting up the request that triggered an Error
		errorMessage = error.message;
		errorType = axiosErrorTypes.other;
	}

	return { isError: true, errorType, errorStatus: errorStatus, errorMessage }
}

module.exports = { axiosErrorTypes, handleAxiosError }