import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    return (
        <WorkflowDesignerComponent
            id="workflow"
            height="500px"
            canvasToolbarSettings={{ items: ['Add', 'ZoomOut', 'ZoomIn', 'Fit'] }}
        />
    );
}
