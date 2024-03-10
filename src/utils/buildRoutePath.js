// Faz um comando que analisa a url e retorna se a url indicada tem os route parameters válidos ou não

export function buildRoutepath(path) {
  // Cria uma regex que vai filtrar os routes params
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // Substitui tudo que a regex substitui na url por outra regex
  const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)");

  // Cria uma regex que vai começar com o pathWithParams
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
    
  // Retorna a regex criada
  return pathRegex;
}
