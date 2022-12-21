# django react app makefile
DOCKERFILE  := Dockerfile
SRC         := $(shell find srv/ -type f) .python-version requirements.txt
IMAGE       := metaculus:latest
PORT        := 8888

.PHONY: all build run local-run local-buildjs prune clean vars

all: build

TMP_BUILT   := .docker-built
build: $(TMP_BUILT)
$(TMP_BUILT): $(DOCKERFILE) $(SRC)
	docker build -f $(DOCKERFILE) -t $(IMAGE) .
	touch $(TMP_BUILT)

LOCAL_IP    := 0.0.0.0
LOCAL_PORT  := 8888
run: build
	docker run -p $(PORT):$(LOCAL_PORT) -it $(IMAGE) $(LOCAL_IP):$(LOCAL_PORT)

srv/app/node_modules:
	cd srv/app; npm install

local-buildjs: srv/app/node_modules
	cd srv/app; npm run build

local-run:
	@eval "$(pyenv init -)"
	python srv/manage.py runserver


prune:
	rm -rf $(TMP_BUILT)
	docker container rm -f $(shell docker container ls -aq) || true
	docker system prune -f || true
	rm -rf srv/backend/__pycache__
	rm -rf srv/app/node_modules srv/app/build

clean: prune

vars:
	@echo "DOCKERFILE               $(DOCKERFILE)"
	@echo "IMAGE                    $(IMAGE)"
	@echo "PORT                     $(PORT)"
	@echo
	@echo "SRC                      $(SRC)"
	@echo
	@echo "LOCAL_IP                 $(LOCAL_IP)"
	@echo "LOCAL_PORT               $(LOCAL_PORT)"
