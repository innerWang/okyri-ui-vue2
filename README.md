# 基于 vue2 做的简易 UI 组件

## 使用提示

1. 使用本框架需要在 css 中开启 border-box

## 断言测试

1. 使用 chai 做 BDD/TDD 断言测试
2. 使用 chai-spies 来 mock 函数

## 自动化测试

- Karma（[ˈkɑrmə] 卡玛）是一个测试运行器，它可以呼起浏览器，加载测试脚本，然后运行测试用例
- Mocha（[ˈmoʊkə] 摩卡）是一个单元测试框架/库，它可以用来写测试用例
- Sinon（西农）是一个 spy / stub / mock 库，用以辅助测试

步骤如下：

1.  安装工具：`$ yarn add karma karma-chrome-launcher karma-mocha karma-sinon-chai mocha sinon sinon-chai karma-chai karma-chai-spies -D`
2.  创建 karma.conf.js 并添加配置
3.  创建 test/button.test.js 文件，并添加测试用例
4.  在 package.json/scripts 中添加两行测试脚本 dev-test 和 test
5.  使用 `yarn dev-test` 实时查看测试结果，或者使用 `yarn test` 一次性运行，初次使用`dev-test`实时测试时会测试两次，是因为 karma 启动时 parcel 打包还没结束，当 parcel 结束时 karma 检测到文件变动则会再次测试。

测试时如果出现 `component of undefined` 等错误可以使用 `rm -rf .cache dist` 清除缓存，再重新运行测试脚本，或者可以在脚本中使用 parcel 打包时添加 `--no-cache` 选项。script 脚本中添加 `--no-minify`参数是因为 parcel 打包压缩会自动删除所有的 `<slot></slot>`。

## 持续集成

使用 Travis.CI，目前仅支持 github 代码的托管服务。

项目根目录下添加 `.travis.yml` 文件，没有该文件的仓库会被自动忽略，绑定项目后提交代码就会自动构建和测试。
