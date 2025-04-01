export function setupAmountControls(): void {
    let amount: number = 50;
    const decreaseBtn: HTMLElement | null = document.getElementById("decrease");
    const increaseBtn: HTMLElement | null = document.getElementById("increase");
    const amountDisplay: HTMLElement | null = document.getElementById("profileCount");
  
    if (decreaseBtn && increaseBtn && amountDisplay) {
      decreaseBtn.addEventListener("click", (): void => {
        if (amount > 1) {
          amount--;
          amountDisplay.innerText = String(amount);
        }
      });
  
      increaseBtn.addEventListener("click", (): void => {
        amount++;
        amountDisplay.innerText = String(amount);
      });
    }
  }
  