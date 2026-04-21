export const requireLeadBeforeAction = (action: () => void) => {
    if (localStorage.getItem('woodflex_lead_captured') === 'true') {
        action();
    } else {
        const handler = () => {
            action();
            window.removeEventListener('lead-capture-success', handler);
        };
        window.addEventListener('lead-capture-success', handler);
        window.dispatchEvent(new Event('request-lead'));
    }
};
