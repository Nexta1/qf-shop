const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use("/api", createProxyMiddleware({
        target: "http://chst.vip",
        pathRewrite: {
            "^/api": ""
        }
    }))
}