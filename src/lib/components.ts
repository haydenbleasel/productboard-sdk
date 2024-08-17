export type ProductboardComponent = {
  id: string;
  name: string;
  description: string;
  links: {
    self: string;
    html: string;
  };
  parent:
    | {
        component: {
          id: string;
          links: {
            self: string;
          };
        };
      }
    | {
        product: {
          id: string;
          links: {
            self: string;
          };
        };
      };
  owner: {
    email: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

type ProductboardError = {
  code: string;
  title: string;
  detail: string;
  source?: {
    parameter: string;
    pointer: string;
  };
};

export type GetComponentsResponse =
  | {
      data: ProductboardComponent[];
      links: {
        next: string | null;
      };
    }
  | {
      errors: ProductboardError[];
    };

export const fetchProductboardComponents = async (
  url: string,
  token: string
): Promise<ProductboardComponent[]> => {
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

  const payload = (await response.json()) as GetComponentsResponse;

  if ('errors' in payload) {
    throw new Error(payload.errors[0].detail);
  }

  if (payload.links.next) {
    const nextPayload = await fetchProductboardComponents(
      payload.links.next,
      token
    );

    return [...payload.data, ...nextPayload];
  }

  return payload.data;
};

export const getProductboardComponents = async (
  token: string
): Promise<ProductboardComponent[]> =>
  fetchProductboardComponents('https://api.productboard.com/components', token);
