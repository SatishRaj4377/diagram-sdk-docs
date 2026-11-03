import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';
import type { WorkflowWebhookTriggerMessage } from '@syncfusion/ej2-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    React.useEffect(() => {
        async function onWorkflowWebhookTriggered(message: WorkflowWebhookTriggerMessage) {
            const designer = workflowInstance.current;
            if (!designer) {
                return;
            }

            try {
                const result = await designer.triggerWebhook(message);
                console.log('Run finished:', result.status);
            } catch (error) {
                console.error(error);
            }
        }

        connection.on('WorkflowWebhookTriggered', onWorkflowWebhookTriggered);
        return () => connection.off('WorkflowWebhookTriggered', onWorkflowWebhookTriggered);
    }, []);

    return <WorkflowDesignerComponent id="workflow" ref={workflowInstance} height="500px" />;
}
