---
layout: post
title: Workflow steps in TypeScript Workflow Designer control | Syncfusion®
description: Learn about the step types of the Syncfusion TypeScript Workflow Designer control, their settings and their output ports.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Workflow Steps in EJ2 TypeScript Workflow Designer

A step is a unit of work in a workflow. Every step is a `WorkflowStep` object with the following properties:

| Property | Type | Description |
|---|---|---|
| `id` | `string` | A unique identifier. See [Identifier rules](#identifier-rules). |
| `stepType` | `WorkflowStepType` | What the step does. Defaults to `'ManualTrigger'`. |
| `name` | `string` | The display name. |
| `props` | `object` | The step settings. They depend on `stepType` and must be JSON-safe. |
| `customProps` | `object` | Application data that's saved with the step but not used by the designer. |
| `position` | `{ x, y }` | The position on the canvas. |

String settings accept [expressions](./expressions), such as <code>&#123;&#123;$.previousStep.response.body.id&#125;&#125;</code>.

## Identifier rules

The `id` of a step, connection, or sticky note must follow these rules:

* It must be unique across all steps, connections, and sticky notes in the workflow.
* It must start with a letter or an underscore (`_`).
* It can contain only letters, digits, underscores, and hyphens (`-`).
* It can't be a reserved name. Reserved names are built-in JavaScript object properties, such as `constructor`, `toString`, `hasOwnProperty`, `valueOf`, and `__proto__`.

| Valid | Invalid |
|---|---|
| `getOrder`, `_start`, `step-2`, `approval_1` | `2ndStep` (starts with a digit), `-step` (starts with a hyphen), `send email` (contains a space), `constructor` (reserved) |

The designer handles an identifier that's missing, invalid, reserved, or duplicated as follows:

* `importWorkflow` rejects the workflow with the code `IMPORT_IDS` or `IMPORT_INVALID_STRUCTURE`. See [Import](./import-export#import).
* `validateWorkflow` reports `ID_REQUIRED`, `ID_INVALID`, or `ID_DUPLICATE`.

## Triggers

Every workflow starts from a trigger. When a workflow has more than one trigger, choose the one to start from when you run it. The `runExecution` method takes the trigger identifier as its second argument.

### Manual trigger

`ManualTrigger` starts the run when the user clicks **Execute** or your code calls `runExecution`. It has no settings.

### Scheduled trigger

`ScheduledTrigger` runs the workflow on a schedule while the page is open.

| Setting | Description |
|---|---|
| `scheduleType` | `'Once'`, `'Recurring'`, or `'Cron'`. |
| `startDateTime` | When the schedule starts. |
| `interval`, `intervalUnit` | For `'Recurring'`: the repeat interval, with a unit of `'Minutes'`, `'Hours'`, `'Days'`, or `'Weeks'`. |
| `cronExpression` | For `'Cron'`: a five-field cron expression. |
| `endDateTime`, `maxOccurrences` | Optional limits. |
| `timeZone` | The IANA time zone that the schedule uses. |

A schedule is activated in two stages:

1. The user starts the run by clicking **Execute**, or your code calls `runExecution`. The trigger is then armed, and the execution log shows when the workflow is scheduled to run.
2. The trigger starts the workflow when the configured time is reached. A `'Once'` schedule runs the workflow once at `startDateTime`; if that time has already passed, the workflow runs immediately. `'Recurring'` and `'Cron'` schedules run the workflow at each occurrence until the end date or the maximum number of occurrences is reached, or until the user clicks **Stop**.

N> Schedules run only while the page is open. Closing or reloading the page cancels the schedule.

### Webhook trigger

`WebhookTrigger` starts the run when your application passes a webhook message to the `triggerWebhook` method. For details, see [Webhook trigger](./webhook-trigger).

### Form input trigger

`FormInputTrigger` shows a form when the run starts and passes the submitted values to the workflow.

| Setting | Description |
|---|---|
| `formTitle` | The form title. |
| `fields` | The form fields. Each field has a `name`, `type`, `label`, `placeholder`, and `defaultValue`. Supported types are `'TextBox'`, `'TextArea'`, `'Number'`, `'Date'`, `'Password'`, `'Email'`, `'DropDown'`, `'CheckBoxes'`, and `'RadioButton'`. |

## Actions

### Set variable

`SetVariable` creates named values that later steps can use.

| Setting | Description |
|---|---|
| `variables` | A list of `{ variableName, value, valueType }` items. `valueType` is `'Auto'`, `'String'`, `'Number'`, `'Boolean'`, or `'Json'`. For arithmetic, set `isMathOperation: true` with `firstValue`, `operator`, and `secondValue`. |

The variables become the response of the Set Variable step. To use one in a later step, open the variable picker, expand the card of that Set Variable step, and select the variable. For example, a variable named `status` on a step with the identifier `setStatus` is inserted as <code>&#123;&#123;$.nodes["setStatus"].response.status&#125;&#125;</code>.

### Filter

`Filter` keeps the items of a list that match the conditions.

| Setting | Description |
|---|---|
| `itemsPath` | An expression for the list, such as `$.nodes["getOrders"].response.body.items`. |
| `conditions` | [Condition rules](#condition-rules) that are evaluated against each item. In the variable picker, the **Array item fields** card lists the fields of the items. |
| `conditionLogic` | `'AND'` or `'OR'`. |

### Sort

`Sort` orders a list. Set `itemsPath`, `sortBy` (the field name), and `sortDirection` (`'Ascending'` or `'Descending'`).

### API request

`ApiRequest` sends an HTTP request from the browser.

| Setting | Description |
|---|---|
| `method` | `'GET'`, `'POST'`, `'PUT'`, `'PATCH'`, or `'DELETE'`. |
| `url` | An `http` or `https` URL. |
| `queryParams` | The query parameters, as a list of `{ key, value }` pairs. Displayed as **Query Parameters**. |
| `headers` | The request headers, as a list of `{ key, value }` pairs. Set them in the workflow JSON or in the [`beforeRequestSend`](./host-integration#intercept-requests) event. |
| `bodyType`, `body` | `bodyType` is `'Json'`, `'Text'`, or `'Expression'`. GET and DELETE requests don't send a body. |
| `authRef` | Displayed as **Auth Reference**. The name of a credential. Only the name is saved with the workflow, never a secret. |

The step's response contains `status`, `statusText`, `headers`, and `body`. A response status outside the 2xx range fails the step.

Requests are sent with the Fetch API option `credentials: 'omit'`, so the browser never adds the page's cookies or HTTP authentication. Headers that you configure explicitly, such as an `Authorization` header, are still sent. The target server must allow cross-origin requests (CORS) from your page.

### Delay

`Delay` pauses the run.

| Setting | Description |
|---|---|
| `delayType` | `'Fixed'`, `'Until'`, or `'Dynamic'`. |
| `duration`, `timeUnit` | For `'Fixed'`. The unit is `'Seconds'`, `'Minutes'`, `'Hours'`, or `'Days'`. |
| `untilDateTime`, `timeZone` | For `'Until'`. |
| `dynamicCondition`, `dynamicConditionLogic`, `dynamicDuration`, `dynamicTimeUnit` | For `'Dynamic'`: the delay applies when the conditions match. |

### Formatter

`Formatter` converts data into readable output. Set `inputSource` to `'PreviousStep'` or `'ContextPath'` (with `sourcePath`), and set `format` to `'Text'`, `'JSON'`, `'Markdown'`, or `'Table'`.

### Custom

`Custom` hands its work to your application through the `customExecutionRequested` event. The `actionType` setting identifies the action. See [Custom steps](./host-integration#custom-steps).

## Flow

### Condition

`Condition` evaluates [condition rules](#condition-rules) and continues from its `true` or `false` port.

| Setting | Description |
|---|---|
| `conditions` | The condition rules. |
| `conditionLogic` | `'AND'` (default) or `'OR'`. |

### Switch

`Switch` continues from the first branch whose condition matches.

| Setting | Description |
|---|---|
| `branches` | A list of `{ branchName, condition }` items. Each branch name becomes an output port. |

A Switch step also has a `default` output port, which the run continues from when no branch condition matches.

### Loop

`Loop` runs the steps connected to its `loop` port once for each item, and then continues from its `done` port.

| Setting | Description |
|---|---|
| `itemsPath` | An expression for the list. A single value is treated as a one-item list, and a missing value loops zero times. |
| `maxIterations` | The maximum number of iterations. |

For steps inside the loop, the variable picker shows a **Loop** card with the following values:

| Value | Expression |
|---|---|
| The item of the current iteration | `$.loop.currentItem` |
| The zero-based position of the current item | `$.loop.index` |
| The number of items | `$.loop.count` |
| The whole list | `$.loop.all` |

### End

`End` stops the current path and has no output ports. The execution log shows its `endMessage`.

## Human

### Approve

`Approve` pauses the run until a reviewer approves or declines, and then continues from its `approved` or `declined` port.

| Setting | Description |
|---|---|
| `reviewers` | A list of `{ type, value }` items. `type` is `'User'`, `'Role'`, `'Group'`, or `'Email'`. |
| `requestMessage` | The message shown to the reviewer. |
| `requestFields` | Displayed as **Request Details**. A list of `{ label, value }` items shown with the request. |

When an Approve step runs, the designer shows a built-in approval dialog. The run continues from the `approved` or `declined` port, depending on the decision made in the dialog.

### Notify

`Notify` sends a notification through your application. The `channel` setting determines which fields apply:

| Channel | Fields |
|---|---|
| `'Email'` | `to`, `cc`, `subject`, `message` |
| `'SMS'` | `phoneNumber`, `message` |
| `'Push'` | `deviceToken` or `userId`, `subject`, `message` |
| `'Teams'`, `'Slack'` | `channelId`, `mentionUsers`, `subject`, `message` |
| `'Webhook'` | `webhookUrl`, `method` (`'POST'` or `'PUT'`), `headers`, `body`, `message` |
| `'Custom'` | `target`, `subject`, `message` |

Handle the `notifyRequested` event to deliver the notification. See [Notifications](./host-integration#notifications).

## AI

`AI` sends a prompt to an AI provider and passes the answer to the next step. The settings that the property panel shows depend on `executionSettings.credentialMode`. For details, see [Credential mode](./security#credential-mode).

| Setting | Displayed as | Description |
|---|---|---|
| `serverUrl` | **Server URL** | Your backend endpoint, which receives the request and calls the AI provider. Shown when `credentialMode` is `'Reference'` (the default). |
| `provider` | **Provider** | `'Gemini'`, `'OpenAI'`, or `'Claude'`. Shown when `credentialMode` is `'Inline'`. |
| `model` | **Model** | The model name. Shown when `credentialMode` is `'Inline'`. |
| `apiKey` | **API Key** | A raw provider key, used directly from the browser. Shown when `credentialMode` is `'Inline'`. It's never exported. Use it for development only. |
| `memoryEnabled` | **Conversation Memory** | When `true`, the step remembers its recent prompts and answers from earlier runs and sends them with each new request. The history is kept in the browser's session storage, so it's cleared when the browser tab is closed. |
| `memoryHistorySize` | **Memory History Size** | The number of recent prompt-and-answer pairs to remember, from 1 to 50. Defaults to `10`. Shown when **Conversation Memory** is selected. |
| `systemPrompt`, `prompt` | **System Prompt**, **Prompt** | The instructions and the prompt. Both accept expressions. |
| `outputFormat` | **Output Format** | `'Text'`, `'JSON'`, or `'Markdown'`. |
| `timeoutSeconds` | **Timeout (seconds)** | The time the step can take before it fails. Defaults to `30`. |
| `responseFields` | **Desired Response Fields** | For `'JSON'` output, the fields that the answer should contain, each with a `name`, `type`, and `description`. |

## Condition rules

Condition, Filter, Delay, and Switch steps use condition rules:

| Property | Description |
|---|---|
| `field` | The value to test, usually an expression. |
| `valueType` | `'String'`, `'Number'`, `'Date'`, `'Boolean'`, or `'Array'`. |
| `operator` | One of the supported operators listed below. |
| `value` | The value to compare with. It isn't needed for `IsEmpty`, `IsNotEmpty`, `IsTrue`, or `IsFalse`. |

The supported operators are `Equal`, `NotEqual`, `Contains`, `NotContains`, `StartsWith`, `NotStartsWith`, `EndsWith`, `NotEndsWith`, `MatchesRegex`, `NotMatchesRegex`, `IsEmpty`, `IsNotEmpty`, `ArrayContains`, `ArrayNotContains`, `LengthEqual`, `LengthNotEqual`, `LengthGreaterThan`, `LengthLessThan`, `GreaterThan`, `GreaterThanOrEqual`, `LessThan`, `LessThanOrEqual`, `Before`, `BeforeOrEqual`, `After`, `AfterOrEqual`, `IsTrue`, and `IsFalse`.

## See also

* [Connections and ports](./connections)
* [Expressions and the variable picker](./expressions)
* [Validation](./validation)
