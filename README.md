# Microservices with Kubernetes and Apache Reverse Proxy

This project demonstrates a microservices architecture deployed on Kubernetes with Apache as a reverse proxy.

## Architecture

- **Blog API**: CRUD operations for blog posts
- **Auth Service**: User authentication
- **Analytics Service**: Track API usage
- **Apache Reverse Proxy**: Routes traffic to appropriate services

## Prerequisites

- Docker
- Kubernetes cluster (minikube for local development)
- kubectl
- GitHub account
- Docker Hub account

## Setup

1. Fork this repository

2. Add GitHub Secrets:

   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

3. Update Kubernetes manifests:

   ```bash
   # Replace <DOCKERHUB_USERNAME> with your Docker Hub username in all k8s-*.yaml files
   ```

4. Deploy to Kubernetes:

   ```bash
   kubectl apply -f k8s-blog-api.yaml
   kubectl apply -f k8s-auth.yaml
   kubectl apply -f k8s-analytics.yaml
   kubectl apply -f k8s-blog-api-hpa.yaml
   kubectl apply -f k8s-auth-hpa.yaml
   kubectl apply -f k8s-analytics-hpa.yaml
   ```

5. Deploy Apache reverse proxy:
   ```bash
   kubectl apply -f k8s-apache.yaml
   ```

## Testing

1. Get the Apache service IP:

   ```bash
   kubectl get service apache-reverse-proxy
   ```

2. Test the endpoints:

   ```bash
   # Blog API
   curl http://<APACHE_IP>/api/blog/posts

   # Auth
   curl -X POST http://<APACHE_IP>/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password"}'

   # Analytics
   curl http://<APACHE_IP>/api/analytics/hits
   ```

## Monitoring

Check the autoscaling status:

```bash
kubectl get hpa
```

## Architecture Diagram

```
                   ┌─────────────┐
                   │   Apache    │
                   │ Reverse Proxy│
                   └──────┬──────┘
                          │
              ┌──────────┴──────────┐
              │                     │
      ┌───────┴────┐         ┌─────┴─────┐
┌─────┴─────┐ │Auth Service│  │Analytics  │
│ Blog API  │ └───────────┘  │ Service   │
└───────────┘               └───────────┘
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:

1. Builds Docker images
2. Pushes to Docker Hub
3. (Optional) Updates Kubernetes deployments

## License

MIT
