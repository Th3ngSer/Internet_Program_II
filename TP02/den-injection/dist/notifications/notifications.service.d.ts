type EventPublisher = {
    publish: (event: string, payload: any) => void;
};
export declare class NotificationsService {
    private readonly eventPublisher;
    constructor(eventPublisher: EventPublisher);
    notify(event: string, payload: any): {
        ok: boolean;
    };
}
export {};
