---
layout: post
title: Overview of TypeScript Workflow Designer control | Syncfusion®
description: Learn about the Syncfusion TypeScript Workflow Designer control, its features, layout and the step types it supports.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Overview of EJ2 TypeScript Workflow Designer

The Syncfusion<sup style="font-size:70%">&reg;</sup> Workflow Designer is a visual editor for building, validating, and running workflows in the browser. Users add steps from the step collection, connect them on the canvas, and configure each step in the property panel. When they run the workflow, the execution log shows the result of every step.

## Key features

* **Visual canvas:** Add and connect steps, select them, and pan or zoom the canvas. Undo and redo are built in, and automatic layout arranges the workflow for you.
* **18 built-in step types:** Triggers, data operations, branching, loops, approvals, notifications, AI, formatting, and custom steps.
* **Property panel:** Every step type has its own editor, with expression support for reading data from earlier steps.
* **In-browser execution:** Run the whole workflow from a trigger, or execute one selected step on its own. Executing a single step runs only that step; it doesn't continue to the steps connected after it. Each run reports its progress through events.
* **Host integration:** Your application delivers notifications and runs custom steps.
* **Validation:** Structural and configuration errors are reported before a run starts.
* **Import and export:** Save and load workflows as JSON.
* **AI Assist:** Generate a workflow, or change the current one, from a natural-language prompt.
* **Sticky notes:** Document the workflow on the canvas with Markdown notes.
* **Localization and accessibility:** Translate the designer text and use keyboard shortcuts for common commands.

## Layout

| Region | Description |
|---|---|
| Top toolbar | The Execute, Stop, Layout, Lock, Undo, Redo, Import, and Export commands. While a workflow is running, the Execute command is replaced by Stop. |
| Step collection | The panel that users pick new steps from. It opens when the user adds a step. |
| Canvas | The workflow diagram, with a floating canvas toolbar at the bottom. |
| Property panel | The editor for the selected step or connection. |
| Execution log | The panel below the canvas. It lists the progress and result of each step during a run. |
| AI Assist | An optional chat panel that generates or changes workflows from prompts. |

## Step types

| Category | Step types |
|---|---|
| Triggers | `ManualTrigger`, `ScheduledTrigger`, `WebhookTrigger`, `FormInputTrigger` |
| Actions | `SetVariable`, `Filter`, `Sort`, `ApiRequest`, `Delay`, `Formatter`, `Custom` |
| Flow | `Condition`, `Switch`, `Loop`, `End` |
| Human | `Approve`, `Notify` |
| AI | `AI` |

For the settings of each step type, see [Workflow steps](./workflow-steps).

N> Workflows run in the user's browser, and API Request and AI steps make real network calls during a run. Before you build a production integration, review [Security considerations](./security).

## Sample browser

To see the Workflow Designer in action, open the [Default Functionalities demo](https://ej2.syncfusion.com/javascript/demos/#/tailwind3/workflow-designer/default-functionalities.html) in the JavaScript sample browser.

## Next steps

To create your first workflow, see [Getting started](./getting-started).
