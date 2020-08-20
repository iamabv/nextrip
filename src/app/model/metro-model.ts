export class Routes {
    Description: string;
    ProviderID: string;
    Route: string;
}

export class Directions {
    Text: string;
    Value: string;
}

export class Stops {
    Text: string;
    Value: string;
}

export class Information {
    Actual: boolean;
    BlockNumber: number;
    DepartureText: string;
    DepartureTime: string;
    Description: string;
    Gate: string;
    Route: string;
    RouteDirection: string;
    Terminal: string;
    VehicleHeading: number;
    VehicleLatitude: number;
    VehicleLongitude: number;
}
