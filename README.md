<!-- PROJECT LOGO -->

<img src="./documentation/notedown_logo.svg" height="180"><qoute>Markdown :bookmark_tabs: note taking app using React.js and Python.<qoute>

---

## Table of Contents (Optional)

- [Requirements](#requirements)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [To Do List](#todo-list)
- [License](#license)

---

## Requirements

- Node.js >= 11.9.0
- Python >= 3.7

---

## Installation

### Clone :dancers:

Clone this repo to your local machine using `git clone https://github.com/yeyeto2788/NoteDown`

### Setup :toolbox:

- Install Python requirements.

  ```shell
  cd ./NoteDown/python_api
  pip install -r requirements
  ```

- Install Nodejs requirements

  ```shell
  cd ../react_app
  npm install
  npm run build
  npm run postbuild
  ```

- Serve the application using python
  ```shell
  cd ..
  cd ./python_api
  python run.py
  ```

---

## Features

- Feature1
- Feature2
- Feature3

---

## FAQ :raising_hand_woman::raising_hand_man:

No frequently asked question :neutral_face:

---

## Support :mechanic:

Reach out to me at one of the following places!

- Website at [juanbiondi.com](https://www.juanbiondi.com) (WIP)
- Create an [issue](https://github.com/yeyeto2788/NoteDown/issues/new/choose) on this repository.

---

## ToDo list

- **API**
  - ~~Require tokens on all endpoints except for the login and the register ones~~. :heavy_check_mark:
  - ~~Move logic into controllers separate.~~ :heavy_check_mark:
  - Add logout endpoint.
  - Create a token blacklist.
  - Create test for the logic on the controllers and/or `utils` module.
  - Adopt PostgreSQL as the main database and maybe have SQLite as backup?
- **FE**
  - ~~Create the login component.~~ :heavy_check_mark:
  - ~~Use token for request.~~ :heavy_check_mark:
  - ~~Authenticate users.~~ :heavy_check_mark:
  - Add logout call to the API.
  - Better refresh on NoteList component.
    - Add note.
    - Edit note.
  - Create tests for the components.
  - Add logo on the page.
  - Generate a common error page component that could be reusable for any error that might occur while using the application.
  - Print option for the note.
- **Deployment**
  - Finalize `Dockerfile` or move it to `docker-compose.yml`.
  - Create some tools that might help on deployment and CI/CD pipelines.
- **General**
  - Generate simple logo for the application.
  - Gather some screenshots.
  - Improve this `README`.

## License

See `LICENSE` for more information.
