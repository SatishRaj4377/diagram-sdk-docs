const connections = [
    { id: 'toApproved', sourceStepId: 'approval', sourcePort: 'approved', targetStepId: 'createOrder' },
    { id: 'toDeclined', sourceStepId: 'approval', sourcePort: 'declined', targetStepId: 'notifyUser' }
];
