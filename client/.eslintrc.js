module.exports = {
    root: true,
    // extends: "@react-native-community",
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint'],
    ignorePatterns: ['.*rc.js', '**/*.config.js'],
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
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
        'react/react-in-jsx-scope': 'off',
    },
    parserOptions: {
        project: ['./tsconfig.json'],
    },
};
