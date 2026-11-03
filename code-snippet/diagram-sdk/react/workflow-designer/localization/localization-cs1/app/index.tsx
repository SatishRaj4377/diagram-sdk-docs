import * as React from 'react';
import { L10n } from '@syncfusion/ej2-base';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

L10n.load({
    'de-DE': {
        'workflow-designer': {
            'workflowSteps': 'Workflow-Schritte',
            'searchWorkflowSteps': 'Workflow-Schritte suchen',
            'categoryTriggers': 'Auslöser',
            'categoryActions': 'Aktionen',
            'executionLog': 'Ausführungsprotokoll',
            'executionCompleted': 'Ausführung abgeschlossen',
            'cancel': 'Abbrechen'
        }
    }
});

function WorkflowCanvas() {
    return <WorkflowDesignerComponent id="workflow" locale="de-DE" height="450px" />;
}
