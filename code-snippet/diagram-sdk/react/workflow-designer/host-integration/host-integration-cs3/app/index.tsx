import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    function onBeforeRequestSend(args: any) {
        if (args.requestType === 'ApiRequest') {
            const request = args.request;
            if (!request.url.startsWith('https://api.mycompany.com/')) {
                args.cancel = true;
                return;
            }
            // getUserToken stands for your application's sign-in code.
            request.headers = (request.headers || []).concat([
                { key: 'Authorization', value: 'Bearer ' + getUserToken() }
            ]);
        }
    }

    return <WorkflowDesignerComponent id="workflow" height="500px" beforeRequestSend={onBeforeRequestSend} />;
}
