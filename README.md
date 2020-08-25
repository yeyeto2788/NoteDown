# NoteDown

Markdown note taking app using React.js for the frontend and Python as the backend.

## Requirements

- node >= `v11.9.0`
- python >= `3.4`

## Installation

```console
git clone https://github.com/yeyeto2788/NoteDown
cd ./NoteDown
cd ./python_api
pip install -r requirements
cd ../react_app
npm install
npm run build
npm run postbuild
cd ..
cd ./python_api
python run.py
```

## TODO

- **API**
  - ~~Require tokens on all endpoints except for the login and the register ones~~.
  - ~~Move logic into controllers separate.~~
  - Add logout endpoint.
  - Create a token blacklist.
  - Create test for the logic on the controllers and/or `utils` module.
  - Adopt PostgreSQL as the main database and maybe have SQLite as backup?
- **FE**
  - ~~Create the login component.~~
  - ~~Use token for request.~~
  - ~~Authenticate users.~~
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
