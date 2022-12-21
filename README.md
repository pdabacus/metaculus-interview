# metaculus-interview
react django drawing app [coding challenge](interview-coding-challenge.pdf)

## Setup
* install docker
* run `make build` to create the docker image
* run `make run` to run the docker container
* open browser to `localhost:8888`


## Local Python Dev
* `pyenv install`
* `eval "$(pyenv init -)"`
* `pip install -r requirements.txt`
* `python api/manage.py runserver`

## Local JS Dev
* `cd srv/app`
* `npm install`
* `npm run build`
