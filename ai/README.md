# BBSolana AI Integration

This directory contains the AI/ML components for BBSolana, primarily focused on time series forecasting using Kronos models.

## Structure

```
ai/
├── kronos/           # Kronos model integration
├── forecasting/      # Prediction pipelines
├── data/            # Data preprocessing
└── models/          # Downloaded model files
```

## Kronos Models

Kronos is a family of time series forecasting models from Hugging Face. We support:

- **Kronos-small**: Lightweight, fast inference (recommended for CPU)
- **Kronos-base**: Balanced performance
- **Kronos-large**: Highest accuracy (requires GPU)

### Model Selection

By default, BBSolana uses `Kronos-small` for fast inference on CPU. To change the model, update the `KRONOS_MODEL` environment variable:

```bash
# In .env file
KRONOS_MODEL=NeoQuasar/Kronos-base
KRONOS_DEVICE=cuda  # if GPU available
```

## Forecasting Pipeline

The forecasting pipeline follows these steps:

1. **Data Collection**: Fetch historical price data from exchanges
2. **Preprocessing**: Clean, normalize, and format data for the model
3. **Inference**: Generate predictions using Kronos
4. **Post-processing**: Convert predictions back to price values
5. **Signal Generation**: Generate buy/sell/hold signals based on predictions

## Usage

### Basic Forecasting

```python
from ai.forecasting.pipeline import ForecastingPipeline

# Initialize pipeline
pipeline = ForecastingPipeline()

# Generate predictions
predictions = pipeline.forecast(
    symbol="SOL/USDT",
    historical_data=data,
    horizon=24,  # 24-hour forecast
)

# Get trading signals
signals = pipeline.generate_signals(predictions)
```

### Scheduled Forecasting

Forecasting tasks are scheduled via Celery Beat to run periodically:

- **Hourly**: Short-term predictions (1-6 hours)
- **Daily**: Medium-term predictions (24 hours)
- **Weekly**: Long-term predictions (7 days)

## Model Management

### Downloading Models

Models are automatically downloaded on first use. To pre-download:

```bash
# From backend container
docker-compose exec backend python -c "
from transformers import AutoModel
model = AutoModel.from_pretrained('NeoQuasar/Kronos-small')
print('Model downloaded')
"
```

### Model Caching

Models are cached in `~/.cache/huggingface/hub/`. To clear cache:

```bash
rm -rf ~/.cache/huggingface/hub/
```

## Performance Considerations

### CPU vs GPU

- **CPU**: Suitable for Kronos-small, slower inference
- **GPU**: Required for Kronos-base/large, much faster

### Memory Requirements

- **Kronos-small**: ~500MB RAM
- **Kronos-base**: ~1.5GB RAM
- **Kronos-large**: ~3GB RAM

### Inference Speed

- **Kronos-small (CPU)**: ~1-2 seconds per prediction
- **Kronos-small (GPU)**: ~0.1-0.2 seconds per prediction

## Custom Models

To use custom forecasting models:

1. Place model files in `ai/models/custom/`
2. Create a wrapper class in `ai/forecasting/custom.py`
3. Update configuration to use custom model

## Troubleshooting

### Model Loading Issues

```python
# Check if model can be loaded
from transformers import AutoModel
try:
    model = AutoModel.from_pretrained('NeoQuasar/Kronos-small')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
```

### Memory Issues

If you encounter memory issues:

1. Use Kronos-small instead of larger models
2. Reduce batch size in forecasting
3. Enable model offloading to disk

### Performance Issues

For better performance:

1. Use GPU if available
2. Enable model quantization
3. Implement prediction caching
4. Use smaller prediction horizons