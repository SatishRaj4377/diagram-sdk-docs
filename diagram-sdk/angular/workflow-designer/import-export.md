---
layout: post
title: Import and export in Angular Workflow Designer | Syncfusion®
description: Learn how to save, load and track changes to workflows as JSON in the Syncfusion Angular Workflow Designer.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Import and export in Angular Workflow Designer

Workflows are saved and loaded as JSON. A workflow contains the `id`, `name`, `workflowSteps`, `workflowConnections`, and `stickyNotes` properties. Exported JSON also contains a `schemaVersion` value that identifies its format; keep it unchanged when you store the JSON.

## Export

To get the current workflow as a JSON string, call [`exportWorkflow`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#exportworkflow). You can then store the string, for example in your database:

{% tabs %}
{% highlight ts tabtitle="app.component.ts" %}

import { Component, ViewChild } from '@angular/core';
import { WorkflowDesignerModule, WorkflowDesignerComponent } from '@syncfusion/ej2-angular-workflow-designer';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WorkflowDesignerModule],
    template: '<ejs-workflowdesigner #workflow id="workflow" height="500px"></ejs-workflowdesigner><button type="button" (click)="exportWorkflow()">Save workflow</button>'
})
export class AppComponent {
    @ViewChild('workflow') public workflowDesigner!: WorkflowDesignerComponent;

    exportWorkflow(): void {
        const json = this.workflowDesigner.exportWorkflow();
        // myApi stands for your application's save endpoint.
        myApi.save(json);
    }
}

{% endhighlight %}
{% endtabs %}

Users can also export the workflow as a JSON file with the **Export** toolbar command or by pressing <kbd>Ctrl</kbd> + <kbd>S</kbd>.

N> Secrets are never exported. This includes inline AI keys and the values of sensitive request headers: `Authorization`, and header names that contain `secret`, `token`, or `password`. The credential name in `authRef` is kept. In `'Inline'` credential mode, users must enter AI keys again after an import.

## Import

[`importWorkflow`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#importworkflow) accepts a JSON string, a workflow object, or a `File`, and returns a promise. The following example imports a file that the user selects:

{% tabs %}
{% highlight ts tabtitle="app.component.ts" %}

import { Component, ViewChild } from '@angular/core';
import { WorkflowDesignerModule, WorkflowDesignerComponent } from '@syncfusion/ej2-angular-workflow-designer';
import type { WorkflowImportError } from '@syncfusion/ej2-workflow-designer';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WorkflowDesignerModule],
    template: '<ejs-workflowdesigner #workflow id="workflow" height="500px"></ejs-workflowdesigner><input type="file" (change)="handleFileChange($event)">'
})
export class AppComponent {
    @ViewChild('workflow') public workflowDesigner!: WorkflowDesignerComponent;

    handleFileChange(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.workflowDesigner.importWorkflow(file).catch((error: WorkflowImportError) => {
                console.error(error.code, error.message);
            });
        }
    }
}

{% endhighlight %}
{% endtabs %}

Users can also import a JSON file with the **Import** toolbar command or by pressing <kbd>Ctrl</kbd> + <kbd>O</kbd>.

When the import succeeds, any active run is stopped, the workflow is replaced, and the canvas is fitted to the page. When the import fails, the promise rejects, and the current workflow is left unchanged. The error's `code` tells you why:

| Code | Reason |
|---|---|
| `IMPORT_INVALID_JSON` | The input isn't valid JSON. |
| `IMPORT_TOO_LARGE` | The file or JSON is larger than 5 MB. |
| `IMPORT_UNSUPPORTED_VERSION` | The JSON doesn't have a supported `schemaVersion` value. Workflows exported by the Workflow Designer always have one. |
| `IMPORT_IDS` | A step, connection, or sticky note has an empty or duplicated identifier. |
| `IMPORT_INVALID` | The JSON doesn't have the shape of a workflow, for example, `workflowSteps` isn't an array. |
| `IMPORT_INVALID_STRUCTURE` | The workflow has a structural error, such as a duplicate identifier or a cycle. The error's `messages` property lists the problems. See [Validation on import](./validation#validation-on-import). |

To change a step, connection, or sticky note after the designer is rendered, see [Update workflow properties at runtime](./update-workflow).
