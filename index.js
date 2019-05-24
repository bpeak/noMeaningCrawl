const axios = require("axios")
const cheerio = require("cheerio")
const sender = require("./sender")
const fs = require("fs")

setInterval(() => {
    axios.get("https://blog.naver.com/rlguswlgud")
    .then(html => {
        const $ = cheerio.load(html.data)
        const iframeSrc = $("#mainFrame").attr('src')
        axios.get(`https://blog.naver.com/rlguswlgud${iframeSrc}`)
        .then((html) => {
            const $ = cheerio.load(html.data)
            const prevTitle = fs.readFileSync("kihyunTitle.txt").toString()
            const currentTitle = $("#post_1").find(".se-title-text").text().trim()
            if(currentTitle !== prevTitle){
                fs.writeFileSync("kihyunTitle.txt", currentTitle)
                sender(
    `[ 속보 기현이 새글씀 ]
    ${currentTitle}
    https://blog.naver.com/rlguswlgud
    `                
                )
            } else {
                
            }
        })
    })
    
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
                
            }
        })
    })    
}, 1000 * 60)