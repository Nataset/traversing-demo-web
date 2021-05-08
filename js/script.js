for (let i = 1; i < 500; i++) {
    const node = document.createElement("div");
    node.style.width = "100%";
    node.style.height = "100%";
    node.style.border = "2px solid white";
    node.className = "node";
    document.querySelector(".content").appendChild(node);
}

document.querySelectorAll(".node").forEach((el) => {
    el.onclick = () => {
        el.style.backgroundColor = "white";
    };
});

let resizeWindow = () => {
    document.querySelector(".content").style.height = window.innerHeight - 60 + "px";
};
resizeWindow();
window.onresize = resizeWindow;
