const colors = [
      "orange", "lightblue", "lightgreen", "pink", "purple",
      "yellow", "red", "teal", "brown", "gold"
    ];

    const box = document.getElementById("box");
    let interval;

    document.getElementById("generateBtn").onclick = function () {
      if (interval) return; 

      interval = setInterval(() => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        box.style.backgroundColor = color;
      }, 500);
    };

    document.getElementById("stopBtn").onclick = function () {
      clearInterval(interval);
      interval = null;
    };