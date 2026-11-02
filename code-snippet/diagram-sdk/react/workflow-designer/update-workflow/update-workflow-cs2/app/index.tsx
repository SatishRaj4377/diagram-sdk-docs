import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function updateConnection() {
        const designer = workflowInstance.current;
        if (!designer) {
            return;
        }

        const updated = designer.updateWorkflowItem('toApproved', {
            label: 'Approved',
            type: 'Straight'
        });

        if (!updated) {
            console.error('The workflow connection could not be updated.');
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button type="button" onClick={updateConnection}>Update connection</button>
        </>
    );
}
