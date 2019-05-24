const axios = require("axios")
const cheerio = require("cheerio")
const sender = require("./sender")
const fs = require("fs")

axios.get("https://blog.naver.com/woony56")
.then(html => {
    const $ = cheerio.load(html.data)
    const iframeSrc = $("#mainFrame").attr('src')
    axios.get(`https://blog.naver.com/woony56${iframeSrc}`)
    .then((html) => {
        const $ = cheerio.load(html.data)
        const currentTitle = $("#post_1").find(".se-fs-fs32").text()
        const prevTitle = fs.readFileSync("title.txt").toString()
        if(prevTitle !== currentTitle){
            sender(`
[ 속보 벨민이 새글씀 ]
${currentTitle}
https://blog.naver.com/woony56
            `)
            fs.writeFileSync("title.txt", currentTitle)
        } else {
            console.log("같아서 안보냄")
        }
    })
})