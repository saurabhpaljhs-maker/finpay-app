# FinPay - Payment Processing API

A production-ready Node.js Express API for payment processing, containerized with Docker, orchestrated with Kubernetes, and deployed via Jenkins CI/CD pipeline.

## 📋 Project Overview

**FinPay** is a fintech payment processing service that demonstrates a complete DevOps workflow:
- **Backend:** Node.js + Express.js
- **Containerization:** Docker (multi-stage build)
- **Orchestration:** Kubernetes (GKE)
- **CI/CD:** Jenkins pipeline
- **Registry:** Docker Hub
- **Cloud Platform:** Google Cloud Platform (GCP)

## 🚀 Features

### API Endpoints

1. **Health Check** - `GET /health`
   ```bash
   curl http://localhost:3000/health
   ```
   Response: Service status and uptime

2. **Ready Check** - `GET /ready`
   ```bash
   curl http://localhost:3000/ready
   ```
   Response: Service readiness status

3. **Initiate Payment** - `POST /api/payments`
   ```bash
   curl -X POST http://localhost:3000/api/payments \
     -H "Content-Type: application/json" \
     -d '{"amount": 9999, "merchant_id": "merchant_123", "order_id": "order_456"}'
   ```
   Response: Payment initiation confirmation

4. **Check Payment Status** - `GET /api/payments/:payment_id`
   ```bash
   curl http://localhost:3000/api/payments/PAY_1234567890
   ```
   Response: Payment status details

5. **Hello Endpoint** - `GET /api/hello`
   ```bash
   curl http://localhost:3000/api/hello
   ```
   Response: Service greeting and version

## 📦 Installation

### Local Development

```bash
# Clone the repository
git clone https://github.com/saurabhpal.jhs-maker/finpay-app.git
cd finpay-app

# Install dependencies
npm install

# Start the server
npm start

# The app will run on http://localhost:3000
```

### Docker

```bash
# Build the Docker image
docker build -t finpay-app:v1 .

# Run the container
docker run -p 3000:3000 finpay-app:v1

# Test
curl http://localhost:3000/health
```

### Kubernetes

```bash
# Deploy to GKE
kubectl apply -f k8s-deployment.yaml

# Check deployment
kubectl get deployments
kubectl get pods
kubectl get svc

# Get the external IP
kubectl get svc finpay-service
```

## 🔧 DevOps Architecture

### Project Structure
```
finpay-app/
├── server.js              # Express.js application
├── package.json           # npm dependencies
├── Dockerfile             # Multi-stage Docker build
├── .dockerignore          # Exclude files from Docker context
├── Jenkinsfile            # CI/CD pipeline
├── README.md              # This file
└── k8s-deployment.yaml    # Kubernetes manifests
```

### CI/CD Pipeline Stages

```
GitHub Push
    ↓
Jenkins Triggered
    ├─ Stage 1: Checkout (clone code from GitHub)
    ├─ Stage 2: Build & Test (npm install, npm test)
    ├─ Stage 3: Docker Build & Push (build image, push to Docker Hub)
    └─ Stage 4: Deploy to GKE (kubectl apply, rollout)
    ↓
App Running on GKE
```

### Infrastructure

**Development Environment:**
- GKE Cluster: 2-3 nodes
- Node Size: e2-small
- Auto-scaling: Yes

**Production Ready:**
- Multi-zone deployment
- Load balancing
- Health checks
- Auto-rollback on failure

## 📊 Monitoring

### Kubernetes Health Checks

**Liveness Probe:** Checks if container is alive
- Endpoint: `/health`
- Interval: 30 seconds
- Timeout: 3 seconds

**Readiness Probe:** Checks if service is ready to accept traffic
- Endpoint: `/ready`
- Interval: 10 seconds
- Timeout: 3 seconds

## 🔐 Security

- **Non-root user:** Docker container runs as `nodejs` user (UID: 1001)
- **Multi-stage build:** Final image doesn't contain build tools
- **Minimal base image:** Uses Alpine Linux (smaller attack surface)
- **Health checks:** Automatic container restart on failure
- **Secrets management:** Docker credentials via Jenkins Credentials Store

## 🛠️ Development

### Tech Stack
- **Runtime:** Node.js 18 (Alpine)
- **Framework:** Express.js 4.18
- **Package Manager:** npm 8+
- **Containerization:** Docker
- **Orchestration:** Kubernetes (GKE)
- **CI/CD:** Jenkins

### Environment Variables
```
PORT=3000                    # Server port (default: 3000)
NODE_ENV=production          # Environment (development/production)
```

## 📝 Logging

All logs are printed to stdout/stderr. View them with:

```bash
# Local
npm start

# Docker
docker logs <container-id>

# Kubernetes
kubectl logs <pod-name>
kubectl logs -f deployment/finpay-test  # Live logs
```

## 🐛 Troubleshooting

### Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Docker image not found
```bash
docker build -t finpay-app:v1 .
docker run -p 3000:3000 finpay-app:v1
```

### Kubernetes pod not running
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💼 Authors

- **Developer:** Development Team
- **DevOps Engineer:** Sauraabh Pal
- **Mentors:** Senior DevOps Engineers

## 📞 Support

For issues, questions, or contributions:
1. Check existing GitHub issues
2. Create a new GitHub issue with detailed description
3. Submit a pull request with improvements

---

**Last Updated:** May 2026
**Version:** 1.0.0
**Status:** Production Ready
