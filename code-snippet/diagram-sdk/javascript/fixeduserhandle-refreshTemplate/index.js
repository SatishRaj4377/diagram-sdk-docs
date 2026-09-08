var nodes = [
  {
    id: 'node1',
    offsetX: 300,
    offsetY: 300,
    height: 100,
    width: 100,
    style: { fill: '#64A6', strokeColor: '#64Abbb' },
    data: {
      action: 'Add',
      color: '#4CAF50',
    },
    fixedUserHandles: [
      {
        id: 'action',
        pathData:
          'M31.5,13.5 C31.5,20.95,24.44,27,15.75,27 C7.059999999999999,27,0,20.95,0,13.5 C0,6.050000000000001,7.06,0,15.75,0 C24.44,0,31.5,6.05,31.5,13.5 Z M13.12,4.5 L13.12,11.25 L5.25,11.25 L5.25,15.75 L13.12,15.75 L13.12,22.5 L18.38,22.5 L18.38,15.75 L26.25,15.75 L26.25,11.25 L18.38,11.25 L18.38,4.5 Z ',
        width: 20,
        height: 20,
      },
    ],
  },
];

function fixedUserHandleTemplate(obj, node) {
  if (node && node.data) {
    return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${node.data.color};border-radius:50%;color:white;font-size:10px;font-weight:bold;">
              ${node.data.action[0]}
            </div>`;
  }
  return '';
}

var diagram = new ej.diagrams.Diagram(
  {
    width: '100%',
    height: '600px',
    nodes: nodes,
    fixedUserHandleTemplate: fixedUserHandleTemplate,
  },
  '#element'
);

// Update the node data and refresh the fixed user handle template
document.getElementById('updateBtn').onclick = function () {
  // Update the node's data property which is used in the fixed user handle template
  diagram.nodes[0].data.action = 'Remove';
  diagram.nodes[0].data.color = '#FF5722';
  // Refresh the template to reflect the changes
  diagram.refreshTemplate(diagram.nodes[0].fixedUserHandles[0], diagram.nodes[0]);
};
