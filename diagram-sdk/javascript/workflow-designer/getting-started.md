---
layout: post
title: Getting started with JavaScript Workflow Designer control | Syncfusion®
description: Check out and learn about getting started with the JavaScript Workflow Designer control of Syncfusion® Essential JS 2 and more details.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Getting started with JavaScript Workflow Designer control

This section explains how to create a Workflow Designer in a JavaScript application, load a workflow into it, and run the workflow.

## Prerequisites

Make sure the following tools are installed on your machine:

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en) (the latest long-term support version is recommended)
* [Visual Studio Code](https://code.visualstudio.com)

## Dependencies

The Workflow Designer package depends on the following packages:

```text
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

Open a command prompt in the folder where you want to create the project. Then run the following commands to clone the Syncfusion<sup style="font-size:70%">&reg;</sup> JavaScript (Essential<sup style="font-size:70%">&reg;</sup> JS 2) quickstart project from [GitHub](https://github.com/SyncfusionExamples/ej2-quickstart-webpack), open its folder, and install its packages:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

git clone https://github.com/syncfusion/ej2-quickstart.git quickstart
cd quickstart
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

Add the theme styles for the Workflow Designer and its dependencies to `~/src/styles/styles.css`:

{% tabs %}
{% highlight css tabtitle="styles.css" %}

@import '../../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-diagrams/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css';
@import '../../node_modules/@syncfusion/ej2-workflow-designer/styles/tailwind3.css';

{% endhighlight %}
{% endtabs %}

Each stylesheet is imported separately for the controls used by the Workflow Designer. To use a different theme, replace `tailwind3` in each import path with the name of the theme you want. For the list of available themes, see [Themes](https://ej2.syncfusion.com/documentation/appearance/theme).

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
    <link href="styles/styles.css" rel="stylesheet" />
</head>
<body>
    <div id="workflowDesigner"></div>
</body>
</html>

{% endhighlight %}
{% endtabs %}

## Create the Workflow Designer

Open `src/app/app.js` and add the following code:

{% tabs %}
{% highlight js tabtitle="app.js" %}

const designer = new ej.workflowdesigner.WorkflowDesigner({
    width: '100%',
    height: '640px'
});
designer.appendTo('#workflowDesigner');

{% endhighlight %}
{% endtabs %}

In this example:

* [`width`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#width) and [`height`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#height) set the size of the designer. Both accept a number of pixels or any CSS length, and both default to `'100%'`.
* `appendTo` renders the designer in the `#workflowDesigner` element.

N> Make sure the application entry point (for example, `src/index.js`) imports `src/app/app.js`, so that the designer is created when the app loads.

## Load a workflow

A workflow is a JSON object that contains steps, connections, and optional sticky notes. Use the `importWorkflow` method to load a workflow definition into the Workflow Designer.

{% tabs %}
{% highlight js tabtitle="index.js" %}
{% include code-snippet/diagram-sdk/javascript/workflow-designer-default/index.js %}
{% endhighlight %}
{% highlight html tabtitle="index.html" %}
{% include code-snippet/diagram-sdk/javascript/workflow-designer-default/index.html %}
{% endhighlight %}
{% endtabs %}
{% previewsample "https://help.syncfusion.com/code-snippet/diagram-sdk/javascript/workflow-designer-default" %}

In this example:

* `schemaVersion` identifies the format of the workflow JSON. Keep it set to `'1.1'`, the value that the **Export** command writes. A workflow without a supported schema version isn't imported.
* `workflowSteps` defines three steps: a Manual Trigger, a Set Variable step, and an End step. Each step has an `id`, a `stepType`, a display `name`, and a `position` on the canvas. For every step type and its settings, see [Workflow steps](./workflow-steps).
* The `SetVariable` step sets the `status` variable to `'Ready'`.
* `workflowConnections` links the steps. When `sourcePort` isn't set, the step's `output` port is used. Every step has a single input port, so a connection always enters its target step through that port and you don't need to specify it. For more about ports, see [Connections and ports](./connections).
* [`importWorkflow`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#importworkflow) loads the workflow into the designer.

## Run the application

Run the application with the following command:

{% tabs %}
{% highlight bash tabtitle="CMD" %}

npm start

{% endhighlight %}
{% endtabs %}

Open the local URL shown in the terminal, such as `http://localhost:4000`. The designer displays the simple workflow.

To run the workflow, click **Execute** in the top toolbar or press <kbd>Ctrl</kbd> + <kbd>Enter</kbd>. The execution log shows the result of each step.

If `npm start` fails, run `npm install` again to make sure all dependencies are installed. If the default port is already in use, stop the other process or change the port in the webpack configuration.

## See also

* [Workflow steps](./workflow-steps)
* [Connections and ports](./connections)
* [Running workflows](./execution)
* [Default Functionalities demo](https://ej2.syncfusion.com/demos/#/tailwind3/workflow-designer/default-functionalities.html)
