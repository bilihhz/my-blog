
# bing每日壁纸api
```url
https://bing.hhz114514.qzz.io/  #返回json信息
```  
::github{repo="bilihhz/bing-img"}  

## 选项  
`f`:输出格式，`js`信息,`img`图片,`txt`仅标题与描述，默认js  
`d`:日期(15天内)，格式:`20260327`，默认当天  
`n`:数量，图片不可用  
`r`:分辨率，支持选项：`1920x1080`,`1920*1080`,`UHD`,`uhd`,`4k`,`4096×2160`,`1080x1920`，默认UHD  
`i`:偏移天数(15天内)，0=今天，默认0  
随意组合，值用=，几个选项间用&连接  

## 示例
```url
https://bing.hhz114514.qzz.io/?f=img&r=4k  #UHD图片
```  
```url
https://bing.hhz114514.qzz.io/?f=js&n=3  #当天与前两天的信息
```  
```url
https://bing.hhz114514.qzz.io/?f=txt&d=20260327   #2026/3/27的标题与描述
```  
