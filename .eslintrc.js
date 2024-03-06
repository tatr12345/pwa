module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2020,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'arrow-parens': ['error', 'always'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'semi': ['error', 'never', {
      'beforeStatementContinuationChars': 'always'
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-undef': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-extra-boolean-cast': 'off',
    '@next/next/no-img-element': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    'no-useless-escape': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    'no-var': 1,
    'no-new-object': 1,
    'object-shorthand': 1,
    'no-array-constructor': 1,
    'prefer-destructuring': 1,
    'prefer-template': 1,
    'template-curly-spacing': ['error', 'never'],
    'no-eval': 1,
    'func-style': ['error', 'declaration', {
      'allowArrowFunctions': true
    }],
    'wrap-iife': ['error', 'inside'],
    'no-loop-func': 1,
    'prefer-rest-params': 1,
    'no-new-func': 1,
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-before-blocks': ['error', {
      'functions': 'always',
      'keywords': 'always',
      'classes': 'always'
    }],
    'prefer-arrow-callback': ['error', {
      'allowUnboundThis': false
    }],
    'arrow-spacing': 1,
    'no-duplicate-imports': 1,
    'object-curly-newline': ['error', {
      'ImportDeclaration': {
        'multiline': true,
        'minProperties': 4
      },
      'ExportDeclaration': {
        'multiline': true,
        'minProperties': 4
      }
    }],
    'eqeqeq': ['error', 'always'],
    'nonblock-statement-body-position': ['error', 'any'],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'space-infix-ops': ['error', {
      'int32Hint': false
    }],
    'eol-last': ['error', 'always'],
    'newline-per-chained-call': ['error', {
      'ignoreChainWithDepth': 2
    }],
    'no-whitespace-before-property': 1,
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 0
    }],
    'space-in-parens': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'block-spacing': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'comma-style': ['error', 'last'],
    '@typescript-eslint/member-delimiter-style': ['warn', {
      'multiline': {
        'delimiter': 'comma',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      },
      'multilineDetection': 'brackets'
    }],
    'key-spacing': ['error', {
      'beforeColon': false
    }],
    'operator-linebreak': ['error', 'before', {
      'overrides': {
        '??': 'ignore',
        '&&': 'ignore',
        '=': 'ignore',
        '||': 'ignore'
      }
    }],
    'import/no-named-as-default': 'off',
    'import/newline-after-import': 1,
    'import/order': ['error', {
      'pathGroups': [{
        'pattern': '@/utils',
        'group': 'internal',
        'position': 'before'
      },
      {
        'pattern': '@/api/**',
        'group': 'internal',
        'position': 'before'
      },
      {
        'pattern': '@/store/**',
        'group': 'internal',
        'position': 'before'
      },
      {
        'pattern': '@/common/**',
        'group': 'internal',
        'position': 'after'
      },
      {
        'pattern': '@/layout/**',
        'group': 'internal',
        'position': 'after'
      },
      {
        'pattern': '@/ui/**',
        'group': 'internal',
        'position': 'after'
      },
      {
        'pattern': '@/public/**',
        'group': 'internal',
        'position': 'after'
      },
      {
        'pattern': '@/ts/**',
        'group': 'type',
        'position': 'before'
      },
      {
        'pattern': '**/*.css',
        'group': 'sibling',
        'position': 'after'
      }
      ],
      'pathGroupsExcludedImportTypes': [],
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'object',
        'type',
        'index'
      ],
      'newlines-between': 'never',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],
    'react-hooks/exhaustive-deps': 'off',
    'react/no-find-dom-node': 'off',
    'react/prop-types': 'off'
  },
  'settings': {
    'react': {
      'version': 'detect'
    },
    'import/resolver': {
      'typescript': {},
      'node': {
        'paths': ['.']
      }
    }
  }
}
