var workflow = {
    schemaVersion: '1.1', id: 'execution-workflow', name: 'Run workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        { id: 'delay', stepType: 'Delay', name: 'Wait', position: { x: 380, y: 200 }, props: { delayType: 'Fixed', duration: 1, timeUnit: 'Seconds' } },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'delay' },
        { id: 'c2', sourceStepId: 'delay', targetStepId: 'end' }
    ]
};

var designer = new ej.workflowdesigner.WorkflowDesigner({
    width: '100%',
    height: '600px'
}, '#element');
designer.importWorkflow(workflow);
document.getElementById('runButton').addEventListener('click', function () { designer.runExecution(); });
