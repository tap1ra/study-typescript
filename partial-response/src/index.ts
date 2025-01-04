type APIResponse = {
  id?: number;
  name?: string;
  additional_field?: string;
};

type RequestParams = (keyof APIResponse)[];

type FilteredResponse<T extends RequestParams> = {
  [K in T[number]]: APIResponse[K];
};

class APIClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async fetch<T extends RequestParams>(fields: T): Promise<FilteredResponse<T>> {
    try {
      const queryString = this.buildQueryString(fields);
      const response = await fetch(`${this.endpoint}?fields=${queryString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();

      return this.filterResponse(data, fields);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  private buildQueryString(fields: RequestParams): string {
    return fields.map(encodeURIComponent).join(",");
  }


  private filterResponse<T extends RequestParams>(response: APIResponse, fields: T): FilteredResponse<T> {
    const filtered: { [K in T[number]]: APIResponse[K] | undefined } = {} as { [K in T[number]]: APIResponse[K] | undefined };

    fields.forEach((field) => {
      const value = response[field as keyof APIResponse];

      if (value !== undefined) {
        filtered[field as T[number]] = value as APIResponse[T[number]];
      }
    });

    return filtered as FilteredResponse<T>;
  }


}

(async () => {
  const client = new APIClient("https://localhost/users");
  try {
    const data = await client.fetch(["id", "name"]);
    console.log("Filtered response id:", data.id);
    console.log("Filtered response name:", data.name);
  } catch (error) {
    console.error("Error:", error);
  }
})();
