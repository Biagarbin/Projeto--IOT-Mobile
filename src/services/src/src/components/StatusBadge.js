import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function StatusBadge({ status }) {
  const isAtivo = String(status) === '1';

  return (
    <View style={[
      styles.badge, 
      { backgroundColor: isAtivo ? theme.colors.success + '20' : theme.colors.danger + '20',
        borderColor: isAtivo ? theme.colors.success : theme.colors.danger }
    ]}>
      <View style={[
        styles.dot, 
        { backgroundColor: isAtivo ? theme.colors.success : theme.colors.danger }
      ]} />
      <Text style={[styles.text, { color: isAtivo ? theme.colors.success : theme.colors.danger }]}>
        {isAtivo ? 'Ativo' : 'Inativo'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});