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
      devopsBenefit3: '99.9% гарантія працездатності ресурсів',

      smmBenefit1: 'Залучення органічного та платного трафіку',
      smmBenefit2: 'Створення унікального стилю та банерів',
      smmBenefit3: 'Зниження ціни за лід (CPA/CAC)',

      // Calculator
      calcSubtitle: 'прозоре ціноутворення',
      calcTitle: 'Розрахунок',
      calcTitleHighlight: 'Вартості Проекту',
      step1: 'Оберіть тип веб-сайту',
      step2: 'Додаткові послуги та інтеграції',
      landingTitle: 'Landing Page',
      landingDesc: 'Односторінковий промо-сайт з високою конверсією. Від $150.',
      corporateTitle: 'Корпоративний сайт',
      corporateDesc: 'Багатосторінковий бізнес-ресурс з блогом. Від $250.',
      ecommerceTitle: 'E-commerce Магазин',
      ecommerceDesc: 'Магазин з кошиком, кабінетом та оплатами. Від $400.',
      pagesLabel: 'Кількість унікальних сторінок',
      page1: '1 сторінка',
      page30: '30 сторінок',
      devopsAddon: 'Налаштування DevOps та CDN (+ $50)',
      devopsAddonDesc: 'Docker, SSL, кешування Cloudflare та надійний хостинг.',
      smmAddon: 'SMM Старт & SEO Оптимізація (+ $100)',
      smmAddonDesc: 'Аналіз аудиторії, налаштування реклами, первинне SEO.',
      apiAddon: 'Інтеграції API та CRM систем (+ $100)',
      apiAddonDesc: "Зв'язок сайту з 1С, Telegram-ботами, платіжними шлюзами.",
      estimatedCost: 'Орієнтовна Вартість',
      disclaimer: '*Ціна розраховується приблизно. Для точного прорахунку залиште заявку.',
      orderCalc: 'Замовити прорахунок',
    },

    // SERVICE DETAILS
    serviceDetails: {
      backBtn: '← Назад до послуг',
      ctaTitle: 'Готові обговорити проект?',
      ctaDesc: 'Зв’яжіться з нами, щоб отримати персоналізовану пропозицію та безкоштовну консультацію від наших експертів.',
      ctaBtn: 'Почати проект',
      keyFeaturesTitle: 'Ключові напрямки роботи',
      techStackTitle: 'Технологічний стек',
      frontend: {
        title: 'Front-end Розробка Надвисокого Рівня',
        tagline: 'Створюємо надшвидкі, адаптивні та інтерактивні інтерфейси з фокусом на UX.',
        desc1: 'Front-end розробка — це обличчя вашого бізнесу в цифровому світі. Ми створюємо не просто веб-сторінки, а високопродуктивні Single Page Applications (SPA) та Server-Side Rendering (SSR) додатки, які завантажуються миттєво та працюють плавно на будь-якому пристрої.',
        desc2: 'Кожен рядок нашого коду оптимізований для пошукових роботів (SEO) та відповідає сучасним стандартам доступності (WCAG). Ми інтегруємо складні анімації за допомогою GSAP та Framer Motion, забезпечуючи плавні переходи та мікро-інтеракції зі швидкістю 60 кадрів на секунду.',
        features: [
          'Розробка на React.js та Next.js для максимальної гнучкості та SEO-оптимізації.',
          'Анімації інтерфейсу за допомогою GSAP та Framer Motion (60fps).',
          'Повна адаптивність под усі мобільні пристрої (Mobile-First approach).',
          'Оптимізація Core Web Vitals (LCP < 2 сек, CLS < 0.1, INP < 200 мс).',
          'Чиста семантика HTML5, сучасний CSS3 / Tailwind та підтримка accessibility.'
        ],
        technologies: ['React.js', 'Next.js', 'TypeScript', 'HTML5 / CSS3', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Vite', 'Redux / Zustand']
      },
      backend: {
        title: 'Back-end Інжиніринг та Безпечні API',
        tagline: 'Проектуємо стійку архітектуру, високопродуктивні бази даних та інтеграції.',
        desc1: 'Back-end — це ядро та мозок будь-якої системи. Ми розробляємо високонадійну серверу логіку на Node.js та Python, яка здатна витримувати колосальні навантаження та забезпечувати безпечну обробку конфіденційної інформації.',
        desc2: 'Наші експерти проектують оптимізовані бази даних (PostgreSQL, MongoDB) із застосуванням сучасних методів індексації та пулінгу з’єднань. Ми активно використовуємо Redis для кешування та черги повідомлень для асинхронної обробки складних задач, що мінімізує час відгуку сервера.',
        features: [
          'Розробка серверних додатків на Node.js (NestJS / Express) та Python (FastAPI / Django).',
          'Проектування та оптимізація реляційних (PostgreSQL) та NoSQL (MongoDB) баз даних.',
          'Налаштування багаторівневого кешування через Redis Cache Layer.',
          'Створення безпечних REST & GraphQL API для мобільних та веб-клієнтів.',
          'Інтеграція платіжних систем (Stripe, LiqPay) та бізнес-шлюзів (CRM, ERP).'
        ],
        technologies: ['Node.js', 'NestJS', 'Express.js', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'REST / GraphQL', 'WebSockets', 'Stripe / LiqPay']
      },
      devops: {
        title: 'DevOps & Хмарна Інфраструктура',
        tagline: 'Автоматизуємо розгортання, забезпечуємо стабільність та захист 24/7.',
        desc1: 'Ми створюємо інфраструктуру, яка працює без збоїв. Налаштування контейнеризації Docker та оркестрації Kubernetes дозволяє легко масштабувати ваш додаток при зростанні навантаження.',
        desc2: 'Через налаштування CI/CD конвеєрів (GitHub Actions) ми мінімізуємо людський фактор при релізах. Використання Cloudflare CDN та WAF гарантує надійний захист від DDoS-атак та безпеку даних за допомогою SSL/TLS шифрування.',
        features: [
          'Контейнеризація за допомогою Docker та налаштування Kubernetes для масштабування.',
          'Управління хмарами AWS, DigitalOcean та автоматизація інфраструктури (IaC).',
          'Побудова конвеєрів CI/CD (GitHub Actions) для автоматичного тестування та деплою.',
          'Оптимізація веб-серверів Nginx та налаштування Cloudflare CDN / Security.',
          'Автоматичні бекапи даних кожні 24 години та гарантія 99.9% доступності.'
        ],
        technologies: ['Docker', 'Kubernetes', 'AWS', 'DigitalOcean', 'GitHub Actions', 'Nginx', 'Cloudflare CDN', 'Terraform', 'SSL / TLS', 'Prometheus / Grafana']
      },
      smm: {
        title: 'SMM & SEO Просування',
        tagline: 'Залучаємо цільовий трафік, покращуємо конверсії та будуємо бренд.',
        desc1: 'Технічно ідеальний сайт не принесе прибутку без відвідувачів. Ми будуємо інтегровану маркетингову стратегію, яка об’єднує пошукову оптимізацію (SEO) та таргетовану рекламу в соціальних мережах для отримання максимального ROI.',
        desc2: 'Ми проводимо ретельний аналіз аудиторії та створюємо унікальний контент, що виділяє ваш бренд серед конкурентів. Постійне A/B тестування креативів та налаштування наскрізної аналітики (GA4) дозволяє оптимізувати кожен етап воронки та знижувати ціну ліда (CPA/CAC).',
        features: [
          'Запуск та оптимізація рекламних кампаній у Meta Ads Manager (Facebook, Instagram).',
          'Повна пошукова оптимізація сайту (SEO: семантика, мета-теги, технічний аудит).',
          'Створення якісного та унікального SEO-копірайтингу для блогу та посадкових сторінок.',
          'Налаштування аналітики Google Analytics 4 для відслідковування конверсій.',
          'Проведення спліт-тестів (A/B Testing) для банерів та цільових сторінок.'
        ],
        technologies: ['Meta Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'SEO Copywriting', 'Ahrefs / SEMrush', 'Figma (Banners)', 'A/B Testing', 'Insta Growth']
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
      faq1a: 'Термін залежить від складності. Створення Landing Page триває від 5 до 10 робочих днів. Корпоративний сайт потребує 15-25 днів, а складні E-commerce проекти з багатьма інтеграціями — 30-45 робочих днів.',
      faq2q: 'Чи оптимізовані ваші сайти під мобільні пристрої та SEO?',
      faq2a: 'Так, кожен наш проект розробляється з використанням принципу Mobile-First та проходить ретельну SEO-оптимізацію (написання мета-тегів, правильна ієрархія заголовків H1-H3, стиснення медіафайлів та налаштування швидкодії).',
      faq3q: 'Чи забезпечуєте ви підтримку сайтів після релізу?',
      faq3a: 'Так, наш DevOps-інженер Михайло забезпечує постійний моніторинг стабільності сайту, автоматичні бекапи баз даних, захист від DDoS атак та оперативне оновлення модулів безпеки у разі потреби.',
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
