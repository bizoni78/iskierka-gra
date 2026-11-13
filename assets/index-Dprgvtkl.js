(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();function at(r){const a=r.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!a)return null;const e={floatBuf:!!a.getExtension("EXT_color_buffer_float"),halfBuf:!!a.getExtension("EXT_color_buffer_half_float")};return a.ext=e,a.bezFloat=new URLSearchParams(location.search).has("rgba8"),a.domyslnyVAO=a.createVertexArray(),a.bindVertexArray(a.domyslnyVAO),a}function Ta(r,a,e,i){const t=r.createShader(a);if(r.shaderSource(t,e),r.compileShader(t),!r.getShaderParameter(t,r.COMPILE_STATUS)){const o=r.getShaderInfoLog(t),s=e.split(`
`).map((n,l)=>`${l+1}: ${n}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return t}const q=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class R{constructor(a,e,i,t="program"){this.gl=a,this.nazwa=t;const o=a.createProgram();if(a.attachShader(o,Ta(a,a.VERTEX_SHADER,e,t+".vs")),a.attachShader(o,Ta(a,a.FRAGMENT_SHADER,i,t+".fs")),a.linkProgram(o),!a.getProgramParameter(o,a.LINK_STATUS))throw new Error(`Program "${t}" się nie zlinkował: ${a.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let n=0;n<s;n++){const l=a.getActiveUniform(o,n),h=l.name.replace(/\[0\]$/,"");this.u[h]=a.getUniformLocation(o,l.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(a,e,i,t,o){const s=this.gl,n=this.u[a];return n==null?this:(o!==void 0?s.uniform4f(n,e,i,t,o):t!==void 0?s.uniform3f(n,e,i,t):i!==void 0?s.uniform2f(n,e,i):s.uniform1f(n,e),this)}i(a,e){const i=this.u[a];return i!=null&&this.gl.uniform1i(i,e),this}fv(a,e,i){const t=this.gl,o=this.u[a];return o==null?this:(e===1?t.uniform1fv(o,i):e===2?t.uniform2fv(o,i):e===3?t.uniform3fv(o,i):t.uniform4fv(o,i),this)}tex(a,e,i){const t=this.gl,o=this.u[a];return o==null?this:(t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,i),t.uniform1i(o,e),this)}}function ma(r,a,e,i={}){const{wewn:t=r.RGBA8,format:o=r.RGBA,typ:s=r.UNSIGNED_BYTE,dane:n=null,filtr:l=r.LINEAR,zawijanieS:h=r.CLAMP_TO_EDGE,zawijanieT:u=r.CLAMP_TO_EDGE,mipmapy:c=!1}=i,f=r.createTexture();return r.bindTexture(r.TEXTURE_2D,f),r.texImage2D(r.TEXTURE_2D,0,t,a,e,0,o,s,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,c?r.LINEAR_MIPMAP_LINEAR:l),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,l),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,h),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,u),c&&r.generateMipmap(r.TEXTURE_2D),f}function tt(r,a=!1){return r.ext.floatBuf&&!r.bezFloat?a?{wewn:r.RGBA16F,format:r.RGBA,typ:r.HALF_FLOAT}:{wewn:r.R11F_G11F_B10F,format:r.RGB,typ:r.HALF_FLOAT}:{wewn:r.RGBA8,format:r.RGBA,typ:r.UNSIGNED_BYTE}}class W{constructor(a,e,i,t,o={}){this.gl=a,this.formaty=Array.isArray(t)?t:[t],this.opcje=o,this.fbo=a.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(e,i)}rozmiar(a,e){if(a=Math.max(1,Math.round(a)),e=Math.max(1,Math.round(e)),a===this.w&&e===this.h)return;const i=this.gl;this.w=a,this.h=e;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>ma(i,a,e,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const t=i.checkFramebufferStatus(i.FRAMEBUFFER);if(t!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+t.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,this.fbo),a.viewport(0,0,this.w,this.h)}}function Ka(r,a,e){r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,a,e)}function U(r){r.drawArrays(r.TRIANGLES,0,3)}const Q=1/120;class et{constructor({krok:a,rysuj:e}){this.krok=a,this.rysuj=e,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(a){if(!this.dziala)return;const e=(a-this.ostatni)/1e3;this.ostatni=a;const i=Math.min(e,.1);if(!this.pauza){this.zapas+=i;let t=0;for(;this.zapas>=Q&&t<16;)this.krok(Q),this.zapas-=Q,t++;t===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/Q,e),this._klatki++,this._okno+=e,this.historiaMs.push(e*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(a){const e=Math.round(a/Q);for(let i=0;i<e;i++)this.krok(Q)}}const X=new URLSearchParams(location.search),ca=(r,a)=>{const e=parseFloat(X.get(r));return Number.isFinite(e)?e:a},j={ziarno:Math.floor(ca("ziarno",1)),maZiarno:X.has("ziarno"),kraina:X.get("kraina"),x:X.has("x")?ca("x",0):null,dy:ca("dy",0),dx:ca("dx",0),debug:X.has("debug"),test:X.has("test"),warstwa:X.get("warstwa")||"wszystko",jakosc:X.get("jakosc"),maska:X.has("maska")};function ra(r,a){const e=new URL(location.href);a==null?e.searchParams.delete(r):e.searchParams.set(r,a),history.replaceState(null,"",e)}function Xa(r){return()=>{r|=0,r=r+1831565813|0;let a=Math.imul(r^r>>>15,1|r);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function ta(r,a=0,e=0){let i=Math.imul(r|0,668265261)^Math.imul(a|0,374761393)^Math.imul(e|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function ia(r,a=0,e=0){return Xa(ta(r,a,e)*4294967296|0)}const it=r=>r*r*(3-2*r);function ot(r,a=0){const e=Math.floor(r),i=r-e;return ta(e,a)+(ta(e+1,a)-ta(e,a))*it(i)}function B(r,a=0,e=4){let i=0,t=.5,o=0;for(let s=0;s<e;s++)i+=t*ot(r,a+s*17),o+=t,r*=2.03,t*=.5;return i/o}const st=(r,a,e)=>Math.max(a,Math.min(e,r)),la=(r,a,e)=>{const i=st((e-r)/(a-r),0,1);return i*i*(3-2*i)};function rt(r,a,e){const i=new Float32Array(a*a);for(let s=0;s<i.length;s++)i[s]=ta(s,e,a);const t=new Float32Array(r*r),o=a/r;for(let s=0;s<r;s++){const n=s*o,l=Math.floor(n);let h=n-l;h=h*h*(3-2*h);const u=l%a*a,c=(l+1)%a*a;for(let f=0;f<r;f++){const k=f*o,p=Math.floor(k);let m=k-p;m=m*m*(3-2*m);const d=p%a,y=(p+1)%a,z=i[u+d],v=i[u+y],_=i[c+d],g=i[c+y];t[s*r+f]=z+(v-z)*m+(_+(g-_)*m-z-(v-z)*m)*h}}return t}function wa(r,a,e,i){const t=new Float32Array(r*r);let o=.5,s=0;for(let n=0;n<e;n++){const l=a<<n;if(l>r)break;const h=rt(r,l,i+n*101);for(let u=0;u<t.length;u++)t[u]+=h[u]*o;s+=o,o*=.5}for(let n=0;n<t.length;n++)t[n]/=s;return t}function nt(r,a=256){const e=wa(a,4,5,11),i=wa(a,4,5,57),t=wa(a,16,4,93),o=new Uint8Array(a*a*4);for(let s=0;s<a*a;s++)o[s*4]=e[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=t[s]*255,o[s*4+3]=ta(s,7)*255;return ma(r,a,a,{dane:o,zawijanieS:r.REPEAT,zawijanieT:r.REPEAT,mipmapy:!0})}const T=`#version 300 es
precision highp float;
precision highp sampler2D;
`,da=`
uniform vec2 uCam;
uniform vec2 uPol;
uniform vec2 uRes;
uniform float uCzas;
uniform sampler2D uSzum;
vec2 swiatZUv(vec2 uv){ return uCam + (uv * 2.0 - 1.0) * uPol; }
float kleby(vec2 p){ return texture(uSzum, p).r; }
float kleby2(vec2 p){ return texture(uSzum, p).g; }
float faktura(vec2 p){ return texture(uSzum, p).b; }
`,ct=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,lt=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,ut=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv + uPx * vec2(-2, 0)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 2, 0)).rgb;
  s += texture(uTex, vUv + uPx * vec2(0, -2)).rgb;
  s += texture(uTex, vUv + uPx * vec2(0,  2)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb * 2.0;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb * 2.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb * 2.0;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb * 2.0;
  o = vec4(s / 12.0, 1.0);
}`,ht=T+`
in vec2 vUv; out vec4 o;
uniform sampler2D uSwiat, uGlow, uSzum;
uniform vec2 uRes; uniform float uCzas; uniform float uTryb; uniform float uZiarno;
vec3 ton(vec3 c){
  // Kompresja jasności liczona od najjaśniejszego kanału: proporcje kanałów (a więc barwa
  // i nasycenie) zostają, więc nic nie „wypala się” do bieli.
  float m = max(c.r, max(c.g, c.b));
  float k = (1.0 - exp(-m * 1.25)) / max(m, 1e-4);
  return c * k;
}
void main(){
  vec3 c = texture(uSwiat, vUv).rgb;
  vec3 g = texture(uGlow, vUv).rgb;
  // tam, gdzie pada barwne światło, blada mgła lekko ustępuje — tęcza zostaje nasycona także w jasnych krainach
  if (uTryb < 0.5) { float tm = min(max(g.r, max(g.g, g.b)) * 1.6, 1.0); c = c * (1.0 - 0.38 * tm) + g * 0.85; }
  else if (uTryb > 2.5) c = g;
  c = ton(max(c, 0.0));
  c = pow(c, vec3(0.92));
  vec2 v = vUv - 0.5;
  c *= 1.0 - 0.55 * dot(v, v);
  float z = texture(uSzum, gl_FragCoord.xy / 256.0 + fract(vec2(uCzas * 7.13, uCzas * 3.71))).a - 0.5;
  c += z * uZiarno * (0.6 + 0.4 * (1.0 - min(1.0, dot(c, vec3(0.5)))));
  o = vec4(c, 1.0);
}`,ft=T+da+`
in vec2 vUv; out vec4 o;
uniform vec3 uGora, uDol, uMgla, uMgla2;
uniform vec4 uNiebo;     // tarcza księżyca, czarne słońce z obręczą, zorza, gwiazdy
uniform vec2 uCialo;     // położenie ciała niebieskiego na ekranie
uniform float uPoswiata;
void main(){
  vec2 s = (vUv * 2.0 - 1.0) * vec2(uPol.x / uPol.y, 1.0);
  float hy = -0.22 - (uCam.y - 5.3) * 0.012;
  float t = s.y - hy;
  float k1 = kleby(vec2(s.x * 0.11 + uCam.x * 0.0012 + uCzas * 0.0012, s.y * 0.16));
  float k2 = kleby2(vec2(s.x * 0.3 + uCam.x * 0.003 - uCzas * 0.002, s.y * 0.4 + 0.3));
  float k3 = kleby2(vec2(s.x * 0.05 - uCam.x * 0.0008, s.y * 0.09 + uCzas * 0.0009));
  // trzy tony: świetlisty horyzont, pośredni ton „daleki”, głęboka ciemność u góry
  vec3 hor = mix(uMgla, uMgla2, 0.3) * 0.25;
  vec3 srodek = mix(uGora, uMgla2 * 0.085, 0.75);
  vec3 col = mix(hor, srodek, smoothstep(-0.12, 0.55, t + (k1 - 0.5) * 0.4));
  col = mix(col, uGora, smoothstep(0.35, 1.25, t + (k3 - 0.5) * 0.5));
  // ławice mgły: dwa pasma kłębów o różnej skali i paralaksie
  float lawica = smoothstep(0.42, 0.74, kleby(vec2(s.x * 0.06 + uCam.x * 0.0009 + uCzas * 0.0008, s.y * 0.22 + 0.1)));
  col += uMgla2 * 0.050 * lawica * smoothstep(1.3, 0.2, t) * smoothstep(-0.2, 0.3, t);
  float lawica2 = smoothstep(0.48, 0.8, kleby2(vec2(s.x * 0.13 + uCam.x * 0.002 - uCzas * 0.0015, s.y * 0.5)));
  col += uMgla * 0.045 * lawica2 * smoothstep(0.9, 0.0, t);
  col *= 0.8 + 0.4 * k1;
  // łuna: rozproszone światło gdzieś za horyzontem — podświetla sylwetki od tyłu
  vec2 dl = s - uCialo;
  float rl = length(dl * vec2(0.75, 1.0));
  col += mix(uMgla, vec3(1.0), 0.22) * uPoswiata * (0.15 * exp(-rl * 1.7) + 0.055 * exp(-rl * 0.65)) * (0.75 + 0.5 * k2);
  col *= mix(0.6, 1.0, smoothstep(-0.9, -0.1, t));

  vec2 d = s - uCialo; float r = length(d);
  // księżyc za mgłą: miękka tarcza z szeroką poświatą
  col += uNiebo.x * vec3(0.72, 0.85, 1.0) * (smoothstep(0.27, 0.19, r) * 0.20 * (0.7 + 0.6 * k2) + 0.15 * exp(-r * 2.1));
  // czarne słońce: ciemna tarcza i blada, nierówna obręcz
  float kat = atan(d.y, d.x);
  float kor = exp(-abs(r - 0.30) * 24.0) * (0.6 + 0.8 * kleby(vec2(kat * 0.22, uCzas * 0.008)));
  col = mix(col, col * 0.2, uNiebo.y * smoothstep(0.31, 0.27, r));
  col += uNiebo.y * vec3(0.95, 0.86, 1.0) * (kor * 0.55 + 0.11 * exp(-max(r - 0.3, 0.0) * 2.6));
  // zorza: pionowe zasłony światła
  float fa = kleby(vec2(s.x * 0.07 + uCam.x * 0.0015, uCzas * 0.004));
  float zas = kleby2(vec2(s.x * 0.9 + fa * 1.5, s.y * 0.05 + uCzas * 0.006));
  float pas = smoothstep(0.35, 0.7, fa) * smoothstep(-0.05, 0.25, t) * smoothstep(1.25, 0.3, t);
  vec3 zk = mix(vec3(0.95, 0.45, 0.85), vec3(0.45, 0.75, 1.0), smoothstep(0.1, 0.9, t + (zas - 0.5) * 0.6));
  col += uNiebo.z * zk * pas * (0.3 + 0.9 * zas) * 0.30;
  // gwiazdy
  vec2 g = s * 36.0 + vec2(uCam.x * 0.02, 0.0); vec2 gi = floor(g), gf = fract(g) - 0.5;
  float hs = fract(sin(dot(gi, vec2(127.1, 311.7))) * 43758.5);
  float gw = step(0.93, hs) * smoothstep(0.24, 0.0, length(gf - (vec2(fract(hs * 13.0), fract(hs * 29.0)) - 0.5) * 0.5))
    * (0.55 + 0.45 * sin(uCzas * (0.6 + hs * 2.0) + hs * 40.0));
  col += uNiebo.w * gw * 0.34 * smoothstep(0.0, 0.5, t) * (1.0 - k1 * 0.8);
  o = vec4(col, 1.0);
}`,Ya=`
in vec2 vUv; out vec4 o;
uniform sampler2D uKafle, uKafle2, uSwiatlo;
uniform vec2 uCamL;
uniform float uLz;
uniform vec3 uKafelPar;      // 1/(4 × szerokość kafla), y0, 1/wysokość
uniform vec3 uMglaL, uMglaP; // barwa mgły na lewym i prawym brzegu ekranu
uniform vec3 uMgla2;          // drugi, „daleki” ton mgły
uniform vec4 uAtm;           // zamglenie, gęstość mgły, światło otoczenia, wpływ iskierki
uniform vec3 uIskra;         // x, y, zasięg światła
uniform vec3 uBarwaSw;       // barwa światła iskierki
uniform vec3 uEmis;
uniform vec4 uPogoda;        // wiatr, snopy światła, mglistość, —
uniform vec3 uSwNieba;       // kierunek do światła nieba (xy) i jego siła
uniform vec2 uGruntY;        // wysokość ziemi planu gry na lewym i prawym brzegu ekranu
float krag(vec2 pw, out vec2 Ld, out float R){
  vec2 L = uIskra.xy - pw; float dist = length(L);
  Ld = L / max(dist, 1e-3);
  float kat = atan(-L.y, -L.x);
  R = uIskra.z * (1.0 + 0.07 * sin(kat * 3.0 + uCzas * 0.5) + 0.05 * sin(kat * 5.0 - uCzas * 0.37) + 0.04 * sin(kat * 2.0 + uCzas * 0.23));
  float r = dist / R;
  return exp(-r * r);
}
`,pt=T+da+Ya+`
uniform float uJasnosc;
void main(){
  vec2 pw = swiatZUv(vUv);
  vec2 pl = uCamL + (vUv * 2.0 - 1.0) * uPol * uLz;
  float wys = pl.y / uLz;                       // wysokość nad linią ziemi warstwy
  float kolys = 0.0;
  if (uPogoda.x > 0.01) kolys = (kleby(vec2(pl.x * 0.021 / uLz + uCzas * 0.035, pl.y * 0.03 / uLz)) - 0.5) * uPogoda.x * uLz * 0.12 * smoothstep(0.5, 7.0, wys);
  vec2 uvk = vec2((pl.x + kolys) * uKafelPar.x, (pl.y - uKafelPar.y) * uKafelPar.z);
  vec4 t = texture(uKafle, uvk), t2 = texture(uKafle2, uvk);
  float pok = t.a;
  vec3 mg = mix(uMglaL, uMglaP, vUv.x);
  vec2 n = pok > 0.02 ? (t2.rg / pok) * 2.0 - 1.0 : vec2(0.0);
  vec2 mm = texture(uSzum, pl * 0.045 / uLz + vec2(uCzas * 0.004, -uCzas * 0.002)).rg;
  float m1 = mm.r, m2 = mm.g;

  // światło nieba ślizga się po krawędziach sylwetek
  float rant = max(dot(n, uSwNieba.xy), 0.0) * uSwNieba.z;
  // mgła na głębokości tej warstwy: im dalej, tym jaśniejsza i bardziej w „dalekim” tonie
  float przyZiemi = exp(-max(wys, 0.0) / 2.4);
  vec3 barwaMgly = mix(mg, uMgla2, uAtm.x * 0.7) * uJasnosc * (0.72 + 0.56 * m1) * (1.0 + 0.5 * przyZiemi);
  vec3 c = t.rgb * mg * (uAtm.z * 0.05) + barwaMgly * pok * rant * 0.9;
  // zamglenie: im dalej i im bliżej ziemi, tym bardziej sylwetka tonie we mgle
  float zam = clamp(uAtm.x * (1.0 + 0.3 * przyZiemi), 0.0, 0.97);
  c = mix(c, barwaMgly * pok, zam);
  // świecenie własne (kryształy)
  c += (t.rgb / max(pok, 0.02)) * uEmis * t2.b * (1.0 - zam * 0.6) * (0.85 + 0.15 * sin(uCzas * 0.6 + pl.x * 0.3 / uLz));
  // światło iskierki i tęcz
  float blask = 0.0; vec3 tecza = vec3(0.0);
  if (uAtm.w > 0.001) {
    vec2 Ld; float R; blask = krag(pw, Ld, R);
    tecza = texture(uSwiatlo, vUv).rgb;
    c += t.rgb * (uBarwaSw * blask * 1.5 + tecza * 1.6) * uAtm.w * (0.75 + 1.3 * max(dot(n, Ld), 0.0));
  }
  // płachta mgły przed poprzednią warstwą, a za tą; snopy światła z góry
  float gest = clamp(uAtm.y * uPogoda.z * (0.12 + 0.88 * przyZiemi) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = barwaMgly * 1.1 + (mg * blask * 0.20 + tecza * (0.25 + 0.5 * m1)) * uAtm.w;
  vec3 dodane = vec3(0.0);
  if (uPogoda.y > 0.01) {
    float sn = kleby(vec2((pl.x + pl.y * 0.38) * 0.045 / uLz + uCzas * 0.0015, 0.37 + uLz * 0.3));
    dodane = mix(mg, vec3(1.0), 0.25) * smoothstep(0.50, 0.72, sn) * smoothstep(-1.5, 6.0, wys) * uPogoda.y * uJasnosc * 0.55 * (0.5 + m2);
  }
  o = vec4(mglaC * gest * (1.0 - pok) + dodane * (1.0 - pok * 0.7) + c, 1.0 - (1.0 - gest) * (1.0 - pok));
}`,kt=T+da+`
in vec2 vUv; out vec4 o;
uniform sampler2D uKafle, uSwiatlo;
uniform vec2 uCamL; uniform float uLz; uniform vec3 uKafelPar, uMglaL, uMglaP, uIskra;
void main(){
  vec2 pl = uCamL + (vUv * 2.0 - 1.0) * uPol * uLz;
  float pok = texture(uKafle, vec2(pl.x * uKafelPar.x, (pl.y - uKafelPar.y) * uKafelPar.z)).a;
  if (pok < 0.004) discard;
  vec2 L = uIskra.xy - swiatZUv(vUv); float r = length(L) / uIskra.z;
  float kraw = pok * (1.0 - pok) * 4.0;
  vec3 c = mix(uMglaL, uMglaP, vUv.x) * kraw * (exp(-r * r) * 0.20 + 0.012);
  if (kraw > 0.02) c += texture(uSwiatlo, vUv).rgb * kraw * 0.4;
  o = vec4(c, pok);
}`,mt=T+da+Ya+`
uniform sampler2D uTlo;    // niebo i cztery dalsze plany — tło kadru i zarazem to, co odbija woda
uniform vec3 uWoda;          // poziom, obecność na lewym i prawym brzegu ekranu
void main(){
  vec2 pw = swiatZUv(vUv);
  vec2 uvk = vec2(pw.x * uKafelPar.x, (pw.y - uKafelPar.y) * uKafelPar.z);
  vec4 t = texture(uKafle, uvk), t2 = texture(uKafle2, uvk);
  float pok = t.a;
  vec3 mg = mix(uMglaL, uMglaP, vUv.x);
  vec2 Ld; float R; float blask = krag(pw, Ld, R);
  vec3 tecza = texture(uSwiatlo, vUv).rgb;
  vec2 n = pok > 0.02 ? (t2.rg / pok) * 2.0 - 1.0 : vec2(0.0);
  float nz = sqrt(max(1.0 - dot(n, n), 0.0));
  float lam = max(dot(vec3(n, nz), normalize(vec3(Ld, 0.6))), 0.0);
  float rant = pow(max(dot(n, Ld), 0.0), 2.0);
  vec3 c = t.rgb * uBarwaSw * blask * (0.30 + 1.5 * lam + 1.0 * rant);
  c += t.rgb * tecza * (0.9 + 1.2 * lam);
  c += t.rgb * mg * uAtm.z * 0.1;
  c += (t.rgb / max(pok, 0.02)) * uEmis * t2.b * (0.7 + 0.3 * sin(uCzas * 0.7 + pw.x * 0.6));

  float grunt = mix(uGruntY.x, uGruntY.y, vUv.x);
  float wys = pw.y - grunt;
  vec2 mm = texture(uSzum, pw * 0.06 + vec2(uCzas * 0.006, -uCzas * 0.003)).rg;
  float m1 = mm.r, m2 = mm.g;
  float gest = clamp(uAtm.y * uPogoda.z * (0.10 + 0.9 * exp(-max(wys, 0.0) / 2.4)) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = mg * (0.05 + 0.03 * m2) + mg * blask * (0.30 + 0.5 * m1) + tecza * (0.3 + 0.6 * m1);
  // samo powietrze też lekko świeci wokół iskierki
  vec3 powietrze = mg * blask * 0.085 * (0.5 + m1) + tecza * (0.34 + 0.26 * m1);
  float tm = min(max(tecza.r, max(tecza.g, tecza.b)) * 1.5, 1.0);
  vec3 wy = mglaC * gest * (1.0 - pok) * (1.0 - 0.3 * tm) + powietrze * (1.0 - pok) + c;
  float alfa = 1.0 - (1.0 - gest) * (1.0 - pok);

  // woda mokradeł: lustro dalszych planów, iskierki i tęcz, z drobną falą
  float poziom = uWoda.x - (1.0 - mix(uWoda.y, uWoda.z, vUv.x)) * 4.0;
  if (pw.y < poziom) {
    float gl = poziom - pw.y;
    float fala = kleby(vec2(pw.x * 0.33 + uCzas * 0.05, gl * 1.3 - uCzas * 0.03)) - 0.5;
    vec2 uvO = vec2(vUv.x + fala * 0.014 * (1.0 + gl), ((2.0 * poziom - pw.y) - uCam.y) / uPol.y * 0.5 + 0.5 + fala * 0.03);
    vec3 odb = texture(uTlo, uvO).rgb * 0.8;
    vec2 Lm = vec2(uIskra.x, 2.0 * poziom - uIskra.y) - pw; Lm.x += fala * 0.7;
    float dm = length(Lm * vec2(1.0, 0.5));
    odb += uBarwaSw * 0.42 * exp(-dm * dm / (R * R * 0.45));
    odb += texture(uSwiatlo, uvO).rgb * 0.8;
    float tafla = smoothstep(0.07, 0.0, gl);
    vec3 woda = odb * (0.9 - 0.25 * smoothstep(0.0, 2.0, gl)) + mg * tafla * (0.05 + 0.22 * blask);
    wy = mix(woda, woda * 0.45 + c * 0.4, pok);
    alfa = 1.0;
  }
  o = vec4(texture(uTlo, vUv).rgb * (1.0 - alfa) + wy, 1.0);
}`,Ua=6,dt=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, grubość, faza, rodzaj (0 trawa, 1 liana, 2 trzcina)
layout(location = 2) in vec4 aKol;     // barwa, podatność na wiatr
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
out vec2 vSw; out float vV; out vec3 vKol; out float vT;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${Ua});
  float wisi = aPar.w > 0.5 && aPar.w < 1.5 ? -1.0 : 1.0;
  float wiatr = (sin(uCzas * 1.3 + aPar.z + aBaza.x * 0.4) * 0.22 + sin(uCzas * 0.47 + aBaza.x * 0.13) * 0.34 + 0.12) * aKol.a;
  // źdźbła odchylają się od przelatującej iskierki
  vec2 sr = aBaza + vec2(0.0, wisi * aPar.x * 0.6);
  vec2 od = sr - uIskra.xy;
  float pchniecie = sign(od.x) * exp(-dot(od, od) / 0.9) * 0.9;
  float kat = (aPar.z - 3.14) * 0.09 + wiatr + pchniecie;
  float a = kat * t;
  vec2 kier = vec2(sin(a), wisi * cos(a));
  vec2 p = aBaza + kier * aPar.x * t;
  float gr = aPar.y * (1.0 - 0.8 * t);
  if (aPar.w > 1.5) gr += aPar.y * 2.2 * smoothstep(0.62, 0.74, t) * smoothstep(0.98, 0.88, t);   // pałka trzciny
  p += vec2(kier.y, -kier.x) * bok * gr;
  vSw = p; vV = bok; vKol = aKol.rgb; vT = t;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,zt=T+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,wt=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas;
uniform float uWL[5]; uniform float uWP[5];
uniform float uWoda;
out float vAlfa; out float vKlasa; out vec2 vSw; out float vMig;
float hsz(float n){ return fract(sin(n * 91.345 + 7.1) * 47453.5453); }
void main(){
  float id = float(gl_VertexID);
  int klasa = gl_VertexID % 5;
  float h = hsz(id), h2 = hsz(id + 17.3), h3 = hsz(id + 41.7), h4 = hsz(id + 77.7);
  float glab = mix(0.6, 1.45, h3);
  vec2 pudlo = uPol * 2.0 + vec2(5.0, 4.0);
  vec2 v; float rozm; float alfa = 1.0; vec2 dryf = vec2(0.0);
  float t = uCzas;
  if (klasa == 0) { v = vec2(0.10, -0.20); rozm = 2.4; dryf = vec2(sin(t * 0.6 + h * 40.0) * 0.25, cos(t * 0.45 + h2 * 30.0) * 0.1); }
  else if (klasa == 1) { v = vec2(0.22, 0.015); rozm = 46.0; alfa = 0.085; }
  else if (klasa == 2) { v = vec2(0.02, 0.16); rozm = 2.6; dryf = vec2(sin(t * 0.4 + h * 40.0) * 0.15, 0.0); }
  else if (klasa == 3) { v = vec2(0.05, -0.085); rozm = 2.0; dryf = vec2(sin(t * 0.5 + h * 40.0) * 0.12, 0.0); }
  else { v = vec2(-2.3, -0.22); rozm = 2.2; dryf = vec2(0.0, sin(t * 1.1 + h * 40.0) * 0.2); }
  vec2 baza = vec2(h, h2) * pudlo + v * t + dryf - uCam * glab;
  vec2 od = mod(baza, pudlo) - pudlo * 0.5;
  vec2 p = uCam + od;
  if (klasa == 1) p.y = uWoda + 0.15 + h2 * h2 * 2.6 + sin(t * 0.2 + h * 9.0) * 0.2;
  float ex = clamp((od.x / uPol.x) * 0.5 + 0.5, 0.0, 1.0);
  float waga = mix(uWL[klasa], uWP[klasa], ex);
  // miękkie znikanie przy krawędziach pudła, żeby nic nie „wskakiwało”
  vec2 kraw = smoothstep(pudlo * 0.5, pudlo * 0.5 - 1.2, abs(od));
  vAlfa = alfa * waga * kraw.x * (klasa == 1 ? 1.0 : kraw.y) * (0.45 + 0.55 * h4);
  vKlasa = float(klasa); vSw = p;
  vMig = klasa == 2 ? pow(0.5 + 0.5 * sin(t * (1.2 + h4 * 2.0) + h * 60.0), 6.0) : 0.0;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
  gl_PointSize = max(1.5, rozm * uRes.y / 720.0 / mix(1.25, 0.8, h3));
}`,yt=T+`
in float vAlfa; in float vKlasa; in vec2 vSw; in float vMig; out vec4 o;
uniform vec3 uIskra, uBarwaSw, uMgla, uEmis; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(q, q);
  float plama = exp(-r2 * 3.2) * smoothstep(1.0, 0.6, r2);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = uMgla * 0.10 + uBarwaSw * blask * 0.9 + tecza * 1.4;
  if (vKlasa > 1.5 && vKlasa < 2.5) c += uEmis * (0.12 + 1.1 * vMig);
  if (vKlasa > 0.5 && vKlasa < 1.5) c = uMgla * (0.16 + 0.5 * blask) + tecza * 0.6;
  o = vec4(c * plama * vAlfa, 0.0);
}`,ha=20,_a=.17,O=96,vt=.42,ya=1.55,xt={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class bt{constructor(a=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=1.15,this.zasieg=this.zasiegBazowy,this.energia=0,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=Xa(a*7919+13),this.doDrgniecia=3,this.hx=new Float32Array(O),this.hy=new Float32Array(O),this.hi=0,this.hn=0,this.smuga=new Float32Array(ha*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let a=0;a<ha;a++)this.smuga[a*2]=this.x,this.smuga[a*2+1]=this.y}przenies(a,e){this.x=a,this.y=e,this.vx=0,this.vy=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(a){this.pulsV+=a}krok(a,e,i){this.t+=a;const t=xt;let o=e.os[0]*t.ciagKlawisze,s=e.os[1]*t.ciagKlawisze,n=o!==0||s!==0;if(e.cel){const d=e.cel[0]-this.x,y=e.cel[1]-this.y,z=Math.hypot(d,y);if(z>.12){const v=Math.min(1,z/1.8)*t.ciagWskaznik;o+=d/z*v,s+=y/z*v}n=!0}const l=this.t;if(o+=t.kolysanie*(Math.sin(l*.83)+.6*Math.sin(l*1.91+1.7)+.35*Math.sin(l*3.3+.4)),s+=t.kolysanie*(Math.cos(l*.71+.6)+.6*Math.sin(l*2.17+2.2)+.35*Math.cos(l*2.9+1.1)),this.doDrgniecia-=a,this.doDrgniecia<=0){this.doDrgniecia=t.drgniecieCo[0]+this.los()*(t.drgniecieCo[1]-t.drgniecieCo[0]);const d=this.los()*Math.PI*2,y=t.drgniecieSila[0]+this.los()*(t.drgniecieSila[1]-t.drgniecieSila[0]);this.vx+=Math.cos(d)*y,this.vy+=Math.sin(d)*y,this.pulsV+=1.2}const h=i.odpychanie(this.x,this.y,_a);o+=h[0],s+=h[1],this.vx+=o*a,this.vy+=s*a;const u=Math.exp(-a*(n?t.oporCiag:t.oporSwobodny));this.vx*=u,this.vy*=u;const c=Math.hypot(this.vx,this.vy);c>t.maksPredkosc&&(this.vx*=t.maksPredkosc/c,this.vy*=t.maksPredkosc/c),this.x+=this.vx*a,this.y+=this.vy*a;const f=i.zderzenie(this.x,this.y,_a*.8);if(f){this.x+=f.nx*f.gl,this.y+=f.ny*f.gl;const d=this.vx*f.nx+this.vy*f.ny;d<0&&(this.vx-=1.25*d*f.nx,this.vy-=1.25*d*f.ny,this.pulsV+=Math.min(6,-d*3))}const k=this.vx*.085,p=this.vy*.085;this.dvx+=((k-this.dx)*46-this.dvx*6.2)*a,this.dvy+=((p-this.dy)*46-this.dvy*6.2)*a,this.dx+=this.dvx*a,this.dy+=this.dvy*a,this.pulsV+=(-this.puls*90-this.pulsV*7)*a,this.puls+=this.pulsV*a,this.energia=Math.max(0,this.energia-a*.02);const m=this.zasiegBazowy+this.energia*4.7;this.zasieg+=(m-this.zasieg)*Math.min(1,a*1.4),this.hi=(this.hi+1)%O,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<O&&this.hn++}zbudujSmuge(a){const e=ha,i=this.smuga,t=Math.min(this.hn,Math.round(vt/a));let o=0,s=this.x,n=this.y;const l=this._odc||(this._odc=new Float32Array(O));let h=0;for(let z=0;z<t;z++){const v=(this.hi-z+O)%O,_=Math.hypot(this.hx[v]-s,this.hy[v]-n);if(o+_>ya){l[h++]=ya-o,o=ya;break}l[h++]=_,o+=_,s=this.hx[v],n=this.hy[v]}this.dlSmugi=o;let u=this.x,c=this.x,f=this.y,k=this.y,p=0,m=0,d=this.x,y=this.y;for(let z=0;z<e;z++){const v=o*z/(e-1);for(;p<h-1&&m+l[p]<v;){m+=l[p];const S=(this.hi-p+O)%O;d=this.hx[S],y=this.hy[S],p++}let _=d,g=y;if(h>0){const S=(this.hi-p+O)%O,w=this.hx[S],K=this.hy[S],x=Math.hypot(w-d,K-y),b=x>1e-6?Math.min(1,(v-m)/x):0;_=d+(w-d)*b,g=y+(K-y)*b}i[z*2]=_,i[z*2+1]=g}for(let z=1;z<e;z++){const v=z/(e-1),_=i[z*2]-i[z*2-2],g=i[z*2+1]-i[z*2-1],S=Math.hypot(_,g);if(S<1e-5)continue;const w=.03*v*v*Math.sin(v*o*5-this.t*6)*Math.min(1,o/.6);i[z*2]+=-g/S*w,i[z*2+1]+=_/S*w}for(let z=0;z<e;z++){const v=i[z*2],_=i[z*2+1];v<u&&(u=v),v>c&&(c=v),_<f&&(f=_),_>k&&(k=_)}this.pudlo[0]=u,this.pudlo[1]=f,this.pudlo[2]=c,this.pudlo[3]=k}}const gt=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,St=T+`
#define N ${ha}
in vec2 vP; out vec4 o;
uniform vec2 uSm[N];
uniform vec2 uGlowa, uDef;
uniform float uR, uCzas, uPuls, uMaska, uDl;
uniform vec3 uBarwa;

float smin(float a, float b, float k){ float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }

void main(){
  vec2 p = vP - uGlowa;
  // --- kropla: rozciągnięta w kierunku ruchu (z zachowaniem pola), brzeg delikatnie faluje
  float dl = length(uDef);
  vec2 kier = dl > 1e-4 ? uDef / dl : vec2(1.0, 0.0);
  float st = 1.0 + dl * 1.7 + uPuls * 0.5;
  vec2 q = vec2(dot(p, kier) / st, dot(p, vec2(-kier.y, kier.x)) * sqrt(st));
  float an = atan(q.y, q.x);
  float fal = 1.0 + 0.05 * sin(3.0 * an + uCzas * 3.1) + 0.025 * sin(5.0 * an - uCzas * 2.3) + 0.045 * sin(2.0 * an + uCzas * 1.7);
  float dK = (length(q) - uR * fal) * min(st, 1.0 / sqrt(st));

  // --- smuga: odległość od ciągłej łamanej o zwężającej się grubości
  // krótka smuga (wolny lot) chowa się w kropli: jej grubość płynnie maleje do zera
  float obecna = smoothstep(0.02, 0.3, uDl);
  float dS = 1e3, sS = 0.0;
  for (int i = 0; i < N - 1; i++) {
    vec2 a = uSm[i] - uGlowa, b = uSm[i + 1] - uGlowa;
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    float s = (float(i) + h) / float(N - 1);
    float r = uR * 0.8 * (0.12 + 0.88 * pow(1.0 - s, 1.35)) * obecna;
    float d = length(pa - ba * h) - r;
    if (d < dS) { dS = d; sS = s; }
  }
  float zanik = mix(1.0, pow(1.0 - sS, 1.15), obecna);

  float k = 0.11;
  float d = smin(dK, dS, k);
  float wK = clamp(0.5 + 0.5 * (dS - dK) / k, 0.0, 1.0);   // 1 = jesteśmy w kropli, 0 = w smudze
  float jasn = mix(zanik, 1.0, wK);

  float miekko = 0.028;
  float cialo = smoothstep(miekko, -miekko, d) * jasn;
  if (uMaska > 0.5) { o = vec4(vec3(step(0.35, cialo)), 1.0); return; }

  // wnętrze: blady, świetlisty rdzeń przesunięty lekko ku przodowi, ku brzegom barwa krainy
  float glab = clamp(-d / uR, 0.0, 1.0);
  float srodek = exp(-dot(q - vec2(uR * 0.18, 0.0), q - vec2(uR * 0.18, 0.0)) / (uR * uR * 0.55));
  vec3 brzeg = uBarwa * 0.85 + 0.06;
  vec3 rdzen = vec3(0.93, 1.0, 0.97);
  float bialosc = max(smoothstep(0.05, 0.8, glab) * mix(0.5, 0.85, wK), srodek * wK);
  vec3 kol = mix(brzeg, rdzen, bialosc) * (0.9 + 0.5 * srodek * wK);
  float na = max(d, 0.0);
  float aura = (0.42 * exp(-na / 0.07) + 0.10 * exp(-na / 0.30)) * jasn * (1.0 - cialo);
  o = vec4(kol * cialo + uBarwa * aura, cialo * 0.92);
}`;class _t{constructor(a){this.gl=a,this.p=new R(a,gt,St,"iskierka")}rysuj(a,e=!1){const i=this.gl,t=a.iskra,o=1.3;this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uPudlo",t.pudlo[0]-o,t.pudlo[1]-o,t.pudlo[2]+o,t.pudlo[3]+o).fv("uSm",2,t.smuga).f("uGlowa",t.x,t.y).f("uDef",t.dx,t.dy).f("uR",_a).f("uCzas",a.czas).f("uPuls",t.puls).f("uMaska",e?1:0).f("uDl",t.dlSmugi).f("uBarwa",...a.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const Mt=`#version 300 es
uniform vec4 uKafel;      // x0, y0, szerokość, wysokość kafla w jednostkach warstwy
uniform vec2 uPoz, uObsz; // środek i połowa rozmiaru malowanego prostokąta
uniform float uRot, uOdbij;
out vec2 vL; out vec2 vS;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vec2 lok = r * uObsz;
  float c = cos(uRot), s = sin(uRot);
  vS = uPoz + vec2(c * lok.x - s * lok.y, s * lok.x + c * lok.y);
  vL = vec2(lok.x * uOdbij, lok.y);
  gl_Position = vec4((vS - uKafel.xy) / uKafel.zw * 2.0 - 1.0, 0.0, 1.0);
}`,Pt=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vL; in vec2 vS;
layout(location = 0) out vec4 o0;
layout(location = 1) out vec4 o1;
uniform sampler2D uSzum, uTeren;
uniform vec3 uTerenZakres;        // x pierwszej próbki, 1/odstęp, liczba próbek
uniform int uTyp;
uniform vec4 uPar;
uniform vec2 uRozm;
uniform float uZi, uSkala, uMiekko, uPxJ, uPostrzep;
uniform vec3 uKa, uKb, uKc;       // barwy rekwizytu
uniform vec3 uGruntL, uGruntP, uWierzchL, uWierzchP, uLiscL, uLiscP;   // barwy terenu na lewym i prawym brzegu kafla
uniform vec2 uKafelX;             // x0 i szerokość kafla (do mieszania barw terenu)

float D; vec3 ALB; float EM;

float h1(float n){ return fract(sin(n * 127.1 + uZi * 311.7) * 43758.5453); }
float nK(vec2 p){ return texture(uSzum, p).r; }
float nK2(vec2 p){ return texture(uSzum, p).g; }
float nF(vec2 p){ return texture(uSzum, p).b; }
float smin(float a, float b, float k){ float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float sdEl(vec2 p, vec2 r){ float k = length(p / r); return (k - 1.0) * min(r.x, r.y); }
float sdSegT(vec2 p, vec2 a, vec2 b, float ra, float rb){
  vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}
mat2 obr(float a){ float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

// Malowana faktura: długie pociągnięcia pędzla wzdłuż kierunku + duże plamy drugiej barwy.
vec3 maluj(vec3 baza, vec3 akcent, vec2 p, vec2 kier, float ile){
  vec2 q = vec2(dot(p, kier), dot(p, vec2(-kier.y, kier.x))) / uSkala;
  float s1 = nF(q * vec2(0.035, 0.21) + uZi * 3.0);
  float s2 = nF(q * vec2(0.11, 0.55) + 0.37);
  float pl = nK(vS * 0.05 / uSkala + uZi * 0.7);
  vec3 c = mix(baza, akcent, smoothstep(0.38, 0.66, pl) * ile);
  return c * (0.58 + 0.62 * s1 + 0.3 * (s2 - 0.5));
}
// Mur: 0 na fugach, 1 w kamieniu; .y = losowy odcień kamienia.
vec2 mur(vec2 p, vec2 b){
  float rz = floor(p.y / b.y);
  vec2 q = vec2(p.x + mod(rz, 2.0) * b.x * 0.5 + h1(rz) * b.x, p.y) / b;
  vec2 f = abs(fract(q) - 0.5);
  float l = min((0.5 - f.x) * b.x, (0.5 - f.y) * b.y);
  return vec2(smoothstep(0.0, 0.04 * uSkala, l), h1(floor(q.x) * 7.3 + rz * 3.1));
}

vec4 terenW(float x){
  float f = (x - uTerenZakres.x) * uTerenZakres.y;
  float i = clamp(floor(f), 0.0, uTerenZakres.z - 2.0);
  float t = clamp(f - i, 0.0, 1.0);
  return mix(texelFetch(uTeren, ivec2(int(i), 0), 0), texelFetch(uTeren, ivec2(int(i) + 1, 0), 0), t);
}

// ---------- 0: teren (ziemia i korony drzew) ----------
void teren(){
  float tx = clamp((vS.x - uKafelX.x) / uKafelX.y, 0.0, 1.0);
  vec3 grunt = mix(uGruntL, uGruntP, tx), wierzch = mix(uWierzchL, uWierzchP, tx), lisc = mix(uLiscL, uLiscP, tx);
  vec4 t = terenW(vS.x);
  float e = 0.12 * uSkala;
  float nach = (terenW(vS.x + e).r - terenW(vS.x - e).r) / (2.0 * e);
  float d = (vS.y - t.r) / sqrt(1.0 + nach * nach);
  d += (nF(vS * 0.31 / uSkala) - 0.5) * 0.10 * uSkala;
  float gl = -d / uSkala;
  // skóra: mech, popiół albo bruk na wierzchu; pod spodem warstwy ziemi
  float skora = smoothstep(0.34, 0.02, gl + (nF(vS * 0.7 / uSkala) - 0.5) * 0.3);
  vec3 a = maluj(grunt, grunt * 1.35, vS, normalize(vec2(1.0, 0.12)), 1.0);
  a *= 0.8 + 0.3 * smoothstep(0.4, 0.6, nK(vec2(vS.x * 0.01, vS.y * 0.13) / uSkala));
  a = mix(a, wierzch * (0.66 + 0.6 * nF(vS * 1.1 / uSkala)), skora);
  // bruk ruin: płyty na wierzchu
  if (t.a > 0.01) {
    vec2 m = mur(vS + vec2(0.0, -t.r), vec2(0.9, 0.34) * uSkala);
    a = mix(a, a * (0.7 + 0.3 * m.x) * (0.85 + 0.3 * m.y), t.a * smoothstep(1.1, 0.15, gl));
  }
  D = d; ALB = a;
  EM = 0.0;
  // korony: nieregularny, liściasty sufit
  if (t.g < 900.0) {
    float dc = (t.g - vS.y) + (nK(vS * 0.085 / uSkala + uZi) - 0.5) * 2.4 * uSkala + (nF(vS * 0.45 / uSkala) - 0.5) * 0.55 * uSkala;
    if (dc < d) {
      D = dc; EM = 0.0;
      float kepki = smoothstep(0.35, 0.65, nF(vS * 0.42 / uSkala + 0.2));
      float glab = clamp(-dc / (2.5 * uSkala), 0.0, 1.0);
      ALB = mix(lisc * 0.9, lisc * 0.35, glab) * (0.55 + 0.6 * kepki) * (0.7 + 0.6 * nK2(vS * 0.12 / uSkala));
    }
  }
}

// ---------- 1: pień ----------
float wygiecie(float t){ return uPar.x * (sin(t * 3.1 + uZi * 6.0) * 0.7 + sin(t * 7.3 + uZi * 11.0) * 0.25); }
void pien(vec2 p, vec2 r){
  float t = (p.y + r.y) / (2.0 * r.y);
  float x = p.x - r.x * wygiecie(t);
  float wd = r.x * 0.5 * mix(1.0, uPar.w, t) + r.x * uPar.z * exp(-(p.y + r.y) / (r.x * 1.5));
  float d = max(abs(x) - wd, abs(p.y) - r.y);
  for (int i = 0; i < 3; i++) {
    if (float(i) >= uPar.y) break;
    float hh = h1(float(i) + 3.0), kier = h1(float(i) + 7.0) > 0.5 ? 1.0 : -1.0;
    float tb = mix(0.3, 0.9, hh);
    vec2 a = vec2(r.x * wygiecie(tb), (tb * 2.0 - 1.0) * r.y);
    vec2 b = a + vec2(kier * r.x * (2.4 + 2.0 * hh), r.x * (1.4 + hh * 2.2));
    d = min(d, sdSegT(p, a, b, r.x * 0.17, r.x * 0.045));
    vec2 c = mix(a, b, 0.55);
    d = min(d, sdSegT(p, c, c + vec2(kier * r.x * 0.9, r.x * 1.7), r.x * 0.075, r.x * 0.02));
  }
  D = d;
  ALB = maluj(uKa, uKb, vec2(x, p.y), vec2(0.0, 1.0), 0.9);
  ALB *= 0.62 + 0.5 * clamp(1.0 - abs(x) / max(wd, 1e-3), 0.0, 1.0);
  // głębokie bruzdy kory
  ALB *= 0.78 + 0.3 * smoothstep(0.3, 0.6, nF(vec2(x * 1.6, p.y * 0.12) / uSkala + uZi));
}

// ---------- 2: kłąb (listowie, krzew, głaz) ----------
void klab(vec2 p, vec2 r){
  float m = min(r.x, r.y), d = 1e3;
  for (int i = 0; i < 7; i++) {
    if (float(i) >= uPar.x) break;
    vec2 c = (vec2(h1(float(i) * 2.1 + 1.0), h1(float(i) * 3.7 + 2.0)) - 0.5) * 2.0 * (r - m * 0.55);
    d = smin(d, length(p - c) - m * (0.4 + 0.25 * h1(float(i) + 9.0)), m * uPar.w);
  }
  d += (nK(vS * 0.11 / uSkala + uZi) - 0.5) * uPar.y * m + (nF(vS * 0.5 / uSkala) - 0.5) * uPar.y * 0.3 * m;
  D = d;
  if (uPar.z > 0.5) {        // głaz: spękany kamień z mchem od góry
    ALB = maluj(uKa * 0.8, uKa * 1.15, p, normalize(vec2(1.0, 0.25)), 1.0);
    ALB *= 0.75 + 0.35 * smoothstep(0.44, 0.5, nK2(vS * 0.3 / uSkala + uZi));
    ALB = mix(ALB, uKb * (0.7 + 0.5 * nF(vS * 0.9 / uSkala)), smoothstep(0.1, 0.7, p.y / r.y + (nF(vS * 0.6 / uSkala) - 0.5)));
  } else {                   // listowie: kępki jaśniejszych liści na ciemnej masie
    float kepki = smoothstep(0.38, 0.62, nF(vS * 0.45 / uSkala + uZi));
    ALB = mix(uKb * 0.5, mix(uKb, uKc, 0.35), kepki) * (0.6 + 0.6 * nK2(vS * 0.13 / uSkala));
    ALB *= 0.7 + 0.4 * smoothstep(-0.6, 0.6, p.y / r.y);
  }
}

// ---------- 3: kolumna ----------
void kolumna(vec2 p, vec2 r){
  float t = (p.y + r.y) / (2.0 * r.y);
  float tr = r.x * 0.7 * (1.0 - 0.1 * t);
  float d = max(abs(p.x) - tr, abs(p.y) - r.y);
  d = min(d, sdBox(p - vec2(0.0, -r.y + r.x * 0.2), vec2(r.x * 1.0, r.x * 0.2)));
  d = min(d, sdBox(p - vec2(0.0, -r.y + r.x * 0.52), vec2(r.x * 0.84, r.x * 0.13)));
  if (uPar.y > 0.5 && uPar.x < 0.01) {
    d = min(d, sdBox(p - vec2(0.0, r.y - r.x * 0.18), vec2(r.x * 1.08, r.x * 0.18)));
    d = min(d, sdBox(p - vec2(0.0, r.y - r.x * 0.5), vec2(r.x * 0.88, r.x * 0.14)));
  }
  if (uPar.x > 0.01) {
    float ciecie = r.y - uPar.x * 2.0 * r.y + (nF(vec2(p.x * 0.8 / uSkala, uZi)) - 0.5) * r.x * 1.5 + p.x * (h1(5.0) - 0.5) * 1.2;
    d = max(d, p.y - ciecie);
  }
  D = d;
  float zlob = 0.5 + 0.5 * cos(p.x / tr * 3.14159 * uPar.z);
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.8) * (0.7 + 0.3 * zlob);
  float beben = abs(fract(p.y / (r.x * 2.4) + uZi) - 0.5);
  ALB *= 0.72 + 0.28 * smoothstep(0.0, 0.03, beben);
  ALB *= 0.7 + 0.42 * clamp(1.0 - abs(p.x) / tr, 0.0, 1.0);
}

// ---------- 4: łuk ----------
void luk(vec2 p, vec2 r){
  float filar = uPar.x * r.x * 2.0, wewn = r.x - filar, pieta = r.y - wewn - filar * 0.9;
  float otwor = p.y < pieta ? abs(p.x) - wewn : length(p - vec2(0.0, pieta)) - wewn;
  float d = max(sdBox(p, r), -otwor);
  d = min(d, sdBox(p - vec2(0.0, r.y), vec2(r.x * 1.06, filar * 0.22)));
  if (uPar.y > 0.01) {
    vec2 n = normalize(vec2(0.8, 0.6));
    float ciecie = dot(p - vec2(r.x * (1.0 - uPar.y * 1.6), r.y * 0.5), n) + (nF(p * 0.6 / uSkala + uZi) - 0.5) * r.x * 0.5;
    d = max(d, ciecie);
  }
  D = d;
  vec2 m = mur(p, vec2(filar * 0.95, filar * 0.45));
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.8) * (0.5 + 0.5 * m.x) * (0.8 + 0.35 * m.y);
}

// ---------- 5: blok / schody ----------
void blok(vec2 p, vec2 r){
  float zaokr = uPar.x * uSkala + 0.02 * uSkala, d;
  if (uPar.y > 0.5) {
    d = 1e3;
    for (int i = 0; i < 4; i++) {
      if (float(i) >= uPar.y) break;
      float k = float(i) / uPar.y;
      vec2 pol = vec2(r.x * (1.0 - k), r.y / uPar.y);
      d = min(d, sdBox(p - vec2(-r.x * k, -r.y + pol.y * (2.0 * float(i) + 1.0)), pol - zaokr) - zaokr);
    }
  } else d = sdBox(p, r - zaokr) - zaokr;
  d += (nF(vS * 0.4 / uSkala + uZi) - 0.5) * 0.06 * uSkala;
  D = d;
  ALB = maluj(uKa, uKb, p, normalize(vec2(1.0, 0.1)), 0.9);
  float peka = smoothstep(0.03, 0.0, abs(nK2(vS * 0.2 / uSkala + uZi) - 0.5));
  ALB *= 1.0 - 0.45 * peka;
  ALB *= 0.8 + 0.3 * smoothstep(-1.0, 1.0, p.y / r.y);
}

// ---------- 6: akwedukt ----------
void akwedukt(vec2 p, vec2 r){
  float n = max(uPar.x, 1.0), kom = 2.0 * r.x / n;
  float x = mod(p.x + r.x, kom) - kom * 0.5;
  float wewn = kom * 0.36, pomost = kom * 0.26, pieta = r.y - pomost - wewn;
  float otwor = p.y < pieta ? abs(x) - wewn : length(vec2(x, p.y - pieta)) - wewn;
  float d = max(sdBox(p, r), -otwor);
  if (uPar.z > 0.01) {
    float ciecie = p.x - r.x * (1.0 - uPar.z * 1.4) + (p.y + r.y) * 0.35 + (nF(p * 0.4 / uSkala + uZi) - 0.5) * kom * 0.8;
    d = max(d, ciecie);
  }
  D = d;
  vec2 m = mur(p, vec2(kom * 0.2, kom * 0.09));
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.8) * (0.55 + 0.45 * m.x) * (0.82 + 0.3 * m.y);
  ALB *= 0.75 + 0.3 * smoothstep(-1.0, 1.0, p.y / r.y);
}

// ---------- 7: posąg (zakapturzona postać) ----------
void posag(vec2 p, vec2 r){
  vec2 q = p / r.y;
  float szata = max(abs(q.x) - mix(0.40, 0.25, clamp((q.y + 1.0) / 1.3, 0.0, 1.0)), max(-1.0 - q.y, q.y - 0.32));
  float d = smin(szata, sdEl(q - vec2(0.0, 0.34), vec2(0.34, 0.2)), 0.1);
  if (uPar.x < 0.5) {
    d = smin(d, sdEl(q - vec2(0.03, 0.66), vec2(0.2, 0.24)), 0.07);     // kaptur
    d = smin(d, sdEl(q - vec2(0.12, 0.56), vec2(0.13, 0.15)), 0.05);    // pochylona twarz
  } else {
    d = max(d, q.y - 0.44 - (nF(q * 0.5 + uZi) - 0.5) * 0.25 - q.x * 0.3);  // utrącona głowa
  }
  d = smin(d, sdEl(q - vec2(0.17, 0.02), vec2(0.13, 0.26)), 0.08);      // złożone ręce
  d = min(d, sdBox(q - vec2(0.0, -0.97), vec2(0.56, 0.07)));
  D = d * r.y;
  float faldy = 0.5 + 0.5 * sin(q.x * 34.0 + nK(q * 0.2 + uZi) * 9.0 + q.y * 3.0);
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 1.0) * (0.66 + 0.34 * mix(1.0, faldy, smoothstep(0.3, 0.0, q.y)));
  float peka = smoothstep(0.02, 0.0, abs(nK2(q * 0.12 + uZi) - 0.5));
  ALB *= 1.0 - 0.4 * peka;
  ALB *= 0.7 + 0.4 * clamp(1.0 - abs(q.x) / 0.4, 0.0, 1.0);
}

// ---------- 8: kryształy (grono albo pojedynczy, także lewitujący) ----------
void krysztal(vec2 p, vec2 r){
  float d = 1e3; vec3 a = uKa; float em = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    if (fi >= uPar.x) break;
    float kat = i == 0 ? (h1(1.0) - 0.5) * 0.25 * uPar.y : (h1(fi) - 0.5) * 2.0 * uPar.y;
    float dl = 2.0 * r.y * (i == 0 ? 1.0 : 0.3 + 0.55 * h1(fi + 5.0));
    float sz = r.x * (i == 0 ? 0.5 : 0.26 + 0.24 * h1(fi + 8.0)) * (uPar.x < 1.5 ? 1.9 : 1.0);
    vec2 baza = vec2(i == 0 ? 0.0 : (h1(fi + 3.0) - 0.5) * r.x * 1.5, -r.y);
    vec2 q = obr(-kat) * (p - baza);
    float t = q.y / dl;
    float czub = 0.8 + 0.1 * h1(fi + 13.0);
    float skos = (h1(fi + 15.0) - 0.5) * 0.5;                     // czubek nie zawsze na osi
    float prof = uPar.z > 0.5
      ? sz * min(min(t / 0.34, 1.0), (1.0 - t) / 0.3)
      : sz * (t < czub ? mix(0.82, 1.0, t / czub) : (1.0 - t) / (1.0 - czub));
    float x = q.x - (uPar.z > 0.5 ? 0.0 : skos * sz * smoothstep(czub - 0.1, 1.0, t));
    float di = max(abs(x) - prof, max(-q.y, q.y - dl)) * 0.92;
    if (di < d) {
      d = di;
      float f = clamp(x / max(prof, 1e-3), -1.0, 1.0);
      // trzy ścianki o różnej jasności; granice ścianek lekko skośne
      float g = (f + 1.0) * 1.5 + (t - 0.5) * 0.25 * (h1(fi + 17.0) - 0.5);
      float gs = g - 0.5, s0 = floor(gs);
      float cA = 0.5 + 0.5 * fract(sin((clamp(s0, 0.0, 2.0) * 1.7 + fi * 3.0 + uZi * 17.0) * 91.7) * 437.5);
      float cB = 0.5 + 0.5 * fract(sin((clamp(s0 + 1.0, 0.0, 2.0) * 1.7 + fi * 3.0 + uZi * 17.0) * 91.7) * 437.5);
      float cien = mix(cA, cB, smoothstep(0.42, 0.58, fract(gs)));
      vec3 barwa = mix(mix(uKa, uKb, h1(fi + 11.0)), uKc, 0.35 * h1(fi + 19.0));
      a = barwa * cien * (0.7 + 0.45 * t);
      a *= 0.88 + 0.24 * nF(q * vec2(0.5, 0.06) / uSkala + fi);
      // światło uwięzione w środku: najmocniejsze u podstawy i w osi
      em = (0.3 + 0.7 * (1.0 - abs(f))) * (1.0 - 0.65 * t) * (0.7 + 0.3 * cien) * uPar.w;
    }
  }
  D = d; ALB = a; EM = em;
}

// ---------- 9: żebro ----------
void zebro(vec2 p, vec2 r){
  vec2 c = vec2(r.x, -r.y), R = 2.0 * r;
  vec2 q = (p - c) / R;
  float kat = atan(q.y, -q.x), maks = 1.5708 * uPar.y, u = clamp(kat / maks, 0.0, 1.0);
  float gr = r.x * uPar.x * (1.0 - 0.8 * u * u) * (1.0 + 0.5 * exp(-u * 9.0));
  float d = abs(length(q) - 1.0) * min(R.x, R.y) - gr;
  if (kat > maks) { vec2 kon = c + R * vec2(-cos(maks), sin(maks)); d = length(p - kon) - r.x * uPar.x * 0.2; }
  d = max(d, -(p.y + r.y) - 0.5 * uSkala);
  D = d;
  ALB = maluj(uKa, uKb, vec2(kat * R.y, (length(q) - 1.0) * R.x), vec2(1.0, 0.0), 0.9);
  ALB *= 0.8 + 0.3 * smoothstep(0.42, 0.6, nF(vS * 0.8 / uSkala + uZi));
  ALB = mix(ALB, uKc, 0.3 * smoothstep(0.5, 0.0, abs(length(q) - 1.0) * min(R.x, R.y) / max(gr, 1e-3)));
}

// ---------- 10: kręgi ----------
void kregi(vec2 p, vec2 r){
  float n = max(uPar.x, 1.0), kom = 2.0 * r.x / n;
  float nr = clamp(floor((p.x + r.x) / kom), 0.0, n - 1.0);
  p.y -= r.y * 0.5 * sin((nr + 0.5) / n * 3.14159) - r.y * 0.4;
  float x = p.x + r.x - (nr + 0.5) * kom;
  float mala = 0.75 + 0.25 * sin((nr + 0.5) / n * 3.14159);
  float d = sdBox(vec2(x, p.y + r.y * 0.45), vec2(kom * 0.33, r.y * 0.4) * mala - 0.05 * uSkala) - 0.07 * uSkala;
  d = min(d, sdSegT(vec2(x, p.y), vec2(0.0, -r.y * 0.2), vec2(kom * 0.3, r.y * 0.85 * mala), kom * 0.15, kom * 0.05));
  D = d;
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.9) * (0.8 + 0.3 * h1(nr + 2.0));
  ALB *= 0.8 + 0.3 * smoothstep(0.42, 0.6, nF(vS * 0.8 / uSkala + uZi));
}

// ---------- 11: czaszka olbrzyma ----------
void czaszka(vec2 p, vec2 r){
  vec2 q = p / r.y;
  float d = sdEl(q - vec2(-0.25, 0.2), vec2(0.95, 0.78));                      // mózgoczaszka
  d = smin(d, sdBox(q - vec2(0.55, -0.3), vec2(0.42, 0.36)) - 0.12, 0.35);      // szczęka górna
  d = smin(d, sdEl(q - vec2(0.42, 0.42), vec2(0.42, 0.22)), 0.2);               // łuk brwiowy
  float oko = sdEl(q - vec2(0.42, 0.02), vec2(0.27, 0.25));
  float nos = sdEl(obr(0.35) * (q - vec2(0.93, -0.22)), vec2(0.1, 0.2));
  float skron = sdEl(q - vec2(-0.1, -0.28), vec2(0.3, 0.16));
  d = max(d, -oko); d = max(d, -nos); d = max(d, -skron);
  float zeby = (abs(fract(q.x * 5.5) - 0.5) - 0.28) / 5.5;
  d = max(d, -max(zeby, q.y + 0.6));
  d = max(d, -(q.y + 0.86));
  D = d * r.y;
  ALB = maluj(uKa, uKb, p, normalize(vec2(1.0, 0.4)), 1.0);
  float szwy = smoothstep(0.014, 0.0, abs(nK2(q * 0.07 + uZi) - 0.5)) * smoothstep(0.0, 0.3, q.y);
  ALB *= 1.0 - 0.5 * szwy;
  ALB *= 0.62 + 0.5 * smoothstep(-0.8, 0.9, q.y);
  ALB *= 0.55 + 0.45 * smoothstep(0.0, 0.16, min(oko, min(nos, skron)));         // cień wokół otworów
}

// ---------- 12: martwe drzewo (z korzeniami-szczudłami) ----------
void drzewo(vec2 p, vec2 r){
  float gr = r.y * 0.085;
  vec2 a = vec2(0.0, -r.y), b = vec2(uPar.z * r.x * 0.5, -r.y * 0.1), c = vec2(uPar.z * r.x * 0.2 + (h1(1.0) - 0.5) * r.x * 0.5, r.y * 0.9);
  float d = min(sdSegT(p, a, b, gr * 1.25, gr * 0.8), sdSegT(p, b, c, gr * 0.8, gr * 0.12));
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    if (fi >= uPar.x) break;
    float t = 0.12 + 0.8 * (fi + h1(fi + 2.0) * 0.7) / uPar.x, kier = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    vec2 s = mix(b, c, t);
    float dl = r.x * (0.95 - 0.55 * t) * (0.6 + 0.5 * h1(fi + 4.0));
    vec2 e1 = s + vec2(kier * dl * 0.6, dl * (0.1 + 0.4 * h1(fi + 6.0)));
    vec2 e2 = e1 + vec2(kier * dl * 0.5, dl * (0.45 + 0.4 * h1(fi + 8.0)));
    float g0 = gr * (0.5 - 0.3 * t);
    d = min(d, sdSegT(p, s, e1, g0, g0 * 0.6));
    d = min(d, sdSegT(p, e1, e2, g0 * 0.6, g0 * 0.1));
    d = min(d, sdSegT(p, e1, e1 + vec2(-kier * dl * 0.12, dl * 0.5), g0 * 0.4, g0 * 0.08));
  }
  if (uPar.y > 0.5) for (int i = 0; i < 4; i++) {      // korzenie-szczudła: łuki schodzące do wody
    float fi = float(i), kier = mod(fi, 2.0) < 0.5 ? 1.0 : -1.0;
    float rozst = r.x * (0.16 + 0.11 * fi + 0.06 * h1(fi + 21.0));
    vec2 s = vec2(0.0, -r.y * (0.62 + 0.1 * h1(fi + 20.0)));
    vec2 e = vec2(kier * rozst, -r.y * 1.04);
    vec2 m = vec2(kier * rozst * 0.78, mix(s.y, e.y, 0.3));
    d = min(d, sdSegT(p, s, m, gr * 0.42, gr * 0.3));
    d = min(d, sdSegT(p, m, e, gr * 0.3, gr * 0.2));
  }
  D = d;
  ALB = maluj(uKa, uKb, p, vec2(0.0, 1.0), 0.7);
  ALB *= 0.75 + 0.35 * smoothstep(0.35, 0.6, nF(vec2(p.x * 1.4, p.y * 0.1) / uSkala + uZi));
}

// ---------- 13: kępa trzcin ----------
void trzciny(vec2 p, vec2 r){
  float d = 1e3; float pal = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    if (fi >= uPar.x) break;
    float x0 = (h1(fi + 1.0) - 0.5) * r.x * 1.2, pochyl = (h1(fi + 3.0) - 0.5) * r.x * 1.3, dl = r.y * (1.1 + 0.9 * h1(fi + 5.0));
    vec2 a = vec2(x0, -r.y), m = vec2(x0 + pochyl * 0.35, -r.y + dl * 0.55), b = vec2(x0 + pochyl, -r.y + dl);
    float gr = r.y * 0.016;
    d = min(d, min(sdSegT(p, a, m, gr * 1.5, gr), sdSegT(p, m, b, gr, gr * 0.4)));
    if (h1(fi + 9.0) > 0.45) {
      vec2 k = mix(m, b, 0.8), kier = normalize(b - m);
      float dp = sdSegT(p, k - kier * r.y * 0.09, k + kier * r.y * 0.09, gr * 3.4, gr * 3.0);
      if (dp < d) { d = dp; pal = 1.0; }
    }
  }
  D = d;
  ALB = mix(uKb * (0.6 + 0.6 * nF(vS * 0.9 / uSkala)), uKa * 0.7, pal);
}

// ---------- 14: kość ----------
void kosc(vec2 p, vec2 r){
  float d = sdSegT(p, vec2(-r.x * 0.78, 0.0), vec2(r.x * 0.78, 0.0), r.y * 0.36, r.y * 0.3);
  for (int i = 0; i < 4; i++) {
    vec2 s = vec2(i < 2 ? -1.0 : 1.0, mod(float(i), 2.0) < 0.5 ? -1.0 : 1.0);
    d = smin(d, length(p - vec2(s.x * r.x * 0.84, s.y * r.y * 0.36)) - r.y * 0.5, r.y * 0.4);
  }
  D = d;
  ALB = maluj(uKa, uKb, p, vec2(1.0, 0.0), 0.9);
  ALB *= 0.78 + 0.3 * smoothstep(0.42, 0.6, nF(vS * 0.8 / uSkala + uZi));
  ALB *= 0.75 + 0.35 * smoothstep(-1.0, 1.0, p.y / r.y);
}

void main(){
  D = 1e3; ALB = vec3(0.5); EM = 0.0;
  vec2 p = vL, r = uRozm;
  if (uTyp == 0) teren();
  else if (uTyp == 1) pien(p, r);
  else if (uTyp == 2) klab(p, r);
  else if (uTyp == 3) kolumna(p, r);
  else if (uTyp == 4) luk(p, r);
  else if (uTyp == 5) blok(p, r);
  else if (uTyp == 6) akwedukt(p, r);
  else if (uTyp == 7) posag(p, r);
  else if (uTyp == 8) krysztal(p, r);
  else if (uTyp == 9) zebro(p, r);
  else if (uTyp == 10) kregi(p, r);
  else if (uTyp == 11) czaszka(p, r);
  else if (uTyp == 12) drzewo(p, r);
  else if (uTyp == 13) trzciny(p, r);
  else kosc(p, r);

  // nierówna, „malowana” krawędź zamiast wektorowej kreski
  float postrzep = (nF(vS * 0.8 / uSkala + 0.5) - 0.5) * uMiekko * 1.3 * uPostrzep;
  float pokrycie = smoothstep(uMiekko, -uMiekko, D + postrzep);
  if (pokrycie < 0.004) discard;
  vec2 g = vec2(dFdx(D), dFdy(D)) / uPxJ;
  float gl = length(g); g = gl > 1e-4 ? g / gl : vec2(0.0);
  float brzeg = exp(min(D, 0.0) / (0.2 * uSkala));
  float jasn = dot(ALB, vec3(0.333));
  vec2 wypukl = vec2(dFdx(jasn), dFdy(jasn)) / uPxJ * 0.16 * uSkala;
  vec2 n = clamp(g * brzeg * 0.92 - wypukl, -1.0, 1.0);
  ALB = clamp(ALB, 0.0, 1.0);
  o0 = vec4(ALB * pokrycie, pokrycie);
  o1 = vec4((n * 0.5 + 0.5) * pokrycie, clamp(EM, 0.0, 1.0) * pokrycie, pokrycie);
}`,C=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.7,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8}],E=C.length,Ma=1.22,D=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:1.8,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:9,bliska:!0,postrzep:0}],Z=4,Pa=5.3,aa=5.6,At=16;for(const r of D){if(r.gra)r.y0=-1,r.wys=20,r.A=Pa;else{r.A=-r.s*aa*r.z;const a=r.A-aa*r.z-.3*r.z,e=r.A+(15-Pa)*r.f*r.z+aa*r.z+.3*r.z;r.y0=a,r.wys=e-a}r.szer=At*r.z,r.pxW=r.px,r.pxH=Math.round(r.px*r.wys/r.szer/16)*16,r.mnoznikX=r.f*r.z}function Lt(r,a,e=[0,0]){return e[0]=a.x*r.mnoznikX,e[1]=r.gra?a.y:r.A+(a.y-Pa)*r.f*r.z,e}const M={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14},jt=[2.3,1.75,1.4,1.12,1,1.35];function va(r,a,e=.07){const i=1+(r()-.5)*2*e;return[a[0]*i,a[1]*i,a[2]*i]}function A(r,a,e,i,t,o,s,n={}){const l=C[a],h={typ:e,x:i,y:t,w:o,h:s,rot:0,par:[0,0,0,0],zi:r(),kraina:a,ka:va(r,l.a),kb:va(r,l.b),kc:va(r,l.c),przed:!1,kolejnosc:r(),odbij:r()<.5?-1:1,bryla:null,...n};if(h.ox==null&&(h.ox=Math.abs(o)*1.25),h.oy==null&&(h.oy=Math.abs(s)*1.12),h.rot){const u=Math.hypot(h.ox,h.oy);h.ox=u,h.oy=u}return h}function Et(r,a,e,i,t,o,s){const n=r.terenWarstwy(a,o),l=e.y0+e.wys/2,h=e.wys/2+e.z,u=(c,f,k)=>s.push(A(t,0,M.PIEN,c,l,f,h,{par:[.35+t()*.6,k,.5+t()*.5,.45+t()*.25],ox:f*5.5}));if(a<=3){const c=a===3?t()<.7?1:0:1+(t()<.45?1:0);for(let f=0;f<c;f++)u(o+(t()-.5)*e.komorka*e.z*.8,i*(.85+t()*t()*1.5),Math.floor(t()*3.4));if(a>=2&&t()<.6){const f=i*(1.2+t()*1.6),k=i*(.45+t()*.6),p=o+(t()-.5)*4*e.z;s.push(A(t,0,M.KLAB,p,r.terenWarstwy(a,p)+k*.5,f,k,{par:[6,.55,0,.3],przed:!0}))}}else if(a===Z){if(t()<.34){const c=.5+t()*.9,f=.3+t()*.45;s.push(A(t,0,M.KLAB,o,n+f*.35,c,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+f*.2,rx:c*.5,ry:f*.45,r:.15}}))}else if(t()<.2){const c=.42+t()*.3,f=.45+t()*.5;s.push(A(t,0,M.PIEN,o,n+f*.6,c,f,{par:[.15,0,.9,.85],ox:c*2.2,bryla:{x:o,y:n+f*.5,rx:c*.3,ry:f*.9,r:.12}}))}}else{if(t()<.55){const c=i*(1.8+t()*2),f=i*(.7+t()*.6);s.push(A(t,0,M.KLAB,o+3*e.z,n+f*.2,c,f,{par:[6,.6,0,.3]}))}if(t()<.5){const c=i*(2+t()*2.5),f=i*(.8+t()*.7);s.push(A(t,0,M.KLAB,o-2*e.z,e.y0+e.wys-f*.4,c,f,{par:[7,.7,0,.3]}))}}}function Rt(r,a,e,i,t,o,s){const n=r.terenWarstwy(a,o),l=(u,c,f)=>{const k=c*(.55+t()*.25),p=r.terenWarstwy(a,u);s.push(A(t,1,M.DRZEWO,u,p+c-.25*i,k,c,{par:[3+Math.floor(t()*3),f,(t()-.5)*.7,0],ox:k*1.3}))},h=(u,c,f)=>{const k=r.terenWarstwy(a,u),p=c*(.5+t()*.5);s.push(A(t,1,M.TRZCINY,u,k+c*.85,p,c,{par:[4+Math.floor(t()*5),0,0,0],przed:f,ox:p*1.6}))};if(a===0)t()<.5&&l(o,i*(2.2+t()*2.2),0);else if(a<=2)t()<.7&&l(o,i*(2+t()*2.6),a===2&&t()<.5?1:0),t()<.65&&h(o+(t()-.5)*8*e.z,i*(.7+t()*.7),!0);else if(a===3){if(t()<.62&&l(o,i*(2.2+t()*3),t()<.5?1:0),t()<.6&&h(o+(t()-.5)*5*e.z,i*(.8+t()*.8),!0),t()<.35){const u=i*(.9+t()),c=i*(.3+t()*.3),f=o+2*e.z;s.push(A(t,1,M.KLAB,f,r.terenWarstwy(a,f)+c*.3,u,c,{par:[4,.3,1,.2],przed:!0}))}}else if(a===Z){if(t()<.22&&n>1.3){const u=.6+t()*.8,c=.25+t()*.3;s.push(A(t,1,M.KLAB,o,n+c*.3,u,c,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+c*.15,rx:u*.5,ry:c*.4,r:.12}}))}}else t()<.8&&h(o,i*(1.6+t()*1.4),!1)}function Tt(r,a,e,i,t,o,s){const n=r.terenWarstwy(a,o),l=(u,c,f,k,p={})=>{const m=r.terenWarstwy(a,u);return A(t,2,M.KRYSZTAL,u,m+c*.9,f,c,{par:[k,.35+t()*.4,0,.5+t()*.5],ox:f*1.9+c*.5,oy:c*1.25,...p})},h=(u,c,f)=>s.push(A(t,2,M.KRYSZTAL,u,c,f*.3,f,{par:[1,0,1,.8],rot:(t()-.5)*1.6,przed:!0}));if(a<=1)t()<.75&&s.push(l(o,i*(2.2+t()*3.6),i*(.9+t()*.9),3+Math.floor(t()*3)));else if(a<=3)t()<.75&&s.push(l(o,i*(1.2+t()*2.8),i*(.6+t()*.8),3+Math.floor(t()*4))),t()<.35&&h(o+(t()-.5)*6*e.z,n+i*(3+t()*4.5),i*(.35+t()*.5));else if(a===Z){if(t()<.5){const u=.35+t()*t()*1,c=.35+t()*.45,f=l(o,u,c,2+Math.floor(t()*4),{przed:t()<.5});u>.6&&(f.bryla={x:o,y:n+u*.6,rx:c*.45,ry:u*.7,r:.1}),s.push(f)}}else t()<.3&&s.push(l(o,i*(1.2+t()*1.2),i*(1.3+t()*.8),3)),t()<.22&&s.push(A(t,2,M.KRYSZTAL,o+4*e.z,e.y0+e.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3}))}function Kt(r,a,e,i,t,o,s){const n=r.terenWarstwy(a,o),l=(u,c,f,k)=>{const p=r.terenWarstwy(a,u);s.push(A(t,3,M.KOLUMNA,u,p+c-.2*i,f,c,{par:[k,1,3+Math.floor(t()*3),0],ox:f*1.6}))},h=(u,c,f)=>{const k=r.terenWarstwy(a,u);s.push(A(t,3,M.LUK,u,k+f-.3*i,c,f,{par:[.2+t()*.08,t()<.45?.3+t()*.5:0,0,0]}))};if(a===0)if(t()<.55){const u=i*(1.6+t()*1.2),c=i*(5+t()*4);s.push(A(t,3,M.AKWEDUKT,o,n+u-.3*i,c,u,{par:[3+Math.floor(t()*3),0,t()<.5?.5+t()*.4:0,0]}))}else t()<.5&&l(o,i*(2.5+t()*3),i*(.5+t()*.4),t()<.5?t()*.3:0);else if(a===1)if(t()<.4){const u=i*(1.5+t()),c=i*(4+t()*3);s.push(A(t,3,M.AKWEDUKT,o,n+u-.3*i,c,u,{par:[3+Math.floor(t()*2),0,t()<.6?.4+t()*.5:0,0]}))}else t()<.6&&h(o,i*(1.3+t()),i*(1.8+t()*1.4));else if(a<=3){const u=i*(2.3+t()*2.4),c=i*(.34+t()*.16);if(t()<.78?(l(o,u,c,t()<.4?.15+t()*.55:0),t()<.5&&l(o+c*(7+t()*3),u,c,t()<.5?.2+t()*.6:0)):t()<.7&&h(o,i*(1.4+t()*.8),i*(2+t()*1.6)),a===3&&t()<.35){const f=i*(.6+t()*.7),k=i*(.3+t()*.25),p=o+3*e.z;s.push(A(t,3,M.BLOK,p,r.terenWarstwy(a,p)+k*.6,f,k,{par:[.06,0,0,0],rot:(t()-.5)*.7,przed:!0}))}}else if(a===Z){const u=t();if(u<.3){const c=.45+t()*.6,f=.28+t()*.3,k=(t()-.5)*.5;s.push(A(t,3,M.BLOK,o,n+f*.75,c,f,{par:[.05,0,0,0],rot:k,przed:!0,bryla:{x:o,y:n+f*.7,rx:c*.85,ry:f*.8,r:.08}}))}else if(u<.42){const c=1.2+t()*.7,f=.5+t()*.35;s.push(A(t,3,M.BLOK,o,n+f*.8,c,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:n+f*.3,rx:c*.9,ry:f*.5,r:.08}}))}else if(u<.56){const c=.42+t()*.12,f=.5+t()*.8;s.push(A(t,3,M.KOLUMNA,o,n+f-.1,c,f,{par:[.25+t()*.3,0,4,0],ox:c*1.6,bryla:{x:o,y:n+f*.6,rx:c*.6,ry:f*.75,r:.1}}))}}else if(t()<.4){const u=i*(1.5+t()),c=i*(.8+t()*.5);s.push(A(t,3,M.BLOK,o,n+c*.5,u,c,{par:[.1,0,0,0],rot:(t()-.5)*.6}))}}function Bt(r,a,e,i,t,o,s){const n=r.terenWarstwy(a,o),l=(u,c,f)=>{const k=t()<.5?-1:1,p=c*(.42+t()*.15);for(let m=0;m<f;m++){const d=c*(1-.13*m-t()*.05),y=u+m*p,z=r.terenWarstwy(a,y),v=d*(.42+t()*.1);s.push(A(t,4,M.ZEBRO,y,z+d-.3*i,v,d,{par:[.13+t()*.04,.9+t()*.35,0,0],odbij:k,ox:v*1.5,oy:d*1.15,kolejnosc:.5+m*.01}))}},h=(u,c,f={})=>{const k=r.terenWarstwy(a,u),p=c*(.16+t()*.05);return A(t,4,M.KOSC,u,k+p*.6,c,p,{rot:(t()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(a<=1)t()<.62&&l(o,i*(2.4+t()*3),2+Math.floor(t()*3));else if(a<=3){if(t()<.58)l(o,i*(2+t()*3),2+Math.floor(t()*3));else if(t()<.5){const u=i*(2+t()*2),c=i*(.5+t()*.25);s.push(A(t,4,M.KREGI,o,n+c*.7,u,c,{par:[5+Math.floor(t()*4),0,0,0],przed:!0}))}a===3&&t()<.3&&s.push(h(o+3*e.z,i*(.8+t()*.8)))}else if(a===Z){const u=t();if(u<.2){const c=1+t()*.9,f=.3+t()*.15;s.push(A(t,4,M.KREGI,o,n+f*.55,c,f,{par:[4+Math.floor(t()*3),0,0,0],przed:!0,bryla:{x:o,y:n+f*.1,rx:c*.9,ry:f*.45,r:.08}}))}else if(u<.42){const c=.5+t()*.7,f=h(o,c);f.bryla={x:o,y:f.y,rx:c*.8,ry:f.h*.5,r:.08},s.push(f)}}else t()<.4&&l(o,i*(2.5+t()*2),1)}const Ct=[Et,Rt,Tt,Kt,Bt];function Ba(r,a,e,i,t,o,s,n){const l=r.terenWarstwy(a,s);switch(o){case 0:{const h=i*1.9,u=i*9;n.push(A(t,0,M.PIEN,s,l+i*2.3,h,u,{par:[.35,3,.8,.5],rot:1.28*(t()<.5?-1:1),ox:u*1.1,oy:u*1.1,kolejnosc:.9})),n.push(A(t,0,M.PIEN,s+i*11,e.y0+e.wys/2,i*2.6,e.wys/2+e.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const h=i*4.2,u=h*.75;n.push(A(t,1,M.DRZEWO,s,l+h-.4*i,u,h,{par:[5,1,.25,0],ox:u*1.3,kolejnosc:.9}));break}case 2:{const h=i*4.6,u=i*1.7;n.push(A(t,2,M.KRYSZTAL,s,l+h*.86,u,h,{par:[1,.12,0,1.6],ox:u*2+h*.3,oy:h*1.2,kolejnosc:.9})),n.push(A(t,2,M.KRYSZTAL,s+i*2.2,l+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const h=i*3.1;n.push(A(t,3,M.POSAG,s,l+h-.5*i,h*.62,h,{par:[t()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 4:{const h=i*2;n.push(A(t,4,M.CZASZKA,s,l+h*.62,h*1.45,h,{par:[0,0,0,0],rot:(t()-.5)*.3,kolejnosc:.9,ox:h*1.9,oy:h*1.5}));break}}}function Ft(r,a,e){const i=D[a],t=i.z*jt[a],o=i.komorka*i.z,s=ia(r.ziarno,a*7919+17,e),n=[],l=(e+.2+.6*s())*o,h=l/i.mnoznikX,u=r.wagi(h);let c=s(),f=0;for(;f<E-1&&(c-=u[f],!(c<0));f++);if(Ct[f](r,a,i,t,s,l,n),a===2){const k=r.segment(h),p=r.srodekSegmentu(k)*i.mnoznikX-5.5*i.z;p>=e*o&&p<(e+1)*o?Ba(r,a,i,t,ia(r.ziarno,991,k),r.krainaSegmentu(k),p,n):u[f]>.95&&s()<.07&&Ba(r,a,i,t,s,f,l,n)}return n}const pa=16;function Dt(r,a){const e=ia(r.ziarno,4242,a),i=[],t=a*pa,o=(s,n,l,h,u,c,f)=>i.push(s,n,l,h,e()*6.283,u,c[0],c[1],c[2],f);for(let s=t;s<t+pa;s+=.22){const n=s+e()*.22,l=r.wagi(n),h=r.ziemia(n);let u=e(),c=0;for(;c<E-1&&(u-=l[c],!(u<0));c++);const f=C[c],k=.6+e()*.6,p=[f.b[0]*k,f.b[1]*k,f.b[2]*k],m=e();if(c===0){if(m<.8&&o(n,h-.05,.18+e()*e()*.75,.014+e()*.012,0,p,1),e()<.085){const d=r.sufit(n);d<100&&o(n,d+.9,1.4+e()*e()*4.2,.018+e()*.014,1,[p[0]*.8,p[1]*.8,p[2]*.8],.55)}}else c===1?m<.42&&h<1.75?o(n,h-.05,.7+e()*1.7,.013+e()*.008,e()<.4?2:0,p,.7):m<.6&&o(n,h-.05,.15+e()*.4,.012,0,p,1):c===3?m<.22&&o(n,h-.04,.12+e()*.4,.011+e()*.006,0,p,1):c===4&&m<.2&&o(n,h-.04,.25+e()*.75,.009+e()*.006,0,p,1.6)}return new Float32Array(i)}const $=4,Ca=4,J=161;class It{constructor(a,e,i){this.gl=a,this.szum=e,this.swiat=i,this.p=new R(a,Mt,Pt,"wypiek");const t={wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE};this.warstwy=D.map(o=>({W:o,bufor:new W(a,o.pxW*$,o.pxH,[t,t],{zawijanieS:a.REPEAT}),kafle:new Array($).fill(null)})),this.terenDane=new Float32Array(J*4),this.terenTex=ma(a,J,1,{wewn:a.RGBA32F,format:a.RGBA,typ:a.FLOAT,filtr:a.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const a of this.warstwy)a.kafle.fill(null);this.zadanie=null}zapewnij(a,e,i=1){let t=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],n=s.W,l=a.x*n.mnoznikX,h=e*n.z+.6*n.z,u=Math.floor((l-h)/n.szer),c=Math.floor((l+h)/n.szer);for(let f=u;f<=c;f++)s.kafle[V(f)]!==f&&this._pieczCaly(o,f);if(!t){const f=n.szer*.45,k=i>=0?Math.floor((l+h+f)/n.szer):Math.floor((l-h-f)/n.szer);s.kafle[V(k)]!==k&&k-u<$&&c-k<$&&(t=[o,k])}}this.zadanie?this._pieczPasek():t&&(this.zadanie=this._przygotuj(t[0],t[1]),this.warstwy[t[0]].kafle[V(t[1])]=null,this._pieczPasek())}_przygotuj(a,e){const i=D[a],t=this.swiat,o=e*i.szer,s=o+i.szer,n=new Float32Array(J*4),l=i.szer/(J-33),h=o-16*l;for(let k=0;k<J;k++){const p=h+k*l,m=p/i.mnoznikX,d=t.wagi(m);n[k*4]=t.terenWarstwy(a,p),n[k*4+1]=t.sufitWarstwy(a,p),n[k*4+2]=d[2],n[k*4+3]=d[3]}const u=o/i.mnoznikX,c=s/i.mnoznikX,f=k=>t.mieszaj(k,"b",[0,0,0]);return{l:a,i:e,pasek:0,dane:n,xs:h,dx:l,x0:o,rekwizyty:t.rekwizytyW(a,o,s),barwy:{gL:t.mieszaj(u,"grunt",[0,0,0]),gP:t.mieszaj(c,"grunt",[0,0,0]),wL:t.mieszaj(u,"wierzch",[0,0,0]),wP:t.mieszaj(c,"wierzch",[0,0,0]),lL:f(u),lP:f(c)}}}_pieczCaly(a,e){this.zadanie&&this.zadanie.l===a&&V(this.zadanie.i)===V(e)&&(this.zadanie=null);const i=this._przygotuj(a,e);this._rysuj(i,0,D[a].pxH),this.warstwy[a].kafle[V(e)]=e,this.upieczono++}_pieczPasek(){const a=this.zadanie,e=D[a.l],i=Math.ceil(e.pxH/Ca);this._rysuj(a,a.pasek*i,Math.min(i,e.pxH-a.pasek*i)),++a.pasek>=Ca&&(this.warstwy[a.l].kafle[V(a.i)]=a.i,this.zadanie=null,this.upieczono++)}_rysuj(a,e,i){const t=this.gl,o=D[a.l],s=this.warstwy[a.l],n=this.p,l=V(a.i);t.bindFramebuffer(t.FRAMEBUFFER,s.bufor.fbo),t.viewport(l*o.pxW,0,o.pxW,o.pxH),t.enable(t.SCISSOR_TEST),t.scissor(l*o.pxW,e,o.pxW,i),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.terenTex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,J,1,0,t.RGBA,t.FLOAT,a.dane);const h=a.barwy;n.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",a.xs,1/a.dx,J).f("uKafel",a.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",a.x0,o.szer).f("uGruntL",...h.gL).f("uGruntP",...h.gP).f("uWierzchL",...h.wL).f("uWierzchP",...h.wP).f("uLiscL",...h.lL).f("uLiscP",...h.lP);const u=c=>{n.i("uTyp",c.typ).f("uPoz",c.x,c.y).f("uObsz",c.ox+o.miekkosc*o.z*2,c.oy+o.miekkosc*o.z*2).f("uRot",c.rot).f("uOdbij",c.odbij).f("uRozm",c.w,c.h).f("uPar",c.par[0],c.par[1],c.par[2],c.par[3]).f("uZi",c.zi).f("uKa",...c.ka).f("uKb",...c.kb).f("uKc",...c.kc),t.drawArrays(t.TRIANGLE_STRIP,0,4)};for(const c of a.rekwizyty)c.przed||u(c);n.i("uTyp",M.TEREN).f("uPoz",a.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+a.l*.11),t.drawArrays(t.TRIANGLE_STRIP,0,4);for(const c of a.rekwizyty)c.przed&&u(c);t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,null)}}function V(r){return(r%$+$)%$}const Ot=$,Fa=10;class Nt{constructor(a,e){this.gl=a,this.swiat=e,this.p=new R(a,dt,zt,"flora"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf);const i=Fa*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([t,o,s])=>{a.enableVertexAttribArray(t),a.vertexAttribPointer(t,o,a.FLOAT,!1,i,s*4),a.vertexAttribDivisor(t,1)}),a.bindVertexArray(a.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map}reset(){this.klucz="",this.pamiec.clear()}rysuj(a,e,i,t,o){const s=this.gl,n=Math.floor((a.cam.x-a.polX-3)/pa),l=Math.floor((a.cam.x+a.polX+3)/pa),h=n+":"+l;if(h!==this.klucz){this.klucz=h;const u=[];let c=0;for(let p=n;p<=l;p++){let m=this.pamiec.get(p);m||(this.pamiec.size>12&&this.pamiec.clear(),m=Dt(this.swiat,p),this.pamiec.set(p,m)),u.push(m),c+=m.length}const f=new Float32Array(c);let k=0;for(const p of u)f.set(p,k),k+=p.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=c/Fa}this.ile&&(this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uRes",t,o).tex("uSwiatlo",1,i),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*(Ua+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const Y=16,na=8;function Da(r,a){const e=4+Math.floor(r()*4.99),i=[];let t=0;for(let p=0;p<e;p++){const m=.35+r();i.push(m),t+=m}const o=1+r()*1.1,s=r()*Math.PI*2,n=[];let l=r()*Math.PI*2;const h=Math.floor(r()*e),u=r()<.4?Math.floor(r()*e):-1;for(let p=0;p<e;p++){l+=i[p]/t*Math.PI*2;let m=a*(.5+.5*r());(p===h||p===u)&&(m*=.38+r()*.2);const d=Math.cos(l)*m*o,y=Math.sin(l)*m;n.push([d*Math.cos(s)-y*Math.sin(s),d*Math.sin(s)+y*Math.cos(s)])}let c=0,f=0;for(const p of n)c+=p[0],f+=p[1];c/=e,f/=e;let k=0;for(const p of n)p[0]-=c,p[1]-=f,k=Math.max(k,Math.hypot(p[0],p[1]));return{v:n,zasieg:k}}function Va(r,a){const e=a*Y,i=e+Y/2,t=r.segment(i),o=r.srodekSegmentu(t)+13;if(o<e||o>=e+Y)return null;const s=r.krainaSegmentu(t);return{id:"f"+t,x:o,y:Math.min(r.ziemia(o)+4.4,r.granicaLotu(o)-2.2),kraina:s,segment:t,odsloniecie:0,odkryty:!1}}function Wt(r,a){const e=ia(r.ziarno,9001,a),i=[],t=a*Y,o=1+(e()<.6?1:0)+(e()<.22?1:0);for(let n=0;n<o;n++){const l=t+(n+.15+.7*e())*Y/o,h=r.ziemia(l),u=Math.min(r.granicaLotu(l)-.9,h+9.5),c=h+1.4+e()*Math.max(.5,u-h-1.4),f=e()<.32,k=f?2+Math.floor(e()*3):1;for(let p=0;p<k;p++){const m=f?.2+e()*.32:.32+e()*.4,d=e()*Math.PI*2,y=p===0?0:.6+e()*.9,z=Da(e,m),v=l+Math.cos(d)*y,_=c+Math.sin(d)*y*.8;i.push({id:a*16+i.length,x:v,y:_,px:v,py:_,kat:e()*Math.PI*2,obrot:(e()-.5)*.42,faza:e()*Math.PI*2,v:z.v,zasieg:z.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0})}}const s=Va(r,a);if(s)for(let n=0;n<3;n++){const l=Da(e,.3+e()*.25),h=s.x-2.6+n*2.4+(e()-.5)*.6,u=s.y-1.9+(e()-.5)*.9;i.push({id:a*16+i.length,x:h,y:u,px:h,py:u,kat:e()*6.283,obrot:(e()-.5)*.42,faza:e()*6.283,v:l.v,zasieg:l.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0})}return i}class Aa{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(a,e,i,t){const o=Math.floor((e.x-i-8)/Y),s=Math.floor((e.x+i+8)/Y);this.widoczne.length=0;for(let n=o;n<=s;n++){let l=this.kawalki.get(n);if(!l){if(this.kawalki.size>24)for(const h of this.kawalki.keys())(h<o-2||h>s+2)&&this.kawalki.delete(h);l=Wt(this.swiat,n),this.kawalki.set(n,l),this.naNowyKawalek?.(n,l)}for(const h of l)h.kat+=h.obrot*a,h.py=h.y+Math.sin(t*.6+h.faza)*.12,h.px=h.x+Math.sin(t*.37+h.faza*1.7)*.05,this.widoczne.push(h)}}static wierzcholki(a,e){const i=Math.cos(a.kat),t=Math.sin(a.kat);for(let o=0;o<a.v.length;o++){const s=a.v[o];e[o*2]=i*s[0]-t*s[1],e[o*2+1]=t*s[0]+i*s[1]}return e}}const $a=`
// Sześć wyraźnych, nasyconych barw: czerwień, pomarańcz, żółć, zieleń, błękit, fiolet.
vec3 widmo(float t){
  t = clamp(t, 0.0, 1.0) * 5.0;
  vec3 c0 = vec3(1.00, 0.10, 0.16), c1 = vec3(1.00, 0.46, 0.06), c2 = vec3(0.98, 0.88, 0.10);
  vec3 c3 = vec3(0.12, 0.92, 0.36), c4 = vec3(0.12, 0.46, 1.00), c5 = vec3(0.60, 0.16, 1.00);
  vec3 c = mix(c0, c1, smoothstep(0.0, 1.0, t));
  c = mix(c, c2, smoothstep(1.0, 2.0, t));
  c = mix(c, c3, smoothstep(2.0, 3.0, t));
  c = mix(c, c4, smoothstep(3.0, 4.0, t));
  return mix(c, c5, smoothstep(4.0, 5.0, t));
}`,Zt=`#version 300 es
uniform vec2 uCam, uPol, uO; uniform float uKat, uDl, uRozw, uStart;
out vec2 vL;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  float koniec = uStart + uDl * 1.7;
  float bok = koniec * sin(min(uRozw * 0.5 + 0.06, 1.5));
  vL = vec2(mix(uStart * 0.6, koniec, r.x), (r.y * 2.0 - 1.0) * bok);
  float c = cos(uKat), s = sin(uKat);
  vec2 p = uO + vec2(c * vL.x - s * vL.y, s * vL.x + c * vL.y);
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,Gt=T+$a+`
in vec2 vL; out vec4 o;
uniform float uDl, uRozw, uSila, uZnak, uZi, uCzas, uStart, uSkos;
uniform sampler2D uSzum;
void main(){
  float r = length(vL), a = atan(vL.y, vL.x);
  float u = a / (uRozw * 0.5);
  if (abs(u) >= 1.0) discard;
  float t = u * uZnak * 0.5 + 0.5;                       // 0 = brzeg czerwony, 1 = fioletowy
  float katowy = smoothstep(0.0, 0.13, t) * (1.0 - smoothstep(0.74, 1.0, t)) * (1.12 - 0.3 * t);
  float ts = pow(clamp((t - 0.07) / 0.80, 0.0, 1.0), 0.86);
  // szerokie pasma jasności w poprzek wiązki i drobne smugi wzdłuż promieni
  float pasma = 0.5 + 1.0 * texture(uSzum, vec2(a * 0.55 + uZi * 0.37, uZi * 0.13)).r;
  float smugi = 0.72 + 0.56 * texture(uSzum, vec2(a * 1.7 + uZi, r * 0.025 - uCzas * 0.004)).r;
  float rr = r - uStart;
  float dl = uDl * (1.0 + uSkos * (t - 0.5)) * (0.72 + 0.56 * pasma);
  float q = rr / dl;
  float rad = smoothstep(0.0, 0.4, rr) * exp(-q * q * 2.4);
  o = vec4(widmo(ts) * uSila * katowy * rad * pasma * smugi * 2.0, 1.0);
}`,qt=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,Xt=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Yt=T+$a+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${na}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${na}; i++) {
    if (i >= uN) break;
    int j = i == 0 ? uN - 1 : i - 1;
    vec2 e = uW[j] - uW[i], w = vP - uW[i];
    vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
    float bb = dot(b, b);
    if (bb < d2) { d2 = bb; vec2 nn = normalize(vec2(e.y, -e.x)); nrm = dot(nn, uW[i] + e * 0.5) < 0.0 ? -nn : nn; }
    bvec3 c = bvec3(vP.y >= uW[i].y, vP.y < uW[j].y, e.x * w.y > e.y * w.x);
    if (all(c) || all(not(c))) znak = -znak;
  }
  float d = znak * sqrt(d2);
  float wn = smoothstep(0.022, -0.022, d);
  float kraw = exp(-abs(d) / 0.026);
  float lic = max(dot(nrm, uDoIskry), 0.0);                       // krawędź zwrócona ku iskierce
  float faza = exp(-abs(d + 0.055) / 0.014) * wn * smoothstep(0.1, 0.7, dot(nrm, uOs));
  float polysk = pow(max(0.0, sin(dot(vP, uOs) * 7.0 + uFaza)), 26.0) * wn;
  vec3 lod = mix(vec3(0.74, 0.90, 1.0), uBarwaSw, 0.3);
  float widac = uBlask + 0.035 + uBlysk * 0.35;
  float grad = 0.5 + 0.5 * dot(normalize(vP + 1e-4), uOs);
  vec3 c = lod * (wn * (0.07 + 0.16 * grad) + kraw * (0.05 + 0.85 * lic) + faza * 0.2 + polysk * 0.42) * widac;
  // pryzmatyczna obwódka: tuż przy krawędzi szkło samo rozszczepia światło
  c += widmo(fract(-d * 11.0 + uFaza * 0.16)) * wn * exp(d / 0.05) * 0.22 * (uOsw + uBlask * 0.4);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  c += tecza * (wn * 0.45 + kraw * 0.5);
  // błysk na wierzchołku: miękki krzyżyk
  vec2 g = abs(vP - uBlyskPoz);
  float gw = exp(-g.x * 70.0 - g.y * 9.0) + exp(-g.y * 70.0 - g.x * 9.0) + 0.6 * exp(-length(g) * 22.0);
  c += lod * gw * uBlysk * (0.25 + uBlask);
  o = vec4(c, wn * 0.10 * min(1.0, widac));
}`;class Ut{constructor(a,e){this.gl=a,this.szum=e,this.pWachlarz=new R(a,Zt,Gt,"wachlarz"),this.pNasycenie=new R(a,q,qt,"nasycenie"),this.pOdlamek=new R(a,Xt,Yt,"odlamek"),this._w=new Float32Array(na*2)}wachlarze(a,e){const i=this.gl,t=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),t.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).tex("uSzum",0,this.szum);for(const o of e)t.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi).f("uStart",o.start).f("uSkos",o.skos),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(a,e,i,t,o,s){const n=this.gl,l=this.pOdlamek,h=a.iskra;l.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uBarwaSw",...e.barwaSw).tex("uSwiatlo",1,t);for(const u of i){if(Math.abs(u.px-a.cam.x)>a.polX+1.5)continue;const c=h.x-u.px,f=h.y-u.py,k=Math.hypot(c,f)||1,p=k/(h.zasieg*1.25);Aa.wierzcholki(u,this._w);const m=Math.pow(Math.max(0,Math.sin(a.czas*.9+u.faza*3)),40),d=Math.floor(a.czas*.9/(2*Math.PI)+u.faza)%u.v.length;l.f("uSrodek",u.px,u.py).f("uObsz",u.zasieg+.5).fv("uW",2,this._w).i("uN",u.v.length).f("uDoIskry",c/k,f/k).f("uOs",Math.cos(u.os+u.kat),Math.sin(u.os+u.kat)).f("uBlyskPoz",this._w[d*2],this._w[d*2+1]).f("uBlask",Math.exp(-p*p)).f("uFaza",a.czas*.7+u.faza).f("uBlysk",m).f("uOsw",u.oswietlenie),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}const ua=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ha=`
float zSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
float zh(float n){ return fract(sin(n * 91.3 + 3.7) * 4375.85); }
float znak(vec2 p, int typ, float w){
  float d = 1e3;
  if (typ == 0) {                      // pióro: stosina i promienie w obrysie liścia
    p = mat2(0.8, -0.6, 0.6, 0.8) * p;
    float szer = 0.24 + 0.05 * w;
    float obrys = abs(p.x) - szer * sin(clamp((p.y + 0.8) / 1.7, 0.0, 1.0) * 3.14159) * (1.0 - 0.12 * w * (p.y + 0.8));
    d = min(abs(obrys), zSeg(p, vec2(0.0, -1.0), vec2(0.0, 0.9)));
    float promienie = abs(fract((p.y - abs(p.x) * (0.9 + 0.2 * w)) * (4.5 + w)) - 0.5) / (4.5 + w);
    if (obrys < 0.0 && p.y > -0.75) d = min(d, promienie);
  } else if (typ == 1) {               // klucz: ucho, trzon, zęby
    float ucho = abs(length(p - vec2(-0.6, 0.0)) - 0.3);
    if (w > 2.5) ucho = min(ucho, abs(length(p - vec2(-0.6, 0.0)) - 0.14));
    d = min(ucho, zSeg(p, vec2(-0.3, 0.0), vec2(0.95, 0.0)));
    for (int i = 0; i < 3; i++) {
      float fi = float(i); if (fi > 1.0 + mod(w, 2.0)) break;
      float x = 0.9 - fi * 0.2, dl = 0.18 + 0.14 * zh(w * 3.0 + fi);
      d = min(d, zSeg(p, vec2(x, 0.0), vec2(x, -dl)));
      if (zh(w + fi * 7.0) > 0.5) d = min(d, zSeg(p, vec2(x, -dl), vec2(x - 0.1, -dl)));
    }
  } else if (typ == 2) {               // kwiat zamknięty w krysztale
    vec2 q = abs(p);
    float kr = max(q.x * 0.9 + q.y * 0.42, q.x) - 0.62;
    d = abs(kr);
    float n = 5.0 + mod(w, 4.0), kat = atan(p.y, p.x), r = length(p);
    float platki = r - 0.36 * (0.45 + 0.55 * abs(cos(kat * n * 0.5 + w)));
    d = min(d, abs(platki));
    d = min(d, abs(r - 0.07));
  } else if (typ == 3) {               // znak wyryty w kamieniu: kreski na siatce w kole
    d = abs(length(p) - 0.92);
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      vec2 a = (floor(vec2(zh(w * 7.0 + fi), zh(w * 11.0 + fi * 3.0)) * 3.0) - 1.0) * 0.44;
      vec2 b = (floor(vec2(zh(w * 13.0 + fi * 5.0), zh(w * 17.0 + fi * 2.0)) * 3.0) - 1.0) * 0.44;
      if (dot(a - b, a - b) > 0.01) d = min(d, zSeg(p, a, b));
    }
    d = min(d, abs(length(p - vec2(0.0, 0.44 * (mod(w, 3.0) - 1.0))) - 0.1));
  } else {                             // skamielina: zwinięta muszla z żebrami
    float r = length(p), kat = atan(p.y, p.x);
    float b = 0.13 + 0.012 * w;
    float t = log(max(r, 1e-3) / 0.09) / b;
    float zwoj = (kat - t) / 6.28318;
    float f = fract(zwoj) - 0.5;
    d = abs(f) * 6.28318 * b * r;
    if (r > 0.95) d = max(d, r - 0.95) + abs(r - 0.95);
    float zebra = abs(fract(t * (1.2 + 0.2 * mod(w, 3.0))) - 0.5) * r * 0.5;
    if (r > 0.18 && r < 0.95) d = min(d, zebra + smoothstep(0.1, 0.4, abs(f)) * 0.0 + 0.02 * step(0.47, abs(f)));
    d = min(d, abs(r - 0.95) + 0.0);
  }
  return d;
}`,Vt=T+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,$t=T+Ha+`
in vec2 vP; out vec4 o;
uniform vec3 uBarwa; uniform float uOdsl, uCzas, uWariant, uSkala; uniform int uTyp;
uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  vec2 p = vP / uSkala;
  float d = znak(p, uTyp, uWariant) * uSkala;
  float kreska = exp(-d / 0.02) * 0.95 + exp(-d / 0.075) * 0.3;
  float r = length(p);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = mix(uBarwa, vec3(1.0), 0.3) * kreska + (uBarwa * 0.5 + tecza * 0.8) * exp(-r * r * 1.4) * 0.22;
  c += tecza * kreska * 0.8;
  float drz = 0.85 + 0.15 * sin(uCzas * 2.3 + p.x * 4.0);
  o = vec4(c * uOdsl * drz * smoothstep(1.5, 1.1, r), 0.0);
}`,Ht=T+Ha+`
in vec2 vP; out vec4 o;
uniform vec3 uBarwa; uniform float uOdsl, uOdkryty, uZaplon, uCzas; uniform int uTyp;
uniform sampler2D uSwiatlo, uSzum; uniform vec2 uRes;
void main(){
  vec2 p = vP;
  float d = 1e3;
  // środkowy motyw i dwa mniejsze po bokach
  d = min(d, znak(p / 1.25, uTyp, 3.0) * 1.25);
  d = min(d, znak((p - vec2(2.35, -0.1)) / 0.7, uTyp, 1.0) * 0.7);
  d = min(d, znak((p + vec2(2.35, 0.1)) / 0.7, uTyp, 4.0) * 0.7);
  // rama: podwójna linia i fryz z łuków
  vec2 q = abs(p) - vec2(3.4, 1.75);
  float rama = abs(length(max(q, 0.0)) + min(max(q.x, q.y), 0.0));
  d = min(d, min(rama, abs(rama - 0.12)));
  if (abs(p.x) < 3.3) {
    float lx = mod(p.x, 0.55) - 0.275;
    d = min(d, abs(length(vec2(lx, p.y + 1.62)) - 0.22) + step(-1.62, -abs(p.y + 1.62) - 1.4) * 0.0);
    d = min(d, abs(length(vec2(lx, p.y - 1.62)) - 0.22));
  }
  float zatarcie = smoothstep(0.25, 0.6, texture(uSzum, p * 0.07 + 0.3).r + 0.25 * texture(uSzum, p * 0.3).b);
  float kreska = (0.8 * exp(-d / 0.04) + 0.3 * exp(-d / 0.13)) * (0.12 + 0.88 * zatarcie);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  float tm = max(tecza.r, max(tecza.g, tecza.b));
  float brzeg = smoothstep(0.0, 0.5, -max(q.x, q.y) + 0.45);
  vec3 c = (tecza * 1.5 + uBarwa * tm * 0.6) * kreska;                       // w tęczy
  // w trakcie odsłaniania: malowidło rozżarza się od środka ku brzegom, coraz jaśniej
  float front = smoothstep(0.0, 0.25, uOdsl * 1.25 - length(p / vec2(3.6, 1.9)) * 0.9);
  c += mix(uBarwa, vec3(1.0), 0.2) * kreska * uOdsl * (0.12 + 0.5 * front);
  // zapalone: świeci samo i już nie gaśnie — jasna kreska, miękka łuna wokół rysunku, powolny oddech
  float oddech = 0.9 + 0.1 * sin(uCzas * 0.8 + p.x);
  float luna = exp(-d / 0.45) * 0.10 + 0.035 * (1.0 - smoothstep(0.0, 1.0, length(p / vec2(3.6, 1.9))));
  c += (mix(uBarwa, vec3(1.0), 0.3) * kreska * 1.05 + uBarwa * luna) * oddech * uOdkryty;
  // chwila zapłonu: krótki rozbłysk, który opada do stałego blasku
  c += mix(uBarwa, vec3(1.0), 0.5) * (kreska * 1.6 + exp(-d / 0.8) * 0.25) * uZaplon;
  o = vec4(c * brzeg, 0.0);
}`,Jt=T+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  // miękka fala światła, nie kreska cyrklem: szeroka, rozmyta i szybko gasnąca
  float pierscien = exp(-abs(r - prom) / (0.14 + 0.3 * uT)) * smoothstep(0.0, 0.25, r);
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 3.0) * 0.42, 0.0);
}`;class Qt{constructor(a,e){this.gl=a,this.szum=e,this.pDrobinka=new R(a,ua,Vt,"drobinka"),this.pSlad=new R(a,ua,$t,"slad"),this.pFresk=new R(a,ua,Ht,"fresk"),this.pKrag=new R(a,ua,Jt,"krag")}miniatura(a,e,i=144){const t=this.gl;this._mini||(this._mini=new W(t,i,i,{wewn:t.RGBA8,format:t.RGBA,typ:t.UNSIGNED_BYTE}),this._czarna=ma(t,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),t.disable(t.BLEND),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",a).f("uWariant",e).f("uBarwa",...C[a].c).f("uOdsl",1.15),t.drawArrays(t.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);t.readPixels(0,0,i,i,t.RGBA,t.UNSIGNED_BYTE,o),t.bindFramebuffer(t.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const n=s.getContext("2d"),l=n.createImageData(i,i);for(let h=0;h<i;h++)for(let u=0;u<i;u++){const c=((i-1-h)*i+u)*4,f=(h*i+u)*4,k=o[c],p=o[c+1],m=o[c+2],d=Math.max(k,p,m);l.data[f]=k,l.data[f+1]=p,l.data[f+2]=m,l.data[f+3]=Math.min(255,d*1.6)}return n.putImageData(l,0,0),s.toDataURL("image/png")}_wspolne(a,e){return a.uzyj().f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY)}freski(a,e,i,t,o){if(!e.freski.length)return;const s=this.gl,n=this._wspolne(this.pFresk,a);n.f("uRes",t,o).f("uCzas",a.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const l of e.freski)Math.abs(l.x-a.cam.x)>a.polX+4||(n.f("uSrodek",l.x,l.y).f("uObsz",3.9,2.25).i("uTyp",l.kraina).f("uBarwa",...C[l.kraina].c).f("uOdsl",l.odkryty?0:l.odsloniecie).f("uOdkryty",l.odkryty?1:0).f("uZaplon",l.odkryty&&l.tZaplonu!=null?Math.exp(-Math.max(0,a.czas-l.tZaplonu)*.9):0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(a,e,i,t,o,s){const n=this.gl,l=a.polX+1.5;let h=this._wspolne(this.pDrobinka,a);for(const u of i.drobinki)Math.abs(u.px-a.cam.x)>l||(h.f("uSrodek",u.px,u.py).f("uObsz",.9,.9).f("uBarwa",...e.barwaSw).f("uPuls",.8+.2*Math.sin(a.czas*2.2+u.faza)),n.drawArrays(n.TRIANGLE_STRIP,0,4));if(i.slady.length){h=this._wspolne(this.pSlad,a),h.f("uRes",o,s).f("uCzas",a.czas).tex("uSwiatlo",1,t).f("uSkala",.42);for(const u of i.slady)Math.abs(u.x-a.cam.x)>l||(h.f("uSrodek",u.x,u.y+Math.sin(a.czas*.8+u.faza)*.06).f("uObsz",.75,.75).i("uTyp",u.kraina).f("uWariant",u.wariant).f("uBarwa",...C[u.kraina].c).f("uOdsl",u.odsloniecie),n.drawArrays(n.TRIANGLE_STRIP,0,4))}if(i.efekty.length){h=this._wspolne(this.pKrag,a);for(const u of i.efekty){const c=u.rodzaj===2?5:u.rodzaj===1?2.2:1.3;h.f("uSrodek",u.x,u.y).f("uObsz",c+.5,c+.5).f("uBarwa",...e.barwaSw).f("uT",u.t).f("uR",c),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}}const La=["wszystko","tlo","swiat","swiatlo","glow","maska"],ae=170;class te{constructor(a,e){this.gl=a,this.swiat=e,this.szum=nt(a),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=tt(a);this.bTlo=new W(a,4,4,i),this.bSwiat=new W(a,4,4,i),this.bSwiatlo=new W(a,4,4,i),this.bSurowe=new W(a,4,4,i),this.bGlow=[new W(a,4,4,i),new W(a,4,4,i),new W(a,4,4,i)],this.bGlowWy=new W(a,4,4,i),this.pNiebo=new R(a,q,ft,"niebo"),this.pWarstwa=new R(a,q,pt,"warstwa"),this.pBliska=new R(a,q,kt,"warstwa-bliska"),this.pGra=new R(a,q,mt,"plan-gry"),this.pDrobinki=new R(a,wt,yt,"drobinki"),this.pKopia=new R(a,q,ct,"kopia"),this.pDol=new R(a,q,lt,"rozmyj-dol"),this.pGora=new R(a,q,ut,"rozmyj-gora"),this.pFinal=new R(a,q,ht,"final"),this.iskierka=new _t(a),this.wypiek=new It(a,this.szum,e),this.flora=new Nt(a,e),this.szklo=new Ut(a,this.szum),this.obiekty=new Qt(a,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[Ma,0,0],wL:new Float32Array(E),wP:new Float32Array(E)},this._camL=[0,0]}rozmiar(a,e){this.w=a,this.h=e;const i=this.jakosc;this.bTlo.rozmiar(a*i.tlo,e*i.tlo),this.bSwiat.rozmiar(a,e),this.bSwiatlo.rozmiar(a*i.swiatlo,e*i.swiatlo),this.bSurowe.rozmiar(a*i.swiatlo,e*i.swiatlo);let t=a*i.swiatlo,o=e*i.swiatlo;for(const s of this.bGlow)t/=2,o/=2,s.rozmiar(t,o);this.bGlowWy.rozmiar(a*i.swiatlo*.5,e*i.swiatlo*.5)}miniatura(a,e){return this.obiekty.miniatura(a,e)}_atmosfera(a){const e=this.atm,i=this.swiat,t=a.cam.x;i.mieszaj(t-a.polX,"mgla",e.mglaL),i.mieszaj(t+a.polX,"mgla",e.mglaP),i.mieszaj(t,"mgla",e.mgla),i.mieszaj(t,"mgla2",e.mgla2),i.mieszaj(t,"nieboGora",e.gora),i.mieszaj(t,"nieboDol",e.dol),i.mieszaj(t,"emis",e.emis);for(let m=0;m<3;m++)e.barwaSw[m]=e.mgla[m]*.68+.34;const o=m=>i.mieszajLiczbe(t,d=>d.niebo[m]);e.niebo[0]=o("tarcza"),e.niebo[1]=o("obrecz"),e.niebo[2]=o("zorza"),e.niebo[3]=o("gwiazdy"),e.poswiata=o("poswiata");const s=o("snopy");e.pogoda[0]=i.mieszajLiczbe(t,m=>m.wiatr),e.pogoda[1]=s,e.pogoda[2]=i.mieszajLiczbe(t,m=>m.mglistosc);const n=i.segment(t),l=a.polX/a.polY;e.cialo[0]=Math.max(-l*.8,Math.min(l*.8,(i.srodekSegmentu(n)-t)*.011+l*.28)),e.cialo[1]=.4-(a.cam.y-5.3)*.012;const h=e.niebo[0]+e.niebo[1];let u=e.cialo[0]*h+.25*s,c=e.cialo[1]*h+1*s+.3;const f=Math.hypot(u,c)||1;e.swNieba[0]=u/f,e.swNieba[1]=c/f,e.swNieba[2]=Math.min(1,.35+h*.7+s*.3),e.gruntY[0]=i.ziemia(t-a.polX),e.gruntY[1]=i.ziemia(t+a.polX),i.wagi(t-a.polX,e.wL),i.wagi(t+a.polX,e.wP),e.woda[1]=e.wL[1],e.woda[2]=e.wP[1];const k=Math.max(0,Math.min(1,(a.iskra.zasieg-a.iskra.zasiegBazowy)/4.7)),p=e.otoczenie=.36+.64*Math.pow(k,.75);for(let m=0;m<3;m++)e.mglaL[m]*=p,e.mglaP[m]*=p,e.mgla[m]*=p,e.mgla2[m]*=p,e.gora[m]*=p,e.dol[m]*=p;return e.niebo[0]*=p,e.niebo[1]*=p,e.niebo[2]*=p,e.poswiata*=p,e.swNieba[2]*=p,e}_widok(a,e){a.f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY).f("uRes",this.w,this.h).f("uCzas",e.czas).tex("uSzum",0,this.szum)}_warstwa(a,e,i,t){const o=D[e],s=this.wypiek.warstwy[e];Lt(o,i.cam,this._camL),this._widok(a.uzyj(),i),a.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Ot*o.szer),o.y0,1/o.wys).f("uMglaL",...t.mglaL).f("uMglaP",...t.mglaP).f("uMgla2",...t.mgla2).f("uAtm",o.zamglenie,o.mgla,o.otoczenie,o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...t.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...t.pogoda).f("uSwNieba",...t.swNieba).f("uGruntY",...t.gruntY).f("uJasnosc",o.jasnosc),U(this.gl)}rysuj(a){const e=this.gl;if(e.disable(e.BLEND),this.warstwa==="maska"){this._maska(a);return}const i=this._atmosfera(a);if(this.wypiek.zapewnij(a.cam,a.polX,a.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),a),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata),U(e),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),!this.bez.dalekie)for(let h=0;h<4;h++)this._warstwa(this.pWarstwa,h,a,i);e.disable(e.BLEND);const t=a.tecze?a.tecze.wachlarze:[],o=t.length>0;o&&(this.bSurowe.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.szklo.wachlarze(a,t),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),U(e)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,a.znaleziska&&a.znaleziska.freski.length&&(this.bTlo.ustaw(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(a,a.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),e.disable(e.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),U(e)):this._warstwa(this.pGra,Z,a,i),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(a,i,this.bSwiatlo.tex[0],this.w,this.h),a.odlamki&&this.szklo.odlamki(a,i,a.odlamki,this.bSwiatlo.tex[0],this.w,this.h),a.znaleziska&&this.obiekty.reszta(a,i,a.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(ae*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",Ma).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),e.drawArrays(e.POINTS,0,s)),a.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(a),this.bez.bliska||this._warstwa(this.pBliska,5,a,i),e.disable(e.BLEND),Ka(e,this.w,this.h);const n=La.indexOf(this.warstwa),l=n===1?this.bTlo.tex[0]:n===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,l).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uTryb",n===4?3:n===0?0:1).f("uZiarno",this.ziarno),U(e)}pomiar(a,e=40){const i=this.gl,t=new Uint8Array(4);this.rysuj(a),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,t);const o=performance.now();for(let s=0;s<e;s++)a.czas+=.016,this.rysuj(a);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,t),(performance.now()-o)/e}_maska(a){const e=this.gl;Ka(e,this.w,this.h),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),a.mgla=this.atm.mgla,this.iskierka.rysuj(a,!0)}_poswiata(){const a=this.gl;let e=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),U(a),e=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const t=this.bGlow[i];t.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),U(a),e=t}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),U(a)}}const xa={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class ee{constructor(a){this.canvas=a,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const e=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",t=>{const o=t.key.toLowerCase();xa[o]&&!t.ctrlKey&&!t.metaKey&&!t.altKey&&(this.wcisniete.add(o),t.preventDefault(),e())}),addEventListener("keyup",t=>this.wcisniete.delete(t.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),a.addEventListener("pointerdown",t=>{this.wskaznik={x:t.clientX,y:t.clientY};try{a.setPointerCapture(t.pointerId)}catch{}e()}),a.addEventListener("pointermove",t=>{this.wskaznik&&(this.wskaznik.x=t.clientX,this.wskaznik.y=t.clientY)});const i=()=>{this.wskaznik=null};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",t=>t.preventDefault())}odczyt(a){let e=0,i=0;for(const s of this.wcisniete)e+=xa[s][0],i+=xa[s][1];const t=Math.hypot(e,i);t>1&&(e/=t,i/=t);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),n=(this.wskaznik.x-s.left)/s.width*2-1,l=1-(this.wskaznik.y-s.top)/s.height*2;o=[a.cam.x+n*a.polX,a.cam.y+l*a.polY]}return{cel:o,os:[e,i]}}}function ie(r){const a=document.createElement("div");a.className="dev",a.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>`,document.getElementById("nakladka").appendChild(a);const e=a.querySelector("#dev-stan"),i=a.querySelector("#dev-warstwy");for(const s of La){const n=document.createElement("button");n.textContent=s,n.dataset.w=s,n.onclick=()=>{r.renderer.warstwa=s,ra("warstwa",s==="wszystko"?null:s),o()},i.appendChild(n)}const t=a.querySelector("#dev-tele");for(const s of r.teleporty()){const n=document.createElement("button");n.textContent=s.nazwa,n.onclick=()=>r.teleport(s.x),t.appendChild(n)}a.querySelector("#dev-ziarno").onclick=()=>{ra("ziarno",Math.floor(Math.random()*1e6)),location.reload()},a.querySelector("#dev-pauza").onclick=()=>{r.petla.pauza=!r.petla.pauza};function o(){for(const s of i.children)s.classList.toggle("wl",s.dataset.w===r.renderer.warstwa)}return o(),setInterval(()=>{const s=r.petla,n=r.renderer,l=r.stan;e.innerHTML=`<b>${s.fps.toFixed(0)} kl./s</b> · ${s.msKlatki.toFixed(1)} ms · ${n.w}×${n.h}<br>ziarno ${r.ziarno} · x ${l.iskra.x.toFixed(1)} y ${l.iskra.y.toFixed(1)} · ${r.opisJakosci()}`},250),a}const Ia=132,ea=22,Oa=46;class oe{constructor(a){this.ziarno=a|0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(E),this._w2=new Float32Array(E)}_permSurowa(a){const e=ia(this.ziarno,a,5),i=[...Array(E).keys()];for(let t=E-1;t>0;t--){const o=Math.floor(e()*(t+1));[i[t],i[o]]=[i[o],i[t]]}if(a===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(a){let e=this._perm.get(a);if(!e){e=this._permSurowa(a);const i=this._permSurowa(a-1)[E-1];a!==0&&e[0]===i?[e[0],e[1]]=[e[1],e[0]]:a===0&&(this._permSurowa(1)[0],e[E-1]),this._perm.set(a,e)}return e}krainaSegmentu(a){const e=Math.floor(a/E);return this._permutacja(e)[a-e*E]}granica(a){return a*Ia-Oa+(ta(a,this.ziarno,77)-.5)*34}segment(a){let e=Math.floor((a+Oa)/Ia);for(;a<this.granica(e);)e--;for(;a>=this.granica(e+1);)e++;return e}srodekSegmentu(a){return(this.granica(a)+this.granica(a+1))/2}wagi(a,e=new Float32Array(E)){e.fill(0);const i=this.segment(a),t=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(a>o-ea){const n=la(o-ea,o+ea,a);e[s]+=1-n,e[this.krainaSegmentu(i+1)]+=n}else if(a<t+ea){const n=la(t-ea,t+ea,a);e[this.krainaSegmentu(i-1)]+=1-n,e[s]+=n}else e[s]=1;return e}krainaW(a){return this.krainaSegmentu(this.segment(a))}mieszaj(a,e,i=[0,0,0]){const t=this.wagi(a,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<E;o++)if(t[o]>0){const s=C[o][e];i[0]+=s[0]*t[o],i[1]+=s[1]*t[o],i[2]+=s[2]*t[o]}return i}mieszajLiczbe(a,e){const i=this.wagi(a,this._w2);let t=0;for(let o=0;o<E;o++)i[o]>0&&(t+=i[o]*e(C[o],o));return t}teleporty(){const a=[];for(let e=0;a.length<E&&e<40;e++){const i=this.krainaSegmentu(e);a.some(t=>t.kraina===i)||a.push({nazwa:C[i].id,kraina:i,x:this.srodekSegmentu(e),segment:e})}return a.sort((e,i)=>e.kraina-i.kraina)}_terenKrainy(a,e){const i=C[a].teren,t=this.ziarno,o=B(e*.021,t+3,3);switch(a){case 1:{const s=B(e*.05,t+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(B(e*.4,t+32,2)-.5)}case 2:{const s=B(e*.35,t+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,n=.55,l=s/n,h=Math.floor(l),u=l-h;return(h+la(.35,.65,u))*n+.05*(B(e*.6,t+51,2)-.5)}case 4:{const s=B(e*.032,t+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(e*.21+6*s)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(B(e*.23,t+21,3)-.5)*2}}ziemia(a){const e=this.wagi(a,this._w);let i=0;for(let t=0;t<E;t++)e[t]>0&&(i+=e[t]*this._terenKrainy(t,a));return i}sufit(a){const e=this.wagi(a,this._w)[0];return e<.02?1e4:C[0].teren.sufit+1.1*(B(a*.11,this.ziarno+71,3)-.5)+(1-e)*9}granicaLotu(a){return Math.min(15.3,this.sufit(a)-.5)}terenWarstwy(a,e){if(a===Z)return this.ziemia(e);const i=D[a],t=e/i.mnoznikX,o=e/i.z,s=this.ziarno+100*(a+1),n=this.wagi(t,this._w),l=a===0?1.7:a===1?1.25:1;let h=0;if(n[0]>0&&(h+=n[0]*(1.5*B(o*.06,s,3)+.3*B(o*.3,s+1,2))),n[1]>0&&(h+=n[1]*(.35*B(o*.07,s+2,2)+.2)),n[2]>0){const u=B(o*.11,s+3,3);h+=n[2]*(2.3*(1-Math.abs(2*u-1))*l+.5*B(o*.5,s+4,2))}if(n[3]>0){const u=B(o*.05,s+5,2)*3;h+=n[3]*((Math.floor(u)+la(.4,.6,u-Math.floor(u)))*.55+.2)}return n[4]>0&&(h+=n[4]*(1.9*B(o*.045,s+6,2)*l+.25*Math.sin(o*.3))),i.bliska&&(h=h*.6-.5),h*i.z}sufitWarstwy(a,e){if(a===Z)return this.sufit(e);const i=D[a];if(a<2||i.bliska)return 1e4;const t=this.wagi(e/i.mnoznikX,this._w)[0];return t<.02?1e4:i.A+i.z*(a===2?3.4:4.3)+i.z*(1.4*(B(e/i.z*.1,this.ziarno+80+a,3)-.5)+(1-t)*9)}rekwizyty(a,e){const i=a*1e6+e+5e5;let t=this._komorki.get(i);return t||(this._komorki.size>600&&this._komorki.clear(),t=Ft(this,a,e),this._komorki.set(i,t)),t}rekwizytyW(a,e,i){const t=D[a],o=t.komorka*t.z,s=9*t.z,n=[];for(let l=Math.floor((e-s)/o);l<=Math.floor((i+s)/o);l++)for(const h of this.rekwizyty(a,l))h.x+h.ox>e&&h.x-h.ox<i&&n.push(h);return n.sort((l,h)=>l.kolejnosc-h.kolejnosc),n}_bryly(a){const e=D[Z],i=Math.floor(a/e.komorka),t=this._tmpBryly||(this._tmpBryly=[]);t.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(Z,o))s.bryla&&t.push(s.bryla);return t}odleglosc(a,e){let i=Math.min(e-this.ziemia(a),this.granicaLotu(a)-e);for(const t of this._bryly(a)){const o=Math.abs(a-t.x)-t.rx,s=Math.abs(e-t.y)-t.ry,n=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-t.r;n<i&&(i=n)}return i}_normalna(a,e){const t=this.odleglosc(a+.06,e)-this.odleglosc(a-.06,e),o=this.odleglosc(a,e+.06)-this.odleglosc(a,e-.06),s=Math.hypot(t,o)||1;return[t/s,o/s]}odpychanie(a,e,i){const t=this.odleglosc(a,e)-i,o=.75;if(t>=o)return se;const s=this._normalna(a,e),n=10*(1-Math.max(0,t)/o)**2;return[s[0]*n,s[1]*n]}zderzenie(a,e,i){const t=this.odleglosc(a,e)-i;if(t>=0)return null;const o=this._normalna(a,e);return{nx:o[0],ny:o[1],gl:-t}}woda(a){return this.ziemia(a)<Ma}}const se=[0,0],re=1.44,ne=1.66,ce=.54,le=1.4,ba=13,ue=.2,ga=18,oa=new Float32Array(na*2);function he(r,a,e,i,t,o,s){let n=!1,l=0;for(let h=0;h<5;h++){let u=1e9,c=0,f=0,k=-1;for(let g=0;g<r;g++){const S=(g+1)%r,w=oa[g*2],K=oa[g*2+1],x=oa[S*2]-w,b=oa[S*2+1]-K,I=i*b-t*x;if(Math.abs(I)<1e-9)continue;const F=w-a,G=K-e,za=(F*b-G*x)/I,Ra=(F*t-G*i)/I;za>1e-4&&Ra>=0&&Ra<=1&&za<u&&(u=za,c=x,f=b,k=g)}if(k<0)return null;a+=i*u,e+=t*u;let p=f,m=-c;const d=Math.hypot(p,m);p/=d,m/=d;let y=-(i*p+t*m);y<0&&(p=-p,m=-m,y=-y);const z=n?o:1/o,v=1-z*z*(1-y*y);if(v<0)i+=2*y*p,t+=2*y*m,l++;else{const g=Math.sqrt(v);if(i=z*i+(z*y-g)*p,t=z*t+(z*y-g)*m,n=!n,!n){const S=Math.hypot(i,t);return s[0]=a,s[1]=e,s[2]=i/S,s[3]=t/S,s[4]=k,s[5]=l,s}}const _=Math.hypot(i,t);i/=_,t/=_}return null}const fe=[0,0,0,0,0,0],fa=(r,a)=>{let e=r-a;for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},Sa=r=>r-Math.floor(r),H=[];for(let r=0;r<na;r++)H.push({wr:0,rx:0,ry:0,wf:0,fx:0,fy:0,px:0,py:0,ile:0,waga:0,kat:0,dk:0,ox:0,oy:0,szer:0});function Na(r,a,e){const i=r.v.length,t=Math.hypot(a,e),o=-a/t,s=-e/t,n=1.9*r.zasieg/ba;Aa.wierzcholki(r,oa);for(let u=0;u<i;u++){const c=H[u];c.wr=c.rx=c.ry=c.wf=c.fx=c.fy=c.px=c.py=c.ile=c.waga=0}let l=0,h=0;for(let u=0;u<ba;u++){const c=((u+.5)/ba*2-1)*r.zasieg*.95;let f=-s*c-a,k=o*c-e;const p=Math.hypot(f,k);f/=p,k/=p;let m=!1;for(let d=0;d<2;d++){const y=he(i,a,e,f,k,d?ne:re,fe);if(!y||(m=!0,y[5]>2||y[2]*o+y[3]*s<ue))continue;const z=y[5]===0?1:y[5]===1?.5:.25,v=H[y[4]];d?(v.wf+=z,v.fx+=y[2]*z,v.fy+=y[3]*z):(v.wr+=z,v.rx+=y[2]*z,v.ry+=y[3]*z),v.px+=y[0]*z,v.py+=y[1]*z,v.ile++}m&&l++}for(let u=0;u<i;u++){const c=H[u];if(c.wr<=0||c.wf<=0){c.waga=0;continue}const f=Math.atan2(c.ry,c.rx);c.dk=fa(Math.atan2(c.fy,c.fx),f),c.kat=f+c.dk/2,c.ox=c.px/(c.wr+c.wf),c.oy=c.py/(c.wr+c.wf),c.waga=(c.wr+c.wf)/(2*Math.max(1,l)),c.szer=c.ile*.5*n,c.waga>h&&(h=c.waga)}return h}function Wa(r,a,e,i,t,o){const s=Sa(a.faza*7.31+e*.37),n=Sa(a.faza*3.17+e*.61),l=Sa(a.faza*5.71+e*.23),h=Math.abs(r.dk);return o.rozw=Math.max(.27,Math.min(le,(ce+.72*(1-Math.exp(-h*4)))*(.9+.22*s)*(.3+1*t))),o.start=Math.min(1,Math.max(.2,r.szer*.8/Math.tan(o.rozw/2))),o.dlugosc=Math.min(5.2,i*(.52+.45*Math.sqrt(r.waga))*(.85+.3*n)*(.4+.85*t)),o.skos=(l*2-1)*.55,o.znak=(r.dk>=0?1:-1)*Math.min(1,h/.035),o}function Za(r,a,e,i=0){const t=Math.abs(r),o=a-i;if(t>=1||o<=0)return 0;const s=(t-.6)/.4,n=t<.6?1:1-s*s*(3-2*s),l=o/e,h=Math.min(1,o/.4);return n*h*h*(3-2*h)*Math.exp(-l*l*2.4)}const L={};class pe{constructor(){this.wachlarze=[],this._pula=[]}aktualizuj(a,e,i){const t=this.wachlarze;t.length=0;const o=1.6+e.zasieg*1.25,s=1.7+e.zasieg*.62,n=1-Math.exp(-a*9),l=1-Math.exp(-a*5);let h=0;const u=()=>(this._pula[h]||(this._pula[h]={}),this._pula[h++]);for(const f of i){const k=f.px-e.x,p=f.py-e.y,m=Math.hypot(k,p);let d=0;m<o&&m>f.zasieg*.6&&(d=Math.pow(1-m/o,1.15));const y=f.oswietlenie;if(f.oswietlenie+=(d-f.oswietlenie)*l,y<.15&&f.oswietlenie>=.15&&this.naSzklo?.(f),f.oswietlenie<.01||m<.001){f.wachlarz=null;continue}const z=f.v.length;let v=f.wachlarz;if(!v){v=f.wachlarz=[];for(let g=0;g<z;g++)v.push({sila:0,kat:0,ox:0,oy:0,rozw:0,start:0,dlugosc:0,skos:0,znak:0})}const _=d>0?Na(f,-k,-p):0;for(let g=0;g<z;g++){const S=H[g],w=v[g],K=_>0?S.waga/_:0;if(K<.4)w.sila+=(0-w.sila)*l;else{Wa(S,f,g,s,d,L);const I=S.ox-Math.cos(S.kat)*L.start,F=S.oy-Math.sin(S.kat)*L.start;w.sila<.02?(w.kat=S.kat,w.ox=I,w.oy=F,w.rozw=L.rozw,w.start=L.start,w.dlugosc=L.dlugosc,w.znak=L.znak):(w.kat+=fa(S.kat,w.kat)*n,w.ox+=(I-w.ox)*n,w.oy+=(F-w.oy)*n,w.rozw+=(L.rozw-w.rozw)*n,w.start+=(L.start-w.start)*n,w.dlugosc+=(L.dlugosc-w.dlugosc)*n,w.znak+=(L.znak-w.znak)*n),w.skos=L.skos,w.sila+=(Math.pow(K,1.5)-w.sila)*l}const x=w.sila*f.oswietlenie*Math.min(1,Math.abs(w.znak)*1.6);if(x<.02||t.length>=ga-2)continue;const b=u();b.x=f.px+w.ox,b.y=f.py+w.oy,b.kat=w.kat,b.rozwarcie=w.rozw,b.dlugosc=w.dlugosc,b.start=w.start,b.skos=w.skos,b.sila=x,b.znak=w.znak>=0?1:-1,b.zi=f.faza+g*1.7,b.zrodlo=f,b.wtorny=!1,t.push(b)}}const c=t.length;for(let f=0;f<c&&t.length<ga;f++){const k=t[f];for(const p of i){if(p===k.zrodlo)continue;const m=p.px-k.x,d=p.py-k.y,y=Math.hypot(m,d);if(y>k.start+k.dlugosc*.95||y<k.start+.4)continue;const z=fa(Math.atan2(d,m),k.kat)/(k.rozwarcie/2),v=Za(z,y,k.dlugosc,k.start)*k.sila*.75;if(v<.12||Na(p,-m,-d)<=0)continue;let g=0;for(let K=1;K<p.v.length;K++)H[K].waga>H[g].waga&&(g=K);const S=H[g];if(Wa(S,p,g+3,k.dlugosc*.9,Math.min(1,.35+v),L),Math.abs(L.znak)<.6)continue;const w=u();if(w.x=p.px+S.ox-Math.cos(S.kat)*L.start,w.y=p.py+S.oy-Math.sin(S.kat)*L.start,w.kat=S.kat,w.rozwarcie=L.rozw,w.dlugosc=L.dlugosc,w.start=L.start,w.skos=L.skos,w.sila=v,w.znak=L.znak>=0?1:-1,w.zi=p.faza+1,w.zrodlo=p,w.wtorny=!0,p.oswietlenie=Math.max(p.oswietlenie,v*.8),t.push(w),t.length>=ga)break}}}natezenie(a,e,i=1){let t=0;for(const o of this.wachlarze){const s=a-o.x,n=e-o.y,l=Math.hypot(s,n);l>o.start+o.dlugosc*1.4*i||(t+=Za(fa(Math.atan2(n,s),o.kat)/(o.rozwarcie/2*i),l,o.dlugosc*i,o.start/i)*o.sila)}return t}}const ja=6,ka=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]}],Ea=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca"];function ke(r,a,e){const i=ia(r.ziarno,7717,a),t=a*Y,o={drobinki:[],slady:[],fresk:Va(r,a)};for(let s=0;s<3;s++){const n=t+(s+i())*Y/3,l=r.ziemia(n),h=Math.min(r.granicaLotu(n)-.8,l+8.5);o.drobinki.push({id:`d${a}:${s}`,x:n,y:l+.9+i()*Math.max(.5,h-l-.9),faza:i()*6.283})}return e.forEach((s,n)=>{if(!(i()>.42))for(let l=0;l<6;l++){const h=i()*6.283,u=1.5+i()*1.1,c=s.x+Math.cos(h)*u,f=s.y+Math.sin(h)*u*.85;if(f>r.ziemia(c)+.7&&f<r.granicaLotu(c)-.5){o.slady.push({id:`s${a}:${n}`,x:c,y:f,kraina:r.krainaW(c),wariant:Math.floor(i()*ja),faza:i()*6.283,odsloniecie:0});break}}}),o}class me{constructor(a,e,i){this.swiat=a,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.zdarzenie=null,e.naNowyKawalek=(t,o)=>this.kawalki.set(t,ke(a,t,o)),this._odlamki=e}krok(a,e,i,t){this.drobinki.length=0,this.slady.length=0,this.freski.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const l of s.drobinki){if(this.zebrane.has(l.id))continue;l.px=l.x+Math.sin(t*.7+l.faza)*.3,l.py=l.y+Math.cos(t*.9+l.faza)*.25;const h=Math.hypot(e.x-l.px,e.y-l.py);if(h<2.2&&h>.001){const u=(1-h/2.2)*2.4*a;l.x+=(e.x-l.px)*u,l.y+=(e.y-l.py)*u}if(h<.5){this.zebrane.add(l.id),e.energia=Math.min(1,e.energia+.17),e.tracnij(4),this.efekty.push({x:l.px,y:l.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",l);continue}this.drobinki.push(l)}for(const l of s.slady){if(this.zebrane.has(l.id))continue;const h=i.natezenie(l.x,l.y,1.3),u=l.odsloniecie;if(l.odsloniecie=Math.max(0,Math.min(1,l.odsloniecie+(h>.05?a*(.9+h*2):-a*.015))),u<.6&&l.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",l),l.odsloniecie>=.6&&Math.hypot(e.x-l.x,e.y-l.y)<.75){this.zebrane.add(l.id);const c=this.kolekcja.dodajSlad(l.kraina,l.wariant);e.energia=Math.min(1,e.energia+.12),e.tracnij(3),this.efekty.push({x:l.x,y:l.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...l,nowy:c});continue}l.odsloniecie>.005&&this.slady.push(l)}const n=s.fresk;if(n){const l=this.swiat.ziarno+":"+n.id;if(!n.odkryty&&(this.zebrane.has(n.id)||this.kolekcja.jestZapalony(l))&&(n.odkryty=!0),!n.odkryty){let h=0;for(let u=-2;u<=2;u++)h+=i.natezenie(n.x+u*.9,n.y+u%2*.5,1.3);if(h/=5,n.odsloniecie=Math.max(0,Math.min(1,n.odsloniecie+(h>.06?a*(.12+h*.5):-a*.01))),n.odsloniecie>=1){n.odkryty=!0,n.tZaplonu=t,this.zebrane.add(n.id),this.kolekcja.zapalFresk(l);const u=this.kolekcja.dodajFresk(n.kraina);e.energia=1,this.efekty.push({x:n.x,y:n.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...n,nowy:u})}}this.freski.push(n)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=a,s.t>1.6&&this.efekty.splice(o,1)}}}const Ga="iskierka-kolekcja-v1";class de{constructor(a=ze()){this.pamiec=a,this.slady={},this.freski={},this.zapalone={};try{const e=JSON.parse(a?.getItem(Ga)||"null");e&&typeof e=="object"&&(this.slady=e.slady||{},this.freski=e.freski||{},this.zapalone=e.zapalone||{})}catch{}this.naZmiane=null}_zapisz(){try{this.pamiec?.setItem(Ga,JSON.stringify({slady:this.slady,freski:this.freski,zapalone:this.zapalone}))}catch{}this.naZmiane?.()}dodajSlad(a,e){const i=`${a}-${e}`,t=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),t}dodajFresk(a){const e=!this.freski[a];return this.freski[a]=!0,this._zapisz(),e}zapalFresk(a){this.zapalone[a]=!0,this._zapisz()}jestZapalony(a){return!!this.zapalone[a]}maSlad(a,e){return!!this.slady[`${a}-${e}`]}maFresk(a){return!!this.freski[a]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return ka.length*ja}wszystkichFreskow(){return Ea.length}wyczysc(){this.slady={},this.freski={},this.zapalone={},this._zapisz()}}function ze(){try{return window.localStorage}catch{return null}}class we{constructor(a){this.kolekcja=a;const e=this.el=document.createElement("div");e.className="hud",e.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(e),this.slady=e.querySelector("#hud-slady"),this.en=e.querySelector("#hud-en"),this.krainaEl=e.querySelector("#hud-kraina"),this.wiescEl=e.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(a){const e=Math.round(a*100);e!==this._enPoprz&&(this._enPoprz=e,this.en.style.width=e+"%")}ustawKraine(a){if(a===this.kraina)return;const e=this.kraina<0;this.kraina=a,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=C[a].nazwa,this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},e?300:900)}wiesc(a){clearTimeout(this._tw),this.wiescEl.textContent=a,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const qa=[{akord:[73.42,110,174.61,329.63],filtr:620,wiatr:.1,wiatrHz:500,skala:[293.66,349.23,440,523.25,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]}],ye=[.6,.9,1,.85,.65];class ve{constructor(){this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(E),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const a=window.AudioContext||window.webkitAudioContext,e=this.ac=new a;this.wyjscie=e.createGain(),this.wyjscie.gain.value=0,this.analizator=e.createAnalyser(),this.analizator.fftSize=1024;const i=e.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(e.destination),this.poglos=e.createGain(),this.poglos.gain.value=.3;for(const[l,h]of[[.37,.52],[.53,.46]]){const u=e.createDelay(1.5);u.delayTime.value=l;const c=e.createBiquadFilter();c.type="lowpass",c.frequency.value=1900;const f=e.createGain();f.gain.value=h,this.poglos.connect(u),u.connect(c),c.connect(f),f.connect(u),c.connect(this.wyjscie)}const t=e.sampleRate*3,o=e.createBuffer(1,t,e.sampleRate),s=o.getChannelData(0);let n=0;for(let l=0;l<t;l++)n=n*.97+(Math.random()*2-1)*.03,s[l]=n*6;this.szum=e.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start(),this.tla=qa.map(l=>{const h=e.createGain();h.gain.value=0;const u=e.createBiquadFilter();u.type="lowpass",u.frequency.value=l.filtr,u.Q.value=.4,u.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),l.akord.forEach((m,d)=>{for(const y of[-5,6]){const z=e.createOscillator();z.type=d%2?"triangle":"sine",z.frequency.value=m,z.detune.value=y+d;const v=e.createGain();v.gain.value=.034/(1+d*.35);const _=e.createOscillator();_.frequency.value=.03+.017*d+(y>0?.011:0);const g=e.createGain();g.gain.value=v.gain.value*.6,_.connect(g),g.connect(v.gain),_.start(),z.connect(v),v.connect(u),z.start()}});const c=e.createBiquadFilter();c.type="bandpass",c.frequency.value=l.wiatrHz,c.Q.value=.7;const f=e.createGain();f.gain.value=l.wiatr*.45;const k=e.createOscillator();k.frequency.value=.07;const p=e.createGain();return p.gain.value=l.wiatr*.2,k.connect(p),p.connect(f.gain),k.start(),this.szum.connect(c),c.connect(f),f.connect(h),h})}async przelacz(a=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=a,a&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(a?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(a){this.glosnosc=a,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(a,this.ac.currentTime,.2)}aktualizuj(a,e){if(this.wagi.set(e),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=a,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<E;i++)this.tla[i].gain.setTargetAtTime(e[i]*ye[i],this.ac.currentTime,1.6)}}_krainaDominujaca(){let a=0;for(let e=1;e<E;e++)this.wagi[e]>this.wagi[a]&&(a=e);return a}_dzwonek(a,e,i=0,t=2.6,o="sine"){const s=this.ac,n=s.currentTime+i,l=s.createOscillator(),h=s.createOscillator(),u=s.createGain(),c=s.createGain();l.type=o,l.frequency.value=a,h.type="sine",h.frequency.value=a*2.01,c.gain.value=.18,u.gain.setValueAtTime(0,n),u.gain.linearRampToValueAtTime(e,n+.02),u.gain.exponentialRampToValueAtTime(4e-4,n+t),l.connect(u),h.connect(c),c.connect(u),u.connect(this.wyjscie),u.connect(this.poglos),l.start(n),h.start(n),l.stop(n+t+.1),h.stop(n+t+.1)}zdarzenie(a,e){if(a in this.licznik&&this.licznik[a]++,!this.ac||!this.wlaczony)return;const i=qa[e&&e.kraina!=null?e.kraina:this._krainaDominujaca()].skala;if(a==="szklo"){const t=this.ac.currentTime;if(t-this._ostSzklo<.35)return;this._ostSzklo=t;const o=i[Math.abs(Math.floor(e.faza*97))%i.length]*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else a==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):a==="odsloniecie"?[0,2,4].forEach((t,o)=>this._dzwonek(i[t],.04,o*.16,2.8)):a==="slad"?[0,1,2,3,4].forEach((t,o)=>this._dzwonek(i[t]*(o===4?2:1),.05,o*.13,3.2)):a==="fresk"&&[0,2,4,1,3].forEach((t,o)=>{this._dzwonek(i[t]/2,.06,o*.4,6),this._dzwonek(i[t]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const a=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(a);let e=0;for(const i of a)e+=i*i;return Math.sqrt(e/a.length)}}const sa=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],xe=2.5;class be{constructor(a){this.auto=!0,this.poziom=1,this.naZmiane=a,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return sa[this.poziom]}ustaw(a){a==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(sa.length-1,a|0))))}_zmien(a){a!==this.poziom&&(this.poziom=a,this.naZmiane(sa[a])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(a,e){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=e;return}if(this._blokada=Math.max(0,this._blokada-e),this._ms.push(a),this._czas+=e,this._czas<xe)return;let i=0,t=0;for(const s of this._ms)s<120&&(i+=s,t++);const o=t?i/t:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<sa.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const Ja="iskierka-ustawienia-v1",P=(r,a,e)=>{const i=document.createElement(r);return a&&(i.className=a),e!=null&&(i.textContent=e),i};function ge(){try{const r=JSON.parse(localStorage.getItem(Ja)||"null");if(r&&typeof r=="object")return{jakosc:"auto",glosnosc:.75,...r}}catch{}return{jakosc:"auto",glosnosc:.75}}function Se(r){try{localStorage.setItem(Ja,JSON.stringify(r))}catch{}}class _e{constructor(a){this.gra=a,this.otwarte=!1,this.ustawienia=ge();const e=document.getElementById("nakladka");this.tytul=P("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',e.appendChild(this.tytul);const i=this.rzad=P("div","rzad-przyciskow");this.bDzwiek=P("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await a.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=P("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),e.appendChild(i),this._opiszDzwiek(),this.obrot=P("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),e.appendChild(this.obrot),this.panel=P("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const t=P("div","okno"),o=P("div","okno-naglowek");o.appendChild(P("h2",null,"Pauza"));const s=P("div","zakladki");this.zakladki={};for(const[n,l]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const h=P("button","zakladka",l);h.type="button",h.onclick=()=>this._pokaz(n),s.appendChild(h),this.zakladki[n]=h}o.appendChild(s),this.bWroc=P("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=P("div","okno-tresc"),t.append(o,this.tresc),this.panel.appendChild(t),this.panel.addEventListener("pointerdown",n=>{n.target===this.panel&&this.przelacz(!1)}),e.appendChild(this.panel),addEventListener("keydown",n=>{n.key==="Escape"||n.key.toLowerCase()==="p"&&!this._wPolu(n)?(n.preventDefault(),this.przelacz()):n.key.toLowerCase()==="m"&&!this._wPolu(n)?this.bDzwiek.click():n.key.toLowerCase()==="f"&&!this._wPolu(n)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&a.sterowanie.poruszono&&this.przelacz(!0)}),a.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(a){const e=a.target;return e&&(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA")}_opiszDzwiek(){const a=this.gra.dzwiek;if(!a.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=a.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(a.wlaczony))}_zastosuj(){const a=this.ustawienia,e=this.gra;e.jakosc.ustaw(a.jakosc==="auto"?"auto":Number(a.jakosc)),e.dzwiek.ustawGlosnosc(a.glosnosc)}przelacz(a=!this.otwarte){a!==this.otwarte&&(this.otwarte=a,this.panel.hidden=!a,this.gra.petla.pauza=a,this.gra.petla.zamrozona=a,this.rzad.classList.toggle("schowany",a),a?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(a){this._zakladka=a;for(const[e,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",e===a);this.tresc.replaceChildren(a==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(a,e){const i=a+"-"+e;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(a,e)),this._miniatury.get(i)}_kolekcja(){const a=this.gra.kolekcja,e=P("div","kolekcja");return e.appendChild(P("p","kolekcja-stan",`Ślady: ${a.ileSladow()} z ${a.wszystkichSladow()} · freski: ${a.ileFreskow()} z ${a.wszystkichFreskow()}`)),C.forEach((i,t)=>{const o=P("section","kolekcja-kraina");o.appendChild(P("h3",null,`${i.nazwa} · ${ka[t].rodzaj.toLowerCase()}`));const s=P("div","siatka");for(let l=0;l<ja;l++){const h=a.maSlad(t,l),u=P("figure","kafel"+(h?" znaleziony":""));if(h){const c=new Image;c.src=this._miniatura(t,l),c.alt="",u.appendChild(c)}else u.appendChild(P("div","nieznany","?"));u.appendChild(P("figcaption",null,h?ka[t].nazwy[l]:"jeszcze w ciemności")),s.appendChild(u)}const n=P("p","fresk"+(a.maFresk(t)?" znaleziony":""),a.maFresk(t)?"✦ "+Ea[t]:"Fresk tej krainy czeka na barwne światło.");o.append(s,n),e.appendChild(o)}),e}_ustawienia(){const a=this.ustawienia,e=this.gra,i=P("div","ustawienia"),t=(f,k,p)=>{const m=P("label","pole");return m.appendChild(P("span","pole-opis",f)),m.appendChild(k),p&&m.appendChild(P("span","pole-uwaga",p)),i.appendChild(m),k},o=()=>{Se(a),this._zastosuj()},s=P("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),sa.forEach((f,k)=>s.appendChild(new Option(f.nazwa,String(k)))),s.value=String(a.jakosc),s.onchange=()=>{a.jakosc=s.value,o()},t("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const n=P("input");n.type="range",n.min="0",n.max="1",n.step="0.05",n.value=String(a.glosnosc),n.id="u-glosnosc",n.oninput=()=>{a.glosnosc=Number(n.value),o()},t("Głośność",n,e.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const l=P("div","rzad"),h=P("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");h.type="button",h.onclick=async()=>{await this.pelnyEkran(),h.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const u=P("button","przycisk","Nowy świat");u.type="button",u.onclick=()=>{ra("ziarno",Math.floor(Math.random()*1e6)),ra("kraina",null),ra("x",null),location.reload()};const c=P("button","przycisk","Wyczyść kolekcję");return c.type="button",c.onclick=()=>{c.dataset.pewne?(e.kolekcja.wyczysc(),c.textContent="Kolekcja wyczyszczona",c.disabled=!0):(c.dataset.pewne="1",c.textContent="Na pewno? Naciśnij jeszcze raz")},l.append(h,u,c),i.appendChild(l),i.appendChild(P("p","pole-uwaga",`Świat nr ${e.ziarno}. Ten sam numer w adresie (?ziarno=${e.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const Me=1080,N=document.getElementById("gra"),Pe=document.getElementById("nakladka");function Qa(r){const a=document.createElement("div");a.className="blad",a.textContent=r,Pe.appendChild(a)}function Ae(){const r=at(N);if(!r){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),Qa("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const a=new oe(j.ziarno),e=new te(r,a);La.includes(j.warstwa)&&(e.warstwa=j.warstwa);const i=new bt(j.ziarno);let t=null;const o=new ee(N),s=new Aa(a),n=new pe,l=new de,h=new me(a,s,l),u=new we(l);(j.test||j.warstwa==="maska")&&(u.el.style.visibility="hidden"),l.naZmiane=()=>u.odswiez();const c=new ve;n.naSzklo=x=>c.zdarzenie("szklo",x);const f=[(x,b)=>c.zdarzenie(x,b)],k=new Float32Array(C.length);h.zdarzenie=(x,b)=>{x==="slad"?u.wiesc(ka[b.kraina].nazwy[b.wariant]+(b.nowy?"":" (już w kolekcji)")):x==="fresk"&&u.wiesc(Ea[b.kraina]);for(const I of f)I(x,b)};const p={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:aa*16/9,polY:aa};let m=1;const d=new be(x=>{e.jakosc=x,m=x.skala,y()});e.jakosc=d.ustawienia;function y(){const x=Math.min(window.devicePixelRatio||1,2),b=N.clientWidth||innerWidth,I=N.clientHeight||innerHeight;let F=Math.min(I*x,Me)*m,G=F*b/I;G=Math.max(320,Math.round(G)),F=Math.max(180,Math.round(F)),(N.width!==G||N.height!==F)&&(N.width=G,N.height=F),p.polX=aa*G/F,e.rozmiar(G,F)}addEventListener("resize",y),y();function z(x){p.czas+=x,i.krok(x,t||o.odczyt(p),a);const b=1-Math.exp(-x*1.6);p.cam.x+=(i.x+i.vx*.5-p.cam.x)*b,p.cam.y+=(i.y+.6-p.cam.y)*b,v(),s.krok(x,p.cam,p.polX,p.czas),n.aktualizuj(x,i,s.widoczne),h.krok(x,i,n,p.czas),c.aktualizuj(x,a.wagi(i.x,k))}function v(){p.cam.y=Math.max(Math.max(a.ziemia(p.cam.x)+aa-1.9,4.7),Math.min(12.4,p.cam.y))}const _=()=>({cam:p.cam,polX:p.polX,polY:p.polY,czas:p.czas,iskra:i,tecze:n.ukryte?null:n,odlamki:s.widoczne,znaleziska:h});function g(x,b){b&&d.probka(b*1e3,b),i.zbudujSmuge(Q),u.energia(i.energia),u.ustawKraine(a.krainaW(i.x)),e.rysuj(_())}const S=new et({krok:z,rysuj:g}),w={gotowe:!0,canvas:N,sterowanie:o,jakosc:d,stan:p,petla:S,renderer:e,swiat:a,odlamki:s,tecze:n,znaleziska:h,kolekcja:l,hud:u,sluchacze:f,dzwiek:c,ziarno:j.ziarno,bledy:[],teleporty:()=>a.teleporty(),teleport(x,b){i.przenies(x,b??a.ziemia(x)+4.5),p.cam.x=x,p.cam.y=i.y+.6,v()},przewin(x){S.przewin(x),g()},rysuj:g,pomiar:x=>e.pomiar(_(),x),ustawWejscie(x){t=x},krainy:C,opisJakosci:()=>`jakość ${d.auto?"auto: ":""}${d.ustawienia.nazwa}`,info(){return{renderer:r.getParameter(r.RENDERER),w:N.width,h:N.height,fps:S.fps,hdr:r.ext.floatBuf}}};if(window.iskierka=w,j.kraina){const x=a.teleporty().find(b=>b.nazwa===j.kraina);x&&w.teleport(x.x+j.dx,a.ziemia(x.x+j.dx)+4.5+j.dy)}else j.x!=null?w.teleport(j.x):w.teleport(8);const K=w.menu=new _e(w);j.jakosc!=null&&d.ustaw(j.jakosc==="auto"?"auto":Number(j.jakosc)),j.debug&&ie(w),j.test&&(S.pauza=!0,j.jakosc==null&&d.ustaw(1),K.tytul.style.display="none",K.rzad.style.visibility="hidden",K.obrot.style.visibility="hidden"),S.start()}addEventListener("error",r=>{(window.__bledy||(window.__bledy=[])).push(String(r.message))});try{Ae()}catch(r){console.error(r),(window.__bledy||(window.__bledy=[])).push(String(r.message)),Qa("Nie udało się uruchomić gry: "+r.message)}
