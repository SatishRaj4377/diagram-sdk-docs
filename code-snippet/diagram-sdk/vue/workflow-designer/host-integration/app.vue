<template>
    <ejs-workflowdesigner
        ref="workflowDesigner"
        :height="height"
        :customExecutionRequested="customExecutionRequested"
    ></ejs-workflowdesigner>
</template>
<script>
import { WorkflowDesignerComponent } from '@syncfusion/ej2-vue-workflow-designer';

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

export default {
    name: 'App',
    components: {
        'ejs-workflowdesigner': WorkflowDesignerComponent
    },
    data() {
        return {
            height: '600px'
        };
    },
    async mounted() {
        try {
            await this.$refs.workflowDesigner.ej2Instances.importWorkflow(workflow);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        customExecutionRequested(args) {
            if (args.actionType === 'createInvoice') {
                args.complete({ invoiceId: 'INV-1001' });
            } else {
                args.fail(new Error('Unknown action: ' + args.actionType));
            }
        }
    }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
