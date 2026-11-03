---
layout: post
title: Host integration in React Workflow Designer | Syncfusion®
description: Learn how to deliver notifications, run custom steps and intercept requests in the Syncfusion React Workflow Designer.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Host integration in React Workflow Designer

Some steps need work that only your application can do, such as sending a notification or running custom logic. For these steps, the designer triggers a public event, and the step waits until your handler finishes it.

The arguments of these events contain the following members:

* `complete(result)`: Finishes the step successfully. The value you pass becomes the step's response, which later steps can read.
* `fail(error)`: Fails the step with the given `Error`. The step is reported as failed in the execution log and in the `executionStepFailed` event.
* `signal`: An `AbortSignal` that's aborted when the run is stopped or the step times out. Pass it to your own requests so they're cancelled too.

Only the first call to `complete` or `fail` takes effect. The step waits until one of them is called, the step times out, or the run is stopped.

## Notifications

Handle the `notifyRequested` event to deliver the notifications that Notify steps send. When no handler is bound to this event, Notify steps fail.

{% tabs %}
{% highlight ts tabtitle="App.tsx" %}
{% include code-snippet/diagram-sdk/react/workflow-designer/host-integration/host-integration-cs1/app/index.tsx %}
{% endhighlight %}
{% endtabs %}

The event arguments contain the following properties, in addition to `complete`, `fail`, and `signal`:

| Property | Description |
|---|---|
| `step` | The Notify step. |
| `notification` | The step's notification settings, with expressions already resolved. `channel` and `message` are always set; the other fields depend on the channel. See [Notify](./workflow-steps#notify). |
| `stepResults` | The results of the steps that ran so far, in run order. |
| `previousStep` | The result of the step that ran just before, if any. |

Values from earlier steps are inserted into `args.notification` as they are. Escape them before you use them in HTML, such as an email body. Call `fail` for every unsuccessful outcome, including HTTP error responses, so the run reports the failure. If you call `complete`, the step is treated as successful.

## Custom steps

Handle the `customExecutionRequested` event to run the work of Custom steps. `actionType` identifies the action, and `input` holds the step's input with expressions already resolved. When no handler is bound to this event, Custom steps fail.

{% tabs %}
{% highlight ts tabtitle="App.tsx" %}
{% include code-snippet/diagram-sdk/react/workflow-designer/host-integration/host-integration-cs2/app/index.tsx %}
{% endhighlight %}
{% endtabs %}

## Credentials

Keep production secrets on your server. Only credential names, never secrets, are saved in a workflow. To authenticate requests:

* For API Request steps, add the authentication header in the `beforeRequestSend` event, or route the request through your backend, which adds the credentials.
* For AI steps and AI Assist, use the default `'Reference'` credential mode with a backend endpoint that holds the provider key. See [Credential mode](./security#credential-mode).

## Intercept requests

The `beforeRequestSend` event is triggered before every request that an API Request step, an AI step, or AI Assist sends. `requestType` is `'ApiRequest'`, `'AI'`, or `'AIAssist'`. Use the event to:

* Change `args.request` in place, for example, to route the URL through your proxy or add headers. Headers are a list of `{ key, value }` pairs.
* Supply the response yourself by setting `args.response` to a value or a promise. No request is sent.
* Block the request by setting `args.cancel` to `true`. The step then fails with the code `REQUEST_CANCELLED`.

The following example blocks API requests to any host other than your own API, and adds an authorization header to the allowed requests:

{% tabs %}
{% highlight ts tabtitle="App.tsx" %}
{% include code-snippet/diagram-sdk/react/workflow-designer/host-integration/host-integration-cs3/app/index.tsx %}
{% endhighlight %}
{% endtabs %}

## Edit-time events

| Event | Description |
|---|---|
| `workflowChanged` | Triggered after the workflow changes, in the UI or through `importWorkflow`. The arguments provide a `workflow` snapshot, the `changeType`, the `affectedItem`, and the `changedProperties`. |
| `selectionChanged` | Triggered when the selection on the canvas changes. `selectedItem` holds the selected step, connection, or sticky note, or `null` when the selection is cleared. |

The following example saves a draft of the workflow whenever it changes:

{% tabs %}
{% highlight ts tabtitle="App.tsx" %}

import * as React from 'react';
import { WorkflowDesignerComponent } from '@syncfusion/ej2-react-workflow-designer';

function WorkflowCanvas() {
    const workflowInstance = React.useRef<WorkflowDesignerComponent>(null);
    const onWorkflowChanged = (args: any) => {
        console.log('Workflow changed:', args.changeType);
        // saveDraft stands for your application's save code.
        saveDraft(workflowInstance.current?.exportWorkflow());
    };

    return <WorkflowDesignerComponent ref={workflowInstance} workflowChanged={onWorkflowChanged} />;
}

{% endhighlight %}
{% endtabs %}
