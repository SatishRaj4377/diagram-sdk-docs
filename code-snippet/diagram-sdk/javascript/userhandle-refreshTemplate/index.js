var nodes = [
  {
    id: 'node1',
    offsetX: 150,
    offsetY: 150,
    height: 100,
    width: 100,
    style: { fill: '#6BA5D7', strokeColor: 'white' },
  },
];

var userHandles = [
  {
    name: 'handle1',
    offset: 1,
    side: 'Right',
  },
];

function userHandleTemplate(obj, name) {
  return `<div style="width:50px;height:100%;display:flex;align-items:center;justify-content:center;background:${name === "Delete" ? "red" : "#4CAF50"};border-radius:4px;color:white;font-size:12px;font-weight:bold;">
            ${name}
          </div>`;
}

var diagram = new ej.diagrams.Diagram(
  {
    width: '100%',
    height: '600px',
    nodes: nodes,
    selectedItems: {
      userHandles: userHandles,
    },
    userHandleTemplate: userHandleTemplate(this, "Edit"),
    created: function () {
      setTimeout(function () {
        diagram.select([diagram.nodes[0]]);
      }, 100);
    },
  },
  '#element'
);

document.getElementById('updateBtn').onclick = function () {
  diagram.userHandleTemplate = userHandleTemplate(this, "Delete")
  diagram.refreshTemplate();
  diagram.select([diagram.nodes[0]]);
};
