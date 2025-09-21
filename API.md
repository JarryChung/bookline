| API 描述                 | 接口链接                                                                                               | 可调参数说明                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 获取书籍划线             | https://weread.qq.com/web/book/bookmarklist?bookId=3300035678                                          | bookId：书籍 ID                                                                                                            |
| 获取书籍信息             | https://weread.qq.com/api/book/info?bookId=41949197                                                    | bookId：书籍 ID                                                                                                            |
| 获取书籍阅读进度         | https://weread.qq.com/web/book/getProgress?bookId=3300085380                                           | bookId：书籍 ID                                                                                                            |
| 获取用户对某本书籍的评论 | https://weread.qq.com/web/review/list?bookId=44112345&listType=4&maxIdx=0&count=3&listMode=2&synckey=0 | bookId：书籍 ID<br> listType：评论类型<br> maxIdx：分页索引<br> count：返回条数<br> listMode：展示模式<br> synckey：同步键 |
| 获取某本书的置顶评论     | https://weread.qq.com/web/review/list/best?bookId=44112345&synckey=0&maxIdx=0&count=3                  | bookId：书籍 ID<br> synckey：同步键<br> maxIdx：分页索引<br> count：返回条数                                               |
| 获取用户所有划线书籍     | https://weread.qq.com/api/user/notebook                                                                | 无需参数（基于登录用户）                                                                                                   |
| 获取用户书架上所有书籍   | https://weread.qq.com/web/shelf/sync                                                                   | 无需参数（基于登录用户）                                                                                                   |

// see https://github.com/zhaohongxuan/obsidian-weread-plugin/issues/355
// see https://github.com/zhaohongxuan/obsidian-weread-plugin/pull/368/files
