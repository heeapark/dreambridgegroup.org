(function(){
  var D=window.I18N||{langs:['en'],units:{},pages:{},ui:{}};
  var LANGS=D.langs, KEY='dbg-lang';
  var page=(location.pathname.split('/').pop()||'index.html').replace('.html','')||'index';
  function pick(){
    var q=new URLSearchParams(location.search).get('lang');
    if(q&&LANGS.indexOf(q)>-1) return q;
    try{var s=localStorage.getItem(KEY); if(s&&LANGS.indexOf(s)>-1) return s;}catch(e){}
    var n=(navigator.language||'en').slice(0,2).toLowerCase();
    return LANGS.indexOf(n)>-1?n:'en';
  }
  function apply(lang){
    var i=LANGS.indexOf(lang); if(i<0){lang='en';i=0}
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var u=D.units[el.getAttribute('data-i18n')]; if(u&&u[i]!=null) el.innerHTML=u[i];
    });
    var p=D.pages[page]; if(p){document.title=p.title[i]; var m=document.querySelector('meta[name=description]'); if(m) m.setAttribute('content',p.desc[i]);}
    document.querySelectorAll('.langsw a').forEach(function(a){a.classList.toggle('on',a.dataset.lang===lang)});
    document.querySelectorAll('.mm summary').forEach(function(s){s.setAttribute('aria-label',D.ui.menu[i])});
    // keep the chosen language when moving between pages
    document.querySelectorAll('a[href]').forEach(function(a){
      var h=a.getAttribute('href'); if(!h||h.charAt(0)==='#'||/^(https?:|mailto:|tel:)/.test(h)) return;
      var parts=h.split('#'), base=parts[0].split('?')[0];
      a.setAttribute('href',base+(lang==='en'?'':'?lang='+lang)+(parts[1]?'#'+parts[1]:''));
    });
    try{localStorage.setItem(KEY,lang)}catch(e){}
    document.body.setAttribute('data-lang',lang);
  }
  document.addEventListener('click',function(e){
    var cd=e.target.closest&&e.target.closest('[data-href]');
    if(cd&&!e.target.closest('a')){var h=cd.getAttribute('data-href'),lg=document.documentElement.lang,pp=h.split('#');location.href=pp[0]+(lg&&lg!=='en'?'?lang='+lg:'')+(pp[1]?'#'+pp[1]:'');return;}
    var a=e.target.closest&&e.target.closest('a[data-lang]'); if(a){e.preventDefault();apply(a.dataset.lang);return;}
    var l=e.target.closest&&e.target.closest('.mmp a'); if(l){var d=l.closest('details'); if(d) d.open=false;}
  });
  /* contact forms: opens the visitor's email app. Replace with your own endpoint when a backend exists. */
  function setupForms(){
    document.querySelectorAll('form').forEach(function(f){
      var inp=f.querySelectorAll('input[type=text],input[type=email]'), sel=f.querySelector('select'), ta=f.querySelector('textarea'), cb=f.querySelector('input[type=checkbox]'), btn=f.querySelector('button');
      var names=['name','organization','country','email']; inp.forEach(function(x,i){x.name=names[i]||('f'+i)});
      if(sel) sel.name='type'; if(ta) ta.name='message'; if(cb){cb.name='consent';cb.required=true}
      if(inp[0]) inp[0].required=true; if(inp[3]) inp[3].required=true;
      if(btn) btn.type='submit';
      var note=document.createElement('p'); note.className='form-note'; note.setAttribute('role','status'); f.appendChild(note);
      f.addEventListener('submit',function(e){
        e.preventDefault(); var i=LANGS.indexOf(document.documentElement.lang); if(i<0)i=0;
        if(!f.checkValidity()){f.reportValidity();note.textContent=D.ui.fill[i];return;}
        var g=function(n){var x=f.elements[n];return x?x.value:''};
        var subject='[Website inquiry] '+(sel?sel.value:'')+' - '+g('name');
        var body='Name: '+g('name')+'\nOrganization: '+g('organization')+'\nCountry: '+g('country')+'\nEmail: '+g('email')+'\nType: '+(sel?sel.value:'')+'\n\n'+g('message');
        note.textContent=D.ui.sent[i];
        location.href='mailto:hyohyunpark@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      });
    });
  }
  function init(){apply(pick());setupForms();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
