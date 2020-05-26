// amplitude/index.js
import * as Amplitude from 'expo-analytics-amplitude';
import { apiKey } from './config';
import eventActions from './events';
import { normalizeTrackingOptions } from './utils';
export const events = eventActions;
export function initialize() {
    Amplitude.initialize(apiKey);
}
export function identify(id, options) {
    console.log('identify', id, options);
    
    initialize();
    const properties = normalizeTrackingOptions(options);
    if (id) {
        Amplitude.setUserId(id);
        if (properties) {
            Amplitude.setUserProperties(properties);
        }
    } else {
        Amplitude.clearUserProperties();
    }
}
export function logEvent(event, options) {
    console.log('logEvent', event, options);
    
    initialize();
    const properties = normalizeTrackingOptions(options);
    if (properties) {
        Amplitude.logEventWithProperties(
            event,
            { event: properties }
        );
    } else {
        Amplitude.logEvent(event);
    }
}
export default {
    events,
    initialize,
    identify,
    logEvent,
};