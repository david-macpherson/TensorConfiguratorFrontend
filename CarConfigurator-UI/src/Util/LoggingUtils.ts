import { logsContentElement } from "../UI/LogsPanel";

declare global {
    interface Console {
        oerror(message?: any, ...optionalParams: any[]): void;
		owarn(message?: any, ...optionalParams: any[]): void;
		odebug(message?: any, ...optionalParams: any[]): void;
		oinfo(message?: any, ...optionalParams: any[]): void;
		olog(message?: any, ...optionalParams: any[]): void;
    }
}


export class LoggingUtils {
    static setupLoggingOverrides(contentElement: logsContentElement): void {
		if (typeof console  != "undefined") {
			console.oerror = typeof console.error != 'undefined' ? console.error : function() {}
		}

		console.error = (message) => {
			console.oerror(message);
			message.split(/\r?\n/).forEach((token: string) => {
				const log = document.createElement('p');
				log.id = 'logMessage';
				log.innerHTML = token;
				contentElement.errorElement.appendChild(log);
			})
		};

		if (typeof console  != "undefined") {
			console.owarn = typeof console.warn != 'undefined' ? console.warn : function() {}
		}

		console.warn = (message) => {
			console.owarn(message);
			message.split(/\r?\n/).forEach((token: string) => {
				const log = document.createElement('p');
				log.id = 'logMessage';
				log.innerHTML = token;
				contentElement.warnElement.appendChild(log);
			})
		};


        if (typeof console  != "undefined") {
			console.odebug = typeof console.debug != 'undefined' ? console.debug : function() {}
		}

		console.debug = (message) => {
			console.odebug(message);
			message.split(/\r?\n/).forEach((token: string) => {
				const log = document.createElement('p');
				log.id = 'logMessage';
				log.innerHTML = token;
				contentElement.debugElement.appendChild(log);
			})
		};
		
		if (typeof console  != "undefined") {
			console.oinfo = typeof console.info != 'undefined' ? console.info : function() {}
		}

		console.info = (message) => {
			console.oinfo(message);
			message.split(/\r?\n/).forEach((token: string) => {
				const log = document.createElement('p');
				log.id = 'logMessage';
				log.innerHTML = token;
				contentElement.infoElement.appendChild(log);
			})
		};

		if (typeof console  != "undefined") {
			console.olog = typeof console.log != 'undefined' ? console.log : function() {}
		}
				
		console.log = (message) => {
			console.olog(message);
			message.split(/\r?\n/).forEach((token: string) => {
				const log = document.createElement('p');
				log.id = 'logMessage';
				log.innerHTML = token;
				contentElement.logElement.appendChild(log);
			})
		};
    }
}
