module.exports = {
    root: true,
    // extends: "@react-native-community",
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['.*rc.js', '**/*.config.js'],
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    globals: {
        NodeJS: true,
    },
    rules: {
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'no-unused-vars': 'off',
        'no-prototype-builtins': 'off',
        'no-redeclare': 'off',
        indent: 'off',
    },
    parserOptions: {
        project: ['./tsconfig.json'],
    },
};
