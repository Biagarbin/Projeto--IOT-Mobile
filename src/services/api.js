
// const API_URL = "http://10.137.11.6";
export const API_URL = 'http://10.137.11.6';

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers: {
      Accept: "application/json",
      ...(opcoes.body
        ? { "Content-Type": "application/json" }
        : {}),
      ...opcoes.headers,
    },
  });

  const texto = await resposta.text();

  let dados = {};
  try {
    dados = texto ? JSON.parse(texto) : {};
  } catch {
    throw new Error("A API retornou uma resposta inválida.");
  }

  if (!resposta.ok) {
    throw new Error(
      dados.error || dados.message || `Erro HTTP ${resposta.status}`
    );
  }

  return dados;
}

export async function listarSensores() {
  const dados = await requisicao("/api/sensor/status/listar");
  return Array.isArray(dados.data) ? dados.data : [];
}

export async function visualizarSensor(codigo) {
  return requisicao(
    `/api/sensor/status/visualizar/${encodeURIComponent(codigo)}`
  );
}

export async function atualizarStatus(codigo, status) {
  return requisicao("/api/sensor/status/atualizar", {
    method: "PUT",
    body: JSON.stringify({ codigo, status }),
  });
}
