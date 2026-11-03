---
layout: post
title: Update workflow properties at runtime in JavaScript Workflow Designer | Syncfusion®
description: Learn how to update steps, connections, and sticky notes at runtime in the Syncfusion® JavaScript Workflow Designer.
platform: diagram-sdk
control: Workflow Designer
publishingplatform: diagram-sdk
documentation: ug
domainurl: https://help.syncfusion.com/diagram-sdk
---

# Update workflow properties at runtime

Use [`updateWorkflowItem`](https://ej2.syncfusion.com/documentation/api/workflow-designer/#updateworkflowitem) to change an existing step, connection, or sticky note without exporting and importing the workflow. The designer updates the item on the canvas and in the workflow definition.

The method accepts the item's `id`, an object containing the properties to update, and an optional flag that suppresses the `workflowChanged` event. It returns `true` when the item is updated and `false` when the update is ignored.

The `id` must identify an existing workflow item. IDs are unique across steps, connections, and sticky notes; see [Identifier rules](./workflow-steps#identifier-rules). Replace the sample IDs below with IDs from the workflow currently loaded in the designer.

## Update a step

The following example changes the name and settings of an API Request step when the user clicks a button:

{% tabs %}
{% highlight js tabtitle="app.js" %}

const updateButton = document.getElementById('updateOrder');

if (updateButton instanceof HTMLButtonElement) {
    updateButton.addEventListener('click', () => {
        const updated = designer.updateWorkflowItem('getOrder', {
            name: 'Get order details',
            props: {
                method: 'GET',
                url: 'https://api.mycompany.com/orders/1'
            }
        });

        if (!updated) {
            console.error('The workflow item could not be updated.');
        }
    });
}

{% endhighlight %}
{% endtabs %}

`changes` can contain one or more properties of the item. Properties that aren't included remain unchanged. The update is shallow: if you pass a nested object such as `props`, `style`, `position`, or `size`, that object replaces the existing value; it is not merged property by property. Include all nested values you want to keep. For example, the step update above replaces the step's complete `props` object with the supplied `method` and `url`.

Step settings in `props` depend on `stepType`. For the available settings, see [Workflow steps](./workflow-steps). Values saved with the workflow must be JSON-safe.

## Update a connection

Pass the connection's ID and the properties to change. For example, change its label and line shape:

{% tabs %}
{% highlight js tabtitle="app.js" %}

const updated = designer.updateWorkflowItem('toApproved', {
    label: 'Approved',
    type: 'Straight'
});

if (!updated) {
    console.error('The workflow connection could not be updated.');
}

{% endhighlight %}
{% endtabs %}

For the meaning of connection properties and output ports, see [Connections and ports](./connections).

## Update a sticky note

Sticky notes can be updated by changing their text, position, size, or style. For example:

{% tabs %}
{% highlight js tabtitle="app.js" %}

const updated = designer.updateWorkflowItem('orderNote', {
    text: 'Orders are processed by the fulfillment team.',
    position: { x: 420, y: 180 }
});

if (!updated) {
    console.error('The sticky note could not be updated.');
}

{% endhighlight %}
{% endtabs %}

Sticky notes are documentation on the canvas and do not run as part of the workflow.

## Update behavior and limitations

* **Unknown ID or read-only mode:** The method returns `false` and leaves the workflow unchanged. A successful update returns `true`.
* **Item IDs:** The `id` is immutable. Any `id` included in `changes` is ignored.
* **Switch branches:** Renaming a Switch branch while the workflow is idle also updates connections that leave through that branch, keeping them attached to the renamed output port.
* **While a workflow is running:** Updates are allowed. Use them, for example, to change the settings of a step that has not run yet. The updated settings are picked up when execution reaches that step. The workflow structure cannot be changed during a run: `stepType` on a step and `sourceStepId`, `targetStepId`, `sourcePort`, and `targetPort` on a connection are ignored. Updates made during a run are not added to undo history. See [Running workflows](./execution).

## Respond to updates

Unless `silent` is `true`, a successful update triggers `workflowChanged`. Pass `true` as the third argument when the application is making a change that should not trigger that event:

{% tabs %}
{% highlight js tabtitle="app.js" %}

designer.updateWorkflowItem('getOrder', { name: 'Get order details' }, true);

{% endhighlight %}
{% endtabs %}

The `silent` argument only suppresses `workflowChanged`; the item is still updated. When the event is triggered, its `changeType` identifies the updated item (`StepModified`, `ConnectionModified`, or `StickyNoteModified`), `affectedItem` identifies that item, and `changedProperties` lists the properties and their previous and new values. The `workflow` argument contains the updated workflow snapshot. See [Edit-time events](./host-integration#edit-time-events) for an event handler example.
