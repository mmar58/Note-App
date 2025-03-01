export function createFloatingInput({ placeholder, onSubmit, onCancel }) {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.padding = "10px";
    container.style.background = "white";
    container.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    container.style.borderRadius = "8px";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "8px";
    container.style.zIndex = "1000";
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.style.padding = "8px";
    input.style.border = "1px solid #ccc";
    input.style.borderRadius = "4px";
  
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.gap = "8px";
  
    const regenerateButton = document.createElement("button");
    regenerateButton.textContent = "Regenerate";
    regenerateButton.style.background = "#4CAF50";
    regenerateButton.style.color = "white";
    regenerateButton.style.padding = "6px 12px";
    regenerateButton.style.border = "none";
    regenerateButton.style.borderRadius = "4px";
    regenerateButton.style.cursor = "pointer";
    regenerateButton.onclick = onSubmit;
  
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.style.background = "#ccc";
    cancelButton.style.padding = "6px 12px";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "4px";
    cancelButton.style.cursor = "pointer";
    cancelButton.onclick = onCancel;
  
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(regenerateButton);
    container.appendChild(input);
    container.appendChild(buttonContainer);
  
    return { container, input, regenerateButton, cancelButton };
  }
  