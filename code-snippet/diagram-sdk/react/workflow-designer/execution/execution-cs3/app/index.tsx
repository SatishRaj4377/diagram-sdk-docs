import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    return (
        <WorkflowDesignerComponent
            id="workflow"
            executionSettings={{ executionSpeed: 1000 }}
            height="500px"
        />
    );
}
