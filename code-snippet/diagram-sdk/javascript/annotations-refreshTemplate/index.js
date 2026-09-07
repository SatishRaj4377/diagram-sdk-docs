var node = {
  id: 'node1',
  offsetX: 150,
  offsetY: 150,
  width: 100,
  height: 100,
  style: {
    fill: '#6BA5D7',
    strokeColor: 'white',
  },
  annotations: [
    {
      id: 'annotation1',
      width: 100,
      height: 50,
      addInfo: {
        label: 'Start',
        priority: 'High',
      },
    },
  ],
};

var diagram = new ej.diagrams.Diagram(
  {
    width: '100%',
    height: '600px',
    nodes: [node],
    annotationTemplate: '#annotationTemplate',
  },
  '#element'
);

// Update the annotation data and refresh the template
document.getElementById('updateBtn').onclick = function () {
  // Update the annotation's additional data
  diagram.nodes[0].annotations[0].addInfo.label = 'Process';
  diagram.nodes[0].annotations[0].addInfo.priority = 'Low';
  // Refresh the template to reflect the changes
  diagram.refreshTemplate(diagram.nodes[0].annotations[0]);
};
