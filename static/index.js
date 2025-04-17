document.addEventListener("DOMContentLoaded", () => {
  const secretInput = document.querySelector(".secret");
  const totalInput = document.querySelector(".total");
  const requiredInput = document.querySelector(".required");
  const outputList = document.querySelector(".split__section-list");

  function sendSplitRequest() {
    const secret = secretInput.value;
    const parts = totalInput.value;
    const required = requiredInput.value;

    if (!secret.trim()) return;

    const formData = new FormData();
    formData.append("code", secret);
    formData.append("parts", parts);
    formData.append("keys", required);

    fetch("/split", {
      method: "POST",
      body: formData
    })
      .then((response) => response.text())
      .then((data) => {
        outputList.innerHTML = "";

        // split by line, comma, or both
        const shares = data.trim().split(/\s*,\s*|\n/);

        shares.forEach((share, index) => {
          const li = document.createElement("li");
          li.className = "split__section-list-item";
          li.innerHTML = `
            <p>${share}</p>
          `;
          outputList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Split failed:", error);
      });
  }

  // Trigger on input change
  secretInput.addEventListener("input", sendSplitRequest);
  totalInput.addEventListener("input", sendSplitRequest);
  requiredInput.addEventListener("input", sendSplitRequest);
});
