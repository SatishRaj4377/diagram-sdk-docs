import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

const workflow = {
    schemaVersion: '1.1',
    id: 'custom-workflow',
    name: 'Custom execution',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'custom', stepType: 'Custom', name: 'Create invoice', position: { x: 380, y: 200 },
            props: { actionType: 'createInvoice', input: { orderId: 'SO-1001' } }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'custom' },
        { id: 'c2', sourceStepId: 'custom', targetStepId: 'end' }
    ]
};

function App() {
    const workflowInstance = React.useRef(null);

    React.useEffect(() => {
        workflowInstance.current.importWorkflow(workflow).catch((error) => {
            console.error(error);
        });
    }, []);

    function onCustomExecutionRequested(args) {
        if (args.actionType === 'createInvoice') {
            args.complete({ invoiceId: 'INV-1001' });
        } else {
            args.fail(new Error('Unknown action: ' + args.actionType));
        }
    }

    return (
        <WorkflowDesignerComponent
            id="workflow"
            ref={workflowInstance}
            height="600px"
            customExecutionRequested={onCustomExecutionRequested}
        />
    );
}

const root = ReactDOM.createRoot(document.getElementById('diagram'));
root.render(<App />);
