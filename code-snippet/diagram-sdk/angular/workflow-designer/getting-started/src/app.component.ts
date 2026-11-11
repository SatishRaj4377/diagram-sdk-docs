import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowDesignerComponent, WorkflowDesignerModule } from '@syncfusion/ej2-angular-workflow-designer';
import type { WorkflowDefinitionModel } from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'simple-workflow',
    name: 'Simple workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'setStatus', stepType: 'SetVariable', name: 'Set status', position: { x: 380, y: 200 },
            props: { variables: [{ variableName: 'status', value: 'Ready', valueType: 'String' }] }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 }, props: { endMessage: 'Workflow completed.' } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'setStatus' },
        { id: 'c2', sourceStepId: 'setStatus', targetStepId: 'end' }
    ]
};

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WorkflowDesignerModule],
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
    @ViewChild('workflow') public workflowDesigner!: WorkflowDesignerComponent;

    public async ngAfterViewInit(): Promise<void> {
        try {
            await this.workflowDesigner.importWorkflow(workflow);
        } catch (error) {
            console.error(error);
        }
    }
}
