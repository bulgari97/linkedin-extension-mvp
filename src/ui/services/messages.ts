export function sendMessage (message: Message): Promise<Response> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (response: Response) => {
        resolve(response);
      });
    });
  };