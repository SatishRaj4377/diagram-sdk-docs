---
layout: post
title: Running workflows in TypeScript Workflow Designer control | Syncfusion®
description: Learn how to run, stop and monitor workflows, and configure the execution speed in the Syncfusion TypeScript Workflow Designer.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Running Workflows in EJ2 TypeScript Workflow Designer

Users can run a workflow from the toolbar, and your code can start, stop, and monitor runs. This section also covers the execution events, execution speed, the execution log, and run limits.

## Run a workflow

Users run the whole workflow with the **Execute** toolbar command or by pressing <kbd>Ctrl</kbd> + <kbd>Enter</kbd>. While the workflow is running, **Execute** is replaced by **Stop**, and <kbd>Ctrl</kbd> + <kbd>Enter</kbd> stops the run.

Users can also execute one selected step on its own, for example to check its settings. Only that step runs; the run doesn't continue to the steps connected after it.

To run the workflow from code, call [`runExecution`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#runexecution). It returns a promise that resolves with a `WorkflowExecutionResult` when the run ends:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import { WorkflowExecutionResult, WorkflowStepResult } from '@syncfusion/ej2-workflow-designer';

designer.runExecution().then((result: WorkflowExecutionResult) => {
    console.log(result.status);              // 'Completed', 'Failed', 'Stopped', or 'Cancelled'
    result.stepResults.forEach((step: WorkflowStepResult) => {
        console.log(step.id, step.response); // Each step that ran, in run order
    });
});

{% endhighlight %}
{% endtabs %}

`WorkflowExecutionResult` contains the following properties:

| Property | Description |
|---|---|
| `status` | The final status of the run: `'Completed'`, `'Failed'`, `'Stopped'`, or `'Cancelled'`. |
| `stepResults` | The steps that ran, in run order, each with its `id`, `stepType`, `name`, and `response`. A step that ran more than once, for example inside a loop, appears once for each run. |
| `visitedConnections` | The identifiers of the connections that the run followed, in order. |
| `lastStep` | The result of the last step that ran. |
| `error` | The error that ended the run, when the run failed. |

The following methods control a run:

* `runExecution(context?, triggerId?)` validates the workflow and then runs it from a trigger. When the workflow has several triggers, pass the identifier of the trigger to start from. Use `context` to supply input data. For details, see [Provide input data](./expressions#provide-input-data).
* [`stopExecution()`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#stopexecution) stops the run in progress. The `executionCompleted` event is then triggered with `result.status` set to `'Stopped'`.

When validation finds errors, the workflow doesn't run: the run ends with the status `'Failed'`, and `result.error.type` is `'Validation'`. To check the workflow first, call `validateWorkflow()`. For details, see [Validation](./validation).

Only one run can be active at a time. Calling `runExecution` while a run is in progress returns a rejected promise.

## Execution events

| Event | Triggered when | Main arguments |
|---|---|---|
| `executionStarted` | A run starts, after the workflow passes validation. | `workflow` |
| `executionStepStarted` | The run reaches a step, before the step runs. | `step`, `stepResults`, `previousStep`, `incomingConnection`, `outgoingConnections` |
| `executionStepCompleted` | A step completes. For branching steps, such as Condition and Switch, `outputPort` tells you which port the run continues from. | `step`, `result`, `outputPort`, `stepResults`, `previousStep`, `incomingConnection`, `followedConnections` |
| `executionStepFailed` | A step fails. | `step`, `error`, `stepResults`, `previousStep`, `incomingConnection` |
| `executionCompleted` | The run ends, whatever the outcome. | `workflow`, `result` |

The arguments of the step events are copies, so changing them doesn't change the run.

### executionCompleted

The `executionCompleted` event is triggered once for every run, including a run that's stopped and a run that doesn't start because validation found errors. Its arguments (`WorkflowExecutionCompletedEventArgs`) contain the following properties:

* `workflow`: The workflow definition that was run.
* `result`: The `WorkflowExecutionResult` of the run. `result.status` is one of the following values:

| Status | Description |
|---|---|
| `'Completed'` | Every path of the run finished. |
| `'Failed'` | A step failed, or the workflow didn't pass validation. `result.error` describes the failure. For a validation failure, `result.error.type` is `'Validation'` and `result.error.details` lists the validation messages. |
| `'Stopped'` | The user clicked **Stop**, or your code called `stopExecution()`. |
| `'Cancelled'` | The run was cancelled before one of its steps ran. |

The following example logs failed steps and the final status of each run:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import {
    WorkflowDesigner, WorkflowExecutionStepFailedEventArgs, WorkflowExecutionCompletedEventArgs
} from '@syncfusion/ej2-workflow-designer';

const designer: WorkflowDesigner = new WorkflowDesigner({
    height: '640px',
    executionStepFailed: (args: WorkflowExecutionStepFailedEventArgs) => {
        console.warn(args.step.name, args.error.code, args.error.message);
    },
    executionCompleted: (args: WorkflowExecutionCompletedEventArgs) => {
        console.log('Run finished:', args.result.status);
        if (args.result.error) {
            console.error(args.result.error.type, args.result.error.message);
        }
    }
});
designer.appendTo('#workflowDesigner');

{% endhighlight %}
{% endtabs %}

## Execution speed

To control how quickly a run moves from one step to the next, set the `executionSpeed` property of `executionSettings`. The value is the pause, in milliseconds, before each step runs. The default is `550`.

* A higher value slows the run down, so users can follow its progress on the canvas more easily.
* A lower value shortens the pause between steps.
* `0` runs the steps without a pause. With this value, Delay steps also complete without waiting. Negative values are treated as `0`.

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

const designer: WorkflowDesigner = new WorkflowDesigner({
    executionSettings: { executionSpeed: 1000 }   // Pause for one second before each step
});

{% endhighlight %}
{% endtabs %}

## Execution log

The execution log lists the status, input, and output of each step during a run. Select a row to inspect the data at that step. To configure the log, see [Execution log settings](./user-interface#execution-log).

## Limits

* **Step execution limit:** A run can perform at most 10,000 step executions. The limit counts every time a step runs, not the number of distinct steps. For example, a Loop step that runs three steps for each of 100 items adds 300 step executions, plus the executions of the Loop step itself. When a run reaches the limit, it stops before the next step and ends with the status `'Failed'`; `result.error.code` is `'STEP_LIMIT'`, and the `executionCompleted` event is triggered. For Recurring and Cron schedules, the count starts again at each occurrence. The limit can't be changed. To stay below it, use the `maxIterations` setting of Loop steps.
* **Browser lifetime:** Runs happen in the browser, and they end when the page is closed or reloaded.
* **One run at a time:** Only one run can be active at a time.
