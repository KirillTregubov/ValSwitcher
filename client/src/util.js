function navigateWithDelay(destination, navigate) {
	setTimeout(() => {
		navigate(`/${destination}`);
	}, 600);
}

export { navigateWithDelay };
