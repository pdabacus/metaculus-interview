# arch dependencies
from archlinux:latest
user root
run pacman -Sy --noconfirm gcc autoconf binutils make pyenv sqlite nodejs npm; \
    pacman -Scc --noconfirm
run useradd -m -d /app -s /bin/bash -U stack

# python dependencies
workdir /app
run chown stack:stack -R /app
copy .python-version /app/
user stack
run pyenv install
ENV PYENV_ROOT /app/.pyenv
ENV PATH $PYENV_ROOT/shims:$PYENV_ROOT/bin:$PATH
run pyenv rehash
copy requirements.txt /app/
run eval "$(pyenv init -)"; pip install -r requirements.txt

# copy src
copy srv/ /app/srv/
user root
run chown stack:stack -R /app
user stack

# build react app
run cd /app/srv/app; \
    npm install; \
    npm run build

# run app
entrypoint ["python", "srv/manage.py", "runserver"]
cmd ["python", "srv/manage.py", "runserver"]

