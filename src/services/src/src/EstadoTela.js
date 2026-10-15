import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import Botao from './Botao';

export default function EstadoTela({ tipo = 'loading', mensagem, aoTentarNovamente }) {
  return (
    <View style={styles.container}>
      {tipo === 'loading' && (
        <>
          <ActivityIndicator size="large" color={theme.colors.loading} />
          <Text style={styles.text}>{mensagem || 'Carregando dados...'}</Text>
        </>
      )}

      {tipo === 'vazio' && (
        <Text style={styles.textMuted}>{mensagem || 'Nenhum registro encontrado.'}</Text>
      )}

      {tipo === 'erro' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{mensagem || 'Houve uma falha de conexão.'}</Text>
          {aoTentarNovamente && (
            <Botao title="Tentar Novamente" variant="secondary" onPress={aoTentarNovamente} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: 24,
  },
  text: {
    marginTop: 12,
    color: theme.colors.text,
    fontSize: 16,
  },
  textMuted: {
    color: theme.colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
  },
  errorBox: {
    alignItems: 'center',
    width: '100%',
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});