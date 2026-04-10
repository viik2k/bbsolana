# BBSolana - BYO-API Crypto Dashboard

![BBSolana Logo](https://img.shields.io/badge/BBSolana-Crypto%20Dashboard-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Powered-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

A self-hosted, open-source crypto trading dashboard with BYO API keys and AI-powered forecasting using Kronos models.

## 🎯 Features

- **Self-Hosted**: Your data stays on your machine
- **BYO API Keys**: Connect your own exchange accounts (CoinSpot, Binance, Kraken)
- **AI Forecasting**: Kronos integration for price predictions
- **Paper Trading**: Virtual portfolio with real market data
- **Modern UI**: Google Stitch design system + dark theme
- **Real-time Updates**: WebSocket support for live data
- **Multi-Exchange**: Aggregate balances across exchanges
- **Secure**: Encrypted API key storage, local authentication

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **PostgreSQL** - Robust relational database
- **SQLAlchemy** - Python SQL toolkit and ORM
- **Celery + Redis** - Background task processing
- **Alembic** - Database migrations

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Google Stitch** - Component library
- **Recharts** - Charting library
- **Zustand** - State management

### AI/ML
- **Kronos Models** - Time series forecasting
- **Transformers** - Hugging Face library
- **PyTorch** - Deep learning framework

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy
- **PostgreSQL** - Database
- **Redis** - Caching & message broker

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git
- Python 3.11+ (optional, for local development)
- Node.js 20+ (optional, for local development)

### 1. Clone Repository
```bash
git clone https://github.com/viik2k/bbsolana.git
cd bbsolana
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit with your values
nano .env
```

**Minimum `.env` configuration:**
```bash
POSTGRES_PASSWORD=secure_password_123
SECRET_KEY=your-secret-key-change-me
ENCRYPTION_KEY=your-32-byte-base64-key-here=
DEBUG=true
```

### 3. Start Services
```bash
# Start all services
docker-compose up -d

# Watch logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 4. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/api/docs
- **Database:** localhost:5432 (user: bbsolana)

### 5. Create First User
1. Open http://localhost:3000/register
2. Create an account
3. Login at http://localhost:3000/login
4. Add your first exchange API key

## 📁 Project Structure

```
bbsolana/
├── backend/                 # FastAPI backend
│   ├── app/                # Application code
│   │   ├── api/v1/         # API endpoints
│   │   ├── core/           # Config, security, dependencies
│   │   ├── db/             # Database models
│   │   ├── models/         # Pydantic models
│   │   ├── services/       # Business logic
│   │   ├── workers/        # Celery tasks
│   │   └── schemas/        # Data schemas
│   ├── alembic/            # Database migrations
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── app/                # Next.js app router
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Dashboard pages
│   │   ├── api/            # API routes
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   ├── lib/                # Utilities, API client
│   ├── styles/             # Tailwind styles
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
├── ai/                     # Kronos AI integration
│   ├── kronos/             # Model integration
│   ├── forecasting/        # Prediction pipelines
│   └── data/               # Data preprocessing
├── docker/                 # Docker configuration
│   ├── nginx/              # Nginx config
│   └── postgres/           # DB init scripts
├── scripts/                # Utility scripts
├── docs/                   # Project documentation
├── .env.example            # Environment template
├── docker-compose.yml      # Docker Compose config
└── README.md               # This file
```

## 🔧 Development

### Development Workflow

#### Option A: Full Docker Development
```bash
# Start development environment
docker-compose up -d

# View backend logs
docker-compose logs -f backend

# View frontend logs  
docker-compose logs -f frontend

# Run backend tests
docker-compose exec backend pytest

# Run frontend tests
docker-compose exec frontend npm test

# Access database
docker-compose exec postgres psql -U bbsolana -d bbsolana

# Restart specific service
docker-compose restart backend
```

#### Option B: Hybrid Development (Recommended)
```bash
# Start supporting services only
docker-compose up -d postgres redis

# Backend development (in separate terminal)
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run backend locally
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend development (in another terminal)
cd frontend
npm install
npm run dev
```

### Database Management
```bash
# Create new migration
docker-compose exec backend alembic revision --autogenerate -m "description"

# Apply migrations
docker-compose exec backend alembic upgrade head

# Rollback migration
docker-compose exec backend alembic downgrade -1

# Reset database (development only)
docker-compose down -v
docker-compose up -d
```

### Testing
```bash
# Backend tests
docker-compose exec backend pytest
docker-compose exec backend pytest tests/test_auth.py -v
docker-compose exec backend pytest --cov=app tests/

# Frontend tests
docker-compose exec frontend npm test
docker-compose exec frontend npm run test:watch
```

## 🎨 UI Components

### Design System
- **Colors:** Dark theme primary (crypto traders prefer dark)
- **Typography:** Inter font family
- **Components:** Google Stitch component library
- **Layout:** Responsive grid system

### Key Screens
1. **Login/Register** - Clean auth flow
2. **Dashboard** - Portfolio overview, quick stats
3. **Markets** - Price charts, AI signals
4. **Trading** - Paper trading interface
5. **Settings** - API key management

## 🔐 Security

### API Key Management
- Encryption at rest using Fernet (symmetric encryption)
- Keys never leave your server
- Per-user key isolation
- Audit logging for key usage

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Session management
- Rate limiting

### Data Protection
- HTTPS enforcement (in production)
- CORS configuration
- Input validation
- SQL injection prevention

## 📊 Database Schema

### Core Tables
- **users** - User accounts and authentication
- **api_keys** - Encrypted exchange API keys
- **portfolios** - Paper trading portfolios
- **trades** - Virtual trade history
- **prices** - Historical price data
- **predictions** - AI forecasting results

## 🚀 Deployment

### Production Checklist
- [ ] Update all passwords in `.env`
- [ ] Set `DEBUG=false`
- [ ] Configure proper CORS origins
- [ ] Set up SSL certificates
- [ ] Configure database backups
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Configure logging
- [ ] Set up firewall rules

### Deployment Options
1. **Local Server** - Docker Compose on your own machine
2. **VPS** - DigitalOcean, Linode, AWS EC2
3. **Homelab** - Proxmox, Unraid, TrueNAS
4. **Kubernetes** - For scalable deployments

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create a feature branch**
3. **Make your changes**
4. **Write tests** for your changes
5. **Submit a pull request**

### Code Standards
- **Python:** Black formatting, type hints, pytest
- **TypeScript:** ESLint, Prettier, Jest
- **Commits:** Conventional commits
- **Documentation:** Update README and docs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues:** Report bugs, request features
- **Documentation:** Check the `/docs` directory
- **Community:** Join our Discord (coming soon)

## 🙏 Acknowledgments

- **Kronos Team** for the amazing forecasting models
- **FastAPI** for the excellent web framework
- **Next.js** for the React framework
- **Google Stitch** for the design system
- **All contributors** who help make this project better

## 📈 Roadmap

### Phase 1: MVP (Current)
- [x] Project setup and structure
- [ ] Basic authentication
- [ ] CoinSpot API integration
- [ ] Price data collection
- [ ] Basic dashboard UI
- [ ] Paper trading engine
- [ ] Kronos-mini integration

### Phase 2: Enhanced Features
- [ ] Multi-exchange support (Binance, Kraken)
- [ ] Advanced charting
- [ ] WebSocket real-time updates
- [ ] Portfolio analytics
- [ ] Mobile-responsive design
- [ ] Social features

### Phase 3: Advanced Features
- [ ] Kronos-base/large models
- [ ] Advanced AI signals
- [ ] Trading strategies
- [ ] Backtesting engine
- [ ] API for external integrations
- [ ] Mobile app

---

**Happy trading!** 🚀

*Built with ❤️ by the BBSolana community*