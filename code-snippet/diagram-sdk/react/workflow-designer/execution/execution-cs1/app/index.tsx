import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    async function runWorkflow() {
        const result = await workflowInstance.current?.runExecution();
        if (result) {
            console.log(result.status);
            result.stepResults.forEach((step) => console.log(step.id, step.response));
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button onClick={runWorkflow}>Run workflow</button>
        </>
    );
}
