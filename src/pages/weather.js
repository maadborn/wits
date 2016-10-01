import {inject} from 'aurelia-framework';
import {WeatherService} from '../services/weatherservice';
import Chart from 'chartjs';

@inject(WeatherService)
export class Weather {
  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  attached() {
    this.weatherService.getWeatherDataFor(null).then(data => {
      this.buildCharts(data);
    });
  }

  buildCharts(weatherData) {
    const datax = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
          spanGaps: false,
        },
      ],
    };

    this.buildTempChart(weatherData);
    this.buildPressureChart(weatherData);
    this.buildHumidityChart(weatherData);
  }

  buildTempChart(weatherData) {
    const ctx = this.tempChart.getContext('2d');

    const chartData = {
      labels: weatherData.map(item => item.time),
      datasets: [
        {
          label: 'Temperature (C)',
          data: weatherData.map(item => item.temp),
          yAxisID: 'celcius',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'celcius',
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  buildPressureChart(weatherData) {
    const ctx = this.pressureChart.getContext('2d');

    const chartData = {
      labels: weatherData.map(item => item.time),
      datasets: [
        {
          label: 'Pressure (hPa)',
          data: weatherData.map(item => item.pressure),
          yAxisID: 'hpa',
          backgroundColor: 'rgba(235, 162, 54, 0.2)',
          borderColor: 'rgba(235, 162, 54, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'hpa',
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });
  }

  buildHumidityChart(weatherData) {
    const ctx = this.humidityChart.getContext('2d');
    
    const chartData = {
      labels: weatherData.map(item => item.time),
      datasets: [
        {
          label: 'Humidity (%)',
          yAxisID: 'percent',
          data: weatherData.map(item => item.humidity),
          backgroundColor: 'rgba(235, 54, 162, 0.2)',
          borderColor: 'rgba(235, 54, 162, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'percent',
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
