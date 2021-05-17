class node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.prev = false;
        this.visited = false;
    }

    find_neighbor() {
        const x = this.x;
        const y = this.y;
        const neighbor = new Array();
        if (x - 1 >= 0) neighbor.push(graph[x - 1][y]);
        if (x + 1 < X_SIZE) neighbor.push(graph[x + 1][y]);
        if (y - 1 >= 0) neighbor.push(graph[x][y - 1]);
        if (y + 1 < Y_SIZE) neighbor.push(graph[x][y + 1]);
        return neighbor;
    }

    valueReset() {
        this.prev = false;
        this.visited = false;
    }
}

let select_start = false;
let select_end = false;
let mousedown = false;
let ready_state = true;
let start_node;
let end_node;
const X_SIZE = 20;
const Y_SIZE = 45;
let graph = new Array();

const creatNode = (x, y) => {
    const node = document.createElement("button");
    node.style.width = "100%";
    node.style.height = "100%";
    node.style.border = "2px solid white";
    node.className = "node";
    node.id = `node[${x}][${y}]`;

    node.x = x;
    node.y = y;
    node.already_select = false;
    node.onmousedown = () => {
        mousedown = true;
        handleButtonOnCick(node);
    };
    node.onmouseup = () => {
        mousedown = false;
    };
    node.onmouseover = () => {
        if (mousedown) handleButtonOnCick(node);
    };

    document.querySelector(".content").appendChild(node);
};

const creatGraph = (x, y) => {
    for (let i = 0; i < x; i++) {
        graph[i] = new Array();
        for (let j = 0; j < y; j++) {
            graph[i][j] = new node(i, j);
            creatNode(i, j);
        }
    }
};

const resetGraph = (graph) => {
    graph.forEach((row) => {
        row.forEach((node) => {
            node.valueReset();
        });
    });
};

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
};

const resetNode = () => {
    document.querySelectorAll(".node").forEach((el) => {
        el.already_select = false;
        el.style.backgroundColor = "black";
    });
};

const setNeighbor = (graph) => {
    graph.forEach((row) => {
        row.forEach((node) => {
            node.neighbor = node.find_neighbor();
        });
    });
};

const printGraph = (graph) => {
    graph.forEach((row) => {
        row.forEach((node) => {
            console.log(node);
        });
    });
};

const setPath = async (path) => {
    for (const node in path) {
        const x = path[node].x;
        const y = path[node].y;
        await delay(50);

        document.getElementById(`node[${x}][${y}]`).style.backgroundColor = "blue";
    }
};

const BFS = async (start, end) => {
    const queue = [];
    queue.push(start);
    start.visited = true;

    while (queue.length > 0) {
        start = queue.shift();

        for (let i = 0; i < start.neighbor.length; i++) {
            const curr = start.neighbor[i];
            if (curr.visited) continue;

            curr.visited = true;
            queue.push(curr);
            curr.prev = start;

            if (curr == end) {
                let tmp_curr = curr;
                const path = [];
                while (tmp_curr.prev.prev) {
                    path.push(tmp_curr.prev);
                    tmp_curr = tmp_curr.prev;
                }
                await setPath(path.reverse());
                return true;
            }
            await delay(5);
            document.getElementById(`node[${curr.x}][${curr.y}]`).style.backgroundColor = "#7a7a7a";
        }
    }
};

const handleButtonOnCick = (el) => {
    if (!el.already_select && ready_state) {
        if (!select_start) {
            el.style.backgroundColor = "green";
            select_start = true;
            start_node = graph[el.x][el.y];
        } else if (!select_end) {
            el.style.backgroundColor = "red";
            select_end = true;
            end_node = graph[el.x][el.y];
        } else {
            el.style.backgroundColor = "white";
            graph[el.x][el.y].visited = true;
        }
        el.already_select = true;
    }
};

document.querySelector("#reset").onclick = () => {
    if (ready_state) {
        select_start = false;
        select_end = false;
        mousedown = false;
        start_node = undefined;
        end_node = undefined;
        resetNode();
        resetGraph(graph);
    }
};

document.querySelector("#start").onclick = async () => {
    if (select_start && select_end && ready_state) {
        ready_state = false;
        let find_node = await BFS(start_node, end_node);
        if (!find_node) alert("can't find a way");
    }
    ready_state = true;
};

let resizeWindow = () => {
    document.querySelector(".content").style.height = window.innerHeight - 110 + "px";
};

resizeWindow();
window.onresize = resizeWindow;

creatGraph(X_SIZE, Y_SIZE);

setNeighbor(graph);

// printGraph(graph);
