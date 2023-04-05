# Organize Yourself

OY is a project that has been made during my free-time when I was a third and fourth year at EPITECH.</br>
I had nothing else to do, so I thought of a project that could be useful to me and probably a lot of people.

So from that thought was born OY, a to-do list that would help you to remind each things you want to remember.
For that all you have to do is to create an account on it and then create a to-do.</br>
You can setup it as you would like to (with the end-date you want) and once the date is coming near the end-date it'll send you an email through the one you specified at the account creation.

## Nomenclature

### Branch

Here are the main branch type that will be use for this project.</br>
If I feel like I will need a few others, then I will add them here later with their purposes.

- `master` : main branch, the code will (and need!) to be stable.
- `dev` : as said in the name, it's a dev branch, code may be unstable but shouldn't contains major issues.
- `feat/` : branch for a new feature
- `fix/` : branch for a bug fix
- `docs/` : branch for documentation

### Commit

Here is how I'll do every commit from now on (03/04/2023).</br>
I'll base my commit nomenclature on commitlint which is a very good nomenclature (for me anyway)

`type(scope?): message`

The type may be :

- `feat` / `feature`
- `fix`
- `refactor`
- `ci`
- `docs`
- `perf`
- `revert`
- `style`
- `test`

The scope is like the subject about what has changed in this commit, for example `auth` if what I changed was about the auth. It can also be something more specific such as `login-front` for the login/register on the front-end.</br>
The scope is optional but is still appreciated, but don't put it if you're modifying something that has no scope.

## How to setup

When I did this project I used Docker to build and run it, so it's up to you to create a docker-compose.yml and to clone the server-side of this project as well. If you do create a docker-compose, it's up to you to change parts of the code that needs to be change.

Whatever you may decide to do, you will at least need to create a .env file at the root of the front which will contains :
`REACT_APP_API_URL=your base api url`

If you just want to run the front (but nothing will be accessible) you can just do those commands :

`npm i` => It will download every necessary packages for the project.</br>
`npm start` => It will launch the project on `localhost:3000`.

## Authors

- Benjamin Henry - [Github](https://github.com/EternalRat)