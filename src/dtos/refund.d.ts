type RefundAPIResponse ={
	id: string;
	username: string;
	category: CategoriesAPIEnum;
	amount: number;
	filename: string;
	user:{
		name: string;
	}
}

type RefundPaginantionAPIResponse = {
	refunds: RefundAPIResponse[];
	pagination: {
		page: number;
		perPage: number;
		totalRecords: number;
		totalPages: number;
	}
}