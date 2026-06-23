# DevOps Project — Phase 1 : Containerisation

Stack : Node.js (Express) + React (Vite) + Docker + docker-compose

## Prérequis

- Docker Desktop installé et lancé
- Git

## Lancer le projet

```bash
# Cloner le repo
git clone <ton-repo>
cd devops-project

# Build et lancer tous les conteneurs
docker-compose up --build

# En arrière-plan
docker-compose up --build -d
```

Accès :
- **Frontend** → http://localhost:3000
- **Backend API** → http://localhost:5000/api/tasks
- **Health check** → http://localhost:5000/health

## Commandes utiles

```bash
# Voir les conteneurs en cours
docker ps

# Voir les logs du backend
docker logs devops-backend -f

# Voir les logs du frontend
docker logs devops-frontend -f

# Arrêter tout
docker-compose down

# Reconstruire une image spécifique
docker-compose build backend
```

## Structure

```
devops-project/
├── backend/
│   ├── src/index.js       # API Express (tasks CRUD)
│   ├── package.json
│   └── Dockerfile         # Multi-stage build, user non-root
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Interface React
│   │   └── main.jsx
│   ├── nginx.conf         # Nginx pour servir le build
│   ├── vite.config.js
│   └── Dockerfile         # Multi-stage : build Vite → Nginx
├── docker-compose.yml     # Orchestration locale
└── .gitignore
```

## Points clés pour l'entretien

- **Multi-stage builds** : sépare build et runtime → images plus légères
- **User non-root** : bonne pratique de sécurité Docker
- **HEALTHCHECK** : Kubernetes pourra l'utiliser (readiness/liveness probes)
- **Networks** : les services communiquent via un réseau Docker isolé
- **depends_on + condition: service_healthy** : le frontend attend que le backend soit prêt

## Phase suivante

➡️ Phase 2 : Pipeline CI/CD avec GitLab CI (`.gitlab-ci.yml`)
