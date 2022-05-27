import junk from "../build/index.js"
import fs from "fs"

let req = await junk({
    url: "https://i.imgur.com/ygl98gk.jpeg",
    responseType: "stream"
})
let writer = fs.createWriteStream("test.jpeg")
req.pipe(writer)