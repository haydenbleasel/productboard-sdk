export type ProductboardCustomFieldValue = {
  customField: {
    id: string;
  };
  hierarchyEntity: {
    id: string;
    type: 'component' | 'feature' | 'product';
  };
  links: {
    self: string;
  };
} & (
  | {
      type: 'custom-description' | 'text';
      value: string | null;
    }
  | {
      type: 'dropdown';
      value: {
        id: string;
        label: string;
      } | null;
    }
  | {
      type: 'member';
      value: {
        email: string | null;
      } | null;
    }
  | {
      type: 'multi-dropdown';
      value:
        | {
            id: string;
            label: string;
          }[]
        | null;
    }
  | {
      type: 'number';
      value: number | null;
    }
);

type ProductboardError = {
  code: string;
  title: string;
  detail: string;
  source?: {
    parameter: string;
    pointer: string;
  };
};

export type GetCustomFieldValuesResponse =
  | {
      data: ProductboardCustomFieldValue[];
      links: {
        next: string | null;
      };
    }
  | {
      errors: ProductboardError[];
    };

export const fetchProductboardCustomFieldValues = async (
  url: string,
  token: string
): Promise<ProductboardCustomFieldValue[]> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Version': '1',
    },
    next: {
      revalidate: 0,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const payload = (await response.json()) as GetCustomFieldValuesResponse;

  if ('errors' in payload) {
    throw new Error(payload.errors[0].detail);
  }

  if (payload.links.next) {
    const nextPayload = await fetchProductboardCustomFieldValues(
      payload.links.next,
      token
    );

    return [...payload.data, ...nextPayload];
  }

  return payload.data;
};

export const getProductboardCustomFieldValues = async (
  token: string,
  id: string
): Promise<ProductboardCustomFieldValue[]> =>
  fetchProductboardCustomFieldValues(
    `https://api.productboard.com/hierarchy-entities/custom-fields-values?customField.id=${id}`,
    token
  );
