import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    function onCustomExecutionRequested(args: any) {
        if (args.actionType === 'createInvoice') {
            invoiceService.create(args.input).then(
                (invoice) => args.complete(invoice),
                (error: Error) => args.fail(error)
            );
        } else {
            args.fail(new Error('Unknown action: ' + args.actionType));
        }
    }

    return <WorkflowDesignerComponent id="workflow" height="500px" customExecutionRequested={onCustomExecutionRequested} />;
}
