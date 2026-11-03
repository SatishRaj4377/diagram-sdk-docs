import { WorkflowDesigner } from '@syncfusion/ej2-workflow-designer';

const workflow: any = {
    schemaVersion: '1.1', id: 'simple-workflow', name: 'Simple workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        { id: 'setStatus', stepType: 'SetVariable', name: 'Set status', position: { x: 380, y: 200 }, props: { variables: [{ variableName: 'status', value: 'Ready', valueType: 'String' }] } },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 }, props: { endMessage: 'Workflow completed.' } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'setStatus' },
        { id: 'c2', sourceStepId: 'setStatus', targetStepId: 'end' }
    ]
};

let designer: WorkflowDesigner = new WorkflowDesigner({
    width: '100%',
    height: '600px'
});
designer.appendTo('#element');
designer.importWorkflow(workflow);
