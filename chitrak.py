from flask import Flask, send_from_directory
import webview

server = Flask(
    __name__, static_folder="./www/static", template_folder="./www/templates"
)


@server.route("/")
def hello_world():
    return send_from_directory(server.static_folder, "index.html")


if __name__ == "__main__":
    webview.create_window("Chitrak: Drawing Simplified", server)
    webview.start()
