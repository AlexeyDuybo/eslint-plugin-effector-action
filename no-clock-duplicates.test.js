import { RuleTester } from 'eslint';
import rule from './no-clock-duplicates.js';
import tsParser from '@typescript-eslint/parser';

const ruleTester = new RuleTester({
    languageOptions: {
        parser: tsParser
    }
});

ruleTester.run('no-clock-duplicate', rule, {
    valid: [
        { 
            code: `
                createAction(foo, {});
                createAction(bar, {});
                createAction(foo.bar, {});
                const foo = createAction({});
                const bar = createAction({});
                createAction({});
            `
        }
    ],

    invalid: [
        {
            code: `
                createAction(foo, {});
                createAction(router.opened, {});
                createAction(foo, {});
                createAction(router.opened, {});
                
            `,
            errors: [
                { message: 'found 2 or more actions with same clock: "foo". Create common action with this clock' },
                { message: 'found 2 or more actions with same clock: "router.opened". Create common action with this clock' }
            ]
        }
    ]
})