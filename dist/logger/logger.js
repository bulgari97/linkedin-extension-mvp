export function setupErrorLogging() {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    console.error = function (...args) {
        originalConsoleError.apply(console, args);
        showErrorOnUI(args.map(arg => (arg instanceof Error ? arg.message : arg)).join(" "), true);
    };
    console.warn = function (...args) {
        originalConsoleWarn.apply(console, args);
        showErrorOnUI(args.map(arg => (arg instanceof Error ? arg.message : arg)).join(" "), false);
    };
    function showErrorOnUI(message, isError) {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            if (isError || !errorElement.textContent) {
                errorElement.textContent = message;
                errorElement.style.display = "block";
                errorElement.style.color = isError ? "red" : "orange";
            }
        }
    }
}
//# sourceMappingURL=logger.js.map