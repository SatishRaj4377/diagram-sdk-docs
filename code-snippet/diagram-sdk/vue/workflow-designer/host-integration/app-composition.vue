<template>
    <ejs-workflowdesigner
        ref="workflowDesigner"
        :height="height"
        :customExecutionRequested="customExecutionRequested"
    ></ejs-workflowdesigner>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const workflowDesigner = ref(null);
const height = '600px';
const workflow = {
    schemaVersion: '1.1',
    id: 'custom-workflow',
    name: 'Custom execution',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'custom', stepType: 'Custom', name: 'Create invoice', position: { x: 380, y: 200 },
            props: { actionType: 'createInvoice', input: { orderId: 'SO-1001' } }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'custom' },
        { id: 'c2', sourceStepId: 'custom', targetStepId: 'end' }
    ]
};

onMounted(async () => {
    try {
        await workflowDesigner.value.ej2Instances.importWorkflow(workflow);
    } catch (error) {
        console.error(error);
    }
});

const customExecutionRequested = (args) => {
    if (args.actionType === 'createInvoice') {
        args.complete({ invoiceId: 'INV-1001' });
    } else {
        args.fail(new Error('Unknown action: ' + args.actionType));
    }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
