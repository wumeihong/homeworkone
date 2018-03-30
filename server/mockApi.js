
const Mock = require('mockjs')
const fs = require('fs')

let data = Mock.mock({
	"success":1,
	"info":"请求成功",
	"code":1001,
	"list|8":[				
		{
			'id|+1': 1,					
			"category_list|6":[
				{
					tit:()=>Mock.mock('@ctitle(2)'),
					images:()=>Mock.mock('@image("80x100","red","","png","category")'),
				}
			]
		}
	]
})
fs.writeFileSync('./list.json',JSON.stringify(data))