(() => {
  'use strict';
  const cfg = window.CFG, demo = window.DEMO;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  let variant = 'owner', screen = 'home', accepted = false;
  const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function heading(title, sub) { return `<div class="phone-heading"><div><small>${sub}</small><h3>${title}</h3></div><span class="avatar">${variant === 'owner' ? 'ОС' : 'КК'}</span></div>`; }
  function phoneContent(page) {
    const d = demo[variant];
    if (page === 'home') return `${heading(d.greeting, d.role)}<div class="phone-cover"><img src="images/residential-concept.png" alt="Візуалізація ЖК Затишний квартал"><span>${d.title}<small>${d.location}</small></span></div><div class="phone-health"><strong>✓ Показники в межах порогів</strong>Останнє оновлення · демо, 09:40</div><div class="phone-mini-grid"><div><b>${d.sensors}</b><span>датчиків у проєкті</span></div><div><b>${variant === 'owner' ? 3 : d.buildings}</b><span>${variant === 'owner' ? 'інженерні системи' : 'будинки на контролі'}</span></div></div><p class="phone-section-label">${variant === 'owner' ? 'Системи будинку' : 'Об’єкти кварталу'}</p>${variant === 'owner' ? demo.systems.slice(0,2).map(x=>`<div class="phone-row"><span>${x.symbol}</span><div><strong>${x.title}</strong><small>${x.state}</small></div><b>${x.value}</b></div>`).join('') : `<div class="phone-row"><span>⌂</span><div><strong>Будинки 1–2</strong><small>320 датчиків · підключено</small></div><b>✓</b></div><div class="phone-row"><span>⌂</span><div><strong>Будинки 3–4</strong><small>320 датчиків · підключено</small></div><b>✓</b></div>`}`;
    if (page === 'equipment') return `${heading('Обладнання', 'ЖК «Затишний квартал»')}<p class="phone-label">${variant === 'owner' ? 'Будинок 4 · 128 датчиків' : 'Будинок 4 · 128 із 640 датчиків проєкту'}</p>${demo.systems.map(x=>`<article class="equipment-card"><header><span>${x.symbol}</span><div><h4>${x.title}</h4><small>${x.description}</small></div></header><div class="equipment-value"><strong>${x.value}</strong><span>● ${x.state}</span></div></article>`).join('')}<div class="demo-alert"><b>Планова перевірка</b>Перевірити кріплення датчика в тепловому пункті. Це демонстраційне нагадування.</div>`;
    return `${heading('Заявки', d.role)}<p class="phone-label">${accepted ? '1 у роботі' : '1 відкрита'} · демонстраційний сценарій</p><article class="task-card"><small>${accepted ? '● У РОБОТІ' : '● ПЛАНОВА ПЕРЕВІРКА'} · № 024</small><h4>Перевірити кріплення датчика</h4><p>Тепловий пункт, будинок 4. Огляд кріплення та звірка показників після перевірки.</p><div class="task-meta">Відповідальний: черговий інженер<br>Термін: погодити час огляду</div><button type="button" data-task-action>${accepted ? 'Повернути до нових' : 'Взяти в роботу'}</button></article><div class="phone-health"><strong>Історія залишається тут</strong>Статус заявки допомагає команді бачити наступний крок.</div><p class="phone-message">Зміни працюють лише в цьому макеті та не надсилаються реальній технічній службі.</p>`;
  }
  function renderPhones() {
    if ($('#phone-screen')) $('#phone-screen').innerHTML = phoneContent(screen);
    $$('[data-fixed-screen]').forEach(el => { el.innerHTML = phoneContent(el.dataset.fixedScreen); });
    $$('[data-screen]').forEach(el => { const on = el.dataset.screen === screen; el.setAttribute('aria-pressed', String(on)); el.classList.toggle('active',on); });
    $$('[data-variant]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.variant === variant)));
    const name = $('#variant-title'); if (name) name.textContent = variant === 'owner' ? 'ОСББ / власник' : 'Керуюча компанія';
  }
  document.addEventListener('click', e => {
    const page = e.target.closest('[data-screen]');
    if (page) { screen = page.dataset.screen; renderPhones(); }
    const choice = e.target.closest('[data-variant]');
    if (choice) { variant = choice.dataset.variant; renderPhones(); }
    if (e.target.closest('[data-task-action]')) { accepted = !accepted; renderPhones(); }
  });
  renderPhones();
  $('#print-screens')?.addEventListener('click', () => window.print());
  const themeButton = $('#theme');
  function setTheme(value) { document.documentElement.dataset.theme = value; if(themeButton) themeButton.setAttribute('aria-label', value === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'); }
  try { if(themeButton) setTheme(localStorage.getItem('dbe-theme') || 'light'); } catch (_) { setTheme('light'); }
  themeButton?.addEventListener('click',()=> {const value=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(value);try{localStorage.setItem('dbe-theme',value);}catch(_){}});
  $('#menu')?.addEventListener('click',()=> {const open=$('#navigation').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));$('#menu').setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');});
  function closeMenu(){ $('#navigation')?.classList.remove('open');$('#menu')?.setAttribute('aria-expanded','false');$('#menu')?.setAttribute('aria-label','Відкрити меню'); }
  $$('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  if ($('#contact-email')) { $('#contact-email').textContent=cfg.CONTACT_EMAIL+' ↗';if(cfg.CONTACT_VERIFIED) $('#contact-email').href='mailto:'+cfg.CONTACT_EMAIL; else $('#contact-email').removeAttribute('href'); }
  if ($('#contact-phone')) { $('#contact-phone').textContent=cfg.CONTACT_PHONE_LABEL+' ↗';if(cfg.CONTACT_VERIFIED && cfg.CONTACT_PHONE) $('#contact-phone').href='tel:'+cfg.CONTACT_PHONE; else $('#contact-phone').removeAttribute('href'); }
  if (cfg.ADDRESS && $('#contact-address')) {$('#contact-address').hidden=false;$('#contact-address').innerHTML='<span>Адреса</span>'+esc(cfg.ADDRESS);}
  if(cfg.STANDARD_PRICE && $('#price-standard')) $('#price-standard').textContent=cfg.STANDARD_PRICE;
  if(cfg.PREMIUM_PRICE && $('#price-premium')) $('#price-premium').textContent=cfg.PREMIUM_PRICE;
  const form=$('#contact-form');
  let selectedPlan='';
  $$('[data-plan]').forEach(a=>a.addEventListener('click',()=>{selectedPlan=a.dataset.plan==='premium'?'Premium':'Стандарт';}));
  let draft='';
  form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const sensors=data.get('sensors');const plan=sensors?(Number(sensors)<=cfg.STANDARD_SENSOR_LIMIT?'Стандарт':'Premium'):(selectedPlan||'Потрібна консультація');draft=`Заявка на пілот Digital Building Engineer\n\nІм’я: ${data.get('name')}\nEmail: ${data.get('email')}\nОрганізація / об’єкт: ${data.get('organization')}\nТип: ${data.get('building_type')}\nДатчиків: ${sensors||'Не визначено'}\nФормат: ${plan}\n\n${data.get('message')||''}`;$('#email-draft').value=draft;$('#email-fallback').hidden=false;$('#form-status').textContent=cfg.CONTACT_VERIFIED?'Лист підготовлено. Якщо пошта не відкрилася, скопіюйте текст нижче та надішліть його на '+cfg.CONTACT_EMAIL+'.':'Заявку підготовлено. Скопіюйте текст нижче. У демоверсії надсилання вимкнено.';if(cfg.CONTACT_VERIFIED) window.location.href='mailto:'+cfg.CONTACT_EMAIL+'?subject='+encodeURIComponent('Заявка на пілот — '+data.get('organization'))+'&body='+encodeURIComponent(draft);});
  $('#copy-draft')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(draft);$('#form-status').textContent=cfg.CONTACT_VERIFIED?'Текст скопійовано. Вставте його в лист на '+cfg.CONTACT_EMAIL+'.':'Текст заявки скопійовано. Збережіть його до уточнення контактів.';}catch(_){$('#email-draft').focus();$('#email-draft').select();$('#form-status').textContent='Текст виділено. Скопіюйте його за допомогою Ctrl+C або меню копіювання.';}});
})();
