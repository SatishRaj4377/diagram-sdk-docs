import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';
import type { WorkflowImportError } from '@syncfusion/ej2-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const designer = workflowInstance.current;
        const file = event.currentTarget.files?.[0];
        if (designer && file) {
            designer.importWorkflow(file).catch((error: WorkflowImportError) => {
                console.error(error.code, error.message);
            });
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <input type="file" onChange={handleFileChange} />
        </>
    );
}
