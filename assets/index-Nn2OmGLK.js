(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();function aa(n){const t=n.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!t)return null;const e={floatBuf:!!t.getExtension("EXT_color_buffer_float"),halfBuf:!!t.getExtension("EXT_color_buffer_half_float")};return t.ext=e,t.bezFloat=new URLSearchParams(location.search).has("rgba8"),t.domyslnyVAO=t.createVertexArray(),t.bindVertexArray(t.domyslnyVAO),t}function Lt(n,t,e,i){const a=n.createShader(t);if(n.shaderSource(a,e),n.compileShader(a),!n.getShaderParameter(a,n.COMPILE_STATUS)){const o=n.getShaderInfoLog(a),s=e.split(`
`).map((r,l)=>`${l+1}: ${r}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return a}const Z=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class K{constructor(t,e,i,a="program"){this.gl=t,this.nazwa=a;const o=t.createProgram();if(t.attachShader(o,Lt(t,t.VERTEX_SHADER,e,a+".vs")),t.attachShader(o,Lt(t,t.FRAGMENT_SHADER,i,a+".fs")),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS))throw new Error(`Program "${a}" się nie zlinkował: ${t.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=t.getProgramParameter(o,t.ACTIVE_UNIFORMS);for(let r=0;r<s;r++){const l=t.getActiveUniform(o,r),u=l.name.replace(/\[0\]$/,"");this.u[u]=t.getUniformLocation(o,l.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(t,e,i,a,o){const s=this.gl,r=this.u[t];return r==null?this:(o!==void 0?s.uniform4f(r,e,i,a,o):a!==void 0?s.uniform3f(r,e,i,a):i!==void 0?s.uniform2f(r,e,i):s.uniform1f(r,e),this)}i(t,e){const i=this.u[t];return i!=null&&this.gl.uniform1i(i,e),this}fv(t,e,i){const a=this.gl,o=this.u[t];return o==null?this:(e===1?a.uniform1fv(o,i):e===2?a.uniform2fv(o,i):e===3?a.uniform3fv(o,i):a.uniform4fv(o,i),this)}tex(t,e,i){const a=this.gl,o=this.u[t];return o==null?this:(a.activeTexture(a.TEXTURE0+e),a.bindTexture(a.TEXTURE_2D,i),a.uniform1i(o,e),this)}}function kt(n,t,e,i={}){const{wewn:a=n.RGBA8,format:o=n.RGBA,typ:s=n.UNSIGNED_BYTE,dane:r=null,filtr:l=n.LINEAR,zawijanieS:u=n.CLAMP_TO_EDGE,zawijanieT:h=n.CLAMP_TO_EDGE,mipmapy:c=!1}=i,f=n.createTexture();return n.bindTexture(n.TEXTURE_2D,f),n.texImage2D(n.TEXTURE_2D,0,a,t,e,0,o,s,r),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,c?n.LINEAR_MIPMAP_LINEAR:l),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,l),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,u),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,h),c&&n.generateMipmap(n.TEXTURE_2D),f}function ea(n,t=!1){return n.ext.floatBuf&&!n.bezFloat?t?{wewn:n.RGBA16F,format:n.RGBA,typ:n.HALF_FLOAT}:{wewn:n.R11F_G11F_B10F,format:n.RGB,typ:n.HALF_FLOAT}:{wewn:n.RGBA8,format:n.RGBA,typ:n.UNSIGNED_BYTE}}class W{constructor(t,e,i,a,o={}){this.gl=t,this.formaty=Array.isArray(a)?a:[a],this.opcje=o,this.fbo=t.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(e,i)}rozmiar(t,e){if(t=Math.max(1,Math.round(t)),e=Math.max(1,Math.round(e)),t===this.w&&e===this.h)return;const i=this.gl;this.w=t,this.h=e;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>kt(i,t,e,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const a=i.checkFramebufferStatus(i.FRAMEBUFFER);if(a!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+a.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.viewport(0,0,this.w,this.h)}}function Et(n,t,e){n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t,e)}function Y(n){n.drawArrays(n.TRIANGLES,0,3)}const H=1/120;class ia{constructor({krok:t,rysuj:e}){this.krok=t,this.rysuj=e,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(t){if(!this.dziala)return;const e=(t-this.ostatni)/1e3;this.ostatni=t;const i=Math.min(e,.1);if(!this.pauza){this.zapas+=i;let a=0;for(;this.zapas>=H&&a<16;)this.krok(H),this.zapas-=H,a++;a===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/H,e),this._klatki++,this._okno+=e,this.historiaMs.push(e*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(t){const e=Math.round(t/H);for(let i=0;i<e;i++)this.krok(H)}}const q=new URLSearchParams(location.search),rt=(n,t)=>{const e=parseFloat(q.get(n));return Number.isFinite(e)?e:t},j={ziarno:Math.floor(rt("ziarno",1)),maZiarno:q.has("ziarno"),kraina:q.get("kraina"),x:q.has("x")?rt("x",0):null,dy:rt("dy",0),dx:rt("dx",0),debug:q.has("debug"),test:q.has("test"),warstwa:q.get("warstwa")||"wszystko",jakosc:q.get("jakosc"),maska:q.has("maska")};function st(n,t){const e=new URL(location.href);t==null?e.searchParams.delete(n):e.searchParams.set(n,t),history.replaceState(null,"",e)}function Xt(n){return()=>{n|=0,n=n+1831565813|0;let t=Math.imul(n^n>>>15,1|n);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Q(n,t=0,e=0){let i=Math.imul(n|0,668265261)^Math.imul(t|0,374761393)^Math.imul(e|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function et(n,t=0,e=0){return Xt(Q(n,t,e)*4294967296|0)}const oa=n=>n*n*(3-2*n);function sa(n,t=0){const e=Math.floor(n),i=n-e;return Q(e,t)+(Q(e+1,t)-Q(e,t))*oa(i)}function C(n,t=0,e=4){let i=0,a=.5,o=0;for(let s=0;s<e;s++)i+=a*sa(n,t+s*17),o+=a,n*=2.03,a*=.5;return i/o}const ra=(n,t,e)=>Math.max(t,Math.min(e,n)),nt=(n,t,e)=>{const i=ra((e-n)/(t-n),0,1);return i*i*(3-2*i)};function na(n,t,e){const i=new Float32Array(t*t);for(let s=0;s<i.length;s++)i[s]=Q(s,e,t);const a=new Float32Array(n*n),o=t/n;for(let s=0;s<n;s++){const r=s*o,l=Math.floor(r);let u=r-l;u=u*u*(3-2*u);const h=l%t*t,c=(l+1)%t*t;for(let f=0;f<n;f++){const p=f*o,m=Math.floor(p);let k=p-m;k=k*k*(3-2*k);const d=m%t,x=(m+1)%t,z=i[h+d],y=i[h+x],v=i[c+d],M=i[c+x];a[s*n+f]=z+(y-z)*k+(v+(M-v)*k-z-(y-z)*k)*u}}return a}function wt(n,t,e,i){const a=new Float32Array(n*n);let o=.5,s=0;for(let r=0;r<e;r++){const l=t<<r;if(l>n)break;const u=na(n,l,i+r*101);for(let h=0;h<a.length;h++)a[h]+=u[h]*o;s+=o,o*=.5}for(let r=0;r<a.length;r++)a[r]/=s;return a}function ca(n,t=256){const e=wt(t,4,5,11),i=wt(t,4,5,57),a=wt(t,16,4,93),o=new Uint8Array(t*t*4);for(let s=0;s<t*t;s++)o[s*4]=e[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=a[s]*255,o[s*4+3]=Q(s,7)*255;return kt(n,t,t,{dane:o,zawijanieS:n.REPEAT,zawijanieT:n.REPEAT,mipmapy:!0})}const B=`#version 300 es
precision highp float;
precision highp sampler2D;
`,dt=`
uniform vec2 uCam;
uniform vec2 uPol;
uniform vec2 uRes;
uniform float uCzas;
uniform sampler2D uSzum;
vec2 swiatZUv(vec2 uv){ return uCam + (uv * 2.0 - 1.0) * uPol; }
float kleby(vec2 p){ return texture(uSzum, p).r; }
float kleby2(vec2 p){ return texture(uSzum, p).g; }
float faktura(vec2 p){ return texture(uSzum, p).b; }
`,la=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,ua=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,ha=B+`
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
}`,fa=B+`
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
}`,ma=B+dt+`
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
}`,Yt=`
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
`,pa=B+dt+Yt+`
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
}`,ka=B+dt+`
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
}`,da=B+dt+Yt+`
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
}`,Ut=6,za=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, grubość, faza, rodzaj (0 trawa, 1 liana, 2 trzcina)
layout(location = 2) in vec4 aKol;     // barwa, podatność na wiatr
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
out vec2 vSw; out float vV; out vec3 vKol; out float vT;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${Ut});
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
}`,wa=B+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,ya=`#version 300 es
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
}`,va=B+`
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
}`,ut=20,gt=.17,O=96,xa=.42,yt=1.55,ba={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class ga{constructor(t=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=2.3,this.zasieg=this.zasiegBazowy,this.energia=0,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=Xt(t*7919+13),this.doDrgniecia=3,this.hx=new Float32Array(O),this.hy=new Float32Array(O),this.hi=0,this.hn=0,this.smuga=new Float32Array(ut*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let t=0;t<ut;t++)this.smuga[t*2]=this.x,this.smuga[t*2+1]=this.y}przenies(t,e){this.x=t,this.y=e,this.vx=0,this.vy=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(t){this.pulsV+=t}krok(t,e,i){this.t+=t;const a=ba;let o=e.os[0]*a.ciagKlawisze,s=e.os[1]*a.ciagKlawisze,r=o!==0||s!==0;if(e.cel){const d=e.cel[0]-this.x,x=e.cel[1]-this.y,z=Math.hypot(d,x);if(z>.12){const y=Math.min(1,z/1.8)*a.ciagWskaznik;o+=d/z*y,s+=x/z*y}r=!0}const l=this.t;if(o+=a.kolysanie*(Math.sin(l*.83)+.6*Math.sin(l*1.91+1.7)+.35*Math.sin(l*3.3+.4)),s+=a.kolysanie*(Math.cos(l*.71+.6)+.6*Math.sin(l*2.17+2.2)+.35*Math.cos(l*2.9+1.1)),this.doDrgniecia-=t,this.doDrgniecia<=0){this.doDrgniecia=a.drgniecieCo[0]+this.los()*(a.drgniecieCo[1]-a.drgniecieCo[0]);const d=this.los()*Math.PI*2,x=a.drgniecieSila[0]+this.los()*(a.drgniecieSila[1]-a.drgniecieSila[0]);this.vx+=Math.cos(d)*x,this.vy+=Math.sin(d)*x,this.pulsV+=1.2}const u=i.odpychanie(this.x,this.y,gt);o+=u[0],s+=u[1],this.vx+=o*t,this.vy+=s*t;const h=Math.exp(-t*(r?a.oporCiag:a.oporSwobodny));this.vx*=h,this.vy*=h;const c=Math.hypot(this.vx,this.vy);c>a.maksPredkosc&&(this.vx*=a.maksPredkosc/c,this.vy*=a.maksPredkosc/c),this.x+=this.vx*t,this.y+=this.vy*t;const f=i.zderzenie(this.x,this.y,gt*.8);if(f){this.x+=f.nx*f.gl,this.y+=f.ny*f.gl;const d=this.vx*f.nx+this.vy*f.ny;d<0&&(this.vx-=1.25*d*f.nx,this.vy-=1.25*d*f.ny,this.pulsV+=Math.min(6,-d*3))}const p=this.vx*.085,m=this.vy*.085;this.dvx+=((p-this.dx)*46-this.dvx*6.2)*t,this.dvy+=((m-this.dy)*46-this.dvy*6.2)*t,this.dx+=this.dvx*t,this.dy+=this.dvy*t,this.pulsV+=(-this.puls*90-this.pulsV*7)*t,this.puls+=this.pulsV*t,this.energia=Math.max(0,this.energia-t*.03);const k=this.zasiegBazowy+this.energia*3.6;this.zasieg+=(k-this.zasieg)*Math.min(1,t*1.4),this.hi=(this.hi+1)%O,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<O&&this.hn++}zbudujSmuge(t){const e=ut,i=this.smuga,a=Math.min(this.hn,Math.round(xa/t));let o=0,s=this.x,r=this.y;const l=this._odc||(this._odc=new Float32Array(O));let u=0;for(let z=0;z<a;z++){const y=(this.hi-z+O)%O,v=Math.hypot(this.hx[y]-s,this.hy[y]-r);if(o+v>yt){l[u++]=yt-o,o=yt;break}l[u++]=v,o+=v,s=this.hx[y],r=this.hy[y]}this.dlSmugi=o;let h=this.x,c=this.x,f=this.y,p=this.y,m=0,k=0,d=this.x,x=this.y;for(let z=0;z<e;z++){const y=o*z/(e-1);for(;m<u-1&&k+l[m]<y;){k+=l[m];const P=(this.hi-m+O)%O;d=this.hx[P],x=this.hy[P],m++}let v=d,M=x;if(u>0){const P=(this.hi-m+O)%O,A=this.hx[P],R=this.hy[P],w=Math.hypot(A-d,R-x),_=w>1e-6?Math.min(1,(y-k)/w):0;v=d+(A-d)*_,M=x+(R-x)*_}i[z*2]=v,i[z*2+1]=M}for(let z=1;z<e;z++){const y=z/(e-1),v=i[z*2]-i[z*2-2],M=i[z*2+1]-i[z*2-1],P=Math.hypot(v,M);if(P<1e-5)continue;const A=.03*y*y*Math.sin(y*o*5-this.t*6)*Math.min(1,o/.6);i[z*2]+=-M/P*A,i[z*2+1]+=v/P*A}for(let z=0;z<e;z++){const y=i[z*2],v=i[z*2+1];y<h&&(h=y),y>c&&(c=y),v<f&&(f=v),v>p&&(p=v)}this.pudlo[0]=h,this.pudlo[1]=f,this.pudlo[2]=c,this.pudlo[3]=p}}const Sa=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,_a=B+`
#define N ${ut}
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
}`;class Ma{constructor(t){this.gl=t,this.p=new K(t,Sa,_a,"iskierka")}rysuj(t,e=!1){const i=this.gl,a=t.iskra,o=1.3;this.p.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uPudlo",a.pudlo[0]-o,a.pudlo[1]-o,a.pudlo[2]+o,a.pudlo[3]+o).fv("uSm",2,a.smuga).f("uGlowa",a.x,a.y).f("uDef",a.dx,a.dy).f("uR",gt).f("uCzas",t.czas).f("uPuls",a.puls).f("uMaska",e?1:0).f("uDl",a.dlSmugi).f("uBarwa",...t.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const Pa=`#version 300 es
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
}`,Aa=`#version 300 es
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
}`,F=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.7,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8}],T=F.length,St=1.22,I=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:1.8,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:9,bliska:!0,postrzep:0}],G=4,_t=5.3,J=5.6,La=16;for(const n of I){if(n.gra)n.y0=-1,n.wys=20,n.A=_t;else{n.A=-n.s*J*n.z;const t=n.A-J*n.z-.3*n.z,e=n.A+(15-_t)*n.f*n.z+J*n.z+.3*n.z;n.y0=t,n.wys=e-t}n.szer=La*n.z,n.pxW=n.px,n.pxH=Math.round(n.px*n.wys/n.szer/16)*16,n.mnoznikX=n.f*n.z}function Ea(n,t,e=[0,0]){return e[0]=t.x*n.mnoznikX,e[1]=n.gra?t.y:n.A+(t.y-_t)*n.f*n.z,e}const b={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14},ja=[2.3,1.75,1.4,1.12,1,1.35];function vt(n,t,e=.07){const i=1+(n()-.5)*2*e;return[t[0]*i,t[1]*i,t[2]*i]}function S(n,t,e,i,a,o,s,r={}){const l=F[t],u={typ:e,x:i,y:a,w:o,h:s,rot:0,par:[0,0,0,0],zi:n(),kraina:t,ka:vt(n,l.a),kb:vt(n,l.b),kc:vt(n,l.c),przed:!1,kolejnosc:n(),odbij:n()<.5?-1:1,bryla:null,...r};if(u.ox==null&&(u.ox=Math.abs(o)*1.25),u.oy==null&&(u.oy=Math.abs(s)*1.12),u.rot){const h=Math.hypot(u.ox,u.oy);u.ox=h,u.oy=h}return u}function Ta(n,t,e,i,a,o,s){const r=n.terenWarstwy(t,o),l=e.y0+e.wys/2,u=e.wys/2+e.z,h=(c,f,p)=>s.push(S(a,0,b.PIEN,c,l,f,u,{par:[.35+a()*.6,p,.5+a()*.5,.45+a()*.25],ox:f*5.5}));if(t<=3){const c=t===3?a()<.7?1:0:1+(a()<.45?1:0);for(let f=0;f<c;f++)h(o+(a()-.5)*e.komorka*e.z*.8,i*(.85+a()*a()*1.5),Math.floor(a()*3.4));if(t>=2&&a()<.6){const f=i*(1.2+a()*1.6),p=i*(.45+a()*.6),m=o+(a()-.5)*4*e.z;s.push(S(a,0,b.KLAB,m,n.terenWarstwy(t,m)+p*.5,f,p,{par:[6,.55,0,.3],przed:!0}))}}else if(t===G){if(a()<.34){const c=.5+a()*.9,f=.3+a()*.45;s.push(S(a,0,b.KLAB,o,r+f*.35,c,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:r+f*.2,rx:c*.5,ry:f*.45,r:.15}}))}else if(a()<.2){const c=.42+a()*.3,f=.45+a()*.5;s.push(S(a,0,b.PIEN,o,r+f*.6,c,f,{par:[.15,0,.9,.85],ox:c*2.2,bryla:{x:o,y:r+f*.5,rx:c*.3,ry:f*.9,r:.12}}))}}else{if(a()<.55){const c=i*(1.8+a()*2),f=i*(.7+a()*.6);s.push(S(a,0,b.KLAB,o+3*e.z,r+f*.2,c,f,{par:[6,.6,0,.3]}))}if(a()<.5){const c=i*(2+a()*2.5),f=i*(.8+a()*.7);s.push(S(a,0,b.KLAB,o-2*e.z,e.y0+e.wys-f*.4,c,f,{par:[7,.7,0,.3]}))}}}function Ra(n,t,e,i,a,o,s){const r=n.terenWarstwy(t,o),l=(h,c,f)=>{const p=c*(.55+a()*.25),m=n.terenWarstwy(t,h);s.push(S(a,1,b.DRZEWO,h,m+c-.25*i,p,c,{par:[3+Math.floor(a()*3),f,(a()-.5)*.7,0],ox:p*1.3}))},u=(h,c,f)=>{const p=n.terenWarstwy(t,h),m=c*(.5+a()*.5);s.push(S(a,1,b.TRZCINY,h,p+c*.85,m,c,{par:[4+Math.floor(a()*5),0,0,0],przed:f,ox:m*1.6}))};if(t===0)a()<.5&&l(o,i*(2.2+a()*2.2),0);else if(t<=2)a()<.7&&l(o,i*(2+a()*2.6),t===2&&a()<.5?1:0),a()<.65&&u(o+(a()-.5)*8*e.z,i*(.7+a()*.7),!0);else if(t===3){if(a()<.62&&l(o,i*(2.2+a()*3),a()<.5?1:0),a()<.6&&u(o+(a()-.5)*5*e.z,i*(.8+a()*.8),!0),a()<.35){const h=i*(.9+a()),c=i*(.3+a()*.3),f=o+2*e.z;s.push(S(a,1,b.KLAB,f,n.terenWarstwy(t,f)+c*.3,h,c,{par:[4,.3,1,.2],przed:!0}))}}else if(t===G){if(a()<.22&&r>1.3){const h=.6+a()*.8,c=.25+a()*.3;s.push(S(a,1,b.KLAB,o,r+c*.3,h,c,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:r+c*.15,rx:h*.5,ry:c*.4,r:.12}}))}}else a()<.8&&u(o,i*(1.6+a()*1.4),!1)}function Ka(n,t,e,i,a,o,s){const r=n.terenWarstwy(t,o),l=(h,c,f,p,m={})=>{const k=n.terenWarstwy(t,h);return S(a,2,b.KRYSZTAL,h,k+c*.9,f,c,{par:[p,.35+a()*.4,0,.5+a()*.5],ox:f*1.9+c*.5,oy:c*1.25,...m})},u=(h,c,f)=>s.push(S(a,2,b.KRYSZTAL,h,c,f*.3,f,{par:[1,0,1,.8],rot:(a()-.5)*1.6,przed:!0}));if(t<=1)a()<.75&&s.push(l(o,i*(2.2+a()*3.6),i*(.9+a()*.9),3+Math.floor(a()*3)));else if(t<=3)a()<.75&&s.push(l(o,i*(1.2+a()*2.8),i*(.6+a()*.8),3+Math.floor(a()*4))),a()<.35&&u(o+(a()-.5)*6*e.z,r+i*(3+a()*4.5),i*(.35+a()*.5));else if(t===G){if(a()<.5){const h=.35+a()*a()*1,c=.35+a()*.45,f=l(o,h,c,2+Math.floor(a()*4),{przed:a()<.5});h>.6&&(f.bryla={x:o,y:r+h*.6,rx:c*.45,ry:h*.7,r:.1}),s.push(f)}}else a()<.3&&s.push(l(o,i*(1.2+a()*1.2),i*(1.3+a()*.8),3)),a()<.22&&s.push(S(a,2,b.KRYSZTAL,o+4*e.z,e.y0+e.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3}))}function Ba(n,t,e,i,a,o,s){const r=n.terenWarstwy(t,o),l=(h,c,f,p)=>{const m=n.terenWarstwy(t,h);s.push(S(a,3,b.KOLUMNA,h,m+c-.2*i,f,c,{par:[p,1,3+Math.floor(a()*3),0],ox:f*1.6}))},u=(h,c,f)=>{const p=n.terenWarstwy(t,h);s.push(S(a,3,b.LUK,h,p+f-.3*i,c,f,{par:[.2+a()*.08,a()<.45?.3+a()*.5:0,0,0]}))};if(t===0)if(a()<.55){const h=i*(1.6+a()*1.2),c=i*(5+a()*4);s.push(S(a,3,b.AKWEDUKT,o,r+h-.3*i,c,h,{par:[3+Math.floor(a()*3),0,a()<.5?.5+a()*.4:0,0]}))}else a()<.5&&l(o,i*(2.5+a()*3),i*(.5+a()*.4),a()<.5?a()*.3:0);else if(t===1)if(a()<.4){const h=i*(1.5+a()),c=i*(4+a()*3);s.push(S(a,3,b.AKWEDUKT,o,r+h-.3*i,c,h,{par:[3+Math.floor(a()*2),0,a()<.6?.4+a()*.5:0,0]}))}else a()<.6&&u(o,i*(1.3+a()),i*(1.8+a()*1.4));else if(t<=3){const h=i*(2.3+a()*2.4),c=i*(.34+a()*.16);if(a()<.78?(l(o,h,c,a()<.4?.15+a()*.55:0),a()<.5&&l(o+c*(7+a()*3),h,c,a()<.5?.2+a()*.6:0)):a()<.7&&u(o,i*(1.4+a()*.8),i*(2+a()*1.6)),t===3&&a()<.35){const f=i*(.6+a()*.7),p=i*(.3+a()*.25),m=o+3*e.z;s.push(S(a,3,b.BLOK,m,n.terenWarstwy(t,m)+p*.6,f,p,{par:[.06,0,0,0],rot:(a()-.5)*.7,przed:!0}))}}else if(t===G){const h=a();if(h<.3){const c=.45+a()*.6,f=.28+a()*.3,p=(a()-.5)*.5;s.push(S(a,3,b.BLOK,o,r+f*.75,c,f,{par:[.05,0,0,0],rot:p,przed:!0,bryla:{x:o,y:r+f*.7,rx:c*.85,ry:f*.8,r:.08}}))}else if(h<.42){const c=1.2+a()*.7,f=.5+a()*.35;s.push(S(a,3,b.BLOK,o,r+f*.8,c,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:r+f*.3,rx:c*.9,ry:f*.5,r:.08}}))}else if(h<.56){const c=.42+a()*.12,f=.5+a()*.8;s.push(S(a,3,b.KOLUMNA,o,r+f-.1,c,f,{par:[.25+a()*.3,0,4,0],ox:c*1.6,bryla:{x:o,y:r+f*.6,rx:c*.6,ry:f*.75,r:.1}}))}}else if(a()<.4){const h=i*(1.5+a()),c=i*(.8+a()*.5);s.push(S(a,3,b.BLOK,o,r+c*.5,h,c,{par:[.1,0,0,0],rot:(a()-.5)*.6}))}}function Ca(n,t,e,i,a,o,s){const r=n.terenWarstwy(t,o),l=(h,c,f)=>{const p=a()<.5?-1:1,m=c*(.42+a()*.15);for(let k=0;k<f;k++){const d=c*(1-.13*k-a()*.05),x=h+k*m,z=n.terenWarstwy(t,x),y=d*(.42+a()*.1);s.push(S(a,4,b.ZEBRO,x,z+d-.3*i,y,d,{par:[.13+a()*.04,.9+a()*.35,0,0],odbij:p,ox:y*1.5,oy:d*1.15,kolejnosc:.5+k*.01}))}},u=(h,c,f={})=>{const p=n.terenWarstwy(t,h),m=c*(.16+a()*.05);return S(a,4,b.KOSC,h,p+m*.6,c,m,{rot:(a()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(t<=1)a()<.62&&l(o,i*(2.4+a()*3),2+Math.floor(a()*3));else if(t<=3){if(a()<.58)l(o,i*(2+a()*3),2+Math.floor(a()*3));else if(a()<.5){const h=i*(2+a()*2),c=i*(.5+a()*.25);s.push(S(a,4,b.KREGI,o,r+c*.7,h,c,{par:[5+Math.floor(a()*4),0,0,0],przed:!0}))}t===3&&a()<.3&&s.push(u(o+3*e.z,i*(.8+a()*.8)))}else if(t===G){const h=a();if(h<.2){const c=1+a()*.9,f=.3+a()*.15;s.push(S(a,4,b.KREGI,o,r+f*.55,c,f,{par:[4+Math.floor(a()*3),0,0,0],przed:!0,bryla:{x:o,y:r+f*.1,rx:c*.9,ry:f*.45,r:.08}}))}else if(h<.42){const c=.5+a()*.7,f=u(o,c);f.bryla={x:o,y:f.y,rx:c*.8,ry:f.h*.5,r:.08},s.push(f)}}else a()<.4&&l(o,i*(2.5+a()*2),1)}const Fa=[Ta,Ra,Ka,Ba,Ca];function jt(n,t,e,i,a,o,s,r){const l=n.terenWarstwy(t,s);switch(o){case 0:{const u=i*1.9,h=i*9;r.push(S(a,0,b.PIEN,s,l+i*2.3,u,h,{par:[.35,3,.8,.5],rot:1.28*(a()<.5?-1:1),ox:h*1.1,oy:h*1.1,kolejnosc:.9})),r.push(S(a,0,b.PIEN,s+i*11,e.y0+e.wys/2,i*2.6,e.wys/2+e.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const u=i*4.2,h=u*.75;r.push(S(a,1,b.DRZEWO,s,l+u-.4*i,h,u,{par:[5,1,.25,0],ox:h*1.3,kolejnosc:.9}));break}case 2:{const u=i*4.6,h=i*1.7;r.push(S(a,2,b.KRYSZTAL,s,l+u*.86,h,u,{par:[1,.12,0,1.6],ox:h*2+u*.3,oy:u*1.2,kolejnosc:.9})),r.push(S(a,2,b.KRYSZTAL,s+i*2.2,l+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const u=i*3.1;r.push(S(a,3,b.POSAG,s,l+u-.5*i,u*.62,u,{par:[a()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 4:{const u=i*2;r.push(S(a,4,b.CZASZKA,s,l+u*.62,u*1.45,u,{par:[0,0,0,0],rot:(a()-.5)*.3,kolejnosc:.9,ox:u*1.9,oy:u*1.5}));break}}}function Da(n,t,e){const i=I[t],a=i.z*ja[t],o=i.komorka*i.z,s=et(n.ziarno,t*7919+17,e),r=[],l=(e+.2+.6*s())*o,u=l/i.mnoznikX,h=n.wagi(u);let c=s(),f=0;for(;f<T-1&&(c-=h[f],!(c<0));f++);if(Fa[f](n,t,i,a,s,l,r),t===2){const p=n.segment(u),m=n.srodekSegmentu(p)*i.mnoznikX-5.5*i.z;m>=e*o&&m<(e+1)*o?jt(n,t,i,a,et(n.ziarno,991,p),n.krainaSegmentu(p),m,r):h[f]>.95&&s()<.07&&jt(n,t,i,a,s,f,l,r)}return r}const ht=16;function Ia(n,t){const e=et(n.ziarno,4242,t),i=[],a=t*ht,o=(s,r,l,u,h,c,f)=>i.push(s,r,l,u,e()*6.283,h,c[0],c[1],c[2],f);for(let s=a;s<a+ht;s+=.22){const r=s+e()*.22,l=n.wagi(r),u=n.ziemia(r);let h=e(),c=0;for(;c<T-1&&(h-=l[c],!(h<0));c++);const f=F[c],p=.6+e()*.6,m=[f.b[0]*p,f.b[1]*p,f.b[2]*p],k=e();if(c===0){if(k<.8&&o(r,u-.05,.18+e()*e()*.75,.014+e()*.012,0,m,1),e()<.085){const d=n.sufit(r);d<100&&o(r,d+.9,1.4+e()*e()*4.2,.018+e()*.014,1,[m[0]*.8,m[1]*.8,m[2]*.8],.55)}}else c===1?k<.42&&u<1.75?o(r,u-.05,.7+e()*1.7,.013+e()*.008,e()<.4?2:0,m,.7):k<.6&&o(r,u-.05,.15+e()*.4,.012,0,m,1):c===3?k<.22&&o(r,u-.04,.12+e()*.4,.011+e()*.006,0,m,1):c===4&&k<.2&&o(r,u-.04,.25+e()*.75,.009+e()*.006,0,m,1.6)}return new Float32Array(i)}const V=4,Tt=4,$=161;class Oa{constructor(t,e,i){this.gl=t,this.szum=e,this.swiat=i,this.p=new K(t,Pa,Aa,"wypiek");const a={wewn:t.RGBA8,format:t.RGBA,typ:t.UNSIGNED_BYTE};this.warstwy=I.map(o=>({W:o,bufor:new W(t,o.pxW*V,o.pxH,[a,a],{zawijanieS:t.REPEAT}),kafle:new Array(V).fill(null)})),this.terenDane=new Float32Array($*4),this.terenTex=kt(t,$,1,{wewn:t.RGBA32F,format:t.RGBA,typ:t.FLOAT,filtr:t.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const t of this.warstwy)t.kafle.fill(null);this.zadanie=null}zapewnij(t,e,i=1){let a=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],r=s.W,l=t.x*r.mnoznikX,u=e*r.z+.6*r.z,h=Math.floor((l-u)/r.szer),c=Math.floor((l+u)/r.szer);for(let f=h;f<=c;f++)s.kafle[U(f)]!==f&&this._pieczCaly(o,f);if(!a){const f=r.szer*.45,p=i>=0?Math.floor((l+u+f)/r.szer):Math.floor((l-u-f)/r.szer);s.kafle[U(p)]!==p&&p-h<V&&c-p<V&&(a=[o,p])}}this.zadanie?this._pieczPasek():a&&(this.zadanie=this._przygotuj(a[0],a[1]),this.warstwy[a[0]].kafle[U(a[1])]=null,this._pieczPasek())}_przygotuj(t,e){const i=I[t],a=this.swiat,o=e*i.szer,s=o+i.szer,r=new Float32Array($*4),l=i.szer/($-33),u=o-16*l;for(let p=0;p<$;p++){const m=u+p*l,k=m/i.mnoznikX,d=a.wagi(k);r[p*4]=a.terenWarstwy(t,m),r[p*4+1]=a.sufitWarstwy(t,m),r[p*4+2]=d[2],r[p*4+3]=d[3]}const h=o/i.mnoznikX,c=s/i.mnoznikX,f=p=>a.mieszaj(p,"b",[0,0,0]);return{l:t,i:e,pasek:0,dane:r,xs:u,dx:l,x0:o,rekwizyty:a.rekwizytyW(t,o,s),barwy:{gL:a.mieszaj(h,"grunt",[0,0,0]),gP:a.mieszaj(c,"grunt",[0,0,0]),wL:a.mieszaj(h,"wierzch",[0,0,0]),wP:a.mieszaj(c,"wierzch",[0,0,0]),lL:f(h),lP:f(c)}}}_pieczCaly(t,e){this.zadanie&&this.zadanie.l===t&&U(this.zadanie.i)===U(e)&&(this.zadanie=null);const i=this._przygotuj(t,e);this._rysuj(i,0,I[t].pxH),this.warstwy[t].kafle[U(e)]=e,this.upieczono++}_pieczPasek(){const t=this.zadanie,e=I[t.l],i=Math.ceil(e.pxH/Tt);this._rysuj(t,t.pasek*i,Math.min(i,e.pxH-t.pasek*i)),++t.pasek>=Tt&&(this.warstwy[t.l].kafle[U(t.i)]=t.i,this.zadanie=null,this.upieczono++)}_rysuj(t,e,i){const a=this.gl,o=I[t.l],s=this.warstwy[t.l],r=this.p,l=U(t.i);a.bindFramebuffer(a.FRAMEBUFFER,s.bufor.fbo),a.viewport(l*o.pxW,0,o.pxW,o.pxH),a.enable(a.SCISSOR_TEST),a.scissor(l*o.pxW,e,o.pxW,i),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this.terenTex),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,$,1,0,a.RGBA,a.FLOAT,t.dane);const u=t.barwy;r.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",t.xs,1/t.dx,$).f("uKafel",t.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",t.x0,o.szer).f("uGruntL",...u.gL).f("uGruntP",...u.gP).f("uWierzchL",...u.wL).f("uWierzchP",...u.wP).f("uLiscL",...u.lL).f("uLiscP",...u.lP);const h=c=>{r.i("uTyp",c.typ).f("uPoz",c.x,c.y).f("uObsz",c.ox+o.miekkosc*o.z*2,c.oy+o.miekkosc*o.z*2).f("uRot",c.rot).f("uOdbij",c.odbij).f("uRozm",c.w,c.h).f("uPar",c.par[0],c.par[1],c.par[2],c.par[3]).f("uZi",c.zi).f("uKa",...c.ka).f("uKb",...c.kb).f("uKc",...c.kc),a.drawArrays(a.TRIANGLE_STRIP,0,4)};for(const c of t.rekwizyty)c.przed||h(c);r.i("uTyp",b.TEREN).f("uPoz",t.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+t.l*.11),a.drawArrays(a.TRIANGLE_STRIP,0,4);for(const c of t.rekwizyty)c.przed&&h(c);a.disable(a.SCISSOR_TEST),a.disable(a.BLEND),a.bindFramebuffer(a.FRAMEBUFFER,null)}}function U(n){return(n%V+V)%V}const Na=V,Rt=10;class Wa{constructor(t,e){this.gl=t,this.swiat=e,this.p=new K(t,za,wa,"flora"),this.vao=t.createVertexArray(),this.buf=t.createBuffer(),t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.buf);const i=Rt*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([a,o,s])=>{t.enableVertexAttribArray(a),t.vertexAttribPointer(a,o,t.FLOAT,!1,i,s*4),t.vertexAttribDivisor(a,1)}),t.bindVertexArray(t.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map}reset(){this.klucz="",this.pamiec.clear()}rysuj(t,e,i,a,o){const s=this.gl,r=Math.floor((t.cam.x-t.polX-3)/ht),l=Math.floor((t.cam.x+t.polX+3)/ht),u=r+":"+l;if(u!==this.klucz){this.klucz=u;const h=[];let c=0;for(let m=r;m<=l;m++){let k=this.pamiec.get(m);k||(this.pamiec.size>12&&this.pamiec.clear(),k=Ia(this.swiat,m),this.pamiec.set(m,k)),h.push(k),c+=k.length}const f=new Float32Array(c);let p=0;for(const m of h)f.set(m,p),p+=m.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=c/Rt}this.ile&&(this.p.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uCzas",t.czas).f("uIskra",t.iskra.x,t.iskra.y,t.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uRes",a,o).tex("uSwiatlo",1,i),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*(Ut+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const X=16,ft=8;function Kt(n,t){const e=4+Math.floor(n()*4.99),i=[];let a=0;for(let m=0;m<e;m++){const k=.35+n();i.push(k),a+=k}const o=1+n()*1.1,s=n()*Math.PI*2,r=[];let l=n()*Math.PI*2;const u=Math.floor(n()*e),h=n()<.4?Math.floor(n()*e):-1;for(let m=0;m<e;m++){l+=i[m]/a*Math.PI*2;let k=t*(.5+.5*n());(m===u||m===h)&&(k*=.38+n()*.2);const d=Math.cos(l)*k*o,x=Math.sin(l)*k;r.push([d*Math.cos(s)-x*Math.sin(s),d*Math.sin(s)+x*Math.cos(s)])}let c=0,f=0;for(const m of r)c+=m[0],f+=m[1];c/=e,f/=e;let p=0;for(const m of r)m[0]-=c,m[1]-=f,p=Math.max(p,Math.hypot(m[0],m[1]));return{v:r,zasieg:p}}function Vt(n,t){const e=t*X,i=e+X/2,a=n.segment(i),o=n.srodekSegmentu(a)+13;if(o<e||o>=e+X)return null;const s=n.krainaSegmentu(a);return{id:"f"+a,x:o,y:Math.min(n.ziemia(o)+4.4,n.granicaLotu(o)-2.2),kraina:s,segment:a,odsloniecie:0,odkryty:!1}}function Ga(n,t){const e=et(n.ziarno,9001,t),i=[],a=t*X,o=1+(e()<.6?1:0)+(e()<.22?1:0);for(let r=0;r<o;r++){const l=a+(r+.15+.7*e())*X/o,u=n.ziemia(l),h=Math.min(n.granicaLotu(l)-.9,u+9.5),c=u+1.4+e()*Math.max(.5,h-u-1.4),f=e()<.32,p=f?2+Math.floor(e()*3):1;for(let m=0;m<p;m++){const k=f?.2+e()*.32:.32+e()*.4,d=e()*Math.PI*2,x=m===0?0:.6+e()*.9,z=Kt(e,k),y=l+Math.cos(d)*x,v=c+Math.sin(d)*x*.8;i.push({id:t*16+i.length,x:y,y:v,px:y,py:v,kat:e()*Math.PI*2,obrot:(e()-.5)*.42,faza:e()*Math.PI*2,v:z.v,zasieg:z.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0})}}const s=Vt(n,t);if(s)for(let r=0;r<3;r++){const l=Kt(e,.3+e()*.25),u=s.x-2.6+r*2.4+(e()-.5)*.6,h=s.y-1.9+(e()-.5)*.9;i.push({id:t*16+i.length,x:u,y:h,px:u,py:h,kat:e()*6.283,obrot:(e()-.5)*.42,faza:e()*6.283,v:l.v,zasieg:l.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0})}return i}class mt{constructor(t){this.swiat=t,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(t,e,i,a){const o=Math.floor((e.x-i-8)/X),s=Math.floor((e.x+i+8)/X);this.widoczne.length=0;for(let r=o;r<=s;r++){let l=this.kawalki.get(r);if(!l){if(this.kawalki.size>24)for(const u of this.kawalki.keys())(u<o-2||u>s+2)&&this.kawalki.delete(u);l=Ga(this.swiat,r),this.kawalki.set(r,l),this.naNowyKawalek?.(r,l)}for(const u of l)u.kat+=u.obrot*t,u.py=u.y+Math.sin(a*.6+u.faza)*.12,u.px=u.x+Math.sin(a*.37+u.faza*1.7)*.05,this.widoczne.push(u)}}static wierzcholki(t,e){const i=Math.cos(t.kat),a=Math.sin(t.kat);for(let o=0;o<t.v.length;o++){const s=t.v[o];e[o*2]=i*s[0]-a*s[1],e[o*2+1]=a*s[0]+i*s[1]}return e}}const $t=`
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
}`,Za=`#version 300 es
uniform vec2 uCam, uPol, uO; uniform float uKat, uDl, uRozw;
out vec2 vL;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  float bok = uDl * 1.25 * sin(min(uRozw * 0.5 + 0.06, 1.5));
  vL = vec2(mix(-0.02, 1.25, r.x) * uDl, (r.y * 2.0 - 1.0) * bok);
  float c = cos(uKat), s = sin(uKat);
  vec2 p = uO + vec2(c * vL.x - s * vL.y, s * vL.x + c * vL.y);
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,qa=B+$t+`
in vec2 vL; out vec4 o;
uniform float uDl, uRozw, uSila, uZnak, uZi, uCzas;
uniform sampler2D uSzum;
void main(){
  float r = length(vL), a = atan(vL.y, vL.x);
  float u = a / (uRozw * 0.5), au = abs(u);
  if (au >= 1.0) discard;
  float katowy = 1.0 - smoothstep(0.55, 1.0, au);
  float q = r / uDl;
  float rad = smoothstep(0.0, 0.45, r) * exp(-q * q * 2.4);
  // delikatne smugi wzdłuż promieni, jak w świetle przechodzącym przez nierówne szkło
  float smugi = 0.8 + 0.4 * texture(uSzum, vec2(a * 0.33 + uZi, r * 0.03 - uCzas * 0.004)).r;
  o = vec4(widmo(u * uZnak * 0.5 + 0.5) * uSila * katowy * rad * smugi * 2.0, 1.0);
}`,Xa=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,Ya=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ua=B+$t+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${ft}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${ft}; i++) {
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
}`;class Va{constructor(t,e){this.gl=t,this.szum=e,this.pWachlarz=new K(t,Za,qa,"wachlarz"),this.pNasycenie=new K(t,Z,Xa,"nasycenie"),this.pOdlamek=new K(t,Ya,Ua,"odlamek"),this._w=new Float32Array(ft*2)}wachlarze(t,e){const i=this.gl,a=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),a.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uCzas",t.czas).tex("uSzum",0,this.szum);for(const o of e)a.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(t,e,i,a,o,s){const r=this.gl,l=this.pOdlamek,u=t.iskra;l.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",o,s).f("uBarwaSw",...e.barwaSw).tex("uSwiatlo",1,a);for(const h of i){if(Math.abs(h.px-t.cam.x)>t.polX+1.5)continue;const c=u.x-h.px,f=u.y-h.py,p=Math.hypot(c,f)||1,m=p/(u.zasieg*1.25);mt.wierzcholki(h,this._w);const k=Math.pow(Math.max(0,Math.sin(t.czas*.9+h.faza*3)),40),d=Math.floor(t.czas*.9/(2*Math.PI)+h.faza)%h.v.length;l.f("uSrodek",h.px,h.py).f("uObsz",h.zasieg+.5).fv("uW",2,this._w).i("uN",h.v.length).f("uDoIskry",c/p,f/p).f("uOs",Math.cos(h.os+h.kat),Math.sin(h.os+h.kat)).f("uBlyskPoz",this._w[d*2],this._w[d*2+1]).f("uBlask",Math.exp(-m*m)).f("uFaza",t.czas*.7+h.faza).f("uBlysk",k).f("uOsw",h.oswietlenie),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}}const ct=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ht=`
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
}`,$a=B+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,Ha=B+Ht+`
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
}`,Ja=B+Ht+`
in vec2 vP; out vec4 o;
uniform vec3 uBarwa; uniform float uOdsl, uOdkryty, uCzas; uniform int uTyp;
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
  c += mix(uBarwa, vec3(1.0), 0.2) * kreska * uOdsl * 0.16;                   // w trakcie odsłaniania
  c += mix(uBarwa, vec3(1.0), 0.25) * kreska * uOdkryty * (0.42 + 0.08 * sin(uCzas * 0.8 + p.x));   // po odkryciu
  o = vec4(c * brzeg, 0.0);
}`,Qa=B+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  float pierscien = exp(-abs(r - prom) / (0.05 + 0.1 * uT));
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 2.6) * 0.8, 0.0);
}`;class te{constructor(t,e){this.gl=t,this.szum=e,this.pDrobinka=new K(t,ct,$a,"drobinka"),this.pSlad=new K(t,ct,Ha,"slad"),this.pFresk=new K(t,ct,Ja,"fresk"),this.pKrag=new K(t,ct,Qa,"krag")}miniatura(t,e,i=144){const a=this.gl;this._mini||(this._mini=new W(a,i,i,{wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE}),this._czarna=kt(a,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),a.disable(a.BLEND),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",t).f("uWariant",e).f("uBarwa",...F[t].c).f("uOdsl",1.15),a.drawArrays(a.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);a.readPixels(0,0,i,i,a.RGBA,a.UNSIGNED_BYTE,o),a.bindFramebuffer(a.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const r=s.getContext("2d"),l=r.createImageData(i,i);for(let u=0;u<i;u++)for(let h=0;h<i;h++){const c=((i-1-u)*i+h)*4,f=(u*i+h)*4,p=o[c],m=o[c+1],k=o[c+2],d=Math.max(p,m,k);l.data[f]=p,l.data[f+1]=m,l.data[f+2]=k,l.data[f+3]=Math.min(255,d*1.6)}return r.putImageData(l,0,0),s.toDataURL("image/png")}_wspolne(t,e){return t.uzyj().f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY)}freski(t,e,i,a,o){if(!e.freski.length)return;const s=this.gl,r=this._wspolne(this.pFresk,t);r.f("uRes",a,o).f("uCzas",t.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const l of e.freski)Math.abs(l.x-t.cam.x)>t.polX+4||(r.f("uSrodek",l.x,l.y).f("uObsz",3.9,2.25).i("uTyp",l.kraina).f("uBarwa",...F[l.kraina].c).f("uOdsl",l.odkryty?0:l.odsloniecie).f("uOdkryty",l.odkryty?1:0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(t,e,i,a,o,s){const r=this.gl,l=t.polX+1.5;let u=this._wspolne(this.pDrobinka,t);for(const h of i.drobinki)Math.abs(h.px-t.cam.x)>l||(u.f("uSrodek",h.px,h.py).f("uObsz",.9,.9).f("uBarwa",...e.barwaSw).f("uPuls",.8+.2*Math.sin(t.czas*2.2+h.faza)),r.drawArrays(r.TRIANGLE_STRIP,0,4));if(i.slady.length){u=this._wspolne(this.pSlad,t),u.f("uRes",o,s).f("uCzas",t.czas).tex("uSwiatlo",1,a).f("uSkala",.42);for(const h of i.slady)Math.abs(h.x-t.cam.x)>l||(u.f("uSrodek",h.x,h.y+Math.sin(t.czas*.8+h.faza)*.06).f("uObsz",.75,.75).i("uTyp",h.kraina).f("uWariant",h.wariant).f("uBarwa",...F[h.kraina].c).f("uOdsl",h.odsloniecie),r.drawArrays(r.TRIANGLE_STRIP,0,4))}if(i.efekty.length){u=this._wspolne(this.pKrag,t);for(const h of i.efekty){const c=h.rodzaj===2?5:h.rodzaj===1?2.2:1.3;u.f("uSrodek",h.x,h.y).f("uObsz",c+.5,c+.5).f("uBarwa",...e.barwaSw).f("uT",h.t).f("uR",c),r.drawArrays(r.TRIANGLE_STRIP,0,4)}}}}const Mt=["wszystko","tlo","swiat","swiatlo","glow","maska"],ae=170;class ee{constructor(t,e){this.gl=t,this.swiat=e,this.szum=ca(t),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=ea(t);this.bTlo=new W(t,4,4,i),this.bSwiat=new W(t,4,4,i),this.bSwiatlo=new W(t,4,4,i),this.bSurowe=new W(t,4,4,i),this.bGlow=[new W(t,4,4,i),new W(t,4,4,i),new W(t,4,4,i)],this.bGlowWy=new W(t,4,4,i),this.pNiebo=new K(t,Z,ma,"niebo"),this.pWarstwa=new K(t,Z,pa,"warstwa"),this.pBliska=new K(t,Z,ka,"warstwa-bliska"),this.pGra=new K(t,Z,da,"plan-gry"),this.pDrobinki=new K(t,ya,va,"drobinki"),this.pKopia=new K(t,Z,la,"kopia"),this.pDol=new K(t,Z,ua,"rozmyj-dol"),this.pGora=new K(t,Z,ha,"rozmyj-gora"),this.pFinal=new K(t,Z,fa,"final"),this.iskierka=new Ma(t),this.wypiek=new Oa(t,this.szum,e),this.flora=new Wa(t,e),this.szklo=new Va(t,this.szum),this.obiekty=new te(t,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[St,0,0],wL:new Float32Array(T),wP:new Float32Array(T)},this._camL=[0,0]}rozmiar(t,e){this.w=t,this.h=e;const i=this.jakosc;this.bTlo.rozmiar(t*i.tlo,e*i.tlo),this.bSwiat.rozmiar(t,e),this.bSwiatlo.rozmiar(t*i.swiatlo,e*i.swiatlo),this.bSurowe.rozmiar(t*i.swiatlo,e*i.swiatlo);let a=t*i.swiatlo,o=e*i.swiatlo;for(const s of this.bGlow)a/=2,o/=2,s.rozmiar(a,o);this.bGlowWy.rozmiar(t*i.swiatlo*.5,e*i.swiatlo*.5)}miniatura(t,e){return this.obiekty.miniatura(t,e)}_atmosfera(t){const e=this.atm,i=this.swiat,a=t.cam.x;i.mieszaj(a-t.polX,"mgla",e.mglaL),i.mieszaj(a+t.polX,"mgla",e.mglaP),i.mieszaj(a,"mgla",e.mgla),i.mieszaj(a,"mgla2",e.mgla2),i.mieszaj(a,"nieboGora",e.gora),i.mieszaj(a,"nieboDol",e.dol),i.mieszaj(a,"emis",e.emis);for(let p=0;p<3;p++)e.barwaSw[p]=e.mgla[p]*.68+.34;const o=p=>i.mieszajLiczbe(a,m=>m.niebo[p]);e.niebo[0]=o("tarcza"),e.niebo[1]=o("obrecz"),e.niebo[2]=o("zorza"),e.niebo[3]=o("gwiazdy"),e.poswiata=o("poswiata");const s=o("snopy");e.pogoda[0]=i.mieszajLiczbe(a,p=>p.wiatr),e.pogoda[1]=s,e.pogoda[2]=i.mieszajLiczbe(a,p=>p.mglistosc);const r=i.segment(a),l=t.polX/t.polY;e.cialo[0]=Math.max(-l*.8,Math.min(l*.8,(i.srodekSegmentu(r)-a)*.011+l*.28)),e.cialo[1]=.4-(t.cam.y-5.3)*.012;const u=e.niebo[0]+e.niebo[1];let h=e.cialo[0]*u+.25*s,c=e.cialo[1]*u+1*s+.3;const f=Math.hypot(h,c)||1;return e.swNieba[0]=h/f,e.swNieba[1]=c/f,e.swNieba[2]=Math.min(1,.35+u*.7+s*.3),e.gruntY[0]=i.ziemia(a-t.polX),e.gruntY[1]=i.ziemia(a+t.polX),i.wagi(a-t.polX,e.wL),i.wagi(a+t.polX,e.wP),e.woda[1]=e.wL[1],e.woda[2]=e.wP[1],e}_widok(t,e){t.f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY).f("uRes",this.w,this.h).f("uCzas",e.czas).tex("uSzum",0,this.szum)}_warstwa(t,e,i,a){const o=I[e],s=this.wypiek.warstwy[e];Ea(o,i.cam,this._camL),this._widok(t.uzyj(),i),t.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Na*o.szer),o.y0,1/o.wys).f("uMglaL",...a.mglaL).f("uMglaP",...a.mglaP).f("uMgla2",...a.mgla2).f("uAtm",o.zamglenie,o.mgla,o.otoczenie,o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...a.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...a.pogoda).f("uSwNieba",...a.swNieba).f("uGruntY",...a.gruntY).f("uJasnosc",o.jasnosc),Y(this.gl)}rysuj(t){const e=this.gl;if(e.disable(e.BLEND),this.warstwa==="maska"){this._maska(t);return}const i=this._atmosfera(t);if(this.wypiek.zapewnij(t.cam,t.polX,t.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),t),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata),Y(e),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),!this.bez.dalekie)for(let u=0;u<4;u++)this._warstwa(this.pWarstwa,u,t,i);e.disable(e.BLEND);const a=t.tecze?t.tecze.wachlarze:[],o=a.length>0;o&&(this.bSurowe.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.szklo.wachlarze(t,a),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),Y(e)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,t.znaleziska&&t.znaleziska.freski.length&&(this.bTlo.ustaw(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(t,t.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),e.disable(e.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),Y(e)):this._warstwa(this.pGra,G,t,i),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(t,i,this.bSwiatlo.tex[0],this.w,this.h),t.odlamki&&this.szklo.odlamki(t,i,t.odlamki,this.bSwiatlo.tex[0],this.w,this.h),t.znaleziska&&this.obiekty.reszta(t,i,t.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(ae*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",this.w,this.h).f("uCzas",t.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",St).f("uIskra",t.iskra.x,t.iskra.y,t.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),e.drawArrays(e.POINTS,0,s)),t.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(t),this.bez.bliska||this._warstwa(this.pBliska,5,t,i),e.disable(e.BLEND),Et(e,this.w,this.h);const r=Mt.indexOf(this.warstwa),l=r===1?this.bTlo.tex[0]:r===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,l).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",t.czas).f("uTryb",r===4?3:r===0?0:1).f("uZiarno",this.ziarno),Y(e)}pomiar(t,e=40){const i=this.gl,a=new Uint8Array(4);this.rysuj(t),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,a);const o=performance.now();for(let s=0;s<e;s++)t.czas+=.016,this.rysuj(t);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,a),(performance.now()-o)/e}_maska(t){const e=this.gl;Et(e,this.w,this.h),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),t.mgla=this.atm.mgla,this.iskierka.rysuj(t,!0)}_poswiata(){const t=this.gl;let e=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),Y(t),e=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const a=this.bGlow[i];a.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),Y(t),e=a}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),Y(t)}}const xt={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class ie{constructor(t){this.canvas=t,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const e=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",a=>{const o=a.key.toLowerCase();xt[o]&&!a.ctrlKey&&!a.metaKey&&!a.altKey&&(this.wcisniete.add(o),a.preventDefault(),e())}),addEventListener("keyup",a=>this.wcisniete.delete(a.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),t.addEventListener("pointerdown",a=>{this.wskaznik={x:a.clientX,y:a.clientY};try{t.setPointerCapture(a.pointerId)}catch{}e()}),t.addEventListener("pointermove",a=>{this.wskaznik&&(this.wskaznik.x=a.clientX,this.wskaznik.y=a.clientY)});const i=()=>{this.wskaznik=null};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("contextmenu",a=>a.preventDefault())}odczyt(t){let e=0,i=0;for(const s of this.wcisniete)e+=xt[s][0],i+=xt[s][1];const a=Math.hypot(e,i);a>1&&(e/=a,i/=a);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),r=(this.wskaznik.x-s.left)/s.width*2-1,l=1-(this.wskaznik.y-s.top)/s.height*2;o=[t.cam.x+r*t.polX,t.cam.y+l*t.polY]}return{cel:o,os:[e,i]}}}function oe(n){const t=document.createElement("div");t.className="dev",t.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>`,document.getElementById("nakladka").appendChild(t);const e=t.querySelector("#dev-stan"),i=t.querySelector("#dev-warstwy");for(const s of Mt){const r=document.createElement("button");r.textContent=s,r.dataset.w=s,r.onclick=()=>{n.renderer.warstwa=s,st("warstwa",s==="wszystko"?null:s),o()},i.appendChild(r)}const a=t.querySelector("#dev-tele");for(const s of n.teleporty()){const r=document.createElement("button");r.textContent=s.nazwa,r.onclick=()=>n.teleport(s.x),a.appendChild(r)}t.querySelector("#dev-ziarno").onclick=()=>{st("ziarno",Math.floor(Math.random()*1e6)),location.reload()},t.querySelector("#dev-pauza").onclick=()=>{n.petla.pauza=!n.petla.pauza};function o(){for(const s of i.children)s.classList.toggle("wl",s.dataset.w===n.renderer.warstwa)}return o(),setInterval(()=>{const s=n.petla,r=n.renderer,l=n.stan;e.innerHTML=`<b>${s.fps.toFixed(0)} kl./s</b> · ${s.msKlatki.toFixed(1)} ms · ${r.w}×${r.h}<br>ziarno ${n.ziarno} · x ${l.iskra.x.toFixed(1)} y ${l.iskra.y.toFixed(1)} · ${n.opisJakosci()}`},250),t}const Bt=132,tt=22,Ct=46;class se{constructor(t){this.ziarno=t|0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(T),this._w2=new Float32Array(T)}_permSurowa(t){const e=et(this.ziarno,t,5),i=[...Array(T).keys()];for(let a=T-1;a>0;a--){const o=Math.floor(e()*(a+1));[i[a],i[o]]=[i[o],i[a]]}if(t===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(t){let e=this._perm.get(t);if(!e){e=this._permSurowa(t);const i=this._permSurowa(t-1)[T-1];t!==0&&e[0]===i?[e[0],e[1]]=[e[1],e[0]]:t===0&&(this._permSurowa(1)[0],e[T-1]),this._perm.set(t,e)}return e}krainaSegmentu(t){const e=Math.floor(t/T);return this._permutacja(e)[t-e*T]}granica(t){return t*Bt-Ct+(Q(t,this.ziarno,77)-.5)*34}segment(t){let e=Math.floor((t+Ct)/Bt);for(;t<this.granica(e);)e--;for(;t>=this.granica(e+1);)e++;return e}srodekSegmentu(t){return(this.granica(t)+this.granica(t+1))/2}wagi(t,e=new Float32Array(T)){e.fill(0);const i=this.segment(t),a=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(t>o-tt){const r=nt(o-tt,o+tt,t);e[s]+=1-r,e[this.krainaSegmentu(i+1)]+=r}else if(t<a+tt){const r=nt(a-tt,a+tt,t);e[this.krainaSegmentu(i-1)]+=1-r,e[s]+=r}else e[s]=1;return e}krainaW(t){return this.krainaSegmentu(this.segment(t))}mieszaj(t,e,i=[0,0,0]){const a=this.wagi(t,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<T;o++)if(a[o]>0){const s=F[o][e];i[0]+=s[0]*a[o],i[1]+=s[1]*a[o],i[2]+=s[2]*a[o]}return i}mieszajLiczbe(t,e){const i=this.wagi(t,this._w2);let a=0;for(let o=0;o<T;o++)i[o]>0&&(a+=i[o]*e(F[o],o));return a}teleporty(){const t=[];for(let e=0;t.length<T&&e<40;e++){const i=this.krainaSegmentu(e);t.some(a=>a.kraina===i)||t.push({nazwa:F[i].id,kraina:i,x:this.srodekSegmentu(e),segment:e})}return t.sort((e,i)=>e.kraina-i.kraina)}_terenKrainy(t,e){const i=F[t].teren,a=this.ziarno,o=C(e*.021,a+3,3);switch(t){case 1:{const s=C(e*.05,a+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(C(e*.4,a+32,2)-.5)}case 2:{const s=C(e*.35,a+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,r=.55,l=s/r,u=Math.floor(l),h=l-u;return(u+nt(.35,.65,h))*r+.05*(C(e*.6,a+51,2)-.5)}case 4:{const s=C(e*.032,a+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(e*.21+6*s)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(C(e*.23,a+21,3)-.5)*2}}ziemia(t){const e=this.wagi(t,this._w);let i=0;for(let a=0;a<T;a++)e[a]>0&&(i+=e[a]*this._terenKrainy(a,t));return i}sufit(t){const e=this.wagi(t,this._w)[0];return e<.02?1e4:F[0].teren.sufit+1.1*(C(t*.11,this.ziarno+71,3)-.5)+(1-e)*9}granicaLotu(t){return Math.min(15.3,this.sufit(t)-.5)}terenWarstwy(t,e){if(t===G)return this.ziemia(e);const i=I[t],a=e/i.mnoznikX,o=e/i.z,s=this.ziarno+100*(t+1),r=this.wagi(a,this._w),l=t===0?1.7:t===1?1.25:1;let u=0;if(r[0]>0&&(u+=r[0]*(1.5*C(o*.06,s,3)+.3*C(o*.3,s+1,2))),r[1]>0&&(u+=r[1]*(.35*C(o*.07,s+2,2)+.2)),r[2]>0){const h=C(o*.11,s+3,3);u+=r[2]*(2.3*(1-Math.abs(2*h-1))*l+.5*C(o*.5,s+4,2))}if(r[3]>0){const h=C(o*.05,s+5,2)*3;u+=r[3]*((Math.floor(h)+nt(.4,.6,h-Math.floor(h)))*.55+.2)}return r[4]>0&&(u+=r[4]*(1.9*C(o*.045,s+6,2)*l+.25*Math.sin(o*.3))),i.bliska&&(u=u*.6-.5),u*i.z}sufitWarstwy(t,e){if(t===G)return this.sufit(e);const i=I[t];if(t<2||i.bliska)return 1e4;const a=this.wagi(e/i.mnoznikX,this._w)[0];return a<.02?1e4:i.A+i.z*(t===2?3.4:4.3)+i.z*(1.4*(C(e/i.z*.1,this.ziarno+80+t,3)-.5)+(1-a)*9)}rekwizyty(t,e){const i=t*1e6+e+5e5;let a=this._komorki.get(i);return a||(this._komorki.size>600&&this._komorki.clear(),a=Da(this,t,e),this._komorki.set(i,a)),a}rekwizytyW(t,e,i){const a=I[t],o=a.komorka*a.z,s=9*a.z,r=[];for(let l=Math.floor((e-s)/o);l<=Math.floor((i+s)/o);l++)for(const u of this.rekwizyty(t,l))u.x+u.ox>e&&u.x-u.ox<i&&r.push(u);return r.sort((l,u)=>l.kolejnosc-u.kolejnosc),r}_bryly(t){const e=I[G],i=Math.floor(t/e.komorka),a=this._tmpBryly||(this._tmpBryly=[]);a.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(G,o))s.bryla&&a.push(s.bryla);return a}odleglosc(t,e){let i=Math.min(e-this.ziemia(t),this.granicaLotu(t)-e);for(const a of this._bryly(t)){const o=Math.abs(t-a.x)-a.rx,s=Math.abs(e-a.y)-a.ry,r=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-a.r;r<i&&(i=r)}return i}_normalna(t,e){const a=this.odleglosc(t+.06,e)-this.odleglosc(t-.06,e),o=this.odleglosc(t,e+.06)-this.odleglosc(t,e-.06),s=Math.hypot(a,o)||1;return[a/s,o/s]}odpychanie(t,e,i){const a=this.odleglosc(t,e)-i,o=.75;if(a>=o)return re;const s=this._normalna(t,e),r=10*(1-Math.max(0,a)/o)**2;return[s[0]*r,s[1]*r]}zderzenie(t,e,i){const a=this.odleglosc(t,e)-i;if(a>=0)return null;const o=this._normalna(t,e);return{nx:o[0],ny:o[1],gl:-a}}woda(t){return this.ziemia(t)<St}}const re=[0,0],Ft=1.44,Dt=1.66,bt=.62,It=1.08,Ot=14,at=new Float32Array(ft*2);function lt(n,t,e,i,a,o,s){let r=!1;for(let l=0;l<7;l++){let u=1e9,h=0,c=0;for(let y=0;y<n;y++){const v=(y+1)%n,M=at[y*2],P=at[y*2+1],A=at[v*2]-M,R=at[v*2+1]-P,w=i*R-a*A;if(Math.abs(w)<1e-9)continue;const _=M-t,L=P-e,E=(_*R-L*A)/w,D=(_*a-L*i)/w;E>1e-4&&D>=0&&D<=1&&E<u&&(u=E,h=A,c=R)}if(u>1e8)return null;t+=i*u,e+=a*u;let f=c,p=-h;const m=Math.hypot(f,p);f/=m,p/=m;let k=-(i*f+a*p);k<0&&(f=-f,p=-p,k=-k);const d=r?o:1/o,x=1-d*d*(1-k*k);if(x<0)i+=2*k*f,a+=2*k*p;else{const y=Math.sqrt(x);if(i=d*i+(d*k-y)*f,a=d*a+(d*k-y)*p,r=!r,!r){const v=Math.hypot(i,a);return s[0]=t,s[1]=e,s[2]=i/v,s[3]=a/v,s}}const z=Math.hypot(i,a);i/=z,a/=z}return null}const Nt=[0,0,0,0],Wt=[0,0,0,0],it=(n,t)=>{let e=n-t;for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e};function Gt(n,t,e){const i=Math.abs(n);if(i>=1||t<=0)return 0;const a=(i-.55)/.45,o=i<.55?1:1-a*a*(3-2*a),s=t/e,r=Math.min(1,t/.45);return o*r*r*(3-2*r)*Math.exp(-s*s*2.4)}class ne{constructor(){this.wachlarze=[],this._pula=[]}aktualizuj(t,e,i){const a=this.wachlarze;a.length=0;const o=1.9+e.zasieg*1.2,s=1.9+e.zasieg*.56,r=1-Math.exp(-t*7);let l=0;const u=()=>(this._pula[l]||(this._pula[l]={}),this._pula[l++]);for(const c of i){const f=c.px-e.x,p=c.py-e.y,m=Math.hypot(f,p);let k=0;m<o&&m>c.zasieg*.6&&(k=Math.pow(1-m/o,1.15));const d=c.oswietlenie;if(c.oswietlenie+=(k-c.oswietlenie)*(1-Math.exp(-t*5)),d<.15&&c.oswietlenie>=.15&&this.naSzklo?.(c),c.oswietlenie<.01||m<.001){c.wachlarz=null;continue}const x=f/m,z=p/m;mt.wierzcholki(c,at);const y=c.v.length,v=lt(y,-x*3,-z*3,x,z,Ft,Nt),M=lt(y,-x*3,-z*3,x,z,Dt,Wt);let P,A,R,w,_;if(v&&M){P=(v[0]+M[0])/2,A=(v[1]+M[1])/2;const D=Math.atan2(v[3],v[2]),ta=Math.atan2(M[3],M[2]),zt=it(ta,D);R=D+zt/2,_=zt>=0?1:-1,w=Math.min(It,Math.max(bt,Math.abs(zt)*3.2))}else P=x*c.zasieg*.5,A=z*c.zasieg*.5,R=Math.atan2(z,x),w=bt,_=1;let L=c.wachlarz;L?(L.ox+=(P-L.ox)*r,L.oy+=(A-L.oy)*r,L.kat+=it(R,L.kat)*r,L.rozw+=(w-L.rozw)*r,L.znak=_):L=c.wachlarz={ox:P,oy:A,kat:R,rozw:w,znak:_};const E=u();E.x=c.px+L.ox,E.y=c.py+L.oy,E.kat=L.kat,E.rozwarcie=L.rozw,E.dlugosc=s,E.sila=c.oswietlenie,E.znak=L.znak,E.zi=c.faza,E.zrodlo=c,E.wtorny=!1,a.push(E)}const h=a.length;for(let c=0;c<h&&a.length<Ot;c++){const f=a[c];for(const p of i){if(p===f.zrodlo)continue;const m=p.px-f.x,k=p.py-f.y,d=Math.hypot(m,k);if(d>f.dlugosc*.95||d<.5)continue;const x=it(Math.atan2(k,m),f.kat)/(f.rozwarcie/2),z=Gt(x,d,f.dlugosc)*f.sila*.75;if(z<.12)continue;mt.wierzcholki(p,at);const y=m/d,v=k/d,M=lt(p.v.length,-y*3,-v*3,y,v,Ft,Nt),P=lt(p.v.length,-y*3,-v*3,y,v,Dt,Wt);if(!M||!P)continue;const A=Math.atan2(M[3],M[2]),R=it(Math.atan2(P[3],P[2]),A),w=u();if(w.x=p.px+(M[0]+P[0])/2,w.y=p.py+(M[1]+P[1])/2,w.kat=A+R/2,w.rozwarcie=Math.min(It,Math.max(bt,Math.abs(R)*3.2)),w.dlugosc=f.dlugosc*.75,w.sila=z,w.znak=R>=0?1:-1,w.zi=p.faza+1,w.zrodlo=p,w.wtorny=!0,p.oswietlenie=Math.max(p.oswietlenie,z*.8),a.push(w),a.length>=Ot)break}}}natezenie(t,e,i=1){let a=0;for(const o of this.wachlarze){const s=t-o.x,r=e-o.y,l=Math.hypot(s,r);l>o.dlugosc*1.3*i||(a+=Gt(it(Math.atan2(r,s),o.kat)/(o.rozwarcie/2*i),l,o.dlugosc*i)*o.sila)}return a}}const Pt=6,pt=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]}],At=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca"];function ce(n,t,e){const i=et(n.ziarno,7717,t),a=t*X,o={drobinki:[],slady:[],fresk:Vt(n,t)};for(let s=0;s<3;s++){const r=a+(s+i())*X/3,l=n.ziemia(r),u=Math.min(n.granicaLotu(r)-.8,l+8.5);o.drobinki.push({id:`d${t}:${s}`,x:r,y:l+.9+i()*Math.max(.5,u-l-.9),faza:i()*6.283})}return e.forEach((s,r)=>{if(!(i()>.42))for(let l=0;l<6;l++){const u=i()*6.283,h=1.5+i()*1.1,c=s.x+Math.cos(u)*h,f=s.y+Math.sin(u)*h*.85;if(f>n.ziemia(c)+.7&&f<n.granicaLotu(c)-.5){o.slady.push({id:`s${t}:${r}`,x:c,y:f,kraina:n.krainaW(c),wariant:Math.floor(i()*Pt),faza:i()*6.283,odsloniecie:0});break}}}),o}class le{constructor(t,e,i){this.swiat=t,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.zdarzenie=null,e.naNowyKawalek=(a,o)=>this.kawalki.set(a,ce(t,a,o)),this._odlamki=e}krok(t,e,i,a){this.drobinki.length=0,this.slady.length=0,this.freski.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const l of s.drobinki){if(this.zebrane.has(l.id))continue;l.px=l.x+Math.sin(a*.7+l.faza)*.3,l.py=l.y+Math.cos(a*.9+l.faza)*.25;const u=Math.hypot(e.x-l.px,e.y-l.py);if(u<2.2&&u>.001){const h=(1-u/2.2)*2.4*t;l.x+=(e.x-l.px)*h,l.y+=(e.y-l.py)*h}if(u<.5){this.zebrane.add(l.id),e.energia=Math.min(1,e.energia+.34),e.tracnij(4),this.efekty.push({x:l.px,y:l.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",l);continue}this.drobinki.push(l)}for(const l of s.slady){if(this.zebrane.has(l.id))continue;const u=i.natezenie(l.x,l.y,1.3),h=l.odsloniecie;if(l.odsloniecie=Math.max(0,Math.min(1,l.odsloniecie+(u>.05?t*(.9+u*2):-t*.015))),h<.6&&l.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",l),l.odsloniecie>=.6&&Math.hypot(e.x-l.x,e.y-l.y)<.75){this.zebrane.add(l.id);const c=this.kolekcja.dodajSlad(l.kraina,l.wariant);e.energia=Math.min(1,e.energia+.2),e.tracnij(3),this.efekty.push({x:l.x,y:l.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...l,nowy:c});continue}l.odsloniecie>.005&&this.slady.push(l)}const r=s.fresk;if(r){if(!r.odkryty&&this.kolekcja.maFresk(r.kraina)&&this.zebrane.has(r.id)&&(r.odkryty=!0),!r.odkryty){let l=0;for(let u=-2;u<=2;u++)l+=i.natezenie(r.x+u*.9,r.y+u%2*.5,1.3);if(l/=5,r.odsloniecie=Math.max(0,Math.min(1,r.odsloniecie+(l>.06?t*(.12+l*.5):-t*.01))),r.odsloniecie>=1){r.odkryty=!0,this.zebrane.add(r.id);const u=this.kolekcja.dodajFresk(r.kraina);e.energia=1,this.efekty.push({x:r.x,y:r.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...r,nowy:u})}}this.freski.push(r)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=t,s.t>1.6&&this.efekty.splice(o,1)}}}const Zt="iskierka-kolekcja-v1";class ue{constructor(t=he()){this.pamiec=t,this.slady={},this.freski={};try{const e=JSON.parse(t?.getItem(Zt)||"null");e&&typeof e=="object"&&(this.slady=e.slady||{},this.freski=e.freski||{})}catch{}this.naZmiane=null}_zapisz(){try{this.pamiec?.setItem(Zt,JSON.stringify({slady:this.slady,freski:this.freski}))}catch{}this.naZmiane?.()}dodajSlad(t,e){const i=`${t}-${e}`,a=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),a}dodajFresk(t){const e=!this.freski[t];return this.freski[t]=!0,this._zapisz(),e}maSlad(t,e){return!!this.slady[`${t}-${e}`]}maFresk(t){return!!this.freski[t]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return pt.length*Pt}wszystkichFreskow(){return At.length}wyczysc(){this.slady={},this.freski={},this._zapisz()}}function he(){try{return window.localStorage}catch{return null}}class fe{constructor(t){this.kolekcja=t;const e=this.el=document.createElement("div");e.className="hud",e.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(e),this.slady=e.querySelector("#hud-slady"),this.en=e.querySelector("#hud-en"),this.krainaEl=e.querySelector("#hud-kraina"),this.wiescEl=e.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(t){const e=Math.round(t*100);e!==this._enPoprz&&(this._enPoprz=e,this.en.style.width=e+"%")}ustawKraine(t){if(t===this.kraina)return;const e=this.kraina<0;this.kraina=t,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=F[t].nazwa,this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},e?300:900)}wiesc(t){clearTimeout(this._tw),this.wiescEl.textContent=t,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const qt=[{akord:[73.42,110,174.61,329.63],filtr:620,wiatr:.1,wiatrHz:500,skala:[293.66,349.23,440,523.25,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]}],me=[.6,.9,1,.85,.65];class pe{constructor(){this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(T),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const t=window.AudioContext||window.webkitAudioContext,e=this.ac=new t;this.wyjscie=e.createGain(),this.wyjscie.gain.value=0,this.analizator=e.createAnalyser(),this.analizator.fftSize=1024;const i=e.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(e.destination),this.poglos=e.createGain(),this.poglos.gain.value=.3;for(const[l,u]of[[.37,.52],[.53,.46]]){const h=e.createDelay(1.5);h.delayTime.value=l;const c=e.createBiquadFilter();c.type="lowpass",c.frequency.value=1900;const f=e.createGain();f.gain.value=u,this.poglos.connect(h),h.connect(c),c.connect(f),f.connect(h),c.connect(this.wyjscie)}const a=e.sampleRate*3,o=e.createBuffer(1,a,e.sampleRate),s=o.getChannelData(0);let r=0;for(let l=0;l<a;l++)r=r*.97+(Math.random()*2-1)*.03,s[l]=r*6;this.szum=e.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start(),this.tla=qt.map(l=>{const u=e.createGain();u.gain.value=0;const h=e.createBiquadFilter();h.type="lowpass",h.frequency.value=l.filtr,h.Q.value=.4,h.connect(u),u.connect(this.wyjscie),u.connect(this.poglos),l.akord.forEach((k,d)=>{for(const x of[-5,6]){const z=e.createOscillator();z.type=d%2?"triangle":"sine",z.frequency.value=k,z.detune.value=x+d;const y=e.createGain();y.gain.value=.034/(1+d*.35);const v=e.createOscillator();v.frequency.value=.03+.017*d+(x>0?.011:0);const M=e.createGain();M.gain.value=y.gain.value*.6,v.connect(M),M.connect(y.gain),v.start(),z.connect(y),y.connect(h),z.start()}});const c=e.createBiquadFilter();c.type="bandpass",c.frequency.value=l.wiatrHz,c.Q.value=.7;const f=e.createGain();f.gain.value=l.wiatr*.45;const p=e.createOscillator();p.frequency.value=.07;const m=e.createGain();return m.gain.value=l.wiatr*.2,p.connect(m),m.connect(f.gain),p.start(),this.szum.connect(c),c.connect(f),f.connect(u),u})}async przelacz(t=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=t,t&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(t?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(t){this.glosnosc=t,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(t,this.ac.currentTime,.2)}aktualizuj(t,e){if(this.wagi.set(e),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=t,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<T;i++)this.tla[i].gain.setTargetAtTime(e[i]*me[i],this.ac.currentTime,1.6)}}_krainaDominujaca(){let t=0;for(let e=1;e<T;e++)this.wagi[e]>this.wagi[t]&&(t=e);return t}_dzwonek(t,e,i=0,a=2.6,o="sine"){const s=this.ac,r=s.currentTime+i,l=s.createOscillator(),u=s.createOscillator(),h=s.createGain(),c=s.createGain();l.type=o,l.frequency.value=t,u.type="sine",u.frequency.value=t*2.01,c.gain.value=.18,h.gain.setValueAtTime(0,r),h.gain.linearRampToValueAtTime(e,r+.02),h.gain.exponentialRampToValueAtTime(4e-4,r+a),l.connect(h),u.connect(c),c.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),l.start(r),u.start(r),l.stop(r+a+.1),u.stop(r+a+.1)}zdarzenie(t,e){if(t in this.licznik&&this.licznik[t]++,!this.ac||!this.wlaczony)return;const i=qt[e&&e.kraina!=null?e.kraina:this._krainaDominujaca()].skala;if(t==="szklo"){const a=this.ac.currentTime;if(a-this._ostSzklo<.35)return;this._ostSzklo=a;const o=i[Math.abs(Math.floor(e.faza*97))%i.length]*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else t==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):t==="odsloniecie"?[0,2,4].forEach((a,o)=>this._dzwonek(i[a],.04,o*.16,2.8)):t==="slad"?[0,1,2,3,4].forEach((a,o)=>this._dzwonek(i[a]*(o===4?2:1),.05,o*.13,3.2)):t==="fresk"&&[0,2,4,1,3].forEach((a,o)=>{this._dzwonek(i[a]/2,.06,o*.4,6),this._dzwonek(i[a]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const t=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(t);let e=0;for(const i of t)e+=i*i;return Math.sqrt(e/t.length)}}const ot=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],ke=2.5;class de{constructor(t){this.auto=!0,this.poziom=1,this.naZmiane=t,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return ot[this.poziom]}ustaw(t){t==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(ot.length-1,t|0))))}_zmien(t){t!==this.poziom&&(this.poziom=t,this.naZmiane(ot[t])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(t,e){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=e;return}if(this._blokada=Math.max(0,this._blokada-e),this._ms.push(t),this._czas+=e,this._czas<ke)return;let i=0,a=0;for(const s of this._ms)s<120&&(i+=s,a++);const o=a?i/a:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<ot.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const Jt="iskierka-ustawienia-v1",g=(n,t,e)=>{const i=document.createElement(n);return t&&(i.className=t),e!=null&&(i.textContent=e),i};function ze(){try{const n=JSON.parse(localStorage.getItem(Jt)||"null");if(n&&typeof n=="object")return{jakosc:"auto",glosnosc:.75,...n}}catch{}return{jakosc:"auto",glosnosc:.75}}function we(n){try{localStorage.setItem(Jt,JSON.stringify(n))}catch{}}class ye{constructor(t){this.gra=t,this.otwarte=!1,this.ustawienia=ze();const e=document.getElementById("nakladka");this.tytul=g("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',e.appendChild(this.tytul);const i=this.rzad=g("div","rzad-przyciskow");this.bDzwiek=g("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await t.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=g("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),e.appendChild(i),this._opiszDzwiek(),this.obrot=g("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),e.appendChild(this.obrot),this.panel=g("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const a=g("div","okno"),o=g("div","okno-naglowek");o.appendChild(g("h2",null,"Pauza"));const s=g("div","zakladki");this.zakladki={};for(const[r,l]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const u=g("button","zakladka",l);u.type="button",u.onclick=()=>this._pokaz(r),s.appendChild(u),this.zakladki[r]=u}o.appendChild(s),this.bWroc=g("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=g("div","okno-tresc"),a.append(o,this.tresc),this.panel.appendChild(a),this.panel.addEventListener("pointerdown",r=>{r.target===this.panel&&this.przelacz(!1)}),e.appendChild(this.panel),addEventListener("keydown",r=>{r.key==="Escape"||r.key.toLowerCase()==="p"&&!this._wPolu(r)?(r.preventDefault(),this.przelacz()):r.key.toLowerCase()==="m"&&!this._wPolu(r)?this.bDzwiek.click():r.key.toLowerCase()==="f"&&!this._wPolu(r)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&t.sterowanie.poruszono&&this.przelacz(!0)}),t.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(t){const e=t.target;return e&&(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA")}_opiszDzwiek(){const t=this.gra.dzwiek;if(!t.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=t.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(t.wlaczony))}_zastosuj(){const t=this.ustawienia,e=this.gra;e.jakosc.ustaw(t.jakosc==="auto"?"auto":Number(t.jakosc)),e.dzwiek.ustawGlosnosc(t.glosnosc)}przelacz(t=!this.otwarte){t!==this.otwarte&&(this.otwarte=t,this.panel.hidden=!t,this.gra.petla.pauza=t,this.gra.petla.zamrozona=t,this.rzad.classList.toggle("schowany",t),t?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(t){this._zakladka=t;for(const[e,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",e===t);this.tresc.replaceChildren(t==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(t,e){const i=t+"-"+e;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(t,e)),this._miniatury.get(i)}_kolekcja(){const t=this.gra.kolekcja,e=g("div","kolekcja");return e.appendChild(g("p","kolekcja-stan",`Ślady: ${t.ileSladow()} z ${t.wszystkichSladow()} · freski: ${t.ileFreskow()} z ${t.wszystkichFreskow()}`)),F.forEach((i,a)=>{const o=g("section","kolekcja-kraina");o.appendChild(g("h3",null,`${i.nazwa} · ${pt[a].rodzaj.toLowerCase()}`));const s=g("div","siatka");for(let l=0;l<Pt;l++){const u=t.maSlad(a,l),h=g("figure","kafel"+(u?" znaleziony":""));if(u){const c=new Image;c.src=this._miniatura(a,l),c.alt="",h.appendChild(c)}else h.appendChild(g("div","nieznany","?"));h.appendChild(g("figcaption",null,u?pt[a].nazwy[l]:"jeszcze w ciemności")),s.appendChild(h)}const r=g("p","fresk"+(t.maFresk(a)?" znaleziony":""),t.maFresk(a)?"✦ "+At[a]:"Fresk tej krainy czeka na barwne światło.");o.append(s,r),e.appendChild(o)}),e}_ustawienia(){const t=this.ustawienia,e=this.gra,i=g("div","ustawienia"),a=(f,p,m)=>{const k=g("label","pole");return k.appendChild(g("span","pole-opis",f)),k.appendChild(p),m&&k.appendChild(g("span","pole-uwaga",m)),i.appendChild(k),p},o=()=>{we(t),this._zastosuj()},s=g("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),ot.forEach((f,p)=>s.appendChild(new Option(f.nazwa,String(p)))),s.value=String(t.jakosc),s.onchange=()=>{t.jakosc=s.value,o()},a("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const r=g("input");r.type="range",r.min="0",r.max="1",r.step="0.05",r.value=String(t.glosnosc),r.id="u-glosnosc",r.oninput=()=>{t.glosnosc=Number(r.value),o()},a("Głośność",r,e.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const l=g("div","rzad"),u=g("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");u.type="button",u.onclick=async()=>{await this.pelnyEkran(),u.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const h=g("button","przycisk","Nowy świat");h.type="button",h.onclick=()=>{st("ziarno",Math.floor(Math.random()*1e6)),st("kraina",null),st("x",null),location.reload()};const c=g("button","przycisk","Wyczyść kolekcję");return c.type="button",c.onclick=()=>{c.dataset.pewne?(e.kolekcja.wyczysc(),c.textContent="Kolekcja wyczyszczona",c.disabled=!0):(c.dataset.pewne="1",c.textContent="Na pewno? Naciśnij jeszcze raz")},l.append(u,h,c),i.appendChild(l),i.appendChild(g("p","pole-uwaga",`Świat nr ${e.ziarno}. Ten sam numer w adresie (?ziarno=${e.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const ve=1080,N=document.getElementById("gra"),xe=document.getElementById("nakladka");function Qt(n){const t=document.createElement("div");t.className="blad",t.textContent=n,xe.appendChild(t)}function be(){const n=aa(N);if(!n){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),Qt("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const t=new se(j.ziarno),e=new ee(n,t);Mt.includes(j.warstwa)&&(e.warstwa=j.warstwa);const i=new ga(j.ziarno);let a=null;const o=new ie(N),s=new mt(t),r=new ne,l=new ue,u=new le(t,s,l),h=new fe(l);(j.test||j.warstwa==="maska")&&(h.el.style.visibility="hidden"),l.naZmiane=()=>h.odswiez();const c=new pe;r.naSzklo=w=>c.zdarzenie("szklo",w);const f=[(w,_)=>c.zdarzenie(w,_)],p=new Float32Array(F.length);u.zdarzenie=(w,_)=>{w==="slad"?h.wiesc(pt[_.kraina].nazwy[_.wariant]+(_.nowy?"":" (już w kolekcji)")):w==="fresk"&&h.wiesc(At[_.kraina]);for(const L of f)L(w,_)};const m={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:J*16/9,polY:J};let k=1;const d=new de(w=>{e.jakosc=w,k=w.skala,x()});e.jakosc=d.ustawienia;function x(){const w=Math.min(window.devicePixelRatio||1,2),_=N.clientWidth||innerWidth,L=N.clientHeight||innerHeight;let E=Math.min(L*w,ve)*k,D=E*_/L;D=Math.max(320,Math.round(D)),E=Math.max(180,Math.round(E)),(N.width!==D||N.height!==E)&&(N.width=D,N.height=E),m.polX=J*D/E,e.rozmiar(D,E)}addEventListener("resize",x),x();function z(w){m.czas+=w,i.krok(w,a||o.odczyt(m),t);const _=1-Math.exp(-w*1.6);m.cam.x+=(i.x+i.vx*.5-m.cam.x)*_,m.cam.y+=(i.y+.6-m.cam.y)*_,y(),s.krok(w,m.cam,m.polX,m.czas),r.aktualizuj(w,i,s.widoczne),u.krok(w,i,r,m.czas),c.aktualizuj(w,t.wagi(i.x,p))}function y(){m.cam.y=Math.max(Math.max(t.ziemia(m.cam.x)+J-1.9,4.7),Math.min(12.4,m.cam.y))}const v=()=>({cam:m.cam,polX:m.polX,polY:m.polY,czas:m.czas,iskra:i,tecze:r.ukryte?null:r,odlamki:s.widoczne,znaleziska:u});function M(w,_){_&&d.probka(_*1e3,_),i.zbudujSmuge(H),h.energia(i.energia),h.ustawKraine(t.krainaW(i.x)),e.rysuj(v())}const P=new ia({krok:z,rysuj:M}),A={gotowe:!0,canvas:N,sterowanie:o,jakosc:d,stan:m,petla:P,renderer:e,swiat:t,odlamki:s,tecze:r,znaleziska:u,kolekcja:l,hud:h,sluchacze:f,dzwiek:c,ziarno:j.ziarno,bledy:[],teleporty:()=>t.teleporty(),teleport(w,_){i.przenies(w,_??t.ziemia(w)+4.5),m.cam.x=w,m.cam.y=i.y+.6,y()},przewin(w){P.przewin(w),M()},rysuj:M,pomiar:w=>e.pomiar(v(),w),ustawWejscie(w){a=w},krainy:F,opisJakosci:()=>`jakość ${d.auto?"auto: ":""}${d.ustawienia.nazwa}`,info(){return{renderer:n.getParameter(n.RENDERER),w:N.width,h:N.height,fps:P.fps,hdr:n.ext.floatBuf}}};if(window.iskierka=A,j.kraina){const w=t.teleporty().find(_=>_.nazwa===j.kraina);w&&A.teleport(w.x+j.dx,t.ziemia(w.x+j.dx)+4.5+j.dy)}else j.x!=null?A.teleport(j.x):A.teleport(8);const R=A.menu=new ye(A);j.jakosc!=null&&d.ustaw(j.jakosc==="auto"?"auto":Number(j.jakosc)),j.debug&&oe(A),j.test&&(P.pauza=!0,j.jakosc==null&&d.ustaw(1),R.tytul.style.display="none",R.rzad.style.visibility="hidden",R.obrot.style.visibility="hidden"),P.start()}addEventListener("error",n=>{(window.__bledy||(window.__bledy=[])).push(String(n.message))});try{be()}catch(n){console.error(n),(window.__bledy||(window.__bledy=[])).push(String(n.message)),Qt("Nie udało się uruchomić gry: "+n.message)}
