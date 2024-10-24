import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AirQualityResponse {
  idx: number;
  aqi: number;
  cityName: string;
  o3: Array<{ day: string; avg: number; max: number; min: number }>;
  pm25: Array<{ day: string; avg: number; max: number; min: number }>;
  pm10: Array<{ day: string; avg: number; max: number; min: number }>;
  uvi: Array<{ day: string; avg: number; max: number; min: number }>;
}

interface AirQualityErrorResponse {
  status: string;
  message: string;

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule]
})

export class AppComponent {
  city: string = '';
  airQualityData: AirQualityResponse | null = null;
  airQualityError: AirQualityErrorResponse | null = null;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  search() {
    if (!this.city) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    this.errorMessage = '';
    const apiUrl = `http://localhost:8080/api/air-quality-index/?city=${this.city}`;

    this.http.get<AirQualityResponse>(apiUrl).subscribe(
      (response) => {
        this.airQualityData = response;
      },
      (error) => {
        this.airQualityError = error.error;
        this.errorMessage = this.airQualityError!.message;
        this.airQualityData = null; // Reset data on error
      }
    );
  }
}
