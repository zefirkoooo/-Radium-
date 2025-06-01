# Radium Food Production Setup

## Prerequisites
- Python 3.12 or higher
- Redis Server
- Windows 10

## Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd radium_food
```

2. Run the setup script:
```bash
setup.bat
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your production settings

4. Start the production server:
```bash
run_production.bat
```

## Production Configuration

The application runs on two ports:
- Daphne (WebSocket): 8000
- Gunicorn (HTTP): 8001

## Directory Structure
```
radium_food/
├── .venv/              # Virtual environment
├── static/             # Static files
├── media/             # Media files
├── logs/              # Log files
├── radium_food/       # Project settings
├── food/              # Main application
├── requirements.txt   # Dependencies
├── setup.bat         # Setup script
└── run_production.bat # Production run script
```

## Maintenance

### Updating Dependencies
```bash
pip install -r requirements.txt
```

### Collecting Static Files
```bash
python manage.py collectstatic --noinput
```

### Database Migrations
```bash
python manage.py migrate
```

## Security Notes
- Keep your `.env` file secure and never commit it to version control
- Regularly update dependencies
- Monitor logs for any suspicious activity
- Keep your secret key secure 