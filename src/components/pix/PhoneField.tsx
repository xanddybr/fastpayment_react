import type { ChangeEvent } from 'react'

interface PhoneFieldProps {
  value: string
  onChange: (value: string) => void
}

function applyPhoneMask(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2)  return digits.replace(/(\d{0,2})/, '($1')
  if (digits.length <= 6)  return digits.replace(/(\d{2})(\d{0,4})/, '($1) $2')
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

function PhoneField({ value, onChange }: PhoneFieldProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(applyPhoneMask(e.target.value))
  }

  return (
    <div className="pix-field">
      <label className="pix-label" htmlFor="telefone">
        WhatsApp do cliente <span className="pix-label-hint">(com DDD)</span>
      </label>
      <input
        id="telefone"
        className="pix-input"
        type="tel"
        placeholder="(11) 99999-9999"
        value={value}
        onChange={handleChange}
        maxLength={15}
        inputMode="numeric"
      />
    </div>
  )
}

export { PhoneField }
