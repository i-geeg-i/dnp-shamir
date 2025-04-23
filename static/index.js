document.addEventListener("DOMContentLoaded", () => {
  const secretInput = document.querySelector(".secret");
  const totalInput = document.querySelector(".total");
  const requiredInput = document.querySelector(".required");
  const outputList = document.querySelector(".split__section-list");
  const partsInput = document.querySelector(".parts");
  const combinedOutput = document.querySelector(".combined");

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function sendSplitRequest() {
    const secret = secretInput.value.trim();
    const parts = parseInt(totalInput.value, 10);
    const required = parseInt(requiredInput.value, 10);

    if (!secret) {
      outputList.style.listStyleType = "none";
      outputList.innerHTML = `
        <li class="split__section-list-item">Enter your secret above.</li>
      `;
      return;
    }

    if (
      isNaN(parts) || isNaN(required) ||
      required >= parts ||
      parts < 2 || required < 2
    ) {
      outputList.style.listStyleType = "none";
      outputList.innerHTML = `
        <li class="split__section-list-item">Incorrect values</li>
      `;
      return;
    }

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
        const shares = data.trim().split(/\s*,\s*|\n/);

        const listHTML = shares.map((share) => {
          return `
            <li class="split__section-list-item">
              ${share}
            </li>
          `;
        }).join("");

        outputList.style.listStyleType = "decimal";
        outputList.innerHTML = listHTML;
      })
      .catch((error) => {
        console.error("Split failed:", error);
      });
  }

  const debouncedSendSplitRequest = debounce(sendSplitRequest, 1000);
  secretInput.addEventListener("input", debouncedSendSplitRequest);
  totalInput.addEventListener("input", debouncedSendSplitRequest);
  requiredInput.addEventListener("input", debouncedSendSplitRequest);

  function sendUnionRequest() {
    const rawInput = partsInput.value.trim();

    if (!rawInput) {
      combinedOutput.textContent = "Enter your parts above.";
      return;
    }

    const lines = rawInput.split("\n").filter(line => line.trim() !== "");
    const formatted = lines.map(line => line).join(",");

    const formData = new FormData();
    formData.append("code", formatted);

    fetch("/union", {
      method: "POST",
      body: formData
    })
      .then((response) => response.text())
      .then((result) => {
        combinedOutput.textContent = result;
      })
      .catch((error) => {
        console.error("Union failed:", error);
        combinedOutput.textContent = "An error occurred!";
      });
  }

  partsInput.addEventListener("input", sendUnionRequest);
});
