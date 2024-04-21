# tmux
- tmux new -> create new session
- tmux a -t {SESSION_ID} -> attach to session
- tmux ls -> list sessions
- :detach -> detach from session

# scp
- scp {file} {user}@{host}:{path} -> copy file to remote host
- scp -i {key.pem} {file} {user}@{host}:{path} -> copy file to remote host **with key**
- scp -r {dir} {user}@{host}:{path} -> copy directory to remote host **recrusively**

# ssh
- ssh -i {key.pem} {user}@{host} -> connect to remote host **with key**
- in this case, user is **ubuntu**

# docker
- docker ps -> list running containers
- sudo docker compose up -d -> start docker compose (detached)
- sudo docker compose down -> stop docker compose
- sudo docker exec -it {} sh -> enter container shell (interactive)

# mongo compass
- ssh -i {key.pem} -L 27017:localhost:27017 {user}@{host} -> connect to remote host **with key** and forward port
