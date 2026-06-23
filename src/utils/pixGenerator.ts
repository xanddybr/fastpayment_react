// CRC-16/CCITT-FALSE — exigido pelo Banco Central para o payload PIX
function crc16(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) : crc << 1
    }
  }
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0')
}

function tlv(id: string, value: string): string {
  return id + String(value.length).padStart(2, '0') + value
}

function sanitize(str: string, maxLen: number): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // remove acentos
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .trim()
    .substring(0, maxLen)
}

export function gerarPixEMV(
  chave: string,
  nome: string,
  cidade: string,
  valor: number,
): string {
  const nomeSanitizado   = sanitize(nome, 25)
  const cidadeSanitizada = sanitize(cidade, 15)
  const txid             = 'GUG' + Date.now().toString().slice(-10)

  const merchant = tlv('26', tlv('00', 'BR.GOV.BCB.PIX') + tlv('01', chave))
  const addData  = tlv('62', tlv('05', txid))
  const amount   = valor.toFixed(2)

  let payload =
    tlv('00', '01') +
    tlv('01', '12') +
    merchant +
    tlv('52', '0000') +
    tlv('53', '986') +
    tlv('54', amount) +
    tlv('58', 'BR') +
    tlv('59', nomeSanitizado) +
    tlv('60', cidadeSanitizada) +
    addData +
    '6304'

  return payload + crc16(payload)
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
