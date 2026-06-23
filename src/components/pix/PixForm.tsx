import { useState, type FormEvent } from 'react'
import { ItemField } from './ItemField'
import { PhoneField } from './PhoneField'
import { PixResult } from './PixResult'
import { gerarPixEMV } from '../../utils/pixGenerator'
import { PIX_CONFIG } from '../../config/pixConfig'
import './PixForm.css'

interface FormState {
  nomeCliente: string
  descricao: string
  quantidade: string
  valorUnitario: string
  telefone: string
}

interface ResultState {
  pixCode: string
  nomeCliente: string
  telefone: string
  descricao: string
  quantidade: number
  valorTotal: number
}

const EMPTY_FORM: FormState = {
  nomeCliente: '',
  descricao: '',
  quantidade: '',
  valorUnitario: '',
  telefone: '',
}

function PixForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [result, setResult] = useState<ResultState | null>(null)
  const [error, setError] = useState('')

  function handleFieldChange(
    field: 'descricao' | 'quantidade' | 'valorUnitario',
    value: string,
  ) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  function handlePhoneChange(value: string) {
    setForm(prev => ({ ...prev, telefone: value }))
    setError('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const qtd   = parseInt(form.quantidade, 10)
    const valor = parseFloat(form.valorUnitario)
    const tel   = form.telefone.replace(/\D/g, '')

    if (!form.nomeCliente.trim()) return setError('Informe o nome do cliente.')
    if (!form.descricao.trim()) return setError('Informe a descrição do item.')
    if (!qtd || qtd < 1)        return setError('Quantidade deve ser ao menos 1.')
    if (!valor || valor <= 0)   return setError('Informe um valor válido.')
    if (tel.length < 10)        return setError('Informe o WhatsApp com DDD (ex: 11 99999-9999).')
    if (PIX_CONFIG.chave === 'SUA_CHAVE_PIX_AQUI')
      return setError('Configure sua chave PIX em src/config/pixConfig.ts antes de usar.')

    const valorTotal = parseFloat((qtd * valor).toFixed(2))
    const pixCode    = gerarPixEMV(PIX_CONFIG.chave, PIX_CONFIG.nome, PIX_CONFIG.cidade, valorTotal)

    setResult({
      pixCode,
      nomeCliente: form.nomeCliente.trim(),
      telefone: form.telefone,
      descricao: form.descricao.trim(),
      quantidade: qtd,
      valorTotal,
    })
  }

  function handleReset() {
    setResult(null)
    setForm(EMPTY_FORM)
    setError('')
  }

  return (
    <div className="pix-wrapper">
      <div className="pix-header">
        <span className="pix-header-emoji">🍽️</span>
        <h2>Delicias do Guguinha</h2>
        <p>Gere o PIX e envie direto no WhatsApp do cliente</p>
      </div>

      <div className="pix-card">
        {result ? (
          <PixResult {...result} onReset={handleReset} />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="pix-field">
              <label className="pix-label" htmlFor="nomeCliente">Nome do cliente</label>
              <input
                id="nomeCliente"
                className="pix-input"
                type="text"
                placeholder="Ex: Maria Silva"
                value={form.nomeCliente}
                onChange={e => { setForm(prev => ({ ...prev, nomeCliente: e.target.value })); setError('') }}
              />
            </div>

            <hr className="pix-divider" />

            <ItemField
              descricao={form.descricao}
              quantidade={form.quantidade}
              valorUnitario={form.valorUnitario}
              onChange={handleFieldChange}
            />

            <hr className="pix-divider" />

            <PhoneField value={form.telefone} onChange={handlePhoneChange} />

            {error && <p className="pix-error">{error}</p>}

            <button type="submit" className="pix-btn-submit" style={{ marginTop: '20px' }}>
              ⚡ Gerar PIX Copia e Cola
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export { PixForm }
