---
layout: post
title: Localization in TypeScript Workflow Designer control | Syncfusion®
description: Learn how to localize the text of the Syncfusion TypeScript Workflow Designer control into other cultures.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Localization in EJ2 TypeScript Workflow Designer

You can localize all text in the Workflow Designer, including labels, tooltips, validation messages, and run errors. Load the translations under the `workflow-designer` module name with `L10n.load`, and then set the `locale` property.

{% tabs %}
{% highlight ts tabtitle="app.ts" %}

import { L10n } from '@syncfusion/ej2-base';
import { WorkflowDesigner } from '@syncfusion/ej2-workflow-designer';

L10n.load({
    'de-DE': {
        'workflow-designer': {
            'workflowSteps': 'Workflow-Schritte',
            'searchWorkflowSteps': 'Workflow-Schritte suchen',
            'categoryTriggers': 'Auslöser',
            'categoryActions': 'Aktionen',
            'executionLog': 'Ausführungsprotokoll',
            'executionCompleted': 'Ausführung abgeschlossen',
            'cancel': 'Abbrechen'
        }
    }
});

const designer: WorkflowDesigner = new WorkflowDesigner({ locale: 'de-DE' });
designer.appendTo('#workflowDesigner');

{% endhighlight %}
{% endtabs %}

Keys that aren't translated fall back to English. Several designers on one page can use different locales.

N> Set `locale` when you create the designer. Changing `locale` after the designer is rendered isn't fully supported yet: some text, such as messages already shown in the execution log or an open dialog, may stay in the previous language. To switch the language reliably, destroy the designer and create it again with the new locale, and use `exportWorkflow` and `importWorkflow` to keep the current workflow.

## Default locale

The following table lists all 472 localization keys and their default English text. Some keys, such as `'Action Type'` and `'Time Zone'`, are the English labels themselves and contain spaces. Use them exactly as shown, in quotes, in your `L10n.load` object.

| Key | Default text |
|---|---|
| `workflowSteps` | Workflow Steps |
| `searchWorkflowSteps` | Search workflow steps |
| `cancel` | Cancel |
| `cancelInsertion` | Cancel insertion |
| `noNodesMatchSearch` | No nodes match the search. |
| `categoryTriggers` | Triggers |
| `categoryActions` | Actions |
| `categoryFlow` | Flow |
| `categoryHuman` | Human |
| `categoryAI` | AI |
| `categoryOutput` | Output |
| `search` | Search |
| `executionLog` | Execution log |
| `stepDetails` | Step details |
| `selectExecutionRow` | Select a step execution row to inspect its context. |
| `output` | Output |
| `input` | Input |
| `json` | JSON |
| `executionRunning` | Execution Running |
| `executionFailed` | Execution Failed |
| `executionStopped` | Execution Stopped |
| `executionCompleted` | Execution Completed |
| `stepCountOne` | {0} step |
| `stepCountOther` | {0} steps |
| `clearSimulationLog` | Clear simulation log |
| `toggleSimulationLog` | Toggle simulation log |
| `showAllIssues` | Show all issues |
| `hideIssues` | Hide issues |
| `statusSuccess` | Success |
| `statusFailure` | Failure |
| `statusStarted` | Started |
| `statusSkipped` | Skipped |
| `statusRetry` | Retry |
| `statusWarning` | Warning |
| `statusStopped` | Stopped |
| `statusValidation` | Validation |
| `statusFailed` | Failed |
| `statusCompleted` | Completed |
| `aiAssist` | AI Assist |
| `aiPromptPlaceholder` | Describe a workflow or answer the current question... |
| `selectAnswer` | Select an answer |
| `typeAnswerHere` | Type your answer here... |
| `aiAssistSuggestionsHeader` | Try a workflow idea |
| `aiAssistSettingsTitle` | AI Assist settings |
| `aiAssistSettingsOpenAria` | Open AI Assist settings |
| `aiAssistSettingsReady` | AI Assist is configured |
| `aiAssistSettingsPending` | Configure AI Assist (provider, model, credential or server URL) |
| `aiAssistBusyWait` | Please wait for the current AI request to complete. |
| `aiAssistThinkingAnalyze` | Analyzing the workflow requirements |
| `aiAssistThinkingGenerate` | Generating and validating the workflow |
| `aiAssistSubmit` | Submit |
| `aiAssistStartOver` | Start Over |
| `aiAssistRetry` | Retry |
| `aiAssistOpenSettings` | Open Settings |
| `aiAssistTextHint` | Press Submit when you are done, or Ctrl/⌘ + Enter. |
| `aiAssistManualAnswerPrefix` | Manual answer: {0} |
| `aiAssistManualAnswerRecorded` | Manual answer recorded for: {0} |
| `aiAssistAnswerRequired` | Please answer the required question: {0} |
| `aiAssistSuccess` | Workflow generated and loaded on the canvas. |
| `aiAssistRequestCleared` | Current workflow request cleared. Enter a new request. |
| `aiAssistPreviousAria` | Previous question |
| `aiAssistNextAria` | Next question |
| `aiAssistQuestionProgress` | Question {0} of {1} |
| `aiAssistMissingSetting` | AI Assist is missing required setting: {0}. Open the gear icon and configure provider, model and credential (or server URL). |
| `aiAssistHintCORS` | Direct browser-to-provider calls are usually blocked by CORS. Open the gear icon and switch Transport mode to "Server" with a host backend URL that proxies the request. |
| `aiAssistHintCORSResponse` | The browser could not read the AI provider response (likely a CORS preflight failure). Open the gear icon and switch Transport mode to "Server" with a host backend URL that proxies the request. |
| `aiAssistHintAuth` | The provider rejected the API key. Re-enter the key through the gear icon. |
| `aiAssistHintRateLimit` | The provider is rate-limiting. Wait a moment and retry. |
| `aiAssistHintConfig` | Open the gear icon and configure provider, model and credential (or server URL). |
| `aiAssistSettingsDialogTitle` | AI Assist Settings |
| `aiAssistSettingsCancel` | Cancel |
| `aiAssistSettingsSave` | Save |
| `aiAssistSettingsProvider` | Provider |
| `aiAssistSettingsModel` | Model |
| `aiAssistSettingsServerUrl` | Server URL |
| `aiAssistSettingsModelPlaceholder` | Enter model name |
| `aiAssistSettingsServerUrlPlaceholder` | https://your-backend/ai-assist |
| `aiAssistSettingsCredentialPlaceholder` | Paste an API key |
| `aiAssistSettingsNoCredential` | No credential stored. |
| `aiAssistSettingsStoredCredential` | A credential is stored for this settings object ({0}). Leave blank to keep the existing one. |
| `runSimulation` | Run simulation |
| `autoArrange` | Auto arrange |
| `toggleReadOnlyLock` | Toggle read-only lock |
| `lockWorkflow` | Lock workflow |
| `unlockWorkflow` | Unlock workflow |
| `undo` | Undo |
| `redo` | Redo |
| `importWorkflow` | Import workflow |
| `exportWorkflow` | Export workflow |
| `importFailed` | The workflow file could not be imported. |
| `errorImportInvalidJson` | Workflow JSON is not valid JSON. |
| `errorImportIds` | Workflow item IDs must be non-empty and unique. |
| `errorImportTooLarge` | Workflow JSON exceeds the maximum size of 5 MB. |
| `errorImportVersion` | Unsupported workflow definition version. Expected 1.0 or 1.1. |
| `errorDestroyed` | The Workflow Designer has been destroyed. |
| `errorNoHandler` | No handler is bound to the {0} event. |
| `errorHandlerTimeout` | The {0} handler did not call complete() or fail() within {1} ms. |
| `errorRunInProgress` | A workflow run is already in progress. Call stopExecution() before starting another run. |
| `errorWebhookInvalidMessage` | Invalid webhook message. |
| `errorWebhookIdsRequired` | workflowId and triggerId are required. |
| `errorWebhookWorkflowMismatch` | Webhook workflow '{0}' does not match the loaded workflow. |
| `errorWebhookTriggerNotFound` | Webhook Trigger '{0}' was not found. |
| `errorWebhookMethod` | Webhook Trigger '{0}' expects {1}, received {2}. |
| `errorWebhookPath` | Webhook Trigger '{0}' does not listen on path '{1}'. |
| `errorWebhookAuth` | Webhook Trigger '{0}' requires {1} authentication; set message.authenticated after verifying the request. |
| `errorAIAssistDisabled` | AI Assist is disabled. |
| `errorAIAssistCredential` | The AI Assist credential could not be resolved. Check the credential settings, or use Inline mode for development. |
| `credentialReference` | Credential reference |
| `credentialReferencePlaceholder` | e.g. openai-prod |
| `credentialReferenceHelp` | The name of a credential reference saved with the workflow; the secret itself is not. |
| `credentialInlineSet` | Set API key |
| `credentialInlineReplace` | Click to replace the stored API key. |
| `credentialInlineStore` | Click to store an API key for this step. |
| `credentialInlineClear` | Clear API key |
| `credentialInlineWarning` | Development only: this key is sent directly from the browser and is never written to the exported workflow. |
| `credentialInlinePaste` | Paste API key |
| `credentialInlineCurrent` | Currently saved: |
| `aiAssistSettingsCredentialReference` | Credential reference |
| `aiAssistSettingsApiKeyInline` | API key |
| `aiAssistSettingsStoredReference` | Using credential reference '{0}'. |
| `stopSimulation` | Stop simulation |
| `selectTrigger` | Select trigger |
| `trigger` | Trigger |
| `defaultProjectName` | Workflow Designer |
| `addNode` | Add Node |
| `select` | Select |
| `pan` | Pan |
| `addStickyNote` | Add Sticky Note |
| `zoomOut` | Zoom Out |
| `zoomIn` | Zoom In |
| `fit` | Fit |
| `resetZoom` | Reset Zoom |
| `clearDiagram` | Clear the diagram |
| `clearWorkflowTitle` | Clear workflow |
| `clearWorkflowMessage` | Remove all steps, connections and sticky notes from the canvas? |
| `clearWorkflowConfirm` | Clear |
| `changeStickyNoteColor` | Change sticky note color |
| `editStickyNote` | Edit sticky note |
| `stickyNoteDefaultText` | Double-click to edit\n\nYou can use **bold**, *italic*, `code`, and\n# Headers\n- Lists |
| `regionToolbar` | Workflow Designer toolbar |
| `regionStepCollection` | Step collection |
| `regionCanvas` | Workflow canvas |
| `regionProperties` | Workflow properties |
| `executionLogEntries` | Execution log entries |
| `searchExecutionLog` | Search execution log |
| `toggleValidationDetails` | Toggle validation details |
| `validationIssues` | Validation issues |
| `responseFieldsEmpty` | No desired response fields yet. Add a field for each JSON key the AI should return. |
| `variablePickerNoUpstream` | No upstream steps. Connect a previous step to expose its output. |
| `save` | Save |
| `propEnableMemory` | Enable memory |
| `clearConversationMemory` | Clear previous conversation memory |
| `validationIdRequired` | Every step, connection and sticky note needs an ID. |
| `validationIdInvalid` | IDs must start with a letter or underscore and use only letters, digits, _ and -. Names such as toString and constructor are reserved. |
| `validationIdDuplicate` | This ID is already used by another step, connection or sticky note. |
| `validationTriggerRequired` | Add a trigger step so the workflow has a starting point. |
| `validationConnectionEndpoint` | This connection points to a step that doesn't exist. |
| `validationSelfConnection` | A step can't connect to itself. |
| `validationSourcePortInvalid` | This connection starts from an output the step no longer has. Reconnect it to one of the step's outputs. |
| `validationTargetPortInvalid` | Connections must end on the step's input. |
| `validationTriggerIncoming` | Trigger steps start the workflow, so they can't have incoming connections. |
| `validationConnectionDuplicate` | These two steps are already connected this way. |
| `validationFanOut` | This output already has a connection. Each output can lead to only one step. |
| `validationMergeTopology` | Trigger steps can't have incoming connections. |
| `validationCycle` | The workflow loops back to an earlier step. Use a Loop step to repeat steps. |
| `validationUnreachableStep` | This step can't be reached from any trigger, so it will never run. |
| `validationLoopMax` | Max Iterations must be a whole number greater than 0. |
| `validationScheduleInterval` | Enter an interval greater than 0. |
| `validationScheduleType` | Choose a schedule type: Once, Recurring or Cron. |
| `validationScheduleTimeZone` | Enter a valid IANA time zone, for example UTC or Europe/London. |
| `validationScheduleStartOnce` | Choose the date and time to run. |
| `validationScheduleStartRecurring` | Choose the date and time of the first run. |
| `validationScheduleStartInvalid` | The start date and time isn't valid. |
| `validationScheduleIntervalUnit` | Choose an interval unit: Minutes, Hours, Days or Weeks. |
| `validationScheduleEndBeforeStart` | The end date and time must be after the start. |
| `validationScheduleMaxOccurrences` | Max Occurrences must be a whole number greater than 0. |
| `validationCronFields` | A cron expression needs 5 fields: minute, hour, day of month, month and day of week. |
| `validationWebhookMethod` | Choose a valid HTTP method for the webhook. |
| `validationWebhookAuth` | Enter a credential reference for the selected authentication. |
| `validationWebhookAuthMode` | Choose an authentication type: None, Basic, API Key Header, Bearer, HMAC SHA-256 or Custom. |
| `validationWebhookAuthHeader` | Enter the name of the header that carries the API key. |
| `validationWebhookAuthSignatureHeader` | Enter the name of the header that carries the signature. |
| `validationWebhookResponseCode` | Enter an HTTP status code from 100 to 599. |
| `validationFormFields` | Add at least one field to the form. |
| `validationFormFieldName` | Every form field needs a name. |
| `validationFormFieldUnique` | Form field names must be unique. |
| `validationFormFieldType` | Every form field needs a type. |
| `validationFormFieldOptions` | Add at least one option to this list field. |
| `validationSetVariableRequired` | Add at least one variable. |
| `validationSetVariableName` | Every variable needs a name. |
| `validationSetVariableUnique` | Variable names must be unique. |
| `validationSetVariableMath` | A calculation needs a first value, an operator and a second value. |
| `validationSetVariableZero` | This calculation divides by zero. |
| `validationSetVariableValue` | Enter a value for the variable. |
| `validationSetVariableType` | The value doesn't match the variable's type ({0}). |
| `stepTimedOut` | The step did not finish within {0} ms. |
| `credentialUnresolved` | The step credential could not be resolved. Check the credential settings, or use Inline mode for development. |
| `variableTypeMismatch` | Variable '{0}' can't be converted to {1}. |
| `unresolvedExpression` | Expression {0} resolved to nothing; an empty value was used. |
| `loopItemsMissing` | Loop items path {0} resolved to nothing; the loop body was skipped. |
| `variableValueType` | Type |
| `validationUrlProtocol` | Use a URL that starts with http:// or https://. |
| `validationDelayDuration` | Enter a duration of 0 or more. |
| `validationDelayDynamic` | A dynamic delay needs a condition, a duration of 0 or more, and a time unit. |
| `validationSwitchBranch` | Add at least one branch. |
| `validationSwitchBranchName` | Every branch needs a unique name. |
| `validationApproveReviewers` | Add at least one reviewer. |
| `validationApproveRequestFields` | Add at least one request detail (label and value) so reviewers know what they're approving. |
| `validationConditionRequired` | Add at least one complete condition. |
| `validationConditionField` | Choose the field to compare. |
| `validationConditionValueType` | Choose the type of the value to compare. |
| `validationConditionOperator` | Choose a comparison operator. |
| `validationConditionValue` | Enter a value to compare against. |
| `validationSecretForbidden` | Don't enter secrets here. Use a credential reference instead. |
| `validationRequiredProp` | {0} is required. |
| `validationExpressionUnbalanced` | An expression is missing its opening &#123;&#123; or closing &#125;&#125;. |
| `validationExpressionSyntax` | This expression isn't valid. |
| `validationExpressionRoot` | Expressions must start with $, for example $.input.response. |
| `validationExpressionForbidden` | This expression path isn't allowed. |
| `validationExpressionSecret` | Expressions can't read secrets. |
| `validationExpressionUnknownRoot` | Unknown expression root '{0}'. Use one of: {1}. For the current item in a Filter or Loop, use $.loop.currentItem. |
| `scheduledTriggerMissingRunAt` | Scheduled trigger is missing Run at date/time. |
| `scheduledTriggerInvalidRunAt` | Scheduled trigger has an invalid Run at date/time. |
| `scheduledTriggerNotDue` | Scheduled trigger is not due yet. Next run: {0}. |
| `scheduledTriggerDue` | Scheduled trigger is due. Simulating once run scheduled at {0}. |
| `recurringNeedsStart` | Recurring trigger needs a Start date/time before it can run. |
| `recurringInvalidStart` | Recurring trigger has an invalid Start date/time. |
| `recurringNeedsInterval` | Recurring trigger needs a positive interval. |
| `recurringNotStarted` | Recurring trigger has not started. First run: {0}. |
| `recurringActive` | Recurring trigger is active. Simulating occurrence #{0}. |
| `recurringStopped` | Recurring trigger has stopped. |
| `cronNeedsExpression` | Cron schedule needs a Cron expression. |
| `cronEnded` | Cron trigger ended at {0}. |
| `cronSimulation` | Cron trigger simulation for expression: {0}. |
| `scheduleTypeInvalid` | scheduleType must be Once, Recurring, or Cron. |
| `networkRequestFailed` | Network request failed. |
| `apiResponseTooLarge` | The response is larger than 5 MB and was not read. |
| `requestCancelled` | The request was cancelled by the beforeRequestSend event. |
| `apiUrlRequired` | ApiRequest requires a URL. |
| `apiUrlProtocol` | URL must use http:// or https://. |
| `retryingStep` | Retrying step. |
| `approvalHostRequired` | Approval decision requires a host implementation via promptApproval. |
| `upstreamDataMissingItemsPath` | Required upstream data is missing for itemsPath. |
| `upstreamDataMissingPath` | Required upstream data is missing for {0}. |
| `formInputCancelled` | Form input cancelled. |
| `workflowValidationFailed` | Workflow validation failed. |
| `executionStartedMessage` | Execution started. |
| `executionFailedMessage` | Execution failed. |
| `executionCompletedMessage` | Execution completed. |
| `executionStoppedMessage` | Execution stopped. |
| `selectTriggerBeforeRun` | Select a trigger before running a workflow with multiple triggers. |
| `stepValidationFailed` | Step validation failed. |
| `stepCompletedMessage` | Step completed. |
| `aiPromptRequired` | AI step requires a prompt or system prompt. |
| `aiServerUrlRequired` | AI step with mode "Server" requires a serverUrl property. |
| `aiModelRequired` | AI step requires a model. |
| `aiApiKeyRequired` | AI step requires an API key. Set it in the step for development, or configure the step to use your backend. |
| `propPropertiesTitle` | Properties |
| `propEmptyMessage` | Select a workflow step to edit properties. |
| `propExpandTitle` | Expand properties |
| `propExpandLabel` | Expand |
| `propCollapseTitle` | Collapse properties |
| `propStepName` | Step Name |
| `propConnectionLabel` | Label |
| `propConnectionType` | Type |
| `Action Type` | Action Type |
| `Auth Reference` | Auth Reference |
| `Body` | Body |
| `Body Type` | Body Type |
| `Branches` | Branches |
| `Channel` | Channel |
| `Channel ID` | Channel ID |
| `Condition` | Condition |
| `Conditions` | Conditions |
| `Credential` | Credential |
| `Cron Expression` | Cron Expression |
| `Delay Type` | Delay Type |
| `Desired Response Fields` | Desired Response Fields |
| `Direction` | Direction |
| `Duration` | Duration |
| `End Date Time` | End Date Time |
| `End Message` | End Message |
| `Fields` | Fields |
| `Form Title` | Form Title |
| `Format` | Format |
| `Input JSON` | Input JSON |
| `Input Source` | Input Source |
| `Interval` | Interval |
| `Interval Unit` | Interval Unit |
| `Items Path` | Items Path |
| `Logic` | Logic |
| `Max Iterations` | Max Iterations |
| `Max Occurrences` | Max Occurrences |
| `Message` | Message |
| `Method` | Method |
| `Mode` | Mode |
| `Model` | Model |
| `Output Format` | Output Format |
| `Timeout (seconds)` | Timeout (seconds) |
| `Path` | Path |
| `Phone Number` | Phone Number |
| `Prompt` | Prompt |
| `Provider` | Provider |
| `Query Parameters` | Query Parameters |
| `queryParametersAdd` | Add query parameter |
| `queryParameterKey` | Key |
| `queryParameterValue` | Value |
| `removeQueryParameter` | Remove query parameter |
| `insertRuntimeContext` | Insert runtime context |
| `insertVariable` | Insert variable |
| `pickArrayItemField` | Pick array item field |
| `Request Details` | Request Details |
| `Request Message` | Request Message |
| `Reviewers` | Reviewers |
| `Schedule Type` | Schedule Type |
| `Server URL` | Server URL |
| `Sort By` | Sort By |
| `Source Path` | Source Path |
| `Start Date Time` | Start Date Time |
| `System Prompt` | System Prompt |
| `Target` | Target |
| `Time Unit` | Time Unit |
| `To` | To |
| `Until` | Until |
| `URL` | URL |
| `Variables` | Variables |
| `Webhook URL` | Webhook URL |
| `API Key` | API Key |
| `API Key Header Name` | API Key Header Name |
| `Authentication` | Authentication |
| `Conversation Memory` | Conversation Memory |
| `Credential Reference` | Credential Reference |
| `HTTP Method` | HTTP Method |
| `Keep Memory` | Keep Memory |
| `Memory History Size` | Memory History Size |
| `Payload Schema` | Payload Schema |
| `Response Body` | Response Body |
| `Response Code` | Response Code |
| `Response Mode` | Response Mode |
| `Send Workflow Data` | Send Workflow Data |
| `Signature Header Name` | Signature Header Name |
| `formFieldsEmpty` | No form fields yet. Add a field to collect input. |
| `formFieldsAdd` | Add field |
| `formFieldRow` | Field {0} |
| `formFieldRemove` | Remove field |
| `formFieldName` | Name |
| `formFieldNameHelp` | Field name shown as the label |
| `formFieldType` | Type |
| `formFieldTypeAria` | Field {0} type |
| `formFieldDefault` | Default value |
| `formFieldPlaceholder` | Placeholder |
| `formFieldPlaceholderHelp` | Hint shown inside the input |
| `formFieldOptions` | Options |
| `formFieldOptionsPlaceholder` | Option A, Option B, Option C |
| `formFieldOptionsAria` | Field {0} options |
| `formFieldRequired` | Required |
| `reviewersEmpty` | No reviewers yet. Add a reviewer to decide this approval. |
| `reviewersAdd` | Add reviewer |
| `reviewerRow` | Reviewer {0} |
| `reviewerRemove` | Remove reviewer |
| `reviewerType` | Type |
| `reviewerTypeAria` | Reviewer {0} type |
| `reviewerValue` | Value |
| `requestFieldsEmpty` | No request details yet. Add at least one to make the approval meaningful. |
| `requestFieldsAdd` | Add request detail |
| `requestFieldRow` | Detail {0} |
| `requestFieldRemove` | Remove request detail |
| `requestFieldLabel` | Label |
| `requestFieldValue` | Value |
| `branchEmpty` | No branches yet. Add a branch with a condition. |
| `branchAdd` | Add branch |
| `branchRow` | Branch {0} |
| `branchRemove` | Remove branch |
| `branchName` | Branch name |
| `conditionEmpty` | No conditions yet. Add a rule to evaluate runtime context. |
| `conditionAdd` | Add condition |
| `conditionRow` | Condition {0} |
| `conditionRemove` | Remove condition |
| `conditionField` | Field |
| `conditionValueType` | Value type |
| `conditionOperator` | Operator |
| `conditionValue` | Value |
| `variableEmpty` | No variables yet. Add a variable to store under $.variables. |
| `variableAdd` | Add variable |
| `variableRow` | Variable {0} |
| `variableRemove` | Remove variable |
| `variableName` | Variable name |
| `variableNameHelp` | Name under $.variables |
| `variableMathToggle` | Use mathematical / comparison operation |
| `variableFirstValue` | First value |
| `variableOperator` | Operator |
| `variableOperatorAria` | Variable {0} operator |
| `variableSecondValue` | Second value |
| `variableValue` | Value |
| `variableValueHelp` | &#123;&#123;$.path&#125;&#125; or literal |
| `formDialogEmpty` | No form fields are configured for this step. Add fields in the property panel (name and default value), then run again. |
| `formDialogDefaultTitle` | Form input - {0} |
| `formDialogRequired` | This field is required. |
| `formDialogCancel` | Cancel |
| `formDialogSubmit` | Submit |
| `formDialogSelectPlaceholder` | Select… |
| `approvalDefaultTitle` | Approval - {0} |
| `approvalReviewerHeading` | Reviewer |
| `approvalReviewerAria` | {0} reviewer |
| `approvalRequestDetails` | Request Details |
| `approvalEmpty` | No request details configured. Add details in the property panel to make the approval meaningful. |
| `approvalFieldDefaultLabel` | Detail |
| `approvalEmptyValue` | — |
| `approvalCommentLabel` | Reason for rejection * |
| `approvalCommentPlaceholder` | Tell the requester why this is being declined |
| `approvalCommentError` | Please provide a reason for rejection. |
| `approvalReject` | Reject |
| `approvalApprove` | Approve |
| `approvalBack` | Back |
| `approvalSubmitRejection` | Submit Rejection |
| `addWorkflowStep` | Add workflow step |
| `deleteStep` | Delete step |
| `executeStep` | Execute step |
| `addNextStepFromPort` | Add next step from {0} |
| `insertStepOnConnection` | Insert step on connection |
| `deleteConnection` | Delete connection |
| `deleteStickyNote` | Delete sticky note |
| `executeHandleTooltip` | Run |
| `insertStepHandleTooltip` | Insert step |
| `addNextStepHandleTooltip` | Add next step |
| `aiAssistCloseAria` | Close AI Assist |
| `aiAssistCloseTitle` | Close AI Assist |
| `helpScheduledTriggerTimeZoneTitle` | Time Zone |
| `helpScheduledTriggerTimeZone` | A time zone is a region of the world that shares the same local clock time. It is used so a schedule runs at the local time you expect, wherever the server is.\n\n**Format:** IANA name (Area/City). Defaults to UTC when empty.\n\n**Examples:**\nAsia/Kolkata — India (IST)\nUTC — Coordinated Universal Time\nAmerica/New_York — US Eastern\nEurope/London — UK\nAsia/Tokyo — Japan\nAustralia/Sydney — Australia East |
| `helpScheduledTriggerCronExpressionTitle` | Cron Expression Help |
| `helpScheduledTriggerCronExpression` | **Format:** minute hour day month weekday\n\n**Fields:**\nmin 0-59 · hour 0-23 · day 1-31 · month 1-12 · weekday 0-6 (Sun=0)\n\n**Tokens:**\n* any · */n every n · 1-5 range · 1,15 list\n\n**Examples:**\n0 9 * * 1-5 — weekdays at 09:00\n*/15 * * * * — every 15 minutes\n0 0 1 * * — midnight on the 1st |
| `helpWebhookTriggerPath` | Specifies the relative endpoint path used to receive webhook requests (e.g., "expenses/created"). No leading or trailing slashes are needed. |
| `helpWebhookTriggerAuthRef` | Reference name (not the secret). Backend resolves this to actual credentials. |
| `helpWebhookTriggerAuthHeaderName` | HTTP header containing the API key (e.g., X-API-Key). |
| `helpWebhookTriggerAuthSignatureHeaderName` | HTTP header containing the HMAC signature (e.g., X-Webhook-Signature). |
| `helpWebhookTriggerPayloadSchema` | Define expected webhook payload fields. |
| `helpWebhookTriggerResponseMode` | Return 202 Accepted immediately. |
| `helpWebhookTriggerResponseCode` | Specifies the HTTP status code returned after the webhook request is processed. Default is 202. |
| `helpWebhookTriggerResponseBody` | Optional response template with {executionId}, {workflowId}, {triggerId}, {receivedAt}. |
| `helpSetVariableVariables` | Creates reusable values only under **$.variables**. Normal mode stores the configured value. Operation mode evaluates two values and stores the result. Input and previous-node payloads remain unchanged. |
| `helpAIServerUrlTitle` | Server URL |
| `helpAIServerUrl` | Sends the prompt to your server. Your server calls the AI and returns the response, which is forwarded to the next step. |
| `helpAIMemoryEnabled` | When enabled, this AI Agent will remember recent interactions from previous executions and include that history in subsequent prompts for continuous, context-aware conversations. |
| `helpAIContextWindowLength` | Controls how many recent conversations the AI retains when memory is enabled. |
| `helpAIApiKey` | Development only: the key is sent directly from the browser and is never written to the exported workflow. |
| `helpAIResponseFields` | Specify the Desired Response Fields expected from the AI. When fields are added, the AI output is automatically set to JSON.\n\n**Name:** Field name in the JSON response (e.g. priority, category).\n**Type:** Data type of the returned value (e.g. String, Number, Boolean).\n**Description:** Optional guidance for generating the value. |
| `Field help` | Field help |
| `Cron expression help` | Cron expression help |
| `Desired response fields help` | Desired response fields help |
| `scheduleValidationFailed` | Schedule validation failed: {0} |
| `scheduleNoNextOccurrence` | The {0} trigger has no upcoming run. |
| `scheduleNextRun` | Next run scheduled for {0}. |
| `scheduleAllOccurrencesCompleted` | All {0} trigger runs are complete. |
| `scheduleRunScheduled` | {0} trigger run scheduled for {1}. |
| `scheduleTestRunStarted` | Test run started now. Next scheduled run: {0}. |
| `stepCompleted` | Step completed. |
| `recurringEndedAt` | The recurring trigger ended at {0}. |
| `recurringMaxReached` | The recurring trigger stopped after {0} runs. |
| `runAnnounceScheduled` | Run scheduled. |
| `runAnnounceRunning` | Run started. |
| `runAnnounceWaiting` | Run is waiting for input. |
| `runAnnounceCompleted` | Run completed. |
| `runAnnounceFailed` | Run failed. See the execution log for details. |
| `runAnnounceStopped` | Run stopped. |
| `runAnnounceCancelled` | Run cancelled. |
| `stepAccessibleName` | {0}, {1} step |
| `connectionAccessibleName` | Connection from {0} to {1} |
| `stickyNoteAccessibleName` | Sticky note: {0} |
| `noStepInDirection` | No step in that direction. |
| `Time Zone` | Time Zone |
| `approvalTimedOut` | No decision was made within {0} seconds. |
| `validationCredentialLooksLikeKey` | This looks like an API key, not a credential reference. Enter a credential reference, or use Inline mode to type a key for development. |
