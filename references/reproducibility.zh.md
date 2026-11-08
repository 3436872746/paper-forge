> 中文版 · English: [reproducibility.md](reproducibility.md)

# 可复现性与运维（Reproducibility and operations）

## 产物（Artifacts）

- 分析脚本与数据放在一起；每一个报告出来的数字都由某个脚本产生。
- 维护一个 `verify.py`，它从原始文件重新计算每个头条数字，并打印一张通过/失败表。
- 论文产物只有在经过一次**从零构建（from-zero build）**之后才算"完成"：
  解压到一个空目录，运行文档化的命令序列，得到相同的页数和相同的数字。

## 构建卫生（Build hygiene）

- 改动了影响引用的文字后，**重新运行 bibtex**。一份过期的 `.bbl` 会让 PDF 看起来正常，
  编号却还是旧的。
- 编号按首次使用顺序；如果某张表在 Table I 出现之前就被引用，要么移动这个浮动体，要么改成
  指向该小节。
- 干净构建之前删掉旧的 `.aux/.bbl/.out`；否则缺失的引用可能被掩盖。

## 长任务（Long jobs）

- `setsid nohup cmd > out 2>&1 < /dev/null &`
- `[1]+ Done` 表示父进程退出了，而不是任务跑完了。
- 用两个独立信号验证：一次进程检查加一次记录计数。
- 批次运行期间：只读已经写好的文件。

## 共享服务器（Shared servers）

- 绝不用宽模式的 `pkill -f`。`pgrep -af` -> 精确 PID -> kill -> 复查。
- 优先用启动时写下的 pidfile；退而求其次，用属于本项目的某个端口。
- 不要为了腾出设备而停掉别人的引擎；等待或询问。

## 快照与版本（Snapshots and versions）

- 产物按日期/字母编号版本；绝不用 "final"。
- 一份清单（manifest）列出被排除在仓库之外的大文件。
- 把确切的环境（引擎版本、模型、量化 quantization）写进 `meta.txt`；批次自己观察不到这些。
