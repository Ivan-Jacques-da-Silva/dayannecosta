// Este arquivo contém funções utilitárias para o projeto.
// Funções de formatação, validação e outras utilidades.

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor numérico para moeda (USD)
 * @param value - Valor a ser formatado
 * @returns String formatada como moeda
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formata uma data para exibição
 * @param dateString - String de data ISO
 * @returns Data formatada
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * Trunca um texto para um tamanho máximo
 * @param text - Texto a ser truncado
 * @param maxLength - Tamanho máximo
 * @returns Texto truncado com reticências
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Gera um ID aleatório
 * @returns String de ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Valida um endereço de email
 * @param email - Email a ser validado
 * @returns Booleano indicando se é válido
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Valida um número de telefone
 * @param phone - Telefone a ser validado
 * @returns Booleano indicando se é válido
 */
export function isValidPhone(phone: string): boolean {
  const regex = /^$$\d{3}$$ \d{3}-\d{4}$/
  return regex.test(phone)
}
