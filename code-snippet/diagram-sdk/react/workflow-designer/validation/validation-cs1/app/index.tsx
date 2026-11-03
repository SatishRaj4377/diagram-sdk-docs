import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function validateWorkflow() {
        const result = workflowInstance.current?.validateWorkflow();
        if (result && !result.isValid) {
            result.messages
                .filter((message) => message.type === 'Error')
                .forEach((message) => console.log(message.code, message.stepId, message.message));
        }
    }

    return (
        <>
            <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />
            <button onClick={validateWorkflow}>Validate workflow</button>
        </>
    );
}
