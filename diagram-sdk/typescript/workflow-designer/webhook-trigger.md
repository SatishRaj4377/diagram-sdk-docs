---
layout: post
title: Webhook trigger in TypeScript Workflow Designer control | Syncfusion®
description: Learn how to start workflows from webhook calls received by your backend in the Syncfusion TypeScript Workflow Designer control.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Webhook Trigger in EJ2 TypeScript Workflow Designer

A Webhook Trigger step starts the workflow when your backend receives an HTTP call. The designer doesn't receive HTTP requests itself. Instead, your backend verifies the request and forwards it to the page, for example, over SignalR or WebSockets. The page then calls `triggerWebhook`.

## Configure the trigger

| Setting | Description |
|---|---|
| `method` | The expected HTTP method. |
| `path` | The expected path. |
| `authMode` | `'None'`, `'Basic'`, `'ApiKeyHeader'`, `'Bearer'`, `'HmacSha256'`, or `'Custom'`. |
| `authRef`, `authHeaderName`, `authSignatureHeaderName` | The details your backend uses to verify the request: the credential name (**Credential Reference**), the API key header name, and the signature header name. The designer doesn't verify requests itself. |
| `responseMode`, `responseCode`, `responseBody` | The response your backend returns. Set `responseMode` to `'Immediate'`. |
| `payloadSchema` | The fields that the payload is expected to contain. Displayed as **Payload Schema**. |

## Forward a webhook to the designer

When your backend forwards a webhook, pass the message to `triggerWebhook`. The following example receives the message over a SignalR connection:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import {
    WorkflowWebhookTriggerMessage, WorkflowExecutionResult, WorkflowError
} from '@syncfusion/ej2-workflow-designer';

// connection is your application's SignalR hub connection.
connection.on('WorkflowWebhookTriggered', async (message: WorkflowWebhookTriggerMessage) => {
    try {
        const result: WorkflowExecutionResult = await designer.triggerWebhook(message);
        console.log('Run finished:', result.status);
    } catch (error) {
        console.error((error as WorkflowError).code);
    }
});

{% endhighlight %}
{% endtabs %}

The message (`WorkflowWebhookTriggerMessage`) contains the following properties:

| Property | Description |
|---|---|
| `workflowId` | Required. The `id` of the loaded workflow. |
| `triggerId` | Required. The identifier of the Webhook Trigger step to start from. |
| `payload` | The body of the webhook request. |
| `method`, `path` | The HTTP method and path of the request. They must match the trigger's settings. |
| `authenticated` | Set it to `true` after your backend has verified the request. Required when the trigger's `authMode` isn't `'None'`. |
| `eventId`, `executionId`, `receivedAt` | Optional values for correlation and logging. |
| `context` | Optional request details for logging, such as the headers and the source IP address. |

The payload becomes the response of the Webhook Trigger step. To use it in later steps, open the variable picker and select the value from the card of the Webhook Trigger step. For example, the `orderId` field of the payload of a trigger with the identifier `orderCreated` is inserted as <code>&#123;&#123;$.nodes["orderCreated"].response.orderId&#125;&#125;</code>.

## Errors

When the webhook can't start a run, the promise rejects with a `WorkflowError` whose `code` is one of the following:

| Code | Reason |
|---|---|
| `WEBHOOK_INVALID_MESSAGE` | The message, `workflowId`, or `triggerId` is missing. |
| `WEBHOOK_IDS_REQUIRED` | `workflowId` or `triggerId` is empty. |
| `WEBHOOK_WORKFLOW_MISMATCH` | `workflowId` doesn't match the loaded workflow. |
| `RUN_IN_PROGRESS` | Another run is active. |
| `WEBHOOK_TRIGGER_NOT_FOUND` | No Webhook Trigger step has this identifier. |
| `WEBHOOK_METHOD_MISMATCH`, `WEBHOOK_PATH_MISMATCH` | The request doesn't match the trigger. |
| `WEBHOOK_AUTH_REQUIRED` | The trigger requires authentication, and `authenticated` isn't `true`. |

I> The designer trusts the `authenticated` flag, so verify the signature or credentials on your backend before you set it. Webhooks that arrive during a run are rejected. If every event must run, queue the webhooks on your backend.
