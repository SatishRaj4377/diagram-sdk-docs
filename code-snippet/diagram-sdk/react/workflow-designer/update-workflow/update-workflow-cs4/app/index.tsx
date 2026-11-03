import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function updateOrderSilently() {
        const designer = workflowInstance.current;
        if (!designer) {
            return;
        }

        const updated = designer.updateWorkflowItem('getOrder', {
            name: 'Get order details'
        }, true);

        if (!updated) {
            console.error('The workflow item could not be updated.');
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button type="button" onClick={updateOrderSilently}>Update step without workflowChanged</button>
        </>
    );
}
