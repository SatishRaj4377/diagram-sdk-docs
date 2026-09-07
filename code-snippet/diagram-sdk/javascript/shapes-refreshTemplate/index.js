var node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 120,
  height: 120,
  shape: {
    type: 'HTML',
  },
  addInfo: {
    title: 'Employee',
    department: 'Engineering',
  },
};

function nodeTemplate(obj) {
  return `<div style="background:#e3165b;color:white;padding:10px;border-radius:5px;text-align:center;height:100%;width:100%;display:flex;flex-direction:column;justify-content:center;">
            <div style="font-weight:bold;font-size:14px;">${obj.addInfo.title}</div>
            <div style="font-size:12px;margin-top:5px;">${obj.addInfo.department}</div>
          </div>`;
}

var diagram = new ej.diagrams.Diagram(
  {
    width: '100%',
    height: '600px',
    nodes: [node],
    nodeTemplate: nodeTemplate,
  },
  '#element'
);

// Update the node data and refresh the template
document.getElementById('updateBtn').onclick = function () {
  // Update the additional data
  diagram.nodes[0].addInfo.title = 'Manager';
  diagram.nodes[0].addInfo.department = 'Human Resources';
  // Refresh the template to reflect the changes
  diagram.refreshTemplate(diagram.nodes[0]);
};
