export type ProductboardJiraIntegration = {
  id: string;
  createdAt: string;
  integrationStatus: 'disabled' | 'enabled';
  name: string;
  links: {
    self: string;
    connections: string;
  };
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

export type GetJiraIntegrationsResponse =
  | {
      data: ProductboardJiraIntegration[];
      links: {
        next: string;
      };
    }
  | {
      errors: ProductboardError[];
    };

export const fetchProductboardJiraIntegrations = async (
  url: string,
  token: string
): Promise<ProductboardJiraIntegration[]> => {
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

  const payload = (await response.json()) as GetJiraIntegrationsResponse;

  if ('errors' in payload) {
    throw new Error(payload.errors[0].detail);
  }

  if (payload.links.next) {
    const nextPayload = await fetchProductboardJiraIntegrations(
      payload.links.next,
      token
    );

    return [...payload.data, ...nextPayload];
  }

  return payload.data;
};

export const getProductboardJiraIntegrations = async (
  token: string
): Promise<ProductboardJiraIntegration[]> => {
  const data = await fetchProductboardJiraIntegrations(
    'https://api.productboard.com/jira-integrations',
    token
  );

  return data.filter(
    (integration) => integration.integrationStatus === 'enabled'
  );
};
