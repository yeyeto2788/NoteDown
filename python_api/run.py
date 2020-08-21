#!/usr/bin/env python3

from waitress import serve

from notedown_api import create_app

if __name__ == "__main__":
    app = create_app()
    # Production
    # serve(app, port=8080, threads=10)
    # Development
    app.run(host="0.0.0.0", port=8080, use_reloader=False)

