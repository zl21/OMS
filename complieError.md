
用npm（不行）：依赖下的依赖没拉下来，如（OMS/node_modules/algoliasearch/node_modules/debug/src/browser.js'）

npm rebuild debug

npm rebuild isarray

Module build failed: Error: ENOENT: no such file or directory, open '/Users/zhoulan/project/OMS/node_modules/algoliasearch/node_modules/debug/src/browser.js'

用yarn（OK）