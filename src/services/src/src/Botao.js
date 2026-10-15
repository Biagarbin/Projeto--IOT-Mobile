import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

export default function Botao({ title, onPress, variant = 'primary', loading = false, disabled = false }) {
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity 
      style={[
        styles.button,
        isDanger && { backgroundColor: theme.colors.danger },
        isSecondary && { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.border },
        (disabled || loading) && { opacity: 0.5 }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} size="small" />
      ) : (
        <Text style={[styles.text, isSecondary && { color: theme.colors.textMuted }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    marginVertical: 6,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});