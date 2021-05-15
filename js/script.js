let select_start = false;
let select_end = false;
let mousedown = false;

for (let i = 1; i < 391; i++) {
    const node = document.createElement("button");
    node.style.width = "100%";
    node.style.height = "100%";
    node.style.border = "2px solid white";
    node.className = "node";
    document.querySelector(".content").appendChild(node);
}

document.querySelectorAll(".node").forEach((el) => {
    const changeColor = () => {
        if (mousedown && !el.already_select) {
            if (!select_start) {
                el.style.backgroundColor = "green";
                select_start = true;
            } else if (!select_end) {
                el.style.backgroundColor = "red";
                select_end = true;
            } else el.style.backgroundColor = "white";
            el.already_select = true;
        }
    };
    el.already_select = false;
    el.onmousedown = () => {
        mousedown = true;
        changeColor();
    };
    el.onmouseup = () => (mousedown = false);
    el.onmouseover = changeColor;
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
