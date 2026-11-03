var workflow = {
    schemaVersion: '1.1', id: 'custom-workflow', name: 'Custom execution',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        { id: 'custom', stepType: 'Custom', name: 'Create invoice', position: { x: 380, y: 200 }, props: { actionType: 'createInvoice', input: { orderId: 'SO-1001' } } },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'custom' },
        { id: 'c2', sourceStepId: 'custom', targetStepId: 'end' }
    ]
};

var designer = new ej.workflowdesigner.WorkflowDesigner({
    width: '100%',
    height: '600px',
    customExecutionRequested: function (args) { args.complete({ invoiceId: 'INV-1001' }); alert('Custom execution completed!'); }
}, '#element');
designer.importWorkflow(workflow);
