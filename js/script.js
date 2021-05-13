for (let i = 1; i < 391; i++) {
    const node = document.createElement("button");
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

document.querySelector("#reset").onclick = () => {
    document.querySelectorAll(".node").forEach((el) => {
        el.style.backgroundColor = "black";
    });
};

let resizeWindow = () => {
    document.querySelector(".content").style.height = window.innerHeight - 110 + "px";
};

resizeWindow();
window.onresize = resizeWindow;
