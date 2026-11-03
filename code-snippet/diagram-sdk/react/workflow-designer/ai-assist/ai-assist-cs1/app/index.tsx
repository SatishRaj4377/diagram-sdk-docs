import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    function onBeforeRequestSend(args: any) {
        if (args.requestType === 'AIAssist') {
            args.request.headers = [{ key: 'Authorization', value: 'Bearer ' + getUserToken() }];
        }
    }

    return (
        <WorkflowDesignerComponent
            id="workflow"
            ref={workflowInstance}
            height="500px"
            aiAssistSettings={{
                enabled: true,
                position: 'Right',
                server: { url: 'https://api.mycompany.com/workflow-ai' },
                promptSuggestions: ['Send a Slack message when a new order arrives']
            }}
            beforeRequestSend={onBeforeRequestSend}
        />
    );
}
