import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    async function saveWorkflow() {
        const designer = workflowInstance.current;
        if (designer) {
            await myApi.save(designer.exportWorkflow());
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button onClick={saveWorkflow}>Save</button>
        </>
    );
}
