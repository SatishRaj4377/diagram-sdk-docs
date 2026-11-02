---
layout: post
title: Getting started with Vue Workflow Designer | Syncfusion®
description: Learn how to integrate and use the Syncfusion Workflow Designer control in a Vue application.
control: Workflow Designer
platform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Getting started with Vue 3 Workflow Designer

This section explains how to create a Workflow Designer in a Vue 3 application, load a workflow into it, and run the workflow.

## Prerequisites

Make sure the following tools are installed on your machine:

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en) (the latest long-term support version is recommended)
* [Visual Studio Code](https://code.visualstudio.com)

## Dependencies

The Workflow Designer package depends on the following packages:

```text
|-- @syncfusion/ej2-vue-workflow-designer
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

Open a command prompt in the folder where you want to create the project. Then run the following commands to create a Vue 3 project with Vite and install its packages:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm create vite@latest my-workflow-app -- --template vue
cd my-workflow-app
npm install

{% endhighlight %}
{% endtabs %}

## Add the Syncfusion<sup style="font-size:70%">&reg;</sup> Workflow Designer package

Install the Workflow Designer package from npm:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm install @syncfusion/ej2-vue-workflow-designer --save

{% endhighlight %}
{% endtabs %}

## Import the Syncfusion<sup style="font-size:70%">&reg;</sup> CSS styles

The Workflow Designer needs Syncfusion<sup style="font-size:70%">&reg;</sup> theme styles to display correctly. Install the Tailwind 3 theme package:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm install @syncfusion/ej2-tailwind3-theme

{% endhighlight %}
{% endtabs %}

Then add the following reference to the `<style>` section of `src/App.vue`:

{% tabs %}
{% highlight css tabtitle="App.vue" %}

@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";

{% endhighlight %}
{% endtabs %}

N> The theme package includes the styles for the Workflow Designer and the controls it depends on, so you don't need a separate import for each dependency. To use a different theme, replace the theme package in the import path with the package of the theme you want. For the list of available themes, see [Themes](https://ej2.syncfusion.com/vue/documentation/appearance/theme).

## Add the HTML element

The Vite project uses `index.html` to provide the application mount element:

{% tabs %}
{% highlight html tabtitle="index.html" %}

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Essential JS 2 Workflow Designer</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>

{% endhighlight %}
{% endtabs %}

## Create the Workflow Designer

Open `src/App.vue` and add the following code:

{% tabs %}
{% highlight html tabtitle="App.vue" %}

<template>
    <ejs-workflowdesigner :width="width" :height="height"></ejs-workflowdesigner>
</template>

<script setup>
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const width = '100%';
const height = '640px';
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>

{% endhighlight %}
{% endtabs %}

In this example:

* [`width`](https://ej2.syncfusion.com/vue/documentation/api/workflow-designer/#width) and [`height`](https://ej2.syncfusion.com/vue/documentation/api/workflow-designer/#height) set the size of the designer. Both accept a number of pixels or any CSS length, and both default to `'100%'`.
* The `ejs-workflowdesigner` element renders the Workflow Designer component.

N> The `WorkflowDesignerComponent as EjsWorkflowdesigner` import makes the component available as the `<ejs-workflowdesigner>` element in the Vue template.

## Load a workflow

A workflow is a JSON object that contains steps, connections, and optional sticky notes. To load one, replace the contents of `src/App.vue` with the following code:

{% tabs %}
{% highlight html tabtitle="App.vue" %}

{% raw %}
<template>
    <ejs-workflowdesigner ref="workflowDesigner" :height="height"></ejs-workflowdesigner>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const workflowDesigner = ref(null);
const height = '640px';
const workflow = {
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

onMounted(() => {
    workflowDesigner.value.ej2Instances.importWorkflow(workflow);
});
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
{% endraw %}

{% endhighlight %}
{% endtabs %}

In this example:

* `schemaVersion` identifies the format of the workflow JSON. Keep it set to `'1.1'`, the value that the **Export** command writes. A workflow without a supported schema version isn't imported.
* `workflowSteps` defines five steps. Each step has an `id`, a `stepType`, a display `name`, and a `position` on the canvas. For every step type and its settings, see [Workflow steps](./workflow-steps).
* `props` holds the settings of a step, such as the request `method` and `url` of the `ApiRequest` step.
* The `Condition` step reads the API response with the expression <code>&#123;&#123;$.previousStep.response.body.paid&#125;&#125;</code>. For more about expressions, see [Expressions and the variable picker](./expressions).
* `workflowConnections` links the steps. `sourcePort` selects the output port that the connection leaves from; on the `Condition` step, it selects the `true` or `false` branch. When `sourcePort` isn't set, the step's `output` port is used. Every step has a single input port, so a connection always enters its target step through that port and you don't need to specify it. For more about ports, see [Connections and ports](./connections).
* [`importWorkflow`](https://ej2.syncfusion.com/vue/documentation/api/workflow-designer/#importworkflow) loads the workflow into the designer.

## Run the application

Run the application with the following command:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm run dev

{% endhighlight %}
{% endtabs %}

Open the local URL shown in the terminal. The designer displays the order-check workflow.

To run the workflow, click **Execute** in the top toolbar or press <kbd>Ctrl</kbd> + <kbd>Enter</kbd>. The execution log shows the result of each step.

N> The sample request uses a placeholder URL, so the **Get order** step fails, the run ends, and the execution log shows the error. To see the full run, replace the URL with an API that returns a JSON object with a `paid` field and allows cross-origin requests (CORS) from your page. When the request succeeds, the run follows the `c2` connection into the input port of the **Is paid?** step, and the condition result then selects the `true` or `false` output port.

If `npm run dev` fails, run `npm install` again to make sure all dependencies are installed.

## See also

* [Workflow steps](./workflow-steps)
* [Connections and ports](./connections)
* [Running workflows](./execution)
