import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    function onNotifyRequested(args: any) {
        fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stepId: args.step.id, notification: args.notification }),
            signal: args.signal
        })
            .then((response: Response) => {
                if (!response.ok) {
                    // fetch resolves for HTTP 4xx/5xx, so fail the step explicitly.
                    args.fail(new Error('Notification failed with HTTP ' + response.status));
                    return;
                }
                args.complete({ sent: true });
            })
            .catch((error: Error) => args.fail(error));
    }

    return <WorkflowDesignerComponent id="workflow" height="500px" notifyRequested={onNotifyRequested} />;
}
