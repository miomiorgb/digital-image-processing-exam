# 图像处理考试

面向数字图像处理作业复习的公开静态网站。每道可讲解的题目提供完整英文作答范本、中文对照、关键得分内容、理解与回忆练习。保留原作业 1–34 题号，其中 30 题有完整方法范本；只有教材题号而没有题干的 4 题明确标为待补。第 20、34 题区分补充算例与未提供的原题数据。

## 发布路线

本仓库使用 **GitHub → Cloudflare Workers Builds → 自有子域名**，面向所有人公开访问，不包含 ChatGPT 登录、OpenAI Sites、Cloudflare Access 或其他账号门槛。学习进度只保存在当前浏览器，可导入导出，不上传服务器。

Cloudflare Workers 项目名为 `digital-image-processing-exam`。连接本 GitHub 仓库的 `main` 分支后，配置：

- 根目录：仓库根目录。
- 构建命令：`npm run build`。
- 部署命令：`npx wrangler deploy`。
- 资源目录：`public`，已在 `wrangler.jsonc` 声明。
- 不需要环境变量、API 密钥、数据库或 Worker 入口脚本。

自有子域名通过该 Workers 项目的 Domains & Routes 绑定。只有 DNS、HTTPS 与实际页面访问均验证后，才视为完成发布。域名绑定时应确认不会继续指向旧的私有 Sites 服务。

## 文件与修改

`public/` 内的 HTML、CSS 与 JavaScript 即完整的浏览器应用。`public/offline.html` 是无外部依赖的单文件离线版，可下载后直接打开。完整作答范本入口为 `/#answers`，第 17 题为 `/#answer/17`。

GitHub 仓库：[miomiorgb/digital-image-processing-exam](https://github.com/miomiorgb/digital-image-processing-exam)。

修改本仓库中的对应文件后，运行 `npm run build` 并提交到 `main`，Cloudflare 会按 Git 集成重新构建并发布。构建会先根据最新 HTML、CSS 与 JavaScript 重建离线单文件，再执行资源、题库、完整范本及隐私检查。只检查而不重建可运行 `npm run check`。验证时应检查首页、逐题中英文范本、公式复制、手机布局以及离线下载。

本仓库只包含网站需要的公开资源，不包含老师原 DOCX、PDF、照片、个人路径、私有源资料、Git 身份信息或部署凭据。作答范本为按作业要求整理的学习参考，不是教师官方评分答案。

Cloudflare 配置参考：[Static Assets Get Started](https://developers.cloudflare.com/workers/static-assets/get-started/) 和 [Configuration and Bindings](https://developers.cloudflare.com/workers/static-assets/binding/)。
