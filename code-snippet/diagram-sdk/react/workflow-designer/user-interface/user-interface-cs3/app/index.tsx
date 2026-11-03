import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowViewer() {
    return (
        <WorkflowDesignerComponent
            id="workflow"
            height="500px"
            workflowSettings={{ readOnly: true, showGridLines: false }}
            toolbarSettings={{ visible: false }}
            stepCollectionSettings={{ visible: false }}
        />
    );
}
