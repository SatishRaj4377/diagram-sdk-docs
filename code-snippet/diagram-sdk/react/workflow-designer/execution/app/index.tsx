import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';
import type { WorkflowDefinitionModel } from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'execution-workflow',
    name: 'Run workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'delay', stepType: 'Delay', name: 'Wait', position: { x: 380, y: 200 },
            props: { delayType: 'Fixed', duration: 1, timeUnit: 'Seconds' }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'delay' },
        { id: 'c2', sourceStepId: 'delay', targetStepId: 'end' }
    ]
};

function App() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    React.useEffect(() => {
        workflowInstance.current?.importWorkflow(workflow).catch((error) => {
            console.error(error);
        });
    }, []);

    async function runWorkflow() {
        try {
            const result = await workflowInstance.current?.runExecution();
            if (result) {
                console.log(result.status);
                result.stepResults.forEach((step) => console.log(step.id, step.response));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="600px" />
            <button onClick={runWorkflow}>Run workflow</button>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('diagram') as HTMLElement);
root.render(<App />);
