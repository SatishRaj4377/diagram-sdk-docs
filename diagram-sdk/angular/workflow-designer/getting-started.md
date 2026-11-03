---
layout: post
title: Getting started with Angular Workflow Designer | Syncfusion®
description: Learn how to integrate and use the Syncfusion Workflow Designer in an Angular application.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Getting started with Angular Workflow Designer

The Angular Workflow Designer package provides the `ejs-workflowdesigner` component. Add `WorkflowDesignerModule` to your standalone component and use `@ViewChild` when you need to call the designer's methods.

## Prerequisites

Make sure the following tools are installed on your machine:

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en) (the latest long-term support version is recommended)
* [Visual Studio Code](https://code.visualstudio.com)

## Dependencies

The Angular Workflow Designer package uses the following Syncfusion packages:

```
|-- @syncfusion/ej2-angular-workflow-designer
    |-- @syncfusion/ej2-workflow-designer
        |-- @syncfusion/ej2-base
        |-- @syncfusion/ej2-diagrams
        |-- @syncfusion/ej2-buttons
        |-- @syncfusion/ej2-inputs
        |-- @syncfusion/ej2-dropdowns
        |-- @syncfusion/ej2-calendars
        |-- @syncfusion/ej2-navigations
        |-- @syncfusion/ej2-popups
        |-- @syncfusion/ej2-interactive-chat
```

Installing `@syncfusion/ej2-angular-workflow-designer` installs the required Syncfusion dependencies.

## Set up the development environment

Create an Angular application with Angular CLI and install the Workflow Designer package:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm install -g @angular/cli
ng new workflow-angular
cd workflow-angular
npm install @syncfusion/ej2-angular-workflow-designer

{% endhighlight %}
{% endtabs %}

## Import the Syncfusion<sup style="font-size:70%">&reg;</sup> CSS styles

Add the theme styles for the Workflow Designer and its dependencies to `src/styles.css`:

{% tabs %}
{% highlight css tabtitle="styles.css" %}

@import '@syncfusion/ej2-base/styles/tailwind3.css';
@import '@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '@syncfusion/ej2-calendars/styles/tailwind3.css';
@import '@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '@syncfusion/ej2-popups/styles/tailwind3.css';
@import '@syncfusion/ej2-diagrams/styles/tailwind3.css';
@import '@syncfusion/ej2-interactive-chat/styles/tailwind3.css';
@import '@syncfusion/ej2-workflow-designer/styles/tailwind3.css';

{% endhighlight %}
{% endtabs %}

## Add the Workflow Designer to the application

Import `WorkflowDesignerModule` and add it to the standalone component's `imports` collection. Add the designer to the component template with the `<ejs-workflowdesigner>` selector.

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import { Component } from '@angular/core';
import { WorkflowDesignerModule } from '@syncfusion/ej2-angular-workflow-designer';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WorkflowDesignerModule],
    template: `<ejs-workflowdesigner id="workflow" width="100%" height="640px"></ejs-workflowdesigner>`
})
export class App {}

{% endhighlight %}
{% endtabs %}

## Load a workflow

A workflow is a JSON object with steps, connections and optional sticky notes. Use `@ViewChild` to access the designer after Angular creates the view, then call `importWorkflow`:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}
{% raw %}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowDesignerComponent, WorkflowDesignerModule } from '@syncfusion/ej2-angular-workflow-designer';
import type { WorkflowDefinitionModel } from '@syncfusion/ej2-workflow-designer';

const workflow: WorkflowDefinitionModel = {
    schemaVersion: '1.1',
    id: 'order-check',
    name: 'Order check',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 100, y: 200 } },
        {
            id: 'getOrder', stepType: 'ApiRequest', name: 'Get order', position: { x: 340, y: 200 },
            props: { method: 'GET', url: 'https://example.com/api/orders/1' }
        },
        {
            id: 'isPaid', stepType: 'Condition', name: 'Is paid?', position: { x: 580, y: 200 },
            props: {
                conditions: [{ field: '{{$.previousStep.response.body.paid}}', valueType: 'Boolean', operator: 'IsTrue' }]
            }
        },
        { id: 'done', stepType: 'End', name: 'Done', position: { x: 820, y: 120 } },
        {
            id: 'remind', stepType: 'Notify', name: 'Send reminder', position: { x: 820, y: 280 },
            props: { channel: 'Email', to: 'customer@example.com', message: 'Your order is awaiting payment.' }
        }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'getOrder' },
        { id: 'c2', sourceStepId: 'getOrder', targetStepId: 'isPaid' },
        { id: 'c3', sourceStepId: 'isPaid', sourcePort: 'true', targetStepId: 'done' },
        { id: 'c4', sourceStepId: 'isPaid', sourcePort: 'false', targetStepId: 'remind' }
    ]
};

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [WorkflowDesignerModule],
    template: `<ejs-workflowdesigner #workflow id="workflow" height="640px"></ejs-workflowdesigner>`
})
export class App implements AfterViewInit {
    @ViewChild('workflow') public workflowDesigner!: WorkflowDesignerComponent;

    public ngAfterViewInit(): void {
        this.workflowDesigner.importWorkflow(workflow).catch((error: Error) => {
            console.error(error);
        });
    }
}

{% endraw %}
{% endhighlight %}
{% endtabs %}

In this example:

* `schemaVersion` identifies the format of the workflow JSON. Keep it set to `'1.1'`, the value that the **Export** command writes. A workflow without a supported schema version isn't imported.
* `workflowSteps` defines five steps. Each step has an `id`, a `stepType`, a display `name`, and a `position` on the canvas. For every step type and its settings, see [Workflow steps](./workflow-steps).
* `props` holds the settings of a step, such as the request `method` and `url` of the `ApiRequest` step.
* The `Condition` step reads the API response with the expression <code>&#123;&#123;$.previousStep.response.body.paid&#125;&#125;</code>. For more about expressions, see [Expressions and the variable picker](./expressions).
* `workflowConnections` links the steps. `sourcePort` selects the output port that the connection leaves from; on the `Condition` step, it selects the `true` or `false` branch. When `sourcePort` isn't set, the step's `output` port is used. Every step has a single input port, so a connection always enters its target step through that port and you don't need to specify it. For more about ports, see [Connections and ports](./connections).
* `importWorkflow` loads the workflow into the designer.

## Run the application

Run the application in the browser with the following command:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

ng serve

{% endhighlight %}
{% endtabs %}

Click **Execute** in the top toolbar, or press <kbd>Ctrl</kbd> + <kbd>Enter</kbd>, to run the workflow. The execution log shows the result of each step.

N> The sample request uses a placeholder URL, so the **Get order** step fails, the run ends, and the execution log shows the error. To see the full run, replace the URL with an API that returns a JSON object with a `paid` field and allows cross-origin requests (CORS) from your page. When the request succeeds, the run follows the `c2` connection into the input port of the **Is paid?** step, and the condition result then selects the `true` or `false` output port.

If `ng serve` fails, run `npm install` again to make sure all dependencies are installed. If the default port is already in use, stop the other process or choose another port with the Angular CLI.

## See also

* [Workflow steps](./workflow-steps)
* [Connections and ports](./connections)
* [Running workflows](./execution)
