import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';
import type { WorkflowDefinitionModel } from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'order-check',
    name: 'Order check',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 100, y: 200 } },
        {
            id: 'getOrder', stepType: 'ApiRequest', name: 'Get order', position: { x: 340, y: 200 },
            props: { method: 'GET', url: 'https://example.com/api/orders/1' }
        },
        {
            id: 'isPaid', stepType: 'Condition', name: 'Is paid?', position: { x: 580, y: 200 },
            props: {
                conditions: [{ field: '{{$.previousStep.response.body.paid}}', valueType: 'Boolean', operator: 'IsTrue' }]
            }
        },
        { id: 'done', stepType: 'End', name: 'Done', position: { x: 820, y: 120 } },
        {
            id: 'remind', stepType: 'Notify', name: 'Send reminder', position: { x: 820, y: 280 },
            props: { channel: 'Email', to: 'customer@example.com', message: 'Your order is awaiting payment.' }
        }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'getOrder' },
        { id: 'c2', sourceStepId: 'getOrder', targetStepId: 'isPaid' },
        { id: 'c3', sourceStepId: 'isPaid', sourcePort: 'true', targetStepId: 'done' },
        { id: 'c4', sourceStepId: 'isPaid', sourcePort: 'false', targetStepId: 'remind' }
    ]
};

function App() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    React.useEffect(() => {
        workflowInstance.current?.importWorkflow(workflow).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <WorkflowDesignerComponent
            id="workflow"
            ref={workflowInstance}
            height="640px"
        />
    );
}
