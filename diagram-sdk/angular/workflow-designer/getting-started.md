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
{% highlight ts tabtitle="app.component.ts" %}
{% include code-snippet/diagram-sdk/angular/workflow-designer/getting-started/src/app.component.ts %}
{% endhighlight %}
{% highlight html tabtitle="app.component.html" %}
{% include code-snippet/diagram-sdk/angular/workflow-designer/getting-started/src/app.component.html %}
{% endhighlight %}
{% endtabs %}
{% previewsample "https://help.syncfusion.com/samples/diagram-sdk/angular/workflow-designer/getting-started" %}

In this example:

* `schemaVersion` identifies the format of the workflow JSON. Keep it set to `'1.1'`, the value that the **Export** command writes. A workflow without a supported schema version isn't imported.
* `workflowSteps` defines three steps: a Manual Trigger, a Set Variable step, and an End step. Each step has an `id`, a `stepType`, a display `name`, and a `position` on the canvas. For every step type and its settings, see [Workflow steps](./workflow-steps).
* The `SetVariable` step sets the `status` variable to `'Ready'`.
* `workflowConnections` links the steps. When `sourcePort` isn't set, the step's `output` port is used. Every step has a single input port, so a connection always enters its target step through that port and you don't need to specify it. For more about ports, see [Connections and ports](./connections).
* `importWorkflow` loads the workflow into the designer.

## Run the application

Run the application in the browser with the following command:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

ng serve

{% endhighlight %}
{% endtabs %}

Click **Execute** in the top toolbar, or press <kbd>Ctrl</kbd> + <kbd>Enter</kbd>, to run the workflow. The execution log shows the result of each step.

The **Set status** step sets `status` to `'Ready'`, and the **End** step completes the workflow.

If `ng serve` fails, run `npm install` again to make sure all dependencies are installed. If the default port is already in use, stop the other process or choose another port with the Angular CLI.

## See also

* [Workflow steps](./workflow-steps)
* [Connections and ports](./connections)
* [Running workflows](./execution)
