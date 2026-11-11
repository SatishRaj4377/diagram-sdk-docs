<template>
    <ejs-workflowdesigner ref="workflowDesigner" :height="height"></ejs-workflowdesigner>
    <button type="button" :disabled="!workflowReady" @click="runWorkflow">Run workflow</button>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { WorkflowDesignerComponent as EjsWorkflowdesigner } from '@syncfusion/ej2-vue-workflow-designer';

const workflowDesigner = ref(null);
const workflowReady = ref(false);
const height = '600px';
const workflow = {
    schemaVersion: '1.1',
    id: 'execution-workflow',
    name: 'Run workflow',
    workflowSteps: [
        { id: 'start', stepType: 'ManualTrigger', name: 'Start', position: { x: 120, y: 200 } },
        {
            id: 'delay', stepType: 'Delay', name: 'Wait', position: { x: 380, y: 200 },
            props: { delayType: 'Fixed', duration: 1, timeUnit: 'Seconds' }
        },
        { id: 'end', stepType: 'End', name: 'End', position: { x: 640, y: 200 } }
    ],
    workflowConnections: [
        { id: 'c1', sourceStepId: 'start', targetStepId: 'delay' },
        { id: 'c2', sourceStepId: 'delay', targetStepId: 'end' }
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

const runWorkflow = async () => {
    try {
        const result = await workflowDesigner.value.ej2Instances.runExecution();
        console.log(result.status);
        result.stepResults.forEach((step) => console.log(step.id, step.response));
    } catch (error) {
        console.error(error);
    }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/workflow-designer/index.css";
</style>
