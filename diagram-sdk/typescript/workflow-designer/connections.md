---
layout: post
title: Connections and ports in TypeScript Workflow Designer control | Syncfusion®
description: Learn how to connect steps, use output ports and validate connections in the Syncfusion TypeScript Workflow Designer control.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Connections and Ports in EJ2 TypeScript Workflow Designer

A connection links an output port of one step to the input port of another step. During a run, the designer follows the connections from the trigger.

| Property | Type | Description |
|---|---|---|
| `id` | `string` | A unique identifier. See [Identifier rules](./workflow-steps#identifier-rules). |
| `sourceStepId` | `string` | The step that the connection starts from. |
| `targetStepId` | `string` | The step that the connection ends at. |
| `sourcePort` | `string` | The output port that the connection leaves from. Defaults to `'output'`. |
| `label` | `string` | The text shown on the connection. |
| `type` | `WorkflowConnectionType` | The line shape: `'Straight'`, `'Orthogonal'`, or `'Bezier'`. Defaults to `'Orthogonal'`. |

## Input port

Every step except a trigger has exactly one input port. A connection always enters its target step through this port, so you only choose the step it leads to with `targetStepId`. Trigger steps have no input port, because they start the workflow.

## Output ports

The output ports of a step depend on its type, and `sourcePort` selects one of them:

| Step type | Output ports |
|---|---|
| `Condition` | `true`, `false` |
| `Switch` | One port for each branch name, plus `default` (used when no branch matches) |
| `Loop` | `loop` (runs for each item), `done` (runs after the last item) |
| `Approve` | `approved`, `declined` |
| `End` | None |
| All other steps | `output` |

The following connections route the two outcomes of an Approve step to different steps:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

const connections = [
    { id: 'toApproved', sourceStepId: 'approval', sourcePort: 'approved', targetStepId: 'createOrder' },
    { id: 'toDeclined', sourceStepId: 'approval', sourcePort: 'declined', targetStepId: 'notifyUser' }
];

{% endhighlight %}
{% endtabs %}

## Create connections interactively

Use the **Add** handle on a step or on an existing connection to insert a new step from the step collection. The designer adds the step with its connections already in place.

## Connection rules

The designer checks every connection against the following rules:

* **One connection for each output port.** An output port can lead to only one step. When you connect a second step to the same port, validation reports that the output already has a connection. To do several things after a step, connect the steps one after another.
* **No connections into triggers.** A trigger starts the workflow, so a connection can't end at a trigger step.
* **No self-connections or duplicates.** A step can't connect to itself, and the same connection can't be added twice.
* **Valid endpoints and ports.** Both ends must be existing steps, and the connection must use an output port that the source step type supports.
* **No cycles.** A connection can't lead back to an earlier step. To repeat steps, use a [Loop](./workflow-steps#loop) step.

A workflow that breaks any of these rules can't run. [Validation](./validation) lists each problem, with the affected step or connection, in the execution log and in the result of `validateWorkflow`.

When you import a workflow, self-connections, duplicate connections, missing endpoints, invalid ports, cycles, and connections into triggers reject the file. A second connection from the same output port doesn't reject the file; the workflow is loaded, and validation reports the problem.
