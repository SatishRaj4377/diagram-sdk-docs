---
layout: post
title: AI Assist in TypeScript Workflow Designer control | Syncfusion®
description: Learn how to generate and update workflows from natural-language prompts with AI Assist in the Syncfusion TypeScript Workflow Designer.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# AI Assist in EJ2 TypeScript Workflow Designer

AI Assist generates a workflow, or changes the current one, from a natural-language prompt that the user types in the AI Assist panel. It's disabled by default. To turn it on, set `aiAssistSettings.enabled` to `true`.

AI Assist reaches the AI provider in one of two ways, depending on `executionSettings.credentialMode`:

| `credentialMode` | AI Assist mode | Description |
|---|---|---|
| `'Reference'` (default) | Server | The designer posts each request to your backend at `aiAssistSettings.server.url`. Your backend calls the AI provider and keeps the API key. |
| `'Inline'` | Direct | The browser calls the provider set in `aiAssistSettings.direct`. For development only. |

| `aiAssistSettings` property | Default | Description |
|---|---|---|
| `enabled` | `false` | Shows the AI Assist panel. When `false`, no AI Assist requests are made. |
| `position` | `'Right'` | The side that the panel is displayed on: `'Left'` or `'Right'`. |
| `promptSuggestions` | `null` | Example prompts shown in the panel. |
| `server.url` | `''` | Your backend endpoint, used in Server mode. |
| `direct.provider`, `direct.model`, `direct.apiKey` | | The provider (`'Gemini'`, `'OpenAI'`, or `'Claude'`), model, and key, used in Direct mode. |

Users can also change these settings with the settings button in the AI Assist panel.

## Server mode (recommended)

In Server mode, the designer posts each request to your backend. Use the `beforeRequestSend` event to add your application's authentication header:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import { WorkflowDesigner, WorkflowBeforeRequestSendEventArgs } from '@syncfusion/ej2-workflow-designer';

const designer: WorkflowDesigner = new WorkflowDesigner({
    aiAssistSettings: {
        enabled: true,
        position: 'Right',
        server: { url: 'https://api.mycompany.com/workflow-ai' },
        promptSuggestions: ['Send a Slack message when a new order arrives']
    },
    beforeRequestSend: (args: WorkflowBeforeRequestSendEventArgs) => {
        if (args.requestType === 'AIAssist') {
            // getUserToken stands for your application's sign-in code.
            args.request.headers = [{ key: 'Authorization', value: 'Bearer ' + getUserToken() }];
        }
    }
});
designer.appendTo('#workflowDesigner');

{% endhighlight %}
{% endtabs %}

Your endpoint receives a JSON request and returns a JSON response:

{% tabs %}
{% highlight json tabtitle="Request" %}

{
  "promptQuery": "System: ...\n\nUser: ...",
  "responseFormat": "JSON",
  "desiredFields": [],
  "memoryMessages": []
}

{% endhighlight %}
{% highlight json tabtitle="Response" %}

{
  "text": "...",
  "content": {},
  "provider": "OpenAI",
  "model": "gpt-4o"
}

{% endhighlight %}
{% endtabs %}

* `promptQuery` holds the system instructions and the user's prompt. `responseFormat` is `'Text'`, `'JSON'`, or `'Markdown'`. `memoryMessages` holds earlier messages, each with a `role` and `content`.
* Return the structured answer in `content`, the text answer in `text`, or both. `provider` and `model` are optional and are shown in the designer.
* When the request fails, return a non-2xx status with `{ "error": "message" }`.

AI steps with a **Server URL** post the same request to their own endpoint, so one backend can serve both.

## Direct mode (development only)

In Direct mode, the browser calls the AI provider itself. To use it, set `executionSettings.credentialMode` to `'Inline'` and configure `aiAssistSettings.direct`:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

const designer: WorkflowDesigner = new WorkflowDesigner({
    executionSettings: { credentialMode: 'Inline' },
    aiAssistSettings: {
        enabled: true,
        direct: { provider: 'Gemini', model: 'gemini-3.1-flash', apiKey: 'YOUR_DEVELOPMENT_KEY' }
    }
});
designer.appendTo('#workflowDesigner');

{% endhighlight %}
{% endtabs %}

W> A key used in Direct mode is exposed to everyone who uses the page. Use Direct mode only for development, and use Server mode in production. Many providers also block direct browser calls through CORS.

## AI Assist events

| Event | Description |
|---|---|
| `aiAssistCompleted` | Triggered after AI Assist generates a workflow, validates it, and applies it to the canvas. `workflow` holds the applied workflow. |
| `aiAssistFailed` | Triggered when an AI Assist request fails and won't be retried. The current workflow is left unchanged. `error` describes the failure. |

## See also

* [Intercept requests](./host-integration#intercept-requests)
* [Security considerations](./security)
