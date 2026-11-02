---
layout: post
title: WebMCP tool integration for Vue Diagram | Syncfusion®
description: Learn how to integrate WebMCP with the Syncfusion® Vue Diagram to enable AI interaction, configure tools, and monitor execution.
control: Diagram
documentation: ug
platform: diagram-sdk
domainurl: https://help.syncfusion.com/diagram-sdk
---

# WebMCP Tools Integration for Syncfusion® Vue Diagram

WebMCP enables AI agents to discover and interact with the Syncfusion® Vue Diagram through a standardized tool interface. By enabling WebMCP, AI-powered applications can securely discover Diagram capabilities, create and manage diagram objects, perform actions, and automate diagram workflows.

This section demonstrates how to integrate WebMCP with the Syncfusion® Vue Diagram.

## WebMCP Overview

WebMCP allows AI assistants running in the browser to interact directly with the Diagram component through natural language prompts.

Instead of relying on DOM inspection or simulating user interactions, AI assistants can interact directly with Diagram operations through WebMCP tools. This approach provides more reliable and accurate results.

Once connected, an AI assistant can perform tasks such as:

* Create standard and specialized diagram nodes.
* Create connectors and specialized relationships.
* Select, arrange, align, group, and delete diagram objects.
* Manage annotations, ports, layers, and object ordering.
* Apply layouts to diagram nodes.
* Navigate, zoom, import, export, and manage diagram history.

> WebMCP is currently an experimental browser capability and requires a Chromium-based browser with WebMCP support enabled. Availability and required browser flags may change as the specification evolves.

## Prerequisites

* Syncfusion® Vue components
* Chromium-based Browser (like Chrome, Edge, or Brave)
* [Node.js 24+](https://nodejs.org/en) (LTS recommended)
* WebMCP browser extension installed
* AI API key configured in the extension

## WebMCP setup

Before using WebMCP locally, enable the feature flag and install the browser extension:

1. Enable `WebMCP for testing` flag via `chrome://flags/`. Click **"Relaunch"** to restart Chrome.

2. Search for **"WebMCP - Model Context Tool Inspector"** in [Chrome Web Store](https://chromewebstore.google.com/detail/webmcp-model-context-tool/gbpdfapgefenggkahomfgkhfehlcenpd). Click **"Add to Chrome"**.

3. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to create or copy an API key. Open the WebMCP extension → paste your API key.

The WebMCP extension is now configured and ready to interact with WebMCP-enabled Syncfusion® components.

## Integrating WebMCP tools

Follow these steps to integrate WebMCP support into the Syncfusion® Vue Diagram.

### Step 1: Set up the Vue project

Create a Vue application and integrate the Syncfusion® Vue Diagram component by following the [Getting Started with Vue Diagram](https://help.syncfusion.com/diagram-sdk/vue/getting-started) guide. After completing the setup, follow the steps below to enable WebMCP integration.

### Step 2: Enable WebMCP support

Import the WebMCP module and inject it into the component to make WebMCP functionality available.

{% tabs %}
{% highlight html tabtitle="Composition API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram id="diagram" width="100%" height="580px"></ejs-diagram>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { DiagramComponent as EjsDiagram, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

provide('diagram', [WebMcpDiagram]);
</script>
{% endhighlight %}
{% highlight html tabtitle="Options API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram id="diagram" width="100%" height="580px"></ejs-diagram>
  </div>
</template>

<script>
import { DiagramComponent, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

export default {
  name: 'App',
  components: {
    'ejs-diagram': DiagramComponent
  },
  provide: {
    diagram: [WebMcpDiagram]
  }
};
</script>
{% endhighlight %}
{% endtabs %}

N> The `provide('diagram', [WebMcpDiagram])` call registers the WebMCP module with the Diagram component. The key `diagram` matches the module name of the Diagram control.

### Step 3: Register Diagram tools

Set the `enableWebMcp` property to `true` to enable WebMCP integration.

When `enableWebMcp` is enabled, the Diagram tools are registered with the WebMCP runtime and become discoverable by authorized WebMCP clients.

{% tabs %}
{% highlight html tabtitle="Composition API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram id="diagram" width="100%" height="580px" :enableWebMcp="true"></ejs-diagram>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { DiagramComponent as EjsDiagram, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

provide('diagram', [WebMcpDiagram]);
</script>
{% endhighlight %}
{% highlight html tabtitle="Options API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram id="diagram" width="100%" height="580px" :enableWebMcp="true"></ejs-diagram>
  </div>
</template>

<script>
import { DiagramComponent, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

export default {
  name: 'App',
  components: {
    'ejs-diagram': DiagramComponent
  },
  provide: {
    diagram: [WebMcpDiagram]
  }
};
</script>
{% endhighlight %}
{% endtabs %}

When the `tools` collection is not specified in `webMcpSettings`, all supported Diagram WebMCP tools are registered.

### Step 4: Customize tool registration

Use the `webMcpSettings` property to customize how Diagram WebMCP tools are exposed to AI agents.

The available settings are listed below.

| Property | Description |
| --- | --- |
| `name` | Prefix applied to registered tool names. For example, when `name: 'myDiagram'` is specified, `createDiagramNode` is registered as `myDiagram_createDiagramNode`. This allows multiple control instances to coexist without tool name conflicts. When a name is not specified, the Diagram element ID is used as the prefix. |
| `tools` | Collection of built-in Diagram WebMCP tools to register. Each tool is identified by its tool name (for example, `createDiagramNode`) supplied as a string. |
| `exposedTo` | List of origins allowed to access the registered WebMCP tools. |

The following example registers selected built-in Diagram tools:

{% tabs %}
{% highlight html tabtitle="Composition API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram
      id="diagram"
      width="100%"
      height="580px"
      :enableWebMcp="true"
      :webMcpSettings="webMcpSettings">
    </ejs-diagram>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { DiagramComponent as EjsDiagram, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

provide('diagram', [WebMcpDiagram]);

const webMcpSettings = {
  name: 'myDiagram',
  tools: [
    'createDiagramNode',
    'createDiagramConnector',
    'manageNodeSelection'
  ],
  exposedTo: ['https://www.syncfusion.com']
};
</script>
{% endhighlight %}
{% highlight html tabtitle="Options API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram
      id="diagram"
      width="100%"
      height="580px"
      :enableWebMcp="true"
      :webMcpSettings="webMcpSettings">
    </ejs-diagram>
  </div>
</template>

<script>
import { DiagramComponent, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

export default {
  name: 'App',
  components: {
    'ejs-diagram': DiagramComponent
  },
  provide: {
    diagram: [WebMcpDiagram]
  },
  data() {
    return {
      webMcpSettings: {
        name: 'myDiagram',
        tools: [
          'createDiagramNode',
          'createDiagramConnector',
          'manageNodeSelection'
        ],
        exposedTo: ['https://www.syncfusion.com']
      }
    };
  }
};
</script>
{% endhighlight %}
{% endtabs %}

> Use the `exposedTo` property to restrict WebMCP access to allowed origins.

### Step 5: Monitor and control tool execution

The `beforeWebMcpToolExecute` event is triggered before a Diagram WebMCP tool is executed.

The event provides the following information and controls:

| Property | Description |
| --- | --- |
| `toolName` | The unprefixed base tool name. For built-in tools this is the tool name, for example, `deleteFromDiagram`. The value never includes the prefix applied during registration, so a comparison such as `args.toolName === 'deleteFromDiagram'` works regardless of how the tools were registered. |
| `registeredName` | The name the tool was registered under, including any prefix applied during registration (for example, `myDiagram_deleteFromDiagram`). |
| `toolArgs` | Arguments supplied by the WebMCP client. The shape of this object matches the tool's `inputSchema`. |
| `cancel` | Set to `true` to prevent the tool from executing. |
| `cancellationResponse` | Text returned when tool execution is cancelled. When it is not provided, a default cancellation message is sent to the AI client. |
| `showConfirmationDialog` | Set to `true` to display a confirmation dialog before tool execution. Execution proceeds only when the user confirms. When the confirmation dialog cannot be displayed, the execution is refused. |

The following example requests user confirmation before deleting objects from the Diagram:

{% tabs %}
{% highlight html tabtitle="Composition API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram
      id="diagram"
      width="100%"
      height="580px"
      :enableWebMcp="true"
      :webMcpSettings="webMcpSettings"
      @beforeWebMcpToolExecute="beforeWebMcpToolExecute">
    </ejs-diagram>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { DiagramComponent as EjsDiagram, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

provide('diagram', [WebMcpDiagram]);

const webMcpSettings = {
  name: 'myDiagram',
  tools: [
    'deleteFromDiagram'
  ]
};

const beforeWebMcpToolExecute = (args) => {
  if (args.toolName === 'deleteFromDiagram') {
    args.showConfirmationDialog = true;
    args.cancellationResponse = 'The delete operation was cancelled.';
  }
};
</script>
{% endhighlight %}
{% highlight html tabtitle="Options API (~/src/App.vue)" %}
<template>
  <div id="app">
    <ejs-diagram
      id="diagram"
      width="100%"
      height="580px"
      :enableWebMcp="true"
      :webMcpSettings="webMcpSettings"
      @beforeWebMcpToolExecute="beforeWebMcpToolExecute">
    </ejs-diagram>
  </div>
</template>

<script>
import { DiagramComponent, WebMcpDiagram } from '@syncfusion/ej2-vue-diagrams';

export default {
  name: 'App',
  components: {
    'ejs-diagram': DiagramComponent
  },
  provide: {
    diagram: [WebMcpDiagram]
  },
  data() {
    return {
      webMcpSettings: {
        name: 'myDiagram',
        tools: [
          'deleteFromDiagram'
        ]
      }
    };
  },
  methods: {
    beforeWebMcpToolExecute(args) {
      if (args.toolName === 'deleteFromDiagram') {
        args.showConfirmationDialog = true;
        args.cancellationResponse = 'The delete operation was cancelled.';
      }
    }
  }
};
</script>
{% endhighlight %}
{% endtabs %}

> AI-generated requests should be validated before performing operations that modify Diagram content. Use `exposedTo` to limit access and use `beforeWebMcpToolExecute` to validate, cancel, or request confirmation for tool execution.

## Diagram WebMCP tools

The Syncfusion® Diagram control exposes 19 built-in WebMCP tools. These tools enable AI agents to create diagram objects, manage selection and editing, arrange content, navigate the viewport, manage diagram structure, and import or export diagram data.

Explore the Syncfusion® Vue Diagram control with WebMCP integration through this [demo](https://demos.syncfusion.com/diagram-sdk/diagram-webmcp/index.html).

| Tool name | Description |
| --- | --- |
| `createDiagramNode` | Creates a standard Basic or Flowchart node. |
| `createSpecializedDiagramNode` | Creates specialized BPMN, ER, UML, and swimlane nodes. |
| `createDiagramConnector` | Creates a connector between two nodes with optional labels, routing behavior, and styling. |
| `createSpecializedRelationship` | Creates specialized relationship connectors for ER diagrams and UML class diagrams. |
| `manageNodeSelection` | Manages node and connector selection using the `single`, `multiple`, `all`, or `none` selection modes. |
| `manageInteractionMode` | Changes the Diagram interaction mode between `readWrite` and `readOnly`. |
| `enableEditingMode` | Enables or disables Diagram editing and interaction. This tool maps to the interaction mode, where `enabled: true` selects `readWrite` and `enabled: false` selects `readOnly`. |
| `arrangeAndAlignObjects` | Aligns, distributes, and sizes selected diagram objects. |
| `deleteFromDiagram` | Removes nodes, connectors, specified objects, selected objects, or all objects from the Diagram. The `deleteMode` value is one of `specified`, `selected`, or `all`. |
| `manageUndoRedo` | Performs undo, redo, grouped history operations, and history clearing. |
| `manageClipboardOperations` | Performs copy, cut, and paste operations for diagram objects. |
| `exportAndImportDiagrams` | Saves, loads, exports, imports, or prints diagram content. The supported export formats are `json`, `mermaid`, `png`, `jpg`, and `svg`. |
| `arrangeZOrder` | Moves objects within the stacking order. The `order` value is one of `toFront`, `toBack`, `forward`, or `backward`. |
| `navigateAndZoomDiagram` | Performs zoom, pan, reset, fit-to-page, and bring-into-view operations. |
| `manageGroupsAndHierarchies` | Groups or ungroups objects and manages parent-child relationships. |
| `manageAnnotationsAndLabels` | Adds, updates, or deletes annotations and labels on nodes and connectors. The `update` and `delete` operations require the `labelId` of the annotation. |
| `managePorts` | Adds or removes ports on nodes. The `action` value is `add` or `remove`, and removal requires the `portId`. |
| `manageLayers` | Adds or removes layers and moves objects between layers. The `operation` value is `addLayer`, `removeLayer`, or `moveObjects`. |
| `applyLayoutToNodes` | Applies a named Diagram layout and can update connector stroke color. When the diagram contains two or more nodes without connectors, the tool returns an error unless `autoConnect` is set to `true`. |

## Best practices

* Expose only the Diagram tools required by the application.
* Use the `name` property when multiple Diagram instances exist on the same page.
* Configure `exposedTo` to limit access to allowed origins.
* Monitor tool execution through the `beforeWebMcpToolExecute` event.
* Validate `toolArgs` before performing operations that modify Diagram content.
* Use `cancel` and `cancellationResponse` to reject operations that do not satisfy application requirements.
* Use `showConfirmationDialog` for operations that require user approval.
* Compare `toolName` rather than `registeredName` in the event handler, so that the comparison keeps working when the tool registration prefix changes.

## Explore the demo

Explore the Syncfusion® Vue Diagram control with WebMCP integration through this [demo](https://demos.syncfusion.com/diagram-sdk/diagram-webmcp/index.html).

## Next steps

After successfully enabling WebMCP, you can:

* Configure selected Diagram tools for AI-assisted diagram workflows.
* Control tool execution using validation, cancellation, confirmation, and origin restrictions.
* Integrate WebMCP with other supported Syncfusion® Vue components.

## See also

* [WebMCP Supported Syncfusion Vue Components](https://ej2.syncfusion.com/vue/documentation/webmcp/components)
