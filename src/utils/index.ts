export function paramsToApi(params: any) {
  const { api = '', query = {} } = params;
  let queryUrl: any = [];
  if (query && typeof query === 'object' && !Array.isArray(query)) {
    for (let key in query) {
      queryUrl.push(`${key}=${query[key]}`);
    }
    if (queryUrl.length === 0) return api;
    queryUrl = queryUrl.join('&&');
    return `${api}?${queryUrl}`;
  }
  if (query && typeof query === 'object' && query instanceof Array) {
    queryUrl = query.join('/');
    return `${api}/${queryUrl}`;
  }
  if (query && typeof query !== 'object' && typeof query !== 'function') {
    return `${api}/${query}`;
  }
  return api;
}

export function errorCompatibleWith(error: any) {
  const { response: { data, status }, message } = error;
  let code = null;
  if (typeof data === 'string') {
    code = status;
  } else {
    code = data.code;
  }
  return {
    code,
    message
  }
}