declare global {
	namespace App {
		interface PageData {
			meta: {
				title: string;
				canonical: `/${string}`;
				description?: string;
				og?: {
					title: string;
					url?: string;
					description?: string;
					// TODO
				};
			};
		}

		interface PageState {
			dialog?: boolean;
		}
	}
}

export {};
