<template>
    <ejs-workflowdesigner ref="workflowDesigner" :height="height"></ejs-workflowdesigner>
    <button type="button" :disabled="!workflowReady" @click="validateWorkflow">Validate workflow</button>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const workflowDesigner = ref(null);
const workflowReady = ref(false);
const height = '600px';
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

onMounted(async () => {
    try {
        await workflowDesigner.value.ej2Instances.importWorkflow(workflow);
        workflowReady.value = true;
    } catch (error) {
        console.error(error);
    }
});

const validateWorkflow = () => {
    const result = workflowDesigner.value.ej2Instances.validateWorkflow();
    window.alert(result.isValid ? 'Workflow is valid' : 'Workflow is invalid');
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
