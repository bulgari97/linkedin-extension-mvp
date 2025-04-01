export function setupAmountControls() {
    let amount = 50;
    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");
    const amountDisplay = document.getElementById("profileCount");
    if (decreaseBtn && increaseBtn && amountDisplay) {
        decreaseBtn.addEventListener("click", () => {
            if (amount > 1) {
                amount--;
                amountDisplay.innerText = String(amount);
            }
        });
        increaseBtn.addEventListener("click", () => {
            amount++;
            amountDisplay.innerText = String(amount);
        });
    }
}
//# sourceMappingURL=setup-amount.js.map