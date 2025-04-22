document.addEventListener("DOMContentLoaded", () => {
  const secretInput = document.querySelector(".secret");
  const totalInput = document.querySelector(".total");
  const requiredInput = document.querySelector(".required");
  const outputList = document.querySelector(".split__section-list");

  function sendSplitRequest() {
    const secret = secretInput.value;
    const parts = totalInput.value;
    const required = requiredInput.value;
  
    if (!secret.trim()) {
      outputList.style.listStyleType = "none";
      outputList.innerHTML = `
        <li class="split__section-list-item">Enter your secret above.</li>
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
  
        const listHTML = shares.map((share, index) => {
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
  
  
  

  // Trigger on input change
  secretInput.addEventListener("input", sendSplitRequest);
  totalInput.addEventListener("input", sendSplitRequest);
  requiredInput.addEventListener("input", sendSplitRequest);
});


const partsInput = document.querySelector(".parts");
const combinedOutput = document.querySelector(".combined");

function sendUnionRequest() {
  const rawInput = partsInput.value.trim();

  if (!rawInput) {
    combinedOutput.textContent = "Enter your parts above.";
    return;
  }

  const lines = rawInput.split("\n").filter(line => line.trim() !== "");

  // Add index prefix only if missing
  // const formatted = lines.map((line, idx) => {
  //   return /^\d+:\s*/.test(line) ? line : `${idx + 1}:${line.trim()}`;
  // }).join(",");
  const formatted = lines.map((line, idx) => {
    return line;
  }).join(",");
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

//  Trigger like split
partsInput.addEventListener("input", sendUnionRequest);
