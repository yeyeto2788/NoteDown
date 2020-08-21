from flask import Blueprint
from notedown_api.config import APP_ROOT_DIR
import os

root_bp = Blueprint("root", __name__, static_folder=os.path.join(APP_ROOT_DIR, "build"), static_url_path="/")


@root_bp.route("/", methods=["GET"])
@root_bp.route("", methods=["GET"])
def home():
    print("getting there")
    print(os.path.join(APP_ROOT_DIR, "build"))
    return root_bp.send_static_file("index.html")
