# GlobalConnect Messenger 🌍

A Microservices-based communication platform designed to replace traditional carrier plans.

## 🏗 Architecture
![Architecture Diagram](./docs/architecture_diagram.png)

## 🚀 Tech Stack
- **Frontend:** React Native (Expo)
- **Backend:** Node.js, Express, TypeScript
- **Gateway:** API Gateway (Port 8080)
- **Databases:** PostgreSQL (User/Billing) & MongoDB (Chat History)
- **Infrastructure:** Docker & Docker Compose

## 📂 Services
1. **User Service:** Identity management (SQL).
2. **Chat Service:** Real-time messaging (NoSQL).
3. **Billing Service:** Payment history and subscription management.
4. **Notification Service:** Recurring Cron jobs for daily digests.
5. **API Gateway:** Central routing and logging.

## 🎨 UI Design
> Blueprints generated via Stitch.
See [Docs Folder](./docs/blueprints/) for full UI flows.

## ⚡️ How to Run
1. **Start Infrastructure:**
   ```bash
   npm run start:all
   ```
2. **Start Client:**
   ```bash
   cd client
   npx expo start
   ```
