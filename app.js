(function(){
  const root=document.documentElement;
  const btn=document.querySelector('[data-theme-toggle]');
  let theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  const moon='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const sun='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  function apply(){root.setAttribute('data-theme',theme);btn.innerHTML=theme==='dark'?sun:moon;btn.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' mode');}
  apply();
  btn.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';apply();});

  const header=document.querySelector('.header');
  addEventListener('scroll',()=>header.classList.toggle('is-scrolled',scrollY>8),{passive:true});

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el);});

  // tabs
  const tabs=[...document.querySelectorAll('.tab')];
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>{const on=x===t;x.classList.toggle('is-active',on);x.setAttribute('aria-selected',on);document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});
  }));
  tabs.forEach((t,i)=>t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];n.focus();n.click();}}));

  // form (preview: nothing is stored)
  const form=document.getElementById('join-form');
  const status=form.querySelector('.form__status');
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.elements.namedItem('name').value.trim(), email=form.elements.namedItem('email').value.trim();
    const okEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    form.elements.namedItem('name').setAttribute('aria-invalid',!name); form.elements.namedItem('email').setAttribute('aria-invalid',!okEmail);
    status.classList.remove('is-err');
    if(!name||!okEmail){status.textContent='Please add your name and a valid email.';status.classList.add('is-err');return;}
    const role=form.querySelector('input[name=role]:checked').parentElement.textContent.trim();
    status.textContent=`Thanks, ${name.split(' ')[0]}. You're on the list as ${role.toLowerCase()}. (This is a preview, so sign-ups aren't saved yet.)`;
    form.reset();
  });
})();
