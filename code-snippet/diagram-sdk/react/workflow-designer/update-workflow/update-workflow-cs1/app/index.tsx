import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function updateOrder() {
        const designer = workflowInstance.current;
        if (!designer) {
            return;
        }

        const updated = designer.updateWorkflowItem('getOrder', {
            name: 'Get order details',
            props: {
                method: 'GET',
                url: 'https://api.mycompany.com/orders/1'
            }
        });

        if (!updated) {
            console.error('The workflow item could not be updated.');
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button type="button" onClick={updateOrder}>Update order request</button>
        </>
    );
}
