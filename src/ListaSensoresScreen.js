import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { listarSensores } from '../services/api';
import { theme } from '../theme';
import StatusBadge from '../components/StatusBadge';
import EstadoTela from '../components/EstadoTela';
import Botao from '../components/Botao';

export default function ListaSensoresScreen({ navigation }) {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setErro(null);
      const dados = await listarSensores();
      setSensores(dados);
    } catch (err) {
      setErro("Não foi possível acessar os sensores. Verifique a conexão com o servidor local.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) return <EstadoTela tipo="loading" mensagem="Carregando sensores..." />;
  if (erro) return <EstadoTela tipo="erro" mensagem={erro} aoTentarNovamente={carregarDados} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel IoT</Text>
        <Botao title="🔄 Atualizar" variant="secondary" onPress={carregarDados} />
      </View>

      <FlatList
        data={sensores}
        keyExtractor={(item) => String(item.codigo)}
        ListEmptyComponent={<EstadoTela tipo="vazio" mensagem="Nenhum sensor encontrado" />}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesSensor', { codigoSensor: item.codigo })}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardCodigo}>Cód: {item.codigo}</Text>
              <Text style={styles.cardTipo}>Tipo: {item.tipo || 'Não especificado'}</Text>
            </View>
            <StatusBadge status={item.status} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginRight: 8,
  },
  cardCodigo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  cardTipo: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
});