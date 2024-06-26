const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        hot: false, // HMR seems to cause issues on FF
        headers: {
            // Uncomment to test disabling gamepads
            // "Permissions-Policy": "gamepad=()",
        },
    },
});
