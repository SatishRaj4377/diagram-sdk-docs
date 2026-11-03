import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    async function runWithInput() {
        const designer = workflowInstance.current;
        if (designer) {
            await designer.runExecution({ input: { response: { orderId: 'SO-1001' } } });
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button onClick={runWithInput}>Run with input</button>
        </>
    );
}
