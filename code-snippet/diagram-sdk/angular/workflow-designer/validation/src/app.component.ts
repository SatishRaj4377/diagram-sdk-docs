import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowDesignerComponent, WorkflowDesignerModule } from '@syncfusion/ej2-angular-workflow-designer';
import type {
    WorkflowDefinitionModel,
    WorkflowValidationResult
} from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'validation-workflow',
    name: 'Validation',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'variable', stepType: 'SetVariable', name: 'Set value', position: { x: 380, y: 200 },
            props: { variables: [{ variableName: 'amount', value: '100', valueType: 'Number' }] }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'variable' },
        { id: 'c2', sourceStepId: 'variable', targetStepId: 'end' }
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
    public workflowReady = false;

    public async ngAfterViewInit(): Promise<void> {
        try {
            await this.workflowDesigner.importWorkflow(workflow);
            this.workflowReady = true;
        } catch (error) {
            console.error(error);
        }
    }

    public validateWorkflow(): void {
        const result: WorkflowValidationResult = this.workflowDesigner.validateWorkflow();
        window.alert(result.isValid ? 'Workflow is valid' : 'Workflow is invalid');
    }
}
