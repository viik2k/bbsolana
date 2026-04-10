# Kronos AI Research

## Overview
Kronos is the first open-source foundation model for financial candlesticks (K-lines), trained on data from over 45 global exchanges. It is designed to handle the unique, high-noise characteristics of financial data.

## Key Features
- **Specialized for Financial Markets**: Unlike general-purpose time series models, Kronos is specifically designed for financial K-line data (OHLCV - Open, High, Low, Close, Volume)
- **Two-Stage Framework**: 
  1. Specialized tokenizer quantizes continuous K-line data into hierarchical discrete tokens
  2. Autoregressive Transformer pre-trained on these tokens
- **Massive Training Data**: Trained on over 12 billion K-line records from 45 global exchanges
- **Zero-Shot Capabilities**: Excels in zero-shot settings across diverse financial tasks

## Model Family

| Model | Tokenizer | Context Length | Parameters | Hugging Face Link |
|-------|-----------|----------------|------------|-------------------|
| Kronos-mini | Kronos-Tokenizer-2k | 2048 | 4.1M | [NeoQuasar/Kronos-mini](https://huggingface.co/NeoQuasar/Kronos-mini) |
| Kronos-small | Kronos-Tokenizer-base | 512 | 24.7M | [NeoQuasar/Kronos-small](https://huggingface.co/NeoQuasar/Kronos-small) |
| Kronos-base | Kronos-Tokenizer-base | 512 | 102.3M | [NeoQuasar/Kronos-base](https://huggingface.co/NeoQuasar/Kronos-base) |
| Kronos-large | Kronos-Tokenizer-base | 512 | 499.2M | Not yet publicly available |

## Supported Tasks
1. **Price Series Forecasting**: Predict future price movements
2. **Volatility Forecasting**: Predict market volatility
3. **Synthetic Data Generation**: Generate realistic financial time series data
4. **Zero-Shot Financial Tasks**: Various quantitative financial applications

## Technical Architecture

### Tokenizer
- **Kronos-Tokenizer-2k**: For Kronos-mini (2048 context length)
- **Kronos-Tokenizer-base**: For Kronos-small, Kronos-base, Kronos-large (512 context length)
- Converts continuous OHLCV data into discrete tokens while preserving price dynamics and trade activity patterns

### Model Architecture
- Decoder-only foundation model
- Autoregressive Transformer
- Pre-trained using autoregressive objective on massive financial corpus

## Getting Started

### Installation
```bash
pip install -r requirements.txt
```

### Basic Usage Example
```python
from model import Kronos, KronosTokenizer, KronosPredictor
import pandas as pd

# Load model and tokenizer
tokenizer = KronosTokenizer.from_pretrained("NeoQuasar/Kronos-Tokenizer-base")
model = Kronos.from_pretrained("NeoQuasar/Kronos-small")

# Initialize predictor
predictor = KronosPredictor(model, tokenizer, device="cuda:0", max_context=512)

# Prepare data
df = pd.read_csv("./data/XSHG_5min_600977.csv")
df['timestamps'] = pd.to_datetime(df['timestamps'])

lookback = 400
pred_len = 120

x_df = df.loc[:lookback-1, ['open', 'high', 'low', 'close', 'volume', 'amount']]
x_timestamp = df.loc[:lookback-1, 'timestamps']
y_timestamp = df.loc[lookback:lookback+pred_len-1, 'timestamps']

# Generate predictions
pred_df = predictor.predict(
    df=x_df,
    x_timestamp=x_timestamp,
    y_timestamp=y_timestamp,
    pred_len=pred_len,
    T=1.0,
    top_p=0.9,
    sample_count=1
)
```

### Batch Prediction
```python
# Prepare multiple datasets
df_list = [df1, df2, df3]
x_timestamp_list = [x_ts1, x_ts2, x_ts3]
y_timestamp_list = [y_ts1, y_ts2, y_ts3]

# Generate batch predictions
pred_df_list = predictor.predict_batch(
    df_list=df_list,
    x_timestamp_list=x_timestamp_list,
    y_timestamp_list=y_timestamp_list,
    pred_len=pred_len,
    T=1.0,
    top_p=0.9,
    sample_count=1,
    verbose=True
)
```

## Fine-Tuning Capabilities
Kronos supports fine-tuning on custom datasets. The repository includes:
- Complete fine-tuning pipeline
- Qlib integration for Chinese A-share market data
- Multi-GPU training support
- Backtesting framework

### Fine-Tuning Steps
1. **Data Preparation**: Process and split data using Qlib
2. **Tokenizer Fine-Tuning**: Adapt tokenizer to specific data distribution
3. **Predictor Fine-Tuning**: Fine-tune main model for forecasting tasks
4. **Backtesting**: Evaluate model performance

## Performance Considerations
- **Context Length**: Kronos-small and Kronos-base have max_context of 512
- **Input Requirements**: Data must include ['open', 'high', 'low', 'close'] columns
- **Optional Columns**: 'volume' and 'amount' are optional
- **Batch Prediction**: All series must have same lookback and prediction lengths

## Resources
- **Paper**: [arXiv:2508.02739](https://arxiv.org/abs/2508.02739)
- **GitHub**: [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)
- **Live Demo**: [Kronos Demo](https://shiyu-coder.github.io/Kronos-demo/)
- **Hugging Face**: [NeoQuasar Organization](https://huggingface.co/NeoQuasar)

## License
MIT License

## Citation
```bibtex
@misc{shi2025kronos,
  title={Kronos: A Foundation Model for the Language of Financial Markets},
  author={Yu Shi and Zongliang Fu and Shuo Chen and Bohan Zhao and Wei Xu and Changshui Zhang and Jian Li},
  year={2025},
  eprint={2508.02739},
  archivePrefix={arXiv},
  primaryClass={q-fin.ST},
  url={https://arxiv.org/abs/2508.02739},
}
```

## Potential Applications for BBSolana
1. **Price Prediction**: Integrate Kronos for Solana token price forecasting
2. **Market Analysis**: Use for volatility prediction and market regime detection
3. **Trading Signals**: Generate trading signals based on model predictions
4. **Risk Management**: Volatility forecasting for portfolio risk assessment
5. **Synthetic Data**: Generate realistic market data for backtesting and simulation

## Implementation Considerations
1. **Model Size**: Choose appropriate model based on computational constraints
2. **Data Format**: Ensure OHLCV data is properly formatted
3. **Context Window**: Respect 512 token limit for small/base models
4. **Fine-Tuning**: Consider fine-tuning on Solana-specific market data
5. **Integration**: API design for real-time predictions