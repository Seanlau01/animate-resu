
var result =`/*
*面试官你好，我叫xxx
*我很喜欢贵公司
*特来应聘
*我先用代码来做一下自我介绍
*/
*{
  transition:1s;
}
html{ 
       background:rgb(222,222,222);
       font-size:16px;
    }
#code{
   border:1px solid red;
   padding:16px;
}
/*我需要一点代码高亮*/
.token.selector{
    color:#690;
}
.token.property{
    color:#905;
}
.token.function{
    color:#DD4A68;
}
/*我需要一张白纸*/
#code{
  position:fixed;
  left:0;
  width:50%;
  height:100%;
}
#paper{
  position:fixed;
  right:0;
  width:50%;
  height:100%;
  background:black;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:12px;
}
#paper> .content{
  height:100%;
  width:100%;
  background:white;
}

/*请看右边白纸*/
`
var result2=`
/*接下来把Markdown变成HTML*/
/*引入js*/
/*接下来给HTML加样式*/
`
var md=`
# 自我介绍

- 我叫xxx
- xxxx年出生
- xxxxx年毕业
- 自学前端半年
- 希望应聘前端岗位

# 技能介绍

- 熟悉JS CSS

# 项目介绍

- 1.xx轮播
- 2.xx简历
- 3.xx画板

# 联系方式

- qq xxxxxx
- email xxxxx
- phone  xxxxxx
`
var result3=`
/*这就是我的会动的简历，谢谢观看*/

`
//执行

function writeCode(prefix,code,fn){
  let domCode=document.querySelector('#code')
  domCode.innerHTML=prefix||''
  let n=0
  let id=setInterval(()=>{
    n=n+1
    domCode.innerHTML=Prism.highlight(prefix+code.substring(0,n), Prism.languages.css, 'css')
    styleTag.innerHTML=prefix+code.substring(0,n)
    domCode.scrollTop=domCode.scrollHeight
    if(n>=code.length){
      window.clearInterval(id)
      fn&&fn.call()
    }
  },70)
}
function createPaper(fn){
  var paper=document.createElement('div')
   paper.id='paper'
   var content=document.createElement('pre')
   content.className='content'
   paper.appendChild(content)
   document.body.appendChild(paper)
   fn&&fn.call()
}
function writeMarkdown(markdown,fn){
  let domPaper=document.querySelector('#paper>.content')
  let n=0
  let id=setInterval(()=>{
   n=n+1
   domPaper.innerHTML=markdown.substring(0,n)
   domPaper.scrollTop=domPaper.scrollHeight
   if(n>=markdown.length){
     window.clearInterval(id)
   fn&&fn.call()
   }
 },30)
}

function markdownToHtml(fn){
  var div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn&&fn.call()
}

writeCode('',result,()=>{
  createPaper(()=>{
      writeMarkdown(md,()=>{
        writeCode(result,result2,()=>{
        markdownToHtml(()=>{
          writeCode(result+result2,result3,()=>{
            console.log('完成')
          })
        })
      })
    })
  })
})




