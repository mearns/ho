module.exports = {
    env: {
        node: true
    },

    parser: "babel-eslint",

    extends: ["eslint:recommended"],

    rules: {
        "strict": [2, "global"],
        "no-unexpected-multiline": 2,
        "block-scoped-var": 2,
        "consistent-return": 2,
        "curly": 2,
        "eqeqeq": 2,
        "guard-for-in": 2,
        "no-alert": 2,
        "no-caller": 2,
        "no-labels": 2,
        "no-empty-pattern": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-floating-decimal": 2,
        "no-implicit-coercion": 2,
        "no-implied-eval": 2,
        "no-invalid-this": 2,
        "no-iterator": 2,
        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-magic-numbers": 2,
        "no-multi-spaces": 2,
        "no-native-reassign": 2,
        "no-new-func": 2,
        "no-new-wrappers": 2,
        "no-new": 2,
        "no-octal-escape": 2,
        "no-param-reassign": 2,
        "no-proto": 2,
        "no-return-assign": 2,
        "no-script-url": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-throw-literal": 2,
        "no-useless-call": 2,
        "no-useless-concat": 2,
        "no-void": 2,
        "radix": 2,
        "wrap-iife": 2,
        "yoda": 2,
        "no-catch-shadow": 2,
        "no-label-var": 2,
        "no-shadow-restricted-names": 2,
        "no-shadow": 2,
        "no-undef-init": 2,
        "no-undefined": 2,
        "array-bracket-spacing": 2,
        "block-spacing": 2,
        "object-curly-spacing": [2, "never"],
        "brace-style": [2, "stroustrup", {"allowSingleLine": true}],
        "camelcase": 2,
        "comma-spacing": 2,
        "consistent-this": [2, "self"],
        "eol-last": 2,
        "indent": [2, 4, {"SwitchCase": 1}],
        "key-spacing": 2,
        "linebreak-style": 2,
        "new-parens": 2,
        "no-array-constructor": 2,
        "no-lonely-if": 2,
        "no-multiple-empty-lines": 2,
        "no-negated-condition": 2,
        "no-nested-ternary": 2,
        "no-new-object": 2,
        "no-spaced-func": 2,
        "no-trailing-spaces": 2,
        "no-unneeded-ternary": 2,
        "quotes": [2, "single", "avoid-escape"],
        "semi-spacing": 2,
        "semi": 2,
        "space-before-blocks": 2,
        "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}],
        "keyword-spacing": 2,
        "space-in-parens": 2,
        "space-infix-ops": 2,
        "space-unary-ops": 2,
        "spaced-comment": 2,
        "arrow-parens": 2,
        "arrow-spacing": 2,
        "constructor-super": 2,
        "no-confusing-arrow": 2,
        "no-constant-condition": 2,
        "no-class-assign": 2,
        "no-const-assign": 2,
        "no-dupe-class-members": 2,
        "no-this-before-super": 2,
        "no-var": 2,
        "prefer-arrow-callback": 2,
        "prefer-spread": 2,
        "prefer-template": 2,
        "require-yield": 2,
        "max-len": [2, 120, 4]
    }
};