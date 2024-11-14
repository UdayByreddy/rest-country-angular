
  
  export interface AllCountry {
    id: number;
    name: string;
    population: number;
    Region: string;
    Capital: string[];
    flag: string;
    area: number;
    subregion: string;
  }
  
  export interface SingleCountry extends AllCountry {
    nativeName: string;   
    currencies: string;    
    languages?: string;      
    continents: string[];
    borders: string[];
    cca3: string;
    tld:string;
  }