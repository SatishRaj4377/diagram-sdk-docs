---
layout: post
title: Security considerations in TypeScript Workflow Designer | Syncfusion®
description: Learn about credential handling, network requests and imported workflows in the Syncfusion TypeScript Workflow Designer control.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Security Considerations for EJ2 TypeScript Workflow Designer

Workflows run in the user's browser and make real network calls. Review the following points before you use the Workflow Designer in production.

## Credentials

* Don't put production secrets in client-side code or workflow files. Workflows save only credential names, such as the **Auth Reference** of an API Request step, never secrets.
* Add authentication to API requests on your side: in the `beforeRequestSend` event, or in a backend that the request is routed through.
* Secrets aren't included in event arguments, the execution log, or exported JSON.

### Credential mode

The `executionSettings.credentialMode` property sets how AI steps and AI Assist reach the AI provider:

| Value | Description |
|---|---|
| `'Reference'` (default) | AI steps send their requests to the backend set in their **Server URL** setting, and AI Assist uses its Server mode. Your backend calls the provider and keeps the key. Use this mode in production. |
| `'Inline'` | AI steps show the **Provider**, **Model**, and **API Key** settings, and AI Assist uses its Direct mode. The browser calls the provider with the key. Anyone who uses the page can read the key, so use this mode for development only. Inline keys are never exported. |

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

const designer: WorkflowDesigner = new WorkflowDesigner({
    executionSettings: { credentialMode: 'Reference' }
});

{% endhighlight %}
{% endtabs %}

## Network requests

* API Request steps send their requests with the Fetch API option `credentials: 'omit'`. The browser therefore never adds the page's cookies or HTTP authentication, so an imported or shared workflow can't act as the signed-in user. Headers that you configure explicitly, such as an `Authorization` header, are still sent.
* Use the `beforeRequestSend` event as your policy point to allowlist hosts, route requests through a proxy, or block requests. See [Intercept requests](./host-integration#intercept-requests).
* Target servers must allow cross-origin requests (CORS) from your page.

## Imported workflows

A workflow file can contain API Request steps that call any URL. Treat workflow files from unknown sources as untrusted, restrict hosts in `beforeRequestSend`, and review a workflow before you run it.

## Rendering

Sticky-note Markdown is HTML-escaped before it's displayed. Expressions can't call functions or reach prototypes or global objects.
