import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    function onWorkflowChanged(args: any) {
        if (args.changeType === 'ConnectionAdded') {
            console.log('Connection added:', args.affectedItem);
        }
    }

    return (
        <WorkflowDesignerComponent
            id="workflow"
            height="640px"
            workflowChanged={onWorkflowChanged}
        />
    );
}
