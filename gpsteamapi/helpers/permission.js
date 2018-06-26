const createFunction = (func) => {
    const baseFunction = func;
    baseFunction.createFunction = (childFunction) => {
        const newFunction = (context) => {
            func(context);
            return childFunction(context);
        };
        return createFunction(newFunction);
    };
    return baseFunction;
};


export const requiresAuth = createFunction((context) => {
    if (!context.user || !context.user.id) {
        throw new Error('Not authenticated');
    }
});

export const requiresStaff = requiresAuth.createFunction((context) => {
    if(context.user.access_level_id <= 2) {
        throw new Error('Action not permitted for non-GPS staff');
    }
})

export const requiresAdmin = requiresAuth.createFunction((context) => {
    if (context.user.access_level_id !== 1) {
        throw new Error('Requires admin access');
    }
})
