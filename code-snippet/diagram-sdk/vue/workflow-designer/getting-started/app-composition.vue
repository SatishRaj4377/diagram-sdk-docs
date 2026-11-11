<template>
    <ejs-workflowdesigner ref="workflowDesigner" :width="width" :height="height"></ejs-workflowdesigner>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const workflowDesigner = ref(null);
const width = '100%';
const height = '600px';
const workflow = {
    schemaVersion: '1.1',
    id: 'simple-workflow',
    name: 'Simple workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'setStatus', stepType: 'SetVariable', name: 'Set status', position: { x: 380, y: 200 },
            props: { variables: [{ variableName: 'status', value: 'Ready', valueType: 'String' }] }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 }, props: { endMessage: 'Workflow completed.' } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'setStatus' },
        { id: 'c2', sourceStepId: 'setStatus', targetStepId: 'end' }
    ]
};

onMounted(async () => {
    try {
        await workflowDesigner.value.ej2Instances.importWorkflow(workflow);
    } catch (error) {
        console.error(error);
    }
});
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
