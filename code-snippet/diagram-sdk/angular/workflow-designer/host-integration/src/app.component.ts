import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowDesignerComponent, WorkflowDesignerModule } from '@syncfusion/ej2-angular-workflow-designer';
import type {
    WorkflowCustomExecutionRequestedEventArgs,
    WorkflowDefinitionModel
} from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'custom-workflow',
    name: 'Custom execution',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'custom', stepType: 'Custom', name: 'Create invoice', position: { x: 380, y: 200 },
            props: { actionType: 'createInvoice', input: { orderId: 'SO-1001' } }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'custom' },
        { id: 'c2', sourceStepId: 'custom', targetStepId: 'end' }
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

    public ngAfterViewInit(): void {
        this.workflowDesigner.importWorkflow(workflow).catch((error: Error) => {
            console.error(error);
        });
    }

    public onCustomExecutionRequested(args: WorkflowCustomExecutionRequestedEventArgs): void {
        if (args.actionType === 'createInvoice') {
            args.complete({ invoiceId: 'INV-1001' });
        } else {
            args.fail(new Error('Unknown action: ' + args.actionType));
        }
    }
}
