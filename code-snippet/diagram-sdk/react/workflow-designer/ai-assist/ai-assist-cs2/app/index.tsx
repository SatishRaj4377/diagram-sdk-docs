import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    return (
        <WorkflowDesignerComponent
            id="workflow"
            height="500px"
            aiAssistSettings={{
                enabled: true,
                promptSuggestions: [
                    'Every morning, fetch open tickets and email a summary to the team',
                    'Add an approval step before the email is sent'
                ]
            }}
        />
    );
}
