import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function exportWorkflow() {
        const designer = workflowInstance.current;
        if (designer) {
            const json = designer.exportWorkflow();
            // myApi stands for your application's save endpoint.
            myApi.save(json);
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button onClick={exportWorkflow}>Export workflow</button>
        </>
    );
}
