const express = require("express")
module.exports = () => {
    const args = process.argv
    const filename = "../" + args[2] || "../router.json"
    const port = Number(args[3]) || 3000
    const router = require(filename)
    const router_list = []
    for (let i in router) {
        router_list.push(i)
    }
    const app = express()
    const allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, access_token')
        if ('OPTIONS' === req.method) {
            res.send(200)
        } else {
            next()
        }
    }
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(allowCrossDomain)
    app.get("*", (req, res) => {
        console.log(req.path)
        let router_json = router[req.path] || router[req.path+"/"]
        router_json = router_json["get"]
        console.log(req.query)
        if (router_json) {
            res.status(200).json(router_json["data"])
        } else {
            res.status(404).json({})
        }
    })
    app.post("*", (req, res) => {
        console.log(req.path)
        let router_json = router[req.path] || router[req.path+"/"]
        router_json = router_json["post"]
        console.log(req.body)
        if (router_json) {
            res.status(200).json(router_json["data"])
        } else {
            res.status(404).json({})
        }
    })
    app.listen(port, () => {
        console.log("http://localhost:" + port)
    })
}