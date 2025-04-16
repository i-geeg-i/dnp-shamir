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
      
        const shares = data.trim().split(/\s*,\s*|\n/);
      
        // Add .numbered class if we have shares, remove if empty
        if (shares.length > 0 && shares[0] !== "") {
          outputList.classList.add("numbered");
        } else {
          outputList.classList.remove("numbered");
        }
      
        shares.forEach((share) => {
          // Strip "1:" or "2:" prefix if it exists
          const cleaned = share.replace(/^\d+\s*:\s*/, "");
      
          const li = document.createElement("li");
          li.className = "split__section-list-item";
          li.innerHTML = `<p>${cleaned}</p>`;
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
  const formatted = lines.map((line, idx) => {
    return /^\d+:\s*/.test(line) ? line : `${idx + 1}:${line.trim()}`;
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
