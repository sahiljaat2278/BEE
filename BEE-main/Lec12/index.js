const colors = [
    "orange", "lightblue", "lightgreen", "pink", "purple",
    "yellow", "red", "teal", "brown", "gold"
];

document.getElementById('generateBtn').onclick = function() {
    const box = document.getElementById('box');
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;
};