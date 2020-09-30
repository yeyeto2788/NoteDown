<!-- PROJECT LOGO -->

<img src="./documentation/notedown_logo.svg" height="180"><qoute>Markdown :bookmark_tabs: note taking app using React.js and Python.<qoute>

<!-- Project images -->

---

<!-- Table of content -->

## Table of Contents

- [Requirements](#requirements)
- [Local Installation](#local-installation)
- [Docker Installation](#docker-installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [To Do List](#todo-list)
- [License](#license)

---

<!-- Requirements -->

## Requirements

- Node.js >= 11.9.0
- Python >= 3.7

---

<!-- Local Installation -->

## Local installation

### Clone :dancers:

Clone this repo to your local machine using `git clone https://github.com/yeyeto2788/NoteDown`

### Setup :toolbox:

- Install Python requirements. :computer:

  ```shell
  cd ./NoteDown/python_api
  pip install -r requirements
  ```

- Install Nodejs requirements :electron:

  ```shell
  cd ../react_app
  npm install
  npm run build
  npm run postbuild
  ```

- Serve the application using python :snake:
  ```shell
  cd ..
  cd ./python_api
  python run.py
  ```

---

## Docker installation

- Build the image
  ```shell
  docker build --tag notedown-image .
  ```
- Run the container

  ```shell
  docker run -p 8080:8080 -d --name notedown-app notedown-image
  ```

- Inspect the container
  ```shell
  docker exec -it notedown-app /bin/bash
  ```

---

<!-- Features -->

## Features :sparkles:

- Markdown syntax for the notes. :bookmark_tabs:
- JWT for authentication :lock:
- Print your notes. :printer: (Not yet implemented :worried:)

---

<!-- Frequently asked questions -->

## FAQ :raising_hand_woman::raising_hand_man:

No frequently asked question yet. :neutral_face:

---

<!-- Support -->

## Support :mechanic:

Reach out to me at one of the following places!

- Website at [juanbiondi.com](https://www.juanbiondi.com) (Work In Progess)
- Create an [issue](https://github.com/yeyeto2788/NoteDown/issues/new/choose) on this repository. :pirate_flag:
- Send me an [email](mailto:jebp.freelance@gmail.com) :email:

---

<!-- Things to do -->

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
  - Login/Register screen.
  - Authenticate users.
  - Add logout call to the API.
  - Better refresh on NoteList component.
    - Add note.
    - Edit note.
  - Create tests for the components.
  - Add logo/icon on the page.
  - Generate a common error page component that could be reusable for any error that might occur while using the application.
  - Print option for the note.
- **Deployment**
  - ~~Finalize `Dockerfile`~~ :heavy_check_mark: or move it to `docker-compose.yml`.
  - Create some tools that might help on deployment and CI/CD pipelines.
- **General**
  - ~~Generate simple logo for the application.~~ :heavy_check_mark:
  - Gather some screenshots.
  - ~~Improve this `README`.~~ :heavy_check_mark:

---

<!-- License -->

## License

See [**`LICENSE`**](./LICENSE) for more information.
