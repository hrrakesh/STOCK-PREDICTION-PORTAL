from django.shortcuts import render
from rest_framework.views import APIView
from api.serializers import StockPredictionSerializers
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from api.utils import save_plot






# Create your views here.
class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializers(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # fetch the data from yfinance
            now  = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start=start, end=end)

            

            if df.empty:
                return Response({'Failed': 'Fail', 'error': 'No Data was found for the given ticker', 'status':status.HTTP_404_NOT_FOUND})

            df = df.reset_index()
            ## Generate the basic plot
            plt.switch_backend('AGG') #ANTI GRAIN GEOMETRY
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()
            plot_img_path = f"{ticker}_plot.png"
            plot_img = save_plot(plot_img_path)
            

            # 100 days moving average
            df.ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG') #ANTI GRAIN GEOMETRY
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(df.ma100, 'r',label='100 days Moving average')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()
            plot_img_path = f"{ticker}_100dma.png"
            plot_img_100_dma = save_plot(plot_img_path)

            # 200 days moving average
            df.ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG') #ANTI GRAIN GEOMETRY
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(df.ma100, 'g',label='100 days Moving average')
            plt.plot(df.ma200, 'r',label='200 days Moving average')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Price")
            plt.legend()
            plot_img_path = f"{ticker}_200dma.png"
            plot_img_200_dma = save_plot(plot_img_path)
            plot_img_final_pred = ''

            ml_mode = False
            if ml_mode:
                from sklearn.preprocessing import MinMaxScaler
                from keras.models import load_model
                data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
                data_testing = pd.DataFrame(df.Close[len(df)*0.7:int(len(df))])

                scaler = MinMaxScaler(feature_range=(0,1))
                model = load_model('stock_prediction_model.keras')
                past_100_days = data_training.tail(100)
                final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
                input_data = scaler.fit_transform(final_df)
                x_test = []
                y_test = []

                for i in range(100, input_data.shape[0]):
                    x_test.append(input_data[i-100: i])
                    y_test.append(input_data[i, 0])

                x_test, y_test = np.array(x_test), np.array(y_test)

                # Making Predictions
                y_predicted = model.predict(x_test)

                y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
                y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

                plt.switch_backend('AGG') #ANTI GRAIN GEOMETRY
                plt.figure(figsize=(12,5))
                plt.plot(y_test, 'b', label='Original Price')
                plt.plot(y_predicted, 'r',label='Predicted Price')
                plt.title(f'Final Prediction {ticker}')
                plt.xlabel("Days")
                plt.ylabel("Price")
                plt.legend()
                plot_img_path = f"{ticker}_final_pred.png"
                plot_img_final_pred = save_plot(plot_img_path)

            


            return Response({'Status': 'Success', 
                             'ticker': ticker,
                             'plot_img':plot_img,
                             'plot_img_100_dma':plot_img_100_dma,
                             'plot_img_200_dma':plot_img_200_dma,
                             'plot_img_final_pred':plot_img_final_pred,
                             })
