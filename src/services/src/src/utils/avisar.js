import { Alert } from 'react-native';

export function avisarErro(mensagem, aoConfirmar = null) {
  Alert.alert(
    "Ops! Algo deu errado",
    mensagem,
    [{ text: "Entendido", onPress: aoConfirmar }]
  );
}

export function avisarSucesso(mensagem, aoConfirmar = null) {
  Alert.alert(
    "Sucesso",
    mensagem,
    [{ text: "OK", onPress: aoConfirmar }]
  );
}