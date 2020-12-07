/*
 * @Descripttion:
 * @version: X3版本
 * @Author:
 * @Date: 2020-12-07 16:05:23
 * @LastEditors:
 * @LastEditTime: 2020-12-07 16:49:35
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
