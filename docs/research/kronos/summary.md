# Kronos AI - Quick Summary

## What is Kronos?
Kronos is an open-source foundation model specifically designed for financial time series (K-line/OHLCV data). It's the first model of its kind trained on massive financial market data.

## Key Points
- **Purpose**: Financial market forecasting and analysis
- **Architecture**: Two-stage (Tokenizer + Transformer)
- **Training**: 12B+ K-line records from 45 exchanges
- **Models**: mini (4.1M), small (24.7M), base (102.3M), large (499.2M)
- **Context**: 512 tokens (small/base), 2048 tokens (mini)

## Why Relevant for BBSolana?
1. **Price Forecasting**: Predict Solana token prices
2. **Volatility Analysis**: Market risk assessment
3. **Trading Signals**: Generate actionable insights
4. **Data Generation**: Create synthetic market data for testing

## Quick Start
```python
# Basic prediction
from model import Kronos, KronosTokenizer, KronosPredictor

tokenizer = KronosTokenizer.from_pretrained("NeoQuasar/Kronos-Tokenizer-base")
model = Kronos.from_pretrained("NeoQuasar/Kronos-small")
predictor = KronosPredictor(model, tokenizer, max_context=512)

# Predict next 120 periods
pred_df = predictor.predict(df, x_timestamp, y_timestamp, pred_len=120)
```

## Resources
- GitHub: https://github.com/shiyu-coder/Kronos
- Paper: https://arxiv.org/abs/2508.02739
- Demo: https://shiyu-coder.github.io/Kronos-demo/
- Models: https://huggingface.co/NeoQuasar