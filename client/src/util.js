function navigateWithDelay(destination, navigate) {
	setTimeout(() => {
		navigate(destination);
	}, 600);
}

function navigateWithSmallDelay(destination, navigate) {
	setTimeout(() => {
		navigate(destination);
	}, 300);
}

export { navigateWithDelay, navigateWithSmallDelay };
