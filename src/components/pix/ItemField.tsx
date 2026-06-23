interface ItemFieldProps {
  descricao: string
  quantidade: string
  valorUnitario: string
  onChange: (field: 'descricao' | 'quantidade' | 'valorUnitario', value: string) => void
}

function ItemField({ descricao, quantidade, valorUnitario, onChange }: ItemFieldProps) {
  return (
    <fieldset className="pix-fieldset">
      <legend className="pix-legend">Dados do pedido</legend>

      <div className="pix-field">
        <label className="pix-label" htmlFor="descricao">Descrição do item</label>
        <input
          id="descricao"
          className="pix-input"
          type="text"
          placeholder="Ex: Marmitex G + Refrigerante 2L"
          value={descricao}
          onChange={e => onChange('descricao', e.target.value)}
          maxLength={80}
        />
      </div>

      <div className="pix-row">
        <div className="pix-field">
          <label className="pix-label" htmlFor="quantidade">Quantidade</label>
          <input
            id="quantidade"
            className="pix-input"
            type="number"
            min="1"
            step="1"
            placeholder="1"
            value={quantidade}
            onChange={e => onChange('quantidade', e.target.value)}
          />
        </div>

        <div className="pix-field">
          <label className="pix-label" htmlFor="valorUnitario">Valor unitário (R$)</label>
          <input
            id="valorUnitario"
            className="pix-input"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            value={valorUnitario}
            onChange={e => onChange('valorUnitario', e.target.value)}
          />
        </div>
      </div>
    </fieldset>
  )
}

export { ItemField }
