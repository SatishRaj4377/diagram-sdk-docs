---
layout: post
title: Expressions in TypeScript Workflow Designer | Syncfusion®
description: Learn how to read data from triggers, earlier steps, variables and loops with expressions in the Syncfusion TypeScript Workflow Designer.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Expressions and the Variable Picker in EJ2 TypeScript Workflow Designer

During a run, each step can read the data produced by the steps that ran before it. Step settings refer to that data with expressions.

## Expression syntax

* A full value: `$.nodes["getOrder"].response.body.total`
* Embedded in text, inside double braces: Order <code>&#123;&#123;$.nodes["getOrder"].response.body.id&#125;&#125;</code> has shipped.
* A field name with spaces or other special characters, in brackets and quotes: `$.nodes["orderForm"].response["Delivery date"]`

Refer to a step by its identifier inside brackets and double quotes, as in `$.nodes["getOrder"]`. The bracket form works for every valid identifier, including identifiers that contain hyphens, such as `$.nodes["step-2"]`.

## Use the variable picker

In the property panel, settings that accept expressions have a variable picker. The picker shows only data that the selected step can reach, and it inserts the matching expression when you select a value. It groups the data in the following cards:

| Card | What it contains | Inserted expression |
|---|---|---|
| A card for each earlier step, titled with the step name | The response of that step, such as an API response, the submitted form values, the variables of a Set Variable step, or the payload of a Webhook Trigger | `$.nodes["<stepId>"].response...` |
| **Previous step response** | The response of the step directly before the selected step | `$.previousStep.response...` |
| **Loop** | For steps inside a Loop step: the current item, its index, the item count, and the whole list | `$.loop.currentItem`, `$.loop.index`, `$.loop.count`, `$.loop.all` |
| **Array item fields** | For Filter and Sort steps: the fields of the items in the list | `$.loop.currentItem...` |

Run the workflow once to fill the cards with real data. Until then, the cards show the fields that are known from the step settings, such as form fields and Set Variable names.

To use a value created by a Set Variable step, select that variable in the card of the Set Variable step. For example, a variable named `orderId` on a Set Variable step with the identifier `setOrder` is inserted as `$.nodes["setOrder"].response.orderId`.

The following Notify step reads data from an earlier step, a Set Variable step, and the previous step:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}
{% raw %}

const notifyStep = {
    id: 'notify', stepType: 'Notify', name: 'Notify customer',
    props: {
        channel: 'Email',
        to: '{{$.nodes["getCustomer"].response.body.email}}',
        subject: 'Order {{$.nodes["setOrder"].response.orderId}}',
        message: 'Total: {{$.previousStep.response.body.total}}'
    }
};

{% endraw %}
{% endhighlight %}
{% endtabs %}

## Provide input data

To start a run with input data, pass it in the `input.response` property of the context argument of `runExecution`. The data becomes the response of the trigger step, so later steps read it from the trigger's card in the variable picker:

{% tabs %}
{% highlight ts tabtitle="app.ts" %}
{% raw %}

// The workflow starts from a Manual Trigger step with the identifier 'start'.
designer.runExecution({ input: { response: { orderId: 'SO-1001' } } });

// A later step reads the value with {{$.nodes["start"].response.orderId}}.

{% endraw %}
{% endhighlight %}
{% endtabs %}

## Rules

* Expressions only read values. They can't call functions.
* The `__proto__`, `prototype`, and `constructor` segments are rejected, as are global names such as `window` and `document`.
* Paths whose names look like secrets (for example, `password`, `token`, or `apiKey`) are masked in the execution log.
* `validateWorkflow` reports invalid syntax.
