export function setupErrorLogging(): void {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.error = function (...args: unknown[]): void {
      originalConsoleError.apply(console, args);
      showErrorOnUI(
          args.map(arg => (arg instanceof Error ? arg.message : arg)).join(" "),
          true
      );
  };

  console.warn = function (...args: unknown[]): void {
      originalConsoleWarn.apply(console, args);
      showErrorOnUI(
          args.map(arg => (arg instanceof Error ? arg.message : arg)).join(" "),
          false
      );
  };

  function showErrorOnUI(message: string, isError: boolean): void {
      const errorElement: HTMLElement | null = document.getElementById("error-message");

      if (errorElement) {
          if (isError || !errorElement.textContent) {
              errorElement.textContent = message;
              errorElement.style.display = "block";
              errorElement.style.color = isError ? "red" : "orange"; 
          }
      }
  }
}
