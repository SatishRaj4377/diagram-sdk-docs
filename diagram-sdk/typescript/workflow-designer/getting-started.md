---
layout: post
title: Getting started with TypeScript Workflow Designer control | Syncfusion®
description: Check out and learn about getting started with the TypeScript Workflow Designer control of Syncfusion Essential JS 2 and more details.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Getting Started with EJ2 TypeScript Workflow Designer

This section explains how to create a Workflow Designer in a TypeScript application, load a workflow into it, and run the workflow.

## Prerequisites

Make sure the following tools are installed on your machine:

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en) (the latest long-term support version is recommended)
* [Visual Studio Code](https://code.visualstudio.com)

## Dependencies

The Workflow Designer package depends on the following packages:

```
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

## Set up the development environment

Open a command prompt in the folder where you want to create the project. Then run the following commands to clone the Syncfusion<sup style="font-size:70%">&reg;</sup> TypeScript (Essential<sup style="font-size:70%">&reg;</sup> JS 2) quickstart project from [GitHub](https://github.com/SyncfusionExamples/ej2-quickstart-webpack), open its folder, and install its packages:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
npm install

{% endhighlight %}
{% endtabs %}

## Add the Syncfusion<sup style="font-size:70%">&reg;</sup> Workflow Designer package

Install the Workflow Designer package from npm:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm install @syncfusion/ej2-workflow-designer --save

{% endhighlight %}
{% endtabs %}

## Import the Syncfusion<sup style="font-size:70%">&reg;</sup> CSS styles

The Workflow Designer needs Syncfusion<sup style="font-size:70%">&reg;</sup> theme styles to display correctly. Install the Tailwind theme package:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm install @syncfusion/ej2-tailwind-theme

{% endhighlight %}
{% endtabs %}

Then add the following reference to `src/styles/styles.css`:

{% tabs %}
{% highlight css tabtitle="styles.css" %}

@import "../../node_modules/@syncfusion/ej2-tailwind-theme/styles/workflow-designer/index.css";

{% endhighlight %}
{% endtabs %}

N> The theme package includes the styles for the Workflow Designer and the controls it depends on, so you don't need a separate import for each dependency. To use a different theme, replace the theme package in the import path with the package of the theme you want. For the list of available themes, see [Themes](https://ej2.syncfusion.com/documentation/appearance/theme).

## Add the HTML element

Open `src/index.html` and replace its contents with the following HTML:

{% tabs %}
{% highlight html tabtitle="index.html" %}

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 Workflow Designer</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <!-- The element that renders as the Workflow Designer -->
    <div id="workflowDesigner"></div>
</body>
</html>

{% endhighlight %}
{% endtabs %}

## Create the Workflow Designer

Open `src/app/app.ts` and add the following code:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import { WorkflowDesigner } from '@syncfusion/ej2-workflow-designer';

const designer: WorkflowDesigner = new WorkflowDesigner({
    width: '100%',
    height: '640px'
});
designer.appendTo('#workflowDesigner');

{% endhighlight %}
{% endtabs %}

In this example:

* [`width`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#width) and [`height`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#height) set the size of the designer. Both accept a number of pixels or any CSS length, and both default to `'100%'`.
* `appendTo` renders the designer in the `#workflowDesigner` element.

N> Make sure the application entry point (for example, `src/index.ts`) imports `src/app/app.ts`, so that the designer is created when the app loads.

## Load a workflow

A workflow is a JSON object that contains steps, connections, and optional sticky notes. To load one, replace the contents of `src/app/app.ts` with the following code:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}
{% raw %}

import { WorkflowDesigner, WorkflowDefinitionModel } from '@syncfusion/ej2-workflow-designer';

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

const designer: WorkflowDesigner = new WorkflowDesigner({ height: '640px' });
designer.appendTo('#workflowDesigner');
designer.importWorkflow(workflow);

{% endraw %}
{% endhighlight %}
{% endtabs %}

In this example:

* `schemaVersion` identifies the format of the workflow JSON. Keep it set to `'1.1'`, the value that the **Export** command writes. A workflow without a supported schema version isn't imported.
* `workflowSteps` defines five steps. Each step has an `id`, a `stepType`, a display `name`, and a `position` on the canvas. For every step type and its settings, see [Workflow steps](./workflow-steps).
* `props` holds the settings of a step, such as the request `method` and `url` of the `ApiRequest` step.
* The `Condition` step reads the API response with the expression <code>&#123;&#123;$.previousStep.response.body.paid&#125;&#125;</code>. For more about expressions, see [Expressions and the variable picker](./expressions).
* `workflowConnections` links the steps. `sourcePort` selects the output port that the connection leaves from; on the `Condition` step, it selects the `true` or `false` branch. When `sourcePort` isn't set, the step's `output` port is used. Every step has a single input port, so a connection always enters its target step through that port and you don't need to specify it. For more about ports, see [Connections and ports](./connections).
* [`importWorkflow`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#importworkflow) loads the workflow into the designer.

## Run the application

Run the application with the following command:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm start

{% endhighlight %}
{% endtabs %}

Open the local URL shown in the terminal, such as `http://localhost:4000`. The designer displays the order-check workflow.

To run the workflow, click **Execute** in the top toolbar or press <kbd>Ctrl</kbd> + <kbd>Enter</kbd>. The execution log shows the result of each step.

N> The sample request uses a placeholder URL, so the **Get order** step fails, the run ends, and the execution log shows the error. To see the full run, replace the URL with an API that returns a JSON object with a `paid` field and allows cross-origin requests (CORS) from your page. When the request succeeds, the run follows the `c2` connection into the input port of the **Is paid?** step, and the condition result then selects the `true` or `false` output port.

If `npm start` fails, run `npm install` again to make sure all dependencies are installed. If the default port is already in use, stop the other process or change the port in the webpack configuration.

## See also

* [Workflow steps](./workflow-steps)
* [Connections and ports](./connections)
* [Running workflows](./execution)
* [Default Functionalities demo](https://ej2.syncfusion.com/demos/#/tailwind3/workflow-designer/default-functionalities.html)
