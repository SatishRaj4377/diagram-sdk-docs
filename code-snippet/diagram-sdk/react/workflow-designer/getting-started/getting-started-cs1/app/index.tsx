import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function App() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);

    return (
        <WorkflowDesignerComponent
            id="workflow"
            ref={workflowInstance}
            width="100%"
            height="640px"
        />
    );
}

export default App;
