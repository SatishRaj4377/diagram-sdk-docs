const notifyStep = {
    id: 'notify', stepType: 'Notify', name: 'Notify customer',
    props: {
        channel: 'Email',
        to: '{{$.nodes["getCustomer"].response.body.email}}',
        subject: 'Order {{$.nodes["setOrder"].response.orderId}}',
        message: 'Total: {{$.previousStep.response.body.total}}'
    }
};
