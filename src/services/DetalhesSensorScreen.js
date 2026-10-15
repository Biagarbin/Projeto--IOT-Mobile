import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { visualizarSensor } from '../services/api';
import { theme } from '../theme';
import StatusBadge from '../components/StatusBadge';
import EstadoTela from '../components/EstadoTela';
import Botao from '../components/Botao';

export default function DetalhesSensorScreen({ route, navigation }) {
  const { codigoSensor } = route.params;
  const [sensor, setSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const obterFichaSensor = async () => {
    try {
      setLoading(true);
      setErro(null);
      const resposta = await visualizarSensor(codigoSensor);
      
      if (resposta && resposta.data) {
        setSensor(resposta.data);
      } else {
        setErro("Sensor não encontrado");
      }
    } catch (err) {
      setErro("Não foi possível carregar os detalhes do dispositivo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      obterFichaSensor();
    });
    return unsub;
  }, [navigation]);

  if (loading) return <EstadoTela tipo="loading" mensagem="Buscando informações do dispositivo..." />;
  if (erro) return <EstadoTela tipo="erro" mensagem={erro} aoTentarNovamente={obterFichaSensor} />;

  return (
    <View style={styles.container}>
      <View style={styles.cardDetalhes}>
        <Text style={styles.label}>CÓDIGO DE IDENTIFICAÇÃO</Text>
        <Text style={styles.valorPrincipal}>{sensor?.codigo}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>TIPO DO DISPOSITIVO</Text>
        <Text style={styles.valorSecundario}>{sensor?.tipo || 'Desconhecido'}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>STATUS ATUAL</Text>
        <View style={styles.badgeWrapper}>
          <StatusBadge status={sensor?.status} />
        </View>
      </View>

      <Botao 
        title="Modificar Estado Operacional" 
        onPress={() => navigation.navigate('AtualizarStatus', { sensor })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardDetalhes: {
    backgroundColor: theme.colors.surface,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textMuted,
    letterSpacing: 1,
  },
  valorPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 4,
    marginBottom: 16,
  },
  valorSecundario: {
    fontSize: 18,
    color: theme.colors.text,
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 16,
  },
  badgeWrapper: {
    marginTop: 8,
  },
});