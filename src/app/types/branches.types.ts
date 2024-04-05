export type getAllBranchesType = {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: getAllBranchesItemsType[];
};
export type getAllBranchesItemsType = {
  _id: string;
  branchBTB_name: string;
  street: string;
  interior_number: string;
  outdoor_number: string;
  suburb: string;
  state: string;
  reference: string;
  telephone: string;
  id_company: string;
  full_direction: string;
};

export type createBranchType = {
  branchBTB_name: string;
  street: string;
  interior_number: string;
  outdoor_number: string;
  suburb: string;
  state: string;
  reference?: string;
  id_company: string;
  telephone: string;
};

export type responseCreateBranchType = {
  create: boolean;
  error: boolean;
  data: {
    message: string;
    error: string;
  };
};
