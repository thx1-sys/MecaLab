document.addEventListener("DOMContentLoaded", function () {
  const shapesContainer = document.querySelector(".shapes");
  const numberOfShapes = Math.floor(Math.random() * 6) + 5; // Random number between 5 and 10

  for (let i = 0; i < numberOfShapes; i++) {
    const shape = document.createElement("div");
    shape.classList.add("shape");

    const top = Math.random() * 80; // Reduce range to avoid overlap at the edges
    const left = Math.random() * 80; // Reduce range to avoid overlap at the edges
    const size = Math.random() * 300 + 100; // Random size between 100px and 400px
    const startOpacity = Math.random() * 0.9 + 0.1; // Random start opacity between 0.1 and 1
    const endOpacity = Math.random() * 0.9 + 0.1; // Random end opacity between 0.1 and 1
    const duration = Math.random() * 20 + 10; // Random duration between 10s and 30s
    const translateX = Math.random() * 400 - 200; // Random translateX between -200px and 200px
    const translateY = Math.random() * 400 - 200; // Random translateY between -200px and 200px

    shape.style.top = `${top}%`;
    shape.style.left = `${left}%`;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.background = `rgba(42, 57, 144, ${startOpacity})`;
    shape.style.animation = `float ${duration}s infinite ease-in-out, changeOpacity ${duration}s infinite ease-in-out`;

    shape.style.setProperty("--translateX", `${translateX}px`);
    shape.style.setProperty("--translateY", `${translateY}px`);
    shape.style.setProperty("--startOpacity", startOpacity);
    shape.style.setProperty("--endOpacity", endOpacity);

    shapesContainer.appendChild(shape);
  }
});
