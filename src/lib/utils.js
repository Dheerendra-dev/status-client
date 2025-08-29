import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getStatusColor(status) {
  const colors = {
    operational: 'text-status-operational',
    degraded: 'text-status-degraded',
    partial: 'text-status-partial',
    major: 'text-status-major',
  }
  return colors[status] || 'text-gray-500'
}

export function getStatusBadgeColor(status) {
  const colors = {
    operational: 'bg-status-operational/10 text-status-operational border-status-operational/20',
    degraded: 'bg-status-degraded/10 text-status-degraded border-status-degraded/20',
    partial: 'bg-status-partial/10 text-status-partial border-status-partial/20',
    major: 'bg-status-major/10 text-status-major border-status-major/20',
  }
  return colors[status] || 'bg-gray-100 text-gray-600 border-gray-200'
}
