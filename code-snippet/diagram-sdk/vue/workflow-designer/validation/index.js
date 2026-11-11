import Vue from 'vue';
import { WorkflowDesignerPlugin } from '@syncfusion/ej2-vue-workflow-designer';

Vue.use(WorkflowDesignerPlugin);

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

new Vue({
    el: '#app',
    template: `
        <div id="app">
            <ejs-workflowdesigner id="workflow" ref="workflowDesigner" height="600px"></ejs-workflowdesigner>
            <button type="button" :disabled="!workflowReady" @click="validateWorkflow">Validate workflow</button>
        </div>
    `,
    data() {
        return {
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
});
