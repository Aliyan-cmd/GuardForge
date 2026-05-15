<p align="center">
  <img src="https://img.shields.io/badge/GuardForge-Enterprise%20AI%20Governance-blueviolet?style=for-the-badge&logo=shield&logoColor=white" alt="GuardForge Banner"/>
</p>

<h1 align="center">🛡️ GuardForge</h1>

<p align="center">
  <b>Enterprise AI Governance, Safety & Observability Platform</b><br/>
  <sub>Monitor. Govern. Trust your AI.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/SQLAlchemy-2.0+-red?style=flat-square&logo=python&logoColor=white" alt="SQLAlchemy"/>
  <img src="https://img.shields.io/badge/Vite-8+-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

---

## 📖 Overview

**GuardForge** is a full-stack platform for governing, monitoring, and securing enterprise AI agents. It provides a centralized command center where teams can enforce safety policies, trace agent decisions in real-time, run red-team simulations, and generate compliance reports — all through a stunning, modern dashboard.

Whether you're deploying customer support bots, billing agents, or multi-agent swarms, GuardForge gives you the visibility and control to ensure every AI interaction is safe, transparent, and compliant.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **📊 Live Dashboard** | Real-time metrics for agents, workflows, violations, and risk scores with interactive charts |
| **🔍 Trace Explorer** | WebSocket-powered live execution traces showing step-by-step agent decision-making |
| **📜 AI Policy Generator** | Upload compliance documents (PDF/Text) and auto-generate governance rules |
| **🤖 Agent Architect** | Visual builder for configuring AI agents with custom guardrails and tools |
| **💓 Agent Health Monitor** | Track latency, faithfulness scores, and operational status across all agents |
| **🐝 Swarm Intelligence** | Orchestrate and monitor multi-agent collaborative tasks |
| **🔴 Red Team Simulations** | Automated adversarial testing with prompt injection, jailbreak, and PII leak scenarios |
| **🔒 Safety Scanner** | Comprehensive vulnerability scanning across agent configurations |
| **📋 Audit Logs** | Immutable, searchable trail of every system event with severity classification |
| **👤 User Profiles** | Secure authentication with role-based access control (Admin / Analyst / Viewer) |
| **📄 Compliance Reports** | One-click PDF report generation for regulatory audits |

---

## 🏗️ Architecture

```
GuardForge/
├── frontend/                  # React + Vite SPA
│   ├── src/
│   │   ├── api/               # Axios client with JWT interceptor
│   │   ├── components/        # Reusable UI components (Layout, Card)
│   │   ├── context/           # AuthContext for session management
│   │   ├── hooks/             # Custom hooks (useWebSocket)
│   │   └── pages/             # 17 feature pages
│   └── package.json
│
├── backend/                   # FastAPI application
│   ├── app/
│   │   ├── api/               # Route handlers (REST + WebSocket)
│   │   ├── core/              # Config, security utilities, swarm engine
│   │   ├── dependencies/      # Auth middleware (JWT + RBAC)
│   │   ├── models/            # SQLAlchemy ORM models
│   │   └── database.py        # DB session management
│   └── requirements.txt
│
├── docker-compose.yml         # PostgreSQL + Redis + App stack
├── package.json               # Root orchestration scripts
└── .env                       # Environment configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **npm** ≥ 9

### 1. Clone the Repository

```bash
git clone https://github.com/Aliyan-cmd/GuardForge.git
cd GuardForge
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install --prefix frontend

# Create and activate Python virtual environment
python -m venv backend/venv
source backend/venv/bin/activate    # Linux/macOS
# backend\venv\Scripts\activate     # Windows

# Install backend dependencies
pip install -r backend/requirements.txt
```

### 3. Initialize the Database

```bash
export PYTHONPATH=$PYTHONPATH:$(pwd)/backend
python scratch/seed_admin.py
```

This creates all database tables and seeds a default admin account.

### 4. Run the Application

```bash
npm run dev
```

This starts both servers concurrently:

| Service | URL |
|---|---|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:8000 |
| **API Docs** | http://localhost:8000/docs |

### 5. Login

| Field | Value |
|---|---|
| **Email** | `admin@guardforge.ai` |
| **Password** | `admin123` |

---

## 🐳 Docker Deployment

For a production-like environment with PostgreSQL and Redis:

```bash
# Update .env to use PostgreSQL
# DATABASE_URL=postgresql://guardforge:secret@db:5432/guardforge

npm run docker-up
```

To tear down:

```bash
npm run docker-down
```

---

## 🔐 Authentication & Authorization

GuardForge uses **JWT-based authentication** with role-based access control:

| Role | Permissions |
|---|---|
| **Admin** | Full access — manage users, create policies, run red-team tests, generate reports |
| **Analyst** | View dashboards, run workflows, manage agents, search audit logs |
| **Viewer** | Read-only access to dashboards and analytics |

### Auth Flow

```
Login → JWT Issued → Stored in localStorage → Sent via Authorization: Bearer <token>
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | Component-based UI framework |
| Vite 8 | Lightning-fast build tool and dev server |
| React Router v6 | Client-side routing with v7 future flags |
| Lucide React | Premium icon library |
| Axios | HTTP client with JWT interceptor |
| WebSocket API | Real-time trace streaming |

### Backend

| Technology | Purpose |
|---|---|
| FastAPI | High-performance async Python API framework |
| SQLAlchemy 2.0 | ORM for database operations |
| SQLite / PostgreSQL | Relational database (dev / prod) |
| python-jose | JWT token creation and validation |
| passlib + bcrypt | Secure password hashing |
| PyPDF2 | PDF document parsing for policy extraction |
| reportlab | Dynamic PDF compliance report generation |
| uvicorn | ASGI server |

---

## 📊 Database Models

| Model | Description |
|---|---|
| `User` | Credentials, hashed passwords, roles (`admin`, `analyst`, `viewer`) |
| `Agent` | Registered AI entities with status tracking |
| `Policy` | Versioned governance rules with JSON rule definitions |
| `PolicyVersion` | Historical snapshots of policy changes |
| `Workflow` | Ordered sequences of agents for business processes |
| `ExecutionLog` | Records of workflow runs and outcomes |
| `AuditLog` | Immutable event trail with severity levels |
| `GuardrailViolation` | Captured policy violations with context |
| `ApprovalRequest` | Human-in-the-loop approval workflows |
| `RedTeamTest` | Adversarial test configurations and results |

---

## 📂 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Authenticate and receive JWT |
| `POST` | `/auth/signup` | Register a new user account |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dashboard/overview` | Real-time platform metrics |
| `POST` | `/dashboard/seed-demo` | Initialize demo environment |

### Agents
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/agents/` | List all registered agents |

### Policies
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/policies/` | List all governance policies |
| `POST` | `/policies/` | Create a new policy |
| `POST` | `/policies/generate-from-doc` | AI-powered policy generation from documents |

### Workflows
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/workflows/` | List all workflows |
| `POST` | `/workflows/run/{id}` | Execute a workflow |
| `WS` | `/workflows/ws/run/{run_id}` | Live execution trace stream |

### Audit
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/audit/logs` | Retrieve audit log entries |
| `GET` | `/audit/search?q=` | Natural language log search |

### Reports
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/reports/compliance/{id}` | Generate PDF compliance report |

---

## 🧪 Development Scripts

```bash
# Run full stack (frontend + backend)
npm run dev

# Run frontend only
npm run dev-frontend

# Run backend only
npm run dev-backend

# Install all dependencies
npm run install-all

# Docker
npm run docker-up
npm run docker-down
```

---

## 🗺️ Roadmap

- [ ] Real LLM integration (OpenAI / LangChain) for policy generation
- [ ] Full red-team automation with adversarial agent framework
- [ ] PostgreSQL migration for production persistence
- [ ] LDAP / SSO integration for enterprise auth
- [ ] Webhook notifications for critical violations
- [ ] Kubernetes deployment manifests
- [ ] Multi-tenant organization support
- [ ] Export audit logs to SIEM platforms

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Aliyan**  
GitHub: [@Aliyan-cmd](https://github.com/Aliyan-cmd)

---

<p align="center">
  <b>Built with ❤️ for safer AI</b><br/>
  <sub>If you find this project useful, consider giving it a ⭐</sub>
</p>
