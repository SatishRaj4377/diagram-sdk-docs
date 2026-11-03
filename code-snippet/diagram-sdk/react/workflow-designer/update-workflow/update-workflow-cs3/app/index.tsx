import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function updateOrderNote() {
        const designer = workflowInstance.current;
        if (!designer) {
            return;
        }

        const updated = designer.updateWorkflowItem('orderNote', {
            text: 'Orders are processed by the fulfillment team.',
            position: { x: 420, y: 180 }
        });

        if (!updated) {
            console.error('The sticky note could not be updated.');
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button type="button" onClick={updateOrderNote}>Update sticky note</button>
        </>
    );
}
