<template>
    <ejs-workflowdesigner ref="workflowDesigner" :height="height"></ejs-workflowdesigner>
    <button type="button" :disabled="!workflowReady" @click="validateWorkflow">Validate workflow</button>
</template>
<script>
import { WorkflowDesignerComponent } from '@syncfusion/ej2-vue-workflow-designer';

const workflow = {
    schemaVersion: '1.1',
    id: 'validation-workflow',
    name: 'Validation',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'variable', stepType: 'SetVariable', name: 'Set value', position: { x: 380, y: 200 },
            props: { variables: [{ variableName: 'amount', value: '100', valueType: 'Number' }] }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'variable' },
        { id: 'c2', sourceStepId: 'variable', targetStepId: 'end' }
    ]
};

export default {
    name: 'App',
    components: {
        'ejs-workflowdesigner': WorkflowDesignerComponent
    },
    data() {
        return {
            height: '600px',
            workflowReady: false
        };
    },
    async mounted() {
        try {
            await this.$refs.workflowDesigner.ej2Instances.importWorkflow(workflow);
            this.workflowReady = true;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        validateWorkflow() {
            const result = this.$refs.workflowDesigner.ej2Instances.validateWorkflow();
            window.alert(result.isValid ? 'Workflow is valid' : 'Workflow is invalid');
        }
    }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
