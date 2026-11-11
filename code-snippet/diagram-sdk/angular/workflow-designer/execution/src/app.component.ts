import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowDesignerComponent, WorkflowDesignerModule } from '@syncfusion/ej2-angular-workflow-designer';
import type { WorkflowDefinitionModel } from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'execution-workflow',
    name: 'Run workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'delay', stepType: 'Delay', name: 'Wait', position: { x: 380, y: 200 },
            props: { delayType: 'Fixed', duration: 1, timeUnit: 'Seconds' }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'delay' },
        { id: 'c2', sourceStepId: 'delay', targetStepId: 'end' }
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

    public async runWorkflow(): Promise<void> {
        try {
            const result = await this.workflowDesigner.runExecution();
            console.log(result.status);
            result.stepResults.forEach((step) => console.log(step.id, step.response));
        } catch (error) {
            console.error(error);
        }
    }
}
