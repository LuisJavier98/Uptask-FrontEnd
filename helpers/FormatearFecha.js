export default function formatearFecha(fecha) {
  const date = new Date(fecha.split('T')[0].split('-'))
  const options = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }
  return date.toLocaleDateString('es-ES', options)
}