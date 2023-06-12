import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig } from "./log-publishers";
import { catchError, map, Observable, throwError } from 'rxjs';
const PUBLISHERS_FILE = "assets/log-publishers.json";
@Injectable()
export class LogPublishersService {
    constructor(private http: HttpClient) {
        // Build publishers arrays
        this.buildPublishers();
    }

    // Public properties
    publishers: LogPublisher[] = [];

    getLoggers(): Observable<LogPublisherConfig[]> {
        return this.http.get(PUBLISHERS_FILE).pipe(map((response: any) => response), catchError(this.handleErrors));
    }

    // Build publishers array
    buildPublishers(): void {
        let logPub: LogPublisher;

        this.getLoggers().subscribe(response => {
            for (let pub of response.filter(p => p.isActive)) {
                switch (pub.loggerName.toLowerCase()) {
                    case "console":
                        logPub = new LogConsole();
                        break;
                    case "localstorage":
                        logPub = new LogLocalStorage();
                        break;
                    case "webapi":
                        logPub = new LogWebApi(this.http);
                        break;
                }

                // Set location of logging
                logPub.location = pub.loggerLocation;

                // Add publisher to array
                this.publishers.push(logPub);
            }
        });
    }


    private handleErrors(error: any):
        Observable<any> {
        let errors: string[] = [];
        let msg: string = "";

        msg = "Status: " + error.status;
        msg += " - Status Text: " + error.statusText;
        if (error) {
            msg += " - Exception Message: " + error.exceptionMessage;
        }
        errors.push(msg);
        console.error('An error occurred', errors);
        return throwError(() => errors);
    }


}
