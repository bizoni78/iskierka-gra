(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function Nt(c){const a=c.getContext("webgl2",{antialias:!1,alpha:!1,depth:!1,stencil:!1,powerPreference:"high-performance",preserveDrawingBuffer:!1});if(!a)return null;const t={floatBuf:!!a.getExtension("EXT_color_buffer_float"),halfBuf:!!a.getExtension("EXT_color_buffer_half_float")};return a.ext=t,a.bezFloat=new URLSearchParams(location.search).has("rgba8"),a.domyslnyVAO=a.createVertexArray(),a.bindVertexArray(a.domyslnyVAO),a}function pt(c,a,t,i){const e=c.createShader(a);if(c.shaderSource(e,t),c.compileShader(e),!c.getShaderParameter(e,c.COMPILE_STATUS)){const o=c.getShaderInfoLog(e),s=t.split(`
`).map((n,r)=>`${r+1}: ${n}`).join(`
`);throw console.error(s),new Error(`Shader "${i}" się nie skompilował: ${o}`)}return e}const J=`#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;class T{constructor(a,t,i,e="program"){this.gl=a,this.nazwa=e;const o=a.createProgram();if(a.attachShader(o,pt(a,a.VERTEX_SHADER,t,e+".vs")),a.attachShader(o,pt(a,a.FRAGMENT_SHADER,i,e+".fs")),a.linkProgram(o),!a.getProgramParameter(o,a.LINK_STATUS))throw new Error(`Program "${e}" się nie zlinkował: ${a.getProgramInfoLog(o)}`);this.p=o,this.u={};const s=a.getProgramParameter(o,a.ACTIVE_UNIFORMS);for(let n=0;n<s;n++){const r=a.getActiveUniform(o,n),h=r.name.replace(/\[0\]$/,"");this.u[h]=a.getUniformLocation(o,r.name)}}uzyj(){return this.gl.useProgram(this.p),this}f(a,t,i,e,o){const s=this.gl,n=this.u[a];return n==null?this:(o!==void 0?s.uniform4f(n,t,i,e,o):e!==void 0?s.uniform3f(n,t,i,e):i!==void 0?s.uniform2f(n,t,i):s.uniform1f(n,t),this)}i(a,t){const i=this.u[a];return i!=null&&this.gl.uniform1i(i,t),this}fv(a,t,i){const e=this.gl,o=this.u[a];return o==null?this:(t===1?e.uniform1fv(o,i):t===2?e.uniform2fv(o,i):t===3?e.uniform3fv(o,i):e.uniform4fv(o,i),this)}tex(a,t,i){const e=this.gl,o=this.u[a];return o==null?this:(e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(o,t),this)}}function qa(c,a,t,i={}){const{wewn:e=c.RGBA8,format:o=c.RGBA,typ:s=c.UNSIGNED_BYTE,dane:n=null,filtr:r=c.LINEAR,zawijanieS:h=c.CLAMP_TO_EDGE,zawijanieT:l=c.CLAMP_TO_EDGE,mipmapy:u=!1}=i,f=c.createTexture();return c.bindTexture(c.TEXTURE_2D,f),c.texImage2D(c.TEXTURE_2D,0,e,a,t,0,o,s,n),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,u?c.LINEAR_MIPMAP_LINEAR:r),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,r),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,h),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,l),u&&c.generateMipmap(c.TEXTURE_2D),f}function Zt(c,a=!1){return c.ext.floatBuf&&!c.bezFloat?a?{wewn:c.RGBA16F,format:c.RGBA,typ:c.HALF_FLOAT}:{wewn:c.R11F_G11F_B10F,format:c.RGB,typ:c.HALF_FLOAT}:{wewn:c.RGBA8,format:c.RGBA,typ:c.UNSIGNED_BYTE}}class ia{constructor(a,t,i,e,o={}){this.gl=a,this.formaty=Array.isArray(e)?e:[e],this.opcje=o,this.fbo=a.createFramebuffer(),this.tex=[],this.w=0,this.h=0,this.rozmiar(t,i)}rozmiar(a,t){if(a=Math.max(1,Math.round(a)),t=Math.max(1,Math.round(t)),a===this.w&&t===this.h)return;const i=this.gl;this.w=a,this.h=t;for(const o of this.tex)i.deleteTexture(o);this.tex=this.formaty.map(o=>qa(i,a,t,{...o,...this.opcje})),i.bindFramebuffer(i.FRAMEBUFFER,this.fbo),this.tex.forEach((o,s)=>i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+s,i.TEXTURE_2D,o,0)),i.drawBuffers(this.tex.map((o,s)=>i.COLOR_ATTACHMENT0+s));const e=i.checkFramebufferStatus(i.FRAMEBUFFER);if(e!==i.FRAMEBUFFER_COMPLETE)throw new Error("Niekompletny bufor ramki: 0x"+e.toString(16));i.bindFramebuffer(i.FRAMEBUFFER,null)}ustaw(){const a=this.gl;a.bindFramebuffer(a.FRAMEBUFFER,this.fbo),a.viewport(0,0,this.w,this.h)}}function kt(c,a,t){c.bindFramebuffer(c.FRAMEBUFFER,null),c.viewport(0,0,a,t)}function ta(c){c.drawArrays(c.TRIANGLES,0,3)}const pa=1/120;class Wt{constructor({krok:a,rysuj:t}){this.krok=a,this.rysuj=t,this.zapas=0,this.ostatni=0,this.dziala=!1,this.pauza=!1,this.zamrozona=!1,this.fps=60,this.msKlatki=16.7,this._klatki=0,this._okno=0,this.historiaMs=[],this._tik=this._tik.bind(this)}start(){this.dziala||(this.dziala=!0,this.ostatni=performance.now(),requestAnimationFrame(this._tik))}stop(){this.dziala=!1}_tik(a){if(!this.dziala)return;const t=(a-this.ostatni)/1e3;this.ostatni=a;const i=Math.min(t,.1);if(!this.pauza){this.zapas+=i;let e=0;for(;this.zapas>=pa&&e<16;)this.krok(pa),this.zapas-=pa,e++;e===16&&(this.zapas=0)}if(this.zamrozona){requestAnimationFrame(this._tik);return}this.rysuj(this.zapas/pa,t),this._klatki++,this._okno+=t,this.historiaMs.push(t*1e3),this.historiaMs.length>240&&this.historiaMs.shift(),this._okno>=.5&&(this.fps=this._klatki/this._okno,this.msKlatki=1e3/this.fps,this._klatki=0,this._okno=0),requestAnimationFrame(this._tik)}przewin(a){const t=Math.round(a/pa);for(let i=0;i<t;i++)this.krok(pa)}}const sa=new URLSearchParams(location.search),Aa=(c,a)=>{const t=parseFloat(sa.get(c));return Number.isFinite(t)?t:a},O={ziarno:Math.floor(Aa("ziarno",1)),maZiarno:sa.has("ziarno"),kraina:sa.get("kraina"),x:sa.has("x")?Aa("x",0):null,dy:Aa("dy",0),dx:Aa("dx",0),debug:sa.has("debug"),test:sa.has("test"),warstwa:sa.get("warstwa")||"wszystko",jakosc:sa.get("jakosc"),maska:sa.has("maska")};function Ma(c,a){const t=new URL(location.href);a==null?t.searchParams.delete(c):t.searchParams.set(c,a),history.replaceState(null,"",t)}function ut(c){return()=>{c|=0,c=c+1831565813|0;let a=Math.imul(c^c>>>15,1|c);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function ha(c,a=0,t=0){let i=Math.imul(c|0,668265261)^Math.imul(a|0,374761393)^Math.imul(t|0,2654435761)|0;return i^=i>>>15,i=Math.imul(i,2246822507),i^=i>>>13,i=Math.imul(i,3266489909),i^=i>>>16,(i>>>0)/4294967296}function aa(c,a=0,t=0){return ut(ha(c,a,t)*4294967296|0)}const Gt=c=>c*c*(3-2*c);function qt(c,a=0){const t=Math.floor(c),i=c-t;return ha(t,a)+(ha(t+1,a)-ha(t,a))*Gt(i)}function K(c,a=0,t=4){let i=0,e=.5,o=0;for(let s=0;s<t;s++)i+=e*qt(c,a+s*17),o+=e,c*=2.03,e*=.5;return i/o}const Yt=(c,a,t)=>Math.max(a,Math.min(t,c)),ra=(c,a,t)=>{const i=Yt((t-c)/(a-c),0,1);return i*i*(3-2*i)};function Xt(c,a,t){const i=new Float32Array(a*a);for(let s=0;s<i.length;s++)i[s]=ha(s,t,a);const e=new Float32Array(c*c),o=a/c;for(let s=0;s<c;s++){const n=s*o,r=Math.floor(n);let h=n-r;h=h*h*(3-2*h);const l=r%a*a,u=(r+1)%a*a;for(let f=0;f<c;f++){const d=f*o,z=Math.floor(d);let m=d-z;m=m*m*(3-2*m);const v=z%a,k=(z+1)%a,w=i[l+v],y=i[l+k],x=i[u+v],b=i[u+k];e[s*c+f]=w+(y-w)*m+(x+(b-x)*m-w-(y-w)*m)*h}}return e}function Xa(c,a,t,i){const e=new Float32Array(c*c);let o=.5,s=0;for(let n=0;n<t;n++){const r=a<<n;if(r>c)break;const h=Xt(c,r,i+n*101);for(let l=0;l<e.length;l++)e[l]+=h[l]*o;s+=o,o*=.5}for(let n=0;n<e.length;n++)e[n]/=s;return e}function Vt(c,a=256){const t=Xa(a,4,5,11),i=Xa(a,4,5,57),e=Xa(a,16,4,93),o=new Uint8Array(a*a*4);for(let s=0;s<a*a;s++)o[s*4]=t[s]*255,o[s*4+1]=i[s]*255,o[s*4+2]=e[s]*255,o[s*4+3]=ha(s,7)*255;return qa(c,a,a,{dane:o,zawijanieS:c.REPEAT,zawijanieT:c.REPEAT,mipmapy:!0})}const B=`#version 300 es
precision highp float;
precision highp sampler2D;
`,wa=`
uniform vec2 uCam;
uniform vec2 uPol;
uniform vec2 uRes;
uniform float uCzas;
uniform sampler2D uSzum;
vec2 swiatZUv(vec2 uv){ return uCam + (uv * 2.0 - 1.0) * uPol; }
float kleby(vec2 p){ return texture(uSzum, p).r; }
float kleby2(vec2 p){ return texture(uSzum, p).g; }
float faktura(vec2 p){ return texture(uSzum, p).b; }
`,Ut=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){ o = vec4(texture(uTex, vUv).rgb, 1.0); }`,$t=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uPx;
void main(){
  vec3 s = texture(uTex, vUv).rgb * 4.0;
  s += texture(uTex, vUv + uPx * vec2(-1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1, -1)).rgb;
  s += texture(uTex, vUv + uPx * vec2(-1,  1)).rgb;
  s += texture(uTex, vUv + uPx * vec2( 1,  1)).rgb;
  o = vec4(s / 8.0, 1.0);
}`,Ht=B+`
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
}`,Jt=B+`
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
}`,ya=`
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
}`,_a=16,Qt=.3;class ae{constructor(){this.dane=new Float32Array(_a*4),this.nr=0,this.ox=null,this.oy=0,this.wyslanych=0,this.wyczysc()}wyczysc(){for(let a=0;a<_a;a++)this.dane[a*4+2]=0,this.dane[a*4+3]=-100;this.ox=null}krok(a,t){if(this.ox===null){this.ox=a.x,this.oy=a.y;return}const i=a.x-this.ox,e=a.y-this.oy,o=Math.hypot(i,e);if(o>3){this.wyczysc();return}if(o<Qt)return;const s=this.nr*4;this.dane[s]=a.x-i*.5,this.dane[s+1]=a.y-e*.5,this.dane[s+2]=Math.max(-1.3,Math.min(1.3,a.vx/3)),this.dane[s+3]=t,this.nr=(this.nr+1)%_a,this.wyslanych++,this.ox=a.x,this.oy=a.y}}const te=B+wa+`
in vec2 vUv; out vec4 o;
uniform vec3 uGora, uDol, uMgla, uMgla2;
uniform vec4 uNiebo;     // tarcza księżyca, czarne słońce z obręczą, zorza, gwiazdy
uniform vec2 uCialo;     // położenie ciała niebieskiego na ekranie
uniform float uPoswiata;
uniform vec2 uZjawiska;   // zaćmienie księżyca (0..1), dodatkowe gwiazdy
uniform vec4 uBurza;      // siła burzy, błysk (0..1), położenie pioruna na ekranie, ziarno jego kształtu
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
  // zaćmienie: ciemna tarcza nasuwa się z boku na księżyc; gdy go zakryje, zostaje blada obręcz
  float zc = uZjawiska.x;
  float zakryte = zc > 0.001 ? smoothstep(0.29, 0.24, length(d - vec2(0.70, 0.12) * (1.0 - zc))) : 0.0;
  col += uNiebo.x * vec3(0.72, 0.85, 1.0) * (smoothstep(0.27, 0.19, r) * 0.20 * (0.7 + 0.6 * k2) * (1.0 - zakryte) + 0.15 * exp(-r * 2.1) * (1.0 - 0.75 * zc));
  if (zc > 0.001) {
    float calk = smoothstep(0.8, 1.0, zc);
    float ob = exp(-abs(r - 0.265) * 26.0) * (0.55 + 0.9 * kleby(vec2(atan(d.y, d.x) * 0.22, uCzas * 0.01)));
    col += uNiebo.x * vec3(0.80, 0.88, 1.0) * (ob * 0.5 + 0.08 * exp(-max(r - 0.27, 0.0) * 3.0)) * calk;
  }
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
  col += (uNiebo.w + uZjawiska.y) * gw * 0.34 * smoothstep(0.0, 0.5, t) * (1.0 - k1 * 0.8) * (1.0 - 0.9 * uBurza.x);
  // burza: ciężkie chmury, a w błysku łuna za chmurami i sam piorun
  if (uBurza.x > 0.001) {
    float chm = kleby(vec2(s.x * 0.09 + uCam.x * 0.002 + uCzas * 0.004, s.y * 0.2 + 0.7));
    col *= 1.0 - uBurza.x * 0.45 * smoothstep(0.3, 0.75, chm) * smoothstep(-0.1, 0.5, t);
    if (uBurza.y > 0.003) {
      float odl = abs(s.x - uBurza.z);
      col += vec3(0.72, 0.80, 1.0) * uBurza.y * (0.05 + 0.34 * exp(-odl * 1.1)) * (0.35 + 1.1 * chm) * smoothstep(-0.3, 0.4, t);
      float bx = uBurza.z + (kleby(vec2(s.y * 0.23 + uBurza.w, uBurza.w * 0.37)) - 0.5) * 0.9 + (kleby2(vec2(s.y * 1.3 + uBurza.w, 0.3)) - 0.5) * 0.16;
      float piorun = exp(-abs(s.x - bx) * 150.0) + 0.12 * exp(-abs(s.x - bx) * 14.0);
      col += vec3(0.85, 0.90, 1.0) * piorun * uBurza.y * 2.4 * smoothstep(0.0, 0.12, t);
    }
  }
  o = vec4(col, 1.0);
}`,Lt=`
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
uniform vec4 uPogoda;        // wiatr, snopy światła, mglistość, rozpraszanie światła w opadzie
uniform float uSnieg;        // pokrywa śnieżna (0..1)
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
`,ee=B+wa+Lt+`
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
  // śnieg: jasne czapy na wszystkim, co zwrócone ku górze
  if (uSnieg > 0.01) c += vec3(0.80, 0.87, 1.0) * mg * uJasnosc * pok * smoothstep(0.1, 0.7, n.y) * uSnieg * 3.2 * (1.0 - zam * 0.6);
  // światło iskierki i tęcz
  float blask = 0.0; vec3 tecza = vec3(0.0);
  if (uAtm.w > 0.001) {
    vec2 Ld; float R; blask = krag(pw, Ld, R);
    tecza = texture(uSwiatlo, vUv).rgb;
    c += t.rgb * (uBarwaSw * blask * 1.5 + tecza * 1.6) * uAtm.w * (0.75 + 1.3 * max(dot(n, Ld), 0.0));
  }
  // płachta mgły przed poprzednią warstwą, a za tą; snopy światła z góry
  float gest = clamp(uAtm.y * uPogoda.z * (0.12 + 0.88 * przyZiemi) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = barwaMgly * 1.1 + (mg * blask * 0.20 + tecza * (0.25 + 0.5 * m1)) * uAtm.w * (1.0 + 1.6 * uPogoda.w);
  vec3 dodane = vec3(0.0);
  if (uPogoda.y > 0.01) {
    float sn = kleby(vec2((pl.x + pl.y * 0.38) * 0.045 / uLz + uCzas * 0.0015, 0.37 + uLz * 0.3));
    dodane = mix(mg, vec3(1.0), 0.25) * smoothstep(0.50, 0.72, sn) * smoothstep(-1.5, 6.0, wys) * uPogoda.y * uJasnosc * 0.55 * (0.5 + m2);
  }
  o = vec4(mglaC * gest * (1.0 - pok) + dodane * (1.0 - pok * 0.7) + c, 1.0 - (1.0 - gest) * (1.0 - pok));
}`,ie=B+wa+`
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
}`,oe=B+wa+Lt+`
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
  // śnieg: biała pokrywa na powierzchniach zwróconych ku górze — odbija blask iskierki i barwy tęcz
  float czapa = uSnieg * smoothstep(0.12, 0.7, n.y);
  vec3 alb = mix(t.rgb, vec3(0.82, 0.88, 0.98) * pok, czapa);
  vec3 c = alb * uBarwaSw * blask * (0.30 + 1.5 * lam + 1.0 * rant);
  c += alb * tecza * (0.9 + 1.2 * lam);
  c += alb * mg * (uAtm.z * 0.1 + czapa * 0.22);
  c += (t.rgb / max(pok, 0.02)) * uEmis * t2.b * (0.7 + 0.3 * sin(uCzas * 0.7 + pw.x * 0.6));

  float grunt = mix(uGruntY.x, uGruntY.y, vUv.x);
  float wys = pw.y - grunt;
  vec2 mm = texture(uSzum, pw * 0.06 + vec2(uCzas * 0.006, -uCzas * 0.003)).rg;
  float m1 = mm.r, m2 = mm.g;
  float gest = clamp(uAtm.y * uPogoda.z * (0.10 + 0.9 * exp(-max(wys, 0.0) / 2.4)) * (0.2 + 2.0 * m1 * m2), 0.0, 0.8);
  vec3 mglaC = mg * (0.05 + 0.03 * m2) + mg * blask * (0.30 + 0.5 * m1) + tecza * (0.3 + 0.6 * m1);
  // samo powietrze też lekko świeci wokół iskierki
  // w deszczu i śniegu samo powietrze rozprasza światło: krąg iskierki i tęcze stają się gęstsze
  vec3 powietrze = (mg * blask * 0.085 * (0.5 + m1) + tecza * (0.34 + 0.26 * m1)) * (1.0 + 1.7 * uPogoda.w);
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
}`,Rt=6,se=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, grubość, faza, rodzaj (0 trawa, 1 liana, 2 trzcina)
layout(location = 2) in vec4 aKol;     // barwa, podatność na wiatr
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
uniform vec4 uPodmuchy[${_a}];
out vec2 vSw; out float vV; out vec3 vKol; out float vT;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${Rt});
  float wisi = aPar.w > 0.5 && aPar.w < 1.5 ? -1.0 : 1.0;
  float wiatr = (sin(uCzas * 1.3 + aPar.z + aBaza.x * 0.4) * 0.22 + sin(uCzas * 0.47 + aBaza.x * 0.13) * 0.34 + 0.12) * aKol.a;
  // Źdźbła kładą się za przelatującą iskierką: każdy zapisany podmuch działa jak pchnięcie
  // tłumionej sprężyny (wychylenie zgodne z lotem, powrót, lekkie przejście na drugą stronę).
  vec2 sr = aBaza + vec2(0.0, wisi * aPar.x * 0.6);
  float omega = 7.0 + 3.0 * fract(aPar.z * 1.61), pchniecie = 0.0;
  for (int k = 0; k < ${_a}; k++) {
    vec4 q = uPodmuchy[k];
    float wiek = max(0.0, uCzas - q.w);
    vec2 dq = sr - q.xy;
    pchniecie += q.z * exp(-dot(dq, dq) / 0.7) * exp(-wiek * 2.3) * sin(wiek * omega);
  }
  // sama obecność iskierki lekko rozchyla źdźbła na boki (płynnie, bez przeskoku nad źdźbłem)
  vec2 od = sr - uIskra.xy;
  pchniecie = clamp(pchniecie * 0.6 * aKol.a, -1.25, 1.25) + od.x * exp(-dot(od, od) / 0.5) * 0.5;
  float kat = (aPar.z - 3.14) * 0.09 + wiatr + pchniecie;
  float a = kat * t;
  vec2 kier = vec2(sin(a), wisi * cos(a));
  vec2 p = aBaza + kier * aPar.x * t;
  float gr = aPar.y * (1.0 - 0.8 * t);
  if (aPar.w > 1.5) gr += aPar.y * 2.2 * smoothstep(0.62, 0.74, t) * smoothstep(0.98, 0.88, t);   // pałka trzciny
  p += vec2(kier.y, -kier.x) * bok * gr;
  vSw = p; vV = bok; vKol = aKol.rgb; vT = t;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,ne=B+`
in vec2 vSw; in float vV; in vec3 vKol; in float vT; out vec4 o;
uniform vec3 uIskra, uBarwaSw; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  float a = smoothstep(1.0, 0.25, abs(vV)) * smoothstep(1.02, 0.9, vT);
  vec2 L = uIskra.xy - vSw; float r = length(L) / uIskra.z;
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = vKol * (uBarwaSw * blask * (0.5 + 0.6 * vT) + tecza * 1.3 + 0.004);
  o = vec4(c * a, a);
}`,re=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas;
uniform float uWL[6]; uniform float uWP[6];
uniform float uWoda;
out float vAlfa; out float vKlasa; out vec2 vSw; out float vMig;
float hsz(float n){ return fract(sin(n * 91.345 + 7.1) * 47453.5453); }
void main(){
  float id = float(gl_VertexID);
  int klasa = gl_VertexID % 6;
  float h = hsz(id), h2 = hsz(id + 17.3), h3 = hsz(id + 41.7), h4 = hsz(id + 77.7);
  float glab = mix(0.6, 1.45, h3);
  vec2 pudlo = uPol * 2.0 + vec2(5.0, 4.0);
  vec2 v; float rozm; float alfa = 1.0; vec2 dryf = vec2(0.0);
  float t = uCzas;
  if (klasa == 0) { v = vec2(0.10, -0.20); rozm = 2.4; dryf = vec2(sin(t * 0.6 + h * 40.0) * 0.25, cos(t * 0.45 + h2 * 30.0) * 0.1); }
  else if (klasa == 1) { v = vec2(0.22, 0.015); rozm = 46.0; alfa = 0.085; }
  else if (klasa == 2) { v = vec2(0.02, 0.16); rozm = 2.6; dryf = vec2(sin(t * 0.4 + h * 40.0) * 0.15, 0.0); }
  else if (klasa == 3) { v = vec2(0.05, -0.085); rozm = 2.0; dryf = vec2(sin(t * 0.5 + h * 40.0) * 0.12, 0.0); }
  else if (klasa == 4) { v = vec2(-2.3, -0.22); rozm = 2.2; dryf = vec2(0.0, sin(t * 1.1 + h * 40.0) * 0.2); }
  else { v = vec2(-0.65, -0.34); rozm = 2.5; dryf = vec2(sin(t * 0.8 + h * 40.0) * 0.3, cos(t * 0.5 + h2 * 20.0) * 0.08); }   // grań: igiełki lodu niesione wiatrem
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
}`,le=B+`
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
  if (vKlasa > 4.5) c += vec3(0.05) + uBarwaSw * blask * 0.5;       // lód łapie światło mocniej niż pył
  o = vec4(c * plama * vAlfa, 0.0);
}`,ce=B+wa+`
in vec2 vUv; out vec4 o;
uniform vec2 uCamL; uniform float uLz;
uniform vec4 uOlbrzym;      // x, wysokość ziemi, wysokość postaci, faza chodu
uniform float uKier;
uniform vec3 uMgla, uMgla2;
float odc(vec2 p, vec2 a, vec2 b, float ra, float rb){
  vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - mix(ra, rb, h);
}
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float noga(vec2 p, vec2 biodro, float faza){
  // stopa stoi na ziemi i cofa się względem tułowia, potem unosi się i wraca do przodu
  float c = cos(faza), s = sin(faza);
  vec2 stopa = vec2(biodro.x - 0.12 * c, max(0.0, s) * 0.06);
  vec2 sr = (biodro + stopa) * 0.5;
  vec2 kolano = sr + vec2(0.035 + 0.03 * max(0.0, s), 0.02);
  return min(odc(p, biodro, kolano, 0.017, 0.011), odc(p, kolano, stopa, 0.011, 0.007));
}
void main(){
  vec2 pl = uCamL + (vUv * 2.0 - 1.0) * uPol * uLz;
  vec2 p = (pl - uOlbrzym.xy) / uOlbrzym.z;
  p.x *= uKier;
  if (abs(p.x) > 0.8 || p.y > 1.4) discard;
  float f = uOlbrzym.w;
  float kolys = sin(f * 2.0) * 0.008;
  p.y -= kolys;
  // tułów: długa, garbata bryła wysoko nad ziemią
  float d = odc(p, vec2(-0.17, 0.90), vec2(0.13, 0.94), 0.060, 0.050);
  d = smin(d, length((p - vec2(-0.04, 0.985)) * vec2(0.55, 1.0)) - 0.055, 0.05);
  // szyja i mała głowa, lekko kiwająca się w rytm kroków
  // długa szyja opada łukiem ku ziemi; mała głowa wisi nisko i kołysze się w rytm kroków
  vec2 kark = vec2(0.14, 0.95), lok = vec2(0.25, 0.99), glowa = vec2(0.31 + 0.012 * sin(f), 0.84 + 0.014 * sin(f * 2.0 + 1.0));
  d = smin(d, odc(p, kark, lok, 0.032, 0.020), 0.04);
  d = smin(d, odc(p, lok, glowa, 0.020, 0.011), 0.035);
  d = smin(d, length((p - glowa - vec2(0.008, -0.018)) * vec2(1.0, 0.7)) - 0.018, 0.02);
  // na grzbiecie niesie coś jak ruinę: kilka cienkich, krzywych masztów
  d = smin(d, odc(p, vec2(-0.10, 1.00), vec2(-0.13, 1.19), 0.010, 0.003), 0.02);
  d = smin(d, odc(p, vec2(-0.03, 1.03), vec2(-0.02, 1.27), 0.011, 0.003), 0.02);
  d = smin(d, odc(p, vec2(0.04, 1.00), vec2(0.07, 1.15), 0.009, 0.003), 0.02);
  // cztery nogi, każda w innej fazie chodu
  d = smin(d, noga(p, vec2(-0.15, 0.88), f), 0.03);
  d = smin(d, noga(p, vec2(-0.10, 0.88), f + 3.14159), 0.03);
  d = smin(d, noga(p, vec2(0.08, 0.90), f + 1.5708), 0.03);
  d = smin(d, noga(p, vec2(0.12, 0.90), f + 4.7124), 0.03);
  float pok = smoothstep(0.012, -0.012, d);
  if (pok < 0.003) discard;
  // mgła: przy ziemi postać w niej tonie, w górze ciemnieje na tle nieba
  float m = kleby(pl * 0.004 + vec2(uCzas * 0.002, 0.0));
  vec3 c = mix(uMgla, uMgla2, 0.6) * mix(0.150, 0.060, smoothstep(0.0, 1.1, p.y)) * (0.8 + 0.4 * m);
  float alfa = pok * mix(0.35, 0.92, smoothstep(0.0, 0.5, p.y));
  o = vec4(c * alfa, alfa);
}`,ue=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas, uSila;
out float vAlfa; out vec2 vSw; out float vBarwa; out float vMig;
float hsz(float n){ return fract(sin(n * 78.233 + 3.3) * 43758.5453); }
void main(){
  float id = float(gl_VertexID);
  float h = hsz(id), h2 = hsz(id + 11.1), h3 = hsz(id + 37.7), h4 = hsz(id + 59.9);
  float glab = mix(0.7, 1.4, h3);
  vec2 pudlo = uPol * 2.0 + vec2(4.0, 4.0);
  vec2 v = vec2(-0.12 - 0.1 * h4, -0.55 - 0.5 * h3);
  vec2 dryf = vec2(sin(uCzas * (0.5 + h) + h2 * 40.0) * 0.22, 0.0);
  vec2 od = mod(vec2(h, h2) * pudlo + v * uCzas + dryf - uCam * glab, pudlo) - pudlo * 0.5;
  vec2 kraw = smoothstep(pudlo * 0.5, pudlo * 0.5 - 1.0, abs(od));
  vSw = uCam + od;
  vMig = pow(0.5 + 0.5 * sin(uCzas * (2.0 + h4 * 4.0) + h * 70.0), 5.0);
  vBarwa = fract(h2 * 7.0 + uCzas * 0.03 * (h - 0.5));
  // drobiny pojawiają się stopniowo: przy słabym zjawisku widać tylko część
  vAlfa = kraw.x * kraw.y * smoothstep(h4 * 0.8, h4 * 0.8 + 0.2, uSila);
  gl_Position = vec4(od / uPol, 0.0, 1.0);
  gl_PointSize = max(3.0, (5.0 + 8.0 * vMig) * uRes.y / 720.0 / mix(1.25, 0.75, h3));
}`,he=B+ya+`
in float vAlfa; in vec2 vSw; in float vBarwa; in float vMig; out vec4 o;
uniform vec3 uIskra; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  float r2 = dot(q, q);
  vec2 g = abs(q);
  float ksztalt = exp(-r2 * 9.0) + 0.25 * exp(-r2 * 2.5) + 0.6 * vMig * (exp(-g.x * 16.0 - g.y * 2.2) + exp(-g.y * 16.0 - g.x * 2.2));
  vec2 L = uIskra.xy - vSw; float r = length(L) / (uIskra.z * 1.3);
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = mix(widmo(vBarwa), vec3(1.0), 0.22) * (0.05 + 0.5 * vMig + 1.5 * blask * (0.35 + vMig)) + tecza * 0.9;
  o = vec4(c * ksztalt * vAlfa * smoothstep(1.0, 0.7, r2), 0.0);
}`,fe=`#version 300 es
uniform vec2 uCam, uPol, uRes; uniform float uCzas, uSila, uRodzaj;     // rodzaj: 0 deszcz, 1 śnieg
out float vAlfa; out vec2 vSw; out float vH;
float hsz(float n){ return fract(sin(n * 63.217 + 5.9) * 51413.7391); }
void main(){
  float id = float(gl_VertexID);
  float h = hsz(id), h2 = hsz(id + 13.7), h3 = hsz(id + 31.1), h4 = hsz(id + 71.3);
  float glab = mix(0.75, 1.35, h3);
  vec2 pudlo = uPol * 2.0 + vec2(4.0, 4.0);
  bool deszcz = uRodzaj < 0.5;
  vec2 v = deszcz ? vec2(-1.7, -10.0 - 3.5 * h4) : vec2(-0.3 - 0.35 * h4, -0.7 - 0.6 * h3);
  vec2 dryf = deszcz ? vec2(0.0) : vec2(sin(uCzas * (0.5 + h) + h2 * 40.0) * 0.32, cos(uCzas * (0.3 + h4) + h * 20.0) * 0.08);
  vec2 od = mod(vec2(h, h2) * pudlo + v * uCzas + dryf - uCam * glab, pudlo) - pudlo * 0.5;
  vec2 kraw = smoothstep(pudlo * 0.5, pudlo * 0.5 - 1.0, abs(od));
  vSw = uCam + od; vH = h4;
  vAlfa = kraw.x * kraw.y * smoothstep(h * 0.85, h * 0.85 + 0.15, uSila) * (0.45 + 0.55 * h2);
  gl_Position = vec4(od / uPol, 0.0, 1.0);
  float skala = uRes.y / 720.0 / mix(1.3, 0.75, h3);
  gl_PointSize = max(deszcz ? 10.0 : 2.5, (deszcz ? 24.0 + 12.0 * h4 : 5.0 + 6.0 * h4) * skala);
}`,ze=B+`
in float vAlfa; in vec2 vSw; in float vH; out vec4 o;
uniform vec3 uIskra, uBarwaSw, uMgla; uniform sampler2D uSwiatlo; uniform vec2 uRes; uniform float uRodzaj;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0;
  vec2 L = uIskra.xy - vSw; float r = length(L) / (uIskra.z * 1.25);
  float blask = exp(-r * r);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c; float ksztalt;
  if (uRodzaj < 0.5) {
    // kropla: cienka, lekko skośna kreska
    float d = q.x - q.y * 0.16;
    ksztalt = exp(-d * d * 300.0) * smoothstep(1.0, 0.25, abs(q.y));
    c = uMgla * 0.10 + uBarwaSw * blask * 0.75 + tecza * 1.5;
  } else {
    float r2 = dot(q, q);
    ksztalt = exp(-r2 * 3.5) * smoothstep(1.0, 0.6, r2);
    c = vec3(0.86, 0.91, 1.0) * (0.10 + 0.06 * vH) * (uMgla * 2.0 + 0.3) + uBarwaSw * blask * 0.95 + tecza * 1.9;
  }
  o = vec4(c * ksztalt * vAlfa, 0.0);
}`,Oa=20,nt=.17,$=96,de=.42,Va=1.55,Ua=.75,pe=1.25,ke={ciagWskaznik:5.6,ciagKlawisze:5.6,oporCiag:1.55,oporSwobodny:.8,maksPredkosc:3.7,kolysanie:.16,drgniecieCo:[4.5,9],drgniecieSila:[.06,.14]};class me{constructor(a=1){this.x=8,this.y=6,this.vx=0,this.vy=0,this.zasiegBazowy=1.15,this.zasieg=this.zasiegBazowy,this.energia=0,this.pradX=0,this.pradY=0,this.wPradzie=0,this.oslona=0,this.tempo=Ua,this.dx=0,this.dy=0,this.dvx=0,this.dvy=0,this.puls=0,this.pulsV=0,this.t=0,this.los=ut(a*7919+13),this.doDrgniecia=3,this.hx=new Float32Array($),this.hy=new Float32Array($),this.hi=0,this.hn=0,this.smuga=new Float32Array(Oa*2),this.dlSmugi=0,this.pudlo=[0,0,0,0],this.resetSmugi()}resetSmugi(){this.hn=0,this.hi=0;for(let a=0;a<Oa;a++)this.smuga[a*2]=this.x,this.smuga[a*2+1]=this.y}przenies(a,t){this.x=a,this.y=t,this.vx=0,this.vy=0,this.pradX=this.pradY=0,this.dx=this.dy=this.dvx=this.dvy=0,this.resetSmugi()}tracnij(a){this.pulsV+=a}krok(a,t,i){this.t+=a;const e=ke;this.tempo+=(Ua+(pe-Ua)*this.energia-this.tempo)*Math.min(1,a*1.5);const o=this.tempo;let s=t.os[0]*e.ciagKlawisze*o,n=t.os[1]*e.ciagKlawisze*o,r=s!==0||n!==0;if(t.cel){const w=t.cel[0]-this.x,y=t.cel[1]-this.y,x=Math.hypot(w,y);if(x>.12){const b=Math.min(1,x/1.8)*e.ciagWskaznik*o;s+=w/x*b,n+=y/x*b}r=!0}const h=this.t;if(s+=e.kolysanie*(Math.sin(h*.83)+.6*Math.sin(h*1.91+1.7)+.35*Math.sin(h*3.3+.4)),n+=e.kolysanie*(Math.cos(h*.71+.6)+.6*Math.sin(h*2.17+2.2)+.35*Math.cos(h*2.9+1.1)),this.doDrgniecia-=a,this.doDrgniecia<=0){this.doDrgniecia=e.drgniecieCo[0]+this.los()*(e.drgniecieCo[1]-e.drgniecieCo[0]);const w=this.los()*Math.PI*2,y=e.drgniecieSila[0]+this.los()*(e.drgniecieSila[1]-e.drgniecieSila[0]);this.vx+=Math.cos(w)*y,this.vy+=Math.sin(w)*y,this.pulsV+=1.2}const l=i.odpychanie(this.x,this.y,nt);s+=l[0],n+=l[1],this.vx+=s*a,this.vy+=n*a;const u=Math.exp(-a*(r?e.oporCiag:e.oporSwobodny));this.vx*=u,this.vy*=u;const f=Math.hypot(this.vx,this.vy),d=e.maksPredkosc*o;f>d&&(this.vx*=d/f,this.vy*=d/f),this.x+=(this.vx+this.pradX)*a,this.y+=(this.vy+this.pradY)*a;const z=i.zderzenie(this.x,this.y,nt*.8);if(z){this.x+=z.nx*z.gl,this.y+=z.ny*z.gl;const w=this.vx*z.nx+this.vy*z.ny;w<0&&(this.vx-=1.25*w*z.nx,this.vy-=1.25*w*z.ny,this.pulsV+=Math.min(6,-w*3))}const m=(this.vx+this.pradX)*.085,v=(this.vy+this.pradY)*.085;this.dvx+=((m-this.dx)*46-this.dvx*6.2)*a,this.dvy+=((v-this.dy)*46-this.dvy*6.2)*a,this.dx+=this.dvx*a,this.dy+=this.dvy*a,this.pulsV+=(-this.puls*90-this.pulsV*7)*a,this.puls+=this.pulsV*a,this.energia=Math.max(0,this.energia-a*.02*(1-.85*Math.max(this.wPradzie,this.oslona)));const k=this.zasiegBazowy+this.energia*4.7;this.zasieg+=(k-this.zasieg)*Math.min(1,a*1.4),this.hi=(this.hi+1)%$,this.hx[this.hi]=this.x,this.hy[this.hi]=this.y,this.hn<$&&this.hn++}zbudujSmuge(a){const t=Oa,i=this.smuga,e=Math.min(this.hn,Math.round(de/a));let o=0,s=this.x,n=this.y;const r=this._odc||(this._odc=new Float32Array($));let h=0;for(let w=0;w<e;w++){const y=(this.hi-w+$)%$,x=Math.hypot(this.hx[y]-s,this.hy[y]-n);if(o+x>Va){r[h++]=Va-o,o=Va;break}r[h++]=x,o+=x,s=this.hx[y],n=this.hy[y]}this.dlSmugi=o;let l=this.x,u=this.x,f=this.y,d=this.y,z=0,m=0,v=this.x,k=this.y;for(let w=0;w<t;w++){const y=o*w/(t-1);for(;z<h-1&&m+r[z]<y;){m+=r[z];const S=(this.hi-z+$)%$;v=this.hx[S],k=this.hy[S],z++}let x=v,b=k;if(h>0){const S=(this.hi-z+$)%$,_=this.hx[S],p=this.hy[S],A=Math.hypot(_-v,p-k),j=A>1e-6?Math.min(1,(y-m)/A):0;x=v+(_-v)*j,b=k+(p-k)*j}i[w*2]=x,i[w*2+1]=b}for(let w=1;w<t;w++){const y=w/(t-1),x=i[w*2]-i[w*2-2],b=i[w*2+1]-i[w*2-1],S=Math.hypot(x,b);if(S<1e-5)continue;const _=.03*y*y*Math.sin(y*o*5-this.t*6)*Math.min(1,o/.6);i[w*2]+=-b/S*_,i[w*2+1]+=x/S*_}for(let w=0;w<t;w++){const y=i[w*2],x=i[w*2+1];y<l&&(l=y),y>u&&(u=y),x<f&&(f=x),x>d&&(d=x)}this.pudlo[0]=l,this.pudlo[1]=f,this.pudlo[2]=u,this.pudlo[3]=d}}const we=`#version 300 es
uniform vec2 uCam, uPol; uniform vec4 uPudlo;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1));
  vP = mix(uPudlo.xy, uPudlo.zw, r);
  gl_Position = vec4((vP - uCam) / uPol, 0.0, 1.0);
}`,ye=B+`
#define N ${Oa}
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
}`;class ve{constructor(a){this.gl=a,this.p=new T(a,we,ye,"iskierka")}rysuj(a,t=!1){const i=this.gl,e=a.iskra,o=1.3;this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uPudlo",e.pudlo[0]-o,e.pudlo[1]-o,e.pudlo[2]+o,e.pudlo[3]+o).fv("uSm",2,e.smuga).f("uGlowa",e.x,e.y).f("uDef",e.dx,e.dy).f("uR",nt).f("uCzas",a.czas).f("uPuls",e.puls).f("uMaska",t?1:0).f("uDl",e.dlSmugi).f("uBarwa",...a.mgla),i.drawArrays(i.TRIANGLE_STRIP,0,4)}}const ge=`#version 300 es
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
}`,xe=`#version 300 es
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

// ---------- 15: skalna iglica ----------
// Zwężająca się ku górze skała o schodkowym, poszarpanym obrysie; par.x = pochylenie, par.y = druga, niższa iglica obok.
void iglica(vec2 p, vec2 r){
  float t = clamp((p.y + r.y) / (2.0 * r.y), 0.0, 1.0);
  float x = p.x - uPar.x * r.x * t * t * 2.0;
  float schodek = floor(t * (5.0 + 4.0 * h1(1.0)) + h1(2.0));
  float szer = r.x * (pow(1.0 - t, 0.75) * 0.9 + 0.05) * (0.82 + 0.3 * h1(schodek + 3.0));
  x += (h1(schodek + 9.0) - 0.5) * r.x * 0.22 * (1.0 - t);
  float d = max(abs(x) - szer, abs(p.y) - r.y);
  if (uPar.y > 0.5) {
    vec2 q = p - vec2(r.x * 0.95 * (h1(5.0) > 0.5 ? 1.0 : -1.0), -r.y * 0.45);
    float t2 = clamp((q.y + r.y * 0.55) / (r.y * 1.1), 0.0, 1.0);
    d = min(d, max(abs(q.x - (h1(6.0) - 0.5) * r.x * 0.5 * t2) - r.x * 0.5 * (1.0 - t2 * 0.92), abs(q.y) - r.y * 0.55));
  }
  d += (nF(p * 0.5 / uSkala + uZi) - 0.5) * 0.14 * uSkala;
  D = d;
  // skośne warstwy skały; ku szczytowi szron
  float warstwy = 0.5 + 0.5 * sin((p.y + p.x * 0.35) / (max(r.x, 0.2 * uSkala) * 0.24) + nF(p * 0.2 / uSkala) * 4.0);
  ALB = maluj(uKa, uKb, p, normalize(vec2(0.35, 1.0)), 0.9) * (0.68 + 0.36 * warstwy);
  ALB = mix(ALB, uKc * (0.7 + 0.4 * nF(p * 0.9 / uSkala)), 0.32 * smoothstep(0.55, 1.0, t));
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
  else if (uTyp == 14) kosc(p, r);
  else iglica(p, r);

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
}`,D=[{id:"las",nazwa:"Las szeptów",mgla:[.4,.9,.74],mgla2:[.34,.72,.92],nieboGora:[.01,.022,.026],nieboDol:[.045,.125,.105],grunt:[.2,.22,.24],wierzch:[.3,.52,.4],a:[.42,.38,.44],b:[.36,.62,.5],c:[.62,.86,.72],emis:[.5,1,.8],teren:{baza:1.6,amp:1,drobne:.35,sufit:13.4},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:0,snopy:1,poswiata:.55},wiatr:.5,mglistosc:1},{id:"mokradla",nazwa:"Mgliste mokradła",mgla:[.44,.72,1],mgla2:[.62,.66,1],nieboGora:[.012,.02,.04],nieboDol:[.06,.11,.17],grunt:[.16,.19,.22],wierzch:[.3,.42,.4],a:[.34,.36,.42],b:[.42,.56,.58],c:[.66,.82,.9],emis:[.5,.8,1],teren:{baza:.85,amp:.75,drobne:.2,sufit:15.5},niebo:{tarcza:1,obrecz:0,zorza:0,gwiazdy:.25,snopy:0,poswiata:1},wiatr:.35,mglistosc:1.7},{id:"krysztaly",nazwa:"Kryształowe pole",mgla:[.74,.56,1],mgla2:[1,.52,.84],nieboGora:[.022,.012,.042],nieboDol:[.105,.06,.165],grunt:[.15,.13,.21],wierzch:[.36,.3,.52],a:[.56,.44,.86],b:[.9,.56,.84],c:[.8,.9,1],emis:[.85,.55,1],teren:{baza:1.5,amp:1.2,drobne:.6,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:1,gwiazdy:.8,snopy:0,poswiata:.7},wiatr:0,mglistosc:.7},{id:"ruiny",nazwa:"Kamienne ruiny",mgla:[.5,.86,.94],mgla2:[.6,.76,1],nieboGora:[.012,.022,.034],nieboDol:[.055,.115,.14],grunt:[.21,.23,.26],wierzch:[.4,.46,.5],a:[.5,.56,.62],b:[.4,.56,.56],c:[.74,.86,.9],emis:[.6,.9,1],teren:{baza:1.7,amp:.55,drobne:.15,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:0,gwiazdy:.45,snopy:.75,poswiata:.75},wiatr:.2,mglistosc:.9},{id:"kosci",nazwa:"Cmentarzysko olbrzymów",mgla:[.8,.74,.96],mgla2:[1,.76,.86],nieboGora:[.02,.016,.034],nieboDol:[.12,.095,.15],grunt:[.24,.22,.28],wierzch:[.5,.46,.56],a:[.68,.64,.7],b:[.52,.48,.62],c:[.92,.88,.96],emis:[.9,.8,1],teren:{baza:1.5,amp:1.25,drobne:.12,sufit:15.5},niebo:{tarcza:0,obrecz:1,zorza:0,gwiazdy:.55,snopy:0,poswiata:.95},wiatr:.9,mglistosc:.8},{id:"gran",nazwa:"Grań nad chmurami",mgla:[1,.58,.84],mgla2:[1,.7,.86],nieboGora:[.026,.012,.034],nieboDol:[.15,.07,.13],grunt:[.22,.2,.24],wierzch:[.58,.5,.56],a:[.66,.5,.62],b:[.46,.36,.56],c:[1,.88,.96],emis:[1,.7,.88],teren:{baza:1.2,amp:1.5,drobne:.3,sufit:15.5},niebo:{tarcza:0,obrecz:0,zorza:.3,gwiazdy:1,snopy:0,poswiata:1},wiatr:.7,mglistosc:1.35}],F=D.length,rt=1.22,q=[{f:.07,z:4.2,s:-.26,px:512,miekkosc:.34,zamglenie:.8,mgla:.3,otoczenie:.5,iskra:0,jasnosc:.21,komorka:22,postrzep:0},{f:.15,z:2.9,s:-.42,px:512,miekkosc:.2,zamglenie:.64,mgla:.34,otoczenie:.4,iskra:.05,jasnosc:.155,komorka:15,postrzep:.1},{f:.3,z:2,s:-.58,px:640,miekkosc:.11,zamglenie:.46,mgla:.36,otoczenie:.3,iskra:.3,jasnosc:.105,komorka:11,postrzep:.25},{f:.58,z:1.35,s:-.78,px:768,miekkosc:.055,zamglenie:.26,mgla:.36,otoczenie:.2,iskra:.85,jasnosc:.066,komorka:8,postrzep:.6},{f:1,z:1,s:0,px:1024,miekkosc:.03,zamglenie:0,mgla:.4,otoczenie:.05,iskra:1,jasnosc:.05,komorka:5,gra:!0,postrzep:1},{f:2.3,z:.6,s:-1.12,px:384,miekkosc:.42,zamglenie:0,mgla:.16,otoczenie:0,iskra:.25,jasnosc:0,komorka:6.5,bliska:!0,postrzep:0}],Q=4,lt=5.3,ka=5.6,be=16;for(const c of q){if(c.gra)c.y0=-1,c.wys=20,c.A=lt;else{c.A=-c.s*ka*c.z;const a=c.A-ka*c.z-.3*c.z,t=c.A+(15-lt)*c.f*c.z+ka*c.z+.3*c.z;c.y0=a,c.wys=t-a}c.szer=be*c.z,c.pxW=c.px,c.pxH=Math.round(c.px*c.wys/c.szer/16)*16,c.mnoznikX=c.f*c.z}function mt(c,a,t=[0,0]){return t[0]=a.x*c.mnoznikX,t[1]=c.gra?a.y:c.A+(a.y-lt)*c.f*c.z,t}const M={TEREN:0,PIEN:1,KLAB:2,KOLUMNA:3,LUK:4,BLOK:5,AKWEDUKT:6,POSAG:7,KRYSZTAL:8,ZEBRO:9,KREGI:10,CZASZKA:11,DRZEWO:12,TRZCINY:13,KOSC:14,IGLICA:15},Se=[2.3,1.75,1.4,1.12,1,1.35],Me=.5;function $a(c,a,t=.07){const i=1+(c()-.5)*2*t;return[a[0]*i,a[1]*i,a[2]*i]}function P(c,a,t,i,e,o,s,n={}){const r=D[a],h={typ:t,x:i,y:e,w:o,h:s,rot:0,par:[0,0,0,0],zi:c(),kraina:a,ka:$a(c,r.a),kb:$a(c,r.b),kc:$a(c,r.c),przed:!1,kolejnosc:c(),odbij:c()<.5?-1:1,bryla:null,...n};if(h.ox==null&&(h.ox=Math.abs(o)*1.25),h.oy==null&&(h.oy=Math.abs(s)*1.12),h.rot){const l=Math.hypot(h.ox,h.oy);h.ox=l,h.oy=l}return h}function _e(c,a,t,i,e,o,s){const n=c.terenWarstwy(a,o),r=t.y0+t.wys/2,h=t.wys/2+t.z,l=(u,f,d)=>s.push(P(e,0,M.PIEN,u,r,f,h,{par:[.35+e()*.6,d,.5+e()*.5,.45+e()*.25],ox:f*5.5}));if(a<=3){const u=a===3?e()<.7?1:0:1+(e()<.45?1:0);for(let f=0;f<u;f++)l(o+(e()-.5)*t.komorka*t.z*.8,i*(.85+e()*e()*1.5),Math.floor(e()*3.4));if(a>=2&&e()<.6){const f=i*(1.2+e()*1.6),d=i*(.45+e()*.6),z=o+(e()-.5)*4*t.z;s.push(P(e,0,M.KLAB,z,c.terenWarstwy(a,z)+d*.5,f,d,{par:[6,.55,0,.3],przed:!0}))}}else if(a===Q){if(e()<.34){const u=.5+e()*.9,f=.3+e()*.45;s.push(P(e,0,M.KLAB,o,n+f*.35,u,f,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+f*.2,rx:u*.5,ry:f*.45,r:.15}}))}else if(e()<.2){const u=.42+e()*.3,f=.45+e()*.5;s.push(P(e,0,M.PIEN,o,n+f*.6,u,f,{par:[.15,0,.9,.85],ox:u*2.2,bryla:{x:o,y:n+f*.5,rx:u*.3,ry:f*.9,r:.12}}))}}else{if(e()<.55){const u=i*(1.8+e()*2),f=i*(.7+e()*.6);s.push(P(e,0,M.KLAB,o+3*t.z,n+f*.2,u,f,{par:[6,.6,0,.3]}))}if(e()<.5){const u=i*(2+e()*2.5),f=i*(.8+e()*.7);s.push(P(e,0,M.KLAB,o-2*t.z,t.y0+t.wys-f*.4,u,f,{par:[7,.7,0,.3]}))}e()<.3&&l(o+(e()-.5)*3*t.z,i*(.8+e()*.8),0)}}function Pe(c,a,t,i,e,o,s){const n=c.terenWarstwy(a,o),r=(l,u,f)=>{const d=u*(.55+e()*.25),z=c.terenWarstwy(a,l);s.push(P(e,1,M.DRZEWO,l,z+u-.25*i,d,u,{par:[3+Math.floor(e()*3),f,(e()-.5)*.7,0],ox:d*1.3}))},h=(l,u,f)=>{const d=c.terenWarstwy(a,l),z=u*(.5+e()*.5);s.push(P(e,1,M.TRZCINY,l,d+u*.85,z,u,{par:[4+Math.floor(e()*5),0,0,0],przed:f,ox:z*1.6}))};if(a===0)e()<.5&&r(o,i*(2.2+e()*2.2),0);else if(a<=2)e()<.7&&r(o,i*(2+e()*2.6),a===2&&e()<.5?1:0),e()<.65&&h(o+(e()-.5)*8*t.z,i*(.7+e()*.7),!0);else if(a===3){if(e()<.62&&r(o,i*(2.2+e()*3),e()<.5?1:0),e()<.6&&h(o+(e()-.5)*5*t.z,i*(.8+e()*.8),!0),e()<.35){const l=i*(.9+e()),u=i*(.3+e()*.3),f=o+2*t.z;s.push(P(e,1,M.KLAB,f,c.terenWarstwy(a,f)+u*.3,l,u,{par:[4,.3,1,.2],przed:!0}))}}else if(a===Q){if(e()<.22&&n>1.3){const l=.6+e()*.8,u=.25+e()*.3;s.push(P(e,1,M.KLAB,o,n+u*.3,l,u,{par:[4,.3,1,.2],przed:!0,bryla:{x:o,y:n+u*.15,rx:l*.5,ry:u*.4,r:.12}}))}}else e()<.6&&h(o,i*(1.6+e()*1.4),!1),e()<.24&&r(o+(1.5+e()*2)*t.z,i*(4+e()*2.5),0),e()<.35&&h(o-(1+e()*2)*t.z,i*(2.2+e()*1.6),!1)}function Ae(c,a,t,i,e,o,s){const n=c.terenWarstwy(a,o),r=(l,u,f,d,z={})=>{const m=c.terenWarstwy(a,l);return P(e,2,M.KRYSZTAL,l,m+u*.9,f,u,{par:[d,.35+e()*.4,0,.5+e()*.5],ox:f*1.9+u*.5,oy:u*1.25,...z})},h=(l,u,f)=>s.push(P(e,2,M.KRYSZTAL,l,u,f*.3,f,{par:[1,0,1,.8],rot:(e()-.5)*1.6,przed:!0}));if(a<=1)e()<.75&&s.push(r(o,i*(2.2+e()*3.6),i*(.9+e()*.9),3+Math.floor(e()*3)));else if(a<=3)e()<.75&&s.push(r(o,i*(1.2+e()*2.8),i*(.6+e()*.8),3+Math.floor(e()*4))),e()<.35&&h(o+(e()-.5)*6*t.z,n+i*(3+e()*4.5),i*(.35+e()*.5));else if(a===Q){if(e()<.5){const l=.35+e()*e()*1,u=.35+e()*.45,f=r(o,l,u,2+Math.floor(e()*4),{przed:e()<.5});l>.6&&(f.bryla={x:o,y:n+l*.6,rx:u*.45,ry:l*.7,r:.1}),s.push(f)}}else e()<.3&&s.push(r(o,i*(1.2+e()*1.2),i*(1.3+e()*.8),3)),e()<.22&&s.push(P(e,2,M.KRYSZTAL,o+4*t.z,t.y0+t.wys-i*1.2,i*.8,i*1.8,{par:[3,.5,0,.6],rot:Math.PI,ox:i*3,oy:i*3})),e()<.34&&s.push(r(o-(1+e()*2)*t.z,i*(2.6+e()*2.6),i*(.9+e()*.6),2+Math.floor(e()*2))),e()<.3&&h(o+(e()-.5)*4*t.z,n+i*(3.5+e()*3.5),i*(.8+e()*.8))}function je(c,a,t,i,e,o,s){const n=c.terenWarstwy(a,o),r=(l,u,f,d)=>{const z=c.terenWarstwy(a,l);s.push(P(e,3,M.KOLUMNA,l,z+u-.2*i,f,u,{par:[d,1,3+Math.floor(e()*3),0],ox:f*1.6}))},h=(l,u,f)=>{const d=c.terenWarstwy(a,l);s.push(P(e,3,M.LUK,l,d+f-.3*i,u,f,{par:[.2+e()*.08,e()<.45?.3+e()*.5:0,0,0]}))};if(a===0)if(e()<.55){const l=i*(1.6+e()*1.2),u=i*(5+e()*4);s.push(P(e,3,M.AKWEDUKT,o,n+l-.3*i,u,l,{par:[3+Math.floor(e()*3),0,e()<.5?.5+e()*.4:0,0]}))}else e()<.5&&r(o,i*(2.5+e()*3),i*(.5+e()*.4),e()<.5?e()*.3:0);else if(a===1)if(e()<.4){const l=i*(1.5+e()),u=i*(4+e()*3);s.push(P(e,3,M.AKWEDUKT,o,n+l-.3*i,u,l,{par:[3+Math.floor(e()*2),0,e()<.6?.4+e()*.5:0,0]}))}else e()<.6&&h(o,i*(1.3+e()),i*(1.8+e()*1.4));else if(a<=3){const l=i*(2.3+e()*2.4),u=i*(.34+e()*.16);if(e()<.78?(r(o,l,u,e()<.4?.15+e()*.55:0),e()<.5&&r(o+u*(7+e()*3),l,u,e()<.5?.2+e()*.6:0)):e()<.7&&h(o,i*(1.4+e()*.8),i*(2+e()*1.6)),a===3&&e()<.35){const f=i*(.6+e()*.7),d=i*(.3+e()*.25),z=o+3*t.z;s.push(P(e,3,M.BLOK,z,c.terenWarstwy(a,z)+d*.6,f,d,{par:[.06,0,0,0],rot:(e()-.5)*.7,przed:!0}))}}else if(a===Q){const l=e();if(l<.3){const u=.45+e()*.6,f=.28+e()*.3,d=(e()-.5)*.5;s.push(P(e,3,M.BLOK,o,n+f*.75,u,f,{par:[.05,0,0,0],rot:d,przed:!0,bryla:{x:o,y:n+f*.7,rx:u*.85,ry:f*.8,r:.08}}))}else if(l<.42){const u=1.2+e()*.7,f=.5+e()*.35;s.push(P(e,3,M.BLOK,o,n+f*.8,u,f,{par:[.03,3,0,0],przed:!0,bryla:{x:o,y:n+f*.3,rx:u*.9,ry:f*.5,r:.08}}))}else if(l<.56){const u=.42+e()*.12,f=.5+e()*.8;s.push(P(e,3,M.KOLUMNA,o,n+f-.1,u,f,{par:[.25+e()*.3,0,4,0],ox:u*1.6,bryla:{x:o,y:n+f*.6,rx:u*.6,ry:f*.75,r:.1}}))}}else{if(e()<.4){const l=i*(1.5+e()),u=i*(.8+e()*.5);s.push(P(e,3,M.BLOK,o,n+u*.5,l,u,{par:[.1,0,0,0],rot:(e()-.5)*.6}))}e()<.24&&r(o+(1.5+e()*2)*t.z,i*(3.5+e()*4),i*(.6+e()*.45),e()<.55?.2+e()*.5:0)}}function Le(c,a,t,i,e,o,s){const n=c.terenWarstwy(a,o),r=(l,u,f)=>{const d=e()<.5?-1:1,z=u*(.42+e()*.15);for(let m=0;m<f;m++){const v=u*(1-.13*m-e()*.05),k=l+m*z,w=c.terenWarstwy(a,k),y=v*(.42+e()*.1);s.push(P(e,4,M.ZEBRO,k,w+v-.3*i,y,v,{par:[.13+e()*.04,.9+e()*.35,0,0],odbij:d,ox:y*1.5,oy:v*1.15,kolejnosc:.5+m*.01}))}},h=(l,u,f={})=>{const d=c.terenWarstwy(a,l),z=u*(.16+e()*.05);return P(e,4,M.KOSC,l,d+z*.6,u,z,{rot:(e()-.5)*.5,par:[0,0,0,0],przed:!0,...f})};if(a<=1)e()<.62&&r(o,i*(2.4+e()*3),2+Math.floor(e()*3));else if(a<=3){if(e()<.58)r(o,i*(2+e()*3),2+Math.floor(e()*3));else if(e()<.5){const l=i*(2+e()*2),u=i*(.5+e()*.25);s.push(P(e,4,M.KREGI,o,n+u*.7,l,u,{par:[5+Math.floor(e()*4),0,0,0],przed:!0}))}a===3&&e()<.3&&s.push(h(o+3*t.z,i*(.8+e()*.8)))}else if(a===Q){const l=e();if(l<.2){const u=1+e()*.9,f=.3+e()*.15;s.push(P(e,4,M.KREGI,o,n+f*.55,u,f,{par:[4+Math.floor(e()*3),0,0,0],przed:!0,bryla:{x:o,y:n+f*.1,rx:u*.9,ry:f*.45,r:.08}}))}else if(l<.42){const u=.5+e()*.7,f=h(o,u);f.bryla={x:o,y:f.y,rx:u*.8,ry:f.h*.5,r:.08},s.push(f)}}else{const l=e();l<.2?r(o,i*(2.5+e()*2),1):l<.32&&r(o+(1+e()*2)*t.z,i*(3.6+e()*2),1)}}function Re(c,a,t,i,e,o,s){const n=c.terenWarstwy(a,o),r=(l,u,f,d={})=>{const z=c.terenWarstwy(a,l);return P(e,5,M.IGLICA,l,z+u-.35*i,f,u,{par:[(e()-.5)*.5,e()<.45?1:0,0,0],ox:f*2.4,oy:u*1.1,...d})},h=(l,u,f)=>s.push(P(e,5,M.BLOK,l,u,f,f*(.5+e()*.3),{par:[.12,0,0,0],rot:(e()-.5)*1.2,przed:!0}));if(a<=1)e()<.8&&s.push(r(o,i*(2.6+e()*4),i*(.7+e()*.8)));else if(a<=3)e()<.7&&s.push(r(o,i*(1.6+e()*3.2),i*(.5+e()*.6))),e()<.3&&h(o+(e()-.5)*6*t.z,n+i*(3+e()*4),i*(.5+e()*.6));else if(a===Q){const l=e();if(l<.3){const u=.5+e()*e()*1.1,f=.3+e()*.3,d=r(o,u,f,{przed:e()<.5});u>.7&&(d.bryla={x:o,y:n+u*.5,rx:f*.4,ry:u*.7,r:.1}),s.push(d)}else if(l<.48){const u=.45+e()*.5,f=.28+e()*.25;s.push(P(e,5,M.BLOK,o,n+f*.6,u,f,{par:[.1,0,0,0],rot:(e()-.5)*.5,przed:!0,bryla:{x:o,y:n+f*.5,rx:u*.8,ry:f*.7,r:.08}}))}}else e()<.4&&s.push(r(o,i*(3+e()*3),i*(.8+e()*.6)))}const Ee=[_e,Pe,Ae,je,Le,Re];function wt(c,a,t,i,e,o,s,n){const r=c.terenWarstwy(a,s);switch(o){case 0:{const h=i*1.9,l=i*9;n.push(P(e,0,M.PIEN,s,r+i*2.3,h,l,{par:[.35,3,.8,.5],rot:1.28*(e()<.5?-1:1),ox:l*1.1,oy:l*1.1,kolejnosc:.9})),n.push(P(e,0,M.PIEN,s+i*11,t.y0+t.wys/2,i*2.6,t.wys/2+t.z,{par:[.3,2,.9,.7],ox:i*12,kolejnosc:.1}));break}case 1:{const h=i*4.2,l=h*.75;n.push(P(e,1,M.DRZEWO,s,r+h-.4*i,l,h,{par:[5,1,.25,0],ox:l*1.3,kolejnosc:.9}));break}case 2:{const h=i*4.6,l=i*1.7;n.push(P(e,2,M.KRYSZTAL,s,r+h*.86,l,h,{par:[1,.12,0,1.6],ox:l*2+h*.3,oy:h*1.2,kolejnosc:.9})),n.push(P(e,2,M.KRYSZTAL,s+i*2.2,r+i*1.6,i*1.3,i*2.2,{par:[4,.7,0,.9],ox:i*4,oy:i*3,kolejnosc:.95}));break}case 3:{const h=i*3.1;n.push(P(e,3,M.POSAG,s,r+h-.5*i,h*.62,h,{par:[e()<.35?1:0,0,0,0],kolejnosc:.9}));break}case 5:{const h=i*6.5,l=i*1.5;n.push(P(e,5,M.IGLICA,s,r+h-.5*i,l,h,{par:[.18*(e()<.5?-1:1),1,0,0],ox:l*2.4,oy:h*1.1,kolejnosc:.9}));for(let u=0;u<4;u++){const f=u*1.6+e(),d=i*(.35+e()*.4);n.push(P(e,5,M.BLOK,s+Math.cos(f)*i*3.6,r+h*1.55+Math.sin(f)*i*1.3,d,d*.6,{par:[.12,0,0,0],rot:(e()-.5)*1.4,przed:!0,kolejnosc:.95}))}break}case 4:{const h=i*2;n.push(P(e,4,M.CZASZKA,s,r+h*.62,h*1.45,h,{par:[0,0,0,0],rot:(e()-.5)*.3,kolejnosc:.9,ox:h*1.9,oy:h*1.5}));break}}}function Te(c,a,t){const i=q[a],e=i.z*Se[a],o=i.komorka*i.z;if(i.bliska&&K(t*.31,c.ziarno+555,2)<Me)return[];const s=aa(c.ziarno,a*7919+17,t),n=[],r=(t+.2+.6*s())*o,h=r/i.mnoznikX,l=c.wagi(h);let u=s(),f=0;for(;f<F-1&&(u-=l[f],!(u<0));f++);if(Ee[f](c,a,i,e,s,r,n),a===2){const d=c.segment(h),z=c.srodekSegmentu(d)*i.mnoznikX-5.5*i.z;z>=t*o&&z<(t+1)*o?wt(c,a,i,e,aa(c.ziarno,991,d),c.krainaSegmentu(d),z,n):l[f]>.95&&s()<.07&&wt(c,a,i,e,s,f,r,n)}return n}const Ia=16;function Be(c,a){const t=aa(c.ziarno,4242,a),i=[],e=a*Ia,o=(s,n,r,h,l,u,f)=>i.push(s,n,r,h,t()*6.283,l,u[0],u[1],u[2],f);for(let s=e;s<e+Ia;s+=.22){const n=s+t()*.22,r=c.wagi(n),h=c.ziemia(n);let l=t(),u=0;for(;u<F-1&&(l-=r[u],!(l<0));u++);const f=D[u],d=.6+t()*.6,z=[f.b[0]*d,f.b[1]*d,f.b[2]*d],m=t();if(u===0){if(m<.8&&o(n,h-.05,.18+t()*t()*.75,.014+t()*.012,0,z,1),t()<.085){const v=c.sufit(n);v<100&&o(n,v+.9,1.4+t()*t()*4.2,.018+t()*.014,1,[z[0]*.8,z[1]*.8,z[2]*.8],.55)}}else u===1?m<.42&&h<1.75?o(n,h-.05,.7+t()*1.7,.013+t()*.008,t()<.4?2:0,z,.7):m<.6&&o(n,h-.05,.15+t()*.4,.012,0,z,1):u===3?m<.22&&o(n,h-.04,.12+t()*.4,.011+t()*.006,0,z,1):u===4?m<.2&&o(n,h-.04,.25+t()*.75,.009+t()*.006,0,z,1.6):u===5&&m<.13&&o(n,h-.04,.1+t()*.3,.009+t()*.005,0,z,1.4)}return new Float32Array(i)}const ca=4,yt=4,da=161;class Ce{constructor(a,t,i){this.gl=a,this.szum=t,this.swiat=i,this.p=new T(a,ge,xe,"wypiek");const e={wewn:a.RGBA8,format:a.RGBA,typ:a.UNSIGNED_BYTE};this.warstwy=q.map(o=>({W:o,bufor:new ia(a,o.pxW*ca,o.pxH,[e,e],{zawijanieS:a.REPEAT}),kafle:new Array(ca).fill(null)})),this.terenDane=new Float32Array(da*4),this.terenTex=qa(a,da,1,{wewn:a.RGBA32F,format:a.RGBA,typ:a.FLOAT,filtr:a.NEAREST,dane:this.terenDane}),this.zadanie=null,this.upieczono=0}reset(){for(const a of this.warstwy)a.kafle.fill(null);this.zadanie=null}zapewnij(a,t,i=1){let e=null;for(let o=0;o<this.warstwy.length;o++){const s=this.warstwy[o],n=s.W,r=a.x*n.mnoznikX,h=t*n.z+.6*n.z,l=Math.floor((r-h)/n.szer),u=Math.floor((r+h)/n.szer);for(let f=l;f<=u;f++)s.kafle[na(f)]!==f&&this._pieczCaly(o,f);if(!e){const f=n.szer*.45,d=i>=0?Math.floor((r+h+f)/n.szer):Math.floor((r-h-f)/n.szer);s.kafle[na(d)]!==d&&d-l<ca&&u-d<ca&&(e=[o,d])}}this.zadanie?this._pieczPasek():e&&(this.zadanie=this._przygotuj(e[0],e[1]),this.warstwy[e[0]].kafle[na(e[1])]=null,this._pieczPasek())}_przygotuj(a,t){const i=q[a],e=this.swiat,o=t*i.szer,s=o+i.szer,n=new Float32Array(da*4),r=i.szer/(da-33),h=o-16*r;for(let d=0;d<da;d++){const z=h+d*r,m=z/i.mnoznikX,v=e.wagi(m);n[d*4]=e.terenWarstwy(a,z),n[d*4+1]=e.sufitWarstwy(a,z),n[d*4+2]=v[2],n[d*4+3]=v[3]}const l=o/i.mnoznikX,u=s/i.mnoznikX,f=d=>e.mieszaj(d,"b",[0,0,0]);return{l:a,i:t,pasek:0,dane:n,xs:h,dx:r,x0:o,rekwizyty:e.rekwizytyW(a,o,s),barwy:{gL:e.mieszaj(l,"grunt",[0,0,0]),gP:e.mieszaj(u,"grunt",[0,0,0]),wL:e.mieszaj(l,"wierzch",[0,0,0]),wP:e.mieszaj(u,"wierzch",[0,0,0]),lL:f(l),lP:f(u)}}}_pieczCaly(a,t){this.zadanie&&this.zadanie.l===a&&na(this.zadanie.i)===na(t)&&(this.zadanie=null);const i=this._przygotuj(a,t);this._rysuj(i,0,q[a].pxH),this.warstwy[a].kafle[na(t)]=t,this.upieczono++}_pieczPasek(){const a=this.zadanie,t=q[a.l],i=Math.ceil(t.pxH/yt);this._rysuj(a,a.pasek*i,Math.min(i,t.pxH-a.pasek*i)),++a.pasek>=yt&&(this.warstwy[a.l].kafle[na(a.i)]=a.i,this.zadanie=null,this.upieczono++)}_rysuj(a,t,i){const e=this.gl,o=q[a.l],s=this.warstwy[a.l],n=this.p,r=na(a.i);e.bindFramebuffer(e.FRAMEBUFFER,s.bufor.fbo),e.viewport(r*o.pxW,0,o.pxW,o.pxH),e.enable(e.SCISSOR_TEST),e.scissor(r*o.pxW,t,o.pxW,i),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.terenTex),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,da,1,0,e.RGBA,e.FLOAT,a.dane);const h=a.barwy;n.uzyj().tex("uSzum",0,this.szum).i("uTeren",1).f("uTerenZakres",a.xs,1/a.dx,da).f("uKafel",a.x0,o.y0,o.szer,o.wys).f("uSkala",o.z).f("uPostrzep",o.postrzep).f("uMiekko",o.miekkosc*o.z).f("uPxJ",o.szer/o.pxW).f("uKafelX",a.x0,o.szer).f("uGruntL",...h.gL).f("uGruntP",...h.gP).f("uWierzchL",...h.wL).f("uWierzchP",...h.wP).f("uLiscL",...h.lL).f("uLiscP",...h.lP);const l=u=>{n.i("uTyp",u.typ).f("uPoz",u.x,u.y).f("uObsz",u.ox+o.miekkosc*o.z*2,u.oy+o.miekkosc*o.z*2).f("uRot",u.rot).f("uOdbij",u.odbij).f("uRozm",u.w,u.h).f("uPar",u.par[0],u.par[1],u.par[2],u.par[3]).f("uZi",u.zi).f("uKa",...u.ka).f("uKb",...u.kb).f("uKc",...u.kc),e.drawArrays(e.TRIANGLE_STRIP,0,4)};for(const u of a.rekwizyty)u.przed||l(u);n.i("uTyp",M.TEREN).f("uPoz",a.x0+o.szer/2,o.y0+o.wys/2).f("uObsz",o.szer/2,o.wys/2).f("uRot",0).f("uOdbij",1).f("uZi",.37+a.l*.11),e.drawArrays(e.TRIANGLE_STRIP,0,4);for(const u of a.rekwizyty)u.przed&&l(u);e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null)}}function na(c){return(c%ca+ca)%ca}const Ke=ca,vt=10;class Oe{constructor(a,t){this.gl=a,this.swiat=t,this.p=new T(a,se,ne,"flora"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf);const i=vt*4;[[0,2,0],[1,4,2],[2,4,6]].forEach(([e,o,s])=>{a.enableVertexAttribArray(e),a.vertexAttribPointer(e,o,a.FLOAT,!1,i,s*4),a.vertexAttribDivisor(e,1)}),a.bindVertexArray(a.domyslnyVAO),this.klucz="",this.ile=0,this.pamiec=new Map,this._brak=new Float32Array(16*4)}reset(){this.klucz="",this.pamiec.clear()}rysuj(a,t,i,e,o){const s=this.gl,n=Math.floor((a.cam.x-a.polX-3)/Ia),r=Math.floor((a.cam.x+a.polX+3)/Ia),h=n+":"+r;if(h!==this.klucz){this.klucz=h;const l=[];let u=0;for(let z=n;z<=r;z++){let m=this.pamiec.get(z);m||(this.pamiec.size>12&&this.pamiec.clear(),m=Be(this.swiat,z),this.pamiec.set(z,m)),l.push(m),u+=m.length}const f=new Float32Array(u);let d=0;for(const z of l)f.set(z,d),d+=z.length;s.bindBuffer(s.ARRAY_BUFFER,this.buf),s.bufferData(s.ARRAY_BUFFER,f,s.DYNAMIC_DRAW),this.ile=u/vt}this.ile&&(this.p.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...t.barwaSw).f("uRes",e,o).tex("uSwiatlo",1,i),this.p.fv("uPodmuchy",4,a.podmuchy?a.podmuchy.dane:this._brak),s.bindVertexArray(this.vao),s.drawArraysInstanced(s.TRIANGLE_STRIP,0,2*(Rt+1),this.ile),s.bindVertexArray(s.domyslnyVAO))}}const N=16,Pa=8,va={zasieg:1.5,sila:2.6,maks:3.2,gasnie:.45},Fe=.3,Ie=.9;function Ha(c,a){const t=4+Math.floor(c()*4.99),i=[];let e=0;for(let z=0;z<t;z++){const m=.35+c();i.push(m),e+=m}const o=1+c()*1.1,s=c()*Math.PI*2,n=[];let r=c()*Math.PI*2;const h=Math.floor(c()*t),l=c()<.4?Math.floor(c()*t):-1;for(let z=0;z<t;z++){r+=i[z]/e*Math.PI*2;let m=a*(.5+.5*c());(z===h||z===l)&&(m*=.38+c()*.2);const v=Math.cos(r)*m*o,k=Math.sin(r)*m;n.push([v*Math.cos(s)-k*Math.sin(s),v*Math.sin(s)+k*Math.cos(s)])}let u=0,f=0;for(const z of n)u+=z[0],f+=z[1];u/=t,f/=t;let d=0;for(const z of n)z[0]-=u,z[1]-=f,d=Math.max(d,Math.hypot(z[0],z[1]));return{v:n,zasieg:d}}function Et(c,a){const t=a*N,i=t+N/2,e=c.segment(i),o=c.srodekSegmentu(e)+13;if(o<t||o>=t+N)return null;const s=c.krainaSegmentu(e);return{id:"f"+e,x:o,y:Math.min(c.ziemia(o)+4.4,c.granicaLotu(o)-2.2),kraina:s,segment:e,odsloniecie:0,odkryty:!1}}function De(c,a){const t=a*N,i=c.segment(t+N/2),e=c.srodekSegmentu(i)+38;return e<t||e>=t+N?null:{x:e,segment:i}}const Ja=(c,a,t,i,e)=>({id:c,x:a,y:t,px:a,py:t,kat:e()*Math.PI*2,obrot:(e()-.5)*.42,faza:e()*Math.PI*2,v:i.v,zasieg:i.zasieg,os:e()*Math.PI,wachlarz:null,oswietlenie:0,ladunek:0,zapalony:!1,zar:0,wir:0});function Ne(c,a){const t=aa(c.ziarno,9001,a),i=[],e=a*N,o=1+(t()<.6?1:0)+(t()<.22?1:0);for(let r=0;r<o;r++){const h=e+(r+.15+.7*t())*N/o,l=c.ziemia(h),u=Math.min(c.granicaLotu(h)-.9,l+9.5),f=l+1.4+t()*Math.max(.5,u-l-1.4),d=t()<.32,z=d?2+Math.floor(t()*3):1;for(let m=0;m<z;m++){const v=d?.2+t()*.32:.32+t()*.4,k=t()*Math.PI*2,w=m===0?0:.6+t()*.9,y=Ha(t,v),x=h+Math.cos(k)*w,b=f+Math.sin(k)*w*.8;i.push(Ja(a*64+i.length,x,b,y,t))}}const s=Et(c,a);if(s)for(let r=0;r<3;r++){const h=Ha(t,.3+t()*.25),l=s.x-2.6+r*2.4+(t()-.5)*.6,u=s.y-1.9+(t()-.5)*.9;i.push(Ja(a*64+i.length,l,u,h,t))}const n=De(c,a);if(n){const r=aa(c.ziarno,9002,a),h=13+Math.floor(r()*6),l=i.length;for(let u=0;u<h;u++)for(let f=0;f<8;f++){const d=n.x+(r()-.5)*9.5,z=c.ziemia(d),m=Math.min(c.granicaLotu(d)-.9,z+6.4),v=z+1.8+r()*Math.max(.5,m-z-1.8);let k=!0;for(let y=l;y<i.length;y++)if(Math.hypot(i[y].x-d,i[y].y-v)<1){k=!1;break}if(!k)continue;const w=Ja(a*64+i.length,d,v,Ha(r,.22+r()*.3),r);w.polana=!0,i.push(w);break}}return i}class ht{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[]}reset(){this.kawalki.clear(),this.widoczne.length=0}krok(a,t,i,e,o=null){const s=Math.floor((t.x-i-8)/N),n=Math.floor((t.x+i+8)/N);this.widoczne.length=0;for(let r=s;r<=n;r++){let h=this.kawalki.get(r);if(!h){if(this.kawalki.size>24)for(const l of this.kawalki.keys())(l<s-2||l>n+2)&&this.kawalki.delete(l);if(h=Ne(this.swiat,r),this.kawalki.set(r,h),this.pamiec)for(const l of h)this.pamiec.jestSzklo(this.swiat.ziarno+":"+l.id)&&(l.zapalony=!0,l.zar=1,l.ladunek=1);this.naNowyKawalek?.(r,h)}for(const l of h){if(o){const u=o.x-l.px,f=o.y-l.py,d=u*u+f*f,z=va.zasieg+l.zasieg;if(d<z*z&&d>1e-4){const m=Math.sqrt(d),v=1-m/z;l.wir+=(u*o.vy-f*o.vx)/m*v*v*va.sila*a,l.wir>va.maks?l.wir=va.maks:l.wir<-3.2&&(l.wir=-3.2)}}l.wir!==0&&(l.wir*=Math.exp(-a*va.gasnie),Math.abs(l.wir)<.001&&(l.wir=0)),l.kat+=(l.obrot+l.wir)*a,l.py=l.y+Math.sin(e*.6+l.faza)*.12,l.px=l.x+Math.sin(e*.37+l.faza*1.7)*.05,this.widoczne.push(l)}}}laduj(a){for(const t of this.widoczne){if(t.zapalony){t.zar<1&&(t.zar=Math.min(1,t.zar+a*.8));continue}t.oswietlenie>Fe?(t.ladunek+=a*t.oswietlenie/Ie,t.ladunek>=1&&(t.ladunek=1,t.zapalony=!0,this.pamiec?.zapalSzklo(this.swiat.ziarno+":"+t.id),this.naZapalenie?.(t))):t.ladunek>0&&(t.ladunek=Math.max(0,t.ladunek-a*.04))}}static wierzcholki(a,t){const i=Math.cos(a.kat),e=Math.sin(a.kat);for(let o=0;o<a.v.length;o++){const s=a.v[o];t[o*2]=i*s[0]-e*s[1],t[o*2+1]=e*s[0]+i*s[1]}return t}}const Ze=`#version 300 es
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
}`,We=B+ya+`
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
}`,Ge=B+`
in vec2 vUv; out vec4 o; uniform sampler2D uTex;
void main(){
  vec3 L = texture(uTex, vUv).rgb;
  float mn = min(L.r, min(L.g, L.b));
  L -= mn * 0.92;
  float mx = max(L.r, max(L.g, L.b));
  L *= (1.0 - exp(-mx * 1.35)) / max(mx, 1e-4) * 0.92;
  o = vec4(L, 1.0);
}`,qe=`#version 300 es
uniform vec2 uCam, uPol, uSrodek; uniform float uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Ye=B+ya+`
in vec2 vP; out vec4 o;
uniform vec2 uW[${Pa}]; uniform int uN;
uniform vec2 uDoIskry, uOs, uBlyskPoz, uRes;
uniform float uBlask, uFaza, uBlysk, uOsw, uZar;
uniform vec3 uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  // odległość ze znakiem od wielokąta i normalna najbliższej krawędzi
  float d2 = 1e9, znak = 1.0; vec2 nrm = vec2(0.0, 1.0);
  for (int i = 0; i < ${Pa}; i++) {
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
  // zapalone szkło: odłamek naładowany światłem tli się sam — barwna obwódka, żar wewnątrz i miękka
  // aureola w barwach widma wokół; widać go z daleka, także gdy iskierki nie ma w pobliżu
  if (uZar > 0.001) {
    float oddech = 0.8 + 0.2 * sin(uFaza * 1.3);
    float kat = atan(vP.y, vP.x) / 6.28318 + uFaza * 0.02;
    vec3 teczowa = widmo(abs(fract(kat) * 2.0 - 1.0));
    // wewnątrz jedno łagodne przejście widma od krawędzi do środka, powoli przesuwające się w czasie
    c += widmo(abs(fract(-d * 2.6 + uFaza * 0.05) * 2.0 - 1.0)) * wn * (0.07 + 0.26 * exp(d / 0.06)) * uZar * oddech;
    c += teczowa * exp(-max(d, 0.0) / 0.15) * (1.0 - wn) * 0.36 * uZar * oddech;
    c += lod * kraw * 0.22 * uZar;
  }
  // błysk na wierzchołku: miękki krzyżyk
  vec2 g = abs(vP - uBlyskPoz);
  float gw = exp(-g.x * 70.0 - g.y * 9.0) + exp(-g.y * 70.0 - g.x * 9.0) + 0.6 * exp(-length(g) * 22.0);
  c += lod * gw * uBlysk * (0.25 + uBlask);
  o = vec4(c, wn * 0.10 * min(1.0, widac + uZar));
}`;class Xe{constructor(a,t){this.gl=a,this.szum=t,this.pWachlarz=new T(a,Ze,We,"wachlarz"),this.pNasycenie=new T(a,J,Ge,"nasycenie"),this.pOdlamek=new T(a,qe,Ye,"odlamek"),this._w=new Float32Array(Pa*2)}wachlarze(a,t){const i=this.gl,e=this.pWachlarz;i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE),e.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).tex("uSzum",0,this.szum);for(const o of t)e.f("uO",o.x,o.y).f("uKat",o.kat).f("uDl",o.dlugosc).f("uRozw",o.rozwarcie).f("uSila",o.sila).f("uZnak",o.znak).f("uZi",o.zi).f("uStart",o.start).f("uSkos",o.skos),i.drawArrays(i.TRIANGLE_STRIP,0,4);i.disable(i.BLEND)}odlamki(a,t,i,e,o,s){const n=this.gl,r=this.pOdlamek,h=a.iskra;r.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uBarwaSw",...t.barwaSw).tex("uSwiatlo",1,e);for(const l of i){if(Math.abs(l.px-a.cam.x)>a.polX+1.5)continue;const u=h.x-l.px,f=h.y-l.py,d=Math.hypot(u,f)||1,z=d/(h.zasieg*1.25);ht.wierzcholki(l,this._w);const m=Math.pow(Math.max(0,Math.sin(a.czas*.9+l.faza*3)),40),v=Math.floor(a.czas*.9/(2*Math.PI)+l.faza)%l.v.length;r.f("uSrodek",l.px,l.py).f("uObsz",l.zasieg+.5).fv("uW",2,this._w).i("uN",l.v.length).f("uDoIskry",u/d,f/d).f("uOs",Math.cos(l.os+l.kat),Math.sin(l.os+l.kat)).f("uBlyskPoz",this._w[v*2],this._w[v*2+1]).f("uBlask",Math.exp(-z*z)).f("uFaza",a.czas*.7+l.faza).f("uBlysk",m).f("uOsw",l.oswietlenie).f("uZar",l.zapalony?l.zar:l.ladunek*l.ladunek*.3),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}const ga=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,Tt=`
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
  } else if (typ == 4) {               // skamielina: zwinięta muszla z żebrami
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
  } else {                             // dzwonek: klosz rozszerzający się ku dołowi, ucho, serce
    float sz = 0.56 + 0.05 * mod(w, 3.0);
    float t = clamp((0.5 - p.y) / 1.05, 0.0, 1.0);
    float prof = sz * (0.34 + 0.66 * pow(t, 1.5 + 0.35 * mod(w, 2.0)));
    if (p.y < 0.5 && p.y > -0.55) d = abs(abs(p.x) - prof);
    d = min(d, zSeg(p, vec2(-sz, -0.55), vec2(sz, -0.55)));
    d = min(d, zSeg(p, vec2(-sz * 0.34, 0.5), vec2(sz * 0.34, 0.5)));
    d = min(d, abs(length(p - vec2(0.0, 0.68)) - 0.16));
    d = min(d, abs(length(p - vec2((mod(w, 3.0) - 1.0) * 0.14, -0.74)) - 0.1));
    if (w > 0.5 && w < 1.5) {          // pęknięty
      d = min(d, zSeg(p, vec2(0.16, -0.55), vec2(0.02, -0.18)));
      d = min(d, zSeg(p, vec2(0.02, -0.18), vec2(0.13, 0.12)));
    }
    if (w > 2.5) d = min(d, zSeg(p, vec2(-sz * 0.62, -0.2), vec2(sz * 0.62, -0.2)));        // obręcz
    if (w > 3.5) d = min(d, zSeg(p, vec2(-sz * 0.45, 0.14), vec2(sz * 0.45, 0.14)));
  }
  return d;
}`,Ve=B+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uPuls;
void main(){
  float r = length(vP);
  float rdzen = exp(-r * r / 0.0035);
  float aura = exp(-r / 0.11) * 0.42 + exp(-r / 0.36) * 0.10;
  o = vec4((mix(uBarwa, vec3(0.93, 1.0, 0.96), 0.55) * rdzen * 0.9 + uBarwa * aura) * uPuls * smoothstep(1.0, 0.7, r), 0.0);
}`,Ue=B+Tt+`
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
}`,$e=B+Tt+`
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
}`,He=B+`
in vec2 vP; out vec4 o; uniform float uPuls, uGoni, uZanik;
void main(){
  float r = length(vP) / (1.0 + uZanik * 1.5);
  float rdzen = exp(-r * r / 0.0050);
  float aura = exp(-r / 0.10) * 0.5 + exp(-r / 0.30) * 0.10;
  float zyje = 1.0 - uZanik;
  vec3 barwa = mix(vec3(0.42, 0.22, 0.85), vec3(0.66, 0.26, 0.92), uGoni);
  o = vec4(barwa * aura * (1.0 - rdzen) * uPuls * (0.8 + 0.5 * uGoni) * zyje * smoothstep(1.0, 0.7, length(vP)), min(rdzen * 1.25, 0.97) * zyje);
}`,Je=B+`
in vec2 vP; out vec4 o; uniform vec3 uBarwa; uniform float uT, uR;
void main(){
  float r = length(vP), prom = uR * (1.0 - exp(-uT * 2.6));
  // miękka fala światła, nie kreska cyrklem: szeroka, rozmyta i szybko gasnąca
  float pierscien = exp(-abs(r - prom) / (0.14 + 0.3 * uT)) * smoothstep(0.0, 0.25, r);
  o = vec4(mix(uBarwa, vec3(1.0), 0.3) * pierscien * exp(-uT * 3.0) * 0.42, 0.0);
}`;class Qe{constructor(a,t){this.gl=a,this.szum=t,this.pDrobinka=new T(a,ga,Ve,"drobinka"),this.pCien=new T(a,ga,He,"cien"),this.pSlad=new T(a,ga,Ue,"slad"),this.pFresk=new T(a,ga,$e,"fresk"),this.pKrag=new T(a,ga,Je,"krag")}miniatura(a,t,i=144){const e=this.gl;this._mini||(this._mini=new ia(e,i,i,{wewn:e.RGBA8,format:e.RGBA,typ:e.UNSIGNED_BYTE}),this._czarna=qa(e,1,1,{dane:new Uint8Array([0,0,0,255])})),this._mini.ustaw(),e.disable(e.BLEND),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),this.pSlad.uzyj().f("uCam",0,0).f("uPol",.7,.7).f("uSrodek",0,0).f("uObsz",.7,.7).f("uRes",i,i).f("uCzas",0).tex("uSwiatlo",1,this._czarna).f("uSkala",.42).i("uTyp",a).f("uWariant",t).f("uBarwa",...D[a].c).f("uOdsl",1.15),e.drawArrays(e.TRIANGLE_STRIP,0,4);const o=new Uint8Array(i*i*4);e.readPixels(0,0,i,i,e.RGBA,e.UNSIGNED_BYTE,o),e.bindFramebuffer(e.FRAMEBUFFER,null);const s=document.createElement("canvas");s.width=s.height=i;const n=s.getContext("2d"),r=n.createImageData(i,i);for(let h=0;h<i;h++)for(let l=0;l<i;l++){const u=((i-1-h)*i+l)*4,f=(h*i+l)*4,d=o[u],z=o[u+1],m=o[u+2],v=Math.max(d,z,m);r.data[f]=d,r.data[f+1]=z,r.data[f+2]=m,r.data[f+3]=Math.min(255,v*1.6)}return n.putImageData(r,0,0),s.toDataURL("image/png")}_wspolne(a,t){return a.uzyj().f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY)}freski(a,t,i,e,o){if(!t.freski.length)return;const s=this.gl,n=this._wspolne(this.pFresk,a);n.f("uRes",e,o).f("uCzas",a.czas).tex("uSwiatlo",1,i).tex("uSzum",0,this.szum);for(const r of t.freski)Math.abs(r.x-a.cam.x)>a.polX+4||(n.f("uSrodek",r.x,r.y).f("uObsz",3.9,2.25).i("uTyp",r.kraina).f("uBarwa",...D[r.kraina].c).f("uOdsl",r.odkryty?0:r.odsloniecie).f("uOdkryty",r.odkryty?1:0).f("uZaplon",r.odkryty&&r.tZaplonu!=null?Math.exp(-Math.max(0,a.czas-r.tZaplonu)*.9):0),s.drawArrays(s.TRIANGLE_STRIP,0,4))}reszta(a,t,i,e,o,s){const n=this.gl,r=a.polX+1.5;let h=this._wspolne(this.pDrobinka,a);for(const l of i.drobinki)Math.abs(l.px-a.cam.x)>r||(h.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uBarwa",...t.barwaSw).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),n.drawArrays(n.TRIANGLE_STRIP,0,4));if(i.cienie.length){h=this._wspolne(this.pCien,a);for(const l of i.cienie)Math.abs(l.px-a.cam.x)>r||(h.f("uSrodek",l.px,l.py).f("uObsz",.9,.9).f("uGoni",l.stan===1?1:0).f("uZanik",l.zanik).f("uPuls",.8+.2*Math.sin(a.czas*2.2+l.faza)),n.drawArrays(n.TRIANGLE_STRIP,0,4))}if(i.slady.length){h=this._wspolne(this.pSlad,a),h.f("uRes",o,s).f("uCzas",a.czas).tex("uSwiatlo",1,e).f("uSkala",.42);for(const l of i.slady)Math.abs(l.x-a.cam.x)>r||(h.f("uSrodek",l.x,l.y+Math.sin(a.czas*.8+l.faza)*.06).f("uObsz",.75,.75).i("uTyp",l.kraina).f("uWariant",l.wariant).f("uBarwa",...D[l.kraina].c).f("uOdsl",l.odsloniecie),n.drawArrays(n.TRIANGLE_STRIP,0,4))}if(i.efekty.length){h=this._wspolne(this.pKrag,a);for(const l of i.efekty){const u=l.rodzaj===2?5:l.rodzaj===1?2.2:1.3;h.f("uSrodek",l.x,l.y).f("uObsz",u+.5,u+.5).f("uBarwa",...t.barwaSw).f("uT",l.t).f("uR",u),n.drawArrays(n.TRIANGLE_STRIP,0,4)}}}}const Bt=5,xa=7,Ct=`#version 300 es
layout(location = 0) in vec2 aBaza;
layout(location = 1) in vec4 aPar;     // długość, faza, barwa (0..1), rodzaj (1 = z pąkiem)
layout(location = 2) in float aWzrost;
uniform vec2 uCam, uPol; uniform float uCzas; uniform vec3 uIskra;
// punkt na łodydze (t = 0 u ziemi, 1 na czubku) i kierunek łodygi w tym punkcie
vec2 lodyga(float t, out vec2 kier){
  float wiatr = (sin(uCzas * 1.1 + aPar.y + aBaza.x * 0.4) * 0.2 + sin(uCzas * 0.43 + aBaza.x * 0.13) * 0.26) * 0.8;
  vec2 od = aBaza + vec2(0.0, aPar.x * 0.6) - uIskra.xy;
  float pchniecie = sign(od.x) * exp(-dot(od, od) / 0.9) * 0.8;
  float a = ((aPar.y - 3.14) * 0.12 + wiatr + pchniecie) * t;
  kier = vec2(sin(a), cos(a));
  return aBaza + kier * aPar.x * aWzrost * t;
}`,ai=Ct+`
out float vV; out float vT; out float vBarwa; out float vPak;
void main(){
  float i = float(gl_VertexID >> 1), bok = float(gl_VertexID & 1) * 2.0 - 1.0;
  float t = i / float(${Bt});
  vec2 kier; vec2 p = lodyga(t, kier);
  float gr = 0.02 * (1.0 - 0.75 * t) * (0.5 + 0.5 * aWzrost);
  if (aPar.w > 0.5) gr += 0.036 * smoothstep(0.6, 0.8, t) * smoothstep(1.0, 0.86, t) * aWzrost;   // pąk
  p += vec2(kier.y, -kier.x) * bok * gr;
  vV = bok; vT = t; vBarwa = aPar.z; vPak = aPar.w;
  gl_Position = vec4((p - uCam) / uPol, 0.0, 1.0);
}`,ti=B+ya+`
in float vV; in float vT; in float vBarwa; in float vPak; out vec4 o;
uniform float uCzas;
void main(){
  float a = smoothstep(1.0, 0.2, abs(vV)) * smoothstep(1.03, 0.9, vT);
  vec3 barwa = mix(widmo(vBarwa), vec3(1.0), 0.18);
  // łodyga ledwo się tli, czubek (i pąk) świeci najmocniej
  float moc = 0.10 + 0.55 * vT * vT + vPak * 0.5 * smoothstep(0.6, 0.85, vT);
  o = vec4(barwa * moc * a, a * 0.5);
}`,ei=Ct+`
out vec2 vQ; out float vBarwa; out float vMoc;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vec2 kier; vec2 p = lodyga(0.84, kier);
  float rozm = 0.20 + 0.10 * aPar.w;
  vQ = r; vBarwa = aPar.z;
  vMoc = aWzrost * aWzrost * (0.75 + 0.25 * sin(uCzas * 0.9 + aPar.y * 3.0)) * (0.7 + 0.5 * aPar.w);
  gl_Position = vec4((p + r * rozm - uCam) / uPol, 0.0, 1.0);
}`,ii=B+ya+`
in vec2 vQ; in float vBarwa; in float vMoc; out vec4 o;
void main(){
  float r2 = dot(vQ, vQ);
  o = vec4(widmo(vBarwa) * exp(-r2 * 3.4) * smoothstep(1.0, 0.5, r2) * vMoc * 0.34, 0.0);
}`;class oi{constructor(a){this.gl=a,this.pZdzblo=new T(a,ai,ti,"zarosla"),this.pPoswiata=new T(a,ei,ii,"zarosla-poswiata"),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf),[[0,2,0],[1,4,2],[2,1,6]].forEach(([t,i,e])=>{a.enableVertexAttribArray(t),a.vertexAttribPointer(t,i,a.FLOAT,!1,xa*4,e*4),a.vertexAttribDivisor(t,1)}),a.bindVertexArray(a.domyslnyVAO),this.dane=new Float32Array(xa*256),this.ile=0,this._klucz=""}rysuj(a,t){if(!t.kielki.length)return;const i=this.gl,e=Math.floor((a.cam.x-a.polX-1.5)/4),o=Math.floor((a.cam.x+a.polX+1.5)/4),s=t.wersja+":"+e+":"+o;if(s!==this._klucz){this._klucz=s;const n=e*4,r=(o+1)*4;let h=0;for(const l of t.kielki){if(l.x<n||l.x>r)continue;if((h+1)*xa>this.dane.length){const d=new Float32Array(this.dane.length*2);d.set(this.dane),this.dane=d}const u=this.dane,f=h*xa;u[f]=l.x,u[f+1]=l.y,u[f+2]=l.dl,u[f+3]=l.faza,u[f+4]=l.t,u[f+5]=l.rodzaj,u[f+6]=l.wzrost,h++}this.ile=h,i.bindBuffer(i.ARRAY_BUFFER,this.buf),i.bufferData(i.ARRAY_BUFFER,this.dane.subarray(0,h*xa),i.DYNAMIC_DRAW)}if(this.ile){i.bindVertexArray(this.vao);for(const n of[this.pPoswiata,this.pZdzblo])n.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,n===this.pZdzblo?2*(Bt+1):4,this.ile);i.bindVertexArray(i.domyslnyVAO)}}}const Da=16,la={predkosc:3.6,szer:1,szansa:.3,narasta:3.5};function si(c,a){if(a<2)return null;const t=aa(c.ziarno,5151,a);if(t()>la.szansa)return null;const i=t()<.5?1:-1,e=14+Math.floor(t()*11),o=a*Da+t()*Da-(i<0?-e:0),s=.25+.5*t(),n=.5+t()*1.1,r=.25+t()*.25,h=t()*6.283,l=(t()-.5)*.12;let u=new Float32Array(e+1);for(let f=0;f<=e;f++){const d=o+i*f,z=c.ziemia(d)+1.7,m=c.granicaLotu(d)-1.3,v=z+(m-z)*s+n*Math.sin(f*r+h)+l*(f-e/2)*4;u[f]=Math.max(z,Math.min(Math.max(z,m),v))}for(let f=0;f<3;f++){const d=new Float32Array(e+1);for(let z=0;z<=e;z++)d[z]=(u[Math.max(0,z-1)]+u[z]*2+u[Math.min(e,z+1)])/4;u=d}return{id:a,x0:o,kier:i,L:e,y:u,faza:t()*100}}function Kt(c,a,t){const i=Math.max(0,Math.min(c.L-1,Math.floor(a))),e=Math.max(0,Math.min(1,a-i)),o=c.y[i+1]-c.y[i],s=Math.hypot(1,o);return t[0]=c.x0+c.kier*a,t[1]=c.y[i]+o*e,t[2]=c.kier/s,t[3]=o/s,t}const ja=[0,0,0,0];class ni{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.sila=0,this.wlaczone=!0}krok(a,t,i,e){const o=Math.floor((t.x-i-30)/Da),s=Math.floor((t.x+i+30)/Da);this.widoczne.length=0;let n=0,r=0,h=0;if(this.wlaczone)for(let u=o;u<=s;u++){let f=this.kawalki.get(u);if(f===void 0&&(this.kawalki.size>40&&this.kawalki.clear(),f=si(this.swiat,u),this.kawalki.set(u,f)),!f)continue;this.widoczne.push(f);const d=(e.x-f.x0)*f.kier;if(d<=0||d>=f.L)continue;Kt(f,d,ja);const z=e.y-ja[1];if(Math.abs(z)>=la.szer)continue;const m=(1-(z/la.szer)**2)*Math.min(1,d/2,(f.L-d)/2);m>h&&(h=m,n=ja[2]*la.predkosc*m,r=ja[3]*la.predkosc*m-z*1.4*m)}const l=Math.min(1,a*la.narasta);e.pradX+=(n-e.pradX)*l,e.pradY+=(r-e.pradY)*l,this.sila+=(h-this.sila)*l,e.wPradzie=this.sila,Math.abs(e.pradX)<1e-4&&Math.abs(e.pradY)<1e-4&&(e.pradX=0,e.pradY=0)}}const Na=16,G={szansa:.24,sladow:24,odstep:.6,promien:1,zarasta:9},Za=3;function ri(c,a){if(a<3)return null;const t=aa(c.ziarno,6262,a);if(t()>G.szansa)return null;const i=a*Na+t()*Na,e=5+t()*4.5,o=2+t()*1.4,s=c.ziemia(i),n=c.granicaLotu(i),r=Math.min(n-o*.6,s+o*.7+t()*2.6);return{id:a,x:i,y:r,rx:e,ry:o}}class li{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.wlaczone=!0,this.slad=new Float32Array(G.sladow*4),this.banki=new Float32Array(Za*4),this.nr=0,this.ox=null,this.oy=0,this.wyczysc()}wyczysc(){for(let a=0;a<G.sladow;a++)this.slad[a*4+2]=1,this.slad[a*4+3]=-1e3;this.ox=null}krok(a,t,i,e){const o=Math.floor((a.x-t-10)/Na),s=Math.floor((a.x+t+10)/Na);if(this.widoczne.length=0,this.banki.fill(0),this.wlaczone)for(let h=o;h<=s&&this.widoczne.length<Za;h++){let l=this.kawalki.get(h);if(l===void 0&&(this.kawalki.size>40&&this.kawalki.clear(),l=ri(this.swiat,h),this.kawalki.set(h,l)),!l||Math.abs(l.x-a.x)>t+l.rx+1)continue;const u=this.widoczne.length*4;this.banki[u]=l.x,this.banki[u+1]=l.y,this.banki[u+2]=l.rx,this.banki[u+3]=l.ry,this.widoczne.push(l)}if(this.ox===null){this.ox=i.x,this.oy=i.y;return}const n=Math.hypot(i.x-this.ox,i.y-this.oy);if(n>4){this.ox=i.x,this.oy=i.y;return}if(n<G.odstep)return;const r=this.nr*4;this.slad[r]=(i.x+this.ox)/2,this.slad[r+1]=(i.y+this.oy)/2,this.slad[r+2]=G.promien*(.85+.3*Math.min(1,i.energia+.3)),this.slad[r+3]=e,this.nr=(this.nr+1)%G.sladow,this.ox=i.x,this.oy=i.y}rozwianie(a,t,i,e){let o=1;for(let r=0;r<G.sladow;r++){const h=a-this.slad[r*4],l=t-this.slad[r*4+1],u=this.slad[r*4+2];o*=1-Math.exp(-(h*h+l*l)/(u*u))*Math.exp(-Math.max(0,e-this.slad[r*4+3])/G.zarasta)}const s=a-i.x,n=t-i.y;return o*=1-Math.exp(-(s*s+n*n)/(G.promien*G.promien)),1-o}gestosc(a,t,i,e){let o=0;for(const s of this.widoczne){const n=Math.hypot((a-s.x)/s.rx,(t-s.y)/s.ry),r=Math.max(0,Math.min(1,(1-n)/.75));o=Math.max(o,r*r*(3-2*r))}return o*(1-this.rozwianie(a,t,i,e))}}const gt=44,La=5,ci=`#version 300 es
layout(location = 0) in vec2 aPoz;
layout(location = 1) in vec3 aUv;       // wzdłuż (-1 ogon .. 1 czoło), w poprzek (-1..1), alfa
uniform vec2 uCam, uPol;
out vec3 vUv; out vec2 vSw;
void main(){ vUv = aUv; vSw = aPoz; gl_Position = vec4((aPoz - uCam) / uPol, 0.0, 1.0); }`,ui=B+`
in vec3 vUv; in vec2 vSw; out vec4 o;
uniform vec3 uIskra, uBarwa; uniform sampler2D uSwiatlo; uniform vec2 uRes;
void main(){
  // smużka: jasne czoło, długi gasnący ogon, miękkie brzegi
  float wzdluz = smoothstep(-1.0, 0.55, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
  float ksztalt = wzdluz * wzdluz * exp(-vUv.y * vUv.y * 4.5);
  vec2 L = uIskra.xy - vSw; float r = length(L) / (uIskra.z * 1.2);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  vec3 c = uBarwa * (0.085 + 0.30 * exp(-r * r)) + tecza * 0.8;
  o = vec4(c * ksztalt * vUv.z, 0.0);
}`,hi=B+wa+`
in vec2 vUv; out vec4 o;
uniform vec4 uBanki[${Za}];       // x, y, rx, ry
uniform vec4 uSlad[${G.sladow}];         // x, y, promień, chwila
uniform vec3 uIskra, uMgla, uBarwaSw;
uniform sampler2D uSwiatlo;
void main(){
  vec2 pw = swiatZUv(vUv);
  float g = 0.0;
  for (int i = 0; i < ${Za}; i++) {
    vec4 b = uBanki[i];
    if (b.z > 0.0) g = max(g, smoothstep(1.0, 0.25, length((pw - b.xy) / b.zw)));
  }
  if (g < 0.004) discard;
  // rozwianie: ślad przelotu i sama iskierka; mgła jest też wypychana na boki (przesunięcie szumu)
  float zostaje = 1.0; vec2 pch = vec2(0.0);
  for (int i = 0; i < ${G.sladow}; i++) {
    vec4 s = uSlad[i];
    vec2 d = pw - s.xy;
    float w = exp(-dot(d, d) / (s.z * s.z)) * exp(-max(0.0, uCzas - s.w) / ${G.zarasta.toFixed(1)});
    zostaje *= 1.0 - w;
    pch += d * w;
  }
  vec2 di = pw - uIskra.xy;
  float wi = exp(-dot(di, di) / ${(G.promien*G.promien).toFixed(3)});
  zostaje *= 1.0 - wi; pch += di * wi;
  float czysto = 1.0 - zostaje;
  vec2 ps = pw - pch * 0.55;
  float n1 = kleby(ps * vec2(0.045, 0.075) + vec2(uCzas * 0.006, -uCzas * 0.002));
  float n2 = kleby2(ps * vec2(0.16, 0.22) + vec2(-uCzas * 0.011, uCzas * 0.004));
  float gest = g * (0.18 + 1.35 * n1 + 0.5 * n2) * zostaje;
  gest += g * czysto * zostaje * 1.6;                      // wał mgły zgarniętej na brzeg tunelu
  float alfa = clamp(gest * 0.95, 0.0, 0.93);
  float r = length(di) / uIskra.z;
  vec3 tecza = texture(uSwiatlo, vUv).rgb;
  vec3 c = uMgla * (0.15 + 0.13 * n2 + 0.08 * n1) + mix(uBarwaSw, uMgla, 0.5) * exp(-r * r * 0.7) * (0.36 + 0.4 * n1) + tecza * (0.75 + 0.5 * n1);
  o = vec4(c * alfa, alfa);
}`,fi=`#version 300 es
uniform vec2 uCam, uPol, uSrodek, uObsz;
out vec2 vP;
void main(){
  vec2 r = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vP = r * uObsz;
  gl_Position = vec4((uSrodek + vP - uCam) / uPol, 0.0, 1.0);
}`,zi=B+ya+`
in vec2 vP; out vec4 o;
uniform float uCzas, uRozw, uZanik, uKier, uSen, uBarwa;
uniform sampler2D uSwiatlo; uniform vec2 uRes;
float odc(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
void main(){
  vec2 p = vP; p.x *= uKier;
  float rozw = uRozw * uRozw * (3.0 - 2.0 * uRozw);
  float dl = mix(0.5, 1.35, rozw), rozp = mix(0.16, 0.9, rozw);
  float xx = p.x / dl;
  // płetwy falują: fala biegnie od nosa ku ogonowi, najmocniej na końcach
  float mach = sin(uCzas * 2.4 - p.x * 2.2) * 0.16 * rozw;
  float y = p.y - mach * abs(p.y) / max(rozp, 0.05) * 0.5;
  float profil = pow(max(0.0, 1.0 - xx * xx), 0.75) * (0.5 + 0.5 * smoothstep(-1.0, 0.35, xx));
  float d = max(abs(y) - rozp * profil, (abs(xx) - 1.0) * dl);
  float ogonY = 0.12 * sin(uCzas * 1.8 + 1.0) * rozw;
  float ogon = odc(p, vec2(-dl * 0.9, 0.0), vec2(-dl - 1.0 * rozw - 0.1, ogonY)) - 0.016;
  float ksz = max(smoothstep(0.035, -0.035, d), smoothstep(0.025, 0.0, ogon) * (0.3 + 0.7 * rozw));
  if (ksz < 0.003) discard;
  float rant = exp(-abs(d) * 26.0);
  float zylki = 0.5 + 0.5 * sin(abs(y) * 34.0 / max(rozp, 0.1) + xx * 5.0);
  vec3 barwa = mix(widmo(fract(uBarwa + abs(y) * 0.55 + xx * 0.12 + uCzas * 0.02)), vec3(1.0), 0.3);
  vec3 tecza = texture(uSwiatlo, gl_FragCoord.xy / uRes).rgb;
  // we śnie: ciemna bryłka, której rant zaczyna się tlić, gdy pada na nią barwne światło
  vec3 sen = barwa * rant * (0.03 + 0.5 * uSen * (0.6 + 0.4 * sin(uCzas * 3.0))) + tecza * 0.25;
  vec3 jawa = barwa * (0.16 + 0.55 * rant + 0.05 * zylki * smoothstep(0.0, -0.2, d)) + tecza * 0.5;
  float zyje = 1.0 - uZanik;
  vec3 c = mix(sen, jawa, rozw) * ksz * zyje;
  float alfa = ksz * mix(0.62, 0.22, rozw) * zyje;
  o = vec4(c, alfa);
}`,oa=[0,0,0,0],Ra=c=>{const a=Math.sin(c*91.345+7.1)*47453.5453;return a-Math.floor(a)};class di{constructor(a,t){this.gl=a,this.szum=t,this.pPrad=new T(a,ci,ui,"prad"),this.pMgla=new T(a,J,hi,"mglawica"),this.pStw=new T(a,fi,zi,"stworzenie"),this.dane=new Float32Array(6*gt*4*La),this.vao=a.createVertexArray(),this.buf=a.createBuffer(),a.bindVertexArray(this.vao),a.bindBuffer(a.ARRAY_BUFFER,this.buf),a.bufferData(a.ARRAY_BUFFER,this.dane.byteLength,a.DYNAMIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,La*4,0),a.enableVertexAttribArray(1),a.vertexAttribPointer(1,3,a.FLOAT,!1,La*4,8),a.bindVertexArray(a.domyslnyVAO)}prady(a,t,i,e,o,s){const n=this.gl,r=this.dane,h=a.czas;let l=0;const u=(z,m,v,k,w)=>{r[l++]=z,r[l++]=m,r[l++]=v,r[l++]=k,r[l++]=w};let f=0;for(const z of i.widoczne){if(f>=4)break;const m=Math.min(z.x0,z.x0+z.kier*z.L);if(!(Math.max(z.x0,z.x0+z.kier*z.L)<a.cam.x-a.polX-2||m>a.cam.x+a.polX+2)){f++;for(let k=0;k<gt;k++){const w=Ra(k*3.1+z.faza),y=Ra(k*5.7+z.faza+11),x=Ra(k*7.3+z.faza+23),b=Ra(k*1.9+z.faza+37),S=(w*z.L+h*la.predkosc*(.75+.5*y))%z.L;Kt(z,S,oa);const _=(x*2-1)*la.szer*.8+Math.sin(h*(.6+b)+w*40)*.12,p=oa[0]-oa[3]*_,A=oa[1]+oa[2]*_,j=.45+.75*b,R=.045+.04*y,Y=Math.min(1,S/2.5,(z.L-S)/2.5)*(.4+.6*x)*(1-.55*Math.abs(x*2-1)),Z=oa[2]*j,X=oa[3]*j,V=-oa[3]*R,U=oa[2]*R;u(p-Z-V,A-X-U,-1,-1,Y),u(p+Z-V,A+X-U,1,-1,Y),u(p+Z+V,A+X+U,1,1,Y),u(p-Z-V,A-X-U,-1,-1,Y),u(p+Z+V,A+X+U,1,1,Y),u(p-Z+V,A-X+U,-1,1,Y)}}}if(!l)return;const d=t.barwaSw;this.pPrad.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwa",.5+.5*d[0],.5+.5*d[1],.5+.5*d[2]).tex("uSwiatlo",1,e),n.bindVertexArray(this.vao),n.bindBuffer(n.ARRAY_BUFFER,this.buf),n.bufferSubData(n.ARRAY_BUFFER,0,r,0,l),n.drawArrays(n.TRIANGLES,0,l/La),n.bindVertexArray(n.domyslnyVAO)}stworzenia(a,t,i,e,o){const s=this.gl;let n=null;for(const r of t)Math.abs(r.x-a.cam.x)>a.polX+3||(n||(n=this.pStw.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",e,o).tex("uSwiatlo",1,i)),n.f("uSrodek",r.x,r.y).f("uObsz",2.7,1.5).f("uCzas",a.czas+r.faza).f("uRozw",r.rozw).f("uZanik",r.zanik).f("uKier",r.kier).f("uSen",r.ladunek).f("uBarwa",r.barwa),s.drawArrays(s.TRIANGLE_STRIP,0,4))}mglawice(a,t,i,e,o,s){if(!i.widoczne.length)return;const n=(.4+.6*t.otoczenie)/Math.max(.05,t.otoczenie),r=t.mgla;this.pMgla.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",o,s).f("uCzas",a.czas).tex("uSzum",0,this.szum).tex("uSwiatlo",1,e).fv("uBanki",4,i.banki).fv("uSlad",4,i.slad).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uMgla",r[0]*n,r[1]*n,r[2]*n).f("uBarwaSw",...t.barwaSw),ta(this.gl)}}const ea={wys:20,ziemia:-1,predkosc:.069,tempo:.9,przerwa:[240,480],pierwszy:[110,200]};class pi{constructor(){this.aktywny=!1,this.auto=!0,this.x=0,this.kier=1,this.faza=0,this.czas=0,this.widziany=!1,this.wys=ea.wys,this.do=ea.pierwszy[0]+Math.random()*(ea.pierwszy[1]-ea.pierwszy[0]),this.przejsc=0}krok(a,t,i){if(!this.aktywny){this.auto&&(this.do-=a)<=0&&this.wywolaj(t,i);return}this.czas+=a,this.x+=this.kier*ea.predkosc*this.wys*a;const e=Math.floor(this.faza/Math.PI);this.faza+=ea.tempo*a;const o=Math.abs(this.x-t),s=this.wys*.8;o<i+s&&(this.widziany=!0),Math.floor(this.faza/Math.PI)!==e&&o<i*1.4&&this.naKrok?.({bliskosc:Math.max(0,1-o/(i*1.4))}),(this.widziany&&o>i+s*1.5||o>i*3||this.czas>420)&&(this.aktywny=!1,this.przejsc++,this.do=ea.przerwa[0]+Math.random()*(ea.przerwa[1]-ea.przerwa[0]))}wywolaj(a,t,i=Math.random()<.5?1:-1,e=0){this.aktywny=!0,this.kier=i,this.czas=0,this.widziany=!1,this.faza=Math.random()*6.283,this.x=a-i*(t+this.wys*.8-e)}}const xt=132,I=22,bt=46;class ki{constructor(a){this.ziarno=a|0,this.auraWl=!0,this._perm=new Map,this._komorki=new Map,this._w=new Float32Array(F),this._w2=new Float32Array(F)}_permSurowa(a){const t=aa(this.ziarno,a,5),i=[...Array(F).keys()];for(let e=F-1;e>0;e--){const o=Math.floor(t()*(e+1));[i[e],i[o]]=[i[o],i[e]]}if(a===0)for(;i[0]!==0;)i.push(i.shift());return i}_permutacja(a){let t=this._perm.get(a);if(!t){t=this._permSurowa(a);const i=this._permSurowa(a-1)[F-1];a!==0&&t[0]===i?[t[0],t[1]]=[t[1],t[0]]:a===0&&(this._permSurowa(1)[0],t[F-1]),this._perm.set(a,t)}return t}krainaSegmentu(a){const t=Math.floor(a/F);return this._permutacja(t)[a-t*F]}granica(a){return a*xt-bt+(ha(a,this.ziarno,77)-.5)*34}segment(a){let t=Math.floor((a+bt)/xt);for(;a<this.granica(t);)t--;for(;a>=this.granica(t+1);)t++;return t}auraSegmentu(a){if(a===0||!this.auraWl)return 0;const t=ha(a,this.ziarno,8181),i=t<.3?1:t<.56?2:0;return i===1&&D[this.krainaSegmentu(a)].id==="gran"?2:i}mieszajSegmenty(a,t){const i=this.segment(a),e=this.granica(i),o=this.granica(i+1);if(a>o-I){const s=ra(o-I,o+I,a);return t(i)*(1-s)+t(i+1)*s}if(a<e+I){const s=ra(e-I,e+I,a);return t(i-1)*(1-s)+t(i)*s}return t(i)}deszcz(a){return this.mieszajSegmenty(a,t=>this.auraSegmentu(t)===1?1:0)}snieg(a){return this.mieszajSegmenty(a,t=>this.auraSegmentu(t)===2?1:0)}srodekSegmentu(a){return(this.granica(a)+this.granica(a+1))/2}wagi(a,t=new Float32Array(F)){t.fill(0);const i=this.segment(a),e=this.granica(i),o=this.granica(i+1),s=this.krainaSegmentu(i);if(a>o-I){const n=ra(o-I,o+I,a);t[s]+=1-n,t[this.krainaSegmentu(i+1)]+=n}else if(a<e+I){const n=ra(e-I,e+I,a);t[this.krainaSegmentu(i-1)]+=1-n,t[s]+=n}else t[s]=1;return t}krainaW(a){return this.krainaSegmentu(this.segment(a))}mieszaj(a,t,i=[0,0,0]){const e=this.wagi(a,this._w2);i[0]=i[1]=i[2]=0;for(let o=0;o<F;o++)if(e[o]>0){const s=D[o][t];i[0]+=s[0]*e[o],i[1]+=s[1]*e[o],i[2]+=s[2]*e[o]}return i}mieszajLiczbe(a,t){const i=this.wagi(a,this._w2);let e=0;for(let o=0;o<F;o++)i[o]>0&&(e+=i[o]*t(D[o],o));return e}teleporty(){const a=[];for(let t=0;a.length<F&&t<40;t++){const i=this.krainaSegmentu(t);a.some(e=>e.kraina===i)||a.push({nazwa:D[i].id,kraina:i,x:this.srodekSegmentu(t),segment:t})}return a.sort((t,i)=>t.kraina-i.kraina)}_terenKrainy(a,t){const i=D[a].teren,e=this.ziarno,o=K(t*.021,e+3,3);switch(a){case 1:{const s=K(t*.05,e+31,3);return i.baza+i.amp*(s-.5)*2.1+.12*(K(t*.4,e+32,2)-.5)}case 2:{const s=K(t*.35,e+41,2);return i.baza+i.amp*(o-.5)*2+i.drobne*Math.abs(s-.5)*2}case 3:{const s=i.baza+i.amp*(o-.5)*2*1.6,n=.55,r=s/n,h=Math.floor(r),l=r-h;return(h+ra(.35,.65,l))*n+.05*(K(t*.6,e+51,2)-.5)}case 4:{const s=K(t*.032,e+61,2);return i.baza+i.amp*(s-.5)*2+.25*Math.sin(t*.21+6*s)}case 5:{const s=K(t*.045,e+81,2);return i.baza+i.amp*Math.pow(1-Math.abs(2*s-1),1.3)*1.3+i.drobne*(K(t*.4,e+82,2)-.5)}default:return i.baza+i.amp*(o-.5)*2+i.drobne*(K(t*.23,e+21,3)-.5)*2}}ziemia(a){const t=this.wagi(a,this._w);let i=0;for(let e=0;e<F;e++)t[e]>0&&(i+=t[e]*this._terenKrainy(e,a));return i}sufit(a){const t=this.wagi(a,this._w)[0];return t<.02?1e4:D[0].teren.sufit+1.1*(K(a*.11,this.ziarno+71,3)-.5)+(1-t)*9}granicaLotu(a){return Math.min(15.3,this.sufit(a)-.5)}terenWarstwy(a,t){if(a===Q)return this.ziemia(t);const i=q[a],e=t/i.mnoznikX,o=t/i.z,s=this.ziarno+100*(a+1),n=this.wagi(e,this._w),r=a===0?1.7:a===1?1.25:1;let h=0;if(n[0]>0&&(h+=n[0]*(1.5*K(o*.06,s,3)+.3*K(o*.3,s+1,2))),n[1]>0&&(h+=n[1]*(.35*K(o*.07,s+2,2)+.2)),n[2]>0){const l=K(o*.11,s+3,3);h+=n[2]*(2.3*(1-Math.abs(2*l-1))*r+.5*K(o*.5,s+4,2))}if(n[3]>0){const l=K(o*.05,s+5,2)*3;h+=n[3]*((Math.floor(l)+ra(.4,.6,l-Math.floor(l)))*.55+.2)}if(n[4]>0&&(h+=n[4]*(1.9*K(o*.045,s+6,2)*r+.25*Math.sin(o*.3))),n[5]>0){const l=K(o*.16,s+7,3),u=K(o*.55,s+8,2);h+=n[5]*(2.6*Math.pow(1-Math.abs(2*l-1),1.6)*r+.9*(1-Math.abs(2*u-1)))}return i.bliska&&(h=h*.6-.5),h*i.z}sufitWarstwy(a,t){if(a===Q)return this.sufit(t);const i=q[a];if(a<2||i.bliska)return 1e4;const e=this.wagi(t/i.mnoznikX,this._w)[0];return e<.02?1e4:i.A+i.z*(a===2?3.4:4.3)+i.z*(1.4*(K(t/i.z*.1,this.ziarno+80+a,3)-.5)+(1-e)*9)}rekwizyty(a,t){const i=a*1e6+t+5e5;let e=this._komorki.get(i);return e||(this._komorki.size>600&&this._komorki.clear(),e=Te(this,a,t),this._komorki.set(i,e)),e}rekwizytyW(a,t,i){const e=q[a],o=e.komorka*e.z,s=9*e.z,n=[];for(let r=Math.floor((t-s)/o);r<=Math.floor((i+s)/o);r++)for(const h of this.rekwizyty(a,r))h.x+h.ox>t&&h.x-h.ox<i&&n.push(h);return n.sort((r,h)=>r.kolejnosc-h.kolejnosc),n}_bryly(a){const t=q[Q],i=Math.floor(a/t.komorka),e=this._tmpBryly||(this._tmpBryly=[]);e.length=0;for(let o=i-1;o<=i+1;o++)for(const s of this.rekwizyty(Q,o))s.bryla&&e.push(s.bryla);return e}odleglosc(a,t){let i=Math.min(t-this.ziemia(a),this.granicaLotu(a)-t);for(const e of this._bryly(a)){const o=Math.abs(a-e.x)-e.rx,s=Math.abs(t-e.y)-e.ry,n=Math.hypot(Math.max(o,0),Math.max(s,0))+Math.min(Math.max(o,s),0)-e.r;n<i&&(i=n)}return i}_normalna(a,t){const e=this.odleglosc(a+.06,t)-this.odleglosc(a-.06,t),o=this.odleglosc(a,t+.06)-this.odleglosc(a,t-.06),s=Math.hypot(e,o)||1;return[e/s,o/s]}odpychanie(a,t,i){const e=this.odleglosc(a,t)-i,o=.75;if(e>=o)return mi;const s=this._normalna(a,t),n=10*(1-Math.max(0,e)/o)**2;return[s[0]*n,s[1]*n]}zderzenie(a,t,i){const e=this.odleglosc(a,t)-i;if(e>=0)return null;const o=this._normalna(a,t);return{nx:o[0],ny:o[1],gl:-e}}woda(a){return this.ziemia(a)<rt}}const mi=[0,0],ft=["wszystko","tlo","swiat","swiatlo","glow","maska"],wi=204,yi=340,vi=280,gi=460;class xi{constructor(a,t){this.gl=a,this.swiat=t,this.szum=Vt(a),this.warstwa="wszystko",this.jakosc={tlo:.5,swiatlo:.5,ziarno:.028,drobinki:1,flora:!0},this.ziarno=.028;const i=Zt(a);this.bTlo=new ia(a,4,4,i),this.bSwiat=new ia(a,4,4,i),this.bSwiatlo=new ia(a,4,4,i),this.bSurowe=new ia(a,4,4,i),this.bGlow=[new ia(a,4,4,i),new ia(a,4,4,i),new ia(a,4,4,i)],this.bGlowWy=new ia(a,4,4,i),this.pNiebo=new T(a,J,te,"niebo"),this.pWarstwa=new T(a,J,ee,"warstwa"),this.pBliska=new T(a,J,ie,"warstwa-bliska"),this.pGra=new T(a,J,oe,"plan-gry"),this.pDrobinki=new T(a,re,le,"drobinki"),this.pKopia=new T(a,J,Ut,"kopia"),this.pDol=new T(a,J,$t,"rozmyj-dol"),this.pGora=new T(a,J,Ht,"rozmyj-gora"),this.pFinal=new T(a,J,Jt,"final"),this.pOlbrzym=new T(a,J,ce,"olbrzym"),this.pPyl=new T(a,ue,he,"pyl"),this.pOpad=new T(a,fe,ze,"opad"),this.iskierka=new ve(a),this.wypiek=new Ce(a,this.szum,t),this.flora=new Oe(a,t),this.szklo=new Xe(a,this.szum),this.obiekty=new Qe(a,this.szum),this.zarosla=new oi(a),this.zjawiska=new di(a,this.szum),this.bez={},this.w=0,this.h=0,this.atm={mglaL:[0,0,0],mglaP:[0,0,0],mgla:[0,0,0],mgla2:[0,0,0],gora:[0,0,0],dol:[0,0,0],barwaSw:[0,0,0],emis:[0,0,0],niebo:[0,0,0,0],zjawiska:[0,0],burza:[0,0,0,0],blysk:0,deszcz:0,snieg:0,dzien:0,gestoscMgly:0,cialo:[0,0],poswiata:0,swNieba:[0,1,0],pogoda:[0,0,1,0],gruntY:[0,0],woda:[rt,0,0],wL:new Float32Array(F),wP:new Float32Array(F)},this._camL=[0,0]}rozmiar(a,t){this.w=a,this.h=t;const i=this.jakosc;this.bTlo.rozmiar(a*i.tlo,t*i.tlo),this.bSwiat.rozmiar(a,t),this.bSwiatlo.rozmiar(a*i.swiatlo,t*i.swiatlo),this.bSurowe.rozmiar(a*i.swiatlo,t*i.swiatlo);let e=a*i.swiatlo,o=t*i.swiatlo;for(const s of this.bGlow)e/=2,o/=2,s.rozmiar(e,o);this.bGlowWy.rozmiar(a*i.swiatlo*.5,t*i.swiatlo*.5)}miniatura(a,t){return this.obiekty.miniatura(a,t)}_atmosfera(a){const t=this.atm,i=this.swiat,e=a.cam.x;i.mieszaj(e-a.polX,"mgla",t.mglaL),i.mieszaj(e+a.polX,"mgla",t.mglaP),i.mieszaj(e,"mgla",t.mgla),i.mieszaj(e,"mgla2",t.mgla2),i.mieszaj(e,"nieboGora",t.gora),i.mieszaj(e,"nieboDol",t.dol),i.mieszaj(e,"emis",t.emis);for(let p=0;p<3;p++)t.barwaSw[p]=t.mgla[p]*.68+.34;const o=p=>i.mieszajLiczbe(e,A=>A.niebo[p]);t.niebo[0]=o("tarcza"),t.niebo[1]=o("obrecz"),t.niebo[2]=o("zorza"),t.niebo[3]=o("gwiazdy"),t.poswiata=o("poswiata");const s=o("snopy");t.pogoda[0]=i.mieszajLiczbe(e,p=>p.wiatr),t.pogoda[1]=s,t.pogoda[2]=i.mieszajLiczbe(e,p=>p.mglistosc);const n=a.polX/a.polY,r=p=>Math.max(-n*.8,Math.min(n*.8,(i.srodekSegmentu(p)-e)*.011+n*.28)),h=i.segment(e),l=i.granica(h),u=i.granica(h+1);if(e>u-I){const p=ra(u-I,u+I,e);t.cialo[0]=r(h)*(1-p)+r(h+1)*p}else if(e<l+I){const p=ra(l-I,l+I,e);t.cialo[0]=r(h-1)*(1-p)+r(h)*p}else t.cialo[0]=r(h);t.cialo[1]=.4-(a.cam.y-5.3)*.012;const f=t.niebo[0]+t.niebo[1];let d=t.cialo[0]*f+.25*s,z=t.cialo[1]*f+1*s+.3;const m=Math.hypot(d,z)||1;t.swNieba[0]=d/m,t.swNieba[1]=z/m,t.swNieba[2]=Math.min(1,.35+f*.7+s*.3),t.gruntY[0]=i.ziemia(e-a.polX),t.gruntY[1]=i.ziemia(e+a.polX),i.wagi(e-a.polX,t.wL),i.wagi(e+a.polX,t.wP),t.woda[1]=t.wL[1],t.woda[2]=t.wP[1];const v=Math.max(0,Math.min(1,(a.iskra.zasieg-a.iskra.zasiegBazowy)/4.7)),k=a.pogoda,w=k?k.burza:0,y=k?k.blysk:0;t.otoczenie=.15+.85*Math.pow(v,.75);const x=t.dzien=a.dzien?a.dzien.w(e):0;t.otoczenie+=(1-t.otoczenie)*.45*x,t.deszcz=Math.max(i.deszcz(e),w*.9),t.snieg=i.snieg(e),t.pogoda[3]=Math.min(1,t.deszcz*.7+t.snieg);const b=t.otoczenie*(1-.35*w)+y*1.7;t.blysk=y,t.burza[0]=w,t.burza[1]=y,t.burza[2]=k?k.piorunX:0,t.burza[3]=k?k.piorunZiarno:0;for(let p=0;p<3;p++)t.mglaL[p]*=b,t.mglaP[p]*=b,t.mgla[p]*=b,t.mgla2[p]*=b,t.gora[p]*=b,t.dol[p]*=b;if(t.niebo[0]*=b,t.niebo[1]*=b,t.niebo[2]*=b,t.poswiata*=b,t.swNieba[2]*=b,x>0){t.niebo[3]+=.6*x,t.niebo[2]+=.5*x*(.5+.5*b),t.poswiata*=1+.7*x;for(let p=0;p<3;p++)t.dol[p]*=1+.9*x,t.mgla2[p]*=1+.35*x}const S=k?k.mgla:0,_=k?k.zacmienie:0;if(t.gestoscMgly=S,t.pogoda[2]*=1+2.4*S,t.zjawiska[0]=_,t.zjawiska[1]=.55*_*(t.wL[1]+t.wP[1])*.5,_>0){const p=1-.45*_*(t.wL[1]+t.wP[1])*.5;for(let A=0;A<3;A++)t.mglaL[A]*=p,t.mglaP[A]*=p,t.mgla[A]*=p,t.mgla2[A]*=p,t.dol[A]*=p;t.poswiata*=1-.6*_,t.swNieba[2]*=1-.5*_}return t}_widok(a,t){a.f("uCam",t.cam.x,t.cam.y).f("uPol",t.polX,t.polY).f("uRes",this.w,this.h).f("uCzas",t.czas).tex("uSzum",0,this.szum)}_warstwa(a,t,i,e){const o=q[t],s=this.wypiek.warstwy[t];mt(o,i.cam,this._camL),this._widok(a.uzyj(),i),a.tex("uKafle",1,s.bufor.tex[0]).tex("uKafle2",2,s.bufor.tex[1]).tex("uSwiatlo",3,this.bSwiatlo.tex[0]).f("uCamL",this._camL[0],this._camL[1]).f("uLz",o.z).f("uKafelPar",1/(Ke*o.szer),o.y0,1/o.wys).f("uMglaL",...e.mglaL).f("uMglaP",...e.mglaP).f("uMgla2",...e.mgla2).f("uAtm",o.zamglenie+(.97-o.zamglenie)*.7*e.gestoscMgly*(o.gra?0:1),o.mgla*(1+1.3*e.gestoscMgly),o.otoczenie+e.blysk*(o.gra?5:3),o.iskra).f("uIskra",i.iskra.x,i.iskra.y,i.iskra.zasieg).f("uBarwaSw",...e.barwaSw).f("uEmis",.9,.9,.9).f("uPogoda",...e.pogoda).f("uSwNieba",...e.swNieba).f("uGruntY",...e.gruntY).f("uJasnosc",o.jasnosc).f("uSnieg",e.snieg),ta(this.gl)}rysuj(a){const t=this.gl;if(t.disable(t.BLEND),this.warstwa==="maska"){this._maska(a);return}const i=this._atmosfera(a);if(this.wypiek.zapewnij(a.cam,a.polX,a.iskra.vx),this.bTlo.ustaw(),this._widok(this.pNiebo.uzyj(),a),this.pNiebo.f("uGora",...i.gora).f("uDol",...i.dol).f("uMgla",...i.mgla).f("uMgla2",...i.mgla2).f("uNiebo",...i.niebo).f("uCialo",...i.cialo).f("uPoswiata",i.poswiata).f("uZjawiska",...i.zjawiska).f("uBurza",...i.burza),ta(t),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),a.olbrzym&&a.olbrzym.aktywny&&this._olbrzym(a,i),!this.bez.dalekie)for(let l=0;l<4;l++)this._warstwa(this.pWarstwa,l,a,i);t.disable(t.BLEND);const e=a.tecze?a.tecze.wachlarze:[],o=e.length>0;o&&(this.bSurowe.ustaw(),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.szklo.wachlarze(a,e),this.bSwiatlo.ustaw(),this.szklo.pNasycenie.uzyj().tex("uTex",0,this.bSurowe.tex[0]),ta(t)),(o||this._swiecilo)&&(o||(this.bSwiatlo.ustaw(),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)),this._poswiata()),this._swiecilo=o,a.znaleziska&&a.znaleziska.freski.length&&(this.bTlo.ustaw(),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),this.obiekty.freski(a,a.znaleziska,this.bSwiatlo.tex[0],this.bTlo.w,this.bTlo.h),t.disable(t.BLEND)),this.bSwiat.ustaw(),this.pGra.uzyj().tex("uTlo",4,this.bTlo.tex[0]).f("uWoda",...i.woda),this.bez.gra?(this.pKopia.uzyj().tex("uTex",0,this.bTlo.tex[0]),ta(t)):this._warstwa(this.pGra,Q,a,i),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),a.stworzenia&&a.stworzenia.widoczne.length&&this.zjawiska.stworzenia(a,a.stworzenia.widoczne,this.bSwiatlo.tex[0],this.w,this.h),this.jakosc.flora&&!this.bez.flora&&this.flora.rysuj(a,i,this.bSwiatlo.tex[0],this.w,this.h),a.zarosla&&!this.bez.zarosla&&this.zarosla.rysuj(a,a.zarosla),a.odlamki&&this.szklo.odlamki(a,i,a.odlamki,this.bSwiatlo.tex[0],this.w,this.h),a.prady&&!this.bez.prady&&this.zjawiska.prady(a,i,a.prady,this.bSwiatlo.tex[0],this.w,this.h),a.znaleziska&&this.obiekty.reszta(a,i,a.znaleziska,this.bSwiatlo.tex[0],this.w,this.h);const s=this.bez.drobinki?0:Math.round(wi*this.jakosc.drobinki);s>0&&(this.pDrobinki.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).fv("uWL",1,i.wL).fv("uWP",1,i.wP).f("uWoda",rt).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).f("uEmis",...i.emis).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.drawArrays(t.POINTS,0,s));const n=a.pogoda?a.pogoda.pyl:0;if(n>.01&&!this.bez.drobinki&&(this.pPyl.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uSila",n).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.drawArrays(t.POINTS,0,Math.round(gi*Math.max(.35,this.jakosc.drobinki)))),(i.deszcz>.01||i.snieg>.01)&&!this.bez.drobinki&&!this.bez.opad){const l=Math.max(.4,this.jakosc.drobinki);this.pOpad.uzyj().f("uCam",a.cam.x,a.cam.y).f("uPol",a.polX,a.polY).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uIskra",a.iskra.x,a.iskra.y,a.iskra.zasieg).f("uBarwaSw",...i.barwaSw).f("uMgla",...i.mgla).tex("uSwiatlo",1,this.bSwiatlo.tex[0]),t.blendFunc(t.ONE,t.ONE),i.deszcz>.01&&(this.pOpad.f("uRodzaj",0).f("uSila",i.deszcz),t.drawArrays(t.POINTS,0,Math.round(yi*l))),i.snieg>.01&&(this.pOpad.f("uRodzaj",1).f("uSila",i.snieg),t.drawArrays(t.POINTS,0,Math.round(vi*l))),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA)}a.mgly&&!this.bez.mgly&&this.zjawiska.mglawice(a,i,a.mgly,this.bSwiatlo.tex[0],this.w,this.h),a.mgla=i.mgla,this.bez.iskra||this.iskierka.rysuj(a),this.bez.bliska||this._warstwa(this.pBliska,5,a,i),t.disable(t.BLEND),kt(t,this.w,this.h);const r=ft.indexOf(this.warstwa),h=r===1?this.bTlo.tex[0]:r===3?this.bSwiatlo.tex[0]:this.bSwiat.tex[0];this.pFinal.uzyj().tex("uSwiat",0,h).tex("uGlow",1,this.bGlowWy.tex[0]).tex("uSzum",2,this.szum).f("uRes",this.w,this.h).f("uCzas",a.czas).f("uTryb",r===4?3:r===0?0:1).f("uZiarno",this.ziarno),ta(t)}_olbrzym(a,t){const i=q[0],e=a.olbrzym;mt(i,a.cam,this._camL),!(Math.abs(e.x-this._camL[0])>a.polX*i.z+e.wys*.8)&&(this._widok(this.pOlbrzym.uzyj(),a),this.pOlbrzym.f("uCamL",this._camL[0],this._camL[1]).f("uLz",i.z).f("uOlbrzym",e.x,ea.ziemia,e.wys,e.faza).f("uKier",e.kier).f("uMgla",...t.mgla).f("uMgla2",...t.mgla2),ta(this.gl))}pomiar(a,t=40){const i=this.gl,e=new Uint8Array(4);this.rysuj(a),i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,e);const o=performance.now();for(let s=0;s<t;s++)a.czas+=.016,this.rysuj(a);return i.readPixels(0,0,1,1,i.RGBA,i.UNSIGNED_BYTE,e),(performance.now()-o)/t}_maska(a){const t=this.gl;kt(t,this.w,this.h),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),a.mgla=this.atm.mgla,this.iskierka.rysuj(a,!0)}_poswiata(){const a=this.gl;let t=this.bSwiatlo;this.pDol.uzyj();for(const i of this.bGlow)i.ustaw(),this.pDol.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),ta(a),t=i;this.pGora.uzyj();for(let i=this.bGlow.length-2;i>=0;i--){const e=this.bGlow[i];e.ustaw(),this.pGora.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),ta(a),t=e}this.bGlowWy.ustaw(),this.pGora.tex("uTex",0,t.tex[0]).f("uPx",1/t.w,1/t.h),ta(a)}}const Qa={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,1],w:[0,1],arrowdown:[0,-1],s:[0,-1]};class bi{constructor(a){this.canvas=a,this.wcisniete=new Set,this.wskaznik=null,this.poruszono=!1,this.naPierwszyRuch=null;const t=()=>{this.poruszono||(this.poruszono=!0,this.naPierwszyRuch?.())};addEventListener("keydown",e=>{const o=e.key.toLowerCase();Qa[o]&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(this.wcisniete.add(o),e.preventDefault(),t())}),addEventListener("keyup",e=>this.wcisniete.delete(e.key.toLowerCase())),addEventListener("blur",()=>{this.wcisniete.clear(),this.wskaznik=null}),a.addEventListener("pointerdown",e=>{this.wskaznik={x:e.clientX,y:e.clientY};try{a.setPointerCapture(e.pointerId)}catch{}t()}),a.addEventListener("pointermove",e=>{this.wskaznik&&(this.wskaznik.x=e.clientX,this.wskaznik.y=e.clientY)});const i=()=>{this.wskaznik=null};a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),a.addEventListener("contextmenu",e=>e.preventDefault())}odczyt(a){let t=0,i=0;for(const s of this.wcisniete)t+=Qa[s][0],i+=Qa[s][1];const e=Math.hypot(t,i);e>1&&(t/=e,i/=e);let o=null;if(this.wskaznik){const s=this.canvas.getBoundingClientRect(),n=(this.wskaznik.x-s.left)/s.width*2-1,r=1-(this.wskaznik.y-s.top)/s.height*2;o=[a.cam.x+n*a.polX,a.cam.y+r*a.polY]}return{cel:o,os:[t,i]}}}function Si(c){const a=document.createElement("div");a.className="dev",a.innerHTML=`<div id="dev-stan"></div>
    <div class="rzad" id="dev-warstwy"></div>
    <div class="rzad" id="dev-tele"></div>
    <div class="rzad"><button id="dev-ziarno">nowe ziarno</button><button id="dev-pauza">pauza</button></div>
    <div class="rzad" id="dev-zjawiska"></div>`,document.getElementById("nakladka").appendChild(a);const t=a.querySelector("#dev-stan"),i=a.querySelector("#dev-warstwy");for(const n of ft){const r=document.createElement("button");r.textContent=n,r.dataset.w=n,r.onclick=()=>{c.renderer.warstwa=n,Ma("warstwa",n==="wszystko"?null:n),s()},i.appendChild(r)}const e=a.querySelector("#dev-tele");for(const n of c.teleporty()){const r=document.createElement("button");r.textContent=n.nazwa,r.onclick=()=>c.teleport(n.x),e.appendChild(r)}const o=a.querySelector("#dev-zjawiska");for(const[n,r]of[["olbrzym",()=>c.wywolajOlbrzyma(1,20)],["pył",()=>c.pogoda.wywolaj("pyl")],["mgła",()=>c.pogoda.wywolaj("mgla")],["zaćmienie",()=>c.pogoda.wywolaj("zacmienie")],["burza",()=>c.pogoda.wywolaj("burza")],["koniec pogody",()=>c.pogoda.zakoncz()]]){const h=document.createElement("button");h.textContent=n,h.onclick=r,o.appendChild(h)}a.querySelector("#dev-ziarno").onclick=()=>{Ma("ziarno",Math.floor(Math.random()*1e6)),location.reload()},a.querySelector("#dev-pauza").onclick=()=>{c.petla.pauza=!c.petla.pauza};function s(){for(const n of i.children)n.classList.toggle("wl",n.dataset.w===c.renderer.warstwa)}return s(),setInterval(()=>{const n=c.petla,r=c.renderer,h=c.stan;t.innerHTML=`<b>${n.fps.toFixed(0)} kl./s</b> · ${n.msKlatki.toFixed(1)} ms · ${r.w}×${r.h}<br>ziarno ${c.ziarno} · x ${h.iskra.x.toFixed(1)} y ${h.iskra.y.toFixed(1)} · ${c.opisJakosci()}`},250),a}const Mi=1.44,_i=1.66,Pi=.54,Ai=1.4,at=13,ji=.2,Li=28,Ri=16,Ei=3,ba=new Float32Array(Pa*2);function Ti(c,a,t,i,e,o,s){let n=!1,r=0;for(let h=0;h<5;h++){let l=1e9,u=0,f=0,d=-1;for(let b=0;b<c;b++){const S=(b+1)%c,_=ba[b*2],p=ba[b*2+1],A=ba[S*2]-_,j=ba[S*2+1]-p,R=i*j-e*A;if(Math.abs(R)<1e-9)continue;const Y=_-a,Z=p-t,X=(Y*j-Z*A)/R,V=(Y*e-Z*i)/R;X>1e-4&&V>=0&&V<=1&&X<l&&(l=X,u=A,f=j,d=b)}if(d<0)return null;a+=i*l,t+=e*l;let z=f,m=-u;const v=Math.hypot(z,m);z/=v,m/=v;let k=-(i*z+e*m);k<0&&(z=-z,m=-m,k=-k);const w=n?o:1/o,y=1-w*w*(1-k*k);if(y<0)i+=2*k*z,e+=2*k*m,r++;else{const b=Math.sqrt(y);if(i=w*i+(w*k-b)*z,e=w*e+(w*k-b)*m,n=!n,!n){const S=Math.hypot(i,e);return s[0]=a,s[1]=t,s[2]=i/S,s[3]=e/S,s[4]=d,s[5]=r,s}}const x=Math.hypot(i,e);i/=x,e/=x}return null}const Bi=[0,0,0,0,0,0],Fa=(c,a)=>{let t=c-a;for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t},tt=c=>c-Math.floor(c),ua=[];for(let c=0;c<Pa;c++)ua.push({wr:0,rx:0,ry:0,wf:0,fx:0,fy:0,px:0,py:0,ile:0,waga:0,kat:0,dk:0,ox:0,oy:0,szer:0});function St(c,a,t){const i=c.v.length,e=Math.hypot(a,t),o=-a/e,s=-t/e,n=1.9*c.zasieg/at;ht.wierzcholki(c,ba);for(let l=0;l<i;l++){const u=ua[l];u.wr=u.rx=u.ry=u.wf=u.fx=u.fy=u.px=u.py=u.ile=u.waga=0}let r=0,h=0;for(let l=0;l<at;l++){const u=((l+.5)/at*2-1)*c.zasieg*.95;let f=-s*u-a,d=o*u-t;const z=Math.hypot(f,d);f/=z,d/=z;let m=!1;for(let v=0;v<2;v++){const k=Ti(i,a,t,f,d,v?_i:Mi,Bi);if(!k||(m=!0,k[5]>2||k[2]*o+k[3]*s<ji))continue;const w=k[5]===0?1:k[5]===1?.5:.25,y=ua[k[4]];v?(y.wf+=w,y.fx+=k[2]*w,y.fy+=k[3]*w):(y.wr+=w,y.rx+=k[2]*w,y.ry+=k[3]*w),y.px+=k[0]*w,y.py+=k[1]*w,y.ile++}m&&r++}for(let l=0;l<i;l++){const u=ua[l];if(u.wr<=0||u.wf<=0){u.waga=0;continue}const f=Math.atan2(u.ry,u.rx);u.dk=Fa(Math.atan2(u.fy,u.fx),f),u.kat=f+u.dk/2,u.ox=u.px/(u.wr+u.wf),u.oy=u.py/(u.wr+u.wf),u.waga=(u.wr+u.wf)/(2*Math.max(1,r)),u.szer=u.ile*.5*n,u.waga>h&&(h=u.waga)}return h}function Mt(c,a,t,i,e,o){const s=tt(a.faza*7.31+t*.37),n=tt(a.faza*3.17+t*.61),r=tt(a.faza*5.71+t*.23),h=Math.abs(c.dk);return o.rozw=Math.max(.27,Math.min(Ai,(Pi+.72*(1-Math.exp(-h*4)))*(.9+.22*s)*(.3+1*e))),o.start=Math.min(1,Math.max(.2,c.szer*.8/Math.tan(o.rozw/2))),o.dlugosc=Math.min(5.2,i*(.52+.45*Math.sqrt(c.waga))*(.85+.3*n)*(.4+.85*e)),o.skos=(r*2-1)*.55,o.znak=(c.dk>=0?1:-1)*Math.min(1,h/.035),o}function ct(c,a,t,i=0){const e=Math.abs(c),o=a-i;if(e>=1||o<=0)return 0;const s=(e-.6)/.4,n=e<.6?1:1-s*s*(3-2*s),r=o/t,h=Math.min(1,o/.4);return n*h*h*(3-2*h)*Math.exp(-r*r*2.4)}const C={};class Ci{constructor(){this.wachlarze=[],this._pula=[],this.spiewajace=[],this._klatka=0}aktualizuj(a,t,i){const e=this.wachlarze;e.length=0;const o=1.6+t.zasieg*1.25,s=1.7+t.zasieg*.62,n=1-Math.exp(-a*9),r=1-Math.exp(-a*5);let h=0;const l=()=>(this._pula[h]||(this._pula[h]={}),this._pula[h++]);for(const d of i){const z=d.px-t.x,m=d.py-t.y,v=Math.hypot(z,m);let k=0;v<o&&v>d.zasieg*.6&&(k=Math.pow(1-v/o,1.15));const w=d.oswietlenie;if(d.oswietlenie+=(k-d.oswietlenie)*r,w<.15&&d.oswietlenie>=.15&&this.naSzklo?.(d),d.oswietlenie<.01||v<.001){d.wachlarz=null;continue}const y=d.v.length;let x=d.wachlarz;if(!x){x=d.wachlarz=[];for(let S=0;S<y;S++)x.push({sila:0,kat:0,ox:0,oy:0,rozw:0,start:0,dlugosc:0,skos:0,znak:0})}const b=k>0?St(d,-z,-m):0;for(let S=0;S<y;S++){const _=ua[S],p=x[S],A=b>0?_.waga/b:0;if(A<.4)p.sila+=(0-p.sila)*r;else{Mt(_,d,S,s,k,C);const Y=_.ox-Math.cos(_.kat)*C.start,Z=_.oy-Math.sin(_.kat)*C.start;p.sila<.02?(p.kat=_.kat,p.ox=Y,p.oy=Z,p.rozw=C.rozw,p.start=C.start,p.dlugosc=C.dlugosc,p.znak=C.znak):(p.kat+=Fa(_.kat,p.kat)*n,p.ox+=(Y-p.ox)*n,p.oy+=(Z-p.oy)*n,p.rozw+=(C.rozw-p.rozw)*n,p.start+=(C.start-p.start)*n,p.dlugosc+=(C.dlugosc-p.dlugosc)*n,p.znak+=(C.znak-p.znak)*n),p.skos=C.skos,p.sila+=(Math.pow(A,1.5)-p.sila)*r}const j=p.sila*d.oswietlenie*Math.min(1,Math.abs(p.znak)*1.6);if(j<.02||e.length>=Ri)continue;const R=l();R.x=d.px+p.ox,R.y=d.py+p.oy,R.kat=p.kat,R.rozwarcie=p.rozw,R.dlugosc=p.dlugosc,R.start=p.start,R.skos=p.skos,R.sila=j,R.znak=p.znak>=0?1:-1,R.zi=d.faza+S*1.7,R.zrodlo=d,R.wtorny=!1,R.glebia=0,e.push(R)}}const u=++this._klatka,f=this.spiewajace;f.length=0;for(let d=0;d<e.length;d++){const z=e[d];if(z.glebia>=Ei)continue;const m=z.glebia===0?.75:.85,v=z.glebia===0?.12:.09;for(const k of i){if(k===z.zrodlo)continue;const w=k.px-z.x,y=k.py-z.y,x=Math.hypot(w,y);if(x>z.start+z.dlugosc*.95||x<z.start+.4)continue;const b=Fa(Math.atan2(y,w),z.kat)/(z.rozwarcie/2),S=ct(b,x,z.dlugosc,z.start)*z.sila*m;if(S<.05||(k._spiewKl!==u?(k._spiewKl=u,k.spiew=S,f.push(k)):S>k.spiew&&(k.spiew=S),S<v||k._ogniwoKl===u||e.length>=Li)||St(k,-w,-y)<=0)continue;let p=0;for(let R=1;R<k.v.length;R++)ua[R].waga>ua[p].waga&&(p=R);const A=ua[p];if(Mt(A,k,p+3,z.dlugosc*.9,Math.min(1,.35+S),C),Math.abs(C.znak)<.6)continue;k._ogniwoKl!==u-1&&(k.silaOgniwa=0),k._ogniwoKl=u,k.silaOgniwa+=(S-k.silaOgniwa)*Math.min(1,r*2.5);const j=l();j.x=k.px+A.ox-Math.cos(A.kat)*C.start,j.y=k.py+A.oy-Math.sin(A.kat)*C.start,j.kat=A.kat,j.rozwarcie=C.rozw,j.dlugosc=C.dlugosc,j.start=C.start,j.skos=C.skos,j.sila=k.silaOgniwa,j.znak=C.znak>=0?1:-1,j.zi=k.faza+1,j.zrodlo=k,j.wtorny=!0,j.glebia=z.glebia+1,k.oswietlenie=Math.max(k.oswietlenie,k.silaOgniwa*.8),e.push(j)}}}natezenie(a,t,i=1){let e=0;for(const o of this.wachlarze){const s=a-o.x,n=t-o.y,r=Math.hypot(s,n);r>o.start+o.dlugosc*1.4*i||(e+=ct(Fa(Math.atan2(n,s),o.kat)/(o.rozwarcie/2*i),r,o.dlugosc*i,o.start/i)*o.sila)}return e}}const zt=6,Ea={wech:2.8,lgniecie:3.4,kradnie:.17},Wa=[{rodzaj:"Pióro",nazwy:["Pióro puszczyka","Pióro sójki","Pióro czapli","Pióro kruka","Pióro jastrzębia","Pióro bez ptaka"]},{rodzaj:"Klucz",nazwy:["Klucz od śluzy","Klucz przewoźnika","Klucz bez drzwi","Klucz z dna","Klucz latarnika","Klucz od niczego"]},{rodzaj:"Kwiat w krysztale",nazwy:["Kwiat pięciopłatkowy","Kwiat nocy","Kwiat szronu","Kwiat ośmiu płatków","Kwiat ciszy","Kwiat, który nie zwiądł"]},{rodzaj:"Znak w kamieniu",nazwy:["Znak bramy","Znak wody","Znak drogi","Znak snu","Znak strażnika","Znak zapomniany"]},{rodzaj:"Skamielina",nazwy:["Muszla mała","Muszla podwójna","Muszla żebrowana","Muszla wielka","Muszla ciasno zwinięta","Muszla sprzed światła"]},{rodzaj:"Dzwonek",nazwy:["Dzwonek przełęczy","Dzwonek pęknięty","Dzwonek mgły","Dzwonek z obręczą","Dzwonek wiatru","Dzwonek, którego nikt nie słyszał"]}],dt=["Fresk koron","Fresk księżyca nad wodą","Fresk kryształowego serca","Fresk procesji","Fresk czarnego słońca","Fresk morza chmur"];function Ki(c,a,t){const i=aa(c.ziarno,7717,a),e=a*N,o={drobinki:[],slady:[],fresk:Et(c,a),cienie:[]};for(let r=0;r<3;r++){const h=e+(r+i())*N/3,l=c.ziemia(h),u=Math.min(c.granicaLotu(h)-.8,l+8.5);o.drobinki.push({id:`d${a}:${r}`,x:h,y:l+.9+i()*Math.max(.5,u-l-.9),faza:i()*6.283})}const s=aa(c.ziarno,4243,a),n=e>40?(s()<.62?1:0)+(s()<.38?1:0):0;for(let r=0;r<n;r++){const h=e+(r+.1+.8*s())*N/2,l=c.ziemia(h),u=Math.min(c.granicaLotu(h)-.8,l+8.5),f=l+.9+s()*Math.max(.5,u-l-.9);o.cienie.push({id:`c${a}:${r}`,x:h,y:f,px:h,py:f,faza:s()*6.283,stan:0,zanik:0})}return t.forEach((r,h)=>{if(!r.polana&&!(i()>.42))for(let l=0;l<6;l++){const u=i()*6.283,f=1.5+i()*1.1,d=r.x+Math.cos(u)*f,z=r.y+Math.sin(u)*f*.85;if(z>c.ziemia(d)+.7&&z<c.granicaLotu(d)-.5){o.slady.push({id:`s${a}:${h}`,x:d,y:z,kraina:c.krainaW(d),wariant:Math.floor(i()*zt),faza:i()*6.283,odsloniecie:0});break}}}),o}class Oi{constructor(a,t,i){this.swiat=a,this.kolekcja=i,this.kawalki=new Map,this.zebrane=new Set,this.drobinki=[],this.slady=[],this.freski=[],this.efekty=[],this.cienie=[],this.cienieWlaczone=!0,this.przemienionych=0,this.zdarzenie=null,t.naNowyKawalek=(e,o)=>this.kawalki.set(e,Ki(a,e,o)),this._odlamki=t}krok(a,t,i,e){this.drobinki.length=0,this.slady.length=0,this.freski.length=0,this.cienie.length=0;for(const[o,s]of this.kawalki){if(!this._odlamki.kawalki.has(o)){this.kawalki.delete(o);continue}for(const r of s.drobinki){if(this.zebrane.has(r.id))continue;r.px=r.x+Math.sin(e*.7+r.faza)*.3,r.py=r.y+Math.cos(e*.9+r.faza)*.25;const h=Math.hypot(t.x-r.px,t.y-r.py);if(h<2.2&&h>.001){const l=(1-h/2.2)*2.4*a;r.x+=(t.x-r.px)*l,r.y+=(t.y-r.py)*l}if(h<.5){this.zebrane.add(r.id),t.energia=Math.min(1,t.energia+.17),t.tracnij(4),this.efekty.push({x:r.px,y:r.py,t:0,rodzaj:0}),this.zdarzenie?.("energia",r);continue}this.drobinki.push(r)}for(const r of s.slady){if(this.zebrane.has(r.id))continue;const h=i.natezenie(r.x,r.y,1.3),l=r.odsloniecie;if(r.odsloniecie=Math.max(0,Math.min(1,r.odsloniecie+(h>.05?a*(.9+h*2):-a*.015))),l<.6&&r.odsloniecie>=.6&&this.zdarzenie?.("odsloniecie",r),r.odsloniecie>=.6&&Math.hypot(t.x-r.x,t.y-r.y)<.75){this.zebrane.add(r.id);const u=this.kolekcja.dodajSlad(r.kraina,r.wariant);t.energia=Math.min(1,t.energia+.12),t.tracnij(3),this.efekty.push({x:r.x,y:r.y,t:0,rodzaj:1}),this.zdarzenie?.("slad",{...r,nowy:u});continue}r.odsloniecie>.005&&this.slady.push(r)}if(this.cienieWlaczone)for(const r of s.cienie)this.zebrane.has(r.id)||this._cien(r,a,t,i,e,s);const n=s.fresk;if(n){const r=this.swiat.ziarno+":"+n.id;if(!n.odkryty&&(this.zebrane.has(n.id)||this.kolekcja.jestZapalony(r))&&(n.odkryty=!0),!n.odkryty){let h=0;for(let l=-2;l<=2;l++)h+=i.natezenie(n.x+l*.9,n.y+l%2*.5,1.3);if(h/=5,n.odsloniecie=Math.max(0,Math.min(1,n.odsloniecie+(h>.06?a*(.12+h*.5):-a*.01))),n.odsloniecie>=1){n.odkryty=!0,n.tZaplonu=e,this.zebrane.add(n.id),this.kolekcja.zapalFresk(r);const l=this.kolekcja.dodajFresk(n.kraina);t.energia=1,this.efekty.push({x:n.x,y:n.y,t:0,rodzaj:2}),this.zdarzenie?.("fresk",{...n,nowy:l})}}this.freski.push(n)}}for(let o=this.efekty.length-1;o>=0;o--){const s=this.efekty[o];s.t+=a,s.t>1.6&&this.efekty.splice(o,1)}}dodajDrobinke(a,t){const i=this.kawalki.get(Math.floor(a/N));return i?(i.drobinki.push({id:"x"+(this._nrDod=(this._nrDod||0)+1),x:a,y:t,px:a,py:t,faza:(a*7.3+t*3.1)%6.283}),!0):!1}_cien(a,t,i,e,o,s){if(a.zanik>0){if(a.zanik+=t*1.8,a.zanik>=1){this.zebrane.add(a.id);return}this.cienie.push(a);return}a.px=a.x+Math.sin(o*.7+a.faza)*.3,a.py=a.y+Math.cos(o*.9+a.faza)*.25;const n=Math.hypot(i.x-a.px,i.y-a.py);if(a.stan=n<Ea.wech?1:0,a.stan&&n>.001){const r=(1-n/Ea.wech)*Ea.lgniecie*t;a.x+=(i.x-a.px)*r,a.y+=(i.y-a.py)*r,a.y=Math.max(this.swiat.ziemia(a.x)+.4,Math.min(this.swiat.granicaLotu(a.x)-.3,a.y))}if(e.natezenie(a.px,a.py)>.22){this.zebrane.add(a.id),s.drobinki.push({id:"p"+a.id,x:a.x,y:a.y,px:a.px,py:a.py,faza:a.faza,zCienia:!0}),this.efekty.push({x:a.px,y:a.py,t:0,rodzaj:0}),this.przemienionych++,this.zdarzenie?.("cien-rozproszony",a);return}else n<.45&&(i.energia=Math.max(0,i.energia-Ea.kradnie),i.zasieg=Math.max(i.zasiegBazowy,i.zasieg-.3),i.vx*=.7,i.vy*=.7,i.tracnij(-4),a.zanik=.01,this.zdarzenie?.("cien",a));this.cienie.push(a)}}const _t="iskierka-kolekcja-v1",Pt=800;class Fi{constructor(a=Ii()){this.pamiec=a,this.slady={},this.freski={},this.zapalone={},this.szklo={},this.ogrody={};try{const t=JSON.parse(a?.getItem(_t)||"null");t&&typeof t=="object"&&(this.slady=t.slady||{},this.freski=t.freski||{},this.zapalone=t.zapalone||{},this.szklo=t.szklo||{},this.ogrody=t.ogrody||{})}catch{}this.naZmiane=null}_zapisz(a=!1){try{this.pamiec?.setItem(_t,JSON.stringify({slady:this.slady,freski:this.freski,zapalone:this.zapalone,szklo:this.szklo,ogrody:this.ogrody}))}catch{}a||this.naZmiane?.()}dodajSlad(a,t){const i=`${a}-${t}`,e=!this.slady[i];return this.slady[i]=(this.slady[i]||0)+1,this._zapisz(),e}dodajFresk(a){const t=!this.freski[a];return this.freski[a]=!0,this._zapisz(),t}zapalFresk(a){this.zapalone[a]=!0,this._zapisz()}jestZapalony(a){return!!this.zapalone[a]}zapalSzklo(a){this.szklo[a]=1;const t=Object.keys(this.szklo);if(t.length>Pt)for(const i of t.slice(0,t.length-Pt))delete this.szklo[i];this._zapisz(!0)}jestSzklo(a){return!!this.szklo[a]}ileSzkla(){return Object.keys(this.szklo).length}ogrod(a){return this.ogrody[a]||[]}zapiszOgrod(a,t){this.ogrody={[a]:t},this._zapisz(!0)}maSlad(a,t){return!!this.slady[`${a}-${t}`]}maFresk(a){return!!this.freski[a]}ileSladow(){return Object.keys(this.slady).length}ileFreskow(){return Object.keys(this.freski).length}wszystkichSladow(){return Wa.length*zt}wszystkichFreskow(){return dt.length}wyczysc(){this.slady={},this.freski={},this.zapalone={},this._zapisz()}}function Ii(){try{return window.localStorage}catch{return null}}class Di{constructor(a){this.kolekcja=a;const t=this.el=document.createElement("div");t.className="hud",t.innerHTML=`<div class="hud-prawy"><span class="hud-slady" id="hud-slady"></span>
      <div class="hud-energia" role="img" aria-label="Energia"><i id="hud-en"></i></div></div>
      <div class="hud-kraina" id="hud-kraina"></div><div class="hud-wiesc" id="hud-wiesc" role="status" aria-live="polite"></div>`,document.getElementById("nakladka").appendChild(t),this.slady=t.querySelector("#hud-slady"),this.en=t.querySelector("#hud-en"),this.krainaEl=t.querySelector("#hud-kraina"),this.wiescEl=t.querySelector("#hud-wiesc"),this.kraina=-1,this._enPoprz=-1,this.odswiez()}odswiez(){this.slady.textContent=`ślady ${this.kolekcja.ileSladow()} / ${this.kolekcja.wszystkichSladow()}`}energia(a){const t=Math.round(a*100);t!==this._enPoprz&&(this._enPoprz=t,this.en.style.width=t+"%")}ustawKraine(a,t=0){if(a===this.kraina&&t===this.aura)return;const i=this.kraina<0;this.kraina=a,this.aura=t,clearTimeout(this._tk),this.krainaEl.classList.remove("widac"),this._tk=setTimeout(()=>{this.krainaEl.textContent=D[a].nazwa+(t===1?" w deszczu":t===2?" pod śniegiem":""),this.krainaEl.classList.add("widac"),this._tk=setTimeout(()=>this.krainaEl.classList.remove("widac"),5e3)},i?300:900)}wiesc(a){clearTimeout(this._tw),this.wiescEl.textContent=a,this.wiescEl.classList.add("widac"),this._tw=setTimeout(()=>this.wiescEl.classList.remove("widac"),4200)}}const Ta=[{akord:[146.83,220,369.99,659.25],filtr:1e3,wiatr:0,wiatrHz:1800,skala:[293.66,369.99,440,554.37,659.25]},{akord:[69.3,103.83,164.81,246.94],filtr:480,wiatr:.16,wiatrHz:300,skala:[277.18,329.63,415.3,493.88,554.37]},{akord:[110,164.81,277.18,493.88],filtr:1100,wiatr:.03,wiatrHz:2400,skala:[440,554.37,659.25,830.61,987.77]},{akord:[98,146.83,196,220],filtr:700,wiatr:.08,wiatrHz:700,skala:[392,440,587.33,659.25,783.99]},{akord:[61.74,92.5,130.81,185],filtr:420,wiatr:.3,wiatrHz:900,skala:[246.94,277.18,369.99,415.3,493.88]},{akord:[87.31,130.81,196,329.63],filtr:900,wiatr:.22,wiatrHz:1500,skala:[349.23,392,440,523.25,659.25]}],Ni=[.85,.9,1,.85,.65,.8],Zi=6;function Ba(c,a){const t=[...a,...a.map(e=>e*2)].sort((e,o)=>e-o),i=Math.max(0,Math.min(.999,(.85-c.zasieg)/.7));return t[Math.floor(i*t.length)]}class Wi{constructor(){this.glosy=[];for(let a=0;a<Zi;a++)this.glosy.push({o:null,hz:0,sila:0});this.spiewa=0,this._doSpiewu=0,this._ostKielek=0,this._ostPyl=0,this.ac=null,this.wlaczony=!1,this.wagi=new Float32Array(F),this.licznik={szklo:0,energia:0,odsloniecie:0,slad:0,fresk:0,zapalenie:0,kielek:0,"krok-olbrzyma":0,pyl:0,pogoda:0,grzmot:0,kropla:0,stworzenie:0,dzien:0},this._ostSzklo=0,this._doAktualizacji=0,this.glosnosc=.75}get dostepny(){return typeof(window.AudioContext||window.webkitAudioContext)=="function"}_zbuduj(){const a=window.AudioContext||window.webkitAudioContext,t=this.ac=new a;this.wyjscie=t.createGain(),this.wyjscie.gain.value=0,this.analizator=t.createAnalyser(),this.analizator.fftSize=1024;const i=t.createDynamicsCompressor();i.threshold.value=-20,i.knee.value=12,i.ratio.value=6,i.attack.value=.01,i.release.value=.4,this.wyjscie.connect(i),i.connect(this.analizator),this.analizator.connect(t.destination),this.poglos=t.createGain(),this.poglos.gain.value=.3;for(const[r,h]of[[.37,.52],[.53,.46]]){const l=t.createDelay(1.5);l.delayTime.value=r;const u=t.createBiquadFilter();u.type="lowpass",u.frequency.value=1900;const f=t.createGain();f.gain.value=h,this.poglos.connect(l),l.connect(u),u.connect(f),f.connect(l),u.connect(this.wyjscie)}const e=t.sampleRate*3,o=t.createBuffer(1,e,t.sampleRate),s=o.getChannelData(0);let n=0;for(let r=0;r<e;r++)n=n*.97+(Math.random()*2-1)*.03,s[r]=n*6;this.szum=t.createBufferSource(),this.szum.buffer=o,this.szum.loop=!0,this.szum.start();for(const r of this.glosy){r.osc=t.createOscillator(),r.osc.type="sine",r.osc.frequency.value=440,r.osc2=t.createOscillator(),r.osc2.type="sine",r.osc2.frequency.value=880;const h=t.createGain();h.gain.value=.14,r.wzm=t.createGain(),r.wzm.gain.value=0;const l=t.createOscillator();l.frequency.value=3.1+this.glosy.indexOf(r)*.47;const u=t.createGain();u.gain.value=1.6,l.connect(u),u.connect(r.osc.frequency),l.start(),r.osc.connect(r.wzm),r.osc2.connect(h),h.connect(r.wzm),r.wzm.connect(this.wyjscie),r.wzm.connect(this.poglos),r.osc.start(),r.osc2.start()}this.tla=Ta.map(r=>{const h=t.createGain();h.gain.value=0;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=r.filtr,l.Q.value=.4,l.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),r.akord.forEach((m,v)=>{for(const k of[-5,6]){const w=t.createOscillator();w.type=v%2?"triangle":"sine",w.frequency.value=m,w.detune.value=k+v;const y=t.createGain();y.gain.value=.034/(1+v*.35);const x=t.createOscillator();x.frequency.value=.03+.017*v+(k>0?.011:0);const b=t.createGain();b.gain.value=y.gain.value*.6,x.connect(b),b.connect(y.gain),x.start(),w.connect(y),y.connect(l),w.start()}});const u=t.createBiquadFilter();u.type="bandpass",u.frequency.value=r.wiatrHz,u.Q.value=.7;const f=t.createGain();f.gain.value=r.wiatr*.45;const d=t.createOscillator();d.frequency.value=.07;const z=t.createGain();return z.gain.value=r.wiatr*.2,d.connect(z),z.connect(f.gain),d.start(),this.szum.connect(u),u.connect(f),f.connect(h),h})}async przelacz(a=!this.wlaczony){return this.dostepny?(this.ac||this._zbuduj(),this.wlaczony=a,a&&this.ac.resume().catch(()=>{}),this.wyjscie.gain.setTargetAtTime(a?this.glosnosc:0,this.ac.currentTime,.5),this.wlaczony):!1}ustawGlosnosc(a){this.glosnosc=a,this.ac&&this.wlaczony&&this.wyjscie.gain.setTargetAtTime(a,this.ac.currentTime,.2)}aktualizuj(a,t){if(this.wagi.set(t),!(!this.ac||!this.wlaczony)&&(this._doAktualizacji-=a,!(this._doAktualizacji>0))){this._doAktualizacji=.25;for(let i=0;i<F;i++)this.tla[i].gain.setTargetAtTime(t[i]*Ni[i],this.ac.currentTime,1.6)}}spiewaj(a,t){if(this._doSpiewu-=a,this._doSpiewu>0)return;this._doSpiewu=.06;const i=this.glosy,e=Ta[this._krainaDominujaca()].skala,o=this.ac&&this.wlaczony?this.ac.currentTime:-1;for(const s of i)!(s.o&&t.includes(s.o))&&s.o&&(s.o=null,s.sila=0,o>=0&&s.wzm.gain.setTargetAtTime(0,o,.35));for(const s of t){let n=i.find(r=>r.o===s);if(!n){if(n=i.find(r=>!r.o),!n)continue;n.o=s,n.hz=Ba(s,e)}o>=0&&n.nastrojony!==n.hz&&(n.nastrojony=n.hz,n.osc.frequency.setTargetAtTime(n.hz,o,.03),n.osc2.frequency.setTargetAtTime(n.hz*2.005,o,.03)),n.sila=Math.min(1,s.spiew*2.2),o>=0&&n.wzm.gain.setTargetAtTime(.02*n.sila,o,.25)}this.spiewa=0;for(const s of i)s.o&&this.spiewa++}ton(a,t=this._krainaDominujaca()){return Ba(a,Ta[t].skala)}_krainaDominujaca(){let a=0;for(let t=1;t<F;t++)this.wagi[t]>this.wagi[a]&&(a=t);return a}_dzwonek(a,t,i=0,e=2.6,o="sine"){const s=this.ac,n=s.currentTime+i,r=s.createOscillator(),h=s.createOscillator(),l=s.createGain(),u=s.createGain();r.type=o,r.frequency.value=a,h.type="sine",h.frequency.value=a*2.01,u.gain.value=.18,l.gain.setValueAtTime(0,n),l.gain.linearRampToValueAtTime(t,n+.02),l.gain.exponentialRampToValueAtTime(4e-4,n+e),r.connect(l),h.connect(u),u.connect(l),l.connect(this.wyjscie),l.connect(this.poglos),r.start(n),h.start(n),r.stop(n+e+.1),h.stop(n+e+.1)}zdarzenie(a,t){if(a in this.licznik&&this.licznik[a]++,!this.ac||!this.wlaczony)return;const i=Ta[t&&t.kraina!=null?t.kraina:this._krainaDominujaca()].skala;if(a==="szklo"){const e=this.ac.currentTime;if(e-this._ostSzklo<.35)return;this._ostSzklo=e;const o=Ba(t,i)*2;this._dzwonek(o,.022,0,1.8),this._dzwonek(o*1.5,.008,.03,1.2)}else if(a==="zapalenie"){const e=Ba(t,i);this._dzwonek(e,.035,0,3.4),this._dzwonek(e*1.5,.02,.18,3),this._dzwonek(e*2,.012,.36,2.6)}else if(a==="kielek"){const e=this.ac.currentTime;if(e-this._ostKielek<.5)return;this._ostKielek=e,this._dzwonek(i[Math.floor(t.t*4.99)]*2,.012,0,1.1,"triangle")}else if(a==="krok-olbrzyma"){const e=.05+.09*(t?.bliskosc??.5);this._dzwonek(49,e,0,2.2),this._dzwonek(98,e*.35,.02,1.4,"triangle")}else if(a==="pyl")this._dzwonek(i[Math.floor(Math.random()*i.length)]*4,.006,0,.9);else if(a==="kropla")this._dzwonek(i[Math.floor(Math.random()*i.length)]*(Math.random()<.5?2:4),.004+Math.random()*.004,0,.45);else if(a==="stworzenie")[0,2,4].forEach((e,o)=>{this._dzwonek(i[e]/2,.045,o*.35,5),this._dzwonek(i[e],.02,o*.35+.15,4)});else if(a==="dzien")[0,1,2,3,4].forEach((e,o)=>this._dzwonek(i[e]*(t.stopien===2?2:1),.035,o*.22,4.5));else if(a==="grzmot"){const e=this.ac,o=e.currentTime+.5+Math.random()*1.6,s=3.2+Math.random()*1.5,n=e.createBufferSource();n.buffer=this.szum.buffer,n.loop=!0;const r=e.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(260,o),r.frequency.exponentialRampToValueAtTime(70,o+s);const h=e.createGain();h.gain.setValueAtTime(0,o),h.gain.linearRampToValueAtTime(.5,o+.08),h.gain.linearRampToValueAtTime(.22,o+.5),h.gain.linearRampToValueAtTime(.3,o+.9),h.gain.exponentialRampToValueAtTime(5e-4,o+s),n.connect(r),r.connect(h),h.connect(this.wyjscie),h.connect(this.poglos),n.start(o,Math.random()*2),n.stop(o+s+.1),this._dzwonek(41,.09,o-e.currentTime,s*.8)}else a==="pogoda"?[0,3].forEach((e,o)=>this._dzwonek(i[e]/2,.03,o*.5,5)):a==="cien"?(this._dzwonek(i[0]/2,.05,0,1.4,"triangle"),this._dzwonek(i[0]/2*.94,.04,.12,1.8,"triangle")):a==="cien-rozproszony"?this._dzwonek(i[4]*2,.02,0,1.2):a==="energia"?(this._dzwonek(i[1]*2,.04,0,1.6,"triangle"),this._dzwonek(i[3]*2,.035,.11,2,"triangle")):a==="odsloniecie"?[0,2,4].forEach((e,o)=>this._dzwonek(i[e],.04,o*.16,2.8)):a==="slad"?[0,1,2,3,4].forEach((e,o)=>this._dzwonek(i[e]*(o===4?2:1),.05,o*.13,3.2)):a==="fresk"&&[0,2,4,1,3].forEach((e,o)=>{this._dzwonek(i[e]/2,.06,o*.4,6),this._dzwonek(i[e]*2,.02,o*.4+.2,5)})}poziom(){if(!this.ac)return 0;const a=new Float32Array(this.analizator.fftSize);this.analizator.getFloatTimeDomainData(a);let t=0;for(const i of a)t+=i*i;return Math.sqrt(t/a.length)}}const Sa=[{nazwa:"wysoka",tlo:1,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"średnia",tlo:.5,swiatlo:.5,drobinki:1,flora:!0,skala:1},{nazwa:"oszczędna",tlo:.5,swiatlo:.34,drobinki:.5,flora:!0,skala:1},{nazwa:"niska",tlo:.4,swiatlo:.34,drobinki:.35,flora:!0,skala:.9},{nazwa:"minimalna",tlo:.4,swiatlo:.25,drobinki:.25,flora:!1,skala:.8}],Gi=2.5;class qi{constructor(a){this.auto=!0,this.poziom=1,this.naZmiane=a,this._ms=[],this._czas=0,this._dobre=0,this._sufit=0,this._blokada=0,this._rozgrzewka=4}get ustawienia(){return Sa[this.poziom]}ustaw(a){a==="auto"?(this.auto=!0,this._sufit=0):(this.auto=!1,this._zmien(Math.max(0,Math.min(Sa.length-1,a|0))))}_zmien(a){a!==this.poziom&&(this.poziom=a,this.naZmiane(Sa[a])),this._ms.length=0,this._czas=0,this._rozgrzewka=1}probka(a,t){if(!this.auto)return;if(this._rozgrzewka>0){this._rozgrzewka-=t;return}if(this._blokada=Math.max(0,this._blokada-t),this._ms.push(a),this._czas+=t,this._czas<Gi)return;let i=0,e=0;for(const s of this._ms)s<120&&(i+=s,e++);const o=e?i/e:16.7;this._ms=[],this._czas=0,(this.dziennik||(this.dziennik=[])).push(`${this.poziom}:${o.toFixed(1)}`),this.dziennik.length>40&&this.dziennik.shift(),o>19.5&&this.poziom<Sa.length-1?(this._blokada=this._probaWGore?600:45,this._probaWGore=!1,this._sufit=this.poziom+1,this._dobre=0,this._zmien(this.poziom+1)):o<17.4&&this.poziom>this._sufit&&this.poziom>0?++this._dobre>=4&&(this._dobre=0,this._probaWGore=!0,this._zmien(this.poziom-1)):(this._dobre=0,this._blokada===0&&(this._sufit=0))}}const Ot="iskierka-ustawienia-v1",L=(c,a,t)=>{const i=document.createElement(c);return a&&(i.className=a),t!=null&&(i.textContent=t),i};function Yi(){try{const c=JSON.parse(localStorage.getItem(Ot)||"null");if(c&&typeof c=="object")return{jakosc:"auto",glosnosc:.75,...c}}catch{}return{jakosc:"auto",glosnosc:.75}}function Xi(c){try{localStorage.setItem(Ot,JSON.stringify(c))}catch{}}class Vi{constructor(a){this.gra=a,this.otwarte=!1,this.ustawienia=Yi();const t=document.getElementById("nakladka");this.tytul=L("div","tytul"),this.tytul.innerHTML='<h1>Iskierka</h1><p class="podtytul">leć w ciemność · szkło pokaże barwy</p><p class="podpowiedz">Przytrzymaj mysz lub palec tam, dokąd iskierka ma lecieć. Klawiatura: W A S D lub strzałki.</p>',t.appendChild(this.tytul);const i=this.rzad=L("div","rzad-przyciskow");this.bDzwiek=L("button","przycisk"),this.bDzwiek.type="button",this.bDzwiek.id="b-dzwiek",this.bDzwiek.onclick=async()=>{await a.dzwiek.przelacz(),this._opiszDzwiek(),this.bDzwiek.blur()},this.bMenu=L("button","przycisk","Menu"),this.bMenu.type="button",this.bMenu.id="b-menu",this.bMenu.setAttribute("aria-haspopup","dialog"),this.bMenu.onclick=()=>this.przelacz(),i.append(this.bDzwiek,this.bMenu),t.appendChild(i),this._opiszDzwiek(),this.obrot=L("div","obrot","Obróć telefon poziomo: zobaczysz więcej świata."),t.appendChild(this.obrot),this.panel=L("div","panel"),this.panel.setAttribute("role","dialog"),this.panel.setAttribute("aria-modal","true"),this.panel.setAttribute("aria-label","Menu"),this.panel.hidden=!0;const e=L("div","okno"),o=L("div","okno-naglowek");o.appendChild(L("h2",null,"Pauza"));const s=L("div","zakladki");this.zakladki={};for(const[n,r]of[["kolekcja","Kolekcja"],["ustawienia","Ustawienia"]]){const h=L("button","zakladka",r);h.type="button",h.onclick=()=>this._pokaz(n),s.appendChild(h),this.zakladki[n]=h}o.appendChild(s),this.bWroc=L("button","przycisk glowny","Wróć do lotu"),this.bWroc.type="button",this.bWroc.id="b-wroc",this.bWroc.onclick=()=>this.przelacz(!1),o.appendChild(this.bWroc),this.tresc=L("div","okno-tresc"),e.append(o,this.tresc),this.panel.appendChild(e),this.panel.addEventListener("pointerdown",n=>{n.target===this.panel&&this.przelacz(!1)}),t.appendChild(this.panel),addEventListener("keydown",n=>{n.key==="Escape"||n.key.toLowerCase()==="p"&&!this._wPolu(n)?(n.preventDefault(),this.przelacz()):n.key.toLowerCase()==="m"&&!this._wPolu(n)?this.bDzwiek.click():n.key.toLowerCase()==="f"&&!this._wPolu(n)&&this.pelnyEkran()}),document.addEventListener("visibilitychange",()=>{document.hidden&&!this.otwarte&&a.sterowanie.poruszono&&this.przelacz(!0)}),a.sterowanie.naPierwszyRuch=()=>this.tytul.classList.add("znika"),this._miniatury=new Map,this._zakladka="kolekcja",this._zastosuj()}_wPolu(a){const t=a.target;return t&&(t.tagName==="INPUT"||t.tagName==="SELECT"||t.tagName==="TEXTAREA")}_opiszDzwiek(){const a=this.gra.dzwiek;if(!a.dostepny){this.bDzwiek.disabled=!0,this.bDzwiek.textContent="Brak dźwięku";return}this.bDzwiek.textContent=a.wlaczony?"Wycisz":"Włącz dźwięk",this.bDzwiek.setAttribute("aria-pressed",String(a.wlaczony))}_zastosuj(){const a=this.ustawienia,t=this.gra;t.jakosc.ustaw(a.jakosc==="auto"?"auto":Number(a.jakosc)),t.dzwiek.ustawGlosnosc(a.glosnosc)}przelacz(a=!this.otwarte){a!==this.otwarte&&(this.otwarte=a,this.panel.hidden=!a,this.gra.petla.pauza=a,this.gra.petla.zamrozona=a,this.rzad.classList.toggle("schowany",a),a?(this.tytul.classList.add("znika"),this._pokaz(this._zakladka),this.bWroc.focus()):(this.bMenu.blur(),this.gra.canvas.focus?.()))}_pokaz(a){this._zakladka=a;for(const[t,i]of Object.entries(this.zakladki))i.classList.toggle("wybrana",t===a);this.tresc.replaceChildren(a==="kolekcja"?this._kolekcja():this._ustawienia())}_miniatura(a,t){const i=a+"-"+t;return this._miniatury.has(i)||this._miniatury.set(i,this.gra.renderer.miniatura(a,t)),this._miniatury.get(i)}_kolekcja(){const a=this.gra.kolekcja,t=L("div","kolekcja");return t.appendChild(L("p","kolekcja-stan",`Ślady: ${a.ileSladow()} z ${a.wszystkichSladow()} · freski: ${a.ileFreskow()} z ${a.wszystkichFreskow()}`)),D.forEach((i,e)=>{const o=L("section","kolekcja-kraina");o.appendChild(L("h3",null,`${i.nazwa} · ${Wa[e].rodzaj.toLowerCase()}`));const s=L("div","siatka");for(let r=0;r<zt;r++){const h=a.maSlad(e,r),l=L("figure","kafel"+(h?" znaleziony":""));if(h){const u=new Image;u.src=this._miniatura(e,r),u.alt="",l.appendChild(u)}else l.appendChild(L("div","nieznany","?"));l.appendChild(L("figcaption",null,h?Wa[e].nazwy[r]:"jeszcze w ciemności")),s.appendChild(l)}const n=L("p","fresk"+(a.maFresk(e)?" znaleziony":""),a.maFresk(e)?"✦ "+dt[e]:"Fresk tej krainy czeka na barwne światło.");o.append(s,n),t.appendChild(o)}),t}_ustawienia(){const a=this.ustawienia,t=this.gra,i=L("div","ustawienia"),e=(f,d,z)=>{const m=L("label","pole");return m.appendChild(L("span","pole-opis",f)),m.appendChild(d),z&&m.appendChild(L("span","pole-uwaga",z)),i.appendChild(m),d},o=()=>{Xi(a),this._zastosuj()},s=L("select");s.id="u-jakosc",s.appendChild(new Option("automatyczna","auto")),Sa.forEach((f,d)=>s.appendChild(new Option(f.nazwa,String(d)))),s.value=String(a.jakosc),s.onchange=()=>{a.jakosc=s.value,o()},e("Jakość obrazu",s,"Automatyczna pilnuje płynności: najpierw upraszcza efekty, rozdzielczość rusza na samym końcu.");const n=L("input");n.type="range",n.min="0",n.max="1",n.step="0.05",n.value=String(a.glosnosc),n.id="u-glosnosc",n.oninput=()=>{a.glosnosc=Number(n.value),o()},e("Głośność",n,t.dzwiek.wlaczony?null:"Dźwięk włącza się przyciskiem w rogu ekranu.");const r=L("div","rzad"),h=L("button","przycisk",document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran");h.type="button",h.onclick=async()=>{await this.pelnyEkran(),h.textContent=document.fullscreenElement?"Wyjdź z pełnego ekranu":"Pełny ekran"};const l=L("button","przycisk","Nowy świat");l.type="button",l.onclick=()=>{Ma("ziarno",Math.floor(Math.random()*1e6)),Ma("kraina",null),Ma("x",null),location.reload()};const u=L("button","przycisk","Wyczyść kolekcję");return u.type="button",u.onclick=()=>{u.dataset.pewne?(t.kolekcja.wyczysc(),u.textContent="Kolekcja wyczyszczona",u.disabled=!0):(u.dataset.pewne="1",u.textContent="Na pewno? Naciśnij jeszcze raz")},r.append(h,l,u),i.appendChild(r),i.appendChild(L("p","pole-uwaga",`Świat nr ${t.ziarno}. Ten sam numer w adresie (?ziarno=${t.ziarno}) zawsze daje ten sam świat. Skróty: Esc lub P — pauza, M — dźwięk, F — pełny ekran.`)),i}async pelnyEkran(){try{if(document.fullscreenElement)await document.exitFullscreen();else{await document.documentElement.requestFullscreen();try{await screen.orientation?.lock?.("landscape")}catch{}}}catch{}}}const Ca=.3,Ui=1,$i=2,Hi=600,Ji=5,Qi=.1,ao=3;class to{constructor(a,t=null){this.swiat=a,this.pamiec=t,this.kielki=[],this.komorki=new Map,this.los=ut(a.ziarno^6221086),this._do=0,this._brudne=!1,this._doZapisu=0,this.wersja=0;const i=t?t.ogrod(a.ziarno):[];for(let e=0;e+3<i.length;e+=4)this._dodaj(i[e],i[e+1],i[e+2],i[e+3],1)}_dodaj(a,t,i,e,o){const s=Math.floor(a/Ca);let n=this.komorki.get(s);n||this.komorki.set(s,n={dawka:0,t,n:0}),n.n++;const r={x:a,y:this.swiat.ziemia(a)-.04,t,dl:i,rodzaj:e,faza:a*12.9898%6.283,wzrost:o};if(this.kielki.push(r),this.kielki.length>Hi){const h=this.kielki.shift(),l=this.komorki.get(Math.floor(h.x/Ca));l&&(l.n=Math.max(0,l.n-1))}return this.wersja++,r}krok(a,t){let i=!1;for(const s of this.kielki)s.wzrost<1&&(s.wzrost=Math.min(1,s.wzrost+a/Ji),i=!0);if(i&&this.wersja++,this._brudne&&(this._doZapisu-=a)<=0&&this.zapisz(),this._do-=a,this._do>0)return;this._do=Qi;const e=this.swiat,o=this.los;for(const s of t.wachlarze){if(s.sila<.08)continue;const n=s.start+s.dlugosc*1.25;if(!(s.y-n>e.ziemia(s.x)+2.5))for(let r=0;r<ao;r++){const h=o()*1.7-.85,l=s.kat+h*s.rozwarcie/2,u=Math.cos(l),f=Math.sin(l);if(!(f>-.05))for(let d=s.start+.3;d<n;d+=.3){const z=s.x+u*d,m=s.y+f*d,v=e.ziemia(z);if(m>v+.08)continue;const k=ct(h,d,s.dlugosc,s.start)*s.sila;k>.04&&!e.woda(z)&&this._naswietl(z,h*s.znak*.5+.5,k);break}}}}_naswietl(a,t,i){const e=Math.floor(a/Ca);let o=this.komorki.get(e);if(o||this.komorki.set(e,o={dawka:0,t,n:0}),o.n>=$i||(o.t+=(t-o.t)*.35,o.dawka+=i,o.dawka<Ui))return;o.dawka=0;const s=this.los,n=this._dodaj((e+.15+.7*s())*Ca,Math.max(0,Math.min(1,o.t)),.28+s()*s()*.75,s()<.45?1:0,0);this._brudne=!0,this._doZapisu=4,this.naKielek?.(n)}zapisz(){if(!this._brudne||!this.pamiec)return;this._brudne=!1;const a=[];for(const t of this.kielki)a.push(Math.round(t.x*100)/100,Math.round(t.t*100)/100,Math.round(t.dl*100)/100,t.rodzaj);this.pamiec.zapiszOgrod(this.swiat.ziarno,a)}}const At=["mgla","zacmienie","pyl","mgla","pyl","mgla"],Ft={pyl:"Deszcz szklanego pyłu",mgla:"Mgła gęstnieje",zacmienie:"Zaćmienie",burza:"Burza"},eo=.1,et=[3.5,9],it=12,jt=65,io=10,ot=[170,330],st=[70,140],oo=c=>c*c*(3-2*c);class so{constructor(){this.typ=null,this.auto=!0,this.wymuszone=!1,this.szansaBurzy=eo,this.poziom=0,this.czas=0,this.zjawisk=0,this.pyl=0,this.mgla=0,this.zacmienie=0,this.burza=0,this.blysk=0,this.piorunX=0,this.piorunZiarno=0,this.blyskow=0,this._odBlysku=99,this._doBlysku=4,this.do=st[0]+Math.random()*(st[1]-st[0]),this._doPylu=0}krok(a,t){if(!this.typ){this.auto&&(this.do-=a)<=0&&this.wywolaj(Math.random()<this.szansaBurzy?"burza":At[t],!1);return}this.czas+=a;const i=this.wymuszone||this.typ==="burza"||At[t]===this.typ,e=this.czas<it+jt&&i?1:0;this.poziom=Math.max(0,Math.min(1,this.poziom+(e>this.poziom?a/it:-a/io)));const o=oo(this.poziom);this.pyl=this.typ==="pyl"?o:0,this.mgla=this.typ==="mgla"?o:0,this.zacmienie=this.typ==="zacmienie"?o:0,this.burza=this.typ==="burza"?o:0,this._burza(a),this.pyl>.3&&(this._doPylu-=a)<=0&&(this._doPylu=.4+Math.random()*1.3,this.naPyl?.()),e===0&&this.poziom<=0&&(this.typ=null,this.zjawisk++,this.blysk=0,this.burza=0,this.do=ot[0]+Math.random()*(ot[1]-ot[0]))}wywolaj(a,t=!0){a in Ft&&(this.typ=a,this.wymuszone=t,this.czas=0,this.poziom=0,this.pyl=this.mgla=this.zacmienie=this.burza=0,this.blysk=0,this._odBlysku=99,this._doBlysku=5,this.naStart?.(a))}_burza(a){this._odBlysku+=a,this.burza>.5&&(this._doBlysku-=a)<=0&&this.blysnij();const t=this._odBlysku;this.blysk=t>1.2?0:Math.exp(-t*9)+(t>.2?.75*Math.exp(-(t-.2)*11):0),this.typ!=="burza"&&this.blysk<.01&&(this.blysk=0)}blysnij(){this._odBlysku=0,this.blyskow++,this._doBlysku=et[0]+Math.random()*(et[1]-et[0]),this.piorunX=(Math.random()*2-1)*1.3,this.piorunZiarno=Math.random()*10,this.naBlysk?.()}zakoncz(){this.typ&&(this.czas=it+jt)}}const Ka={pelnia:10,zaFresk:.35,progi:[.5,1]};class no{constructor(a,t){this.swiat=a,this.kolekcja=t,this._szkla=null,this._znane=new Map,this.naPrzebudzenie=null}_licz(){const a=this._szkla=new Map,t=this.swiat.ziarno+":";for(const i of Object.keys(this.kolekcja.szklo)){if(!i.startsWith(t))continue;const e=Number(i.slice(t.length));if(!Number.isFinite(e))continue;const o=this.swiat.segment(Math.floor(e/64)*N+N/2);a.set(o,(a.get(o)||0)+1)}}zapalono(a){if(!this._szkla)this._licz();else{const t=this.swiat.segment(a);this._szkla.set(t,(this._szkla.get(t)||0)+1)}}odswiez(){this._szkla=null}szkiel(a){return this._szkla||this._licz(),this._szkla.get(a)||0}postep(a){const t=this.kolekcja.jestZapalony(this.swiat.ziarno+":f"+a)?Ka.zaFresk:0;return Math.min(1,this.szkiel(a)/Ka.pelnia+t)}w(a){return this.swiat.mieszajSegmenty(a,t=>this.postep(t))}krok(a){const t=this.swiat.segment(a),i=this.postep(t),e=i>=Ka.progi[1]?2:i>=Ka.progi[0]?1:0,o=this._znane.get(t);this._znane.set(t,e),o!==void 0&&e>o&&this.naPrzebudzenie?.(t,e)}}const Ga=16,It={szansa:.12,prog:.9,budzenie:1.4,towarzyszy:16,odplywa:5,drobinkaCo:3.6,drobinek:4};function ro(c,a){if(a<3)return null;const t=aa(c.ziarno,7373,a);if(t()>It.szansa)return null;const i=a*Ga+t()*Ga,e=c.ziemia(i),o=c.granicaLotu(i)-1.6,s=Math.min(o,e+2+t()*3.2);return{id:a,x:i,y:s,x0:i,y0:s,faza:t()*6.283,barwa:t(),stan:0,ladunek:0,t:0,vx:0,vy:0,kier:t()<.5?1:-1,rozw:0,zanik:0,dalo:0,doDrobinki:1.5}}class lo{constructor(a){this.swiat=a,this.kawalki=new Map,this.widoczne=[],this.odeszly=new Set,this.wlaczone=!0,this.obudzonych=0,this.towarzyszy=!1,this.naPrzebudzenie=null,this.naDrobinke=null,this.naOdejscie=null}krok(a,t,i,e,o,s){const n=Math.floor((t.x-i-24)/Ga),r=Math.floor((t.x+i+24)/Ga);this.widoczne.length=0,this.towarzyszy=!1;let h=0;if(this.wlaczone)for(let l=n;l<=r;l++){if(this.odeszly.has(l))continue;let u=this.kawalki.get(l);u===void 0&&(this.kawalki.size>40&&this._przytnij(n,r),u=ro(this.swiat,l),this.kawalki.set(l,u)),u&&(this._jedno(u,a,e,o,s),u.stan===2&&(this.towarzyszy=!0,h=1),u.stan<4&&this.widoczne.push(u))}e.oslona+=(h-e.oslona)*Math.min(1,a*2)}_przytnij(a,t){for(const[i,e]of this.kawalki)(i<a||i>t)&&(!e||e.stan===0)&&this.kawalki.delete(i)}_jedno(a,t,i,e,o){const s=It;if(a.stan===0){a.x=a.x0+Math.sin(o*.3+a.faza)*.08,a.y=a.y0+Math.sin(o*.5+a.faza)*.1;const n=e.natezenie(a.x,a.y,1.4);a.ladunek=Math.max(0,Math.min(1,a.ladunek+(n>.05?t*(.5+n*1.5):-t*.08))),a.ladunek>=s.prog&&(a.stan=1,a.t=0,this.obudzonych++,this.naPrzebudzenie?.(a));return}if(a.t+=t,a.stan===1){a.rozw=Math.min(1,a.t/s.budzenie),a.rozw>=1&&(a.stan=2,a.t=0);return}if(a.stan===2){const n=i.vx+i.pradX;Math.abs(n)>.4&&(a.kier=n>0?1:-1);const r=i.x-a.kier*2.1,h=i.y+1.4+.35*Math.sin(a.t*.9+a.faza),l=i.vy+i.pradY;a.vx+=((r-a.x)*2.4-(a.vx-n)*2.2)*t,a.vy+=((h-a.y)*2.4-(a.vy-l)*2.2)*t,a.x+=a.vx*t,a.y+=a.vy*t,a.doDrobinki-=t,a.doDrobinki<=0&&a.dalo<s.drobinek&&(a.doDrobinki=s.drobinkaCo,a.dalo++,this.naDrobinke?.(a.x-a.kier*.9,a.y-.2,a)),(a.t>=s.towarzyszy||Math.hypot(i.x-a.x,i.y-a.y)>14)&&(a.stan=3,a.t=0,this.naOdejscie?.(a));return}a.vy+=.9*t,a.vx+=(a.kier*1.2-a.vx)*t,a.x+=a.vx*t,a.y+=a.vy*t,a.zanik=Math.min(1,a.t/s.odplywa),a.zanik>=1&&(a.stan=4,this.odeszly.add(a.id))}}const co=1080,H=document.getElementById("gra"),uo=document.getElementById("nakladka");function Dt(c){const a=document.createElement("div");a.className="blad",a.textContent=c,uo.appendChild(a)}function ho(){const c=Nt(H);if(!c){(window.__bledy||(window.__bledy=[])).push("brak WebGL2"),Dt("Ta przeglądarka nie udostępnia WebGL2, a Iskierka go potrzebuje.");return}const a=new ki(O.ziarno),t=new xi(c,a);ft.includes(O.warstwa)&&(t.warstwa=O.warstwa);const i=new me(O.ziarno);let e=null;const o=new bi(H),s=new ht(a),n=new Ci,r=new Fi;s.pamiec=r;const h=new Oi(a,s,r),l=new to(a,r),u=new pi,f=new so,d=new ae,z=new ni(a),m=new li(a),v=new no(a,r),k=new lo(a);let w=0;const y=new Di(r);(O.test||O.warstwa==="maska")&&(y.el.style.visibility="hidden"),r.naZmiane=()=>y.odswiez();const x=new Wi;n.naSzklo=g=>x.zdarzenie("szklo",g);const b=[(g,E)=>x.zdarzenie(g,E)],S=new Float32Array(D.length),_=(g,E)=>{for(const W of b)W(g,E)};s.naZapalenie=g=>{v.zapalono(g.x),_("zapalenie",g)},v.naPrzebudzenie=(g,E)=>{const W=D[a.krainaSegmentu(g)].nazwa;y.wiesc(E===2?`${W}: niebo rozbudzone`:`${W}: niebo jaśnieje`),_("dzien",{stopien:E})},k.naPrzebudzenie=g=>{y.wiesc("Coś się obudziło"),_("stworzenie",g)},k.naDrobinke=(g,E)=>h.dodajDrobinke(g,E),l.naKielek=g=>_("kielek",g),u.naKrok=g=>_("krok-olbrzyma",g),f.naPyl=()=>_("pyl",null),f.naBlysk=()=>_("grzmot",null),f.naStart=g=>{y.wiesc(Ft[g]),_("pogoda",{typ:g})},addEventListener("pagehide",()=>l.zapisz()),h.zdarzenie=(g,E)=>{g==="slad"?y.wiesc(Wa[E.kraina].nazwy[E.wariant]+(E.nowy?"":" (już w kolekcji)")):g==="fresk"&&y.wiesc(dt[E.kraina]);for(const W of b)W(g,E)};const p={czas:0,iskra:i,cam:{x:i.x,y:6.5},polX:ka*16/9,polY:ka};let A=1;const j=new qi(g=>{t.jakosc=g,A=g.skala,R()});t.jakosc=j.ustawienia;function R(){const g=Math.min(window.devicePixelRatio||1,2),E=H.clientWidth||innerWidth,W=H.clientHeight||innerHeight;let za=Math.min(W*g,co)*A,ma=za*E/W;ma=Math.max(320,Math.round(ma)),za=Math.max(180,Math.round(za)),(H.width!==ma||H.height!==za)&&(H.width=ma,H.height=za),p.polX=ka*ma/za,t.rozmiar(ma,za)}addEventListener("resize",R),R();function Y(g){p.czas+=g,z.krok(g,p.cam,p.polX,i),i.krok(g,e||o.odczyt(p),a),m.krok(p.cam,p.polX,i,p.czas);const E=1-Math.exp(-g*1.6);p.cam.x+=(i.x+(i.vx+i.pradX)*.5-p.cam.x)*E,p.cam.y+=(i.y+.6-p.cam.y)*E,Z(),d.krok(i,p.czas),s.krok(g,p.cam,p.polX,p.czas,i),n.aktualizuj(g,i,s.widoczne),s.laduj(g),h.krok(g,i,n,p.czas),l.krok(g,n),k.krok(g,p.cam,p.polX,i,n,p.czas),v.krok(i.x),a.deszcz(i.x)>.4&&(w-=g)<=0&&(w=.25+Math.random()*.9,_("kropla",null));const W=q[0];u.krok(g,p.cam.x*W.mnoznikX,p.polX*W.z),f.krok(g,a.krainaW(i.x)),x.aktualizuj(g,a.wagi(i.x,S)),x.spiewaj(g,n.spiewajace)}function Z(){p.cam.y=Math.max(Math.max(a.ziemia(p.cam.x)+ka-1.9,4.7),Math.min(12.4,p.cam.y))}const X=()=>({cam:p.cam,polX:p.polX,polY:p.polY,czas:p.czas,iskra:i,tecze:n.ukryte?null:n,odlamki:s.widoczne,znaleziska:h,zarosla:l,olbrzym:u,pogoda:f,podmuchy:d,prady:z,mgly:m,dzien:v,stworzenia:k});function V(g,E){E&&j.probka(E*1e3,E),i.zbudujSmuge(pa),y.energia(i.energia),y.ustawKraine(a.krainaW(i.x),a.auraSegmentu(a.segment(i.x))),t.rysuj(X())}const U=new Wt({krok:Y,rysuj:V}),fa={gotowe:!0,canvas:H,sterowanie:o,jakosc:j,stan:p,petla:U,renderer:t,swiat:a,odlamki:s,tecze:n,znaleziska:h,zarosla:l,olbrzym:u,pogoda:f,podmuchy:d,prady:z,mgly:m,dzien:v,stworzenia:k,kolekcja:r,hud:y,sluchacze:b,dzwiek:x,ziarno:O.ziarno,bledy:[],teleporty:()=>a.teleporty(),wywolajOlbrzyma(g=1,E=0){const W=q[0];u.wywolaj(p.cam.x*W.mnoznikX,p.polX*W.z,g,E)},teleport(g,E){i.przenies(g,E??a.ziemia(g)+4.5),p.cam.x=g,p.cam.y=i.y+.6,Z()},przewin(g){U.przewin(g),V()},rysuj:V,pomiar:g=>t.pomiar(X(),g),ustawWejscie(g){e=g},krainy:D,opisJakosci:()=>`jakość ${j.auto?"auto: ":""}${j.ustawienia.nazwa}`,info(){return{renderer:c.getParameter(c.RENDERER),w:H.width,h:H.height,fps:U.fps,hdr:c.ext.floatBuf}}};if(window.iskierka=fa,O.kraina){const g=a.teleporty().find(E=>E.nazwa===O.kraina);g&&fa.teleport(g.x+O.dx,a.ziemia(g.x+O.dx)+4.5+O.dy)}else O.x!=null?fa.teleport(O.x):fa.teleport(8);const Ya=fa.menu=new Vi(fa);O.jakosc!=null&&j.ustaw(O.jakosc==="auto"?"auto":Number(O.jakosc)),O.debug&&Si(fa),O.test&&(U.pauza=!0,O.jakosc==null&&j.ustaw(1),h.cienieWlaczone=!1,u.auto=!1,f.auto=!1,f.szansaBurzy=0,z.wlaczone=!1,m.wlaczone=!1,k.wlaczone=!1,a.auraWl=!1,Ya.tytul.style.display="none",Ya.rzad.style.visibility="hidden",Ya.obrot.style.visibility="hidden"),U.start()}addEventListener("error",c=>{(window.__bledy||(window.__bledy=[])).push(String(c.message))});try{ho()}catch(c){console.error(c),(window.__bledy||(window.__bledy=[])).push(String(c.message)),Dt("Nie udało się uruchomić gry: "+c.message)}
