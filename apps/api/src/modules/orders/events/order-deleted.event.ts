export class OrderDeletedEvent {
	user_id: string;
	order_id: string;

	constructor(user_id: string, order_id: string) {
		this.user_id = user_id;
		this.order_id = order_id;
	}
}
