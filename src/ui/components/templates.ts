export function getPopupTemplate(isAuthenticated: boolean, parserIsStart: boolean): string {
    return `
      <div class="popup-container">
        <div class="popup">
          <div class="popup-header">
            <span class="popup-logo">Logo</span>
            <button class="popup-close">X</button>
          </div>
          ${
            isAuthenticated
              ? parserIsStart
                ? `<p class="popup-text">Great!<br>Parser started working.<br>You can see progress in your application and close this window.</p>
                  <div id="error-message"></div>
                   <button class="popup-go">Go to application</button>`
                : `<p class="popup-text">Choose amount</p>
                   <div class="popup-controls">
                   <div id="error-message"></div>
                     <button id="decrease" class="popup-btn">-</button>
                     <span id="profileCount" class="popup-amount">50</span>
                     <button id="increase" class="popup-btn">+</button>
                   </div>
                   <button id="startParser" class="popup-start">Start</button>
                   <p class="popup-help">Need help?</p>`
              : `<p class="popup-auth-text">You need sign in your LinkedIn account</p>
              <div id="error-message"></div>
                 <a href="https://www.linkedin.com" target="_blank" id="authBtn" class="popup-auth">
                     Go to LinkedIn
                  </a>
                 <p class="popup-help">Need help?</p>`
          }
        </div>
      </div>
    `;
  }
  