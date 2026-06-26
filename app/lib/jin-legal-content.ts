export type JinLegalLang = 'en' | 'tr';

export type JinLegalBlock = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type JinLegalPage = {
  slug: string;
  eyebrow: Record<JinLegalLang, string>;
  title: Record<JinLegalLang, string>;
  intro: Record<JinLegalLang, string>;
  updated: string;
  blocks: Record<JinLegalLang, JinLegalBlock[]>;
  seo: Record<JinLegalLang, {title: string; description: string}>;
};

export const JIN_LEGAL_PAGES = {
  about: {
    slug: 'about',
    eyebrow: {en: 'About Jin', tr: 'Jin Hakkında'},
    title: {en: 'The art of considered beauty.', tr: 'Özenle tasarlanmış güzelliğin sanatı.'},
    intro: {
      en: 'Jin is a skincare house built on restraint, rigour and ritual — four formulations, one uncompromising standard.',
      tr: 'Jin; ölçülülük, bilimsel titizlik ve ritüel üzerine kurulu bir cilt bakım markasıdır — dört formül, tek bir tavizsiz standart.',
    },
    updated: '2026-06-26',
    blocks: {
      en: [
        {
          heading: 'Our story',
          paragraphs: [
            'Jin was founded in London with a simple conviction: skincare should perform at a clinical level and feel worthy of display. We develop each formula with dermatological rigour and house it in frosted mercury glass — a material chosen for clarity, restraint and the quiet confidence of things made with intention.',
            'We do not chase trends. We refine rituals that endure: cleanse, protect, revive, restore.',
          ],
        },
        {
          heading: 'What we stand for',
          list: [
            'Four essential formulations — nothing superfluous',
            'Developed with dermatological expertise and tested for tolerance',
            'Frosted glass packaging designed to be kept, not discarded',
            'Transparent ingredient philosophy and responsible sourcing',
            'Shipped worldwide from our London studio',
          ],
        },
        {
          heading: 'The collection',
          paragraphs: [
            'Balancing Gel Cleanser, Moi Day Creme, Prana Rose Mist and Aquaporin Moisture Serum form a complete daily ritual. Each product is a deliberate gesture — precise in performance, mercury in form.',
          ],
        },
        {
          heading: 'Studio & contact',
          paragraphs: [
            'Jin Cosmetics Studio — London, United Kingdom',
            'Monday – Saturday, 10am – 6pm (GMT)',
            'Email: hello@jincosmetic.co',
            'Customer care: We aim to respond within one business day.',
          ],
        },
      ],
      tr: [
        {
          heading: 'Hikayemiz',
          paragraphs: [
            'Jin, Londra\'da tek bir inançla kuruldu: cilt bakımı klinik düzeyde etki göstermeli ve sergilenmeye değer hissettirmelidir. Her formülümüz dermatolojik titizlikle geliştirilir; ölçülülük, netlik ve niyetle üretilmiş ürünlerin sessiz özgüvenini yansıtan buzlu civa camında sunulur.',
            'Trendlerin peşinden koşmuyoruz. Kalıcı ritüelleri rafine ediyoruz: temizle, koru, canlandır, yenile.',
          ],
        },
        {
          heading: 'Değerlerimiz',
          list: [
            'Dört temel formül — gereksiz hiçbir şey yok',
            'Dermatolojik uzmanlıkla geliştirilmiş, tolerans testli formüller',
            'Atılacak değil, saklanacak buzlu cam ambalaj',
            'Şeffaf içerik felsefesi ve sorumlu tedarik',
            'Londra stüdyomuzdan dünya geneline gönderim',
          ],
        },
        {
          heading: 'Koleksiyon',
          paragraphs: [
            'Balancing Gel Cleanser, Moi Day Creme, Prana Rose Mist ve Aquaporin Moisture Serum günlük ritüelinizi tamamlar. Her ürün kasıtlı bir jesttir — performansta kesin, formda civa.',
          ],
        },
        {
          heading: 'Stüdyo & iletişim',
          paragraphs: [
            'Jin Cosmetics Studio — Londra, Birleşik Krallık',
            'Pazartesi – Cumartesi, 10:00 – 18:00 (GMT)',
            'E-posta: hello@jincosmetic.co',
            'Müşteri hizmetleri: Bir iş günü içinde yanıt vermeyi hedefliyoruz.',
          ],
        },
      ],
    },
    seo: {
      en: {
        title: 'About | Jin Cosmetics',
        description:
          'Discover Jin Cosmetics — clinical skincare housed in frosted mercury glass. Our story, values and London studio.',
      },
      tr: {
        title: 'Hakkımızda | Jin Cosmetics',
        description:
          'Jin Cosmetics\'i keşfedin — buzlu civa camında klinik cilt bakımı. Hikayemiz, değerlerimiz ve Londra stüdyomuz.',
      },
    },
  },
  shipping: {
    slug: 'shipping-returns',
    eyebrow: {en: 'Shipping & Returns', tr: 'Kargo & İade'},
    title: {en: 'Delivery and peace of mind.', tr: 'Teslimat ve güven.'},
    intro: {
      en: 'We ship worldwide from London. Orders are carefully packed to protect frosted glass. Full details below.',
      tr: 'Londra\'dan dünya geneline gönderim yapıyoruz. Siparişler buzlu cam ambalajı korumak için özenle paketlenir.',
    },
    updated: '2026-06-26',
    blocks: {
      en: [
        {
          heading: 'Shipping destinations',
          paragraphs: [
            'We deliver to the United Kingdom, European Union, United States, Turkey and selected international destinations. Available countries are shown at checkout.',
          ],
        },
        {
          heading: 'Processing & delivery times',
          list: [
            'Orders are processed within 1–2 business days (Mon–Fri, excluding UK bank holidays)',
            'UK Standard: 2–4 business days after dispatch',
            'EU & International Standard: 5–10 business days after dispatch',
            'Turkey: 7–14 business days after dispatch (customs may add time)',
            'Express options, where available, are shown at checkout',
          ],
        },
        {
          heading: 'Shipping costs',
          paragraphs: [
            'Shipping fees are calculated at checkout based on destination and order weight. Free standard shipping may apply to qualifying UK orders — any active offer is displayed before payment.',
          ],
        },
        {
          heading: 'Order tracking',
          paragraphs: [
            'Once dispatched, you will receive a confirmation email with tracking information where available. If tracking is not yet active, please allow 24 hours after receiving your dispatch email.',
          ],
        },
        {
          heading: 'Customs & import duties',
          paragraphs: [
            'International orders (including Turkey) may be subject to import duties, VAT or local taxes. These charges are the responsibility of the recipient and are not included in our product or shipping prices unless stated at checkout.',
          ],
        },
        {
          heading: 'Returns & exchanges (UK & EU)',
          paragraphs: [
            'Under the Consumer Contracts Regulations and UK Consumer Rights Act, you may cancel your order within 14 days of receiving your goods without giving a reason.',
          ],
          list: [
            'Products must be unused, unopened and in original packaging',
            'Opened or used cosmetic products cannot be returned for hygiene reasons, unless faulty',
            'To start a return, email hello@jincosmetic.co with your order number within 14 days',
            'Return shipping costs are the customer\'s responsibility unless the item is faulty or incorrect',
            'Refunds are processed within 14 days of us receiving the returned goods, to your original payment method',
          ],
        },
        {
          heading: 'Faulty or damaged items',
          paragraphs: [
            'If your order arrives damaged or defective, contact us within 48 hours at hello@jincosmetic.co with photos of the product and packaging. We will arrange a replacement or full refund including shipping.',
          ],
        },
        {
          heading: 'Turkey — right of withdrawal (Cayma hakkı)',
          paragraphs: [
            'For customers in Turkey, purchases made online are subject to the Distance Contracts Regulation (Mesafeli Sözleşmeler Yönetmeliği). You may withdraw from the contract within 14 days of delivery without stating a reason, provided the product is unopened and unused.',
          ],
          list: [
            'Notify us at hello@jincosmetic.co within 14 days of delivery',
            'Return the product in its original packaging within 10 days of your withdrawal notice',
            'Opened cosmetic products are excluded from withdrawal for hygiene reasons, unless defective',
            'Refunds are made within 14 days of receiving the returned product',
          ],
        },
      ],
      tr: [
        {
          heading: 'Gönderim bölgeleri',
          paragraphs: [
            'Birleşik Krallık, Avrupa Birliği, Amerika Birleşik Devletleri, Türkiye ve seçili uluslararası adreslere teslimat yapıyoruz. Mevcut ülkeler ödeme adımında gösterilir.',
          ],
        },
        {
          heading: 'Hazırlık & teslimat süreleri',
          list: [
            'Siparişler 1–2 iş günü içinde hazırlanır (Pzt–Cum, İngiltere resmi tatilleri hariç)',
            'BK Standart: Gönderimden sonra 2–4 iş günü',
            'AB & Uluslararası Standart: Gönderimden sonra 5–10 iş günü',
            'Türkiye: Gönderimden sonra 7–14 iş günü (gümrük süreçleri ek süre ekleyebilir)',
            'Ekspres seçenekler, varsa, ödeme adımında gösterilir',
          ],
        },
        {
          heading: 'Kargo ücretleri',
          paragraphs: [
            'Kargo ücretleri teslimat adresi ve sipariş ağırlığına göre ödeme adımında hesaplanır. Uygun BK siparişlerinde ücretsiz standart kargo uygulanabilir — geçerli kampanyalar ödeme öncesinde gösterilir.',
          ],
        },
        {
          heading: 'Sipariş takibi',
          paragraphs: [
            'Siparişiniz kargoya verildiğinde, mümkün olduğunda takip bilgisi içeren bir e-posta alırsınız. Takip henüz aktif değilse, gönderim e-postasından sonra 24 saat bekleyin.',
          ],
        },
        {
          heading: 'Gümrük & ithalat vergileri',
          paragraphs: [
            'Uluslararası siparişler (Türkiye dahil) ithalat vergisi, KDV veya yerel harçlara tabi olabilir. Bu masraflar alıcının sorumluluğundadır; ödeme adımında aksi belirtilmedikçe ürün veya kargo fiyatına dahil değildir.',
          ],
        },
        {
          heading: 'İade & değişim (BK & AB)',
          paragraphs: [
            'Tüketici Sözleşmeleri Yönetmeliği ve BK Tüketici Hakları Yasası kapsamında, ürünü teslim aldıktan sonra 14 gün içinde gerekçe göstermeksizin siparişinizi iptal edebilirsiniz.',
          ],
          list: [
            'Ürünler kullanılmamış, açılmamış ve orijinal ambalajında olmalıdır',
            'Hijyen nedeniyle açılmış kozmetik ürünler, arızalı olmadıkça iade edilemez',
            'İade başlatmak için 14 gün içinde sipariş numaranızla hello@jincosmetic.co adresine yazın',
            'Ürün hatalı veya yanlış gönderilmedikçe iade kargo ücreti müşteriye aittir',
            'İade edilen ürün tarafımıza ulaştıktan sonra 14 gün içinde ödeme yönteminize iade yapılır',
          ],
        },
        {
          heading: 'Hasarlı veya arızalı ürünler',
          paragraphs: [
            'Siparişiniz hasarlı veya arızalı gelirse, 48 saat içinde ürün ve ambalaj fotoğraflarıyla hello@jincosmetic.co adresine ulaşın. Değişim veya kargo dahil tam iade düzenleriz.',
          ],
        },
        {
          heading: 'Türkiye — cayma hakkı',
          paragraphs: [
            'Türkiye\'deki müşterilerimiz için online alışverişler Mesafeli Sözleşmeler Yönetmeliği\'ne tabidir. Ürün açılmamış ve kullanılmamış olmak kaydıyla, teslimattan itibaren 14 gün içinde gerekçe göstermeksizin sözleşmeden cayabilirsiniz.',
          ],
          list: [
            'Teslimattan itibaren 14 gün içinde hello@jincosmetic.co adresine bildirim yapın',
            'Cayma bildiriminden sonra 10 gün içinde ürünü orijinal ambalajında iade edin',
            'Hijyen nedeniyle açılmış kozmetik ürünler, arızalı olmadıkça cayma kapsamı dışındadır',
            'İade edilen ürün bize ulaştıktan sonra 14 gün içinde bedel iadesi yapılır',
          ],
        },
      ],
    },
    seo: {
      en: {
        title: 'Shipping & Returns | Jin Cosmetics',
        description:
          'Shipping destinations, delivery times, customs, returns and Turkish withdrawal rights for Jin Cosmetics orders.',
      },
      tr: {
        title: 'Kargo & İade | Jin Cosmetics',
        description:
          'Jin Cosmetics siparişleri için teslimat süreleri, gümrük, iade koşulları ve cayma hakkı bilgileri.',
      },
    },
  },
  privacy: {
    slug: 'privacy-policy',
    eyebrow: {en: 'Privacy Policy', tr: 'Gizlilik Politikası'},
    title: {en: 'Your data, handled with care.', tr: 'Verileriniz özenle korunur.'},
    intro: {
      en: 'This policy explains how Jin Cosmetics collects, uses and protects your personal data in accordance with UK GDPR, EU GDPR and Turkish KVKK (Law No. 6698).',
      tr: 'Bu politika, Jin Cosmetics\'in kişisel verilerinizi BK GDPR, AB GDPR ve 6698 sayılı KVKK kapsamında nasıl topladığını, kullandığını ve koruduğunu açıklar.',
    },
    updated: '2026-06-26',
    blocks: {
      en: [
        {
          heading: 'Data controller',
          paragraphs: [
            'Jin Cosmetics',
            'London, United Kingdom',
            'Email: hello@jincosmetic.co',
            'Website: jincosmetic.co',
          ],
        },
        {
          heading: 'What data we collect',
          list: [
            'Identity & contact: name, email address, phone number, delivery and billing address',
            'Order data: products purchased, order history, payment status (card details are processed securely by Shopify Payments — we do not store full card numbers)',
            'Account data: login credentials if you create an account',
            'Communication: messages you send to customer care',
            'Technical data: IP address, browser type, device information, cookies and usage data',
            'Marketing preferences: newsletter sign-up and consent records',
          ],
        },
        {
          heading: 'How we use your data',
          list: [
            'To process and fulfil your orders and manage returns',
            'To communicate about your order, delivery or customer enquiries',
            'To send marketing communications where you have opted in (you may unsubscribe at any time)',
            'To improve our website, products and customer experience',
            'To comply with legal, tax and accounting obligations',
            'To prevent fraud and protect the security of our services',
          ],
        },
        {
          heading: 'Legal basis (GDPR)',
          list: [
            'Contract: processing necessary to fulfil your order',
            'Consent: marketing emails and non-essential cookies',
            'Legitimate interests: website analytics, fraud prevention and service improvement',
            'Legal obligation: tax, accounting and regulatory compliance',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use essential cookies to operate the site (cart, checkout, security) and optional cookies to understand how visitors use our website. You can accept or decline non-essential cookies via our cookie banner. For more detail, adjust your browser settings or contact us.',
          ],
        },
        {
          heading: 'Data sharing',
          paragraphs: [
            'We share data only where necessary with trusted processors:',
          ],
          list: [
            'Shopify — hosting, checkout and payment processing',
            'Shipping carriers — to deliver your order',
            'Email service providers — for transactional and marketing emails (with consent)',
            'Analytics providers — aggregated, anonymised usage data where enabled',
          ],
        },
        {
          paragraphs: ['We do not sell your personal data to third parties.'],
        },
        {
          heading: 'International transfers',
          paragraphs: [
            'Your data may be processed in the United Kingdom, European Economic Area, United States or other countries where our service providers operate. Where required, we rely on appropriate safeguards such as Standard Contractual Clauses or adequacy decisions.',
          ],
        },
        {
          heading: 'Retention',
          paragraphs: [
            'We retain order and account data for as long as necessary to fulfil the purposes above, typically up to 7 years for tax and accounting records. Marketing consent records are kept until you withdraw consent.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'Under UK GDPR, EU GDPR and Turkish KVKK you may have the right to:',
          ],
          list: [
            'Access the personal data we hold about you',
            'Request correction of inaccurate data',
            'Request deletion of your data (subject to legal retention requirements)',
            'Object to or restrict certain processing',
            'Data portability where applicable',
            'Withdraw consent at any time for consent-based processing',
            'Lodge a complaint with the ICO (UK), your local EU supervisory authority, or the Turkish Personal Data Protection Authority (KVKK Kurulu)',
          ],
        },
        {
          heading: 'Turkey — KVKK notice',
          paragraphs: [
            'If you are located in Turkey, your personal data is processed under Law No. 6698 on the Protection of Personal Data (KVKK). You may submit requests regarding your personal data to hello@jincosmetic.co. We will respond within the statutory period.',
          ],
        },
        {
          heading: 'Children',
          paragraphs: [
            'Our products and website are intended for adults. We do not knowingly collect data from anyone under 16.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update this policy from time to time. The date at the top of this page indicates the latest revision. Continued use of our website after changes constitutes acceptance of the updated policy.',
          ],
        },
      ],
      tr: [
        {
          heading: 'Veri sorumlusu',
          paragraphs: [
            'Jin Cosmetics',
            'Londra, Birleşik Krallık',
            'E-posta: hello@jincosmetic.co',
            'Web sitesi: jincosmetic.co',
          ],
        },
        {
          heading: 'Topladığımız veriler',
          list: [
            'Kimlik & iletişim: ad, e-posta, telefon, teslimat ve fatura adresi',
            'Sipariş verileri: satın alınan ürünler, sipariş geçmişi, ödeme durumu (kart bilgileri Shopify Payments tarafından güvenle işlenir — tam kart numarası saklanmaz)',
            'Hesap verileri: hesap oluşturursanız giriş bilgileri',
            'İletişim: müşteri hizmetlerine gönderdiğiniz mesajlar',
            'Teknik veriler: IP adresi, tarayıcı türü, cihaz bilgisi, çerezler ve kullanım verileri',
            'Pazarlama tercihleri: bülten kaydı ve onay kayıtları',
          ],
        },
        {
          heading: 'Verilerinizi nasıl kullanıyoruz',
          list: [
            'Siparişlerinizi işlemek, teslim etmek ve iadeleri yönetmek',
            'Sipariş, teslimat veya müşteri talepleri hakkında iletişim kurmak',
            'Onay verdiyseniz pazarlama iletileri göndermek (dilediğiniz zaman abonelikten çıkabilirsiniz)',
            'Web sitemizi, ürünlerimizi ve müşteri deneyimini geliştirmek',
            'Yasal, vergi ve muhasebe yükümlülüklerine uymak',
            'Dolandırıcılığı önlemek ve hizmet güvenliğini korumak',
          ],
        },
        {
          heading: 'Hukuki dayanak (GDPR)',
          list: [
            'Sözleşme: siparişinizi yerine getirmek için gerekli işleme',
            'Açık rıza: pazarlama e-postaları ve zorunlu olmayan çerezler',
            'Meşru menfaat: site analitiği, dolandırıcılık önleme ve hizmet iyileştirme',
            'Yasal yükümlülük: vergi, muhasebe ve düzenleyici uyum',
          ],
        },
        {
          heading: 'Çerezler',
          paragraphs: [
            'Sitenin çalışması için gerekli çerezler (sepet, ödeme, güvenlik) ve ziyaretçilerin siteyi nasıl kullandığını anlamak için isteğe bağlı çerezler kullanıyoruz. Zorunlu olmayan çerezleri banner üzerinden kabul veya reddedebilirsiniz. Ayrıntılar için tarayıcı ayarlarınızı değiştirebilir veya bize ulaşabilirsiniz.',
          ],
        },
        {
          heading: 'Veri paylaşımı',
          paragraphs: ['Veriler yalnızca gerekli hallerde güvenilir işleyicilerle paylaşılır:'],
          list: [
            'Shopify — barındırma, ödeme ve checkout',
            'Kargo firmaları — sipariş teslimatı',
            'E-posta hizmet sağlayıcıları — işlem ve pazarlama e-postaları (onayla)',
            'Analitik sağlayıcılar — etkinse toplu, anonim kullanım verileri',
          ],
        },
        {
          paragraphs: ['Kişisel verilerinizi üçüncü taraflara satmıyoruz.'],
        },
        {
          heading: 'Uluslararası aktarım',
          paragraphs: [
            'Verileriniz Birleşik Krallık, Avrupa Ekonomik Alanı, Amerika Birleşik Devletleri veya hizmet sağlayıcılarımızın faaliyet gösterdiği diğer ülkelerde işlenebilir. Gerektiğinde Standart Sözleşme Maddeleri veya yeterlilik kararları gibi uygun güvencelere dayanılır.',
          ],
        },
        {
          heading: 'Saklama süresi',
          paragraphs: [
            'Sipariş ve hesap verileri, yukarıdaki amaçlar için gerekli olduğu sürece — vergi ve muhasebe kayıtları için genellikle 7 yıla kadar — saklanır. Pazarlama onay kayıtları, onayınızı geri çekene kadar tutulur.',
          ],
        },
        {
          heading: 'Haklarınız',
          paragraphs: [
            'BK GDPR, AB GDPR ve KVKK kapsamında aşağıdaki haklara sahip olabilirsiniz:',
          ],
          list: [
            'Hakkınızda tuttuğumuz verilere erişim talep etmek',
            'Hatalı verilerin düzeltilmesini istemek',
            'Verilerin silinmesini talep etmek (yasal saklama zorunlulukları saklı)',
            'Belirli işlemelere itiraz etmek veya kısıtlamak',
            'Uygulanabilir olduğunda veri taşınabilirliği',
            'Rızaya dayalı işlemlerde rızayı geri çekmek',
            'BK ICO, yerel AB denetim otoritesi veya KVKK Kurulu\'na şikâyet başvurusu yapmak',
          ],
        },
        {
          heading: 'Türkiye — KVKK aydınlatması',
          paragraphs: [
            'Türkiye\'de bulunuyorsanız kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında işlenir. Kişisel verilerinize ilişkin taleplerinizi hello@jincosmetic.co adresine iletebilirsiniz. Yasal süre içinde yanıt verilir.',
          ],
        },
        {
          heading: 'Çocuklar',
          paragraphs: [
            'Ürünlerimiz ve web sitemiz yetişkinlere yöneliktir. 16 yaş altından bilerek veri toplamıyoruz.',
          ],
        },
        {
          heading: 'Değişiklikler',
          paragraphs: [
            'Bu politikayı zaman zaman güncelleyebiliriz. Sayfanın üstündeki tarih en son revizyonu gösterir. Değişikliklerden sonra siteyi kullanmaya devam etmeniz güncellenmiş politikayı kabul ettiğiniz anlamına gelir.',
          ],
        },
      ],
    },
    seo: {
      en: {
        title: 'Privacy Policy | Jin Cosmetics',
        description:
          'How Jin Cosmetics handles your personal data — GDPR and KVKK compliant privacy policy.',
      },
      tr: {
        title: 'Gizlilik Politikası | Jin Cosmetics',
        description:
          'Jin Cosmetics kişisel verilerinizi nasıl işler — GDPR ve KVKK uyumlu gizlilik politikası.',
      },
    },
  },
} satisfies Record<string, JinLegalPage>;

export type JinLegalPageKey = keyof typeof JIN_LEGAL_PAGES;

export function getJinLegalPage(key: JinLegalPageKey): JinLegalPage {
  return JIN_LEGAL_PAGES[key];
}
