// General utility functions used across features
export function formatCurrency(amount: number, currency: string = 'IRR'): string {
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+98|98|0)?9\d{9}$/;
  return phoneRegex.test(phone);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
} 

export * from './fonts';
export * from './images'; 