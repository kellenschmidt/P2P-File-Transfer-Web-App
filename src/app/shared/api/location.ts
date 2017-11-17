export class Location {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;

  constructor(lat: number, lon: number, city: string, state: string, country: string) {
    this.latitude = lat;
    this.longitude = lon;
    this.city = city;
    this.state = state;
    this.country = country;
  }
}
