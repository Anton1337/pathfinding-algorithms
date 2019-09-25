import Node from "./Node";

export default function(grid) {
  const { len, startId, goalId } = setup(grid);

  const open = [];
  open.push(new Node(startId, null));

  const closed = [];

  while (open.length > 0) {
    const n = open.shift();
    closed.push(n.id);

    if (n.id === goalId) return { explored: closed, goalPath: getNodePath(n) };

    const newNodes = getChildNodes(n, len, grid);

    for (let i = 0; i < newNodes.length; i++) {
      if (
        !closed.includes(newNodes[i].id) &&
        open.find(n => n.id === newNodes[i].id) === undefined
      ) {
        open.push(newNodes[i]);
      }
    }
  }
  return false;
}

const setup = grid => {
  const len = grid[0].length;

  let startId;
  let goalId;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (grid[i][j].type === 1) startId = grid[i][j].id;
      if (grid[i][j].type === 2) goalId = grid[i][j].id;
    }
  }

  return { len, startId, goalId };
};

const getChildNodes = (node, len, grid) => {
  const childNodes = [];
  const id = node.id;
  const left = id - 1;
  const right = id + 1;
  const top = id - len;
  const bottom = id + len;

  if (left > 0 && left % len !== 0 && !isWall(left, len, grid)) {
    childNodes.push(new Node(left, node));
  }
  if (right <= 100 && right % len !== 1 && !isWall(right, len, grid)) {
    childNodes.push(new Node(right, node));
  }
  if (top > 0 && !isWall(top, len, grid)) {
    childNodes.push(new Node(top, node));
  }
  if (bottom <= 100 && !isWall(bottom, len, grid)) {
    childNodes.push(new Node(bottom, node));
  }

  return childNodes;
};

const isWall = (id, len, grid) => {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (grid[i][j].id === id && grid[i][j].type === 3) return true;
    }
  }
  return false;
};

const getNodePath = node => {
  const path = [];
  let n = node;
  while (n != null) {
    path.push(n.id);
    n = n.parent;
  }
  return path;
};
