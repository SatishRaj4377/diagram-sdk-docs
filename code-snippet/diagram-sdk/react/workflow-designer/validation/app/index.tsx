import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';
import type {
    WorkflowDefinitionModel,
    WorkflowValidationResult
} from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'validation-workflow',
    name: 'Validation',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'variable', stepType: 'SetVariable', name: 'Set value', position: { x: 380, y: 200 },
            props: { variables: [{ variableName: 'amount', value: '100', valueType: 'Number' }] }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'variable' },
        { id: 'c2', sourceStepId: 'variable', targetStepId: 'end' }
    ]
};

function App() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    React.useEffect(() => {
        workflowInstance.current?.importWorkflow(workflow).catch((error) => {
            console.error(error);
        });
    }, []);

    function validateWorkflow() {
        const result: WorkflowValidationResult | undefined = workflowInstance.current?.validateWorkflow();
        if (result) {
            window.alert(result.isValid ? 'Workflow is valid' : 'Workflow is invalid');
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="600px" />
            <button onClick={validateWorkflow}>Validate workflow</button>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('diagram') as HTMLElement);
root.render(<App />);
