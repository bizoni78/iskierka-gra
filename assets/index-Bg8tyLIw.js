(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();function ta(r){const t=r.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!t)return null;const e={floatBuf:!!t.getExtension("EXT_color_buffer_float"),halfBuf:!!t.getExtension("EXT_color_buffer_half_float")};return t.ext=e,t.bezFloat=new URLSearchParams(location.search).has("rgba8"),t.domyslnyVAO=t.createVertexArray(),t.bindVertexArray(t.domyslnyVAO),t}function Tt(r,t,e,i){const a=r.createShader(t);if(r.shaderSource(a,e),r.compileShader(a),!r.getShaderParameter(a,r.COMPILE_STATUS)){const o=r.getShaderInfoLog(a),s=e.split(`
`).map((n,l)=>`${l+1}: ${n}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return a}const q=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class R{constructor(t,e,i,a="program"){this.gl=t,this.nazwa=a;const o=t.createProgram();if(t.attachShader(o,Tt(t,t.VERTEX_SHADER,e,a+".vs")),t.attachShader(o,Tt(t,t.FRAGMENT_SHADER,i,a+".fs")),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS))throw new Error(`Program "${a}" się nie zlinkował: ${t.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=t.getProgramParameter(o,t.ACTIVE_UNIFORMS);for(let n=0;n<s;n++){const l=t.getActiveUniform(o,n),u=l.name.replace(/\[0\]$/,"");this.u[u]=t.getUniformLocation(o,l.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(t,e,i,a,o){const s=this.gl,n=this.u[t];return n==null?this:(o!==void 0?s.uniform4f(n,e,i,a,o):a!==void 0?s.uniform3f(n,e,i,a):i!==void 0?s.uniform2f(n,e,i):s.uniform1f(n,e),this)}i(t,e){const i=this.u[t];return i!=null&&this.gl.uniform1i(i,e),this}fv(t,e,i){const a=this.gl,o=this.u[t];return o==null?this:(e===1?a.uniform1fv(o,i):e===2?a.uniform2fv(o,i):e===3?a.uniform3fv(o,i):a.uniform4fv(o,i),this)}tex(t,e,i){const a=this.gl,o=this.u[t];return o==null?this:(a.activeTexture(a.TEXTURE0+e),a.bindTexture(a.TEXTURE_2D,i),a.uniform1i(o,e),this)}}function mt(r,t,e,i={}){const{wewn:a=r.RGBA8,format:o=r.RGBA,typ:s=r.UNSIGNED_BYTE,dane:n=null,filtr:l=r.LINEAR,zawijanieS:u=r.CLAMP_TO_EDGE,zawijanieT:h=r.CLAMP_TO_EDGE,mipmapy:c=!1}=i,f=r.createTexture();return r.bindTexture(r.TEXTURE_2D,f),r.texImage2D(r.TEXTURE_2D,0,a,t,e,0,o,s,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,c?r.LINEAR_MIPMAP_LINEAR:l),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,l),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,u),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,h),c&&r.generateMipmap(r.TEXTURE_2D),f}function aa(r,t=!1){return r.ext.floatBuf&&!r.bezFloat?t?{wewn:r.RGBA16F,format:r.RGBA,typ:r.HALF_FLOAT}:{wewn:r.R11F_G11F_B10F,format:r.RGB,typ:r.HALF_FLOAT}:{wewn:r.RGBA8,format:r.RGBA,typ:r.UNSIGNED_BYTE}}class W{constructor(t,e,i,a,o={}){this.gl=t,this.formaty=Array.isArray(a)?a:[a],this.opcje=o,this.fbo=t.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(e,i)}rozmiar(t,e){if(t=Math.max(1,Math.round(t)),e=Math.max(1,Math.round(e)),t===this.w&&e===this.h)return;const i=this.gl;this.w=t,this.h=e;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>mt(i,t,e,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const a=i.checkFramebufferStatus(i.FRAMEBUFFER);if(a!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+a.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.viewport(0,0,this.w,this.h)}}function Kt(r,t,e){r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,t,e)}function U(r){r.drawArrays(r.TRIANGLES,0,3)}const Q=1/120;class ea{constructor({krok:t,rysuj:e}){this.krok=t,this.rysuj=e,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(t){if(!this.dziala)return;const e=(t-this.ostatni)/1e3;this.ostatni=t;const i=Math.min(e,.1);if(!this.pauza){this.zapas+=i;let a=0;for(;this.zapas>=Q&&a<16;)this.krok(Q),this.zapas-=Q,a++;a===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/Q,e),this._klatki++,this._okno+=e,this.historiaMs.push(e*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(t){const e=Math.round(t/Q);for(let i=0;i<e;i++)this.krok(Q)}}const X=new URLSearchParams(location.search),ct=(r,t)=>{const e=parseFloat(X.get(r));return Number.isFinite(e)?e:t},j={ziarno:Math.floor(ct("ziarno",1)),maZiarno:X.has("ziarno"),kraina:X.get("kraina"),x:X.has("x")?ct("x",0):null,dy:ct("dy",0),dx:ct("dx",0),debug:X.has("debug"),test:X.has("test"),warstwa:X.get("warstwa")||"wszystko",jakosc:X.get("jakosc"),maska:X.has("maska")};function rt(r,t){const e=new URL(location.href);t==null?e.searchParams.delete(r):e.searchParams.set(r,t),history.replaceState(null,"",e)}function Xt(r){return()=>{r|=0,r=r+1831565813|0;let t=Math.imul(r^r>>>15,1|r);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function at(r,t=0,e=0){let i=Math.imul(r|0,668265261)^Math.imul(t|0,374761393)^Math.imul(e|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function it(r,t=0,e=0){return Xt(at(r,t,e)*4294967296|0)}const ia=r=>r*r*(3-2*r);function oa(r,t=0){const e=Math.floor(r),i=r-e;return at(e,t)+(at(e+1,t)-at(e,t))*ia(i)}function B(r,t=0,e=4){let i=0,a=.5,o=0;for(let s=0;s<e;s++)i+=a*oa(r,t+s*17),o+=a,r*=2.03,a*=.5;return i/o}const sa=(r,t,e)=>Math.max(t,Math.min(e,r)),lt=(r,t,e)=>{const i=sa((e-r)/(t-r),0,1);return i*i*(3-2*i)};function ra(r,t,e){const i=new Float32Array(t*t);for(let s=0;s<i.length;s++)i[s]=at(s,e,t);const a=new Float32Array(r*r),o=t/r;for(let s=0;s<r;s++){const n=s*o,l=Math.floor(n);let u=n-l;u=u*u*(3-2*u);const h=l%t*t,c=(l+1)%t*t;for(let f=0;f<r;f++){const p=f*o,k=Math.floor(p);let m=p-k;m=m*m*(3-2*m);const d=k%t,y=(k+1)%t,z=i[h+d],v=i[h+y],_=i[c+d],g=i[c+y];a[s*r+f]=z+(v-z)*m+(_+(g-_)*m-z-(v-z)*m)*u}}return a}function wt(r,t,e,i){const a=new Float32Array(r*r);let o=.5,s=0;for(let n=0;n<e;n++){const l=t<<n;if(l>r)break;const u=ra(r,l,i+n*101);for(let h=0;h<a.length;h++)a[h]+=u[h]*o;s+=o,o*=.5}for(let n=0;n<a.length;n++)a[n]/=s;return a}function na(r,t=256){const e=wt(t,4,5,11),i=wt(t,4,5,57),a=wt(t,16,4,93),o=new Uint8Array(t*t*4);for(let s=0;s<t*t;s++)o[s*4]=e[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=a[s]*255,o[s*4+3]=at(s,7)*255;return mt(r,t,t,{dane:o,zawijanieS:r.REPEAT,zawijanieT:r.REPEAT,mipmapy:!0})}const T=`#version 300 es
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
`,ca=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,la=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,ua=T+`
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
}`,ha=T+`
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
}`,fa=T+dt+`
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
`,ka=T+dt+Yt+`
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
}`,pa=T+dt+`
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
}`,ma=T+dt+Yt+`
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
}`,Ut=6,da=`#version 300 es
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
}`,za=T+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,wa=`#version 300 es
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
}`,ya=T+`
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
}`,ht=20,_t=.17,O=96,va=.42,yt=1.55,xa={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class ba{constructor(t=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=1.15,this.zasieg=this.zasiegBazowy,this.energia=0,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=Xt(t*7919+13),this.doDrgniecia=3,this.hx=new Float32Array(O),this.hy=new Float32Array(O),this.hi=0,this.hn=0,this.smuga=new Float32Array(ht*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let t=0;t<ht;t++)this.smuga[t*2]=this.x,this.smuga[t*2+1]=this.y}przenies(t,e){this.x=t,this.y=e,this.vx=0,this.vy=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(t){this.pulsV+=t}krok(t,e,i){this.t+=t;const a=xa;let o=e.os[0]*a.ciagKlawisze,s=e.os[1]*a.ciagKlawisze,n=o!==0||s!==0;if(e.cel){const d=e.cel[0]-this.x,y=e.cel[1]-this.y,z=Math.hypot(d,y);if(z>.12){const v=Math.min(1,z/1.8)*a.ciagWskaznik;o+=d/z*v,s+=y/z*v}n=!0}const l=this.t;if(o+=a.kolysanie*(Math.sin(l*.83)+.6*Math.sin(l*1.91+1.7)+.35*Math.sin(l*3.3+.4)),s+=a.kolysanie*(Math.cos(l*.71+.6)+.6*Math.sin(l*2.17+2.2)+.35*Math.cos(l*2.9+1.1)),this.doDrgniecia-=t,this.doDrgniecia<=0){this.doDrgniecia=a.drgniecieCo[0]+this.los()*(a.drgniecieCo[1]-a.drgniecieCo[0]);const d=this.los()*Math.PI*2,y=a.drgniecieSila[0]+this.los()*(a.drgniecieSila[1]-a.drgniecieSila[0]);this.vx+=Math.cos(d)*y,this.vy+=Math.sin(d)*y,this.pulsV+=1.2}const u=i.odpychanie(this.x,this.y,_t);o+=u[0],s+=u[1],this.vx+=o*t,this.vy+=s*t;const h=Math.exp(-t*(n?a.oporCiag:a.oporSwobodny));this.vx*=h,this.vy*=h;const c=Math.hypot(this.vx,this.vy);c>a.maksPredkosc&&(this.vx*=a.maksPredkosc/c,this.vy*=a.maksPredkosc/c),this.x+=this.vx*t,this.y+=this.vy*t;const f=i.zderzenie(this.x,this.y,_t*.8);if(f){this.x+=f.nx*f.gl,this.y+=f.ny*f.gl;const d=this.vx*f.nx+this.vy*f.ny;d<0&&(this.vx-=1.25*d*f.nx,this.vy-=1.25*d*f.ny,this.pulsV+=Math.min(6,-d*3))}const p=this.vx*.085,k=this.vy*.085;this.dvx+=((p-this.dx)*46-this.dvx*6.2)*t,this.dvy+=((k-this.dy)*46-this.dvy*6.2)*t,this.dx+=this.dvx*t,this.dy+=this.dvy*t,this.pulsV+=(-this.puls*90-this.pulsV*7)*t,this.puls+=this.pulsV*t,this.energia=Math.max(0,this.energia-t*.02);const m=this.zasiegBazowy+this.energia*4.7;this.zasieg+=(m-this.zasieg)*Math.min(1,t*1.4),this.hi=(this.hi+1)%O,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<O&&this.hn++}zbudujSmuge(t){const e=ht,i=this.smuga,a=Math.min(this.hn,Math.round(va/t));let o=0,s=this.x,n=this.y;const l=this._odc||(this._odc=new Float32Array(O));let u=0;for(let z=0;z<a;z++){const v=(this.hi-z+O)%O,_=Math.hypot(this.hx[v]-s,this.hy[v]-n);if(o+_>yt){l[u++]=yt-o,o=yt;break}l[u++]=_,o+=_,s=this.hx[v],n=this.hy[v]}this.dlSmugi=o;let h=this.x,c=this.x,f=this.y,p=this.y,k=0,m=0,d=this.x,y=this.y;for(let z=0;z<e;z++){const v=o*z/(e-1);for(;k<u-1&&m+l[k]<v;){m+=l[k];const S=(this.hi-k+O)%O;d=this.hx[S],y=this.hy[S],k++}let _=d,g=y;if(u>0){const S=(this.hi-k+O)%O,w=this.hx[S],K=this.hy[S],x=Math.hypot(w-d,K-y),b=x>1e-6?Math.min(1,(v-m)/x):0;_=d+(w-d)*b,g=y+(K-y)*b}i[z*2]=_,i[z*2+1]=g}for(let z=1;z<e;z++){const v=z/(e-1),_=i[z*2]-i[z*2-2],g=i[z*2+1]-i[z*2-1],S=Math.hypot(_,g);if(S<1e-5)continue;const w=.03*v*v*Math.sin(v*o*5-this.t*6)*Math.min(1,o/.6);i[z*2]+=-g/S*w,i[z*2+1]+=_/S*w}for(let z=0;z<e;z++){const v=i[z*2],_=i[z*2+1];v<h&&(h=v),v>c&&(c=v),_<f&&(f=_),_>p&&(p=_)}this.pudlo[0]=h,this.pudlo[1]=f,this.pudlo[2]=c,this.pudlo[3]=p}}const ga=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,Sa=T+`
#define N ${ht}
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
}`;class _a{constructor(t){this.gl=t,this.p=new R(t,ga,Sa,"iskierka")}rysuj(t,e=!1){const i=this.gl,a=t.iskra,o=1.3;this.p.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uPudlo",a.pudlo[0]-o,a.pudlo[1]-o,a.pudlo[2]+o,a.pudlo[3]+o).fv("uSm",2,a.smuga).f("uGlowa",a.x,a.y).f("uDef",a.dx,a.dy).f("uR",_t).f("uCzas",t.czas).f("uPuls",a.puls).f("uMaska",e?1:0).f("uDl",a.dlSmugi).f("uBarwa",...t.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const Ma=`#version 300 es
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
}`,Pa=`#version 300 es
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
}`,C=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.7,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8}],E=C.length,Mt=1.22,D=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:1.8,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:9,bliska:!0,postrzep:0}],G=4,Pt=5.3,tt=5.6,Aa=16;for(const r of D){if(r.gra)r.y0=-1,r.wys=20,r.A=Pt;else{r.A=-r.s*tt*r.z;const t=r.A-tt*r.z-.3*r.z,e=r.A+(15-Pt)*r.f*r.z+tt*r.z+.3*r.z;r.y0=t,r.wys=e-t}r.szer=Aa*r.z,r.pxW=r.px,r.pxH=Math.round(r.px*r.wys/r.szer/16)*16,r.mnoznikX=r.f*r.z}function La(r,t,e=[0,0]){return e[0]=t.x*r.mnoznikX,e[1]=r.gra?t.y:r.A+(t.y-Pt)*r.f*r.z,e}const M={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14},ja=[2.3,1.75,1.4,1.12,1,1.35];function vt(r,t,e=.07){const i=1+(r()-.5)*2*e;return[t[0]*i,t[1]*i,t[2]*i]}function A(r,t,e,i,a,o,s,n={}){const l=C[t],u={typ:e,x:i,y:a,w:o,h:s,rot:0,par:[0,0,0,0],zi:r(),kraina:t,ka:vt(r,l.a),kb:vt(r,l.b),kc:vt(r,l.c),przed:!1,kolejnosc:r(),odbij:r()<.5?-1:1,bryla:null,...n};if(u.ox==null&&(u.ox=Math.abs(o)*1.25),u.oy==null&&(u.oy=Math.abs(s)*1.12),u.rot){const h=Math.hypot(u.ox,u.oy);u.ox=h,u.oy=h}return u}function Ea(r,t,e,i,a,o,s){const n=r.terenWarstwy(t,o),l=e.y0+e.wys/2,u=e.wys/2+e.z,h=(c,f,p)=>s.push(A(a,0,M.PIEN,c,l,f,u,{par:[.35+a()*.6,p,.5+a()*.5,.45+a()*.25],ox:f*5.5}));if(t<=3){const c=t===3?a()<.7?1:0:1+(a()<.45?1:0);for(let f=0;f<c;f++)h(o+(a()-.5)*e.komorka*e.z*.8,i*(.85+a()*a()*1.5),Math.floor(a()*3.4));if(t>=2&&a()<.6){const f=i*(1.2+a()*1.6),p=i*(.45+a()*.6),k=o+(a()-.5)*4*e.z;s.push(A(a,0,M.KLAB,k,r.terenWarstwy(t,k)+p*.5,f,p,{par:[6,.55,0,.3],przed:!0}))}}else if(t===G){if(a()<.34){const c=.5+a()*.9,f=.3+a()*.45;s.push(A(a,0,M.KLAB,o,n+f*.35,c,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+f*.2,rx:c*.5,ry:f*.45,r:.15}}))}else if(a()<.2){const c=.42+a()*.3,f=.45+a()*.5;s.push(A(a,0,M.PIEN,o,n+f*.6,c,f,{par:[.15,0,.9,.85],ox:c*2.2,bryla:{x:o,y:n+f*.5,rx:c*.3,ry:f*.9,r:.12}}))}}else{if(a()<.55){const c=i*(1.8+a()*2),f=i*(.7+a()*.6);s.push(A(a,0,M.KLAB,o+3*e.z,n+f*.2,c,f,{par:[6,.6,0,.3]}))}if(a()<.5){const c=i*(2+a()*2.5),f=i*(.8+a()*.7);s.push(A(a,0,M.KLAB,o-2*e.z,e.y0+e.wys-f*.4,c,f,{par:[7,.7,0,.3]}))}}}function Ra(r,t,e,i,a,o,s){const n=r.terenWarstwy(t,o),l=(h,c,f)=>{const p=c*(.55+a()*.25),k=r.terenWarstwy(t,h);s.push(A(a,1,M.DRZEWO,h,k+c-.25*i,p,c,{par:[3+Math.floor(a()*3),f,(a()-.5)*.7,0],ox:p*1.3}))},u=(h,c,f)=>{const p=r.terenWarstwy(t,h),k=c*(.5+a()*.5);s.push(A(a,1,M.TRZCINY,h,p+c*.85,k,c,{par:[4+Math.floor(a()*5),0,0,0],przed:f,ox:k*1.6}))};if(t===0)a()<.5&&l(o,i*(2.2+a()*2.2),0);else if(t<=2)a()<.7&&l(o,i*(2+a()*2.6),t===2&&a()<.5?1:0),a()<.65&&u(o+(a()-.5)*8*e.z,i*(.7+a()*.7),!0);else if(t===3){if(a()<.62&&l(o,i*(2.2+a()*3),a()<.5?1:0),a()<.6&&u(o+(a()-.5)*5*e.z,i*(.8+a()*.8),!0),a()<.35){const h=i*(.9+a()),c=i*(.3+a()*.3),f=o+2*e.z;s.push(A(a,1,M.KLAB,f,r.terenWarstwy(t,f)+c*.3,h,c,{par:[4,.3,1,.2],przed:!0}))}}else if(t===G){if(a()<.22&&n>1.3){const h=.6+a()*.8,c=.25+a()*.3;s.push(A(a,1,M.KLAB,o,n+c*.3,h,c,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+c*.15,rx:h*.5,ry:c*.4,r:.12}}))}}else a()<.8&&u(o,i*(1.6+a()*1.4),!1)}function Ta(r,t,e,i,a,o,s){const n=r.terenWarstwy(t,o),l=(h,c,f,p,k={})=>{const m=r.terenWarstwy(t,h);return A(a,2,M.KRYSZTAL,h,m+c*.9,f,c,{par:[p,.35+a()*.4,0,.5+a()*.5],ox:f*1.9+c*.5,oy:c*1.25,...k})},u=(h,c,f)=>s.push(A(a,2,M.KRYSZTAL,h,c,f*.3,f,{par:[1,0,1,.8],rot:(a()-.5)*1.6,przed:!0}));if(t<=1)a()<.75&&s.push(l(o,i*(2.2+a()*3.6),i*(.9+a()*.9),3+Math.floor(a()*3)));else if(t<=3)a()<.75&&s.push(l(o,i*(1.2+a()*2.8),i*(.6+a()*.8),3+Math.floor(a()*4))),a()<.35&&u(o+(a()-.5)*6*e.z,n+i*(3+a()*4.5),i*(.35+a()*.5));else if(t===G){if(a()<.5){const h=.35+a()*a()*1,c=.35+a()*.45,f=l(o,h,c,2+Math.floor(a()*4),{przed:a()<.5});h>.6&&(f.bryla={x:o,y:n+h*.6,rx:c*.45,ry:h*.7,r:.1}),s.push(f)}}else a()<.3&&s.push(l(o,i*(1.2+a()*1.2),i*(1.3+a()*.8),3)),a()<.22&&s.push(A(a,2,M.KRYSZTAL,o+4*e.z,e.y0+e.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3}))}function Ka(r,t,e,i,a,o,s){const n=r.terenWarstwy(t,o),l=(h,c,f,p)=>{const k=r.terenWarstwy(t,h);s.push(A(a,3,M.KOLUMNA,h,k+c-.2*i,f,c,{par:[p,1,3+Math.floor(a()*3),0],ox:f*1.6}))},u=(h,c,f)=>{const p=r.terenWarstwy(t,h);s.push(A(a,3,M.LUK,h,p+f-.3*i,c,f,{par:[.2+a()*.08,a()<.45?.3+a()*.5:0,0,0]}))};if(t===0)if(a()<.55){const h=i*(1.6+a()*1.2),c=i*(5+a()*4);s.push(A(a,3,M.AKWEDUKT,o,n+h-.3*i,c,h,{par:[3+Math.floor(a()*3),0,a()<.5?.5+a()*.4:0,0]}))}else a()<.5&&l(o,i*(2.5+a()*3),i*(.5+a()*.4),a()<.5?a()*.3:0);else if(t===1)if(a()<.4){const h=i*(1.5+a()),c=i*(4+a()*3);s.push(A(a,3,M.AKWEDUKT,o,n+h-.3*i,c,h,{par:[3+Math.floor(a()*2),0,a()<.6?.4+a()*.5:0,0]}))}else a()<.6&&u(o,i*(1.3+a()),i*(1.8+a()*1.4));else if(t<=3){const h=i*(2.3+a()*2.4),c=i*(.34+a()*.16);if(a()<.78?(l(o,h,c,a()<.4?.15+a()*.55:0),a()<.5&&l(o+c*(7+a()*3),h,c,a()<.5?.2+a()*.6:0)):a()<.7&&u(o,i*(1.4+a()*.8),i*(2+a()*1.6)),t===3&&a()<.35){const f=i*(.6+a()*.7),p=i*(.3+a()*.25),k=o+3*e.z;s.push(A(a,3,M.BLOK,k,r.terenWarstwy(t,k)+p*.6,f,p,{par:[.06,0,0,0],rot:(a()-.5)*.7,przed:!0}))}}else if(t===G){const h=a();if(h<.3){const c=.45+a()*.6,f=.28+a()*.3,p=(a()-.5)*.5;s.push(A(a,3,M.BLOK,o,n+f*.75,c,f,{par:[.05,0,0,0],rot:p,przed:!0,bryla:{x:o,y:n+f*.7,rx:c*.85,ry:f*.8,r:.08}}))}else if(h<.42){const c=1.2+a()*.7,f=.5+a()*.35;s.push(A(a,3,M.BLOK,o,n+f*.8,c,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:n+f*.3,rx:c*.9,ry:f*.5,r:.08}}))}else if(h<.56){const c=.42+a()*.12,f=.5+a()*.8;s.push(A(a,3,M.KOLUMNA,o,n+f-.1,c,f,{par:[.25+a()*.3,0,4,0],ox:c*1.6,bryla:{x:o,y:n+f*.6,rx:c*.6,ry:f*.75,r:.1}}))}}else if(a()<.4){const h=i*(1.5+a()),c=i*(.8+a()*.5);s.push(A(a,3,M.BLOK,o,n+c*.5,h,c,{par:[.1,0,0,0],rot:(a()-.5)*.6}))}}function Ba(r,t,e,i,a,o,s){const n=r.terenWarstwy(t,o),l=(h,c,f)=>{const p=a()<.5?-1:1,k=c*(.42+a()*.15);for(let m=0;m<f;m++){const d=c*(1-.13*m-a()*.05),y=h+m*k,z=r.terenWarstwy(t,y),v=d*(.42+a()*.1);s.push(A(a,4,M.ZEBRO,y,z+d-.3*i,v,d,{par:[.13+a()*.04,.9+a()*.35,0,0],odbij:p,ox:v*1.5,oy:d*1.15,kolejnosc:.5+m*.01}))}},u=(h,c,f={})=>{const p=r.terenWarstwy(t,h),k=c*(.16+a()*.05);return A(a,4,M.KOSC,h,p+k*.6,c,k,{rot:(a()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(t<=1)a()<.62&&l(o,i*(2.4+a()*3),2+Math.floor(a()*3));else if(t<=3){if(a()<.58)l(o,i*(2+a()*3),2+Math.floor(a()*3));else if(a()<.5){const h=i*(2+a()*2),c=i*(.5+a()*.25);s.push(A(a,4,M.KREGI,o,n+c*.7,h,c,{par:[5+Math.floor(a()*4),0,0,0],przed:!0}))}t===3&&a()<.3&&s.push(u(o+3*e.z,i*(.8+a()*.8)))}else if(t===G){const h=a();if(h<.2){const c=1+a()*.9,f=.3+a()*.15;s.push(A(a,4,M.KREGI,o,n+f*.55,c,f,{par:[4+Math.floor(a()*3),0,0,0],przed:!0,bryla:{x:o,y:n+f*.1,rx:c*.9,ry:f*.45,r:.08}}))}else if(h<.42){const c=.5+a()*.7,f=u(o,c);f.bryla={x:o,y:f.y,rx:c*.8,ry:f.h*.5,r:.08},s.push(f)}}else a()<.4&&l(o,i*(2.5+a()*2),1)}const Ca=[Ea,Ra,Ta,Ka,Ba];function Bt(r,t,e,i,a,o,s,n){const l=r.terenWarstwy(t,s);switch(o){case 0:{const u=i*1.9,h=i*9;n.push(A(a,0,M.PIEN,s,l+i*2.3,u,h,{par:[.35,3,.8,.5],rot:1.28*(a()<.5?-1:1),ox:h*1.1,oy:h*1.1,kolejnosc:.9})),n.push(A(a,0,M.PIEN,s+i*11,e.y0+e.wys/2,i*2.6,e.wys/2+e.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const u=i*4.2,h=u*.75;n.push(A(a,1,M.DRZEWO,s,l+u-.4*i,h,u,{par:[5,1,.25,0],ox:h*1.3,kolejnosc:.9}));break}case 2:{const u=i*4.6,h=i*1.7;n.push(A(a,2,M.KRYSZTAL,s,l+u*.86,h,u,{par:[1,.12,0,1.6],ox:h*2+u*.3,oy:u*1.2,kolejnosc:.9})),n.push(A(a,2,M.KRYSZTAL,s+i*2.2,l+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const u=i*3.1;n.push(A(a,3,M.POSAG,s,l+u-.5*i,u*.62,u,{par:[a()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 4:{const u=i*2;n.push(A(a,4,M.CZASZKA,s,l+u*.62,u*1.45,u,{par:[0,0,0,0],rot:(a()-.5)*.3,kolejnosc:.9,ox:u*1.9,oy:u*1.5}));break}}}function Fa(r,t,e){const i=D[t],a=i.z*ja[t],o=i.komorka*i.z,s=it(r.ziarno,t*7919+17,e),n=[],l=(e+.2+.6*s())*o,u=l/i.mnoznikX,h=r.wagi(u);let c=s(),f=0;for(;f<E-1&&(c-=h[f],!(c<0));f++);if(Ca[f](r,t,i,a,s,l,n),t===2){const p=r.segment(u),k=r.srodekSegmentu(p)*i.mnoznikX-5.5*i.z;k>=e*o&&k<(e+1)*o?Bt(r,t,i,a,it(r.ziarno,991,p),r.krainaSegmentu(p),k,n):h[f]>.95&&s()<.07&&Bt(r,t,i,a,s,f,l,n)}return n}const kt=16;function Da(r,t){const e=it(r.ziarno,4242,t),i=[],a=t*kt,o=(s,n,l,u,h,c,f)=>i.push(s,n,l,u,e()*6.283,h,c[0],c[1],c[2],f);for(let s=a;s<a+kt;s+=.22){const n=s+e()*.22,l=r.wagi(n),u=r.ziemia(n);let h=e(),c=0;for(;c<E-1&&(h-=l[c],!(h<0));c++);const f=C[c],p=.6+e()*.6,k=[f.b[0]*p,f.b[1]*p,f.b[2]*p],m=e();if(c===0){if(m<.8&&o(n,u-.05,.18+e()*e()*.75,.014+e()*.012,0,k,1),e()<.085){const d=r.sufit(n);d<100&&o(n,d+.9,1.4+e()*e()*4.2,.018+e()*.014,1,[k[0]*.8,k[1]*.8,k[2]*.8],.55)}}else c===1?m<.42&&u<1.75?o(n,u-.05,.7+e()*1.7,.013+e()*.008,e()<.4?2:0,k,.7):m<.6&&o(n,u-.05,.15+e()*.4,.012,0,k,1):c===3?m<.22&&o(n,u-.04,.12+e()*.4,.011+e()*.006,0,k,1):c===4&&m<.2&&o(n,u-.04,.25+e()*.75,.009+e()*.006,0,k,1.6)}return new Float32Array(i)}const $=4,Ct=4,J=161;class Ia{constructor(t,e,i){this.gl=t,this.szum=e,this.swiat=i,this.p=new R(t,Ma,Pa,"wypiek");const a={wewn:t.RGBA8,format:t.RGBA,typ:t.UNSIGNED_BYTE};this.warstwy=D.map(o=>({W:o,bufor:new W(t,o.pxW*$,o.pxH,[a,a],{zawijanieS:t.REPEAT}),kafle:new Array($).fill(null)})),this.terenDane=new Float32Array(J*4),this.terenTex=mt(t,J,1,{wewn:t.RGBA32F,format:t.RGBA,typ:t.FLOAT,filtr:t.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const t of this.warstwy)t.kafle.fill(null);this.zadanie=null}zapewnij(t,e,i=1){let a=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],n=s.W,l=t.x*n.mnoznikX,u=e*n.z+.6*n.z,h=Math.floor((l-u)/n.szer),c=Math.floor((l+u)/n.szer);for(let f=h;f<=c;f++)s.kafle[V(f)]!==f&&this._pieczCaly(o,f);if(!a){const f=n.szer*.45,p=i>=0?Math.floor((l+u+f)/n.szer):Math.floor((l-u-f)/n.szer);s.kafle[V(p)]!==p&&p-h<$&&c-p<$&&(a=[o,p])}}this.zadanie?this._pieczPasek():a&&(this.zadanie=this._przygotuj(a[0],a[1]),this.warstwy[a[0]].kafle[V(a[1])]=null,this._pieczPasek())}_przygotuj(t,e){const i=D[t],a=this.swiat,o=e*i.szer,s=o+i.szer,n=new Float32Array(J*4),l=i.szer/(J-33),u=o-16*l;for(let p=0;p<J;p++){const k=u+p*l,m=k/i.mnoznikX,d=a.wagi(m);n[p*4]=a.terenWarstwy(t,k),n[p*4+1]=a.sufitWarstwy(t,k),n[p*4+2]=d[2],n[p*4+3]=d[3]}const h=o/i.mnoznikX,c=s/i.mnoznikX,f=p=>a.mieszaj(p,"b",[0,0,0]);return{l:t,i:e,pasek:0,dane:n,xs:u,dx:l,x0:o,rekwizyty:a.rekwizytyW(t,o,s),barwy:{gL:a.mieszaj(h,"grunt",[0,0,0]),gP:a.mieszaj(c,"grunt",[0,0,0]),wL:a.mieszaj(h,"wierzch",[0,0,0]),wP:a.mieszaj(c,"wierzch",[0,0,0]),lL:f(h),lP:f(c)}}}_pieczCaly(t,e){this.zadanie&&this.zadanie.l===t&&V(this.zadanie.i)===V(e)&&(this.zadanie=null);const i=this._przygotuj(t,e);this._rysuj(i,0,D[t].pxH),this.warstwy[t].kafle[V(e)]=e,this.upieczono++}_pieczPasek(){const t=this.zadanie,e=D[t.l],i=Math.ceil(e.pxH/Ct);this._rysuj(t,t.pasek*i,Math.min(i,e.pxH-t.pasek*i)),++t.pasek>=Ct&&(this.warstwy[t.l].kafle[V(t.i)]=t.i,this.zadanie=null,this.upieczono++)}_rysuj(t,e,i){const a=this.gl,o=D[t.l],s=this.warstwy[t.l],n=this.p,l=V(t.i);a.bindFramebuffer(a.FRAMEBUFFER,s.bufor.fbo),a.viewport(l*o.pxW,0,o.pxW,o.pxH),a.enable(a.SCISSOR_TEST),a.scissor(l*o.pxW,e,o.pxW,i),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this.terenTex),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,J,1,0,a.RGBA,a.FLOAT,t.dane);const u=t.barwy;n.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",t.xs,1/t.dx,J).f("uKafel",t.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",t.x0,o.szer).f("uGruntL",...u.gL).f("uGruntP",...u.gP).f("uWierzchL",...u.wL).f("uWierzchP",...u.wP).f("uLiscL",...u.lL).f("uLiscP",...u.lP);const h=c=>{n.i("uTyp",c.typ).f("uPoz",c.x,c.y).f("uObsz",c.ox+o.miekkosc*o.z*2,c.oy+o.miekkosc*o.z*2).f("uRot",c.rot).f("uOdbij",c.odbij).f("uRozm",c.w,c.h).f("uPar",c.par[0],c.par[1],c.par[2],c.par[3]).f("uZi",c.zi).f("uKa",...c.ka).f("uKb",...c.kb).f("uKc",...c.kc),a.drawArrays(a.TRIANGLE_STRIP,0,4)};for(const c of t.rekwizyty)c.przed||h(c);n.i("uTyp",M.TEREN).f("uPoz",t.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+t.l*.11),a.drawArrays(a.TRIANGLE_STRIP,0,4);for(const c of t.rekwizyty)c.przed&&h(c);a.disable(a.SCISSOR_TEST),a.disable(a.BLEND),a.bindFramebuffer(a.FRAMEBUFFER,null)}}function V(r){return(r%$+$)%$}const Oa=$,Ft=10;class Na{constructor(t,e){this.gl=t,this.swiat=e,this.p=new R(t,da,za,"flora"),this.vao=t.createVertexArray(),this.buf=t.createBuffer(),t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.buf);const i=Ft*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([a,o,s])=>{t.enableVertexAttribArray(a),t.vertexAttribPointer(a,o,t.FLOAT,!1,i,s*4),t.vertexAttribDivisor(a,1)}),t.bindVertexArray(t.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map}reset(){this.klucz="",this.pamiec.clear()}rysuj(t,e,i,a,o){const s=this.gl,n=Math.floor((t.cam.x-t.polX-3)/kt),l=Math.floor((t.cam.x+t.polX+3)/kt),u=n+":"+l;if(u!==this.klucz){this.klucz=u;const h=[];let c=0;for(let k=n;k<=l;k++){let m=this.pamiec.get(k);m||(this.pamiec.size>12&&this.pamiec.clear(),m=Da(this.swiat,k),this.pamiec.set(k,m)),h.push(m),c+=m.length}const f=new Float32Array(c);let p=0;for(const k of h)f.set(k,p),p+=k.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=c/Ft}this.ile&&(this.p.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uCzas",t.czas).f("uIskra",t.iskra.x,t.iskra.y,t.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uRes",a,o).tex("uSwiatlo",1,i),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*(Ut+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const Y=16,nt=8;function Dt(r,t){const e=4+Math.floor(r()*4.99),i=[];let a=0;for(let k=0;k<e;k++){const m=.35+r();i.push(m),a+=m}const o=1+r()*1.1,s=r()*Math.PI*2,n=[];let l=r()*Math.PI*2;const u=Math.floor(r()*e),h=r()<.4?Math.floor(r()*e):-1;for(let k=0;k<e;k++){l+=i[k]/a*Math.PI*2;let m=t*(.5+.5*r());(k===u||k===h)&&(m*=.38+r()*.2);const d=Math.cos(l)*m*o,y=Math.sin(l)*m;n.push([d*Math.cos(s)-y*Math.sin(s),d*Math.sin(s)+y*Math.cos(s)])}let c=0,f=0;for(const k of n)c+=k[0],f+=k[1];c/=e,f/=e;let p=0;for(const k of n)k[0]-=c,k[1]-=f,p=Math.max(p,Math.hypot(k[0],k[1]));return{v:n,zasieg:p}}function Vt(r,t){const e=t*Y,i=e+Y/2,a=r.segment(i),o=r.srodekSegmentu(a)+13;if(o<e||o>=e+Y)return null;const s=r.krainaSegmentu(a);return{id:"f"+a,x:o,y:Math.min(r.ziemia(o)+4.4,r.granicaLotu(o)-2.2),kraina:s,segment:a,odsloniecie:0,odkryty:!1}}function Wa(r,t){const e=it(r.ziarno,9001,t),i=[],a=t*Y,o=1+(e()<.6?1:0)+(e()<.22?1:0);for(let n=0;n<o;n++){const l=a+(n+.15+.7*e())*Y/o,u=r.ziemia(l),h=Math.min(r.granicaLotu(l)-.9,u+9.5),c=u+1.4+e()*Math.max(.5,h-u-1.4),f=e()<.32,p=f?2+Math.floor(e()*3):1;for(let k=0;k<p;k++){const m=f?.2+e()*.32:.32+e()*.4,d=e()*Math.PI*2,y=k===0?0:.6+e()*.9,z=Dt(e,m),v=l+Math.cos(d)*y,_=c+Math.sin(d)*y*.8;i.push({id:t*16+i.length,x:v,y:_,px:v,py:_,kat:e()*Math.PI*2,obrot:(e()-.5)*.42,faza:e()*Math.PI*2,v:z.v,zasieg:z.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0})}}const s=Vt(r,t);if(s)for(let n=0;n<3;n++){const l=Dt(e,.3+e()*.25),u=s.x-2.6+n*2.4+(e()-.5)*.6,h=s.y-1.9+(e()-.5)*.9;i.push({id:t*16+i.length,x:u,y:h,px:u,py:h,kat:e()*6.283,obrot:(e()-.5)*.42,faza:e()*6.283,v:l.v,zasieg:l.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0})}return i}class At{constructor(t){this.swiat=t,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(t,e,i,a){const o=Math.floor((e.x-i-8)/Y),s=Math.floor((e.x+i+8)/Y);this.widoczne.length=0;for(let n=o;n<=s;n++){let l=this.kawalki.get(n);if(!l){if(this.kawalki.size>24)for(const u of this.kawalki.keys())(u<o-2||u>s+2)&&this.kawalki.delete(u);l=Wa(this.swiat,n),this.kawalki.set(n,l),this.naNowyKawalek?.(n,l)}for(const u of l)u.kat+=u.obrot*t,u.py=u.y+Math.sin(a*.6+u.faza)*.12,u.px=u.x+Math.sin(a*.37+u.faza*1.7)*.05,this.widoczne.push(u)}}static wierzcholki(t,e){const i=Math.cos(t.kat),a=Math.sin(t.kat);for(let o=0;o<t.v.length;o++){const s=t.v[o];e[o*2]=i*s[0]-a*s[1],e[o*2+1]=a*s[0]+i*s[1]}return e}}const $t=`
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
}`,Ga=`#version 300 es
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
}`,Za=T+$t+`
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
}`,qa=T+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,Xa=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ya=T+$t+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${nt}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${nt}; i++) {
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
}`;class Ua{constructor(t,e){this.gl=t,this.szum=e,this.pWachlarz=new R(t,Ga,Za,"wachlarz"),this.pNasycenie=new R(t,q,qa,"nasycenie"),this.pOdlamek=new R(t,Xa,Ya,"odlamek"),this._w=new Float32Array(nt*2)}wachlarze(t,e){const i=this.gl,a=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),a.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uCzas",t.czas).tex("uSzum",0,this.szum);for(const o of e)a.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi).f("uStart",o.start).f("uSkos",o.skos),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(t,e,i,a,o,s){const n=this.gl,l=this.pOdlamek,u=t.iskra;l.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",o,s).f("uBarwaSw",...e.barwaSw).tex("uSwiatlo",1,a);for(const h of i){if(Math.abs(h.px-t.cam.x)>t.polX+1.5)continue;const c=u.x-h.px,f=u.y-h.py,p=Math.hypot(c,f)||1,k=p/(u.zasieg*1.25);At.wierzcholki(h,this._w);const m=Math.pow(Math.max(0,Math.sin(t.czas*.9+h.faza*3)),40),d=Math.floor(t.czas*.9/(2*Math.PI)+h.faza)%h.v.length;l.f("uSrodek",h.px,h.py).f("uObsz",h.zasieg+.5).fv("uW",2,this._w).i("uN",h.v.length).f("uDoIskry",c/p,f/p).f("uOs",Math.cos(h.os+h.kat),Math.sin(h.os+h.kat)).f("uBlyskPoz",this._w[d*2],this._w[d*2+1]).f("uBlask",Math.exp(-k*k)).f("uFaza",t.czas*.7+h.faza).f("uBlysk",m).f("uOsw",h.oswietlenie),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}const ut=`#version 300 es
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
}`,Va=T+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,$a=T+Ht+`
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
}`,Ha=T+Ht+`
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
}`,Ja=T+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  // miękka fala światła, nie kreska cyrklem: szeroka, rozmyta i szybko gasnąca
  float pierscien = exp(-abs(r - prom) / (0.14 + 0.3 * uT)) * smoothstep(0.0, 0.25, r);
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 3.0) * 0.42, 0.0);
}`;class Qa{constructor(t,e){this.gl=t,this.szum=e,this.pDrobinka=new R(t,ut,Va,"drobinka"),this.pSlad=new R(t,ut,$a,"slad"),this.pFresk=new R(t,ut,Ha,"fresk"),this.pKrag=new R(t,ut,Ja,"krag")}miniatura(t,e,i=144){const a=this.gl;this._mini||(this._mini=new W(a,i,i,{wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE}),this._czarna=mt(a,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),a.disable(a.BLEND),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",t).f("uWariant",e).f("uBarwa",...C[t].c).f("uOdsl",1.15),a.drawArrays(a.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);a.readPixels(0,0,i,i,a.RGBA,a.UNSIGNED_BYTE,o),a.bindFramebuffer(a.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const n=s.getContext("2d"),l=n.createImageData(i,i);for(let u=0;u<i;u++)for(let h=0;h<i;h++){const c=((i-1-u)*i+h)*4,f=(u*i+h)*4,p=o[c],k=o[c+1],m=o[c+2],d=Math.max(p,k,m);l.data[f]=p,l.data[f+1]=k,l.data[f+2]=m,l.data[f+3]=Math.min(255,d*1.6)}return n.putImageData(l,0,0),s.toDataURL("image/png")}_wspolne(t,e){return t.uzyj().f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY)}freski(t,e,i,a,o){if(!e.freski.length)return;const s=this.gl,n=this._wspolne(this.pFresk,t);n.f("uRes",a,o).f("uCzas",t.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const l of e.freski)Math.abs(l.x-t.cam.x)>t.polX+4||(n.f("uSrodek",l.x,l.y).f("uObsz",3.9,2.25).i("uTyp",l.kraina).f("uBarwa",...C[l.kraina].c).f("uOdsl",l.odkryty?0:l.odsloniecie).f("uOdkryty",l.odkryty?1:0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(t,e,i,a,o,s){const n=this.gl,l=t.polX+1.5;let u=this._wspolne(this.pDrobinka,t);for(const h of i.drobinki)Math.abs(h.px-t.cam.x)>l||(u.f("uSrodek",h.px,h.py).f("uObsz",.9,.9).f("uBarwa",...e.barwaSw).f("uPuls",.8+.2*Math.sin(t.czas*2.2+h.faza)),n.drawArrays(n.TRIANGLE_STRIP,0,4));if(i.slady.length){u=this._wspolne(this.pSlad,t),u.f("uRes",o,s).f("uCzas",t.czas).tex("uSwiatlo",1,a).f("uSkala",.42);for(const h of i.slady)Math.abs(h.x-t.cam.x)>l||(u.f("uSrodek",h.x,h.y+Math.sin(t.czas*.8+h.faza)*.06).f("uObsz",.75,.75).i("uTyp",h.kraina).f("uWariant",h.wariant).f("uBarwa",...C[h.kraina].c).f("uOdsl",h.odsloniecie),n.drawArrays(n.TRIANGLE_STRIP,0,4))}if(i.efekty.length){u=this._wspolne(this.pKrag,t);for(const h of i.efekty){const c=h.rodzaj===2?5:h.rodzaj===1?2.2:1.3;u.f("uSrodek",h.x,h.y).f("uObsz",c+.5,c+.5).f("uBarwa",...e.barwaSw).f("uT",h.t).f("uR",c),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}}const Lt=["wszystko","tlo","swiat","swiatlo","glow","maska"],te=170;class ae{constructor(t,e){this.gl=t,this.swiat=e,this.szum=na(t),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=aa(t);this.bTlo=new W(t,4,4,i),this.bSwiat=new W(t,4,4,i),this.bSwiatlo=new W(t,4,4,i),this.bSurowe=new W(t,4,4,i),this.bGlow=[new W(t,4,4,i),new W(t,4,4,i),new W(t,4,4,i)],this.bGlowWy=new W(t,4,4,i),this.pNiebo=new R(t,q,fa,"niebo"),this.pWarstwa=new R(t,q,ka,"warstwa"),this.pBliska=new R(t,q,pa,"warstwa-bliska"),this.pGra=new R(t,q,ma,"plan-gry"),this.pDrobinki=new R(t,wa,ya,"drobinki"),this.pKopia=new R(t,q,ca,"kopia"),this.pDol=new R(t,q,la,"rozmyj-dol"),this.pGora=new R(t,q,ua,"rozmyj-gora"),this.pFinal=new R(t,q,ha,"final"),this.iskierka=new _a(t),this.wypiek=new Ia(t,this.szum,e),this.flora=new Na(t,e),this.szklo=new Ua(t,this.szum),this.obiekty=new Qa(t,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[Mt,0,0],wL:new Float32Array(E),wP:new Float32Array(E)},this._camL=[0,0]}rozmiar(t,e){this.w=t,this.h=e;const i=this.jakosc;this.bTlo.rozmiar(t*i.tlo,e*i.tlo),this.bSwiat.rozmiar(t,e),this.bSwiatlo.rozmiar(t*i.swiatlo,e*i.swiatlo),this.bSurowe.rozmiar(t*i.swiatlo,e*i.swiatlo);let a=t*i.swiatlo,o=e*i.swiatlo;for(const s of this.bGlow)a/=2,o/=2,s.rozmiar(a,o);this.bGlowWy.rozmiar(t*i.swiatlo*.5,e*i.swiatlo*.5)}miniatura(t,e){return this.obiekty.miniatura(t,e)}_atmosfera(t){const e=this.atm,i=this.swiat,a=t.cam.x;i.mieszaj(a-t.polX,"mgla",e.mglaL),i.mieszaj(a+t.polX,"mgla",e.mglaP),i.mieszaj(a,"mgla",e.mgla),i.mieszaj(a,"mgla2",e.mgla2),i.mieszaj(a,"nieboGora",e.gora),i.mieszaj(a,"nieboDol",e.dol),i.mieszaj(a,"emis",e.emis);for(let p=0;p<3;p++)e.barwaSw[p]=e.mgla[p]*.68+.34;const o=p=>i.mieszajLiczbe(a,k=>k.niebo[p]);e.niebo[0]=o("tarcza"),e.niebo[1]=o("obrecz"),e.niebo[2]=o("zorza"),e.niebo[3]=o("gwiazdy"),e.poswiata=o("poswiata");const s=o("snopy");e.pogoda[0]=i.mieszajLiczbe(a,p=>p.wiatr),e.pogoda[1]=s,e.pogoda[2]=i.mieszajLiczbe(a,p=>p.mglistosc);const n=i.segment(a),l=t.polX/t.polY;e.cialo[0]=Math.max(-l*.8,Math.min(l*.8,(i.srodekSegmentu(n)-a)*.011+l*.28)),e.cialo[1]=.4-(t.cam.y-5.3)*.012;const u=e.niebo[0]+e.niebo[1];let h=e.cialo[0]*u+.25*s,c=e.cialo[1]*u+1*s+.3;const f=Math.hypot(h,c)||1;return e.swNieba[0]=h/f,e.swNieba[1]=c/f,e.swNieba[2]=Math.min(1,.35+u*.7+s*.3),e.gruntY[0]=i.ziemia(a-t.polX),e.gruntY[1]=i.ziemia(a+t.polX),i.wagi(a-t.polX,e.wL),i.wagi(a+t.polX,e.wP),e.woda[1]=e.wL[1],e.woda[2]=e.wP[1],e}_widok(t,e){t.f("uCam",e.cam.x,e.cam.y).f("uPol",e.polX,e.polY).f("uRes",this.w,this.h).f("uCzas",e.czas).tex("uSzum",0,this.szum)}_warstwa(t,e,i,a){const o=D[e],s=this.wypiek.warstwy[e];La(o,i.cam,this._camL),this._widok(t.uzyj(),i),t.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Oa*o.szer),o.y0,1/o.wys).f("uMglaL",...a.mglaL).f("uMglaP",...a.mglaP).f("uMgla2",...a.mgla2).f("uAtm",o.zamglenie,o.mgla,o.otoczenie,o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...a.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...a.pogoda).f("uSwNieba",...a.swNieba).f("uGruntY",...a.gruntY).f("uJasnosc",o.jasnosc),U(this.gl)}rysuj(t){const e=this.gl;if(e.disable(e.BLEND),this.warstwa==="maska"){this._maska(t);return}const i=this._atmosfera(t);if(this.wypiek.zapewnij(t.cam,t.polX,t.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),t),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata),U(e),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),!this.bez.dalekie)for(let u=0;u<4;u++)this._warstwa(this.pWarstwa,u,t,i);e.disable(e.BLEND);const a=t.tecze?t.tecze.wachlarze:[],o=a.length>0;o&&(this.bSurowe.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.szklo.wachlarze(t,a),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),U(e)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,t.znaleziska&&t.znaleziska.freski.length&&(this.bTlo.ustaw(),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(t,t.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),e.disable(e.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),U(e)):this._warstwa(this.pGra,G,t,i),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(t,i,this.bSwiatlo.tex[0],this.w,this.h),t.odlamki&&this.szklo.odlamki(t,i,t.odlamki,this.bSwiatlo.tex[0],this.w,this.h),t.znaleziska&&this.obiekty.reszta(t,i,t.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(te*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",this.w,this.h).f("uCzas",t.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",Mt).f("uIskra",t.iskra.x,t.iskra.y,t.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),e.drawArrays(e.POINTS,0,s)),t.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(t),this.bez.bliska||this._warstwa(this.pBliska,5,t,i),e.disable(e.BLEND),Kt(e,this.w,this.h);const n=Lt.indexOf(this.warstwa),l=n===1?this.bTlo.tex[0]:n===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,l).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",t.czas).f("uTryb",n===4?3:n===0?0:1).f("uZiarno",this.ziarno),U(e)}pomiar(t,e=40){const i=this.gl,a=new Uint8Array(4);this.rysuj(t),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,a);const o=performance.now();for(let s=0;s<e;s++)t.czas+=.016,this.rysuj(t);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,a),(performance.now()-o)/e}_maska(t){const e=this.gl;Kt(e,this.w,this.h),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),t.mgla=this.atm.mgla,this.iskierka.rysuj(t,!0)}_poswiata(){const t=this.gl;let e=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),U(t),e=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const a=this.bGlow[i];a.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),U(t),e=a}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,e.tex[0]).f("uPx",1/e.w,1/e.h),U(t)}}const xt={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class ee{constructor(t){this.canvas=t,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const e=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",a=>{const o=a.key.toLowerCase();xt[o]&&!a.ctrlKey&&!a.metaKey&&!a.altKey&&(this.wcisniete.add(o),a.preventDefault(),e())}),addEventListener("keyup",a=>this.wcisniete.delete(a.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),t.addEventListener("pointerdown",a=>{this.wskaznik={x:a.clientX,y:a.clientY};try{t.setPointerCapture(a.pointerId)}catch{}e()}),t.addEventListener("pointermove",a=>{this.wskaznik&&(this.wskaznik.x=a.clientX,this.wskaznik.y=a.clientY)});const i=()=>{this.wskaznik=null};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("contextmenu",a=>a.preventDefault())}odczyt(t){let e=0,i=0;for(const s of this.wcisniete)e+=xt[s][0],i+=xt[s][1];const a=Math.hypot(e,i);a>1&&(e/=a,i/=a);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),n=(this.wskaznik.x-s.left)/s.width*2-1,l=1-(this.wskaznik.y-s.top)/s.height*2;o=[t.cam.x+n*t.polX,t.cam.y+l*t.polY]}return{cel:o,os:[e,i]}}}function ie(r){const t=document.createElement("div");t.className="dev",t.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>`,document.getElementById("nakladka").appendChild(t);const e=t.querySelector("#dev-stan"),i=t.querySelector("#dev-warstwy");for(const s of Lt){const n=document.createElement("button");n.textContent=s,n.dataset.w=s,n.onclick=()=>{r.renderer.warstwa=s,rt("warstwa",s==="wszystko"?null:s),o()},i.appendChild(n)}const a=t.querySelector("#dev-tele");for(const s of r.teleporty()){const n=document.createElement("button");n.textContent=s.nazwa,n.onclick=()=>r.teleport(s.x),a.appendChild(n)}t.querySelector("#dev-ziarno").onclick=()=>{rt("ziarno",Math.floor(Math.random()*1e6)),location.reload()},t.querySelector("#dev-pauza").onclick=()=>{r.petla.pauza=!r.petla.pauza};function o(){for(const s of i.children)s.classList.toggle("wl",s.dataset.w===r.renderer.warstwa)}return o(),setInterval(()=>{const s=r.petla,n=r.renderer,l=r.stan;e.innerHTML=`<b>${s.fps.toFixed(0)} kl./s</b> · ${s.msKlatki.toFixed(1)} ms · ${n.w}×${n.h}<br>ziarno ${r.ziarno} · x ${l.iskra.x.toFixed(1)} y ${l.iskra.y.toFixed(1)} · ${r.opisJakosci()}`},250),t}const It=132,et=22,Ot=46;class oe{constructor(t){this.ziarno=t|0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(E),this._w2=new Float32Array(E)}_permSurowa(t){const e=it(this.ziarno,t,5),i=[...Array(E).keys()];for(let a=E-1;a>0;a--){const o=Math.floor(e()*(a+1));[i[a],i[o]]=[i[o],i[a]]}if(t===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(t){let e=this._perm.get(t);if(!e){e=this._permSurowa(t);const i=this._permSurowa(t-1)[E-1];t!==0&&e[0]===i?[e[0],e[1]]=[e[1],e[0]]:t===0&&(this._permSurowa(1)[0],e[E-1]),this._perm.set(t,e)}return e}krainaSegmentu(t){const e=Math.floor(t/E);return this._permutacja(e)[t-e*E]}granica(t){return t*It-Ot+(at(t,this.ziarno,77)-.5)*34}segment(t){let e=Math.floor((t+Ot)/It);for(;t<this.granica(e);)e--;for(;t>=this.granica(e+1);)e++;return e}srodekSegmentu(t){return(this.granica(t)+this.granica(t+1))/2}wagi(t,e=new Float32Array(E)){e.fill(0);const i=this.segment(t),a=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(t>o-et){const n=lt(o-et,o+et,t);e[s]+=1-n,e[this.krainaSegmentu(i+1)]+=n}else if(t<a+et){const n=lt(a-et,a+et,t);e[this.krainaSegmentu(i-1)]+=1-n,e[s]+=n}else e[s]=1;return e}krainaW(t){return this.krainaSegmentu(this.segment(t))}mieszaj(t,e,i=[0,0,0]){const a=this.wagi(t,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<E;o++)if(a[o]>0){const s=C[o][e];i[0]+=s[0]*a[o],i[1]+=s[1]*a[o],i[2]+=s[2]*a[o]}return i}mieszajLiczbe(t,e){const i=this.wagi(t,this._w2);let a=0;for(let o=0;o<E;o++)i[o]>0&&(a+=i[o]*e(C[o],o));return a}teleporty(){const t=[];for(let e=0;t.length<E&&e<40;e++){const i=this.krainaSegmentu(e);t.some(a=>a.kraina===i)||t.push({nazwa:C[i].id,kraina:i,x:this.srodekSegmentu(e),segment:e})}return t.sort((e,i)=>e.kraina-i.kraina)}_terenKrainy(t,e){const i=C[t].teren,a=this.ziarno,o=B(e*.021,a+3,3);switch(t){case 1:{const s=B(e*.05,a+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(B(e*.4,a+32,2)-.5)}case 2:{const s=B(e*.35,a+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,n=.55,l=s/n,u=Math.floor(l),h=l-u;return(u+lt(.35,.65,h))*n+.05*(B(e*.6,a+51,2)-.5)}case 4:{const s=B(e*.032,a+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(e*.21+6*s)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(B(e*.23,a+21,3)-.5)*2}}ziemia(t){const e=this.wagi(t,this._w);let i=0;for(let a=0;a<E;a++)e[a]>0&&(i+=e[a]*this._terenKrainy(a,t));return i}sufit(t){const e=this.wagi(t,this._w)[0];return e<.02?1e4:C[0].teren.sufit+1.1*(B(t*.11,this.ziarno+71,3)-.5)+(1-e)*9}granicaLotu(t){return Math.min(15.3,this.sufit(t)-.5)}terenWarstwy(t,e){if(t===G)return this.ziemia(e);const i=D[t],a=e/i.mnoznikX,o=e/i.z,s=this.ziarno+100*(t+1),n=this.wagi(a,this._w),l=t===0?1.7:t===1?1.25:1;let u=0;if(n[0]>0&&(u+=n[0]*(1.5*B(o*.06,s,3)+.3*B(o*.3,s+1,2))),n[1]>0&&(u+=n[1]*(.35*B(o*.07,s+2,2)+.2)),n[2]>0){const h=B(o*.11,s+3,3);u+=n[2]*(2.3*(1-Math.abs(2*h-1))*l+.5*B(o*.5,s+4,2))}if(n[3]>0){const h=B(o*.05,s+5,2)*3;u+=n[3]*((Math.floor(h)+lt(.4,.6,h-Math.floor(h)))*.55+.2)}return n[4]>0&&(u+=n[4]*(1.9*B(o*.045,s+6,2)*l+.25*Math.sin(o*.3))),i.bliska&&(u=u*.6-.5),u*i.z}sufitWarstwy(t,e){if(t===G)return this.sufit(e);const i=D[t];if(t<2||i.bliska)return 1e4;const a=this.wagi(e/i.mnoznikX,this._w)[0];return a<.02?1e4:i.A+i.z*(t===2?3.4:4.3)+i.z*(1.4*(B(e/i.z*.1,this.ziarno+80+t,3)-.5)+(1-a)*9)}rekwizyty(t,e){const i=t*1e6+e+5e5;let a=this._komorki.get(i);return a||(this._komorki.size>600&&this._komorki.clear(),a=Fa(this,t,e),this._komorki.set(i,a)),a}rekwizytyW(t,e,i){const a=D[t],o=a.komorka*a.z,s=9*a.z,n=[];for(let l=Math.floor((e-s)/o);l<=Math.floor((i+s)/o);l++)for(const u of this.rekwizyty(t,l))u.x+u.ox>e&&u.x-u.ox<i&&n.push(u);return n.sort((l,u)=>l.kolejnosc-u.kolejnosc),n}_bryly(t){const e=D[G],i=Math.floor(t/e.komorka),a=this._tmpBryly||(this._tmpBryly=[]);a.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(G,o))s.bryla&&a.push(s.bryla);return a}odleglosc(t,e){let i=Math.min(e-this.ziemia(t),this.granicaLotu(t)-e);for(const a of this._bryly(t)){const o=Math.abs(t-a.x)-a.rx,s=Math.abs(e-a.y)-a.ry,n=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-a.r;n<i&&(i=n)}return i}_normalna(t,e){const a=this.odleglosc(t+.06,e)-this.odleglosc(t-.06,e),o=this.odleglosc(t,e+.06)-this.odleglosc(t,e-.06),s=Math.hypot(a,o)||1;return[a/s,o/s]}odpychanie(t,e,i){const a=this.odleglosc(t,e)-i,o=.75;if(a>=o)return se;const s=this._normalna(t,e),n=10*(1-Math.max(0,a)/o)**2;return[s[0]*n,s[1]*n]}zderzenie(t,e,i){const a=this.odleglosc(t,e)-i;if(a>=0)return null;const o=this._normalna(t,e);return{nx:o[0],ny:o[1],gl:-a}}woda(t){return this.ziemia(t)<Mt}}const se=[0,0],re=1.44,ne=1.66,ce=.54,le=1.4,bt=13,ue=.2,gt=18,ot=new Float32Array(nt*2);function he(r,t,e,i,a,o,s){let n=!1,l=0;for(let u=0;u<5;u++){let h=1e9,c=0,f=0,p=-1;for(let g=0;g<r;g++){const S=(g+1)%r,w=ot[g*2],K=ot[g*2+1],x=ot[S*2]-w,b=ot[S*2+1]-K,I=i*b-a*x;if(Math.abs(I)<1e-9)continue;const F=w-t,Z=K-e,zt=(F*b-Z*x)/I,Rt=(F*a-Z*i)/I;zt>1e-4&&Rt>=0&&Rt<=1&&zt<h&&(h=zt,c=x,f=b,p=g)}if(p<0)return null;t+=i*h,e+=a*h;let k=f,m=-c;const d=Math.hypot(k,m);k/=d,m/=d;let y=-(i*k+a*m);y<0&&(k=-k,m=-m,y=-y);const z=n?o:1/o,v=1-z*z*(1-y*y);if(v<0)i+=2*y*k,a+=2*y*m,l++;else{const g=Math.sqrt(v);if(i=z*i+(z*y-g)*k,a=z*a+(z*y-g)*m,n=!n,!n){const S=Math.hypot(i,a);return s[0]=t,s[1]=e,s[2]=i/S,s[3]=a/S,s[4]=p,s[5]=l,s}}const _=Math.hypot(i,a);i/=_,a/=_}return null}const fe=[0,0,0,0,0,0],ft=(r,t)=>{let e=r-t;for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},St=r=>r-Math.floor(r),H=[];for(let r=0;r<nt;r++)H.push({wr:0,rx:0,ry:0,wf:0,fx:0,fy:0,px:0,py:0,ile:0,waga:0,kat:0,dk:0,ox:0,oy:0,szer:0});function Nt(r,t,e){const i=r.v.length,a=Math.hypot(t,e),o=-t/a,s=-e/a,n=1.9*r.zasieg/bt;At.wierzcholki(r,ot);for(let h=0;h<i;h++){const c=H[h];c.wr=c.rx=c.ry=c.wf=c.fx=c.fy=c.px=c.py=c.ile=c.waga=0}let l=0,u=0;for(let h=0;h<bt;h++){const c=((h+.5)/bt*2-1)*r.zasieg*.95;let f=-s*c-t,p=o*c-e;const k=Math.hypot(f,p);f/=k,p/=k;let m=!1;for(let d=0;d<2;d++){const y=he(i,t,e,f,p,d?ne:re,fe);if(!y||(m=!0,y[5]>2||y[2]*o+y[3]*s<ue))continue;const z=y[5]===0?1:y[5]===1?.5:.25,v=H[y[4]];d?(v.wf+=z,v.fx+=y[2]*z,v.fy+=y[3]*z):(v.wr+=z,v.rx+=y[2]*z,v.ry+=y[3]*z),v.px+=y[0]*z,v.py+=y[1]*z,v.ile++}m&&l++}for(let h=0;h<i;h++){const c=H[h];if(c.wr<=0||c.wf<=0){c.waga=0;continue}const f=Math.atan2(c.ry,c.rx);c.dk=ft(Math.atan2(c.fy,c.fx),f),c.kat=f+c.dk/2,c.ox=c.px/(c.wr+c.wf),c.oy=c.py/(c.wr+c.wf),c.waga=(c.wr+c.wf)/(2*Math.max(1,l)),c.szer=c.ile*.5*n,c.waga>u&&(u=c.waga)}return u}function Wt(r,t,e,i,a,o){const s=St(t.faza*7.31+e*.37),n=St(t.faza*3.17+e*.61),l=St(t.faza*5.71+e*.23),u=Math.abs(r.dk);return o.rozw=Math.max(.27,Math.min(le,(ce+.72*(1-Math.exp(-u*4)))*(.9+.22*s)*(.3+1*a))),o.start=Math.min(1,Math.max(.2,r.szer*.8/Math.tan(o.rozw/2))),o.dlugosc=Math.min(5.2,i*(.52+.45*Math.sqrt(r.waga))*(.85+.3*n)*(.4+.85*a)),o.skos=(l*2-1)*.55,o.znak=(r.dk>=0?1:-1)*Math.min(1,u/.035),o}function Gt(r,t,e,i=0){const a=Math.abs(r),o=t-i;if(a>=1||o<=0)return 0;const s=(a-.6)/.4,n=a<.6?1:1-s*s*(3-2*s),l=o/e,u=Math.min(1,o/.4);return n*u*u*(3-2*u)*Math.exp(-l*l*2.4)}const L={};class ke{constructor(){this.wachlarze=[],this._pula=[]}aktualizuj(t,e,i){const a=this.wachlarze;a.length=0;const o=1.6+e.zasieg*1.25,s=1.7+e.zasieg*.62,n=1-Math.exp(-t*9),l=1-Math.exp(-t*5);let u=0;const h=()=>(this._pula[u]||(this._pula[u]={}),this._pula[u++]);for(const f of i){const p=f.px-e.x,k=f.py-e.y,m=Math.hypot(p,k);let d=0;m<o&&m>f.zasieg*.6&&(d=Math.pow(1-m/o,1.15));const y=f.oswietlenie;if(f.oswietlenie+=(d-f.oswietlenie)*l,y<.15&&f.oswietlenie>=.15&&this.naSzklo?.(f),f.oswietlenie<.01||m<.001){f.wachlarz=null;continue}const z=f.v.length;let v=f.wachlarz;if(!v){v=f.wachlarz=[];for(let g=0;g<z;g++)v.push({sila:0,kat:0,ox:0,oy:0,rozw:0,start:0,dlugosc:0,skos:0,znak:0})}const _=d>0?Nt(f,-p,-k):0;for(let g=0;g<z;g++){const S=H[g],w=v[g],K=_>0?S.waga/_:0;if(K<.4)w.sila+=(0-w.sila)*l;else{Wt(S,f,g,s,d,L);const I=S.ox-Math.cos(S.kat)*L.start,F=S.oy-Math.sin(S.kat)*L.start;w.sila<.02?(w.kat=S.kat,w.ox=I,w.oy=F,w.rozw=L.rozw,w.start=L.start,w.dlugosc=L.dlugosc,w.znak=L.znak):(w.kat+=ft(S.kat,w.kat)*n,w.ox+=(I-w.ox)*n,w.oy+=(F-w.oy)*n,w.rozw+=(L.rozw-w.rozw)*n,w.start+=(L.start-w.start)*n,w.dlugosc+=(L.dlugosc-w.dlugosc)*n,w.znak+=(L.znak-w.znak)*n),w.skos=L.skos,w.sila+=(Math.pow(K,1.5)-w.sila)*l}const x=w.sila*f.oswietlenie*Math.min(1,Math.abs(w.znak)*1.6);if(x<.02||a.length>=gt-2)continue;const b=h();b.x=f.px+w.ox,b.y=f.py+w.oy,b.kat=w.kat,b.rozwarcie=w.rozw,b.dlugosc=w.dlugosc,b.start=w.start,b.skos=w.skos,b.sila=x,b.znak=w.znak>=0?1:-1,b.zi=f.faza+g*1.7,b.zrodlo=f,b.wtorny=!1,a.push(b)}}const c=a.length;for(let f=0;f<c&&a.length<gt;f++){const p=a[f];for(const k of i){if(k===p.zrodlo)continue;const m=k.px-p.x,d=k.py-p.y,y=Math.hypot(m,d);if(y>p.start+p.dlugosc*.95||y<p.start+.4)continue;const z=ft(Math.atan2(d,m),p.kat)/(p.rozwarcie/2),v=Gt(z,y,p.dlugosc,p.start)*p.sila*.75;if(v<.12||Nt(k,-m,-d)<=0)continue;let g=0;for(let K=1;K<k.v.length;K++)H[K].waga>H[g].waga&&(g=K);const S=H[g];if(Wt(S,k,g+3,p.dlugosc*.9,Math.min(1,.35+v),L),Math.abs(L.znak)<.6)continue;const w=h();if(w.x=k.px+S.ox-Math.cos(S.kat)*L.start,w.y=k.py+S.oy-Math.sin(S.kat)*L.start,w.kat=S.kat,w.rozwarcie=L.rozw,w.dlugosc=L.dlugosc,w.start=L.start,w.skos=L.skos,w.sila=v,w.znak=L.znak>=0?1:-1,w.zi=k.faza+1,w.zrodlo=k,w.wtorny=!0,k.oswietlenie=Math.max(k.oswietlenie,v*.8),a.push(w),a.length>=gt)break}}}natezenie(t,e,i=1){let a=0;for(const o of this.wachlarze){const s=t-o.x,n=e-o.y,l=Math.hypot(s,n);l>o.start+o.dlugosc*1.4*i||(a+=Gt(ft(Math.atan2(n,s),o.kat)/(o.rozwarcie/2*i),l,o.dlugosc*i,o.start/i)*o.sila)}return a}}const jt=6,pt=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]}],Et=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca"];function pe(r,t,e){const i=it(r.ziarno,7717,t),a=t*Y,o={drobinki:[],slady:[],fresk:Vt(r,t)};for(let s=0;s<3;s++){const n=a+(s+i())*Y/3,l=r.ziemia(n),u=Math.min(r.granicaLotu(n)-.8,l+8.5);o.drobinki.push({id:`d${t}:${s}`,x:n,y:l+.9+i()*Math.max(.5,u-l-.9),faza:i()*6.283})}return e.forEach((s,n)=>{if(!(i()>.42))for(let l=0;l<6;l++){const u=i()*6.283,h=1.5+i()*1.1,c=s.x+Math.cos(u)*h,f=s.y+Math.sin(u)*h*.85;if(f>r.ziemia(c)+.7&&f<r.granicaLotu(c)-.5){o.slady.push({id:`s${t}:${n}`,x:c,y:f,kraina:r.krainaW(c),wariant:Math.floor(i()*jt),faza:i()*6.283,odsloniecie:0});break}}}),o}class me{constructor(t,e,i){this.swiat=t,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.zdarzenie=null,e.naNowyKawalek=(a,o)=>this.kawalki.set(a,pe(t,a,o)),this._odlamki=e}krok(t,e,i,a){this.drobinki.length=0,this.slady.length=0,this.freski.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const l of s.drobinki){if(this.zebrane.has(l.id))continue;l.px=l.x+Math.sin(a*.7+l.faza)*.3,l.py=l.y+Math.cos(a*.9+l.faza)*.25;const u=Math.hypot(e.x-l.px,e.y-l.py);if(u<2.2&&u>.001){const h=(1-u/2.2)*2.4*t;l.x+=(e.x-l.px)*h,l.y+=(e.y-l.py)*h}if(u<.5){this.zebrane.add(l.id),e.energia=Math.min(1,e.energia+.17),e.tracnij(4),this.efekty.push({x:l.px,y:l.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",l);continue}this.drobinki.push(l)}for(const l of s.slady){if(this.zebrane.has(l.id))continue;const u=i.natezenie(l.x,l.y,1.3),h=l.odsloniecie;if(l.odsloniecie=Math.max(0,Math.min(1,l.odsloniecie+(u>.05?t*(.9+u*2):-t*.015))),h<.6&&l.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",l),l.odsloniecie>=.6&&Math.hypot(e.x-l.x,e.y-l.y)<.75){this.zebrane.add(l.id);const c=this.kolekcja.dodajSlad(l.kraina,l.wariant);e.energia=Math.min(1,e.energia+.12),e.tracnij(3),this.efekty.push({x:l.x,y:l.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...l,nowy:c});continue}l.odsloniecie>.005&&this.slady.push(l)}const n=s.fresk;if(n){if(!n.odkryty&&this.kolekcja.maFresk(n.kraina)&&this.zebrane.has(n.id)&&(n.odkryty=!0),!n.odkryty){let l=0;for(let u=-2;u<=2;u++)l+=i.natezenie(n.x+u*.9,n.y+u%2*.5,1.3);if(l/=5,n.odsloniecie=Math.max(0,Math.min(1,n.odsloniecie+(l>.06?t*(.12+l*.5):-t*.01))),n.odsloniecie>=1){n.odkryty=!0,this.zebrane.add(n.id);const u=this.kolekcja.dodajFresk(n.kraina);e.energia=1,this.efekty.push({x:n.x,y:n.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...n,nowy:u})}}this.freski.push(n)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=t,s.t>1.6&&this.efekty.splice(o,1)}}}const Zt="iskierka-kolekcja-v1";class de{constructor(t=ze()){this.pamiec=t,this.slady={},this.freski={};try{const e=JSON.parse(t?.getItem(Zt)||"null");e&&typeof e=="object"&&(this.slady=e.slady||{},this.freski=e.freski||{})}catch{}this.naZmiane=null}_zapisz(){try{this.pamiec?.setItem(Zt,JSON.stringify({slady:this.slady,freski:this.freski}))}catch{}this.naZmiane?.()}dodajSlad(t,e){const i=`${t}-${e}`,a=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),a}dodajFresk(t){const e=!this.freski[t];return this.freski[t]=!0,this._zapisz(),e}maSlad(t,e){return!!this.slady[`${t}-${e}`]}maFresk(t){return!!this.freski[t]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return pt.length*jt}wszystkichFreskow(){return Et.length}wyczysc(){this.slady={},this.freski={},this._zapisz()}}function ze(){try{return window.localStorage}catch{return null}}class we{constructor(t){this.kolekcja=t;const e=this.el=document.createElement("div");e.className="hud",e.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(e),this.slady=e.querySelector("#hud-slady"),this.en=e.querySelector("#hud-en"),this.krainaEl=e.querySelector("#hud-kraina"),this.wiescEl=e.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(t){const e=Math.round(t*100);e!==this._enPoprz&&(this._enPoprz=e,this.en.style.width=e+"%")}ustawKraine(t){if(t===this.kraina)return;const e=this.kraina<0;this.kraina=t,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=C[t].nazwa,this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},e?300:900)}wiesc(t){clearTimeout(this._tw),this.wiescEl.textContent=t,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const qt=[{akord:[73.42,110,174.61,329.63],filtr:620,wiatr:.1,wiatrHz:500,skala:[293.66,349.23,440,523.25,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]}],ye=[.6,.9,1,.85,.65];class ve{constructor(){this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(E),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const t=window.AudioContext||window.webkitAudioContext,e=this.ac=new t;this.wyjscie=e.createGain(),this.wyjscie.gain.value=0,this.analizator=e.createAnalyser(),this.analizator.fftSize=1024;const i=e.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(e.destination),this.poglos=e.createGain(),this.poglos.gain.value=.3;for(const[l,u]of[[.37,.52],[.53,.46]]){const h=e.createDelay(1.5);h.delayTime.value=l;const c=e.createBiquadFilter();c.type="lowpass",c.frequency.value=1900;const f=e.createGain();f.gain.value=u,this.poglos.connect(h),h.connect(c),c.connect(f),f.connect(h),c.connect(this.wyjscie)}const a=e.sampleRate*3,o=e.createBuffer(1,a,e.sampleRate),s=o.getChannelData(0);let n=0;for(let l=0;l<a;l++)n=n*.97+(Math.random()*2-1)*.03,s[l]=n*6;this.szum=e.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start(),this.tla=qt.map(l=>{const u=e.createGain();u.gain.value=0;const h=e.createBiquadFilter();h.type="lowpass",h.frequency.value=l.filtr,h.Q.value=.4,h.connect(u),u.connect(this.wyjscie),u.connect(this.poglos),l.akord.forEach((m,d)=>{for(const y of[-5,6]){const z=e.createOscillator();z.type=d%2?"triangle":"sine",z.frequency.value=m,z.detune.value=y+d;const v=e.createGain();v.gain.value=.034/(1+d*.35);const _=e.createOscillator();_.frequency.value=.03+.017*d+(y>0?.011:0);const g=e.createGain();g.gain.value=v.gain.value*.6,_.connect(g),g.connect(v.gain),_.start(),z.connect(v),v.connect(h),z.start()}});const c=e.createBiquadFilter();c.type="bandpass",c.frequency.value=l.wiatrHz,c.Q.value=.7;const f=e.createGain();f.gain.value=l.wiatr*.45;const p=e.createOscillator();p.frequency.value=.07;const k=e.createGain();return k.gain.value=l.wiatr*.2,p.connect(k),k.connect(f.gain),p.start(),this.szum.connect(c),c.connect(f),f.connect(u),u})}async przelacz(t=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=t,t&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(t?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(t){this.glosnosc=t,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(t,this.ac.currentTime,.2)}aktualizuj(t,e){if(this.wagi.set(e),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=t,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<E;i++)this.tla[i].gain.setTargetAtTime(e[i]*ye[i],this.ac.currentTime,1.6)}}_krainaDominujaca(){let t=0;for(let e=1;e<E;e++)this.wagi[e]>this.wagi[t]&&(t=e);return t}_dzwonek(t,e,i=0,a=2.6,o="sine"){const s=this.ac,n=s.currentTime+i,l=s.createOscillator(),u=s.createOscillator(),h=s.createGain(),c=s.createGain();l.type=o,l.frequency.value=t,u.type="sine",u.frequency.value=t*2.01,c.gain.value=.18,h.gain.setValueAtTime(0,n),h.gain.linearRampToValueAtTime(e,n+.02),h.gain.exponentialRampToValueAtTime(4e-4,n+a),l.connect(h),u.connect(c),c.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),l.start(n),u.start(n),l.stop(n+a+.1),u.stop(n+a+.1)}zdarzenie(t,e){if(t in this.licznik&&this.licznik[t]++,!this.ac||!this.wlaczony)return;const i=qt[e&&e.kraina!=null?e.kraina:this._krainaDominujaca()].skala;if(t==="szklo"){const a=this.ac.currentTime;if(a-this._ostSzklo<.35)return;this._ostSzklo=a;const o=i[Math.abs(Math.floor(e.faza*97))%i.length]*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else t==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):t==="odsloniecie"?[0,2,4].forEach((a,o)=>this._dzwonek(i[a],.04,o*.16,2.8)):t==="slad"?[0,1,2,3,4].forEach((a,o)=>this._dzwonek(i[a]*(o===4?2:1),.05,o*.13,3.2)):t==="fresk"&&[0,2,4,1,3].forEach((a,o)=>{this._dzwonek(i[a]/2,.06,o*.4,6),this._dzwonek(i[a]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const t=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(t);let e=0;for(const i of t)e+=i*i;return Math.sqrt(e/t.length)}}const st=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],xe=2.5;class be{constructor(t){this.auto=!0,this.poziom=1,this.naZmiane=t,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return st[this.poziom]}ustaw(t){t==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(st.length-1,t|0))))}_zmien(t){t!==this.poziom&&(this.poziom=t,this.naZmiane(st[t])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(t,e){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=e;return}if(this._blokada=Math.max(0,this._blokada-e),this._ms.push(t),this._czas+=e,this._czas<xe)return;let i=0,a=0;for(const s of this._ms)s<120&&(i+=s,a++);const o=a?i/a:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<st.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const Jt="iskierka-ustawienia-v1",P=(r,t,e)=>{const i=document.createElement(r);return t&&(i.className=t),e!=null&&(i.textContent=e),i};function ge(){try{const r=JSON.parse(localStorage.getItem(Jt)||"null");if(r&&typeof r=="object")return{jakosc:"auto",glosnosc:.75,...r}}catch{}return{jakosc:"auto",glosnosc:.75}}function Se(r){try{localStorage.setItem(Jt,JSON.stringify(r))}catch{}}class _e{constructor(t){this.gra=t,this.otwarte=!1,this.ustawienia=ge();const e=document.getElementById("nakladka");this.tytul=P("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',e.appendChild(this.tytul);const i=this.rzad=P("div","rzad-przyciskow");this.bDzwiek=P("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await t.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=P("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),e.appendChild(i),this._opiszDzwiek(),this.obrot=P("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),e.appendChild(this.obrot),this.panel=P("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const a=P("div","okno"),o=P("div","okno-naglowek");o.appendChild(P("h2",null,"Pauza"));const s=P("div","zakladki");this.zakladki={};for(const[n,l]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const u=P("button","zakladka",l);u.type="button",u.onclick=()=>this._pokaz(n),s.appendChild(u),this.zakladki[n]=u}o.appendChild(s),this.bWroc=P("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=P("div","okno-tresc"),a.append(o,this.tresc),this.panel.appendChild(a),this.panel.addEventListener("pointerdown",n=>{n.target===this.panel&&this.przelacz(!1)}),e.appendChild(this.panel),addEventListener("keydown",n=>{n.key==="Escape"||n.key.toLowerCase()==="p"&&!this._wPolu(n)?(n.preventDefault(),this.przelacz()):n.key.toLowerCase()==="m"&&!this._wPolu(n)?this.bDzwiek.click():n.key.toLowerCase()==="f"&&!this._wPolu(n)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&t.sterowanie.poruszono&&this.przelacz(!0)}),t.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(t){const e=t.target;return e&&(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA")}_opiszDzwiek(){const t=this.gra.dzwiek;if(!t.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=t.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(t.wlaczony))}_zastosuj(){const t=this.ustawienia,e=this.gra;e.jakosc.ustaw(t.jakosc==="auto"?"auto":Number(t.jakosc)),e.dzwiek.ustawGlosnosc(t.glosnosc)}przelacz(t=!this.otwarte){t!==this.otwarte&&(this.otwarte=t,this.panel.hidden=!t,this.gra.petla.pauza=t,this.gra.petla.zamrozona=t,this.rzad.classList.toggle("schowany",t),t?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(t){this._zakladka=t;for(const[e,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",e===t);this.tresc.replaceChildren(t==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(t,e){const i=t+"-"+e;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(t,e)),this._miniatury.get(i)}_kolekcja(){const t=this.gra.kolekcja,e=P("div","kolekcja");return e.appendChild(P("p","kolekcja-stan",`Ślady: ${t.ileSladow()} z ${t.wszystkichSladow()} · freski: ${t.ileFreskow()} z ${t.wszystkichFreskow()}`)),C.forEach((i,a)=>{const o=P("section","kolekcja-kraina");o.appendChild(P("h3",null,`${i.nazwa} · ${pt[a].rodzaj.toLowerCase()}`));const s=P("div","siatka");for(let l=0;l<jt;l++){const u=t.maSlad(a,l),h=P("figure","kafel"+(u?" znaleziony":""));if(u){const c=new Image;c.src=this._miniatura(a,l),c.alt="",h.appendChild(c)}else h.appendChild(P("div","nieznany","?"));h.appendChild(P("figcaption",null,u?pt[a].nazwy[l]:"jeszcze w ciemności")),s.appendChild(h)}const n=P("p","fresk"+(t.maFresk(a)?" znaleziony":""),t.maFresk(a)?"✦ "+Et[a]:"Fresk tej krainy czeka na barwne światło.");o.append(s,n),e.appendChild(o)}),e}_ustawienia(){const t=this.ustawienia,e=this.gra,i=P("div","ustawienia"),a=(f,p,k)=>{const m=P("label","pole");return m.appendChild(P("span","pole-opis",f)),m.appendChild(p),k&&m.appendChild(P("span","pole-uwaga",k)),i.appendChild(m),p},o=()=>{Se(t),this._zastosuj()},s=P("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),st.forEach((f,p)=>s.appendChild(new Option(f.nazwa,String(p)))),s.value=String(t.jakosc),s.onchange=()=>{t.jakosc=s.value,o()},a("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const n=P("input");n.type="range",n.min="0",n.max="1",n.step="0.05",n.value=String(t.glosnosc),n.id="u-glosnosc",n.oninput=()=>{t.glosnosc=Number(n.value),o()},a("Głośność",n,e.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const l=P("div","rzad"),u=P("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");u.type="button",u.onclick=async()=>{await this.pelnyEkran(),u.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const h=P("button","przycisk","Nowy świat");h.type="button",h.onclick=()=>{rt("ziarno",Math.floor(Math.random()*1e6)),rt("kraina",null),rt("x",null),location.reload()};const c=P("button","przycisk","Wyczyść kolekcję");return c.type="button",c.onclick=()=>{c.dataset.pewne?(e.kolekcja.wyczysc(),c.textContent="Kolekcja wyczyszczona",c.disabled=!0):(c.dataset.pewne="1",c.textContent="Na pewno? Naciśnij jeszcze raz")},l.append(u,h,c),i.appendChild(l),i.appendChild(P("p","pole-uwaga",`Świat nr ${e.ziarno}. Ten sam numer w adresie (?ziarno=${e.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const Me=1080,N=document.getElementById("gra"),Pe=document.getElementById("nakladka");function Qt(r){const t=document.createElement("div");t.className="blad",t.textContent=r,Pe.appendChild(t)}function Ae(){const r=ta(N);if(!r){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),Qt("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const t=new oe(j.ziarno),e=new ae(r,t);Lt.includes(j.warstwa)&&(e.warstwa=j.warstwa);const i=new ba(j.ziarno);let a=null;const o=new ee(N),s=new At(t),n=new ke,l=new de,u=new me(t,s,l),h=new we(l);(j.test||j.warstwa==="maska")&&(h.el.style.visibility="hidden"),l.naZmiane=()=>h.odswiez();const c=new ve;n.naSzklo=x=>c.zdarzenie("szklo",x);const f=[(x,b)=>c.zdarzenie(x,b)],p=new Float32Array(C.length);u.zdarzenie=(x,b)=>{x==="slad"?h.wiesc(pt[b.kraina].nazwy[b.wariant]+(b.nowy?"":" (już w kolekcji)")):x==="fresk"&&h.wiesc(Et[b.kraina]);for(const I of f)I(x,b)};const k={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:tt*16/9,polY:tt};let m=1;const d=new be(x=>{e.jakosc=x,m=x.skala,y()});e.jakosc=d.ustawienia;function y(){const x=Math.min(window.devicePixelRatio||1,2),b=N.clientWidth||innerWidth,I=N.clientHeight||innerHeight;let F=Math.min(I*x,Me)*m,Z=F*b/I;Z=Math.max(320,Math.round(Z)),F=Math.max(180,Math.round(F)),(N.width!==Z||N.height!==F)&&(N.width=Z,N.height=F),k.polX=tt*Z/F,e.rozmiar(Z,F)}addEventListener("resize",y),y();function z(x){k.czas+=x,i.krok(x,a||o.odczyt(k),t);const b=1-Math.exp(-x*1.6);k.cam.x+=(i.x+i.vx*.5-k.cam.x)*b,k.cam.y+=(i.y+.6-k.cam.y)*b,v(),s.krok(x,k.cam,k.polX,k.czas),n.aktualizuj(x,i,s.widoczne),u.krok(x,i,n,k.czas),c.aktualizuj(x,t.wagi(i.x,p))}function v(){k.cam.y=Math.max(Math.max(t.ziemia(k.cam.x)+tt-1.9,4.7),Math.min(12.4,k.cam.y))}const _=()=>({cam:k.cam,polX:k.polX,polY:k.polY,czas:k.czas,iskra:i,tecze:n.ukryte?null:n,odlamki:s.widoczne,znaleziska:u});function g(x,b){b&&d.probka(b*1e3,b),i.zbudujSmuge(Q),h.energia(i.energia),h.ustawKraine(t.krainaW(i.x)),e.rysuj(_())}const S=new ea({krok:z,rysuj:g}),w={gotowe:!0,canvas:N,sterowanie:o,jakosc:d,stan:k,petla:S,renderer:e,swiat:t,odlamki:s,tecze:n,znaleziska:u,kolekcja:l,hud:h,sluchacze:f,dzwiek:c,ziarno:j.ziarno,bledy:[],teleporty:()=>t.teleporty(),teleport(x,b){i.przenies(x,b??t.ziemia(x)+4.5),k.cam.x=x,k.cam.y=i.y+.6,v()},przewin(x){S.przewin(x),g()},rysuj:g,pomiar:x=>e.pomiar(_(),x),ustawWejscie(x){a=x},krainy:C,opisJakosci:()=>`jakość ${d.auto?"auto: ":""}${d.ustawienia.nazwa}`,info(){return{renderer:r.getParameter(r.RENDERER),w:N.width,h:N.height,fps:S.fps,hdr:r.ext.floatBuf}}};if(window.iskierka=w,j.kraina){const x=t.teleporty().find(b=>b.nazwa===j.kraina);x&&w.teleport(x.x+j.dx,t.ziemia(x.x+j.dx)+4.5+j.dy)}else j.x!=null?w.teleport(j.x):w.teleport(8);const K=w.menu=new _e(w);j.jakosc!=null&&d.ustaw(j.jakosc==="auto"?"auto":Number(j.jakosc)),j.debug&&ie(w),j.test&&(S.pauza=!0,j.jakosc==null&&d.ustaw(1),K.tytul.style.display="none",K.rzad.style.visibility="hidden",K.obrot.style.visibility="hidden"),S.start()}addEventListener("error",r=>{(window.__bledy||(window.__bledy=[])).push(String(r.message))});try{Ae()}catch(r){console.error(r),(window.__bledy||(window.__bledy=[])).push(String(r.message)),Qt("Nie udało się uruchomić gry: "+r.message)}
