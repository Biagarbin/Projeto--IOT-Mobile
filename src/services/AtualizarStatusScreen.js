import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { atualizarStatus } from '../services/api';
import { theme } from '../theme';
import { avisarErro, avisarSucesso } from '../utils/avisar';
import Botao from '../components/Botao';

export default function AtualizarStatusScreen({ route, navigation }) {
  const { sensor } = route.params;
  const [statusSelecionado, setStatusSelecionado] = useState(String(sensor.status));
  const [salvando, setSalvando] = useState(false);

  const confirmarAlteracao = async () => {
    try {
      setSalvando(true);
      await atualizarStatus(sensor.codigo, parseInt(statusSelecionado));
      
      avisarSucesso("O status do sensor foi modificado no sistema com sucesso!", () => {
        navigation.popToTop(); // Retorna sincronizado
      });
    } catch (err) {
      avisarErro("Não foi possível atualizar o status. Verifique se o servidor aceitou a operação e tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titulo}>Alterar Operação</Text>
        <Text style={styles.subtitulo}>Selecione o novo estado pretendido para o sensor {sensor.codigo}:</Text>

        <TouchableOpacity 
          style={[
            styles.opcaoCard, 
            statusSelecionado === '1' && { borderColor: theme.colors.success, backgroundColor: theme.colors.success + '10' }
          ]}
          onPress={() => setStatusSelecionado('1')}
        >
          <View style={[styles.radio, statusSelecionado === '1' && { backgroundColor: theme.colors.success }]} />
          <Text style={styles.opcaoTexto}>Ativo / Ligado</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.opcaoCard, 
            statusSelecionado === '0' && { borderColor: theme.colors.danger, backgroundColor: theme.colors.danger + '10' }
          ]}
          onPress={() => setStatusSelecionado('0')}
        >
          <View style={[styles.radio, statusSelecionado === '0' && { backgroundColor: theme.colors.danger }]} />
          <Text style={styles.opcaoTexto}>Inativo / Desligado</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerGroup}>
        <Botao 
          title="Salvar Novo Status" 
          loading={salvando}
          onPress={confirmarAlteracao} 
        />
        <Botao 
          title="Cancelar" 
          variant="secondary" 
          disabled={salvando}
          onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
    justifyContent: 'space-between',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginBottom: 24,
  },
  opcaoCard: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.textMuted,
    marginRight: 12,
  },
  opcaoTexto: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  footerGroup: {
    marginTop: 20,
  }
});