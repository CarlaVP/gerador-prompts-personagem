import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Shuffle, Download, Upload, Lock, Unlock } from 'lucide-react';

const COLORS = {
  paper: '#F7F3EC',
  card: '#FFFFFF',
  ink: '#2B2620',
  inkSoft: '#6B625A',
  plum: '#8C5B6E',
  plumSoft: '#B98CA0',
  sage: '#6B8F71',
  line: '#E4DCD0',
};

const PROPORTION_OPTIONS = ['vertical 9:16', 'quadrada 1:1', 'retrato 4:5', 'horizontal 16:9', 'retrato clássico 3:4'];

const STYLE_OPTIONS = [
  'render 3D cinematográfico estilizado, detalhado e original',
  'estilo fotorrealista',
  'estilo hiper-realista',
  'estilo ilustração digital',
  'estilo aquarela',
  'estilo anime',
  'estilo pintura a óleo',
  'estilo minimalista',
  'estilo cyberpunk',
  'estilo vintage/retrô',
  'estilo art déco',
  'estilo pop art',
  'estilo surrealista',
  'estilo low poly',
  'estilo pixel art',
  'estilo gótico',
  'estilo steampunk',
  'estilo fantasia sombria',
  'estilo cinematográfico',
  'estilo caricatura',
  'estilo desenho a lápis',
  'estilo colagem',
  'estilo glitch art',
  'estilo ukiyo-e (xilogravura japonesa)',
  'estilo bauhaus',
  'estilo synthwave/vaporwave',
];

const FRAME_OPTIONS = [
  'em corpo inteiro, centralizado e com espaço de segurança ao redor',
  'em close-up',
  'em plano detalhe (extreme close-up)',
  'em plano médio',
  'em plano americano (da cintura para cima)',
  'em plano geral (cenário amplo)',
  'vista aérea',
  'vista de drone',
  'em ângulo contra-plongée (de baixo)',
  'em plongée (de cima)',
  'em perfil (de lado)',
  'em três quartos',
  'vista traseira (de costas)',
  'em plano ponto de vista (POV)',
  'em plano over-the-shoulder',
  'vista isométrica',
  'em plano holandês (câmera inclinada)',
  'em plano frontal simétrico',
];

const LIGHT_OPTIONS = [
  'coerente com o ambiente',
  'luz natural',
  'luz de hora dourada',
  'luz de estúdio',
  'iluminação neon',
  'iluminação dramática',
  'luz suave e difusa',
];

const NEGATIVE_ITEMS = [
  { key: 'texto', label: 'texto', defaultOn: true },
  { key: 'legenda', label: 'legenda', defaultOn: true },
  { key: 'logotipo', label: 'logotipo', defaultOn: true },
  { key: 'marca-d’água', label: 'marca-d’água', defaultOn: true },
  { key: 'personagens extras', label: 'personagens extras', defaultOn: false },
  { key: 'membros extras', label: 'membros extras', defaultOn: true },
  { key: 'deformações', label: 'deformações', defaultOn: true },
];

const AUTOSAVE_KEY = 'gerador-prompts-personagem-autosave';

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function Select({ label, value, onChange, options, locked, onToggleLock }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label style={{ color: COLORS.ink, fontSize: '0.92rem', fontWeight: 600 }}>{label}</label>
        {onToggleLock && (
          <button
            onClick={onToggleLock}
            title={locked ? 'Travado — não muda ao sortear' : 'Destravado — muda ao sortear'}
            style={{ background: 'none', border: 'none', padding: '0.1rem', color: locked ? COLORS.plum : COLORS.inkSoft }}
          >
            {locked ? <Lock size={15} /> : <Unlock size={15} />}
          </button>
        )}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: COLORS.card,
          color: COLORS.ink,
          border: `1.5px solid ${COLORS.line}`,
          borderRadius: '0.7rem',
          padding: '0.7rem 0.85rem',
          fontSize: '0.95rem',
          width: '100%',
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ color: COLORS.ink, fontSize: '0.92rem', fontWeight: 600 }}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        style={{
          background: COLORS.card,
          color: COLORS.ink,
          border: `1.5px solid ${COLORS.line}`,
          borderRadius: '0.7rem',
          padding: '0.7rem 0.85rem',
          fontSize: '0.95rem',
          width: '100%',
          resize: 'vertical',
        }}
      />
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div
      style={{ color: COLORS.plum, fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 700, borderBottom: `1px solid ${COLORS.line}`, paddingBottom: '0.4rem' }}
      className="mb-3 mt-7"
    >
      {children}
    </div>
  );
}

export default function GeradorPromptsPersonagens() {
  const [nomePersonagem, setNomePersonagem] = useState('');

  const [proporcao, setProporcao] = useState(PROPORTION_OPTIONS[0]);
  const [enquadramento, setEnquadramento] = useState(FRAME_OPTIONS[0]);
  const [estilo, setEstilo] = useState(STYLE_OPTIONS[0]);

  const [identidade, setIdentidade] = useState('');
  const [figurino, setFigurino] = useState('');
  const [poseExpressao, setPoseExpressao] = useState('');

  const [cenario, setCenario] = useState('');
  const [iluminacao, setIluminacao] = useState(LIGHT_OPTIONS[0]);
  const [qualidade, setQualidade] = useState('');

  const [preservar, setPreservar] = useState('');
  const [evitar, setEvitar] = useState('');
  const [negativosAtivos, setNegativosAtivos] = useState(
    Object.fromEntries(NEGATIVE_ITEMS.map((n) => [n.key, n.defaultOn]))
  );
  const [outrosNegativos, setOutrosNegativos] = useState('');

  const [locks, setLocks] = useState({ proporcao: false, enquadramento: false, estilo: false, iluminacao: false });

  const [copiado, setCopiado] = useState(false);
  const [carregou, setCarregou] = useState(false);
  const fileInputRef = useRef(null);

  // carrega o último preenchimento salvo automaticamente, ao abrir o app
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTOSAVE_KEY);
      if (raw) {
        aplicarDados(JSON.parse(raw));
      }
    } catch (e) {
      // sem dados salvos ainda, tudo bem
    } finally {
      setCarregou(true);
    }
  }, []);

  // salva automaticamente a cada mudança
  useEffect(() => {
    if (!carregou) return;
    try {
      localStorage.setItem(
        AUTOSAVE_KEY,
        JSON.stringify({
          nomePersonagem,
          proporcao,
          enquadramento,
          estilo,
          identidade,
          figurino,
          poseExpressao,
          cenario,
          iluminacao,
          qualidade,
          preservar,
          evitar,
          negativosAtivos,
          outrosNegativos,
          locks,
        })
      );
    } catch (e) {
      console.error('Erro ao salvar automaticamente', e);
    }
  }, [carregou, nomePersonagem, proporcao, enquadramento, estilo, identidade, figurino, poseExpressao, cenario, iluminacao, qualidade, preservar, evitar, negativosAtivos, outrosNegativos, locks]);

  function aplicarDados(d) {
    if (!d) return;
    if (d.nomePersonagem !== undefined) setNomePersonagem(d.nomePersonagem);
    if (d.proporcao) setProporcao(d.proporcao);
    if (d.enquadramento) setEnquadramento(d.enquadramento);
    if (d.estilo) setEstilo(d.estilo);
    if (d.identidade !== undefined) setIdentidade(d.identidade);
    if (d.figurino !== undefined) setFigurino(d.figurino);
    if (d.poseExpressao !== undefined) setPoseExpressao(d.poseExpressao);
    if (d.cenario !== undefined) setCenario(d.cenario);
    if (d.iluminacao) setIluminacao(d.iluminacao);
    if (d.qualidade !== undefined) setQualidade(d.qualidade);
    if (d.preservar !== undefined) setPreservar(d.preservar);
    if (d.evitar !== undefined) setEvitar(d.evitar);
    if (d.negativosAtivos) setNegativosAtivos(d.negativosAtivos);
    if (d.outrosNegativos !== undefined) setOutrosNegativos(d.outrosNegativos);
    if (d.locks) setLocks(d.locks);
  }

  function toggleNegativo(key) {
    setNegativosAtivos((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleLock(key) {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const listaNegativos = [
    ...NEGATIVE_ITEMS.filter((n) => negativosAtivos[n.key]).map((n) => n.label),
    ...(outrosNegativos.trim() ? [outrosNegativos.trim()] : []),
  ];

  const partes = [
    `Imagem ${proporcao}, composição visual principal ${enquadramento}, ${estilo}.`,
    identidade.trim() && `${identidade.trim()}.`,
    figurino.trim() && `Figurino: ${figurino.trim()}.`,
    cenario.trim() && `Cenário: ${cenario.trim()}.`,
    poseExpressao.trim() && `Pose: ${poseExpressao.trim()}.`,
    `Iluminação ${iluminacao}${qualidade.trim() ? `, ${qualidade.trim()}` : ''}.`,
    preservar.trim() && `Preservar ${preservar.trim()}.`,
    evitar.trim() && `${evitar.trim()}.`,
    listaNegativos.length > 0 && `Sem ${listaNegativos.join(', ')}.`,
  ].filter(Boolean);

  const prompt = partes.join(' ');

  function copiar() {
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
      })
      .catch(() => setCopiado(false));
  }

  function surpreenda() {
    if (!locks.proporcao) setProporcao(pickRandom(PROPORTION_OPTIONS));
    if (!locks.enquadramento) setEnquadramento(pickRandom(FRAME_OPTIONS));
    if (!locks.estilo) setEstilo(pickRandom(STYLE_OPTIONS));
    if (!locks.iluminacao) setIluminacao(pickRandom(LIGHT_OPTIONS));
  }

  function salvarArquivo() {
    const dados = {
      nomePersonagem,
      proporcao,
      enquadramento,
      estilo,
      identidade,
      figurino,
      poseExpressao,
      cenario,
      iluminacao,
      qualidade,
      preservar,
      evitar,
      negativosAtivos,
      outrosNegativos,
    };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const nomeArquivo = (nomePersonagem.trim() || 'personagem').toLowerCase().replace(/\s+/g, '-');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nomeArquivo}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function carregarArquivo(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        aplicarDados(JSON.parse(event.target.result));
      } catch (err) {
        console.error('Arquivo inválido', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div style={{ background: COLORS.paper, minHeight: '100vh' }} className="w-full flex justify-center px-4 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .display { font-family: 'Fraunces', serif; }
        .body-f { font-family: 'Inter', ui-sans-serif, sans-serif; }
        select, textarea, input { font-family: 'Inter', ui-sans-serif, sans-serif; }
        select:focus, textarea:focus, input:focus { outline: none; border-color: ${COLORS.plum} !important; }
        button:focus-visible { outline: 2px solid ${COLORS.plum}; outline-offset: 2px; }
      `}</style>

      <div className="w-full body-f" style={{ maxWidth: '30rem', color: COLORS.ink }}>
        {/* header */}
        <div className="mb-2">
          <div style={{ color: COLORS.plum, fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 700 }}>
            GERADOR DE PROMPTS DE PERSONAGEM
          </div>
          <h1 className="display" style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '0.3rem', lineHeight: 1.15 }}>
            Monte o prompt completo
          </h1>
          <p style={{ color: COLORS.inkSoft, fontSize: '0.9rem', marginTop: '0.35rem', lineHeight: 1.5 }}>
            Preencha as seções abaixo. O que você digitar fica salvo automaticamente neste navegador.
          </p>
        </div>

        {/* nome + salvar/carregar */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label style={{ color: COLORS.ink, fontSize: '0.92rem', fontWeight: 600 }}>Nome do personagem</label>
            <input
              value={nomePersonagem}
              onChange={(e) => setNomePersonagem(e.target.value)}
              placeholder="Ex: Coco"
              style={{
                background: COLORS.card,
                color: COLORS.ink,
                border: `1.5px solid ${COLORS.line}`,
                borderRadius: '0.7rem',
                padding: '0.7rem 0.85rem',
                fontSize: '0.95rem',
                width: '100%',
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={salvarArquivo}
              style={{
                background: 'none',
                border: `1.5px solid ${COLORS.line}`,
                color: COLORS.ink,
                borderRadius: '0.7rem',
                padding: '0.6rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                flex: 1,
              }}
              className="flex items-center justify-center gap-2"
            >
              <Download size={15} />
              Salvar personagem
            </button>
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              style={{
                background: 'none',
                border: `1.5px solid ${COLORS.line}`,
                color: COLORS.ink,
                borderRadius: '0.7rem',
                padding: '0.6rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                flex: 1,
              }}
              className="flex items-center justify-center gap-2"
            >
              <Upload size={15} />
              Carregar personagem
            </button>
            <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={carregarArquivo} style={{ display: 'none' }} />
          </div>
          <p style={{ color: COLORS.inkSoft, fontSize: '0.72rem', lineHeight: 1.4 }}>
            "Salvar" baixa este personagem inteiro como um arquivo. "Carregar" reabre um personagem salvo antes — útil pra manter cada fruta (ou outro personagem) no seu próprio arquivo.
          </p>
        </div>

        {/* FORMATO */}
        <SectionTitle>I · FORMATO</SectionTitle>
        <div className="flex flex-col gap-4">
          <Select label="Proporção" value={proporcao} onChange={setProporcao} options={PROPORTION_OPTIONS} locked={locks.proporcao} onToggleLock={() => toggleLock('proporcao')} />
          <Select label="Enquadramento" value={enquadramento} onChange={setEnquadramento} options={FRAME_OPTIONS} locked={locks.enquadramento} onToggleLock={() => toggleLock('enquadramento')} />
          <Select label="Estilo de render" value={estilo} onChange={setEstilo} options={STYLE_OPTIONS} locked={locks.estilo} onToggleLock={() => toggleLock('estilo')} />
        </div>

        {/* PERSONAGEM */}
        <SectionTitle>II · PERSONAGEM</SectionTitle>
        <div className="flex flex-col gap-4">
          <TextArea
            label="Identidade (forma, material, traços)"
            value={identidade}
            onChange={setIdentidade}
            placeholder="Ex: um coco verde jovem antropomórfico, oval, casca lisa verde-clara, olhos e boca integrados naturalmente à superfície"
          />
          <TextArea
            label="Figurino e acessórios"
            value={figurino}
            onChange={setFigurino}
            placeholder="Ex: camisa floral aberta, colar de flores, óculos escuros"
          />
          <TextArea
            label="Pose e expressão"
            value={poseExpressao}
            onChange={setPoseExpressao}
            placeholder="Ex: punhos fechados, pés na areia, óculos levemente tortos de irritação"
          />
        </div>

        {/* CENA E QUALIDADE */}
        <SectionTitle>III · CENA E QUALIDADE</SectionTitle>
        <div className="flex flex-col gap-4">
          <TextArea label="Cenário" value={cenario} onChange={setCenario} placeholder="Ex: praia tropical vazia com palmeiras distantes e mar calmo" />
          <Select label="Iluminação" value={iluminacao} onChange={setIluminacao} options={LIGHT_OPTIONS} locked={locks.iluminacao} onToggleLock={() => toggleLock('iluminacao')} />
          <TextArea
            label="Qualidade e acabamento (opcional)"
            value={qualidade}
            onChange={setQualidade}
            placeholder="Ex: materiais nítidos, cores vivas, expressão cômica exagerada"
          />
        </div>

        {/* REGRAS E EXCLUSÕES */}
        <SectionTitle>IV · REGRAS E EXCLUSÕES</SectionTitle>
        <div className="flex flex-col gap-4">
          <TextArea
            label="O que preservar"
            value={preservar}
            onChange={setPreservar}
            placeholder="Ex: a forma, a cor e a textura reconhecíveis do personagem original"
          />
          <TextArea
            label="O que nunca deve acontecer"
            value={evitar}
            onChange={setEvitar}
            placeholder="Ex: não transformar a personagem em pessoa ou animal"
          />
          <div>
            <label style={{ color: COLORS.ink, fontSize: '0.92rem', fontWeight: 600 }} className="block mb-2">
              Prompt negativo
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {NEGATIVE_ITEMS.map((n) => (
                <button
                  key={n.key}
                  onClick={() => toggleNegativo(n.key)}
                  style={{
                    background: negativosAtivos[n.key] ? COLORS.plum : COLORS.card,
                    color: negativosAtivos[n.key] ? '#FFFFFF' : COLORS.inkSoft,
                    border: `1.5px solid ${negativosAtivos[n.key] ? COLORS.plum : COLORS.line}`,
                    borderRadius: '999px',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                  }}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <input
              value={outrosNegativos}
              onChange={(e) => setOutrosNegativos(e.target.value)}
              placeholder="Outros itens a excluir (opcional)"
              style={{
                background: COLORS.card,
                color: COLORS.ink,
                border: `1.5px solid ${COLORS.line}`,
                borderRadius: '0.7rem',
                padding: '0.65rem 0.85rem',
                fontSize: '0.9rem',
                width: '100%',
              }}
            />
          </div>
        </div>

        <button
          onClick={surpreenda}
          style={{
            background: 'none',
            border: `1.5px solid ${COLORS.plum}`,
            color: COLORS.plum,
            borderRadius: '0.7rem',
            padding: '0.7rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            width: '100%',
          }}
          className="flex items-center justify-center gap-2 mt-7"
        >
          <Shuffle size={16} />
          Sortear (campos travados não mudam)
        </button>

        {/* resultado */}
        <div
          style={{ background: COLORS.card, border: `1.5px solid ${COLORS.line}`, borderRadius: '1rem', padding: '1.1rem' }}
          className="mb-4 mt-6"
        >
          <div style={{ color: COLORS.plum, fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '0.6rem' }}>
            SEU PROMPT
          </div>
          <p style={{ color: COLORS.ink, fontSize: '0.95rem', lineHeight: 1.6 }}>{prompt}</p>
        </div>

        <button
          onClick={copiar}
          style={{
            background: copiado ? COLORS.sage : COLORS.plum,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '0.7rem',
            padding: '0.85rem',
            fontSize: '1rem',
            fontWeight: 700,
            width: '100%',
          }}
          className="flex items-center justify-center gap-2"
        >
          {copiado ? <Check size={18} /> : <Copy size={18} />}
          {copiado ? 'Copiado!' : 'Copiar prompt'}
        </button>
      </div>
    </div>
  );
}
