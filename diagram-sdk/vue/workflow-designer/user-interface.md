---
layout: post
title: Customize the user interface in Vue Workflow Designer | Syncfusion®
description: Learn how to configure the toolbars, step collection, property panel, execution log, canvas and sticky notes of the Syncfusion Vue Workflow Designer.
control: Workflow Designer
platform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Customize the user interface in Vue Workflow Designer

You can show, hide, and configure the top toolbar, the canvas toolbar, the step collection, the property panel, and the execution log. You can also configure the canvas behavior, add sticky notes, and set the size of the designer. The canvas itself is always displayed.

## Top toolbar

Use [`toolbarSettings`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#toolbarsettings) to show or hide the toolbar and choose its commands.

| Property | Default | Description |
|---|---|---|
| `visible` | `true` | Shows the top toolbar. |
| `items` | `['Undo', 'Redo', 'Layout', 'Execute', 'Lock', 'Export', 'Import']` | The commands to show: `'Execute'`, `'Layout'`, `'Lock'`, `'Undo'`, `'Redo'`, `'Import'`, and `'Export'`. |

The commands always appear in the order Execute, Layout, Lock, Undo, Redo, Import, Export, regardless of the order you list them in. While a workflow is running, the **Execute** command is replaced by **Stop**, which stops the run. Stop isn't a separate item; it's available whenever `'Execute'` is in the list.

{% tabs %}
{% highlight html tabtitle="App.vue" %}

<template>
    <ejs-workflowdesigner :toolbarSettings="toolbarSettings"></ejs-workflowdesigner>
</template>

<script setup>
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const toolbarSettings = { visible: true, items: ['Execute', 'Undo', 'Redo', 'Export'] };
</script>

{% endhighlight %}
{% endtabs %}

## Canvas toolbar

Use [`canvasToolbarSettings`](https://ej2.syncfusion.com/vue/documentation/api/workflow-designer/#canvastoolbarsettings) to configure the floating toolbar at the bottom of the canvas.

| Property | Default | Description |
|---|---|---|
| `visible` | `true` | Shows the canvas toolbar. |
| `items` | All commands | The commands to show: `'Add'`, `'StickyNote'`, `'Select'`, `'Pan'`, `'ZoomOut'`, `'ZoomIn'`, `'Fit'`, `'ResetZoom'`, and `'Clear'`. |

{% tabs %}
{% highlight html tabtitle="App.vue" %}

<template>
    <ejs-workflowdesigner :canvasToolbarSettings="canvasToolbarSettings"></ejs-workflowdesigner>
</template>

<script setup>
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const canvasToolbarSettings = { items: ['Add', 'ZoomOut', 'ZoomIn', 'Fit'] };
</script>

{% endhighlight %}
{% endtabs %}

## Step collection

Use `stepCollectionSettings` to configure the panel that users pick new steps from. The panel opens when the user adds a step and is collapsed otherwise.

| Property | Default | Description |
|---|---|---|
| `visible` | `true` | When `false`, users can't add steps from the canvas, and the **Add** commands are disabled. |

## Property panel

Use `propertyPanelSettings` to configure the panel that edits the selected step or connection.

| Property | Default | Description |
|---|---|---|
| `visible` | `true` | When `false`, the property panel never opens. |
| `openOnStepSelection` | `false` | When `true`, the panel opens when the user selects a step with a single click. When `false`, the user double-clicks a step or connection, or presses <kbd>Enter</kbd>, to open it. Once the panel is open, it follows the selection. |

Selecting a sticky note doesn't open the property panel.

## Execution log

The execution log is the panel docked below the canvas. During a run, it lists the progress, status, input, and output of each step, and users can select a row to inspect the data at that step. The log is collapsed when the designer is first displayed; users can expand it, search it, and clear it.

Use `executionLogSettings` to configure the log:

| Property | Default | Description |
|---|---|---|
| `visible` | `true` | When `false`, the execution log isn't rendered. Runs still work, and the [execution events](./execution#execution-events) are still triggered, so you can show the progress in your own UI. |

Changing `executionLogSettings` at runtime rebuilds the log, so entries from earlier runs are cleared.

{% tabs %}
{% highlight html tabtitle="App.vue" %}

<template>
    <ejs-workflowdesigner :executionLogSettings="executionLogSettings"></ejs-workflowdesigner>
</template>

<script setup>
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const executionLogSettings = { visible: false };
</script>

{% endhighlight %}
{% endtabs %}

## Canvas

Use `workflowSettings` to configure the canvas behavior:

| Property | Default | Description |
|---|---|---|
| `tool` | `'SingleSelection'` | The active canvas tool: `'SingleSelection'`, `'MultiSelection'`, or `'ZoomPan'`. |
| `minZoom` | `0.2` | The minimum zoom level, where `1` is 100%. |
| `maxZoom` | `30` | The maximum zoom level, where `1` is 100%. |
| `showGridLines` | `true` | Shows grid lines on the canvas. |
| `readOnly` | `false` | A viewing mode. Users can't edit or import a workflow. They can still start a run and export the workflow. |

The following example creates a read-only viewer without grid lines, the top toolbar, or the step collection:

{% tabs %}
{% highlight html tabtitle="App.vue" %}

<template>
    <ejs-workflowdesigner :workflowSettings="workflowSettings" :toolbarSettings="toolbarSettings" :stepCollectionSettings="stepCollectionSettings"></ejs-workflowdesigner>
</template>

<script setup>
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const workflowSettings = { readOnly: true, showGridLines: false };
const toolbarSettings = { visible: false };
const stepCollectionSettings = { visible: false };
</script>

{% endhighlight %}
{% endtabs %}

## Sticky notes

Sticky notes document a workflow and never run. Their text supports basic Markdown: headings, bold, italic, inline code, and bulleted lists. To add a note, use the **Sticky Note** canvas command or press <kbd>Shift</kbd> + <kbd>S</kbd>.

## Dimensions

Use the `width` and `height` properties to set the size of the designer. Both default to `'100%'`.

* A number is treated as pixels. For example, `640` is the same as `'640px'`.
* A string is used as a CSS length, such as `'800px'`, `'100%'`, or `'80vh'`.

When you use a percentage height, make sure the parent element has a height. Otherwise, the designer has no height to fill.
