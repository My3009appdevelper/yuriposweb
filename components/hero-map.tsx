export function HeroMap() {
  return (
    <div className="hero-map-shell">
      <div className="hero-map-caption">
        <span className="hero-map-pulse" aria-hidden="true" />
        Un sistema conectado
      </div>
      <svg
        className="hero-map hero-map-desktop"
        viewBox="0 0 620 500"
        role="img"
        aria-labelledby="hero-map-title hero-map-description"
      >
        <title id="hero-map-title">Mapa operativo de Yuri POS</title>
        <desc id="hero-map-description">
          Venta, inventario, compras, caja y reportes conectados alrededor de la operación del negocio.
        </desc>
        <defs>
          <linearGradient id="map-glow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#00B1FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00B1FF" stopOpacity="0" />
          </linearGradient>
          <filter id="map-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="16" floodColor="#10212B" floodOpacity="0.14" stdDeviation="14" />
          </filter>
        </defs>
        <circle cx="320" cy="250" r="185" fill="url(#map-glow)" />
        <path className="hero-map-line" d="M174 145 C234 156 244 189 276 211" />
        <path className="hero-map-line" d="M448 143 C387 159 376 191 345 211" />
        <path className="hero-map-line" d="M160 370 C227 345 246 307 276 288" />
        <path className="hero-map-line" d="M455 363 C395 345 378 311 346 289" />
        <path className="hero-map-line hero-map-line-dashed" d="M308 205 C287 158 299 121 319 90" />
        <g filter="url(#map-shadow)">
          <rect className="hero-map-center" x="247" y="211" width="146" height="80" rx="20" />
          <text className="hero-map-center-label" x="320" y="244" textAnchor="middle">YURI POS</text>
          <text className="hero-map-center-subtitle" x="320" y="266" textAnchor="middle">operación en contexto</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="89" y="98" width="136" height="70" rx="17" />
          <circle cx="113" cy="123" r="12" />
          <text x="136" y="124">VENTA</text>
          <text className="hero-map-node-detail" x="136" y="145">caja y clientes</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="397" y="98" width="136" height="70" rx="17" />
          <circle cx="421" cy="123" r="12" />
          <text x="444" y="124">INVENTARIO</text>
          <text className="hero-map-node-detail" x="444" y="145">existencias y lotes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="79" y="334" width="148" height="70" rx="17" />
          <circle cx="103" cy="359" r="12" />
          <text x="126" y="360">COMPRAS</text>
          <text className="hero-map-node-detail" x="126" y="381">proveedores y órdenes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="393" y="329" width="148" height="70" rx="17" />
          <circle cx="417" cy="354" r="12" />
          <text x="440" y="355">REPORTES</text>
          <text className="hero-map-node-detail" x="440" y="376">KPIs y decisiones</text>
        </g>
        <g className="hero-map-node hero-map-node-red">
          <rect x="253" y="40" width="134" height="63" rx="17" />
          <circle cx="277" cy="63" r="11" />
          <text x="299" y="66">CAJA</text>
          <text className="hero-map-node-detail" x="299" y="84">turnos y cortes</text>
        </g>
      </svg>
      <svg
        className="hero-map hero-map-mobile"
        viewBox="0 0 420 500"
        role="img"
        aria-labelledby="hero-map-mobile-title hero-map-mobile-description"
      >
        <title id="hero-map-mobile-title">Mapa operativo de Yuri POS</title>
        <desc id="hero-map-mobile-description">
          Venta, inventario, compras, caja y reportes conectados alrededor de la operación del negocio.
        </desc>
        <defs>
          <linearGradient id="map-glow-mobile" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#00B1FF" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00B1FF" stopOpacity="0" />
          </linearGradient>
          <filter id="map-shadow-mobile" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" floodColor="#10212B" floodOpacity="0.14" stdDeviation="10" />
          </filter>
        </defs>
        <circle cx="210" cy="266" r="158" fill="url(#map-glow-mobile)" />
        <path className="hero-map-line hero-map-mobile-line" d="M100 151 C145 177 170 202 188 228" />
        <path className="hero-map-line hero-map-mobile-line" d="M320 151 C275 177 250 202 232 228" />
        <path className="hero-map-line hero-map-mobile-line" d="M100 393 C145 366 170 340 188 312" />
        <path className="hero-map-line hero-map-mobile-line" d="M320 393 C275 366 250 340 232 312" />
        <path className="hero-map-line hero-map-line-dashed hero-map-mobile-line" d="M210 216 C210 170 210 132 210 108" />
        <g filter="url(#map-shadow-mobile)">
          <rect className="hero-map-center" x="120" y="228" width="180" height="84" rx="20" />
          <text className="hero-map-center-label" x="210" y="263" textAnchor="middle">YURI POS</text>
          <text className="hero-map-center-subtitle" x="210" y="287" textAnchor="middle">operación en contexto</text>
        </g>
        <g className="hero-map-node hero-map-node-red">
          <rect x="136" y="30" width="148" height="70" rx="18" />
          <circle cx="161" cy="56" r="12" />
          <text x="184" y="59">CAJA</text>
          <text className="hero-map-node-detail" x="184" y="81">turnos y cortes</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="14" y="112" width="172" height="72" rx="18" />
          <circle cx="40" cy="139" r="12" />
          <text x="63" y="142">VENTA</text>
          <text className="hero-map-node-detail" x="63" y="164">caja y clientes</text>
        </g>
        <g className="hero-map-node hero-map-node-cyan">
          <rect x="234" y="112" width="172" height="72" rx="18" />
          <circle cx="260" cy="139" r="12" />
          <text x="283" y="142">INVENTARIO</text>
          <text className="hero-map-node-detail" x="283" y="164">existencias y lotes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="14" y="358" width="172" height="72" rx="18" />
          <circle cx="40" cy="385" r="12" />
          <text x="63" y="388">COMPRAS</text>
          <text className="hero-map-node-detail" x="63" y="410">proveedores y órdenes</text>
        </g>
        <g className="hero-map-node hero-map-node-neutral">
          <rect x="234" y="358" width="172" height="72" rx="18" />
          <circle cx="260" cy="385" r="12" />
          <text x="283" y="388">REPORTES</text>
          <text className="hero-map-node-detail" x="283" y="410">KPIs y decisiones</text>
        </g>
      </svg>
    </div>
  );
}
