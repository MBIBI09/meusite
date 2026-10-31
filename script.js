/* ECHO STUDIOS: interações do site (foto ampliada na galeria, depoimentos e filtro da grade). */

/* ===== Galeria: foto ampliada ===== */
(function(){
  var itens=[].slice.call(document.querySelectorAll('.galeria .item'));
  var dlg=document.getElementById('lightbox');
  if(!itens.length||!dlg) return;
  var img=dlg.querySelector('img'), leg=dlg.querySelector('.leg'), atual=0;
  function mostrar(i){
    atual=(i+itens.length)%itens.length;
    var f=itens[atual].querySelector('img');
    img.src=f.getAttribute('src'); img.alt=f.alt; leg.textContent=f.alt;
  }
  itens.forEach(function(b,i){b.addEventListener('click',function(){mostrar(i);dlg.showModal();});});
  dlg.addEventListener('click',function(e){
    var a=e.target.getAttribute&&e.target.getAttribute('data-acao');
    if(a==='proxima') mostrar(atual+1);
    else if(a==='anterior') mostrar(atual-1);
    else if(a==='fechar'||e.target===dlg) dlg.close();
  });
  dlg.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight') mostrar(atual+1);
    if(e.key==='ArrowLeft') mostrar(atual-1);
  });
})();

/* ===== Depoimentos: um de cada vez, sem troca automática ===== */
(function(){
  var deps=[].slice.call(document.querySelectorAll('#deps .dep'));
  var cont=document.getElementById('dep-contador'), atual=0;
  if(!deps.length) return;
  function mostrar(i){
    atual=(i+deps.length)%deps.length;
    deps.forEach(function(d,n){d.hidden=(n!==atual);});
    cont.textContent=(atual+1)+' de '+deps.length;
  }
  document.getElementById('dep-anterior').addEventListener('click',function(){mostrar(atual-1);});
  document.getElementById('dep-proximo').addEventListener('click',function(){mostrar(atual+1);});
  mostrar(0);
})();

/* ===== Grade semanal: filtro por estilo ===== */
(function(){
  var botoes=[].slice.call(document.querySelectorAll('.filtro'));
  var turmas=[].slice.call(document.querySelectorAll('.turma'));
  botoes.forEach(function(b){
    b.addEventListener('click',function(){
      var e=b.getAttribute('data-estilo');
      botoes.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
      turmas.forEach(function(t){
        t.classList.toggle('apagada',e!=='todos'&&t.getAttribute('data-estilo')!==e);
      });
    });
  });
})();