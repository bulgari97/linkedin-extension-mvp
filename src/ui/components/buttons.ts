export function initButtons(): {
    authBtn: HTMLElement | null;
    startParserBtn: HTMLElement | null;
    profileCountInput: HTMLElement | null;
} {
    return {
        authBtn: document.getElementById("authBtn"),
        startParserBtn: document.getElementById("startParser"),
        profileCountInput: document.getElementById("profileCount")
    };
}
