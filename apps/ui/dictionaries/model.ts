export type Dictionary = {
	cart: {
		my_order: string;
		in_cart: string;
		make_order: string;
		delivery_note: string;
		sum: string;
		product_name: string;
		quantity: string;
		price: string;
		payment_types: {
			card: string;
			post: string;
		};
		form: {
			payment_method: string;
			address_placeholder: string;
			phone_placeholder: string;
			name_placeholder: string;
		};
	};
	header: {
		search: string;
	};
	footer: {
		privacy_policy: string;
		terms_of_service: string;
	};
	sidebar: {
		home: string;
		cart: string;
		about: string;
		categories: string;
	};
	product: {
		add_to_cart: string;
		taxes: string;
		quantity: string;
		specification: string;
		description: string;
		related_products: string;
		similar_products: string;
		features: string;
		currency: string;
	};
	search: {
		search_results: string;
		no_results: string;
	};
	auth: {
		login: string;
		register: string;
		main_page: string;
		email: string;
		password: string;
		first_name: string;
		last_name: string;
		repeat_password: string;
		back_to_login: string;
	};
	profile: {
		account: string;
		update_settings: string;
		save: string;
		orders_label: string;
		orders: string;
		logout_label: string;
		logout: string;
		delete_label: string;
		delete: string;
		irreversible_warning: string;
	};
	order: {
		order: string;
		orders: string;
		order_id: string;
		date: string;
		check: string;
		customer: string;
		status: string;
		phone_number: string;
		name: string;
		price: string;
		quantity: string;
		discount: string;
		remark: string;
		time: string;
		total: string;
	};
};
