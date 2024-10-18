const createActionName = 'createAction';

const rule = {
    create: (context) => {
        const usedClocks = new Set();

        return {
            CallExpression: (node) => {
                try {
                    if (node.callee.name !== createActionName) {
                        return;
                    };

                    const actionArguments = node.arguments;

                    if (actionArguments.length !== 2) {
                        return;
                    }

                    const clockArgument = actionArguments[0];

                    const clockCode = context.getSourceCode().getText(clockArgument);

                    if (usedClocks.has(clockCode)) {
                        return context.report({
                            node,
                            message: `found 2 or more actions with same clock: "${clockCode}". Create common action with this clock`
                        })
                    }

                    usedClocks.add(clockCode);
                } catch (e) {
                    return;
                }
            }
        }
    }
};

export default rule;