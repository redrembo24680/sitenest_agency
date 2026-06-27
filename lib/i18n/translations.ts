export type Language = 'uk' | 'en';

export const translations = {
  uk: {
    // NAV
    nav: {
      home: 'Головна',
      services: 'Послуги',
      team: 'Команда',
      blog: 'Блог',
      contact: 'Контакти',
      process: 'Процес',
      portfolio: 'Портфоліо',
      orderProject: 'Замовити проект',
    },

    // FOOTER
    footer: {
      tagline: 'Будуємо інноваційні, швидкі та безпечні веб-сайти для розвитку вашого бізнесу. 100% фокус на якості та швидкодії.',
      navigation: 'Навігація',
      services: 'Послуги',
      contacts: 'Контакти',
      copyright: 'Усі права захищено.',
      slogan: 'We Build Smart Websites. Designed for Speed & Conversion.',
    },

    // HOME
    home: {
      badge: 'SiteNest Agency 2026',
      heroTitle1: 'Будуємо',
      heroTitleHighlight: 'Розумні Сайти',
      heroTitle2: 'Для Вашого Бізнесу',
      heroDesc: "Ми — команда з 4 профільних експертів. Об'єднуємо передовий Front-end, масштабований Back-end, надійний DevOps та креативний SMM маркетинг в єдиний злагоджений механізм.",
      ourServices: 'Наші Послуги',
      orderProject: 'Замовити проект',

      statsUptime: 'Uptime Серверів',
      statsPagespeed: 'Оптимізація PageSpeed',
      statsConversion: 'Зростання конверсії',
      statsExperts: 'Вузькопрофільні експерти',

      whatWeDo: 'що ми робимо',
      servicesTitle: 'Комплексні',
      servicesTitleHighlight: 'Послуги Агенції',
      learnMore: 'Детальніше',

      ourWork: 'наші роботи',
      portfolioTitle: 'Останні',
      portfolioTitleHighlight: 'Кейси',
      portfolioTitleSuffix: 'Команди',
      allProjects: 'Усі проекти',
      development: 'Розробка',
      devops: 'DevOps / Хмари',
      marketing: 'SMM / Маркетинг',
      viewCase: 'Дивитись кейс',

      // CTA Banner
      ctaTitle1: 'Готові побудувати',
      ctaTitleHighlight: 'щось масштабне',
      ctaTitle2: '?',
      ctaDesc: 'Напишіть нам, і ми розробимо детальний технічний план та оцінку проекту безкоштовно.',
      ctaBtn: "Зв'язатись з нами",

      // Testimonials
      testimonialsSubtitle: 'відгуки клієнтів',
      testimonialsTitle: 'Що кажуть про нас',
      testimonialsTitleHighlight: 'клієнти',
    },

    // SERVICES
    services: {
      subtitle: 'експертиза',
      title: 'Наші',
      titleHighlight: 'Послуги',
      desc: 'Ми надаємо повний спектр цифрових послуг — від першого рядка коду до виведення в топ пошукових запитів.',

      frontendTitle: 'Front-end Розробка',
      frontendDesc: 'Створюємо надшвидкі SPA та SSR додатки на React, Next.js та TypeScript. Ми фокусуємось на чистоті коду, семантиці, доступності та максимальній інтерактивності.',

      backendTitle: 'Back-end Інжиніринг',
      backendDesc: 'Проектуємо архітектуру серверів на Node.js та Python. Ми розробляємо API, які витримують колосальні навантаження, забезпечуємо надійне збереження даних та шифрування.',

      devopsTitle: 'DevOps & Хмарні Системи',
      devopsDesc: 'Організовуємо хмарну інфраструктуру, налаштовуємо CI/CD конвеєри розгортання та стежимо за продуктивністю серверів. Оптимізуємо витрати на хмари.',

      smmTitle: 'SMM & SEO Просування',
      smmDesc: 'Наповнюємо проект цільовим трафіком. Ми ведемо рекламні компанії Meta Ads, займаємось пошуковою оптимізацією блогів та налаштовуємо аналітику воронки.',

      frontendBenefit1: 'Повна адаптивність під усі мобільні пристрої',
      frontendBenefit2: 'Оптимальна структура під SEO-роботів',
      frontendBenefit3: 'Швидкість рендерингу (LCP < 2 сек)',

      backendBenefit1: 'Безпечна обробка транзакцій та Stripe/LiqPay',
      backendBenefit2: 'Кешування даних для прискорення запитів',
      backendBenefit3: 'Інтеграція з CRM-системами та ERP шлюзами',

      devopsBenefit1: 'Захист від DDoS атак та SSL сертифікація',
      devopsBenefit2: 'Автоматичний бекап даних кожні 24 години',
      devopsBenefit3: 'Гарантія безперебійної роботи ресурсів 99.9%',

      smmBenefit1: 'Органічне та платне залучення трафіку',
      smmBenefit2: 'Створення унікального фірмового стилю та банерів',
      smmBenefit3: 'Зниження вартості залучення ліда (CPA/CAC)',

      // Calculator
      calcSubtitle: 'прозоре ціноутворення',
      calcTitle: 'Калькулятор',
      calcTitleHighlight: 'Вартості Проекту',
      step1: 'Оберіть тип вашого сайту',
      step2: 'Додаткові послуги та інтеграції',
      landingTitle: 'Landing Page',
      landingDesc: 'Односторінковий промо-сайт з високою конверсією. Від $150.',
      corporateTitle: 'Корпоративний сайт',
      corporateDesc: 'Багатосторінковий бізнес-ресурс з блогом. Від $250.',
      ecommerceTitle: 'Інтернет-магазин',
      ecommerceDesc: 'Магазин з кошиком, кабінетом та оплатами. Від $400.',
      pagesLabel: 'Кількість унікальних сторінок',
      page1: '1 сторінка',
      page30: '30 сторінок',
      devopsAddon: 'Налаштування DevOps та CDN (+ $50)',
      devopsAddonDesc: 'Docker, SSL, кешування Cloudflare та надійний хостинг.',
      smmAddon: 'SMM Starter та SEO (+ $100)',
      smmAddonDesc: 'Аналіз аудиторії, налаштування реклами, базове SEO.',
      apiAddon: 'API та інтеграції з CRM (+ $100)',
      apiAddonDesc: 'Підключення сайту до CRM, Telegram ботів, платіжних шлюзів.',
      estimatedCost: 'Орієнтовна вартість',
      disclaimer: '*Ціна є орієнтовною. Залиште заявку для точного розрахунку.',
      orderCalc: 'Замовити розрахунок',
    },

    // SERVICE DETAILS
    serviceDetails: {
      backBtn: '← Назад до послуг',
      ctaTitle: 'Готові обговорити проект?',
      ctaDesc: 'Зв’яжіться з нами, щоб отримати персоналізовану пропозицію та безкоштовну консультацію від наших експертів.',
      ctaBtn: 'Почати проект',
      keyFeaturesTitle: 'Ключові напрямки роботи',
      techStackTitle: 'Технологічний стек',
      workflowTitle: 'Етапи реалізації проекту',
      faqTitle: 'Часті запитання',
      frontend: {
        title: 'Front-end Розробка Надвисокого Рівня',
        tagline: 'Створюємо надшвидкі, адаптивні та інтерактивні інтерфейси з фокусом на UX.',
        metaTitle: 'Front-end Розробка Надвисокого Рівня | SiteNest Agency',
        metaDesc: 'Професійна front-end розробка надвисокого рівня для бізнесу. Створення швидких, адаптивних та оптимізованих інтерфейсів на React та Next.js з високим PageSpeed.',
        desc1: 'Front-end розробка надвисокого рівня — це обличчя вашого бізнесу в сучасному цифровому світі. Ми створюємо не просто стандартні веб-сторінки, а високопродуктивні Single Page Applications (SPA) та Server-Side Rendering (SSR) додатки, які завантажуються миттєво та працюють плавно на будь-якому пристрої. Наш підхід базується на ретельній оптимізації коду, що дозволяє досягти максимальних показників продуктивності та надійності.',
        desc2: 'Кожен рядок нашої front-end розробки оптимізований для пошукових роботів (SEO) та повністю відповідає сучасним стандартам доступності (WCAG). Ми інтегруємо складні інтерактивні анімації за допомогою бібліотек GSAP та Framer Motion, забезпечуючи плавні переходи та привабливі мікро-інтеракції зі швидкістю 60 кадрів на секунду. Це дозволяє зацікавити користувача з перших секунд перебування на сайті та значно підвищити конверсію.',
        features: [
          'Розробка на React.js та Next.js для забезпечення максимальної масштабованості та SEO-оптимізації вашого ресурсу.',
          'Створення плавних анімацій інтерфейсу за допомогою GSAP та Framer Motion зі швидкістю рендерингу 60 кадрів/сек.',
          'Повна адаптивність під усі види мобільних пристроїв та планшетів з використанням методології Mobile-First.',
          'Глибока оптимізація показників Core Web Vitals (LCP < 2 сек, CLS < 0.1, INP < 200 мс) для максимального PageSpeed.',
          'Чиста семантична верстка HTML5, сучасний CSS3 / Tailwind та повна відповідність вимогам доступності Web Accessibility.'
        ],
        technologies: ['React.js', 'Next.js', 'TypeScript', 'HTML5 / CSS3', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Redux / Zustand'],
        workflowSteps: [
          { title: 'Аналіз макетів Figma', desc: 'Детально вивчаємо дизайнерські макети, погоджуємо сітку, інтерактивні стани елементів, ховери та майбутні анімації.' },
          { title: 'Створення компоненту', desc: 'Створюємо модульну структуру проекту на React/Next.js з використанням TypeScript для забезпечення надійності коду.' },
          { title: 'Інтеграція анімацій та логіки', desc: 'Додаємо інтерактивність, інтегруємо форми, стейт-менеджери (Zustand/Redux) та налаштовуємо плавні переходи.' },
          { title: 'Оптимізація та тестування', desc: 'Тестуємо інтерфейс на різних мобільних пристроях, виправляємо зсуви макету (CLS) та доводимо PageSpeed до 95-100%.' }
        ],
        faqItems: [
          { q: 'Чому важливо замовляти професійну front-end розробку?', a: 'Якісний інтерфейс безпосередньо впливає на конверсію. Якщо сайт завантажується довше 3 секунд або відображається некоректно на мобільному телефоні, ви втрачаєте до 50% потенційних клієнтів.' },
          { q: 'Які технології ви використовуєте для розробки інтерфейсів?', a: 'Основним нашим стеком є React.js, Next.js та TypeScript. Це дозволяє будувати швидкі додатки із серверним рендерингом, що є критично важливим для SEO.' },
          { q: 'Як ви забезпечуєте швидкість завантаження сторінок?', a: 'Ми оптимізуємо зображення (WebP/AVIF), застосовуємо ліниве завантаження компонентів, мінімізуємо обсяг CSS та JS файлів, а також налаштовуємо правильне кешування на рівні сервера.' }
        ]
      },
      backend: {
        title: 'Back-end Інжиніринг та Безпечні API',
        tagline: 'Проектуємо стійку архітектуру, високопродуктивні бази даних та інтеграції.',
        metaTitle: 'Back-end Інжиніринг та Безпечні API | SiteNest Agency',
        metaDesc: 'Професійний back-end інжиніринг та розробка безпечних API на Node.js та Python. Проектування баз даних PostgreSQL та Redis для високих навантажень.',
        desc1: 'Надійний back-end інжиніринг та безпечні API — це ядро та мозок будь-кої сучасної цифрової системи. Наша веб-агенція розробляє стійку серверу логіку на Node.js (NestJS) та Python (FastAPI), яка здатна безперебійно витримувати колосальні навантаження та забезпечувати максимальну безпеку при обробці конфіденційної інформації користувачів. Ми приділяємо особливу увагу швидкодії обробки кожного запиту.',
        desc2: 'Наші експерти проектують оптимізовані бази даних PostgreSQL та MongoDB, впроваджуючи складні методи індексації, реплікації та пулінгу з’єднань для миттєвого доступу до даних. Ми активно інтегруємо Redis для кешування та черги повідомлень (RabbitMQ) для асинхронного виконання фонових процесів, що мінімізує затримки та гарантує, що ваші безпечні API працюють швидко та безвідмовно.',
        features: [
          'Розробка серверних додатків на базі сучасних фреймворків Node.js (NestJS) та Python (FastAPI / Django).',
          'Проектування, міграція та оптимізація реляційних баз даних (PostgreSQL) та NoSQL рішень (MongoDB).',
          'Впровадження ефективного кешування даних за допомогою Redis для прискорення відповіді сервера.',
          'Створення та документування безпечних API (REST, GraphQL) з авторизацією через JWT та OAuth2.',
          'Швидка інтеграція зовнішніх платіжних систем (Stripe, LiqPay, PayPal) та складних CRM/ERP шлюзів.'
        ],
        technologies: ['Node.js', 'NestJS', 'Express.js', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'REST / GraphQL', 'WebSockets', 'Stripe / LiqPay'],
        workflowSteps: [
          { title: 'Проектування бази даних', desc: 'Створюємо схему зв\'язків таблиць, плануємо індекси та оптимізуємо структуру для швидких SQL-запитів.' },
          { title: 'Розробка архітектури API', desc: 'Створюємо ендпоінти, налаштовуємо валідацію вхідних даних та обробку помилок за стандартами Clean Architecture.' },
          { title: 'Впровадження безпеки', desc: 'Налаштовуємо шифрування паролів (bcrypt), захист від ін\'єкцій, обмеження частоти запитів (Rate Limiting) та CORS політики.' },
          { title: 'Інтеграція та тестування', desc: 'Пишемо юніт-тести, інтегруємо платіжні шлюзи та проводимо навантажувальне тестування серверної частини.' }
        ],
        faqItems: [
          { q: 'Що таке back-end інжиніринг та безпечні API?', a: 'Це розробка внутрішньої логіки сайту, яка прихована від користувача. Сюди входить обробка даних, робота з базою даних, авторизація та безпечна передача даних через API.' },
          { q: 'Яку базу даних краще обрати для проекту?', a: 'Для більшості бізнес-задач з чітко структурованими даними ми обираємо PostgreSQL. Якщо ж потрібна робота з гнучкими неструктурованими даними, ми використовуємо MongoDB.' },
          { q: 'Як ви захищаєте дані користувачів на сервері?', a: 'Ми використовуємо сучасні стандарти шифрування SSL/TLS, хешуємо паролі, впроваджуємо токени авторизації та обмежуємо доступ до API для підозрілих IP-адрес.' }
        ]
      },
      devops: {
        title: 'DevOps & Хмарна Інфраструктура',
        tagline: 'Автоматизуємо розгортання, забезпечуємо стабільність та захист 24/7.',
        metaTitle: 'DevOps & Хмарна Інфраструктура | SiteNest Agency',
        metaDesc: 'Налаштування DevOps та хмарної інфраструктури (AWS, DigitalOcean). Автоматизація CI/CD, Docker контейнеризація, захист Cloudflare та бекапи.',
        desc1: 'Сучасна DevOps & хмарна інфраструктура є фундаментом стабільної та швидкої роботи будь-якого веб-сервісу. Ми будуємо відмовостійкі хмарні системи, де автоматизована DevOps інженерія дозволяє вашому додатку автоматично масштабуватися під час пікових навантажень. Контейнеризація Docker та оркестрація Kubernetes забезпечують ідеальну ізоляцію сервісів.',
        desc2: 'Ми налаштовуємо надійні CI/CD конвеєри розгортання за допомогою GitHub Actions, повністю виключаючи людський фактор при випуску нових релізів. Використання Cloudflare CDN та Web Application Firewall (WAF) гарантує надійний захист від DDoS-атак, а налаштована нами хмарна інфраструктура забезпечує цілісність ваших даних через щоденне автоматичне резервне копіювання.',
        features: [
          'Контейнеризація додатків за допомогою Docker та розгортання в Kubernetes для легкого масштабування.',
          'Професійне управління хмарами AWS, DigitalOcean та автоматизація інфраструктури (IaC: Terraform).',
          'Побудова автоматизованих конвеєрів CI/CD (GitHub Actions) для тестування та деплою без простоїв.',
          'Тонке налаштування веб-сервера Nginx, кешування та захисту на рівні Cloudflare CDN.',
          'Налаштування цілодобового моніторингу серверів (Prometheus / Grafana) та сповіщень про інциденти.'
        ],
        technologies: ['Docker', 'Kubernetes', 'AWS', 'DigitalOcean', 'GitHub Actions', 'Nginx', 'Cloudflare CDN', 'Terraform', 'SSL / TLS', 'Prometheus / Grafana'],
        workflowSteps: [
          { title: 'Аудит інфраструктури', desc: 'Аналізуємо поточні сервери, визначаємо слабкі місця в продуктивності та прораховуємо витрати на хмари.' },
          { title: 'Контейнеризація Docker', desc: 'Створюємо Dockerfile для кожного сервісу, оптимізуємо розмір образів та налаштовуємо docker-compose.' },
          { title: 'Налаштування CI/CD конвеєра', desc: 'Пишемо сценарії автоматичного складання, тестування та безпечного деплою на сервер при кожному пуші.' },
          { title: 'Захист та Моніторинг', desc: 'Підключаємо Cloudflare WAF, налаштовуємо SSL сертифікати, графіки навантаження Grafana та алерти в Telegram.' }
        ],
        faqItems: [
          { q: 'Навіщо моєму бізнесу DevOps та хмарна інфраструктура?', a: 'DevOps дозволяє автоматизувати оновлення сайту без зупинки його роботи, а правильно налаштована хмарна інфраструктура знижує витрати на сервери та гарантує роботу сайту 24/7.' },
          { q: 'Як хмарна інфраструктура захищена від DDoS-атак?', a: 'Ми інтегруємо захисні фільтри Cloudflare, які розпізнають та блокують шкідливий трафік ще до того, як він дійде до вашого основного сервера.' },
          { q: 'Що станеться у разі технічного збою на сервері?', a: 'Завдяки налаштованій системі автоматичного бекапу кожні 24 години та реплікації даних, ми можемо відновити повну працездатність сайту за лічені хвилини.' }
        ]
      },
      smm: {
        title: 'SMM & SEO Просування',
        tagline: 'Залучаємо цільовий трафік, покращуємо конверсії та будуємо бренд.',
        metaTitle: 'SMM & SEO Просування | Комплексний Маркетинг | SiteNest',
        metaDesc: 'Професійне SMM & SEO просування сайтів. Запуск таргетованої реклами Meta Ads (Facebook/Instagram), пошукова оптимізація Google та GA4 аналітика.',
        desc1: 'Ефективне SMM & SEO просування — це основа успішного залучення клієнтів у цифрову епоху. Чудовий сайт не принесе прибутку, якщо про нього ніхто не знає. Наша агенція будує комплексні маркетингові стратегії, поєднуючи технічне пошукове SEO просування для органічного трафіку в Google та таргетовану рекламу SMM у соціальних мережах Meta.',
        desc2: 'Ми детально досліджуємо цільову аудиторію та створюємо унікальний текстовий та графічний контент, який виділяє ваш бренд на фоні конкурентів. Проводячи постійне A/B тестування рекламних банерів та налаштовуючи наскрізну веб-аналітику через Google Analytics 4 (GA4), ми постійно знижуємо вартість залучення одного ліда (CPA/CAC).',
        features: [
          'Запуск та щоденне ведення таргетованої реклами у соціальних мережах через Meta Ads Manager (Facebook, Instagram).',
          'Глибока внутрішня та зовнішня SEO оптимізація (збір семантичного ядра, налаштування мета-тегів, лінкбілдінг).',
          'Створення унікальних оптимізованих текстів (SEO Copywriting) для блогових та посадкових сторінок сайту.',
          'Налаштування Google Analytics 4 та Google Tag Manager для точного відстеження конверсій та дій користувачів.',
          'Регулярне проведення спліт-тестів (A/B Testing) для банерів та заголовків з метою підвищення конверсії.'
        ],
        technologies: ['Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'SEO Copywriting', 'Ahrefs / SEMrush', 'Figma (Banners)', 'A/B Testing', 'Insta Growth'],
        workflowSteps: [
          { title: 'Маркетинговий аудит', desc: 'Аналізуємо конкурентів, збираємо пошукові запити (семантику) та визначаємо болі вашої цільової аудиторії.' },
          { title: 'Технічна SEO оптимізація', desc: 'Виправляємо помилки індексації, налаштовуємо sitemap.xml, robots.txt, canonical лінки та структуру заголовків.' },
          { title: 'Запуск рекламних кампаній', desc: 'Розробляємо дизайн рекламних креативів у Figma, пишемо продаючі тексти та налаштовуємо таргетинг.' },
          { title: 'Аналітика та оновлення', desc: 'Аналізуємо результати щотижня в GA4, вимикаємо неефективні оголошення та масштабуємо успішні зв\'язки.' }
        ],
        faqItems: [
          { q: 'Чому важливо поєднувати SMM & SEO просування?', a: 'SEO забезпечує стабільний та безкоштовний органічний трафік у довгостроковій перспективі, тоді як SMM та таргетована реклама дають швидкі продажі відразу після запуску.' },
          { q: 'Коли я побачу перші результати від SEO оптимізації?', a: 'Перші результати (покращення позицій у Google та зростання органіки) зазвичай стають помітними через 2-4 місяці після проведення технічних робіт.' },
          { q: 'Який бюджет потрібен на таргетовану рекламу в Meta?', a: 'Ми рекомендуємо починати з тестового бюджету від $150-200 на місяць для оцінки вартості клієнта та ефективності рекламних креативів.' }
        ]
      },
      ai_integration: {
        title: 'Впровадження штучного інтелекту в бізнесі',
        tagline: 'Автономні AI-агенти та безшовна інтеграція ChatGPT для автоматизації рутини.',
        metaTitle: 'Впровадження штучного інтелекту в бізнесі | SiteNest Agency',
        metaDesc: 'Професійне впровадження штучного інтелекту в бізнесі. Інтеграція ChatGPT API, Claude, Groq, розробка автономних ШІ-агентів та розумних ботів.',
        desc1: 'Сьогодні впровадження штучного інтелекту в бізнесі — це не просто модний тренд, а життєво необхідний крок для автоматизації рутинних процесів та випередження конкурентів. Наша команда виконує безшовну інтеграцію мовних моделей ChatGPT (OpenAI API), Claude та Groq у ваші корпоративні сайти, CRM-системи та Telegram-боти.',
        desc2: 'Ми розробляємо спеціалізованих AI-агентів та чат-ботів на базі сучасних архітектур (LangChain, LlamaIndex), які здатні самостійно вести продажі, кваліфікувати лідів, аналізувати великі обсяги документів та надавати точні відповіді клієнтам 24/7 без помилок та галюцинацій. Впровадження штучного інтелекту в бізнесі дозволяє автоматизувати до 80% рутинної роботи.',
        features: [
          'Безпечна інтеграція ChatGPT та інших LLM у корпоративні системи.',
          'Розробка автономних AI-агентів для збору даних та виконання задач.',
          'Налаштування Vector Databases (Pinecone) для пошуку по базі знань компанії.',
          'Створення "розумних" ботів-консультантів, що продають 24/7.',
          'Впровадження штучного інтелекту для фінансової аналітики та моніторингу.'
        ],
        technologies: ['OpenAI API', 'LangChain', 'Python (FastAPI)', 'Pinecone (Vector DB)', 'Claude 3', 'Groq', 'Next.js'],
        workflowSteps: [
          { title: 'Аналіз бізнес-процесів', desc: 'Вивчаємо рутинні завдання вашої команди, які можна автоматизувати за допомогою штучного інтелекту.' },
          { title: 'Проектування AI архітектури', desc: 'Обираємо відповідну модель (GPT-4, Claude), розробляємо системні промпти та логіку обробки даних.' },
          { title: 'Розробка та підключення баз знань', desc: 'Наповнюємо векторну базу Pinecone документами scroll та правилами вашої компанії для точних відповідей AI.' },
          { title: 'Тестування та оптимізація', desc: 'Проводимо симуляцію діалогів, калібруємо системні промпти для уникнення галюцинацій та запускаємо в роботу.' }
        ],
        faqItems: [
          { q: 'Як впровадження штучного інтелекту в бізнесі допомагає економити?', a: 'AI-консультант може одночасно спілкуватися з тисячами клієнтів, обробляти замовлення та відповідати на запитання, замінюючи цілий штат менеджерів підтримки.' },
          { q: 'Чи не буде штучний інтелект вигадувати неправдиву інформацію?', a: 'Для уникнення цього ми використовуємо технологію RAG (Retrieval-Augmented Generation) та векторні бази знань, що змушує AI відповідати суворо за наданими інструкціями.' },
          { q: 'Чи безпечно інтегрувати ChatGPT з корпоративними даними?', a: 'Так, при підключенні через офіційне API (OpenAI API), компанія гарантує, що ваші дані не використовуються для навчання публічних моделей і залишаються конфіденційними.' }
        ]
      },
      web_scraping: {
        title: 'Професійний парсинг сайтів та збір даних',
        tagline: 'Автоматизований веб-скрапінг, розробка складних парсерів та безперервний моніторинг ринку.',
        metaTitle: 'Професійний парсинг сайтів та збір даних | SiteNest Agency',
        metaDesc: 'Замовити професійний парсинг сайтів та збір даних. Розробка парсерів на Python, обхід захисту Cloudflare, автоматичний збір цін та моніторинг спредів.',
        desc1: 'Сьогодні професійний парсинг сайтів та збір даних — це найважливіший інструмент для аналізу ринку та прийняття рішень. Наша агенція розробляє надійні автоматизовані парсери на Python (Playwright, Scrapy), які здатні збирати інформацію з динамічних веб-ресурсів (SPA), успішно обходячи складні блоки захисту, капчі та ліміти запитів.',
        desc2: 'Ми маємо величезний практичний досвід у створенні систем безперервного моніторингу: від відстеження фінансових спредів (USDT/UAH на P2P-платформах) до регулярної вигрузки цін конкурентів, ігрової статистики Steam та скінів CS2. Замовляючи у нас професійний парсинг сайтів та збір даних, ви отримуєте повністю автоматизовану систему аналітики.',
        features: [
          'Парсинг динамічних сайтів (React/Next.js) за допомогою Playwright.',
          'Обхід Anti-Bot систем (Cloudflare, Datadome) через ротацію проксі.',
          'Безперервний фінансовий моніторинг (крипта, фіат, P2P-спреди).',
          'Автоматизований моніторинг цін конкурентів для інтернет-магазинів.',
          'Скрапінг маркетплейсів та ігрової індустрії (Steam, CS2) для аналітики.'
        ],
        technologies: ['Playwright', 'Puppeteer', 'Python', 'Node.js', 'Proxy Rotation', 'BeautifulSoup', 'PostgreSQL'],
        workflowSteps: [
          { title: 'Аналіз джерела даних', desc: 'Досліджуємо цільовий сайт, вивчаємо структуру його DOM-дерева або шукаємо приховані API-ендпоінти.' },
          { title: 'Написання алгоритму збору', desc: 'Розробляємо парсер на Python, який імітує поведінку реального користувача для уникнення блокувань.' },
          { title: 'Налаштування обходу захисту', desc: 'Підключаємо ротацію проксі-серверів, сервіси автоматичного розв\'язання капч та імітацію заголовків.' },
          { title: 'Налаштування експорту та розкладу', desc: 'Запускаємо парсер за розкладом (cron) та реалізуємо автоматичне збереження даних у PostgreSQL.' }
        ],
        faqItems: [
          { q: 'Чи є парсинг сайтів законним процесом?', a: 'Збір публічної інформації, яка знаходиться у відкритому доступі в інтернеті (наприклад, ціни чи характеристики товарів), є абсолютно законним.' },
          { q: 'Як ви боретеся з блокуванням парсера сайтами?', a: 'Ми використовуємо резидентні проксі, які часто змінюють IP-адреси, а також інструменти Playwright, що імітують рухи мишки та кліки реальної людини.' },
          { q: 'В якому форматі я буду отримувати зібрані дані?', a: 'Ми можемо налаштувати вигрузку в Excel-таблиці, Google Sheets, файли JSON/CSV або безпосередньо імпортувати дані у вашу базу даних чи CRM-систему.' }
        ]
      },
      telegram_bots: {
        title: 'Розробка телеграм ботів для B2B',
        tagline: 'Багатоканальні системи сповіщень, автоматизація бізнесу та розумні AI-асистенти.',
        metaTitle: 'Розробка телеграм ботів для B2B | SiteNest Agency',
        metaDesc: 'Професійна розробка телеграм ботів для B2B. Створення систем алертів (AnyAlert), ботів для P2P-трейдингу, інтеграція платіжних систем та ШІ-агентів.',
        desc1: 'Сьогодні професійна розробка телеграм ботів для B2B сегменту — це найкращий спосіб автоматизувати взаємодію з клієнтами та оптимізувати внутрішні робочі процеси. Ми створюємо не просто прості автовідповідачі, а потужні корпоративні екосистеми, які повністю замінюють окремі додатки та економлять ваш час.',
        desc2: 'Наш B2B досвід включає проектування складних багатоканальних систем сповіщень (архітектура AnyAlert), розробку ботів для P2P-трейдингу з моніторингом фінансових спредів, а також інтеграцію штучного інтелекту (ChatGPT). Замовляючи розробку телеграм ботів для B2B, ви отримуєте потужний інструмент з інтеграцією платіжних систем (Stripe, LiqPay) та CRM.',
        features: [
          'Розробка ботів для інтернет-магазинів із вбудованою оплатою (Stripe, LiqPay).',
          'Створення багатоканальних систем алертів (AnyAlert) для корпоративних клієнтів.',
          'Моніторинг фінансових спредів та автоматизація для P2P-трейдингу.',
          'Інтеграція мультиагентних ШІ-систем (LLM) для автоматизації підтримки.',
          'Повна автоматизація бізнесу телеграм: зв\'язок із CRM, Google Sheets, 1С.'
        ],
        technologies: ['Node.js (Telegraf)', 'Python (Aiogram)', 'PostgreSQL', 'Redis', 'LLM (OpenAI)', 'Webhooks', 'Stripe / LiqPay'],
        workflowSteps: [
          { title: 'Складання технічного завдання', desc: 'Детально описуємо сценарії поведінки користувача, структуру меню, кнопки та логіку взаємодії.' },
          { title: 'Проектування бази даних', desc: 'Створюємо схему збереження сесій користувачів, історії замовлень та налаштувань сповіщень.' },
          { title: 'Програмування логіки', desc: 'Пишемо код бота на Python/Node.js, підключаємо Webhooks для миттєвої реакції на повідомлення.' },
          { title: 'Тестування та реліз', desc: 'Перевіряємо бота на наявність багів під навантаженням, розгортаємо на VPS сервері та запускаємо в роботу.' }
        ],
        faqItems: [
          { q: 'Які платіжні системи можна інтегрувати в телеграм бот?', a: 'Ми інтегруємо будь-які офіційні шлюзи, включаючи Stripe, LiqPay, PayPal, що дозволяє користувачам оплачувати товари та послуги в один клік.' },
          { q: 'Чи можна підключити штучний інтелект (ChatGPT) до бота?', a: 'Так, ми спеціалізуємось на впровадженні ШІ в телеграм ботах. Бот зможе самостійно консультувати покупців щодо асортименту ваших послуг.' },
          { q: 'Де працює бот і чи потрібно платити за хостинг?', a: 'Бот розгортається на надійному віртуальному сервері (VPS). Витрати на його утримання мінімальні — зазвичай близько $3-5 на місяць.' }
        ]
      }
    },

    // TEAM
    team: {
      subtitle: 'наша гордість',
      title: 'Команда',
      titleHighlight: 'SiteNest',
      desc: 'Ми не беремось за десятки проектів одночасно. Наша сила — у фокусі на кожній деталі, яку забезпечують 4 топ-спеціалісти.',
      skills: 'Навички та Рівень Експертності',
    },

    // BLOG
    blog: {
      subtitle: 'знання та досвід',
      title: 'Наш',
      titleHighlight: 'SEO Блог',
      desc: 'Пишемо про технічні аспекти веб-розробки, системне адміністрування та практичний маркетинг для бізнесу.',
      searchPlaceholder: 'Пошук статей...',
      allCategories: 'Усі категорії',
      devopsFilter: 'DevOps & Швидкість',
      backendFilter: 'Backend розробка',
      marketingFilter: 'Маркетинг & SEO',
      readArticle: 'Читати статтю',
      notFound: 'Статтю не знайдено',
      backToBlog: 'Повернутися до блогу',
      expert: 'Експерт SiteNest',
      tableOfContents: 'Зміст статті',
      shareArticle: 'Поділитись статтею',
    },

    // CONTACT
    contact: {
      subtitle: 'обговоримо проект?',
      title: "Зв'яжіться з",
      titleHighlight: 'SiteNest',
      desc: "Маєте готову ідею чи потребуєте консультації? Заповніть форму праворуч, і ми зв'яжемось з вами протягом години.",
      emailLabel: 'Наш E-mail',
      instagramLabel: 'Instagram',
      locationLabel: 'Локація',
      location: 'Львів, Україна (Працюємо по всьому світу)',
      nameLabel: "Ваше ім'я",
      namePlaceholder: 'Дмитро',
      emailInputLabel: 'E-mail адреса',
      emailPlaceholder: 'dmitro@gmail.com',
      projectTypeLabel: 'Тип проекту',
      budgetLabel: 'Орієнтовний бюджет',
      budgetLess: 'до $300',
      budget1k: '$300 - $500',
      budget3k: '$500 - $800',
      budgetMore: 'понад $800',
      messageLabel: 'Опишіть вашу задачу',
      messagePlaceholder: 'Привіт, мені потрібно розробити сайт...',
      submitBtn: 'Надіслати заявку',
      confirmTitle: 'Підтвердіть вашу пошту',
      confirmDesc: 'Дякуємо, {name}! Ми надіслали лист на вашу пошту. Будь ласка, перейдіть за посиланням у листі для підтвердження заявки.',
      successTitle: 'Заявку підтверджено!',
      successDesc: 'Вашу заявку успішно надіслано. Наш менеджер зв\'яжеться з вами найближчим часом для уточнення деталей.',
      sendAgain: 'Надіслати ще раз',
      errorName: "Вкажіть ваше ім'я",
      errorEmail: 'Вкажіть e-mail',
      errorEmailFormat: 'Некоректний формат e-mail',
      errorMessage: 'Введіть опис проекту',

      faqSubtitle: 'запитання та відповіді',
      faqTitle: 'Часті',
      faqTitleHighlight: 'Запитання',
      faq1q: 'Скільки часу займає розробка сайту?',
      faq1a: 'Термін залежить від складності. Створення Landing Page триває від 5 до 10 робочих днів. Корпоративний сайт потребує 15-25 днів, а складні E-commerce projects з багатьма інтеграціями — 30-45 робочих днів.',
      faq2q: 'Чи оптимізовані ваші сайти під мобільні пристрої та SEO?',
      faq2a: 'Так, кожен наш проект розробляється з використанням принципу Mobile-First та проходить ретельну SEO-оптимізацію (написання мета-тегів, правильна ієрархія заголовків H1-H3, стиснення медіафайлів та налаштування швидкодії).',
      faq3q: 'Чи забезпечуєте ви підтримку сайтів після релізу?',
      faq3a: 'Так, наш DevOps-інженер забезпечує постійний моніторинг стабільності сайту, автоматичні бекапи баз даних, захист від DDoS атак та оперативне оновлення модулів безпеки у разі потреби.',
      faq4q: 'Які технології ви використовуєте для бекенду?',
      faq4a: 'Ми використовуємо Node.js (з NestJS або Express) та Python для надійної і масштабованої бізнес-логіки. Для баз даних обираємо PostgreSQL та Redis для надшвидкого кешування запитів.',
    },

    // PROCESS PAGE
    process: {
      subtitle: 'як ми працюємо',
      title: 'Наш Процес',
      titleHighlight: 'Розробки',
      desc: 'Від першого брифу до релізу — чітка, прозора методологія без зайвих слів і зривів дедлайнів.',
      step1Title: 'Discovery & Бриф',
      step1Desc: 'Ми проводимо детальну аналітичну сесію з вами. Вивчаємо ваш бізнес, конкурентів, ЦА та чітко фіксуємо вимоги у технічному завданні.',
      step2Title: 'UI/UX Прототипування',
      step2Desc: 'Дизайнер створює wireframes та інтерактивні макети в Figma. Ви бачите фінальний вигляд ще до написання першого рядка коду.',
      step3Title: 'Активна Розробка',
      step3Desc: 'Команда пише чистий, добре задокументований код. Щотижневі демо-сесії тримають вас в курсі прогресу та дозволяють вчасно коригувати курс.',
      step4Title: 'QA & Тестування',
      step4Desc: 'Тестуємо на усіх браузерах та пристроях, перевіряємо Core Web Vitals, проводимо code review та фіксуємо всі баги до релізу.',
      step5Title: 'Deploy & Реліз',
      step5Desc: 'Налаштовуємо CI/CD пайплайн, розгортаємо на продакшн-сервер через Docker, налаштовуємо CDN та SSL. Сайт live!',
      step6Title: 'Підтримка & Growth',
      step6Desc: 'Після релізу ми не зникаємо. Моніторинг 24/7, регулярні оновлення, аналітика конверсій та оптимізація під нові вимоги бізнесу.',

      techSubtitle: 'наш стек',
      techTitle: 'Технології,',
      techTitleHighlight: 'яким ми довіряємо',
    },

    // PORTFOLIO PAGE
    portfolio: {
      subtitle: 'наші роботи',
      title: 'Портфоліо',
      titleHighlight: 'Проектів',
      desc: 'Реальні кейси — реальні результати. Кожен проект вирішував конкретну бізнес-задачу.',
      allProjects: 'Усі проекти',
      development: 'Розробка',
      devops: 'DevOps',
      marketing: 'Маркетинг',
      viewCase: 'Дивитись кейс',
      technologies: 'Технології',
      results: 'Результат',
      orderSimilar: 'Замовити схожий проект',
    },
  },

  en: {
    // NAV
    nav: {
      home: 'Home',
      services: 'Services',
      team: 'Team',
      blog: 'Blog',
      contact: 'Contact',
      process: 'Process',
      portfolio: 'Portfolio',
      orderProject: 'Start a Project',
    },

    // FOOTER
    footer: {
      tagline: 'We build innovative, fast and secure websites to grow your business. 100% focus on quality and performance.',
      navigation: 'Navigation',
      services: 'Services',
      contacts: 'Contacts',
      copyright: 'All rights reserved.',
      slogan: 'We Build Smart Websites. Designed for Speed & Conversion.',
    },

    // HOME
    home: {
      badge: 'SiteNest Agency 2026',
      heroTitle1: 'We Build',
      heroTitleHighlight: 'Smart Websites',
      heroTitle2: 'For Your Business',
      heroDesc: 'We are a team of 4 focused experts. Combining cutting-edge Front-end, scalable Back-end, reliable DevOps and creative SMM marketing into one cohesive mechanism.',
      ourServices: 'Our Services',
      orderProject: 'Start a Project',

      statsUptime: 'Server Uptime',
      statsPagespeed: 'PageSpeed Score',
      statsConversion: 'Conversion Growth',
      statsExperts: 'Focused Specialists',

      whatWeDo: 'what we do',
      servicesTitle: 'Full-Cycle',
      servicesTitleHighlight: 'Agency Services',
      learnMore: 'Learn More',

      ourWork: 'our work',
      portfolioTitle: 'Latest',
      portfolioTitleHighlight: 'Case Studies',
      portfolioTitleSuffix: '',
      allProjects: 'All Projects',
      development: 'Development',
      devops: 'DevOps / Cloud',
      marketing: 'SMM / Marketing',
      viewCase: 'View Case Study',

      // CTA Banner
      ctaTitle1: 'Ready to build',
      ctaTitleHighlight: 'something great',
      ctaTitle2: '?',
      ctaDesc: 'Contact us and we will develop a detailed technical plan and project estimation for free.',
      ctaBtn: 'Contact Us',

      // Testimonials
      testimonialsSubtitle: 'client reviews',
      testimonialsTitle: 'What our',
      testimonialsTitleHighlight: 'clients say',
    },

    // SERVICES
    services: {
      subtitle: 'expertise',
      title: 'Our',
      titleHighlight: 'Services',
      desc: 'We provide a full spectrum of digital services — from the first line of code to top search rankings.',

      frontendTitle: 'Front-end Development',
      frontendDesc: 'We create blazing-fast SPAs and SSR apps with React, Next.js and TypeScript. We focus on clean code, semantics, accessibility and maximum interactivity.',

      backendTitle: 'Back-end Engineering',
      backendDesc: 'We architect server infrastructure on Node.js and Python. We build APIs that handle massive loads, ensure reliable data storage and encryption.',

      devopsTitle: 'DevOps & Cloud Systems',
      devopsDesc: 'We organize cloud infrastructure, set up CI/CD deployment pipelines and monitor server performance. We optimize cloud costs.',

      smmTitle: 'SMM & SEO Promotion',
      smmDesc: 'We fill your project with targeted traffic. We run Meta Ads campaigns, handle blog SEO optimization and set up funnel analytics.',

      frontendBenefit1: 'Full responsiveness across all mobile devices',
      frontendBenefit2: 'Optimal structure for SEO crawlers',
      frontendBenefit3: 'Rendering speed (LCP < 2 sec)',

      backendBenefit1: 'Secure transaction processing & Stripe/LiqPay',
      backendBenefit2: 'Data caching for faster queries',
      backendBenefit3: 'CRM & ERP gateway integrations',

      devopsBenefit1: 'DDoS protection & SSL certification',
      devopsBenefit2: 'Automatic data backups every 24 hours',
      devopsBenefit3: '99.9% resource uptime guarantee',

      smmBenefit1: 'Organic & paid traffic acquisition',
      smmBenefit2: 'Unique brand style & banner creation',
      smmBenefit3: 'Reduced cost per lead (CPA/CAC)',

      // Calculator
      calcSubtitle: 'transparent pricing',
      calcTitle: 'Project Cost',
      calcTitleHighlight: 'Calculator',
      step1: 'Choose your website type',
      step2: 'Additional services & integrations',
      landingTitle: 'Landing Page',
      landingDesc: 'Single-page promo site with high conversion. From $150.',
      corporateTitle: 'Corporate Website',
      corporateDesc: 'Multi-page business resource with a blog. From $250.',
      ecommerceTitle: 'E-commerce Store',
      ecommerceDesc: 'Store with cart, account & payments. From $400.',
      pagesLabel: 'Number of unique pages',
      page1: '1 page',
      page30: '30 pages',
      devopsAddon: 'DevOps & CDN Setup (+ $50)',
      devopsAddonDesc: 'Docker, SSL, Cloudflare caching & reliable hosting.',
      smmAddon: 'SMM Starter & SEO (+ $100)',
      smmAddonDesc: 'Audience analysis, ad setup, initial SEO.',
      apiAddon: 'API & CRM Integrations (+ $100)',
      apiAddonDesc: 'Connect your site with CRMs, Telegram bots, payment gateways.',
      estimatedCost: 'Estimated Cost',
      disclaimer: '*Price is approximate. Leave a request for an exact estimate.',
      orderCalc: 'Request Estimate',
    },

    // SERVICE DETAILS
    serviceDetails: {
      backBtn: '← Back to services',
      ctaTitle: 'Ready to discuss your project?',
      ctaDesc: 'Get in touch with us to receive a personalized proposal and free consultation from our experts.',
      ctaBtn: 'Start a Project',
      keyFeaturesTitle: 'Key Areas of Work',
      techStackTitle: 'Technology Stack',
      frontend: {
        title: 'Next-Gen Front-end Development',
        tagline: 'Creating blazing-fast, responsive, and interactive interfaces with a focus on UX.',
        desc1: 'Front-end development is the face of your business in the digital world. We build high-performance Single Page Applications (SPA) and Server-Side Rendering (SSR) apps that load instantly and operate fluidly on any screen.',
        desc2: 'Every line of code is optimized for SEO crawlers and meets modern accessibility standards (WCAG). We integrate complex animations using GSAP and Framer Motion, delivering smooth transitions and micro-interactions at 60 frames per second.',
        features: [
          'Development with React.js and Next.js for ultimate scalability and SEO performance.',
          'Interface animations using GSAP and Framer Motion (60fps).',
          'Full responsiveness across all mobile devices (Mobile-First approach).',
          'Core Web Vitals optimization (LCP < 2 sec, CLS < 0.1, INP < 200 ms).',
          'Clean HTML5 semantics, modern CSS3 / Tailwind, and accessibility compliance.'
        ],
        technologies: ['React.js', 'Next.js', 'TypeScript', 'HTML5 / CSS3', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Redux / Zustand']
      },
      backend: {
        title: 'Robust Back-end Engineering & Secure APIs',
        tagline: 'Designing reliable server architectures, high-performance databases, and secure integrations.',
        desc1: 'The backend is the core and brain of any digital system. We engineer reliable server-side logic using Node.js and Python, designed to scale under heavy loads and process sensitive information securely.',
        desc2: 'Our specialists design optimized databases (PostgreSQL, MongoDB) implementing modern indexing and connection pooling. We leverage Redis caching and message queues to process background tasks efficiently, reducing response times.',
        features: [
          'Server-side application development on Node.js (NestJS / Express) and Python (FastAPI / Django).',
          'Design and optimization of SQL (PostgreSQL) and NoSQL (MongoDB) databases.',
          'Multi-level caching implementation using Redis Cache Layer.',
          'Secure REST & GraphQL APIs creation for mobile and web clients.',
          'Integration of payment systems (Stripe, LiqPay) and business systems (CRM, ERP).'
        ],
        technologies: ['Node.js', 'NestJS', 'Express.js', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'REST / GraphQL', 'WebSockets', 'Stripe / LiqPay']
      },
      devops: {
        title: 'DevOps & Enterprise Cloud Systems',
        tagline: 'Automating deployments, ensuring high availability, and protecting infrastructure 24/7.',
        desc1: 'We construct server environments that simply work. Utilizing Docker containerization and Kubernetes orchestration, we ensure seamless scalability as your user base grows.',
        desc2: 'Through CI/CD automation (GitHub Actions), we eliminate human error during releases. Using Cloudflare CDN and WAF, we safeguard your systems against DDoS attacks and encrypt transmissions via SSL/TLS.',
        features: [
          'Containerization with Docker and Kubernetes configuration for scalability.',
          'Cloud management on AWS and DigitalOcean alongside Infrastructure as Code (Terraform).',
          'Automated CI/CD pipelines (GitHub Actions) for testing and deployments.',
          'Nginx web server tuning and Cloudflare CDN / Security configurations.',
          'Automatic daily database backups and 99.9% uptime SLA guarantee.'
        ],
        technologies: ['Docker', 'Kubernetes', 'AWS', 'DigitalOcean', 'GitHub Actions', 'Nginx', 'Cloudflare CDN', 'Terraform', 'SSL / TLS', 'Prometheus / Grafana']
      },
      smm: {
        title: 'SMM & SEO Promotion',
        tagline: 'Driving targeted traffic, improving conversion rates, and building online brand authority.',
        desc1: 'A technically perfect website needs visitors to generate revenue. We construct integrated digital marketing strategies, combining search engine optimization (SEO) and paid social advertising to maximize ROI.',
        desc2: 'We conduct target audience research and build tailored content that distinguishes your brand. Continuous A/B testing of ad creatives and GA4 analytics mapping allows us to optimize the acquisition funnel and reduce CPA/CAC.',
        features: [
          'Targeted ad campaigns execution in Meta Ads Manager (Facebook, Instagram).',
          'Complete search engine optimization (SEO: semantics, meta tags, technical audits).',
          'High-converting SEO copywriting for blogs and landing pages.',
          'Google Analytics 4 setup for event and conversion funnel tracking.',
          'A/B testing implementation for banner designs and landing page elements.'
        ],
        technologies: ['Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'SEO Copywriting', 'Ahrefs / SEMrush', 'Figma (Banners)', 'A/B Testing', 'Insta Growth']
      },
      ai_integration: {
        title: 'AI Integration for Business',
        tagline: 'Autonomous AI agents and seamless ChatGPT integration for routine automation.',
        desc1: 'Artificial Intelligence in business is no longer the future, but a key competitive advantage. We provide professional AI integration into your existing web applications, CRM systems, and Telegram bots for maximum automation.',
        desc2: 'Reliable integration of ChatGPT (OpenAI API), Claude, or Groq allows you to delegate customer support, lead processing, and content generation to algorithms. We develop AI for business based on the "Chain of Thought" architecture, ensuring high accuracy and logical decisions without hallucinations.',
        features: [
          'Secure integration of ChatGPT and other LLMs into corporate systems.',
          'Development of autonomous AI agents for data collection and task execution.',
          'Vector Databases (Pinecone) setup for internal knowledge base search.',
          'Creation of "smart" consultant bots that sell 24/7.',
          'AI implementation for financial analytics and monitoring.'
        ],
        technologies: ['OpenAI API', 'LangChain', 'Python (FastAPI)', 'Pinecone (Vector DB)', 'Claude 3', 'Groq', 'Next.js']
      },
      web_scraping: {
        title: 'Professional Web Scraping & Data Extraction',
        tagline: 'Automated web scraping, complex parser development, and continuous market monitoring.',
        desc1: 'Data is the new oil. We offer professional web scraping of any complexity for the B2B segment. Using modern tools like Playwright and Puppeteer, we successfully bypass Cloudflare, captchas, and complex security mechanisms to extract information from the most challenging dynamic web resources (SPA).',
        desc2: 'Our experience includes developing high-load continuous monitoring systems: from tracking cryptocurrency spreads (USDT/UAH for P2P trading) to aggregating game statistics and CS2 skin prices. Custom parser development allows you to fully automate competitor price monitoring and instantly react to market changes.',
        features: [
          'Scraping dynamic SPA sites (React/Next.js) using Playwright.',
          'Bypassing Anti-Bot systems (Cloudflare, Datadome) via proxy rotation.',
          'Continuous financial monitoring (crypto, fiat, P2P spreads).',
          'Automated competitor price monitoring for e-commerce.',
          'Marketplaces and gaming industry (Steam, CS2) scraping for analytics.'
        ],
        technologies: ['Playwright', 'Puppeteer', 'Python', 'Node.js', 'Proxy Rotation', 'BeautifulSoup', 'PostgreSQL']
      },
      telegram_bots: {
        title: 'Telegram Bot Development for B2B',
        tagline: 'Multi-channel notification systems, business automation, and smart AI assistants.',
        desc1: 'We create more than just chatbots; we build complete ecosystems for your business. Professional Telegram bot development allows you to automate sales, customer support, and internal company processes. You can order a Telegram bot of any complexity: from a simple virtual manager to complex corporate ERP integration.',
        desc2: 'Our B2B experience includes designing multi-channel notification and alert systems (AnyAlert architecture) and developing bots for P2P trading that continuously monitor financial spreads. We also specialize in building multi-agent AI systems based on LLMs, creating "smart" Telegram bots for stores capable of independently consulting and closing deals.',
        features: [
          'Development of bots for e-commerce with built-in payments (Stripe, LiqPay).',
          'Creation of multi-channel alert systems (AnyAlert) for corporate clients.',
          'Financial spread monitoring and automation for P2P trading.',
          'Integration of multi-agent AI systems (LLMs) for support automation.',
          'Complete business automation via Telegram: CRM, Google Sheets, 1C integration.'
        ],
        technologies: ['Node.js (Telegraf)', 'Python (Aiogram)', 'PostgreSQL', 'Redis', 'LLM (OpenAI)', 'Webhooks', 'Stripe / LiqPay']
      }
    },

    // TEAM
    team: {
      subtitle: 'our pride',
      title: 'The',
      titleHighlight: 'SiteNest Team',
      desc: "We don't take on dozens of projects simultaneously. Our strength lies in focus on every detail, powered by 4 top specialists.",
      skills: 'Skills & Expertise Level',
    },

    // BLOG
    blog: {
      subtitle: 'knowledge & experience',
      title: 'Our',
      titleHighlight: 'SEO Blog',
      desc: 'We write about technical aspects of web development, system administration and practical marketing for business.',
      searchPlaceholder: 'Search articles...',
      allCategories: 'All Categories',
      devopsFilter: 'DevOps & Speed',
      backendFilter: 'Backend Development',
      marketingFilter: 'Marketing & SEO',
      readArticle: 'Read Article',
      notFound: 'Article not found',
      backToBlog: 'Back to Blog',
      expert: 'SiteNest Expert',
      tableOfContents: 'Table of Contents',
      shareArticle: 'Share Article',
    },

    // CONTACT
    contact: {
      subtitle: 'discuss a project?',
      title: 'Contact',
      titleHighlight: 'SiteNest',
      desc: 'Have a ready idea or need a consultation? Fill in the form and we will get back to you within an hour.',
      emailLabel: 'Our Email',
      instagramLabel: 'Instagram',
      locationLabel: 'Location',
      location: 'Lviv, Ukraine (We work worldwide)',
      nameLabel: 'Your Name',
      namePlaceholder: 'John',
      emailInputLabel: 'Email Address',
      emailPlaceholder: 'john@gmail.com',
      projectTypeLabel: 'Project Type',
      budgetLabel: 'Estimated Budget',
      budgetLess: 'Under $300',
      budget1k: '$300 - $500',
      budget3k: '$500 - $800',
      budgetMore: 'Over $800',
      messageLabel: 'Describe your project',
      messagePlaceholder: 'Hi, I need a website built...',
      submitBtn: 'Send Request',
      confirmTitle: 'Confirm your email',
      confirmDesc: "Thank you, {name}! We have sent an email to your address. Please click the link in the email to confirm your request.",
      successTitle: 'Request Confirmed!',
      successDesc: 'Your request has been successfully sent. Our manager will contact you shortly to clarify the details.',
      sendAgain: 'Send Another',
      errorName: 'Please enter your name',
      errorEmail: 'Please enter your email',
      errorEmailFormat: 'Invalid email format',
      errorMessage: 'Please describe your project',

      faqSubtitle: 'questions & answers',
      faqTitle: 'Frequently Asked',
      faqTitleHighlight: 'Questions',
      faq1q: 'How long does website development take?',
      faq1a: 'It depends on complexity. A Landing Page takes 5–10 business days. A corporate site requires 15–25 days, while complex E-commerce projects with many integrations take 30–45 business days.',
      faq2q: 'Are your websites mobile-friendly and SEO-optimized?',
      faq2a: 'Yes, every project is built with a Mobile-First approach and undergoes thorough SEO optimization (meta tags, proper H1-H3 hierarchy, media compression and performance tuning).',
      faq3q: 'Do you provide post-launch support?',
      faq3a: 'Yes, our DevOps engineer ensures 24/7 monitoring, automatic database backups, DDoS protection and timely security updates.',
      faq4q: 'What backend technologies do you use?',
      faq4a: 'We use Node.js (with NestJS or Express) and Python for reliable, scalable business logic. For databases we choose PostgreSQL and Redis for ultra-fast caching.',
    },

    // PROCESS PAGE
    process: {
      subtitle: 'how we work',
      title: 'Our Development',
      titleHighlight: 'Process',
      desc: 'From the first brief to launch — a clear, transparent methodology with no surprises and no missed deadlines.',
      step1Title: 'Discovery & Brief',
      step1Desc: 'We run a detailed analytical session with you. We study your business, competitors, target audience and clearly document requirements in a technical specification.',
      step2Title: 'UI/UX Prototyping',
      step2Desc: 'Our designer creates wireframes and interactive mockups in Figma. You see the final look before the first line of code is written.',
      step3Title: 'Active Development',
      step3Desc: 'The team writes clean, well-documented code. Weekly demo sessions keep you updated on progress and allow timely course corrections.',
      step4Title: 'QA & Testing',
      step4Desc: 'We test across all browsers and devices, verify Core Web Vitals, conduct code reviews and fix all bugs before launch.',
      step5Title: 'Deploy & Launch',
      step5Desc: 'We set up a CI/CD pipeline, deploy to production via Docker, configure CDN and SSL. Your site is live!',
      step6Title: 'Support & Growth',
      step6Desc: "After launch we don't disappear. 24/7 monitoring, regular updates, conversion analytics and optimization for new business requirements.",

      techSubtitle: 'our stack',
      techTitle: 'Technologies',
      techTitleHighlight: 'We Trust',
    },

    // PORTFOLIO PAGE
    portfolio: {
      subtitle: 'our work',
      title: 'Project',
      titleHighlight: 'Portfolio',
      desc: 'Real cases — real results. Every project solved a specific business challenge.',
      allProjects: 'All Projects',
      development: 'Development',
      devops: 'DevOps',
      marketing: 'Marketing',
      viewCase: 'View Case',
      technologies: 'Technologies',
      results: 'Results',
      orderSimilar: 'Order a Similar Project',
    },
  },
} as const;

export type TranslationKey = typeof translations.uk;