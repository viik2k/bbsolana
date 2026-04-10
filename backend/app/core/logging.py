"""
Logging configuration for BBSolana.
"""
import logging
import sys
from loguru import logger


class InterceptHandler(logging.Handler):
    """
    Intercept standard logging messages toward Loguru.
    """
    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(
            level, record.getMessage()
        )


def setup_logging():
    """
    Setup logging configuration.
    """
    # Remove default handler
    logger.remove()
    
    # Add console handler
    logger.add(
        sys.stdout,
        format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>",
        level="DEBUG" if settings.DEBUG else "INFO",
        colorize=True,
    )
    
    # Add file handler
    logger.add(
        "logs/bbsolana.log",
        rotation="500 MB",
        retention="10 days",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
        level="INFO",
    )
    
    # Intercept standard logging
    logging.basicConfig(handlers=[InterceptHandler()], level=0, force=True)
    
    # Set loguru as handler for uvicorn
    for _log in ["uvicorn", "uvicorn.access", "uvicorn.error"]:
        _logger = logging.getLogger(_log)
        _logger.handlers = [InterceptHandler()]
    
    logger.info("Logging setup complete")


# Import settings after function definition to avoid circular import
from app.core.config import settings