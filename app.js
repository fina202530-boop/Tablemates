const translationRows = [
      ["TableMates — A world of food, one shared table", "TableMates — 世界の味を、ひとつの食卓で", "TableMates — খাবারের টেবিলে সারা বিশ্ব", "TableMates — एउटै टेबलमा संसारभरका स्वाद", "TableMates — එකම මේසයක ලොව රස", "TableMates — Le monde des saveurs à une même table"],
      ["New to Japan?", "日本に来たばかりですか？", "জাপানে নতুন?", "जापानमा नयाँ हुनुहुन्छ?", "ජපානයට අලුතින්ද?", "Nouveau au Japon ?"],
      ["Come as a stranger. Leave with a story (and a few new friends).", "初めてでも大丈夫。思い出と新しい友だちを連れて帰ろう。", "অচেনা মানুষ হয়ে আসুন, গল্প আর নতুন বন্ধু নিয়ে ফিরুন।", "अपरिचित भएर आउनुहोस्, कथा र नयाँ साथी लिएर फर्कनुहोस्।", "ආගන්තුකයෙකු ලෙස එන්න. කතාවක් සහ නව මිතුරන් සමඟ යන්න.", "Venez sans connaître personne. Repartez avec une histoire et de nouveaux amis."],
      ["Main navigation", "メインナビゲーション", "প্রধান নেভিগেশন", "मुख्य नेभिगेसन", "ප්‍රධාන සංචාලනය", "Navigation principale"],
      ["TableMates Japan home", "TableMates Japan ホーム", "TableMates Japan হোম", "TableMates Japan गृहपृष्ठ", "TableMates Japan මුල් පිටුව", "Accueil TableMates Japan"],
      ["Home", "ホーム", "হোম", "गृहपृष्ठ", "මුල් පිටුව", "Accueil"],
      ["Experiences", "体験", "অভিজ্ঞতা", "अनुभवहरू", "අත්දැකීම්", "Expériences"],
      ["Our story", "私たちのストーリー", "আমাদের গল্প", "हाम्रो कथा", "අපේ කතාව", "Notre histoire"],
      ["Choose language", "言語を選択", "ভাষা নির্বাচন করুন", "भाषा छान्नुहोस्", "භාෂාව තෝරන්න", "Choisir la langue"],
      ["Log in", "ログイン", "লগ ইন", "लग इन", "පිවිසෙන්න", "Connexion"],
      ["Open navigation", "ナビゲーションを開く", "নেভিগেশন খুলুন", "नेभिगेसन खोल्नुहोस्", "සංචාලනය විවෘත කරන්න", "Ouvrir la navigation"],
      ["Good food. Good people. One world.", "おいしい食事。素敵な人々。ひとつの世界。", "ভালো খাবার। ভালো মানুষ। এক পৃথিবী।", "मिठो खाना। राम्रा साथी। एउटै संसार।", "රසවත් ආහාර. හොඳ මිනිසුන්. එකම ලෝකයක්.", "Bonne cuisine. Belles rencontres. Un seul monde."],
      ["One table. A world of friends.", "ひとつの食卓から、世界中の友だち。", "এক টেবিলে, সারা বিশ্বের বন্ধু।", "एउटै टेबलमा, संसारभरिका साथीहरू।", "එක මේසයකින් ලොව පුරා මිතුරන්.", "Une table. Des amis du monde entier."],
      ["Flavors from every culture.", "あらゆる文化の味わいを。", "প্রতিটি সংস্কৃতির স্বাদ।", "हरेक संस्कृतिका स्वादहरू।", "සෑම සංස්කෘතියකම රසය.", "Les saveurs de toutes les cultures."],
      ["Share food and traditions from around the world. Meet new friends, exchange stories, and feel at home together.", "世界各地の料理や文化を分かち合いましょう。新しい友だちと出会い、物語を交わしながら、一緒に居心地のよい時間を過ごしましょう。", "সারা বিশ্বের খাবার ও ঐতিহ্য ভাগ করে নিন। নতুন বন্ধুদের সঙ্গে দেখা করুন, গল্প বিনিময় করুন, আর একসঙ্গে আপন করে নিন।", "संसारभरिका परिकार र परम्परा बाँड्नुहोस्। नयाँ साथीहरू भेट्नुहोस्, कथा साट्नुहोस् र सँगै अपनत्व महसुस गर्नुहोस्।", "ලොව පුරා ආහාර සහ සම්ප්‍රදායන් බෙදාගන්න. නව මිතුරන් හමුවී, කතා හුවමාරු කරගෙන, එකටම නිවසේ සිටින හැඟීමක් ලබන්න.", "Partagez des plats et des traditions du monde entier. Rencontrez de nouveaux amis, échangez des histoires et sentez-vous chez vous ensemble."],
      ["Explore experiences", "体験を探す", "অভিজ্ঞতা ঘুরে দেখুন", "अनुभवहरू हेर्नुहोस्", "අත්දැකීම් සොයා බලන්න", "Découvrir les expériences"],
      ["How it works", "参加方法", "যেভাবে কাজ করে", "कसरी काम गर्छ", "එය ක්‍රියා කරන ආකාරය", "Comment ça marche"],
      ["new connections made over a shared table", "食卓を囲んで生まれた新しいつながり", "একসঙ্গে খাবার ভাগ করে গড়া নতুন সম্পর্ক", "सँगै टेबलमा बसेर बनेका नयाँ सम्बन्ध", "එක මේසයක බෙදාගත් ආහාරයෙන් ගොඩනැගුණු නව සම්බන්ධතා", "nouvelles rencontres autour d’une table"],
      ["Friends sharing dinner together at a warmly lit restaurant", "温かな灯りのレストランで夕食を囲む友人たち", "উষ্ণ আলোয় ভরা রেস্তোরাঁয় একসঙ্গে রাতের খাবার ভাগ করছেন বন্ধুরা", "न्यानो प्रकाश भएको रेस्टुरेन्टमा सँगै बेलुकाको खाना बाँड्दै गरेका साथीहरू", "උණුසුම් ආලෝකයෙන් යුතු අවන්හලක එකට රාත්‍රී ආහාරය බෙදාගන්නා මිතුරන්", "Des amis partagent un dîner dans un restaurant à l’éclairage chaleureux"],
      ["Japanese street food grilled fresh for an evening food walk", "夜の食べ歩きで味わう、焼きたての日本の屋台料理", "সন্ধ্যার খাবার ভ্রমণে সদ্য গ্রিল করা জাপানি স্ট্রিট ফুড", "साँझको खाना यात्राका लागि ताजा ग्रिल गरिएको जापानी सडक खाना", "සවස ආහාර චාරිකාවකදී නැවුම්ව ග්‍රිල් කළ ජපන් වීදි ආහාර", "Cuisine de rue japonaise grillée à la minute pour une balade gourmande en soirée"],
      ["A flight of Japanese matcha, roasted hojicha and South Asian spiced chai", "日本の抹茶、焙じ茶、南アジアのスパイスチャイの飲み比べ", "জাপানি ম্যাচা, ভাজা হোজিচা ও দক্ষিণ এশীয় মসলাদার চায়ের স্বাদ নেওয়ার আয়োজন", "जापानी माचा, भुटेको होजिचा र दक्षिण एसियाली मसलेदार चियाको स्वाद", "ජපන් මැචා, බැදපු හෝජිචා සහ දකුණු ආසියානු කුළුබඩු චායි රස බැලීම", "Dégustation de matcha japonais, de hōjicha torréfié et de chai épicé d’Asie du Sud"],
      ["Fresh Japanese sushi served at a local restaurant", "地元のレストランで提供される新鮮な日本の寿司", "স্থানীয় রেস্তোরাঁয় পরিবেশিত টাটকা জাপানি সুশি", "स्थानीय रेस्टुरेन्टमा परोसिएको ताजा जापानी सुशी", "දේශීය අවන්හලක පිළිගන්වන නැවුම් ජපන් සුෂි", "Sushi japonais frais servi dans un restaurant local"],
      ["Friends from different backgrounds sharing dinner around one table", "さまざまな背景を持つ友人たちがひとつの食卓を囲む", "বিভিন্ন পটভূমির বন্ধুরা এক টেবিলে রাতের খাবার ভাগ করছেন", "फरक पृष्ठभूमिका साथीहरू एउटै टेबलमा बेलुकाको खाना बाँड्दै", "විවිධ පසුබිම්වල මිතුරන් එක මේසයක රාත්‍රී ආහාරය බෙදාගනිති", "Des amis d’horizons différents partagent un dîner autour d’une même table"],
      ["Artisan craft workshop materials laid out on a table", "テーブルに並べられた職人の工芸体験の材料", "টেবিলে সাজানো কারুশিল্প কর্মশালার উপকরণ", "टेबलमा सजाइएका हस्तकला कार्यशालाका सामग्री", "මේසය මත අතුරා ඇති ශිල්ප වැඩමුළුවේ ද්‍රව්‍ය", "Matériel d’atelier artisanal disposé sur une table"],
      ["Japanese mochi and green tea served together on a ceramic plate", "陶器の皿に盛られた日本の餅と緑茶", "সিরামিকের প্লেটে পরিবেশিত জাপানি মোচি ও সবুজ চা", "सिरेमिक प्लेटमा परोसिएको जापानी मोची र हरियो चिया", "සෙරමික් පිඟානක පිළිගන්වන ජපන් මෝචි සහ හරිත තේ", "Mochi japonais et thé vert servis ensemble sur une assiette en céramique"],
      ["A South Asian shared dinner spread arranged on a table", "テーブルに並べられた南アジア料理の食卓", "টেবিলে সাজানো দক্ষিণ এশীয় খাবারের আয়োজন", "टेबलमा सजाइएको दक्षिण एसियाली साझा रात्रिभोज", "මේසයක් මත සකස් කළ දකුණු ආසියානු හවුල් රාත්‍රී භෝජන සංග්‍රහය", "Un repas partagé d’Asie du Sud dressé sur une table"],
      ["Fresh local food prepared with seasonal ingredients", "旬の食材で調理した地元の新鮮な料理", "মৌসুমি উপকরণে তৈরি টাটকা স্থানীয় খাবার", "मौसमी सामग्रीबाट तयार गरिएको ताजा स्थानीय खाना", "සෘතුමය අමුද්‍රව්‍යවලින් පිළියෙල කළ නැවුම් දේශීය ආහාර", "Cuisine locale fraîche préparée avec des ingrédients de saison"],
      ["Tea set prepared for a peaceful tea ceremony", "穏やかな茶会のために用意された茶器", "শান্ত চা অনুষ্ঠানের জন্য সাজানো চায়ের সরঞ্জাম", "शान्त चिया समारोहका लागि तयार पारिएको चिया सेट", "සන්සුන් තේ උත්සවයක් සඳහා සූදානම් කළ තේ කට්ටලය", "Service à thé préparé pour une cérémonie paisible"],
      ["Fresh bites from a local Japanese street food stall", "地元の屋台で作られたできたての日本の軽食", "স্থানীয় জাপানি খাবারের দোকানের টাটকা খাবার", "स्थानीय जापानी सडक खाना पसलका ताजा परिकार", "දේශීය ජපන් වීදි ආහාර කඩයකින් නැවුම් කෑම", "Bouchées fraîches d’un stand de cuisine de rue japonaise"],
      ["A friendly group gathering for brunch", "ブランチを楽しむ和やかなグループ", "ব্রাঞ্চে মিলিত এক বন্ধুত্বপূর্ণ দল", "ब्रन्चका लागि भेला भएको मैत्रीपूर्ण समूह", "බ්‍රන්ච් සඳහා එක්වූ මිත්‍රශීලී පිරිසක්", "Un groupe convivial réuni pour un brunch"],
      ["A diverse group of friends sitting together outdoors", "屋外で一緒に過ごす多様な友人たち", "বাইরে একসঙ্গে বসে থাকা নানা পটভূমির বন্ধুরা", "बाहिर सँगै बसेका विविध पृष्ठभूमिका साथीहरू", "එළිමහනේ එකට වාඩි වී සිටින විවිධ පසුබිම්වල මිතුරන්", "Un groupe d’amis d’horizons divers réunis en plein air"],
      ["Tonight in Osaka", "今夜の大阪", "আজ রাতে ওসাকায়", "आज राति ओसाकामा", "අද රාත්‍රියේ ඔසාකාහි", "Ce soir à Osaka"],
      ["Small tables, open hearts", "小さな食卓、開かれた心", "ছোট টেবিল, খোলা মন", "सानो टेबल, खुला मन", "කුඩා මේස, විවෘත හදවත්", "Petites tables, grands cœurs"],
      ["Your people are here.", "あなたにぴったりの仲間がここに。", "আপনার আপনজনেরা এখানেই।", "तपाईंका साथीहरू यहीँ छन्।", "ඔබේ මිනිසුන් මෙහි සිටිති.", "Vos amis sont ici."],
      ["Come meet them over dinner.", "夕食を囲んで、仲間に出会おう。", "রাতের খাবারে তাদের সঙ্গে পরিচিত হোন।", "बेलुकाको खानासँगै उनीहरूलाई भेट्नुहोस्।", "රාත්‍රී ආහාරය අතරතුර ඔවුන් හමුවන්න.", "Venez les rencontrer autour d’un dîner."],
      ["A once-in-a-lifetime", "一生に一度の", "জীবনে একবারের", "जीवनमा एकपटक हुने", "ජීවිතයේ එක් වරක්", "Une rencontre d’une vie"],
      ["meeting", "出会い", "সাক্ষাৎ", "भेट", "හමුවීම", "rencontre"],
      ["Your next favorite memory", "次のお気に入りの思い出", "আপনার পরের প্রিয় স্মৃতি", "तपाईंको अर्को प्रिय सम्झना", "ඔබේ මීළඟ ප්‍රියතම මතකය", "Votre prochain beau souvenir"],
      ["Find your kind of table.", "あなたにぴったりの食卓を見つけよう。", "আপনার পছন্দের টেবিল খুঁজে নিন।", "आफूलाई मन पर्ने टेबल खोज्नुहोस्।", "ඔබට ගැළපෙන මේසයක් සොයාගන්න.", "Trouvez la table qui vous ressemble."],
      ["Local hosts, thoughtful little groups, and a seat saved just for you. All across Japan.", "地元のホストが案内する少人数の集まり。あなたの席を用意して、日本各地でお待ちしています。", "স্থানীয় হোস্ট, ছোট যত্নশীল দল, আর আপনার জন্য রাখা একটি আসন—জাপানজুড়ে।", "स्थानीय होस्ट, साना आत्मीय समूह र तपाईंका लागि छुट्याइएको सिट—जापानभरि।", "දේශීය සත්කාරකයන්, කුඩා සුහද කණ්ඩායම් සහ ඔබ වෙනුවෙන් වෙන් කළ ආසනයක්—ජපානය පුරා.", "Des hôtes locaux, de petits groupes attentionnés et une place pour vous, partout au Japon."],
      ["Filter experiences", "体験を絞り込む", "অভিজ্ঞতা বাছাই করুন", "अनुभवहरू छान्नुहोस्", "අත්දැකීම් පෙරන්න", "Filtrer les expériences"],
      ["All experiences", "すべての体験", "সব অভিজ্ঞতা", "सबै अनुभवहरू", "සියලු අත්දැකීම්", "Toutes les expériences"],
      ["Food tours", "食べ歩きツアー", "খাবারের ট্যুর", "खाना भ्रमणहरू", "ආහාර චාරිකා", "Balades gourmandes"],
      ["Tea & sweets", "お茶とお菓子", "চা ও মিষ্টি", "चिया र मिठाई", "තේ සහ රසකැවිලි", "Thé et douceurs"],
      ["Food meetups", "食事交流会", "খাবারের আড্ডা", "खाना भेटघाट", "ආහාර හමුවීම්", "Rencontres gourmandes"],
      ["Culture", "文化", "সংস্কৃতি", "संस्कृति", "සංස්කෘතිය", "Culture"],
      ["Pop-up events", "期間限定イベント", "পপ-আপ অনুষ্ঠান", "पप-अप कार्यक्रमहरू", "පොප්-අප් උත්සව", "Événements éphémères"],
      ["Find events on a date", "日付からイベントを探す", "তারিখ অনুযায়ী অনুষ্ঠান খুঁজুন", "मितिअनुसार कार्यक्रम खोज्नुहोस्", "දිනය අනුව උත්සව සොයන්න", "Trouver des événements par date"],
      ["Show events available on this date", "この日に開催されるイベントを表示", "এই তারিখের অনুষ্ঠান দেখান", "यो मितिका कार्यक्रम देखाउनुहोस्", "මෙම දිනයේ ඇති උත්සව පෙන්වන්න", "Afficher les événements à cette date"],
      ["Clear date", "日付をクリア", "তারিখ মুছুন", "मिति हटाउनुहोस्", "දිනය මකන්න", "Effacer la date"],
      ["Food tour", "食べ歩きツアー", "খাবারের ট্যুর", "खाना भ्रमण", "ආහාර චාරිකාව", "Balade gourmande"],
      ["Food meetup", "食事交流会", "খাবারের আড্ডা", "खाना भेटघाट", "ආහාර හමුවීම", "Rencontre gourmande"],
      ["Pop-up event", "期間限定イベント", "পপ-আপ অনুষ্ঠান", "पप-अप कार्यक्रम", "පොප්-අප් උත්සවය", "Événement éphémère"],
      ["Book a seat", "席を予約", "আসন বুক করুন", "सिट बुक गर्नुहोस्", "ආසනයක් වෙන්කරන්න", "Réserver une place"],
      ["Book now", "今すぐ予約", "এখনই বুক করুন", "अहिले बुक गर्नुहोस्", "දැන් වෙන්කරන්න", "Réserver maintenant"],
      ["stories", "件のストーリー", "টি গল্প", "कथा", "කතා", "avis"],
      ["· Read & share", "· 読む・共有する", "· পড়ুন ও শেয়ার করুন", "· पढ्नुहोस् र साझा गर्नुहोस्", "· කියවන්න සහ බෙදාගන්න", "· Lire et partager"],
      ["OSAKA", "大阪", "ওসাকা", "ओसाका", "ඔසාකා", "OSAKA"],
      ["KYOTO", "京都", "কিয়োটো", "क्योटो", "කියෝතෝ", "KYOTO"],
      ["TOKYO", "東京", "টোকিও", "टोकियो", "ටෝකියෝ", "TOKYO"],
      ["NARA", "奈良", "নারা", "नारा", "නාරා", "NARA"],
      ["TOKYO · ASAKUSA", "東京 · 浅草", "টোকিও · আসাকুসা", "टोकियो · आसाकुसा", "ටෝකියෝ · අසකුසා", "TOKYO · ASAKUSA"],
      ["OSAKA · NAMBA", "大阪 · 難波", "ওসাকা · নাম্বা", "ओसाका · नम्बा", "ඔසාකා · නම්බා", "OSAKA · NAMBA"],
      ["KYOTO · GION", "京都 · 祇園", "কিয়োটো · গিয়ন", "क्योटो · गिओन", "කියෝතෝ · ගියොන්", "KYOTO · GION"],
      ["OSAKA · UMEDA", "大阪 · 梅田", "ওসাকা · উমেদা", "ओसाका · उमेडा", "ඔසාකා · උමේදා", "OSAKA · UMEDA"],
      ["TOKYO · SHIBUYA", "東京 · 渋谷", "টোকিও · শিবুয়া", "टोकियो · शिबुया", "ටෝකියෝ · ෂිබුයා", "TOKYO · SHIBUYA"],
      ["Sat, Oct 24 · 6:00 PM", "10月24日（土）午後6:00", "শনি, ২৪ অক্টো · সন্ধ্যা ৬:০০", "शनि, अक्टोबर २४ · साँझ ६:००", "ඔක්. 24 සෙනසුරාදා · ප.ව. 6:00", "Sam. 24 oct. · 18 h"],
      ["Sun, Oct 25 · 2:00 PM", "10月25日（日）午後2:00", "রবি, ২৫ অক্টো · দুপুর ২:০০", "आइत, अक्टोबर २५ · दिउँसो २:००", "ඔක්. 25 ඉරිදා · ප.ව. 2:00", "Dim. 25 oct. · 14 h"],
      ["Fri, Oct 30 · 7:00 PM", "10月30日（金）午後7:00", "শুক্র, ৩০ অক্টো · সন্ধ্যা ৭:০০", "शुक्र, अक्टोबर ३० · साँझ ७:००", "ඔක්. 30 සිකුරාදා · ප.ව. 7:00", "Ven. 30 oct. · 19 h"],
      ["Sat, Oct 31 · 11:00 AM", "10月31日（土）午前11:00", "শনি, ৩১ অক্টো · সকাল ১১:০০", "शनि, अक्टोबर ३१ · बिहान ११:००", "ඔක්. 31 සෙනසුරාදා · පෙ.ව. 11:00", "Sam. 31 oct. · 11 h"],
      ["Sun, Nov 1 · 3:30 PM", "11月1日（日）午後3:30", "রবি, ১ নভে · বিকেল ৩:৩০", "आइत, नोभेम्बर १ · दिउँसो ३:३०", "නොවැ. 1 ඉරිදා · ප.ව. 3:30", "Dim. 1 nov. · 15 h 30"],
      ["Wed, Nov 4 · 9:30 AM", "11月4日（水）午前9:30", "বুধ, ৪ নভে · সকাল ৯:৩০", "बुध, नोभेम्बर ४ · बिहान ९:३०", "නොවැ. 4 බදාදා · පෙ.ව. 9:30", "Mer. 4 nov. · 9 h 30"],
      ["Wed, Oct 28 · 11:00 AM", "10月28日（水）午前11:00", "বুধ, ২৮ অক্টো · সকাল ১১:০০", "बुध, अक्टोबर २८ · बिहान ११:००", "ඔක්. 28 බදාදා · පෙ.ව. 11:00", "Mer. 28 oct. · 11 h"],
      ["Sun, Nov 8 · 1:00 PM", "11月8日（日）午後1:00", "রবি, ৮ নভে · দুপুর ১:০০", "आइत, नोभेम्बर ८ · दिउँसो १:००", "නොවැ. 8 ඉරිදා · ප.ව. 1:00", "Dim. 8 nov. · 13 h"],
      ["Tue, Oct 27 · 3:00 PM", "10月27日（火）午後3:00", "মঙ্গল, ২৭ অক্টো · বিকেল ৩:০০", "मंगल, अक्टोबर २७ · दिउँसो ३:००", "ඔක්. 27 අඟහරුවාදා · ප.ව. 3:00", "Mar. 27 oct. · 15 h"],
      ["Fri, Nov 6 · 1:30 PM", "11月6日（金）午後1:30", "শুক্র, ৬ নভে · দুপুর ১:৩০", "शुक्र, नोभेम्बर ६ · दिउँसो १:३०", "නොවැ. 6 සිකුරාදා · ප.ව. 1:30", "Ven. 6 nov. · 13 h 30"],
      ["Mon, Nov 2 · 6:30 PM", "11月2日（月）午後6:30", "সোম, ২ নভে · সন্ধ্যা ৬:৩০", "सोम, नोभेम्बर २ · साँझ ६:३०", "නොවැ. 2 සඳුදා · ප.ව. 6:30", "Lun. 2 nov. · 18 h 30"],
      ["Sun, Nov 8 · 10:30 AM", "11月8日（日）午前10:30", "রবি, ৮ নভে · সকাল ১০:৩০", "आइत, नोभेम्बर ८ · बिहान १०:३०", "නොවැ. 8 ඉරිදා · පෙ.ව. 10:30", "Dim. 8 nov. · 10 h 30"],
      ["Osaka after dark: a local food walk", "夜の大阪を歩く：地元の味めぐり", "রাতের ওসাকা: স্থানীয় খাবারের পথে হাঁটা", "साँझको ओसाका: स्थानीय परिकारको पैदल यात्रा", "රාත්‍රී ඔසාකා: දේශීය ආහාර පාගමන", "Osaka à la nuit tombée : balade gourmande locale"],
      ["Follow your local guide through lantern-lit lanes, tiny izakaya, and the tastes locals keep to themselves.", "地元ガイドと提灯の灯る路地や小さな居酒屋を巡り、地元の人ぞ知る味を楽しみましょう。", "স্থানীয় গাইডের সঙ্গে লণ্ঠন-আলোকিত গলি ও ছোট ইজাকায়া ঘুরে স্থানীয়দের প্রিয় স্বাদ উপভোগ করুন।", "स्थानीय गाइडसँग बत्तीले झिलिमिली गल्ली र साना इजाकाया घुम्दै स्थानीय स्वाद चाख्नुहोस्।", "දේශීය මඟපෙන්වන්නෙකු සමඟ පහන් එළියෙන් දිදුලන මංවල සහ කුඩා ඉසකායාහි සැඟවුණු රස සොයා යන්න.", "Suivez votre guide dans les ruelles aux lanternes, les petits izakaya et les saveurs locales bien gardées."],
      ["A slower afternoon: tea and wagashi", "ゆったり午後のお茶と和菓子", "ধীর বিকেল: চা ও ওয়াগাশি", "आरामिलो दिउँसो: चिया र वागाशी", "සන්සුන් සන්ධ්‍යාවක්: තේ සහ වගෂි", "Un après-midi paisible autour du thé et des wagashi"],
      ["Discover Japanese tea and handmade sweets together, with a gentle introduction to the tea ritual.", "日本茶と手作りのお菓子を味わいながら、茶の湯の作法にやさしく触れてみましょう。", "জাপানি চা ও হাতে তৈরি মিষ্টির স্বাদ নিন, সঙ্গে থাকুক চা-অনুষ্ঠানের সহজ পরিচয়।", "जापानी चिया र हातले बनाइएका मिठाई चाख्नुहोस्, साथै चिया संस्कारको सरल परिचय पाउनुहोस्।", "ජපන් තේ සහ අතින් සෑදූ රසකැවිලි රස බලමින් තේ චාරිත්‍රය හඳුනාගන්න.", "Découvrez le thé japonais et les douceurs artisanales avec une initiation au rituel du thé."],
      ["Around the world, one dinner table", "ひとつの食卓で世界を旅する", "এক টেবিলে সারা বিশ্বের স্বাদ", "एउटै खाना टेबलमा संसारभरिका स्वाद", "එක රාත්‍රී භෝජන මේසයකින් ලොව වටා", "Le monde entier autour d’une table"],
      ["Bring a dish, share a story, and meet neighbors from everywhere at our international potluck.", "一品持ち寄って物語を分かち合い、世界各地から来た近所の人と出会いましょう。", "একটি খাবার নিয়ে আসুন, গল্প ভাগ করুন, আর আন্তর্জাতিক পটলাকে নানা দেশের প্রতিবেশীদের সঙ্গে পরিচিত হোন।", "एउटा परिकार ल्याउनुहोस्, कथा बाँड्नुहोस् र अन्तर्राष्ट्रिय पोटलकमा संसारभरिका छिमेकी भेट्नुहोस्।", "කෑමක් රැගෙන එන්න, කතාවක් බෙදාගන්න, ජාත්‍යන්තර පොට්ලක් හමුවේ ලොව පුරා අසල්වැසියන් හමුවන්න.", "Apportez un plat, partagez une histoire et rencontrez des voisins du monde entier lors de ce repas-partage."],
      ["Make your own little piece of Japan", "自分だけの小さな日本を作ろう", "নিজের হাতে জাপানের ছোট্ট স্মারক বানান", "आफ्नै हातले जापानको सानो सम्झना बनाउनुहोस्", "ඔබේම කුඩා ජපන් නිර්මාණයක් සාදන්න", "Créez votre petit morceau de Japon"],
      ["Try a relaxed hands-on craft session with a local maker, then take home something you made.", "地元の作り手と一緒に気軽な手仕事を体験し、自分で作った作品を持ち帰りましょう。", "স্থানীয় কারুশিল্পীর সঙ্গে হাতে-কলমে কিছু তৈরি করুন, তারপর নিজের বানানো জিনিসটি বাড়ি নিয়ে যান।", "स्थानीय शिल्पकारसँग सहज रूपमा हस्तकला सिक्नुहोस् र आफूले बनाएको वस्तु घर लैजानुहोस्।", "දේශීය නිර්මාණකරුවෙකු සමඟ සරල අත්කම් සැසියකට එක්ව ඔබ සෑදූ දෙයක් ගෙදර රැගෙන යන්න.", "Participez à un atelier artisanal détendu avec un créateur local et repartez avec votre œuvre."],
      ["Sweet Japan, from mochi to matcha", "餅から抹茶まで、日本の甘いひととき", "মোচি থেকে ম্যাচা: জাপানের মিষ্টি স্বাদ", "मोचीदेखि माचासम्म: जापानका मिठा स्वाद", "මෝචි සිට මචා දක්වා ජපානයේ මිහිරි රස", "Douceurs du Japon, du mochi au matcha"],
      ["A sweet little tasting tour of wagashi and treats from around the world, paired with a pot of tea.", "和菓子や世界のお菓子をお茶とともに楽しむ、甘い味めぐりです。", "এক পাত্র চায়ের সঙ্গে ওয়াগাশি ও বিশ্বের নানা মিষ্টির ছোট্ট স্বাদ-ভ্রমণ।", "एक कप चियासँग वागाशी र संसारभरिका मिठाईहरूको मिठो स्वाद यात्रा।", "තේ කෝප්පයක් සමඟ වගෂි සහ ලොව පුරා රසකැවිලි රස බැලීමේ මිහිරි චාරිකාවක්.", "Une douce dégustation de wagashi et de gourmandises du monde, accompagnée d’un thé."],
      ["Kyoto market morning with Yuki", "ユキと巡る京都市場の朝", "ইউকির সঙ্গে কিয়োটোর বাজারে সকাল", "युकीसँग क्योटो बजारको बिहान", "යුකි සමඟ කියෝතෝ වෙළඳපොළේ උදෑසන", "Matinée au marché de Kyoto avec Yuki"],
      ["Meet the makers, taste the season, and wander Nishiki Market with a friendly local foodie.", "作り手に会い、旬の味を楽しみながら、地元の食通と錦市場を歩きましょう。", "কারিগরদের সঙ্গে দেখা করুন, মৌসুমি স্বাদ নিন, আর স্থানীয় খাবারপ্রেমীর সঙ্গে নিশিকি বাজার ঘুরুন।", "उत्पादकहरूलाई भेट्नुहोस्, मौसमी स्वाद चाख्नुहोस् र स्थानीय खानाप्रेमीसँग निशिकी बजार घुम्नुहोस्।", "නිෂ්පාදකයන් හමුවී, සෘතුමය රස විඳ, දේශීය ආහාර රසිකයෙකු සමඟ නිෂිකි වෙළඳපොළේ ඇවිදින්න.", "Rencontrez les artisans, goûtez aux produits de saison et flânez au marché Nishiki avec un passionné local."],
      ["Tokyo old-town bites with Kenji", "ケンジと味わう東京・下町の食べ歩き", "কেনজির সঙ্গে পুরোনো টোকিওর খাবার", "केन्जीसँग पुरानो टोकियोका स्वाद", "කෙන්ජි සමඟ පැරණි ටෝකියෝවේ රස", "Saveurs du vieux Tokyo avec Kenji"],
      ["Wander Asakusa with a local guide, tasting handmade snacks and neighborhood favorites along the way.", "地元ガイドと浅草を歩きながら、手作りのおやつや近所で人気の味を楽しみましょう。", "স্থানীয় গাইডের সঙ্গে আসাকুসা ঘুরে হাতে তৈরি নাশতা ও পাড়ার প্রিয় খাবার চেখে দেখুন।", "स्थानीय गाइडसँग आसाकुसा घुम्दै हातले बनेका खाजा र छिमेकका मनपर्ने स्वाद चाख्नुहोस्।", "දේශීය මඟපෙන්වන්නෙකු සමඟ අසකුසාහි ඇවිදිමින් අතින් සෑදූ කෙටි ආහාර සහ අසල්වැසි ප්‍රියතම රස බලන්න.", "Explorez Asakusa avec un guide local et goûtez aux en-cas artisanaux et aux spécialités du quartier."],
      ["Nara street food and mochi walk", "奈良の屋台グルメと餅つき散歩", "নারার রাস্তার খাবার ও মোচি ভ্রমণ", "नाराको सडक खाना र मोची यात्रा", "නාරා වීදි ආහාර සහ මෝචි පාගමන", "Balade de street food et mochi à Nara"],
      ["Try freshly pounded mochi, local sweets, and favorite street snacks on a friendly town-center walk.", "つきたての餅や地元のお菓子、人気の屋台グルメを楽しみながら、街の中心を歩きましょう。", "শহরের কেন্দ্রে হাঁটতে হাঁটতে সদ্য পেষা মোচি, স্থানীয় মিষ্টি ও জনপ্রিয় রাস্তার খাবার চেখে দেখুন।", "सहरको केन्द्रमा रमाइलो पैदल यात्रामा ताजा मोची, स्थानीय मिठाई र मनपर्ने सडक खाजा चाख्नुहोस्।", "නගර මධ්‍යයේ සුහද පාගමනකදී අලුතින් තැළූ මෝචි, දේශීය රසකැවිලි සහ වීදි ආහාර රස බලන්න.", "Goûtez au mochi fraîchement pilé, aux douceurs locales et aux en-cas de rue lors d’une balade conviviale."],
      ["Matcha whisking", "抹茶を点てる", "ম্যাচা ফেটানো", "माचा फेट्ने", "මචා පෙණගැන්වීම", "Préparation du matcha"],
      ["Masala chai", "マサラチャイ", "মসলা চা", "मसला चिया", "මසාලා චායි", "Chai masala"],
      ["Ceylon tea", "セイロンティー", "সিলন চা", "सिलोन चिया", "සිලෝන් තේ", "Thé de Ceylan"],
      ["A colorful tea flight: Japanese matcha, Indian chai and Sri Lankan Ceylon tea", "日本の抹茶、インドのチャイ、スリランカのセイロンティーを楽しむ彩り豊かなティーセット", "জাপানি ম্যাচা, ভারতীয় চা ও শ্রীলঙ্কার সিলন চায়ের রঙিন আয়োজন", "जापानी माचा, भारतीय चिया र श्रीलंकाली सिलोन चियाको रंगीन स्वाद", "ජපන් මචා, ඉන්දියානු චායි සහ ශ්‍රී ලංකා සිලෝන් තේ ඇතුළත් වර්ණවත් තේ පෙළක්", "Un assortiment coloré : matcha japonais, chai indien et thé de Ceylan sri-lankais"],
      ["Tea passport: five countries, one table", "5か国のお茶をひとつの食卓で", "পাঁচ দেশের চা, এক টেবিলে", "पाँच देशका चिया, एउटै टेबलमा", "රටවල් පහක තේ, එක මේසයක", "Passeport du thé : cinq pays, une table"],
      ["Sample matcha, hojicha, Assam, Nepali tea, and Sri Lankan Ceylon with little sweets from each place.", "抹茶、ほうじ茶、アッサム、ネパール茶、スリランカのセイロンティーを各地のお菓子と味わいましょう。", "ম্যাচা, হোজিচা, আসাম, নেপালি ও শ্রীলঙ্কার সিলন চায়ের সঙ্গে প্রতিটি অঞ্চলের মিষ্টি চেখে দেখুন।", "माचा, होजिचा, आसाम, नेपाली र श्रीलंकाली चियासँग हरेक ठाउँका मिठाई चाख्नुहोस्।", "මචා, හොජිචා, ඇසෑම්, නේපාල සහ ශ්‍රී ලංකා සිලෝන් තේ සමඟ එක් එක් ප්‍රදේශයේ රසකැවිලි රස බලන්න.", "Goûtez au matcha, hojicha, Assam, thé népalais et Ceylan avec des douceurs de chaque région."],
      ["Kyoto tea ceremony and seasonal sweets", "京都の茶会と季節の和菓子", "কিয়োটোর চা-অনুষ্ঠান ও মৌসুমি মিষ্টি", "क्योटोको चिया समारोह र मौसमी मिठाई", "කියෝතෝ තේ උත්සවය සහ සෘතුමය රසකැවිලි", "Cérémonie du thé et douceurs de saison à Kyoto"],
      ["Join a gentle tea ceremony, taste seasonal wagashi, and learn about the meaning behind each step.", "穏やかな茶会に参加し、季節の和菓子を味わいながら、一つひとつの作法に込められた意味を学びましょう。", "সহজ চা-অনুষ্ঠানে যোগ দিন, মৌসুমি ওয়াগাশি উপভোগ করুন, আর প্রতিটি ধাপের অর্থ জানুন।", "सरल चिया समारोहमा सहभागी हुनुहोस्, मौसमी वागाशी चाख्नुहोस् र हरेक चरणको अर्थ जान्नुहोस्।", "සන්සුන් තේ උත්සවයකට එක්වී, සෘතුමය වගෂි රසවිඳ, එක් එක් පියවරේ අරුත ඉගෙනගන්න.", "Participez à une cérémonie du thé paisible, goûtez aux wagashi de saison et découvrez le sens de chaque geste."],
      ["Explore the international tea menu →", "世界のお茶メニューを見る →", "আন্তর্জাতিক চায়ের মেনু দেখুন →", "अन्तर्राष्ट्रिय चिया मेनु हेर्नुहोस् →", "ජාත්‍යන්තර තේ මෙනුව බලන්න →", "Découvrir le menu de thés du monde →"],
      ["Home flavors: a South Asian dinner", "家庭の味：南アジアの夕食会", "ঘরের স্বাদ: দক্ষিণ এশীয় নৈশভোজ", "घरको स्वाद: दक्षिण एसियाली रात्रिभोज", "ගෙදර රස: දකුණු ආසියානු රාත්‍රී භෝජනය", "Saveurs maison : dîner d’Asie du Sud"],
      ["Share Bangladeshi, Nepali, and Sri Lankan home cooking and meet new friends over a relaxed dinner.", "バングラデシュ、ネパール、スリランカの家庭料理を囲み、ゆったりとした夕食で新しい友だちに出会いましょう。", "বাংলাদেশ, নেপাল ও শ্রীলঙ্কার ঘরোয়া রান্না ভাগ করে নিন, আর আরামদায়ক নৈশভোজে নতুন বন্ধুদের সঙ্গে পরিচিত হোন।", "बंगलादेश, नेपाल र श्रीलंकाली घरायसी परिकार बाँड्दै आरामदायी रात्रिभोजमा नयाँ साथी भेट्नुहोस्।", "බංග්ලාදේශ, නේපාල සහ ශ්‍රී ලාංකික ගෙදර කෑම බෙදාගෙන සන්සුන් රාත්‍රී භෝජනයකදී නව මිතුරන් හමුවන්න.", "Partagez des plats familiaux du Bangladesh, du Népal et du Sri Lanka lors d’un dîner convivial."],
      ["Sunday brunch: new in Tokyo", "日曜ブランチ：東京に来たばかりの人へ", "রবিবারের ব্রাঞ্চ: টোকিওতে নতুনদের জন্য", "आइतबार ब्रन्च: टोकियोमा नयाँ भएकाहरूका लागि", "ඉරිදා බ්‍රන්ච්: ටෝකියෝවට අලුතින් ආ අයට", "Brunch du dimanche : nouveaux à Tokyo"],
      ["A low-pressure brunch for international students and newcomers. Come solo and leave with local tips.", "留学生や新しく来た人向けの気軽なブランチ。一人で参加しても、地元のおすすめ情報を持ち帰れます。", "আন্তর্জাতিক শিক্ষার্থী ও নতুনদের জন্য স্বচ্ছন্দ ব্রাঞ্চ। একাই আসুন, স্থানীয় পরামর্শ নিয়ে ফিরুন।", "अन्तर्राष्ट्रिय विद्यार्थी र नयाँ आउनेहरूका लागि सहज ब्रन्च। एक्लै आउनुहोस् र स्थानीय सुझाव लिएर जानुहोस्।", "විදේශීය සිසුන් සහ නවකයන් සඳහා සැහැල්ලු බ්‍රන්ච් එකක්. තනිව එන්න, දේශීය උපදෙස් රැගෙන යන්න.", "Un brunch décontracté pour les étudiants internationaux et les nouveaux arrivants. Venez seul, repartez avec des conseils locaux."],
      ["No events available for this selection. Try another date or service.", "この条件に合うイベントはありません。別の日付やサービスをお試しください。", "এই নির্বাচনে কোনো অনুষ্ঠান নেই। অন্য তারিখ বা সেবা বেছে দেখুন।", "यो छनोटमा कुनै कार्यक्रम छैन। अर्को मिति वा सेवा प्रयास गर्नुहोस्।", "මෙම තේරීමට උත්සව නැත. වෙනත් දිනයක් හෝ සේවාවක් උත්සාහ කරන්න.", "Aucun événement pour cette sélection. Essayez une autre date ou activité."],
      ["A little something for everyone", "みんなにぴったりの体験", "সবার জন্য কিছু না কিছু", "सबैका लागि केही न केही", "සැමට ගැළපෙන දෙයක්", "Un peu de tout pour chacun"],
      ["Come for the experience.", "体験を楽しみに来て。", "অভিজ্ঞতার টানে আসুন।", "अनुभवका लागि आउनुहोस्।", "අත්දැකීම සඳහා එන්න.", "Venez pour l’expérience."],
      ["Stay for the people.", "人との出会いを楽しんで。", "মানুষের সঙ্গে পরিচিত হয়ে থাকুন।", "मानिसहरूसँग जोडिनुहोस्।", "මිනිසුන් වෙනුවෙන් රැඳී සිටින්න.", "Restez pour les rencontres."],
      ["Five ways to feel at home in Japan, whether you just arrived or have been here for years.", "日本に来たばかりの方も、長く暮らしている方も、日本をもっと身近に感じる5つの方法。", "আপনি সদ্য এসেছেন বা বহু বছর ধরে আছেন—জাপানে আপন বোধ করার পাঁচটি উপায়।", "भर्खर आउनुभएको होस् वा वर्षौँदेखि बस्नुभएको होस्, जापानलाई आफ्नै घरझैँ महसुस गर्ने पाँच तरिका।", "ඔබ දැන් පැමිණියත් වසර ගණනක් මෙහි සිටියත්, ජපානය නිවසක් ලෙස හැඟීමට මාර්ග පහක්.", "Cinq façons de se sentir chez soi au Japon, que vous veniez d’arriver ou y viviez depuis longtemps."],
      ["Local food tours", "地元グルメツアー", "স্থানীয় খাবারের ট্যুর", "स्थानीय खानाको भ्रमण", "දේශීය ආහාර චාරිකා", "Balades gourmandes locales"],
      ["Let a local guide lead you to the flavors and tucked-away spots you might miss on your own.", "地元ガイドと一緒に、一人では見つけにくい味や隠れた名店を訪ねましょう。", "স্থানীয় গাইডের সঙ্গে এমন স্বাদ ও লুকানো জায়গা খুঁজুন, যা একা গেলে চোখ এড়িয়ে যেতে পারে।", "स्थानीय गाइडसँग आफूले एक्लै नभेट्टाउन सक्ने स्वाद र लुकेका ठाउँहरू खोज्नुहोस्।", "දේශීය මඟපෙන්වන්නෙකු සමඟ තනිවම මඟහැරිය හැකි රස සහ සැඟවුණු ස්ථාන සොයාගන්න.", "Un guide local vous fait découvrir des saveurs et des adresses discrètes que vous pourriez manquer seul."],
      ["Explore food tours →", "食べ歩きツアーを見る →", "খাবারের ট্যুর দেখুন →", "खाना भ्रमण हेर्नुहोस् →", "ආහාර චාරිකා බලන්න →", "Découvrir les balades gourmandes →"],
      ["Tea & ceremony", "お茶と茶道", "চা ও চা-অনুষ্ঠান", "चिया र चिया समारोह", "තේ සහ තේ උත්සවය", "Thé et cérémonie"],
      ["Share Japanese tea rituals and discover teas from Bangladesh, Nepal, Sri Lanka, and beyond.", "日本の茶の作法を体験し、バングラデシュ、ネパール、スリランカなど世界のお茶に出会いましょう。", "জাপানি চায়ের রীতি ভাগ করে নিন এবং বাংলাদেশ, নেপাল, শ্রীলঙ্কাসহ নানা দেশের চা আবিষ্কার করুন।", "जापानी चिया संस्कार अनुभव गर्नुहोस् र बंगलादेश, नेपाल, श्रीलंका लगायतका चिया चिन्नुहोस्।", "ජපන් තේ චාරිත්‍ර බෙදාගෙන බංග්ලාදේශ, නේපාල, ශ්‍රී ලංකා සහ තවත් රටවල තේ සොයාගන්න.", "Découvrez les rituels du thé japonais et les thés du Bangladesh, du Népal, du Sri Lanka et d’ailleurs."],
      ["Explore tea events →", "お茶のイベントを見る →", "চায়ের অনুষ্ঠান দেখুন →", "चिया कार्यक्रम हेर्नुहोस् →", "තේ උත්සව බලන්න →", "Découvrir les événements autour du thé →"],
      ["Sweets & wagashi", "和菓子とスイーツ", "মিষ্টি ও ওয়াগাশি", "मिठाई र वागाशी", "රසකැවිලි සහ වගෂි", "Douceurs et wagashi"],
      ["Taste Japanese seasonal sweets and treats from around the world, best enjoyed with tea.", "季節の和菓子や世界のお菓子を味わいましょう。お茶と一緒にどうぞ。", "জাপানের মৌসুমি মিষ্টি ও বিশ্বের নানা খাবার চেখে দেখুন—চায়ের সঙ্গে আরও ভালো লাগে।", "जापानका मौसमी मिठाई र संसारभरिका परिकार चाख्नुहोस्, चियासँग अझ स्वादिलो हुन्छ।", "ජපන් සෘතුමය රසකැවිලි සහ ලොව පුරා රසකැවිලි තේ සමඟ රස බලන්න.", "Goûtez aux douceurs saisonnières japonaises et aux gourmandises du monde, à savourer avec du thé."],
      ["Explore tea & sweets →", "お茶とお菓子を見る →", "চা ও মিষ্টি দেখুন →", "चिया र मिठाई हेर्नुहोस् →", "තේ සහ රසකැවිලි බලන්න →", "Découvrir le thé et les douceurs →"],
      ["World food meetups", "世界の料理を囲む交流会", "বিশ্ব খাবারের আড্ডা", "विश्व परिकार भेटघाट", "ලෝක ආහාර හමුවීම්", "Rencontres autour des cuisines du monde"],
      ["Bring your appetite and your story to a welcoming international dinner table.", "食欲とあなたの物語を持って、温かな国際交流の食卓へ。", "ক্ষুধা আর আপনার গল্প নিয়ে আন্তরিক আন্তর্জাতিক নৈশভোজে আসুন।", "भोक र आफ्नो कथा लिएर आत्मीय अन्तर्राष्ट्रिय रात्रिभोजमा आउनुहोस्।", "ඔබේ රුචිය සහ කතාව රැගෙන ආදරණීය ජාත්‍යන්තර රාත්‍රී භෝජන මේසයකට එන්න.", "Apportez votre appétit et votre histoire à une table internationale accueillante."],
      ["Explore meetups →", "交流会を見る →", "আড্ডা দেখুন →", "भेटघाट हेर्नुहोस् →", "හමුවීම් බලන්න →", "Découvrir les rencontres →"],
      ["Culture & making", "文化とものづくり", "সংস্কৃতি ও হাতের কাজ", "संस्कृति र सिर्जना", "සංස්කෘතිය සහ නිර්මාණ", "Culture et création"],
      ["Try a local craft, learn a new tradition, and make something to remember your day by.", "地域の手仕事に挑戦し、新しい伝統を学び、その日の思い出を形にしましょう。", "স্থানীয় কারুশিল্প চেষ্টা করুন, নতুন ঐতিহ্য জানুন, আর দিনের স্মৃতি হিসেবে কিছু তৈরি করুন।", "स्थानीय हस्तकला सिक्नुहोस्, नयाँ परम्परा जान्नुहोस् र सम्झनाका लागि केही बनाउनुहोस्।", "දේශීය අත්කමක් අත්හදා, නව සම්ප්‍රදායක් ඉගෙනගෙන, ඒ දිනය මතක් කරන දෙයක් සාදන්න.", "Essayez un artisanat local, découvrez une tradition et créez un souvenir de votre journée."],
      ["Explore culture →", "文化体験を見る →", "সংস্কৃতি দেখুন →", "संस्कृति अनुभव हेर्नुहोस् →", "සංස්කෘතික අත්දැකීම් බලන්න →", "Découvrir la culture →"],
      ["A little story about why we began", "私たちが始めた理由", "আমরা কেন শুরু করেছিলাম", "हामीले सुरु गर्नुको कारण", "අපි ආරම්භ කළ හේතුව", "Pourquoi nous avons commencé"],
      ["We know what it feels like to start over.", "新しい場所で一から始める気持ちを、私たちは知っています。", "নতুন করে শুরু করার অনুভূতি আমরা বুঝি।", "नयाँ ठाउँमा फेरि सुरु गर्दाको अनुभूति हामी बुझ्छौँ।", "අලුතින් ආරම්භ කිරීමේ හැඟීම අපි දනිමු.", "Nous savons ce que signifie tout recommencer."],
      ["We started TableMates because we understand how lonely Japan can feel when the language is unfamiliar and home is far away. Even simple things can feel harder when you don't yet know the words or the people around you.", "言葉に慣れず、故郷も遠い日本で、心細く感じることを私たちは知っています。周りの人や言葉がまだ分からないと、何気ないことも難しく感じるものです。だからTableMatesを始めました。", "ভাষা অপরিচিত আর বাড়ি দূরে হলে জাপানে একাকী লাগতে পারে—আমরা তা বুঝি। আশপাশের মানুষ বা ভাষা না জানলে ছোট কাজও কঠিন লাগে। তাই TableMates শুরু করেছি।", "भाषा अपरिचित र घर टाढा हुँदा जापानमा एक्लो महसुस हुन सक्छ भन्ने हामी बुझ्छौँ। वरपरका मानिस र भाषा नचिन्दा सामान्य कुरा पनि गाह्रो लाग्छ। त्यसैले TableMates सुरु गर्‍यौँ।", "භාෂාව නුහුරු සහ නිවස දුරස්ථ වූ විට ජපානයේ තනිවූ හැඟීම අපි දනිමු. අවට මිනිසුන් සහ වචන නොදන්නා විට සරල දේවල් පවා අපහසු වේ. ඒ නිසා TableMates ආරම්භ කළෙමු.", "Nous savons combien le Japon peut sembler solitaire quand la langue est inconnue et la maison lointaine. Sans connaître les mots ni les gens, même les choses simples deviennent difficiles. C’est pourquoi nous avons créé TableMates."],
      ["We believe friendship can begin around a shared meal, a cup of tea, or a new experience. Our gatherings bring people from Japan and around the world together to enjoy good food, share stories, and make friends—so little by little, a faraway place can start to feel like home.", "食事や一杯のお茶、新しい体験から友情が始まると信じています。日本や世界各地の人が集い、おいしい料理や物語を分かち合うことで、遠い場所も少しずつ自分の居場所になっていきます。", "একসঙ্গে খাবার, এক কাপ চা বা নতুন অভিজ্ঞতা থেকে বন্ধুত্ব শুরু হতে পারে। আমাদের আড্ডায় জাপান ও বিশ্বের মানুষ ভালো খাবার, গল্প ও বন্ধুত্ব ভাগ করে নেন—দূরের জায়গাটিও ধীরে ধীরে আপন হয়ে ওঠে।", "सँगै खाना, एक कप चिया वा नयाँ अनुभवबाट मित्रता सुरु हुन सक्छ। हाम्रो जमघटमा जापान र संसारका मानिसहरू राम्रो खाना, कथा र मित्रता बाँड्छन्—टाढाको ठाउँ बिस्तारै घरजस्तो लाग्न थाल्छ।", "හවුල් ආහාර වේලකින්, තේ කෝප්පයකින් හෝ නව අත්දැකීමකින් මිත්‍රත්වය ඇරඹිය හැකි බව අපි විශ්වාස කරමු. ජපානයේ සහ ලොව පුරා මිනිසුන් හොඳ ආහාර, කතා සහ මිත්‍රත්වය බෙදාගන්නා විට, දුරස්ථ තැනක් ටිකෙන් ටික නිවසක් සේ දැනේ.", "Nous croyons que l’amitié peut naître autour d’un repas, d’un thé ou d’une nouvelle expérience. Nos rencontres réunissent des personnes du Japon et du monde entier pour partager de bons plats et des histoires, afin qu’un lieu lointain devienne peu à peu un chez-soi."],
      ["Small, friendly groups", "少人数で温かな集まり", "ছোট, বন্ধুত্বপূর্ণ দল", "सानो, आत्मीय समूह", "කුඩා, මිත්‍රශීලී කණ්ඩායම්", "Petits groupes chaleureux"],
      ["Welcoming local hosts", "温かく迎える地元ホスト", "আন্তরিক স্থানীয় হোস্ট", "आत्मीय स्थानीय होस्ट", "ආදරණීය දේශීය සත්කාරකයන්", "Des hôtes locaux accueillants"],
      ["Experiences in English", "英語で楽しめる体験", "ইংরেজিতে অভিজ্ঞতা", "अङ्ग्रेजीमा अनुभवहरू", "ඉංග්‍රීසි භාෂාවෙන් අත්දැකීම්", "Expériences en anglais"],
      ["A community across Japan", "日本各地のコミュニティ", "জাপানজুড়ে একটি কমিউনিটি", "जापानभरि समुदाय", "ජපානය පුරා ප්‍රජාවක්", "Une communauté partout au Japon"],
      ["Find your first meetup", "初めての交流会を探す", "আপনার প্রথম আড্ডাটি খুঁজুন", "आफ्नो पहिलो भेटघाट खोज्नुहोस्", "ඔබේ පළමු හමුවීම සොයාගන්න", "Trouver votre première rencontre"],
      ["Share what you love", "好きなことを分かち合おう", "আপনার ভালোবাসার বিষয় ভাগ করুন", "आफूलाई मन पर्ने कुरा बाँड्नुहोस्", "ඔබ ආදරය කරන දේ බෙදාගන්න", "Partagez ce qui vous passionne"],
      ["Your city. Your culture. Your table.", "あなたの街、あなたの文化、あなたの食卓。", "আপনার শহর। আপনার সংস্কৃতি। আপনার টেবিল।", "तपाईंको सहर। तपाईंको संस्कृति। तपाईंको टेबल।", "ඔබේ නගරය. ඔබේ සංස්කෘතිය. ඔබේ මේසය.", "Votre ville. Votre culture. Votre table."],
      ["Have a favorite food lane, a tea ceremony you love, or a story to share? We welcome host applications from people with thoughtful experience ideas in Japan.", "お気に入りの食べ歩きスポットや好きなお茶の時間、分かち合いたい物語はありますか？日本で心のこしらえた体験を企画するホストを募集しています。", "প্রিয় খাবারের গলি, ভালোবাসার চা-অনুষ্ঠান বা ভাগ করে নেওয়ার গল্প আছে? জাপানে যত্নসহকারে অভিজ্ঞতা আয়োজন করতে আগ্রহী হোস্টদের স্বাগত।", "मनपर्ने खानाको गल्ली, चिया समारोह वा बाँड्न चाहेको कथा छ? जापानमा अर्थपूर्ण अनुभव आयोजना गर्न चाहने होस्टलाई स्वागत छ।", "ඔබ කැමති ආහාර මාවතක්, තේ උත්සවයක් හෝ බෙදාගන්නා කතාවක් තිබේද? ජපානයේ අර්ථවත් අත්දැකීම් පිරිනැමීමට කැමති සත්කාරකයන් පිළිගනිමු.", "Un quartier gourmand, une cérémonie du thé ou une histoire à partager ? Nous accueillons les candidatures de personnes souhaitant proposer des expériences réfléchies au Japon."],
      ["What to include in your application", "応募時に記載する内容", "আবেদনে যা লিখবেন", "आवेदनमा समावेश गर्नुपर्ने कुरा", "අයදුම්පතට ඇතුළත් කළ යුතු දේ", "Informations à inclure dans votre candidature"],
      ["Your name and contact email", "お名前と連絡先メールアドレス", "আপনার নাম ও যোগাযোগের ইমেইল", "तपाईंको नाम र सम्पर्क इमेल", "ඔබේ නම සහ සම්බන්ධතා විද්‍යුත් තැපෑල", "Votre nom et votre adresse e-mail"],
      ["Your city in Japan", "日本でお住まいの都市", "জাপানে আপনার শহর", "जापानमा तपाईंको सहर", "ජපානයේ ඔබේ නගරය", "Votre ville au Japon"],
      ["The experience you would like to host", "開催したい体験", "আপনি যে অভিজ্ঞতা আয়োজন করতে চান", "तपाईंले आयोजना गर्न चाहेको अनुभव", "ඔබ පිරිනැමීමට කැමති අත්දැකීම", "L’expérience que vous souhaitez proposer"],
      ["A short description of your idea and why you would like to host", "企画内容とホストを希望する理由", "আপনার ধারণা ও কেন হোস্ট হতে চান তার সংক্ষিপ্ত বিবরণ", "तपाईंको विचार र होस्ट बन्न चाहनुको छोटो विवरण", "ඔබේ අදහස සහ සත්කාරකයෙකු වීමට කැමති හේතුව පිළිබඳ කෙටි විස්තරයක්", "Une brève description de votre idée et de votre motivation"],
      ["Email your application to", "応募メールの送信先：", "আবেদন ইমেইল করুন:", "आवेदन इमेल पठाउनुहोस्:", "අයදුම්පත යවන්න:", "Envoyez votre candidature à"],
      [". Our team reviews applications before anyone can host a public event.", "。公開イベントを開催する前に、チームが応募内容を確認します。", "। প্রকাশ্য অনুষ্ঠান আয়োজনের আগে আমাদের দল আবেদন পর্যালোচনা করবে।", "। सार्वजनिक कार्यक्रम आयोजना गर्नुअघि हाम्रो टोलीले आवेदन समीक्षा गर्छ।", ". අපගේ කණ්ඩායම පොදු උත්සවයක් පැවැත්වීමට පෙර අයදුම්පත් සමාලෝචනය කරයි.", ". Notre équipe examine les candidatures avant toute animation d’un événement public."],
      ["Little notes from the table", "食卓から届いた小さな声", "টেবিলের আড্ডা থেকে কিছু কথা", "टेबलका साना सम्झनाहरू", "මේසය වටා කුඩා සටහන්", "Quelques mots autour de la table"],
      ["Good company travels.", "良い出会いは旅を彩る。", "ভালো সঙ্গ ভ্রমণকে সুন্দর করে।", "राम्रो साथले यात्रा रमाइलो बनाउँछ।", "හොඳ ඇසුර ගමන සුන්දර කරයි.", "Les belles rencontres voyagent."],
      ["The itinerary is lovely. The people you meet along the way? Even better.", "旅程も素敵。でも、旅先で出会う人はもっと素敵。", "ভ্রমণসূচি সুন্দর। পথে যাদের সঙ্গে দেখা হয়? আরও সুন্দর।", "यात्रा योजना राम्रो छ। बाटोमा भेटिने मानिसहरू? अझ राम्रा।", "ගමන් සැලැස්ම සුන්දරයි. අතරමඟ හමුවන මිනිසුන්ද? ඊටත් වඩා.", "L’itinéraire est beau. Les personnes rencontrées en chemin le sont encore plus."],
      ["“I arrived in Osaka knowing nobody. By the end of dinner, I had plans for the weekend.”", "「誰も知らない大阪に来ましたが、夕食が終わるころには週末の予定ができていました。」", "“ওসাকায় এসে কাউকে চিনতাম না। রাতের খাবার শেষে সপ্তাহান্তের পরিকল্পনাও হয়ে গেল।”", "“ओसाकामा कसैलाई नचिनी आएँ। बेलुकाको खाना सकिँदा सप्ताहन्तको योजना बनिसकेको थियो।”", "“ඔසාකාට පැමිණියේ කිසිවෙකු නොදැනයි. රාත්‍රී ආහාරය අවසන් වන විට සති අන්ත සැලසුම් තිබුණා.”", "« Je suis arrivé à Osaka sans connaître personne. À la fin du dîner, j’avais déjà des projets pour le week-end. »"],
      ["· Student from Nepal", "· ネパール出身の学生", "· নেপালের শিক্ষার্থী", "· नेपालका विद्यार्थी", "· නේපාලයේ ශිෂ්‍යාවක්", "· Étudiante du Népal"],
      ["“The tea was beautiful, but meeting people from so many places made my afternoon.”", "「お茶も素敵でしたが、いろいろな場所から来た人たちとの出会いが午後を彩ってくれました。」", "“চা ছিল দারুণ, তবে নানা জায়গার মানুষের সঙ্গে দেখা হওয়ায় বিকেলটা আরও সুন্দর হয়েছে।”", "“चिया सुन्दर थियो, तर धेरै ठाउँका मानिस भेट्दा मेरो दिउँसो अझ रमाइलो भयो।”", "“තේ ඉතා අලංකාරයි, නමුත් බොහෝ තැන්වලින් පැමිණි අය හමුවීම මගේ සන්ධ්‍යාව තවත් සුන්දර කළා.”", "« Le thé était délicieux, mais rencontrer des personnes venues de partout a rendu mon après-midi inoubliable. »"],
      ["· Visiting from Bangladesh", "· バングラデシュから訪問", "· বাংলাদেশ থেকে বেড়াতে এসেছেন", "· बंगलादेशबाट भ्रमणमा", "· බංග්ලාදේශයෙන් පැමිණි අමුත්තෙක්", "· En visite du Bangladesh"],
      ["“Our host showed us the Osaka I hoped to find. I even made a friend to practice Japanese with.”", "「ホストが、私が見たかった大阪を案内してくれました。日本語を練習する友だちまでできました。」", "“আমাদের হোস্ট সেই ওসাকা দেখিয়েছেন, যা আমি দেখতে চেয়েছিলাম। জাপানি অনুশীলনের বন্ধুও পেয়েছি।”", "“हाम्रो होस्टले मैले खोजेको ओसाका देखाउनुभयो। जापानी अभ्यास गर्ने साथी पनि पाएँ।”", "“අපේ සත්කාරකයා මා බලාපොරොත්තු වූ ඔසාකා පෙන්වූවා. ජපන් පුහුණු කිරීමට මිතුරෙකුත් හමු වුණා.”", "« Notre hôte m’a fait découvrir l’Osaka que j’espérais. J’ai même trouvé un ami pour pratiquer le japonais. »"],
      ["· New in Kyoto", "· 京都に来たばかり", "· কিয়োটোতে নতুন", "· क्योटोमा नयाँ", "· කියෝතෝවට අලුතින් පැමිණි", "· Nouvelle à Kyoto"],
      ["A friendly seat at the table, where sharing food becomes the start of friendship in Japan.", "食卓を囲んで料理を分かち合い、日本での友情が始まる温かな席。", "জাপানে খাবার ভাগাভাগি থেকেই বন্ধুত্বের শুরু—আপনার জন্য টেবিলে একটি আন্তরিক আসন।", "खाना बाँड्दा जापानमा मित्रता सुरु हुने आत्मीय टेबलमा तपाईंका लागि एउटा सिट।", "ආහාර බෙදාගැනීමෙන් ජපානයේ මිත්‍රත්වය ඇරඹෙන මේසයේ ඔබට සුහද අසුනක්.", "Une place conviviale où partager un repas devient le début d’une amitié au Japon."],
      ["Explore", "探す", "ঘুরে দেখুন", "हेर्नुहोस्", "සොයා බලන්න", "Explorer"],
      ["All experiences", "すべての体験", "সব অভিজ্ঞতা", "सबै अनुभवहरू", "සියලු අත්දැකීම්", "Toutes les expériences"],
      ["What we do", "活動内容", "আমাদের কাজ", "हामी के गर्छौँ", "අප කරන දේ", "Nos activités"],
      ["Community", "コミュニティ", "কমিউনিটি", "समुदाय", "ප්‍රජාව", "Communauté"],
      ["Guest stories", "参加者の声", "অতিথিদের গল্প", "पाहुनाका कथा", "අමුත්තන්ගේ කතා", "Témoignages"],
      ["Get in touch", "お問い合わせ", "যোগাযোগ করুন", "सम्पर्क गर्नुहोस्", "අප හා සම්බන්ධ වන්න", "Nous contacter"],
      ["Good to know", "知っておきたいこと", "জেনে রাখা ভালো", "जान्नुपर्ने कुरा", "දැනගත යුතු දේ", "Informations utiles"],
      ["Safety & support", "安全とサポート", "নিরাপত্তা ও সহায়তা", "सुरक्षा र सहयोग", "ආරක්ෂාව සහ සහාය", "Sécurité et assistance"],
      ["© 2026 TableMates Japan. Made with care in Japan.", "© 2026 TableMates Japan。日本から心を込めて。", "© ২০২৬ TableMates Japan। জাপানে যত্নসহকারে তৈরি।", "© २०२६ TableMates Japan। जापानमा मायापूर्वक बनाइएको।", "© 2026 TableMates Japan. ජපානයේ ආදරයෙන් සාදන ලදී.", "© 2026 TableMates Japan. Créé avec soin au Japon."],
      ["Tea travels. Gathered at one table.", "お茶を旅して、ひとつの食卓へ。", "চায়ের যাত্রা, এক টেবিলে মিলন।", "चियाको यात्रा, एउटै टेबलमा भेट।", "තේ ගමන් කරයි. එක මේසයකට එක්වෙයි.", "Le thé voyage et se retrouve à une même table."],
      ["Our tea ceremony menu brings favorite brews from Japan and around the world to Kyoto.", "日本や世界各地で親しまれているお茶を、京都で楽しむ茶会メニューです。", "জাপান ও বিশ্বের নানা জনপ্রিয় চা নিয়ে আমাদের চা-অনুষ্ঠানের মেনু কিয়োটোতে হাজির।", "जापान र संसारभरिका मनपर्ने चिया क्योटोको हाम्रो चिया समारोह मेनुमा।", "ජපානයේ සහ ලොව පුරා ජනප්‍රිය තේ වර්ග කියෝතෝවේ අපගේ තේ උත්සව මෙනුවට එක් කර ඇත.", "Notre menu de cérémonie du thé réunit à Kyoto des infusions appréciées du Japon et du monde entier."],
      ["Close tea menu", "お茶メニューを閉じる", "চায়ের মেনু বন্ধ করুন", "चिया मेनु बन्द गर्नुहोस्", "තේ මෙනුව වසන්න", "Fermer le menu du thé"],
      ["Choose a pot to share or try a tasting flight. Your host will brew each tea with care and introduce where it comes from. The selection of seasonal sweets is included.", "みんなで楽しむお茶を選ぶか、飲み比べをお試しください。ホストが丁寧に淹れ、お茶の産地をご紹介します。季節のお菓子付きです。", "ভাগ করে পান করার জন্য একটি চা বেছে নিন বা বিভিন্ন চায়ের স্বাদ নিন। হোস্ট যত্ন করে চা তৈরি করে তার উৎস পরিচয় করিয়ে দেবেন। মৌসুমি মিষ্টিও অন্তর্ভুক্ত।", "साझा गर्न चिया छान्नुहोस् वा विभिन्न चियाको स्वाद लिनुहोस्। होस्टले ध्यानपूर्वक चिया बनाएर यसको उत्पत्ति बताउनुहुनेछ। मौसमी मिठाई पनि समावेश छ।", "බෙදාගැනීමට තේ බඳුනක් තෝරන්න හෝ තේ රස බැලීමක් අත්හදා බලන්න. සත්කාරකයා සෑම තේ වර්ගයක්ම සැලකිල්ලෙන් සකසා එහි මූලාරම්භය හඳුන්වා දෙයි. සෘතුමය රසකැවිලිද ඇතුළත්ය.", "Choisissez un thé à partager ou dégustez plusieurs variétés. Votre hôte préparera chaque infusion avec soin et en présentera l’origine. Les douceurs de saison sont incluses."],
      ["Japan · Kyoto & Shizuoka", "日本 · 京都・静岡", "জাপান · কিয়োটো ও শিজুওকা", "जापान · क्योटो र शिजुओका", "ජපානය · කියෝතෝ සහ ෂිසුඕකා", "Japon · Kyoto et Shizuoka"],
      ["Bangladesh", "バングラデシュ", "বাংলাদেশ", "बंगलादेश", "බංග්ලාදේශය", "Bangladesh"],
      ["Nepal", "ネパール", "নেপাল", "नेपाल", "නේපාලය", "Népal"],
      ["Sri Lanka · Ceylon", "スリランカ · セイロン", "শ্রীলঙ্কা · সিলন", "श्रीलंका · सिलोन", "ශ්‍රී ලංකාව · සිලෝන්", "Sri Lanka · Ceylan"],
      ["India", "インド", "ভারত", "भारत", "ඉන්දියාව", "Inde"],
      ["China", "中国", "চীন", "चीन", "චීනය", "Chine"],
      ["Kyoto · Gion", "京都・祇園", "কিয়োটো · গিয়ন", "क्योटो · गिओन", "කියෝතෝ · ගියොන්", "Kyoto · Gion"],
      ["Uji matcha", "宇治抹茶", "উজি ম্যাচা", "उजी माचा", "උජි මැචා", "Matcha d’Uji"],
      ["Uji gyokuro", "宇治玉露", "উজি গিয়োকুরো", "उजी ग्योकुरो", "උජි ග්යොකුරෝ", "Gyokuro d’Uji"],
      ["Shizuoka sencha", "静岡煎茶", "শিজুওকা সেনচা", "शिजुओका सेनचा", "ෂිසුඕකා සෙන්චා", "Sencha de Shizuoka"],
      ["Bangladeshi milk cha", "バングラデシュのミルクチャ", "বাংলাদেশি দুধ চা", "बंगलादेशी दूध चिया", "බංග්ලාදේශ කිරි තේ", "Thé au lait bangladais"],
      ["Nepali chiya", "ネパールのチヤ", "নেপালি চিয়া", "नेपाली चिया", "නේපාලි චියා", "Chiya népalais"],
      ["Assam second flush", "アッサム・セカンドフラッシュ", "আসাম সেকেন্ড ফ্লাশ", "आसाम सेकेन्ड फ्लस", "ආසෑම් දෙවන අස්වැන්න", "Assam de seconde récolte"],
      ["Hojicha", "ほうじ茶", "হোজিচা", "होजिचा", "හෝජිචා", "Hōjicha"],
      ["Genmaicha", "玄米茶", "জেনমাইচা", "गेन्माइचा", "ජෙන්මයිචා", "Genmaicha"],
      ["Sylhet black tea", "シレット産紅茶", "সিলেটের কালো চা", "सिलेटको कालो चिया", "සිල්හෙට් කළු තේ", "Thé noir de Sylhet"],
      ["Ilam orthodox black tea", "イラム産オーソドックス紅茶", "ইলাম অর্থোডক্স কালো চা", "इलाम अर्थोडक्स कालो चिया", "ඉලාම් ඕතඩොක්ස් කළු තේ", "Thé noir orthodoxe d’Ilam"],
      ["Uva high-grown tea", "ウバ高地茶", "উভা উচ্চভূমির চা", "उवा उच्च पहाडी चिया", "ඌව උස්බිම් තේ", "Thé d’altitude d’Uva"],
      ["Nuwara Eliya tea", "ヌワラエリヤ茶", "নুয়ারা এলিয়া চা", "नुवारा एलिया चिया", "නුවරඑළිය තේ", "Thé de Nuwara Eliya"],
      ["Darjeeling first flush", "ダージリン・ファーストフラッシュ", "দার্জিলিং ফার্স্ট ফ্লাশ", "दार्जिलिङ फर्स्ट फ्लस", "ඩාර්ජිලිං ෆස්ට් ෆ්ලෂ්", "Darjeeling de première récolte"],
      ["Jasmine pearls", "ジャスミンパール", "জুঁই পার্ল চা", "जैस्मिन पर्ल चिया", "ජැස්මින් පර්ල් තේ", "Perles de jasmin"],
      ["Tieguanyin oolong", "鉄観音烏龍茶", "তিগুয়ানইন উলং চা", "टिएगुआनयिन ऊलङ चिया", "ටියෙගුවාන්යින් ඕලොං තේ", "Oolong Tieguanyin"],
      ["Stone-ground green tea, whisked to a smooth, bright finish.", "石臼で挽いた緑茶を点て、なめらかで鮮やかな味わいに。", "পাথরে গুঁড়ো করা সবুজ চা ফেটিয়ে মসৃণ ও সতেজ স্বাদ।", "ढुङ्गामा पिसेको हरियो चिया फेटेर नरम र ताजा स्वाद।", "ගලේ අඹරාගත් හරිත තේ සිනිඳු හා ප්‍රබෝධමත් ලෙස පෙණගන්වයි.", "Thé vert moulu à la pierre, fouetté pour une texture lisse et vive."],
      ["Shade-grown leaves with a sweet, mellow umami.", "日陰で育てた茶葉の、甘くまろやかな旨み。", "ছায়ায় বেড়ে ওঠা পাতার মিষ্টি, কোমল উমামি।", "छायामा हुर्केका पातको मिठो, नरम उमामी स्वाद।", "සෙවණේ වැඩුණු කොළවල මිහිරි, මෘදු උමාමි රසය.", "Des feuilles cultivées à l’ombre, à l’umami doux et sucré."],
      ["Fresh-steamed everyday green tea with gentle grassy notes.", "蒸したての茶葉が香る、穏やかな草の風味の緑茶。", "তাজা ভাপে তৈরি দৈনন্দিন সবুজ চায়ে কোমল ঘাসের সুবাস।", "ताजा बाफले बनाइएको दैनिक हरियो चियामा हल्का घाँसे सुगन्ध।", "නැවුම්ව වාෂ්ප කළ දෛනික හරිත තේවල මෘදු තණකොළ සුවඳ.", "Thé vert quotidien fraîchement étuvé aux délicates notes végétales."],
      ["Roasted green tea with a warm, toasty aroma.", "香ばしく焙じた、温かみのある香りの緑茶。", "ভাজা সবুজ চায়ের উষ্ণ, ঝলসানো সুবাস।", "भुटेको हरियो चियाको न्यानो, सुगन्धित बासना।", "බැදපු හරිත තේවල උණුසුම්, ටෝස්ට් කළ සුවඳ.", "Thé vert torréfié au parfum chaleureux."],
      ["Green tea blended with toasted rice for a soft, nutty cup.", "炒り米を合わせた、やさしく香ばしい緑茶。", "ভাজা চাল মেশানো সবুজ চা, কোমল বাদামি স্বাদে।", "भुटेको चामल मिसाइएको हरियो चियाको नरम, नटी स्वाद।", "බැදපු සහල් සමඟ මිශ්‍ර කළ මෘදු, නට් රසැති හරිත තේ.", "Thé vert mélangé à du riz grillé, aux notes douces et céréalières."],
      ["Full-bodied tea grown among the gardens of northeastern Bangladesh.", "バングラデシュ北東部の茶園で育った、コクのあるお茶。", "বাংলাদেশের উত্তর-পূর্বের বাগানে জন্মানো গাঢ় স্বাদের চা।", "उत्तरपूर्वी बंगलादेशका बगानमा उब्जेको गाढा स्वादको चिया।", "ඊසානදිග බංග්ලාදේශයේ වතු අතර වගා කරන ලද පිරුණු රසැති තේ.", "Thé corsé cultivé dans les jardins du nord-est du Bangladesh."],
      ["Strong brewed tea simmered with milk and warming spices.", "濃く淹れたお茶をミルクと体が温まるスパイスで煮出しました。", "দুধ ও উষ্ণ মসলায় জ্বাল দেওয়া গাঢ় চা।", "दूध र न्यानो मसला राखेर उमालेको कडा चिया।", "කිරි සහ උණුසුම් කුළුබඩු සමඟ තැම්බූ තද තේ.", "Thé corsé mijoté avec du lait et des épices réconfortantes."],
      ["Fragrant high-grown leaves from the eastern Himalayan foothills.", "ヒマラヤ東部の麓で育った、香り高い高地茶葉。", "পূর্ব হিমালয়ের পাদদেশে জন্মানো সুগন্ধি উচ্চভূমির পাতা।", "पूर्वी हिमालयको फेदीमा उब्जेका सुगन्धित उच्च पहाडी पात।", "නැගෙනහිර හිමාලය පාමුල උස් බිම්වල වැඩුණු සුවඳැති තේ කොළ.", "Feuilles parfumées cultivées en altitude, au pied de l’est de l’Himalaya."],
      ["Comforting milk tea simmered with cardamom, ginger, and cloves.", "カルダモン、しょうが、クローブと煮込んだ、ほっとするミルクティー。", "এলাচ, আদা ও লবঙ্গ দিয়ে জ্বাল দেওয়া আরামদায়ক দুধ চা।", "अलैँची, अदुवा र ल्वाङ राखेर उमालेको आरामदायी दूध चिया।", "එනසාල්, ඉඟුරු සහ කරාබුනැටි සමඟ තැම්බූ සැනසිලිදායක කිරි තේ.", "Thé au lait réconfortant mijoté avec cardamome, gingembre et clou de girofle."],
      ["Bright, brisk black tea from Sri Lanka’s eastern highlands.", "スリランカ東部の高地で育った、明るく爽やかな紅茶。", "শ্রীলঙ্কার পূর্বের উচ্চভূমির ঝরঝরে, সতেজ কালো চা।", "श्रीलंकाको पूर्वी उच्च पहाडको ताजा र चहकिलो कालो चिया।", "ශ්‍රී ලංකාවේ නැගෙනහිර උස්බිම්වලින් ලැබෙන ප්‍රබෝධමත් කළු තේ.", "Thé noir vif et tonique des hauts plateaux de l’est du Sri Lanka."],
      ["Light, floral highland tea with a delicate finish.", "軽やかな花の香りと繊細な余韻が楽しめる高地茶。", "হালকা ফুলের সুবাস ও কোমল শেষ স্বাদের উচ্চভূমির চা।", "हल्का फूलको सुगन्ध र नाजुक स्वाद भएको उच्च पहाडी चिया।", "සැහැල්ලු මල් සුවඳක් සහ මෘදු අවසාන රසයක් ඇති උස්බිම් තේ.", "Thé léger des hauts plateaux, floral et délicat en bouche."],
      ["Rich, malty black tea from India’s Brahmaputra Valley.", "インドのブラマプトラ渓谷で育った、濃厚で麦芽の香る紅茶。", "ভারতের ব্রহ্মপুত্র উপত্যকার সমৃদ্ধ, মাল্টি স্বাদের কালো চা।", "भारतको ब्रह्मपुत्र उपत्यकाको गाढा, माल्टी स्वादको कालो चिया।", "ඉන්දියාවේ බ්‍රහ්මපුත්‍ර නිම්නයෙන් ලැබෙන ගැඹුරු, මෝල්ට් රසැති කළු තේ.", "Thé noir riche et malté de la vallée du Brahmapoutre, en Inde."],
      ["Delicate spring tea with light floral and muscatel notes.", "花やマスカテルを思わせる、繊細な春摘みのお茶。", "হালকা ফুল ও মাসকাটেলের সুবাসযুক্ত কোমল বসন্তের চা।", "हल्का फूल र मस्कटेलको सुगन्ध भएको कोमल वसन्तकालीन चिया।", "මල් සහ මස්කැටල් සුවඳැති සියුම් වසන්ත තේ.", "Thé printanier délicat aux notes florales et muscatées."],
      ["Robust black tea infused with ginger, cinnamon, and cardamom.", "しょうが、シナモン、カルダモンを加えた香り豊かな紅茶。", "আদা, দারুচিনি ও এলাচের সুবাসে মেশানো গাঢ় কালো চা।", "अदुवा, दालचिनी र अलैँची मिसाइएको कडा कालो चिया।", "ඉඟුරු, කුරුඳු සහ එනසාල් මිශ්‍ර කළ තද කළු තේ.", "Thé noir corsé infusé au gingembre, à la cannelle et à la cardamome."],
      ["Green tea scented with fragrant jasmine blossoms.", "香り高いジャスミンの花で香りづけした緑茶。", "সুগন্ধি জুঁই ফুলের সুবাসযুক্ত সবুজ চা।", "सुगन्धित चमेलीको फूलको बासना भएको हरियो चिया।", "සුවඳැති සමන් මල්වලින් සුවඳ කළ හරිත තේ.", "Thé vert délicatement parfumé aux fleurs de jasmin."],
      ["Floral, gently roasted oolong from Fujian.", "福建省の、花の香りとやさしい焙煎香が広がる烏龍茶。", "ফুজিয়ানের ফুলেল সুবাসযুক্ত হালকা ভাজা উলং চা।", "फुजियानको फूलको सुगन्ध भएको हल्का भुटेको ऊलङ चिया।", "ෆුජියන්හි මල් සුවඳැති, මෘදු ලෙස බැදූ ඕලොන් තේ.", "Oolong du Fujian, floral et légèrement torréfié."],
      ["Tea and wagashi selections can change with the season and local availability. Please let your host know about allergies when booking.", "お茶や和菓子は季節や仕入れ状況によって変わります。アレルギーがある場合は予約時にホストへお知らせください。", "ঋতু ও স্থানীয় প্রাপ্যতা অনুযায়ী চা ও ওয়াগাশি বদলাতে পারে। অ্যালার্জি থাকলে বুকিংয়ের সময় হোস্টকে জানান।", "मौसम र स्थानीय उपलब्धताअनुसार चिया र वागाशी बदलिन सक्छ। एलर्जी भए बुकिङ गर्दा होस्टलाई जानकारी दिनुहोस्।", "තේ සහ වගෂි තේරීම් සමය හා දේශීය ලබාගත හැකි බව අනුව වෙනස් විය හැක. අසාත්මිකතා ඇත්නම් වෙන්කරන විට සත්කාරකයාට දන්වන්න.", "La sélection de thés et de wagashi varie selon la saison et les disponibilités. Signalez vos allergies à votre hôte lors de la réservation."],
      ["Book the Kyoto tea ceremony · ¥5,200", "京都の茶会を予約 · ¥5,200", "কিয়োটোর চা-অনুষ্ঠান বুক করুন · ¥৫,২০০", "क्योटो चिया समारोह बुक गर्नुहोस् · ¥५,२००", "කියෝතෝ තේ උත්සවය වෙන්කරන්න · ¥5,200", "Réserver la cérémonie du thé à Kyoto · ¥5 200"],
      ["Save your seat", "席を確保する", "আপনার আসন সংরক্ষণ করুন", "आफ्नो सिट सुरक्षित गर्नुहोस्", "ඔබේ ආසනය වෙන්කරගන්න", "Réserver votre place"],
      ["Good plans, no awkward surprises. Payment is handled securely.", "安心して計画できるよう、お支払いは安全に処理されます。", "নিশ্চিন্তে পরিকল্পনা করুন। পেমেন্ট নিরাপদে সম্পন্ন হয়।", "ढुक्क भएर योजना बनाउनुहोस्। भुक्तानी सुरक्षित रूपमा गरिन्छ।", "හොඳ සැලසුම්, අනපේක්ෂිත ගැටලු නැත. ගෙවීම් ආරක්ෂිතව සිදු වේ.", "Un plan sans mauvaise surprise. Le paiement est sécurisé."],
      ["Close", "閉じる", "বন্ধ করুন", "बन्द गर्नुहोस्", "වසන්න", "Fermer"],
      ["Your name", "お名前", "আপনার নাম", "तपाईंको नाम", "ඔබේ නම", "Votre nom"],
      ["e.g. Alex Kim", "例：山田 花子", "যেমন: Alex Kim", "उदाहरण: Alex Kim", "උදා: Alex Kim", "ex. Alex Kim"],
      ["Email address", "メールアドレス", "ইমেইল ঠিকানা", "इमेल ठेगाना", "විද්‍යුත් තැපැල් ලිපිනය", "Adresse e-mail"],
      ["you@example.com", "you@example.com", "you@example.com", "you@example.com", "you@example.com", "vous@exemple.com"],
      ["Number of guests", "参加人数", "অতিথির সংখ্যা", "पाहुनाको सङ्ख्या", "අමුත්තන් ගණන", "Nombre de personnes"],
      ["1 guest", "1名", "১ জন", "१ जना", "අමුත්තන් 1", "1 personne"],
      ["2 guests", "2名", "২ জন", "२ जना", "අමුත්තන් 2", "2 personnes"],
      ["3 guests", "3名", "৩ জন", "३ जना", "අමුත්තන් 3", "3 personnes"],
      ["4 guests", "4名", "৪ জন", "४ जना", "අමුත්තන් 4", "4 personnes"],
      ["Preferred language", "希望する言語", "পছন্দের ভাষা", "रुचाइएको भाषा", "කැමති භාෂාව", "Langue souhaitée"],
      ["Payment method", "お支払い方法", "পেমেন্ট পদ্ধতি", "भुक्तानी विधि", "ගෙවීමේ ක්‍රමය", "Mode de paiement"],
      ["Other credit card", "その他のクレジットカード", "অন্যান্য ক্রেডিট কার্ড", "अन्य क्रेडिट कार्ड", "වෙනත් ක්‍රෙඩිට් කාඩ්පතක්", "Autre carte bancaire"],
      ["Konbini payment", "コンビニ払い", "কনবিনি পেমেন্ট", "कोन्बिनी भुक्तानी", "කොන්බිනි ගෙවීම", "Paiement en konbini"],
      ["Continue to secure checkout", "安全な決済へ進む", "নিরাপদ পেমেন্টে এগিয়ে যান", "सुरक्षित भुक्तानीमा जानुहोस्", "ආරක්ෂිත ගෙවීම වෙත යන්න", "Continuer vers le paiement sécurisé"],
      ["Welcome to TableMates.", "TableMatesへようこそ。", "TableMates-এ স্বাগতম।", "TableMates मा स्वागत छ।", "TableMates වෙත සාදරයෙන් පිළිගනිමු.", "Bienvenue chez TableMates."],
      ["Sign in to your account or create one to get started.", "ログインするか、新しいアカウントを作成してください。", "শুরু করতে লগ ইন করুন বা নতুন অ্যাকাউন্ট তৈরি করুন।", "सुरु गर्न लग इन गर्नुहोस् वा खाता खोल्नुहोस्।", "ආරම්භ කිරීමට පිවිසෙන්න හෝ ගිණුමක් සාදන්න.", "Connectez-vous ou créez un compte pour commencer."],
      ["Account", "アカウント", "অ্যাকাউন্ট", "खाता", "ගිණුම", "Compte"],
      ["Create account", "アカウントを作成", "অ্যাকাউন্ট তৈরি করুন", "खाता खोल्नुहोस्", "ගිණුමක් සාදන්න", "Créer un compte"],
      ["Password", "パスワード", "পাসওয়ার্ড", "पासवर्ड", "මුරපදය", "Mot de passe"],
      ["Your password", "パスワードを入力", "আপনার পাসওয়ার্ড", "तपाईंको पासवर्ड", "ඔබේ මුරපදය", "Votre mot de passe"],
      ["Show password", "パスワードを表示", "পাসওয়ার্ড দেখান", "पासवर्ड देखाउनुहोस्", "මුරපදය පෙන්වන්න", "Afficher le mot de passe"],
      ["Hide password", "パスワードを隠す", "পাসওয়ার্ড লুকান", "पासवर्ड लुकाउनुहोस्", "මුරපදය සඟවන්න", "Masquer le mot de passe"],
      ["Confirm password", "パスワードを確認", "পাসওয়ার্ড নিশ্চিত করুন", "पासवर्ड पुष्टि गर्नुहोस्", "මුරපදය තහවුරු කරන්න", "Confirmer le mot de passe"],
      ["Enter your password again", "もう一度パスワードを入力", "আবার পাসওয়ার্ড লিখুন", "पासवर्ड फेरि लेख्नुहोस्", "නැවත මුරපදය ඇතුළත් කරන්න", "Saisissez à nouveau votre mot de passe"],
      ["Member accounts are saved in the local SQLite database. Passwords are stored as one-way hashes, never readable text.", "会員アカウントはローカルのSQLiteデータベースに保存されます。パスワードは読み取れない一方向ハッシュで保存されます。", "সদস্যদের অ্যাকাউন্ট স্থানীয় SQLite ডেটাবেসে রাখা হয়। পাসওয়ার্ড পাঠযোগ্য টেক্সট নয়, একমুখী হ্যাশ হিসেবে সংরক্ষিত হয়।", "सदस्य खाता स्थानीय SQLite डाटाबेसमा सुरक्षित हुन्छ। पासवर्ड पढ्न मिल्ने पाठमा होइन, एकतर्फी ह्यासका रूपमा राखिन्छ।", "සාමාජික ගිණුම් දේශීය SQLite දත්තගබඩාවේ සුරැකේ. මුරපද කියවිය හැකි පාඨයක් ලෙස නොව එක්-මාර්ග හැෂ් ලෙස ගබඩා වේ.", "Les comptes sont enregistrés dans la base SQLite locale. Les mots de passe sont stockés sous forme de hachages irréversibles, jamais en texte lisible."],
      ["Table stories", "食卓のストーリー", "টেবিলের গল্প", "टेबलका कथा", "මේසයේ කතා", "Histoires de table"],
      ["Helpful notes from people who've been there. Be kind and keep it useful.", "体験した人からの役立つ感想です。思いやりを持ち、参考になる内容を共有しましょう。", "যারা অভিজ্ঞতা পেয়েছেন তাদের সহায়ক কথা। সদয় থাকুন এবং তথ্যবহুল মন্তব্য করুন।", "अनुभव गरेका मानिसका उपयोगी सुझाव। दयालु हुनुहोस् र काम लाग्ने कुरा लेख्नुहोस्।", "අත්දැකීම් ලැබූ අයගෙන් ප්‍රයෝජනවත් සටහන්. කරුණාවෙන් හා ප්‍රයෝජනවත් ලෙස ලියන්න.", "Des conseils utiles de personnes qui ont participé. Restez bienveillant et pertinent."],
      ["First name", "名", "প্রথম নাম", "पहिलो नाम", "මුල් නම", "Prénom"],
      ["Your rating", "評価", "আপনার রেটিং", "तपाईंको मूल्याङ्कन", "ඔබේ ඇගයීම", "Votre note"],
      ["★★★★★ — Loved it", "★★★★★ — とてもよかった", "★★★★★ — দারুণ লেগেছে", "★★★★★ — धेरै मन पर्‍यो", "★★★★★ — ඉතා කැමතියි", "★★★★★ — J’ai adoré"],
      ["★★★★☆ — Great", "★★★★☆ — とてもよい", "★★★★☆ — খুব ভালো", "★★★★☆ — राम्रो", "★★★★☆ — හොඳයි", "★★★★☆ — Excellent"],
      ["★★★☆☆ — Good", "★★★☆☆ — よい", "★★★☆☆ — ভালো", "★★★☆☆ — ठीक छ", "★★★☆☆ — හොඳයි", "★★★☆☆ — Bien"],
      ["★★☆☆☆ — Could improve", "★★☆☆☆ — 改善の余地あり", "★★☆☆☆ — উন্নতির সুযোগ আছে", "★★☆☆☆ — सुधार गर्न सकिन्छ", "★★☆☆☆ — වැඩිදියුණු කළ හැක", "★★☆☆☆ — À améliorer"],
      ["★☆☆☆☆ — Not for me", "★☆☆☆☆ — 自分には合わなかった", "★☆☆☆☆ — আমার জন্য নয়", "★☆☆☆☆ — मलाई उपयुक्त भएन", "★☆☆☆☆ — මට ගැළපුණේ නැහැ", "★☆☆☆☆ — Pas pour moi"],
      ["Share a helpful note", "役立つ感想を共有", "সহায়ক মন্তব্য লিখুন", "उपयोगी सुझाव लेख्नुहोस्", "ප්‍රයෝජනවත් සටහනක් බෙදාගන්න", "Partager un commentaire utile"],
      ["What should other guests know?", "ほかの参加者に伝えたいことは？", "অন্য অতিথিদের কী জানা উচিত?", "अन्य पाहुनाले के जान्नुपर्छ?", "අනෙකුත් අමුත්තන් දැනගත යුත්තේ කුමක්ද?", "Que devraient savoir les autres participants ?"],
      ["Share your story", "感想を共有する", "আপনার গল্প শেয়ার করুন", "आफ्नो कथा साझा गर्नुहोस्", "ඔබේ කතාව බෙදාගන්න", "Partager votre expérience"],
      ["Be the first to share a helpful note about this experience.", "この体験について、最初の感想を共有しましょう。", "এই অভিজ্ঞতা নিয়ে প্রথম সহায়ক মন্তব্যটি লিখুন।", "यस अनुभवबारे पहिलो उपयोगी सुझाव दिनुहोस्।", "මෙම අත්දැකීම ගැන පළමු ප්‍රයෝජනවත් සටහන බෙදාගන්න.", "Soyez la première personne à partager un commentaire utile sur cette expérience."],
      ["Reviews are open. Please share a helpful, respectful note.", "感想を投稿できます。役立つ、思いやりのあるコメントをお願いします。", "মন্তব্য করা যাচ্ছে। সহায়ক ও সম্মানজনক কথা লিখুন।", "समीक्षा खुला छ। उपयोगी र सम्मानजनक टिप्पणी लेख्नुहोस्।", "සමාලෝචන සඳහා විවෘතයි. ප්‍රයෝජනවත් හා ගෞරවනීය සටහනක් බෙදාගන්න.", "Les avis sont ouverts. Merci de partager un commentaire utile et respectueux."],
      ["You can share a story after this event's date.", "イベント開催日以降に感想を共有できます。", "অনুষ্ঠানের তারিখের পর আপনি গল্প শেয়ার করতে পারবেন।", "कार्यक्रमको मितिपछि अनुभव साझा गर्न सक्नुहुन्छ।", "මෙම උත්සව දිනයෙන් පසු ඔබට කතාවක් බෙදාගත හැක.", "Vous pourrez partager votre expérience après la date de l’événement."],
      ["Loading stories…", "ストーリーを読み込み中…", "গল্প লোড হচ্ছে…", "कथा लोड हुँदैछ…", "කතා පූරණය වෙමින්…", "Chargement des avis…"],
      ["Stories could not be loaded. Please try again.", "ストーリーを読み込めませんでした。もう一度お試しください。", "গল্প লোড করা যায়নি। আবার চেষ্টা করুন।", "कथा लोड गर्न सकिएन। फेरि प्रयास गर्नुहोस्।", "කතා පූරණය කළ නොහැකි විය. නැවත උත්සාහ කරන්න.", "Impossible de charger les avis. Veuillez réessayer."],
      ["Saving your story…", "感想を保存中…", "আপনার গল্প সংরক্ষণ হচ্ছে…", "तपाईंको कथा सुरक्षित हुँदैछ…", "ඔබේ කතාව සුරැකෙමින්…", "Enregistrement de votre avis…"],
      ["Thanks for sharing your story.", "感想を共有していただきありがとうございます。", "আপনার গল্প ভাগ করে নেওয়ার জন্য ধন্যবাদ।", "आफ्नो अनुभव साझा गर्नुभएकोमा धन्यवाद।", "ඔබේ කතාව බෙදාගැනීම ගැන ස්තුතියි.", "Merci d’avoir partagé votre expérience."],
      ["Your seat is held! This demo doesn't process real payments. A secure checkout would be connected here for card or konbini payment.", "席を確保しました。このデモでは実際の支払いは処理されません。ここにカードまたはコンビニ決済を接続できます。", "আপনার আসন রাখা হয়েছে! এই ডেমোতে প্রকৃত পেমেন্ট হয় না। এখানে কার্ড বা কনবিনি পেমেন্ট যুক্ত করা যাবে।", "तपाईंको सिट सुरक्षित भयो! यो डेमोले वास्तविक भुक्तानी गर्दैन। यहाँ कार्ड वा कोन्बिनी भुक्तानी जोड्न सकिन्छ।", "ඔබේ ආසනය වෙන් කර ඇත! මෙම ආදර්ශය සැබෑ ගෙවීම් සිදු නොකරයි. මෙහි කාඩ්පත් හෝ කොන්බිනි ගෙවීම් සම්බන්ධ කළ හැක.", "Votre place est réservée ! Cette démo ne traite pas de vrais paiements. Un paiement sécurisé par carte ou konbini serait connecté ici."],
      ["Saved to your favorites. Log in to keep it for later.", "お気に入りに保存しました。後で見るにはログインしてください。", "পছন্দের তালিকায় রাখা হয়েছে। পরে দেখতে লগ ইন করুন।", "मनपर्नेमा सुरक्षित भयो। पछि हेर्न लग इन गर्नुहोस्।", "ඔබේ ප්‍රියතමයන්ට එක් කළා. පසුව බැලීමට පිවිසෙන්න.", "Ajouté aux favoris. Connectez-vous pour le conserver."],
      ["Removed from your favorites.", "お気に入りから削除しました。", "পছন্দের তালিকা থেকে সরানো হয়েছে।", "मनपर्नेबाट हटाइयो।", "ඔබේ ප්‍රියතමයන්ගෙන් ඉවත් කළා.", "Retiré de vos favoris."],
      ["Connected to the local SQLite member database. Passwords are stored as one-way hashes, never readable text.", "ローカルSQLite会員データベースに接続しました。パスワードは読み取れない一方向ハッシュで保存されます。", "স্থানীয় SQLite সদস্য ডেটাবেসে সংযুক্ত। পাসওয়ার্ড একমুখী হ্যাশ হিসেবে রাখা হয়, পাঠযোগ্য টেক্সট হিসেবে নয়।", "स्थानीय SQLite सदस्य डाटाबेसमा जडान भयो। पासवर्ड पढ्न मिल्ने पाठमा नभई एकतर्फी ह्यासका रूपमा सुरक्षित हुन्छ।", "දේශීය SQLite සාමාජික දත්තගබඩාවට සම්බන්ධයි. මුරපද කියවිය හැකි පාඨයක් නොව එක්-මාර්ග හැෂ් ලෙස සුරැකේ.", "Connecté à la base SQLite locale. Les mots de passe sont stockés sous forme de hachages irréversibles."],
      ["Local account database is offline. Start the website with python server.py to register and log in.", "ローカル会員データベースに接続できません。登録・ログインするには python server.py でサイトを起動してください。", "স্থানীয় অ্যাকাউন্ট ডেটাবেস বন্ধ। নিবন্ধন ও লগ ইন করতে python server.py দিয়ে ওয়েবসাইট চালু করুন।", "स्थानीय खाता डाटाबेस अफलाइन छ। दर्ता र लग इन गर्न python server.py चलाउनुहोस्।", "දේශීය ගිණුම් දත්තගබඩාව නොමැත. ලියාපදිංචි වීමට සහ පිවිසීමට python server.py මඟින් අඩවිය අරඹන්න.", "Base de comptes locale hors ligne. Lancez le site avec python server.py pour vous inscrire et vous connecter."],
      ["This page is not connected to the account server. Run python server.py, then open http://127.0.0.1:8000.", "このページはアカウントサーバーに接続されていません。python server.py を実行し、http://127.0.0.1:8000 を開いてください。", "এই পৃষ্ঠাটি অ্যাকাউন্ট সার্ভারের সঙ্গে সংযুক্ত নয়। python server.py চালান, তারপর http://127.0.0.1:8000 খুলুন।", "यो पृष्ठ खाता सर्भरमा जडान भएको छैन। python server.py चलाउनुहोस्, त्यसपछि http://127.0.0.1:8000 खोल्नुहोस्।", "මෙම පිටුව ගිණුම් සේවාදායකයට සම්බන්ධ වී නැත. python server.py ධාවනය කර http://127.0.0.1:8000 විවෘත කරන්න.", "Cette page n’est pas connectée au serveur de comptes. Lancez python server.py, puis ouvrez http://127.0.0.1:8000."],
      ["Member accounts are saved in the local SQLite database. Passwords are stored as one-way hashes, never readable text.", "会員アカウントはローカルのSQLiteデータベースに保存されます。パスワードは読み取れない一方向ハッシュで保存されます。", "সদস্যদের অ্যাকাউন্ট স্থানীয় SQLite ডেটাবেসে সংরক্ষিত হয়। পাসওয়ার্ড একমুখী হ্যাশ হিসেবে রাখা হয়, পাঠযোগ্য টেক্সট হিসেবে নয়।", "सदस्य खाताहरू स्थानीय SQLite डाटाबेसमा सुरक्षित हुन्छन्। पासवर्ड पढ्न मिल्ने पाठमा नभई एकतर्फी ह्यासका रूपमा सुरक्षित हुन्छन्।", "සාමාජික ගිණුම් දේශීය SQLite දත්තගබඩාවේ සුරැකේ. මුරපද කියවිය හැකි පාඨයක් නොව එක්-මාර්ග හැෂ් ලෙස සුරැකේ.", "Les comptes sont enregistrés dans la base SQLite locale. Les mots de passe sont stockés sous forme de hachages irréversibles."],
      ["Create your free account to save your favorite experiences.", "無料アカウントを作成して、お気に入りの体験を保存しましょう。", "পছন্দের অভিজ্ঞতা সংরক্ষণ করতে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন।", "मनपर्ने अनुभव सुरक्षित गर्न निःशुल्क खाता खोल्नुहोस्।", "ඔබේ ප්‍රියතම අත්දැකීම් සුරැකීමට නොමිලේ ගිණුමක් සාදන්න.", "Créez un compte gratuit pour enregistrer vos expériences préférées."],
      ["Choose a password with at least 8 characters.", "パスワードは8文字以上にしてください。", "কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড বেছে নিন।", "कम्तीमा ८ अक्षरको पासवर्ड छान्नुहोस्।", "අවම වශයෙන් අක්ෂර 8ක මුරපදයක් තෝරන්න.", "Choisissez un mot de passe d’au moins 8 caractères."],
      ["Those passwords don't match. Please check and try again.", "パスワードが一致しません。確認してもう一度お試しください。", "পাসওয়ার্ড মিলছে না। পরীক্ষা করে আবার চেষ্টা করুন।", "पासवर्डहरू मिलेनन्। जाँच गरेर फेरि प्रयास गर्नुहोस्।", "මුරපද ගැළපෙන්නේ නැත. පරීක්ෂා කර නැවත උත්සාහ කරන්න.", "Les mots de passe ne correspondent pas. Vérifiez et réessayez."],
      ["You have been logged out.", "ログアウトしました。", "আপনি লগ আউট করেছেন।", "तपाईं लग आउट हुनुभयो।", "ඔබ පිටවී ඇත.", "Vous êtes déconnecté."],
      ["event", "イベント", "অনুষ্ঠান", "कार्यक्रम", "උත්සවය", "événement"],
      ["events", "イベント", "অনুষ্ঠান", "कार्यक्रमहरू", "උත්සව", "événements"],
      ["No events available", "イベントはありません", "কোনো অনুষ্ঠান নেই", "कुनै कार्यक्रम छैन", "උත්සව නොමැත", "Aucun événement disponible"],
      ["Try another date or service.", "別の日付やサービスをお試しください。", "অন্য তারিখ বা সেবা বেছে দেখুন।", "अर्को मिति वा सेवा प्रयास गर्नुहोस्।", "වෙනත් දිනයක් හෝ සේවාවක් උත්සාහ කරන්න.", "Essayez une autre date ou activité."],
      ["Try another service.", "別のサービスをお試しください。", "অন্য সেবা বেছে দেখুন।", "अर्को सेवा प्रयास गर्नुहोस्।", "වෙනත් සේවාවක් උත්සාහ කරන්න.", "Essayez une autre activité."],
      ["event available", "件のイベントがあります", "টি অনুষ্ঠান আছে", "कार्यक्रम उपलब्ध", "උත්සවයක් ඇත", "événement disponible"],
      ["events available", "件のイベントがあります", "টি অনুষ্ঠান আছে", "कार्यक्रमहरू उपलब्ध", "උත්සව ඇත", "événements disponibles"]
      ,["available", "があります", "উপলভ্য", "उपलब्ध", "ලබා ගත හැක", "disponible(s)"]
      ,["on", "開催日：", "তারিখে", "मितिमा", "දිනයේ", "le"]
      ,["for", "カテゴリー：", "এর জন্য", "का लागि", "සඳහා", "pour"]
      ,["event", "イベント", "অনুষ্ঠান", "कार्यक्रम", "උත්සවය", "événement"]
      ,["events", "イベント", "অনুষ্ঠান", "कार्यक्रमहरू", "උත්සව", "événements"]
      ,["All experiences", "すべての体験", "সব অভিজ্ঞতা", "सबै अनुभवहरू", "සියලු අත්දැකීම්", "Toutes les expériences"]
      ,["Creating account…", "アカウントを作成中…", "অ্যাকাউন্ট তৈরি হচ্ছে…", "खाता बनाउँदै…", "ගිණුම සාදමින්…", "Création du compte…"]
      ,["Signing in…", "ログイン中…", "লগ ইন হচ্ছে…", "लग इन हुँदै…", "පිවිසෙමින්…", "Connexion…"]
      ,["The local account server is offline. Run python server.py in the project folder, then try again.", "ローカルアカウントサーバーに接続できません。プロジェクトフォルダーで python server.py を実行して、もう一度お試しください。", "স্থানীয় অ্যাকাউন্ট সার্ভার বন্ধ। প্রকল্প ফোল্ডারে python server.py চালিয়ে আবার চেষ্টা করুন।", "स्थानीय खाता सर्भर अफलाइन छ। प्रोजेक्ट फोल्डरमा python server.py चलाएर फेरि प्रयास गर्नुहोस्।", "දේශීය ගිණුම් සේවාදායකය නොමැත. ව්‍යාපෘති ෆෝල්ඩරයේ python server.py ධාවනය කර නැවත උත්සාහ කරන්න.", "Le serveur de compte local est hors ligne. Lancez python server.py dans le dossier du projet, puis réessayez." ]
      ,["The local account server is offline. Your session was not changed.", "ローカルアカウントサーバーに接続できません。ログアウト状態は変更されていません。", "স্থানীয় অ্যাকাউন্ট সার্ভার বন্ধ। আপনার সেশন পরিবর্তন হয়নি।", "स्थानीय खाता सर्भर अफलाइन छ। तपाईंको सत्र परिवर्तन भएन।", "දේශීය ගිණුම් සේවාදායකය නොමැත. ඔබේ සැසිය වෙනස් කර නැත.", "Le serveur de compte local est hors ligne. Votre session n’a pas été modifiée." ]
      ,["You have been logged out.", "ログアウトしました。", "আপনি লগ আউট হয়েছেন।", "तपाईं लग आउट हुनुभयो।", "ඔබ පිටවී ඇත.", "Vous êtes déconnecté." ]
      ,["Log out", "ログアウト", "লগ আউট", "लग आउट", "පිටවන්න", "Déconnexion" ]
      ,["Welcome, {name}! Your table is waiting.", "{name}さん、ようこそ！あなたの席をご用意しています。", "{name}, স্বাগতম! আপনার জন্য টেবিলে আসন রাখা আছে।", "{name}, स्वागत छ! तपाईंको सिट तयार छ।", "{name}, සාදරයෙන් පිළිගනිමු! ඔබේ ආසනය සූදානම්.", "Bienvenue, {name} ! Votre place vous attend." ]
      ,["Log out of", "ログアウト：", "লগ আউট করুন:", "लग आउट गर्नुहोस्:", "පිටවන්න:", "Déconnecter"]
      ,["/ person", "/ 1人", "/ জন", "/ व्यक्ति", "/ අයෙකුට", "/ personne"]
      ,["Welcome to TableMates, {name}! Your member ID is {id}.", "TableMatesへようこそ、{name}さん！会員IDは{id}です。", "TableMates-এ স্বাগতম, {name}! আপনার সদস্য আইডি {id}।", "TableMates मा स्वागत छ, {name}! तपाईंको सदस्य ID {id} हो।", "TableMates වෙත සාදරයෙන් පිළිගනිමු, {name}! ඔබේ සාමාජික ID {id}යි.", "Bienvenue chez TableMates, {name} ! Votre identifiant est {id}."]
      ,["Welcome back to TableMates, {name}!", "おかえりなさい、{name}さん！", "TableMates-এ আবার স্বাগতম, {name}!", "TableMates मा फेरि स्वागत छ, {name}!", "නැවතත් සාදරයෙන් පිළිගනිමු, {name}!", "Heureux de vous retrouver, {name} !"]
      ,["The local account server is offline. Run python server.py in the project folder, then try again.", "ローカルアカウントサーバーに接続できません。プロジェクトフォルダーで python server.py を実行し、もう一度お試しください。", "স্থানীয় অ্যাকাউন্ট সার্ভার বন্ধ। প্রকল্প ফোল্ডারে python server.py চালিয়ে আবার চেষ্টা করুন।", "स्थानीय खाता सर्भर अफलाइन छ। प्रोजेक्ट फोल्डरमा python server.py चलाएर फेरि प्रयास गर्नुहोस्।", "දේශීය ගිණුම් සේවාදායකය නොමැත. ව්‍යාපෘති ෆෝල්ඩරයේ python server.py ධාවනය කර නැවත උත්සාහ කරන්න.", "Le serveur de compte local est hors ligne. Lancez python server.py dans le dossier du projet, puis réessayez."]
      ,["An account with this email already exists. Choose Log in instead.", "このメールアドレスは既に登録されています。ログインしてください。", "এই ইমেইলে অ্যাকাউন্ট আছে। লগ ইন করুন।", "यो इमेलमा खाता पहिल्यै छ। लग इन गर्नुहोस्।", "මෙම විද්‍යුත් තැපෑලෙන් ගිණුමක් දැනටමත් ඇත. පිවිසෙන්න.", "Un compte existe déjà avec cette adresse. Connectez-vous."]
      ,["Email or password is incorrect.", "メールアドレスまたはパスワードが正しくありません。", "ইমেইল বা পাসওয়ার্ড ভুল।", "इमेल वा पासवर्ड गलत छ।", "විද්‍යුත් තැපෑල හෝ මුරපදය වැරදියි.", "Adresse e-mail ou mot de passe incorrect."]
      ,["Choose a valid event.", "有効なイベントを選択してください。", "সঠিক অনুষ্ঠান নির্বাচন করুন।", "मान्य कार्यक्रम छान्नुहोस्।", "වලංගු උත්සවයක් තෝරන්න.", "Choisissez un événement valide."]
      ,["You can share a story after the event date.", "イベント開催後に感想を共有できます。", "অনুষ্ঠানের তারিখের পর গল্প শেয়ার করতে পারবেন।", "कार्यक्रम मितिपछि अनुभव साझा गर्न सक्नुहुन्छ।", "උත්සව දිනයෙන් පසු කතාවක් බෙදාගත හැක.", "Vous pourrez partager votre avis après l’événement."]
      ,["Enter a name between 1 and 80 characters.", "名前は1〜80文字で入力してください。", "১ থেকে ৮০ অক্ষরের নাম লিখুন।", "१ देखि ८० अक्षरको नाम लेख्नुहोस्।", "අක්ෂර 1ත් 80ත් අතර නමක් ඇතුළත් කරන්න.", "Saisissez un nom de 1 à 80 caractères."]
      ,["Choose a rating from 1 to 5 stars.", "1〜5つ星で評価してください。", "১ থেকে ৫ তারকা রেটিং দিন।", "१ देखि ५ तारासम्म मूल्याङ्कन छान्नुहोस्।", "තරු 1 සිට 5 දක්වා ඇගයීමක් තෝරන්න.", "Choisissez une note de 1 à 5 étoiles."]
      ,["Write a comment between 1 and 500 characters.", "コメントは1〜500文字で入力してください。", "১ থেকে ৫০০ অক্ষরের মন্তব্য লিখুন।", "१ देखि ५०० अक्षरको टिप्पणी लेख्नुहोस्।", "අක්ෂර 1ත් 500ත් අතර අදහසක් ලියන්න.", "Écrivez un commentaire de 1 à 500 caractères."]
      ,["Save Osaka after dark to favorites", "「夜の大阪を歩く」をお気に入りに保存", "রাতের ওসাকা পছন্দে রাখুন", "साँझको ओसाका मनपर्नेमा राख्नुहोस्", "රාත්‍රී ඔසාකා ප්‍රියතමයට සුරකින්න", "Ajouter Osaka à la nuit tombée aux favoris" ]
      ,["Save A slower afternoon to favorites", "「ゆったり午後のお茶」をお気に入りに保存", "ধীর বিকেল পছন্দে রাখুন", "आरामिलो दिउँसो मनपर्नेमा राख्नुहोस्", "සන්සුන් සන්ධ්‍යාව ප්‍රියතමයට සුරකින්න", "Ajouter l’après-midi paisible aux favoris" ]
      ,["Save Around the world to favorites", "「ひとつの食卓で世界を旅する」をお気に入りに保存", "বিশ্বভ্রমণের টেবিল পছন্দে রাখুন", "संसारभरिका स्वाद मनपर्नेमा राख्नुहोस्", "ලොව වටා මේසය ප්‍රියතමයට සුරකින්න", "Ajouter le dîner autour du monde aux favoris" ]
      ,["Save Make your own piece of Japan to favorites", "「自分だけの小さな日本」をお気に入りに保存", "নিজের জাপান স্মারক পছন্দে রাখুন", "आफ्नो जापानी सिर्जना मनपर्नेमा राख्नुहोस्", "ඔබේ ජපන් නිර්මාණය ප්‍රියතමයට සුරකින්න", "Ajouter votre création du Japon aux favoris" ]
      ,["Save Sweet Japan to favorites", "「日本の甘いひととき」をお気に入りに保存", "জাপানের মিষ্টি স্বাদ পছন্দে রাখুন", "जापानका मिठा स्वाद मनपर्नेमा राख्नुहोस्", "ජපානයේ මිහිරි රස ප්‍රියතමයට සුරකින්න", "Ajouter les douceurs du Japon aux favoris" ]
      ,["Save Kyoto market morning to favorites", "「京都市場の朝」をお気に入りに保存", "কিয়োটোর বাজারের সকাল পছন্দে রাখুন", "क्योटो बजारको बिहान मनपर्नेमा राख्नुहोस्", "කියෝතෝ වෙළඳපොළ උදෑසන ප්‍රියතමයට සුරකින්න", "Ajouter le marché de Kyoto aux favoris" ]
      ,["Save Tokyo old-town bites to favorites", "「東京・下町の食べ歩き」をお気に入りに保存", "পুরোনো টোকিওর খাবার পছন্দে রাখুন", "पुरानो टोकियोका स्वाद मनपर्नेमा राख्नुहोस्", "පැරණි ටෝකියෝ රස ප්‍රියතමයට සුරකින්න", "Ajouter les saveurs du vieux Tokyo aux favoris" ]
      ,["Save Nara street food walk to favorites", "「奈良の屋台グルメ散歩」をお気に入りに保存", "নারার রাস্তার খাবার পছন্দে রাখুন", "नाराको सडक खाना मनपर्नेमा राख्नुहोस्", "නාරා වීදි ආහාර ප්‍රියතමයට සුරකින්න", "Ajouter la balade gourmande de Nara aux favoris" ]
      ,["Save Tea passport to favorites", "「5か国のお茶」をお気に入りに保存", "চায়ের পাসপোর্ট পছন্দে রাখুন", "चिया पासपोर्ट मनपर्नेमा राख्नुहोस्", "තේ ගමන් බලපත්‍රය ප්‍රියතමයට සුරකින්න", "Ajouter le passeport du thé aux favoris" ]
      ,["Save Kyoto tea ceremony to favorites", "「京都の茶会」をお気に入りに保存", "কিয়োটোর চা-অনুষ্ঠান পছন্দে রাখুন", "क्योटो चिया समारोह मनपर्नेमा राख्नुहोस्", "කියෝතෝ තේ උත්සවය ප්‍රියතමයට සුරකින්න", "Ajouter la cérémonie du thé de Kyoto aux favoris" ]
      ,["Save Home flavors dinner to favorites", "「南アジアの夕食会」をお気に入りに保存", "ঘরের স্বাদের নৈশভোজ পছন্দে রাখুন", "घरको स्वादको रात्रिभोज मनपर्नेमा राख्नुहोस्", "ගෙදර රස රාත්‍රී භෝජනය ප්‍රියතමයට සුරකින්න", "Ajouter le dîner aux saveurs maison aux favoris" ]
      ,["Save Sunday brunch to favorites", "「日曜ブランチ」をお気に入りに保存", "রবিবারের ব্রাঞ্চ পছন্দে রাখুন", "आइतबारको ब्रन्च मनपर्नेमा राख्नुहोस्", "ඉරිදා බ්‍රන්ච් ප්‍රියතමයට සුරකින්න", "Ajouter le brunch du dimanche aux favoris" ]
      ,["One table, many homes.", "ひとつの食卓に、たくさんの故郷。"]
      ,["Discover the world through food in Japan.", "日本で、食を通じて世界を発見しましょう。"]
      ,["TableMates home", "TableMatesのホーム"]
      ,["For curious eaters, solo travelers, and future neighbors", "食に好奇心のある方、一人旅の方、これからのご近所さんへ"]
      ,["One table, many homes", "ひとつの食卓に、たくさんの故郷"]
      ,["Every dish has a story", "どの料理にも物語があります"]
      ,["Come as you are.", "ありのままのあなたでお越しください。"]
      ,["Let’s share", "一緒に分かち合いましょう"]
      ,["something good", "素敵なひとときを"]
      ,["Leave knowing someone new.", "新しい出会いとともにお帰りください。"]
      ,["A little planning, a lot of connection", "少しの計画で、たくさんのつながりを"]
      ,["Make room for a real connection on your trip.", "旅先で心の通う出会いを見つけましょう。"]
      ,["Meet the people behind the flavors. Every TableMates gathering is an invitation to taste, listen, and share a little of where we come from.", "料理を作る人たちに出会いましょう。TableMatesの集まりは、味わい、耳を傾け、それぞれの故郷について語り合う機会です。"]
      ,["Choose a table", "テーブルを選ぶ"]
      ,["Browse food walks, home-style dinners, tea tastings, and cultural gatherings across Japan.", "日本各地の食べ歩き、家庭料理の夕食会、お茶の試飲会、文化交流イベントを探しましょう。"]
      ,["Pick an upcoming date and complete secure checkout before you leave home.", "開催日を選び、出発前に安全な決済を済ませましょう。"]
      ,["Share the moment", "ひとときを分かち合う"]
      ,["Arrive curious, meet your host and fellow guests, and bring your own story to the table.", "好奇心を持ってお越しください。ホストや参加者と出会い、あなた自身の物語も食卓に添えましょう。"]
      ,["Explore upcoming tables", "これからの集まりを見る"]
      ,["Your next story starts here", "次の物語はここから始まります"]
      ,["From neighborhood food walks to dishes from around the world, meet local hosts and fellow travelers across Japan.", "街の食べ歩きから世界各地の料理まで、日本各地で地元のホストや旅仲間と出会いましょう。"]
      ,["Sample 2027 dates and prices are shown while the first season is being planned. Secure checkout will open once the schedule and Stripe account are configured.", "初シーズンの準備中のため、2027年の日程と料金はサンプルです。日程とStripeアカウントの設定後、安全な決済をご利用いただけます。"]
      ,["Food and drinks are paid to each stall directly. Cash, cards, and PayPay; options may vary by vendor.", "飲食代は各屋台で直接お支払いください。現金、カード、PayPayが使えますが、対応方法は店舗により異なります。"]
      ,["Food is a language we can share", "食は分かち合える言葉"]
      ,["Food is an easy way to say “welcome.” Every dish makes space for another person's story.", "食事は「ようこそ」を伝える簡単な方法です。一皿ごとに、誰かの物語を迎える余白が生まれます。"]
      ,["Come for the flavors. Stay for the stories.", "味を楽しみに来て、物語を楽しんでください。"]
      ,["Pass the plate", "料理を取り分ける"]
      ,["Bring a memory to the table.", "思い出を食卓に持ち寄りましょう。"]
      ,["Learn a new recipe, ritual, or perspective from the people who know it best.", "その土地をよく知る人から、新しいレシピや習慣、ものの見方を学びましょう。"]
      ,["Stay curious", "好奇心を大切に"]
      ,["Take home more than a photo: a new friend, a favorite flavor, and a reason to return.", "写真だけでなく、新しい友人、お気に入りの味、また訪れる理由も持ち帰りましょう。"]
      ,["Your story", "あなたの物語"]
      ,["Your turn", "あなたの番です"]
      ,["Food tastes even better with a story. Share a photo or short video from a TableMates gathering, and get inspired by the community.", "物語と一緒なら、料理はもっとおいしく感じられます。TableMatesの集まりの写真や短い動画を共有して、コミュニティから刺激をもらいましょう。"]
      ,["From the community", "コミュニティから"]
      ,["Little moments from around our tables.", "食卓を囲んで生まれた、ささやかなひととき。"]
      ,["Shared by TableMates", "TableMatesのメンバーが共有"]
      ,["Sign in to share one photo or video. Posts appear publicly as soon as they are uploaded.", "写真または動画を共有するにはログインしてください。投稿はアップロード後すぐに公開されます。"]
      ,["Photo or video", "写真または動画"]
      ,["JPEG, PNG, or WebP up to 5 MB; MP4 or WebM up to 20 MB. Share only media you have permission to post. Need something removed?", "JPEG、PNG、WebPは最大5MB、MP4、WebMは最大20MBです。投稿する権利のあるメディアのみ共有してください。削除をご希望ですか？"]
      ,["Share with the community", "コミュニティで共有"]
      ,["What are we sharing? (280 characters max)", "どんな内容ですか？（280文字以内）"]
      ,["Loading community stories…", "コミュニティの投稿を読み込み中…"]
      ,["Contact us.", "お問い合わせ"]
      ,["Many cultures. One open table.", "多様な文化を、ひとつの開かれた食卓へ。"]
      ,["Small, welcoming gatherings", "少人数で温かな集まり"]
      ,["Meet local hosts and travelers", "地元のホストや旅行者と出会う"]
      ,["Plan and book before you arrive", "到着前に計画して予約"]
      ,["Leave connected", "つながりを持ち帰る"]
      ,["The table keeps growing", "食卓の輪は広がり続けます"]
      ,["Food traditions from everywhere", "世界各地の食文化"]
      ,["More than a meal", "食事だけではありません"]
      ,["Our gatherings bring local hosts and guests together through international food and culture. Taste a dish from someone's home, trade stories over tea, and discover how much we have in common—one table at a time.", "世界の食と文化を通じて、地元のホストとゲストが集まります。家庭の味を楽しみ、お茶を飲みながら物語を交わし、食卓を囲むたびに共通点を見つけましょう。"]
      ,["TableMates is for anyone who wants to feel closer to the world around them—whether Japan is home, a new beginning, or the next stop on a journey.", "TableMatesは、世界とのつながりを感じたいすべての人のための場所です。日本が故郷でも、新しい出発の地でも、旅の途中の目的地でも、ぜひご参加ください。"]
      ,["Photos & stories", "写真とストーリー"]
      ,["FAQ", "よくある質問"]
      ,["© 2026 TableMates. Made with care in Japan.", "© 2026 TableMates。日本から心を込めて。"]
      ,["Reserve your place", "席を予約する"]
      ,["Pay securely with Stripe. Your booking is confirmed after payment.", "Stripeで安全にお支払いください。お支払い完了後、予約が確定します。"]
      ,["Checkout opens on Stripe. Your card details are handled by Stripe and are never stored on this website.", "決済はStripeで行われます。カード情報はStripeが管理し、このウェブサイトには保存されません。"]
      ,["Continue to secure payment", "安全な決済へ進む"]
      ,["This is a sample menu and may change with seasonal ingredients and host availability. Please ask your host about allergies or dietary needs.", "これはサンプルメニューです。季節の食材やホストの都合により変更される場合があります。アレルギーや食事制限についてはホストにご相談ください。"]
      ,["Choose a pot to share or try a tasting flight of teas from Japan, South Asia, East Asia, the Middle East, and beyond. Your host will introduce where each tea comes from. Seasonal sweets are included.", "みんなで一杯のお茶を楽しむか、日本、南アジア、東アジア、中東などのお茶を飲み比べてみましょう。ホストがお茶の産地をご紹介します。季節のお菓子付きです。"]
      ,["Taiwan", "台湾"]
      ,["South Korea", "韓国"]
      ,["Thailand", "タイ"]
      ,["Türkiye", "トルコ"]
      ,["Morocco", "モロッコ"]
      ,["Vietnam", "ベトナム"]
      ,["United Kingdom", "イギリス"]
      ,["Alishan high-mountain oolong", "阿里山高山烏龍茶"]
      ,["Light, floral oolong grown in Taiwan’s mountain gardens.", "台湾の山間部で育つ、軽やかで花の香りが広がる烏龍茶。"]
      ,["Dong Ding oolong", "凍頂烏龍茶"]
      ,["Rolled oolong with a warm, gently roasted finish.", "丸く揉んだ茶葉をやさしく焙煎した、温かみのある味わい。"]
      ,["Earl Grey", "アールグレイ"]
      ,["Black tea scented with fragrant bergamot citrus.", "ベルガモットの爽やかな香りをまとった紅茶。"]
      ,["English breakfast blend", "イングリッシュ・ブレックファスト"]
      ,["Robust black tea, often enjoyed with milk.", "ミルクティーにもよく合う、コクのある紅茶。"]
      ,["Full-bodied black tea from Türkiye’s lush Black Sea coast, traditionally served strong.", "黒海沿岸で育つ、しっかりとした味わいの紅茶。伝統的に濃く淹れて楽しみます。"]
      ,["Green tea brewed with fresh mint for a bright, refreshing cup.", "新鮮なミントを加えて淹れる、爽やかな緑茶。"]
      ,["Fragrant Vietnamese green tea with a clean, lasting finish.", "すっきりとした余韻が続く、香り豊かなベトナム緑茶。"]
      ,["Close event details", "イベント詳細を閉じる"]
      ,["A colorful table of fresh food ready to share", "みんなで囲む、彩り豊かなできたての料理"]
      ,["A diverse group of friends making time for each other", "互いに時間を分かち合う、多様な背景を持つ友人たち"]
      ,["A vendor preparing food at a busy international street-food stall", "にぎやかな国際屋台で料理を準備する店主"]
      ,["Friends from different backgrounds sharing dishes around a dinner table", "さまざまな背景を持つ友人たちが食卓を囲み、料理を分かち合う様子"]
      ,["Save International New Year food gathering to favorites", "国際お正月フードイベントをお気に入りに保存"]
      ,["Sun, Oct 24, 2027 · 6:00 PM", "2027年10月24日（日）· 18:00"]
      ,["Sat, Oct 30, 2027 · 7:00 PM", "2027年10月30日（土）· 19:00"]
      ,["Sun, Oct 31, 2027 · 11:00 AM", "2027年10月31日（日）· 11:00"]
      ,["Mon, Nov 1, 2027 · 3:30 PM", "2027年11月1日（月）· 15:30"]
      ,["Thu, Nov 4, 2027 · 9:30 AM", "2027年11月4日（木）· 9:30"]
      ,["Thu, Oct 28, 2027 · 11:00 AM", "2027年10月28日（木）· 11:00"]
      ,["Mon, Nov 8, 2027 · 1:00 PM", "2027年11月8日（月）· 13:00"]
      ,["Wed, Oct 27, 2027 · 3:00 PM", "2027年10月27日（水）· 15:00"]
      ,["Sat, Nov 6, 2027 · 1:30 PM", "2027年11月6日（土）· 13:30"]
      ,["Tue, Nov 2, 2027 · 6:30 PM", "2027年11月2日（火）· 18:30"]
      ,["Mon, Nov 8, 2027 · 10:30 AM", "2027年11月8日（月）· 10:30"]
      ,["Fri, Jan 1, 2027 · Time to be announced", "2027年1月1日（金）· 時刻未定"]
      ,["A taste of the world, in Japan", "日本で世界の味を楽しむ"]
      ,["Come hungry.", "お腹を空かせてお越しください。"]
      ,["Leave with a little", "故郷のような"]
      ,["piece of home.", "温もりを感じる食卓へ。"]
      ,["Find your table", "あなたの食卓を見つけましょう"]
      ,["Our way of gathering", "TableMatesの集まり方"]
      ,["You can browse without an account. Log in to share.", "アカウントがなくても閲覧できます。投稿するにはログインしてください。"]
      ,["Discover international food and culture in Japan. Meet local hosts, share stories, and reserve your seat before you travel.", "日本で世界の食と文化に出会いましょう。地元のホストと物語を分かち合い、旅の前に席をご予約ください。"]
      ,["Every gathering is a chance to share a tradition, try something new, and meet someone you might never have met otherwise.", "集まりのたびに、文化を分かち合い、新しいことに挑戦し、普段なら出会わない人と知り合う機会が生まれます。"]
      ,["Find your first table", "初めての集まりを探す"]
      ,["Event details →", "イベント詳細 →"]
      ,["Celebrate New Year's Day in Niigata with food stalls featuring flavors from around the world. Reserve your place with a ticket; food and drinks are purchased separately from each stall.", "新潟で世界各地の味を楽しむ屋台とともに新年を祝いましょう。チケットで席を予約し、食べ物や飲み物は各屋台で別途ご購入ください。"]
      ,["International New Year food gathering", "世界の料理で祝う新年の集い"]
      ,["Japan is the meeting place; the flavors come from everywhere. Join a local host, share the stories behind each dish, and book your seat before you travel.", "日本を舞台に、世界各地の味を楽しみましょう。地元のホストと料理にまつわる物語を分かち合い、旅の前に席を予約してください。"]
      ,["Fragrant mountain-grown oolong with a smooth, floral cup.", "山で育った香り高い烏龍茶。なめらかで花のような風味が広がります。"]
      ,["Fresh green tea with soft grassy and toasted notes.", "若草のような風味と香ばしさが調和する、爽やかな緑茶。"]
      ,["Gently oxidized tea with a mellow, rounded flavor.", "ほどよく酸化させた、まろやかで丸みのある味わいのお茶。"]
      ,["Honey-scented, lightly oxidized tea with a naturally sweet aroma.", "軽く発酵させた、蜂蜜のような香りと自然な甘みのお茶。"]
      ,["Delicate green tea traditionally perfumed with lotus blossoms.", "蓮の花の香りをまとわせた、繊細な緑茶。"]
      ,["Jeju balhyocha", "済州発酵茶"]
      ,["Jeju sejak", "済州セジャク茶"]
      ,["Longjing (Dragon Well)", "龍井茶（ロンジン）"]
      ,["Lotus-scented green tea", "蓮の香りの緑茶"]
      ,["Moroccan mint tea", "モロッコ風ミントティー"]
      ,["Northern Thai oolong", "タイ北部の烏龍茶"]
      ,["Oriental Beauty", "東方美人茶"]
      ,["Pan-fired green tea with a mellow, chestnut-like aroma.", "釜炒り製法の緑茶。まろやかで栗のような香りが特徴です。"]
      ,["Rize tea", "リゼ茶"]
      ,["Strong black tea served with milk and warming spices.", "濃い紅茶にミルクと温かなスパイスを加えたお茶。"]
      ,["Thai Nguyen green tea", "タイグエン緑茶"]
      ,["Thai-style milk tea", "タイ風ミルクティー"]
      ,["See market tastings →", "市場での試食を見る →"]
      ,["See the activity plan →", "アクティビティの予定を見る →"]
      ,["See the brunch menu →", "ブランチメニューを見る →"]
      ,["See the dinner menu →", "夕食メニューを見る →"]
      ,["See the food menu →", "フードメニューを見る →"]
      ,["See the food route →", "食べ歩きルートを見る →"]
      ,["See the shared menu →", "シェアメニューを見る →"]
      ,["See the tasting menu →", "テイスティングメニューを見る →"]
      ,["See the tea tasting menu →", "お茶の試飲メニューを見る →"]
      ,["English · 日本語 · বাংলা · नेपाली · සිංහල · Français", "英語 · 日本語 · ベンガル語 · ネパール語 · シンハラ語 · フランス語"]
      ,["NIIGATA", "新潟"]
      ,["Checking your payment with Stripe…", "Stripeでお支払いを確認しています…"]
      ,["Checkout was cancelled. No payment was taken.", "決済がキャンセルされました。お支払いは発生していません。"]
      ,["Choose a JPEG, PNG, or WebP photo up to 5 MB, or an MP4 or WebM video up to 20 MB.", "JPEG、PNG、WebP形式で5MB以下の写真、またはMP4、WebM形式で20MB以下の動画を選択してください。"]
      ,["Community stories could not be loaded. Please try again later.", "コミュニティの投稿を読み込めませんでした。時間をおいてもう一度お試しください。"]
      ,["Enter your name and a valid email address to continue.", "続行するには、お名前と有効なメールアドレスを入力してください。"]
      ,["Log in or create an account before sharing a photo or video.", "写真や動画を共有するには、ログインするかアカウントを作成してください。"]
      ,["No community stories yet. Be the first to share a table moment.", "コミュニティの投稿はまだありません。最初の食卓の思い出を共有しましょう。"]
      ,["Opening secure Stripe checkout…", "Stripeの安全な決済画面を開いています…"]
      ,["Payment confirmed for {event}. Your place is reserved for {date}.", "{event}のお支払いが確認されました。{date}のお席を予約しました。"]
      ,["Report or request removal", "報告または削除を依頼"]
      ,["Secure checkout is not ready yet. Please try again later.", "安全な決済はまだ利用できません。時間をおいてもう一度お試しください。"]
      ,["Secure checkout is temporarily unavailable. Please try again later.", "安全な決済は一時的にご利用いただけません。時間をおいてもう一度お試しください。"]
      ,["Sharing your story…", "ストーリーを共有しています…"]
      ,["We couldn't verify the checkout session. Check your Stripe receipt before trying again.", "決済セッションを確認できませんでした。再度お試しになる前にStripeの領収書をご確認ください。"]
      ,["We couldn't verify your payment yet. Check your Stripe receipt before trying again.", "お支払いをまだ確認できません。再度お試しになる前にStripeの領収書をご確認ください。"]
      ,["Your payment is still being confirmed. Check your Stripe receipt before trying again.", "お支払いの確認中です。再度お試しになる前にStripeの領収書をご確認ください。"]
      ,["Your post is now public. Thanks for sharing!", "投稿が公開されました。共有ありがとうございます！"]
      ,["You’re signed in as {name}. Your photo or video will be public immediately.", "{name}としてログイン中です。写真や動画はすぐに公開されます。"]
      ,["out of 5 stars", "5つ星中"]
    ];
    const supportedLanguages = ["en", "ja", "bn", "ne", "si", "fr"];
    const languageLocales = { en: "en-US", ja: "ja-JP", bn: "bn-BD", ne: "ne-NP", si: "si-LK", fr: "fr-FR" };
    const translations = Object.fromEntries(supportedLanguages.map((language, index) => [
      language,
      Object.fromEntries(translationRows.map((row) => [row[0], row[index] || row[0]]))
    ]));
    const originalTextNodes = new WeakMap();
    const originalAttributes = new WeakMap();
    const translate = (english) => translations[document.getElementById("languageSelect").value]?.[english] || english;
    const preserveWhitespace = (source, translated) => {
      const leading = source.match(/^\s*/)?.[0] || "";
      const trailing = source.match(/\s*$/)?.[0] || "";
      return `${leading}${translated}${trailing}`;
    };
    const localizePage = (language) => {
      document.documentElement.lang = languageLocales[language] || language;
      document.title = translations[language]["TableMates — A world of food, one shared table"];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest("script, style")) continue;
        if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
        const source = originalTextNodes.get(node);
        const key = source.trim();
        if (key) node.nodeValue = preserveWhitespace(source, translations[language][key] || key);
      }
      document.querySelectorAll("body *").forEach((element) => {
        const attributes = ["aria-label", "placeholder", "title", "alt"];
        let originals = originalAttributes.get(element);
        if (!originals) {
          originals = Object.fromEntries(attributes.filter((attribute) => element.hasAttribute(attribute))
            .map((attribute) => [attribute, element.getAttribute(attribute)]));
          originalAttributes.set(element, originals);
        }
        for (const [attribute, source] of Object.entries(originals)) {
          element.setAttribute(attribute, translations[language][source] || source);
        }
      });
      const description = document.querySelector('meta[name="description"]');
      if (description) {
        const source = "Discover international food and culture in Japan. Meet local hosts, share stories, and reserve your seat before you travel.";
        description.content = translations[language][source] || source;
      }
      document.querySelectorAll("[data-password-toggle]").forEach((button) => {
        const password = document.getElementById(button.getAttribute("aria-controls"));
        button.setAttribute("aria-label", translations[language][password.type === "password" ? "Show password" : "Hide password"]);
      });
      document.documentElement.lang = language;
      document.title = translations[language]["TableMates — A world of food, one shared table"];
    };
    let currentCommentsEvent = "";
    let accountServerConnected = false;
    const toast = (message) => {
      const node = document.getElementById("toast");
      node.textContent = message;
      node.classList.add("show");
      window.setTimeout(() => node.classList.remove("show"), 3000);
    };
    let signedInUser = null;
    const accountApiRequest = async (path, options = {}) => {
      const response = await fetch(path, {
        credentials: "same-origin",
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers }
      });
      let payload;
      try {
        payload = await response.json();
      } catch {
        throw new Error(translate("This page is not connected to the account server. Run python server.py, then open http://127.0.0.1:8000."));
      }
      if (!response.ok) {
        const error = new Error(payload.error || "The account request could not be completed.");
        error.status = response.status;
        throw error;
      }
      return payload;
    };
    const updateAccountServerStatus = (connected) => {
      accountServerConnected = connected;
      const status = document.getElementById("authAvailability");
      status.textContent = connected
        ? translate("Connected to the local SQLite member database. Passwords are stored as one-way hashes, never readable text.")
        : translate("Local account database is offline. Start the website with python server.py to register and log in.");
      status.classList.toggle("error", !connected);
    };
    const renderAuthButton = () => {
      const button = document.getElementById("loginButton");
      const user = signedInUser;
      const welcome = document.getElementById("memberWelcome");
      const communityAuthNote = document.getElementById("communityAuthNote");
      button.textContent = translate(user ? "Log out" : "Log in");
      button.title = user ? `Member ID: ${user.id}\nSigned in as ${user.name} (${user.email}). Click to log out.` : "";
      button.setAttribute("aria-label", user ? `${translate("Log out")} (${user.email})` : translate("Log in"));
      welcome.hidden = !user;
      welcome.textContent = user ? translate("Welcome, {name}! Your table is waiting.").replace("{name}", user.name) : "";
      if (communityAuthNote) {
        communityAuthNote.textContent = user
          ? translate("You’re signed in as {name}. Your photo or video will be public immediately.").replace("{name}", user.name)
          : translate("You can browse without an account. Log in to share.");
      }
    };
    const refreshSignedInUser = async () => {
      try {
        const payload = await accountApiRequest("/api/me");
        signedInUser = payload.user;
        updateAccountServerStatus(true);
      } catch (error) {
        signedInUser = null;
        updateAccountServerStatus(false);
        console.error("Could not connect to the local account database:", error);
      }
      renderAuthButton();
    };
    const setAuthMessage = (text, isError) => {
      const message = document.querySelector("#loginForm .form-message");
      message.textContent = text;
      message.classList.toggle("error", isError);
      message.style.display = "block";
      message.setAttribute("role", isError ? "alert" : "status");
    };
    const setAuthMode = (mode) => {
      const isRegistering = mode === "register";
      document.getElementById("loginTab").setAttribute("aria-selected", String(!isRegistering));
      document.getElementById("registerTab").setAttribute("aria-selected", String(isRegistering));
      document.getElementById("registerNameField").hidden = !isRegistering;
      document.getElementById("confirmPasswordField").hidden = !isRegistering;
      document.getElementById("registerName").required = isRegistering;
      document.getElementById("confirmPassword").required = isRegistering;
      document.getElementById("loginPassword").autocomplete = isRegistering ? "new-password" : "current-password";
      document.getElementById("authSubmit").textContent = translate(isRegistering ? "Create account" : "Log in");
      document.getElementById("authDescription").textContent = isRegistering
        ? translate("Create your free account to save your favorite experiences.")
        : translate("Sign in to your account or create one to get started.");
      const message = document.querySelector("#loginForm .form-message");
      message.style.display = "none";
      message.classList.remove("error");
    };
    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
    document.querySelectorAll("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    }));
    const eventGrid = document.getElementById("eventGrid");
    const emptyState = document.getElementById("emptyState");
    Array.from(eventGrid.querySelectorAll(".event-card"))
      .sort((first, second) => first.dataset.date.localeCompare(second.dataset.date))
      .forEach((card) => eventGrid.insertBefore(card, emptyState));
    const applyEventFilters = () => {
      const category = document.querySelector(".filter.active").dataset.filter;
      const selectedDate = document.getElementById("eventDate").value;
      let shown = 0;
      document.querySelectorAll(".event-card").forEach((card) => {
        const matchesCategory = category === "all" || card.dataset.category === category;
        const matchesDate = !selectedDate || card.dataset.date === selectedDate;
        const visible = matchesCategory && matchesDate;
        card.hidden = !visible;
        if (visible) shown++;
      });
      const language = document.getElementById("languageSelect").value;
      const dateLabel = selectedDate
        ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString(languageLocales[language], { month: "long", day: "numeric", year: "numeric" })
        : "";
      const selectedCategory = document.querySelector(".filter.active").textContent.trim();
      document.getElementById("resultsCount").textContent = `${shown} ${translate(shown === 1 ? "event" : "events")} ${translate("available")}${dateLabel ? ` · ${dateLabel}` : ""}`;
      emptyState.textContent = `${translate("No events available")}${category === "all" ? "" : ` ${translate("for")} ${selectedCategory.toLowerCase()}`}${dateLabel ? ` ${translate("on")} ${dateLabel}` : ""}. ${translate(dateLabel || category !== "all" ? "Try another date or service." : "Try another service.")}`;
      emptyState.style.display = shown ? "none" : "block";
    };
    document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
      document.querySelector(".filter.active").classList.remove("active");
      button.classList.add("active");
      applyEventFilters();
    }));
    document.getElementById("eventDate").addEventListener("change", applyEventFilters);
    document.getElementById("clearDate").addEventListener("click", () => {
      document.getElementById("eventDate").value = "";
      applyEventFilters();
    });
    const menuPhotoIds = {
      food: [
        "1555939594-58d7cb561ad1",
        "1579871494447-9811cf80d66c",
        "1512621776951-a57141f2eefd",
        "1547573854-74d2a71d0826",
        "1581954548122-4dff8989c0f7",
        "1528605248644-14dd04022da1",
        "1517248135467-4c7edcad34c4",
        "1555939594-58d7cb561ad1",
        "1547573854-74d2a71d0826",
      ],
      sweets: [
        "1706350091276-ba994c35cd99",
        "1563805042-7684c019e1cb",
        "1488477181946-6428a0291777",
        "1706350091276-ba994c35cd99",
      ],
      tea: [
        "1746932451426-209444cd613a",
        "1683533698664-12ee473e8c9d",
        "1666113802599-e4c8b2b9c3a1",
        "1544787219-7f47ccb76574",
      ],
      activity: [
        "1579783902614-a3fb3927b6a5",
        "1513364776144-60967b0f800f",
        "1452860606245-08befc0ff44b",
        "1579783902614-a3fb3927b6a5",
      ],
    };
    const menuPhotoUrl = (photoSet, index) =>
      `https://images.unsplash.com/photo-${photoSet[index % photoSet.length]}?auto=format&fit=crop&w=360&q=75`;
    const eventMenus = {
      "Osaka after dark: a local food walk": {
        intro: "A sample of Osaka street-food favorites along the evening walk.",
        photoSet: menuPhotoIds.food,
        items: ["Takoyaki with sauce and bonito", "Kushikatsu vegetable and seasonal bites", "A small okonomiyaki tasting", "Seasonal Japanese sweet"],
      },
      "Around the world, one dinner table": {
        intro: "A welcoming potluck with sample dishes from the communities gathered around the table.",
        photoSet: menuPhotoIds.food,
        items: ["Bangladeshi spiced rice or vegetable bhaji", "Nepali momo or achar", "Sri Lankan dhal or coconut sambol", "A Japanese seasonal side dish", "Bring a favorite dish and its story to share"],
      },
      "Make your own little piece of Japan": {
        intro: "A relaxed, hands-on workshop with a local maker. No experience is needed.",
        photoSet: menuPhotoIds.activity,
        items: ["Meet the maker and explore the materials", "Choose colors and a simple design", "Make a small Japanese-inspired keepsake", "Take your finished craft home"],
      },
      "Sweet Japan, from mochi to matcha": {
        intro: "A tasting flight of Japanese sweets with teas chosen to complement each flavor.",
        photoSet: menuPhotoIds.sweets,
        items: ["Seasonal wagashi", "Soft mochi with a sweet filling", "A small dorayaki tasting", "Japanese matcha or roasted hojicha"],
      },
      "Kyoto market morning with Yuki": {
        intro: "Taste seasonal Kyoto ingredients and market favorites as you explore Nishiki Market.",
        photoSet: menuPhotoIds.food,
        items: ["Fresh seasonal produce tasting", "Japanese rolled omelet (dashimaki)", "Yuba or a local tofu specialty", "Kyoto pickles and a small sweet"],
      },
      "Tokyo old-town bites with Kenji": {
        intro: "A sample route through Asakusa's handmade snacks and neighborhood favorites.",
        photoSet: menuPhotoIds.food,
        items: ["Freshly made ningyo-yaki cakes", "A savory senbei rice cracker", "A tempura or sushi-style local bite", "Matcha or another seasonal drink"],
      },
      "Nara street food and mochi walk": {
        intro: "A friendly walk featuring Nara's famous mochi, local sweets, and street snacks.",
        photoSet: menuPhotoIds.food,
        items: ["Freshly pounded yomogi mochi", "A Nara kakinoha-zushi tasting", "Seasonal local sweets", "Japanese tea to finish"],
      },
      "Tea passport: five countries, one table": {
        intro: "A guided tasting flight featuring teas and small sweets from five tea-growing traditions.",
        photoSet: [
          menuPhotoIds.tea[0],
          menuPhotoIds.tea[1],
          menuPhotoIds.tea[2],
          menuPhotoIds.tea[3],
          "1683533698664-12ee473e8c9d",
          menuPhotoIds.tea[1],
        ],
        items: ["Japanese matcha or hojicha", "Bangladeshi Sylhet black tea", "Nepali Ilam orthodox tea", "Sri Lankan Ceylon tea", "Indian Assam or masala chai", "A small sweet paired with each tea"],
      },
      "Home flavors: a South Asian dinner": {
        intro: "A sample family-style dinner inspired by home cooking from Bangladesh, Nepal, and Sri Lanka.",
        photoSet: menuPhotoIds.food,
        items: ["Bangladeshi khichuri or spiced rice", "Nepali vegetable momo with achar", "Sri Lankan dhal curry and coconut sambol", "Seasonal vegetables and rice", "A small milk tea or regional sweet"],
      },
      "Sunday brunch: new in Tokyo": {
        intro: "A relaxed brunch spread with familiar favorites and a few Japanese touches.",
        photoSet: menuPhotoIds.food,
        items: ["Japanese egg or seasonal vegetable sandwiches", "Fresh fruit and a light salad", "A small pastry or Japanese sweet", "Coffee, tea, and juice"],
      },
      "International New Year food gathering": {
        intro: "Reserve your place with a ticket for this New Year's food gathering in Niigata. Browse illustrative food-stall photos from Japan, Nepal, Sri Lanka, Bangladesh, and India. Food and drinks are purchased from each vendor directly by cash, card, or PayPay; accepted methods may vary by stall. Exact vendors and dishes will depend on the stalls attending.",
        items: [
          {
            name: "Nepal · Market snacks and achar",
            photo: "https://images.unsplash.com/photo-1782876107044-d652ef2ad855?auto=format&fit=crop&w=360&q=75",
            alt: "A Nepali market stall displaying snacks and jars of condiments",
          },
          {
            name: "Sri Lanka · Tropical fruit market",
            photo: "https://images.unsplash.com/photo-1743636521862-1aed4d6067c0?auto=format&fit=crop&w=360&q=75",
            alt: "A Sri Lankan market stall displaying tropical fruit",
          },
          {
            name: "Bangladesh · Savory street snacks",
            photo: "https://images.unsplash.com/photo-1771699435180-1aa08bf9a246?auto=format&fit=crop&w=360&q=75",
            alt: "A Bangladeshi street-food vendor serving savory snacks",
          },
          {
            name: "India · Chaat and fried snacks",
            photo: "https://plus.unsplash.com/premium_photo-1691030657761-cca2ec5e97e9?auto=format&fit=crop&w=360&q=75",
            alt: "Trays of Indian street snacks displayed at a market stall",
          },
          {
            name: "Japan · Grilled seafood stall",
            photo: "https://plus.unsplash.com/premium_photo-1732753629933-66440d338da4?auto=format&fit=crop&w=360&q=75",
            alt: "Grilled seafood displayed at a Japanese street-food stall",
          },
        ],
      },
    };
    document.querySelectorAll("[data-event-menu]").forEach((button) => button.addEventListener("click", () => {
      const card = button.closest(".event-card");
      const eventName = card.dataset.event;
      const menu = eventMenus[eventName];
      if (!menu) {
        console.error("No sample menu or activity plan is configured for:", eventName);
        return;
      }
      document.getElementById("eventMenuLocation").textContent = card.querySelector(".event-meta span").textContent;
      document.getElementById("eventMenuTitle").textContent = eventName;
      document.getElementById("eventMenuIntro").textContent = menu.intro;
      const menuList = document.getElementById("eventMenuList");
      menuList.replaceChildren(...menu.items.map((item, index) => {
        const name = typeof item === "string" ? item : item.name;
        const listItem = document.createElement("li");
        const image = document.createElement("img");
        image.className = "menu-item-photo";
        image.src = typeof item === "string" ? menuPhotoUrl(menu.photoSet, index) : item.photo;
        image.alt = typeof item === "string" ? item : item.alt;
        image.loading = "lazy";
        const itemName = document.createElement("span");
        itemName.textContent = name;
        listItem.append(image, itemName);
        return listItem;
      }));
      document.getElementById("eventMenuDialog").showModal();
    }));
    const teaPhotoIds = [
      ...menuPhotoIds.tea,
      "1544787219-7f47ccb76574",
      "1746932451426-209444cd613a",
      "1683533698664-12ee473e8c9d",
      "1666113802599-e4c8b2b9c3a1",
    ];
    const namedTeaPhotos = {
      "masala-chai": {
        src: "https://images.unsplash.com/photo-1683533698664-12ee473e8c9d?auto=format&fit=crop&w=360&q=75",
        alt: "Masala chai served with toast",
      },
      "ceylon-garden": {
        src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Haputale%2C_Sri_Lanka%2C_Tea_plantations_in_fog_3.jpg/500px-Haputale%2C_Sri_Lanka%2C_Tea_plantations_in_fog_3.jpg",
        alt: "Tea plantation in Haputale, Sri Lanka",
        credit: {
          href: "https://commons.wikimedia.org/wiki/File:Haputale,_Sri_Lanka,_Tea_plantations_in_fog_3.jpg",
          text: "Photo: Vyacheslav Argenberg · CC BY 4.0",
        },
      },
    };
    document.querySelectorAll("#teaMenuDialog .tea-country li").forEach((item, index) => {
      const name = item.querySelector("b");
      const description = name?.nextSibling?.textContent.trim() || "";
      const image = document.createElement("img");
      image.className = "menu-item-photo";
      const namedPhoto = namedTeaPhotos[item.dataset.teaPhoto];
      image.src = namedPhoto?.src || menuPhotoUrl(teaPhotoIds, index);
      image.alt = namedPhoto?.alt || name?.textContent || "Tea";
      image.loading = "lazy";
      const details = document.createElement("div");
      if (name) details.append(name);
      details.append(document.createTextNode(description));
      if (namedPhoto?.credit) {
        const credit = document.createElement("a");
        credit.className = "tea-photo-credit";
        credit.href = namedPhoto.credit.href;
        credit.target = "_blank";
        credit.rel = "noreferrer";
        credit.textContent = namedPhoto.credit.text;
        details.append(credit);
      }
      item.replaceChildren(image, details);
    });
    document.querySelectorAll(".save-button").forEach((button) => button.addEventListener("click", () => {
      const saved = button.classList.toggle("saved");
      button.textContent = saved ? "♥" : "♡";
      toast(translate(saved ? "Saved to your favorites. Log in to keep it for later." : "Removed from your favorites."));
    }));
    const bookingButtons = Array.from(document.querySelectorAll(".book-button"));
    let checkoutEnabled = false;
    let pendingBookingCard = null;
    bookingButtons.forEach((button) => {
      button.textContent = translate("Book now");
    });
    const refreshBookingAvailability = async () => {
      try {
        const response = await fetch("/api/checkout/status", { credentials: "same-origin" });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Secure checkout status is unavailable.");
        checkoutEnabled = payload.enabled;
        bookingButtons.forEach((button) => { button.textContent = translate("Book now"); });
        document.getElementById("bookingAvailability").textContent = translate(payload.enabled
          ? "Secure payment is handled by Stripe. All event times are shown in Japan time."
          : "Sample 2027 dates and prices are shown while the first season is being planned. Secure checkout will open once the schedule and Stripe account are configured.");
      } catch (error) {
        console.error("Could not check secure checkout status:", error);
        checkoutEnabled = false;
        document.getElementById("bookingAvailability").textContent = translate("Secure checkout is temporarily unavailable. Please try again later.");
      }
    };
    const showBookingDialog = (card) => {
      const details = document.getElementById("bookingDetails");
      details.textContent = `${card.querySelector("h3").textContent} · ${card.querySelector(".event-meta").innerText.replace(/\n/g, " · ")} · ${card.querySelector(".event-price b").textContent} ${translate("/ person")}`;
      const form = document.getElementById("bookingForm");
      form.reset();
      form.dataset.eventName = card.querySelector("h3").textContent;
      const message = form.querySelector(".form-message");
      message.style.display = "none";
      message.classList.remove("error");
      document.getElementById("bookingDialog").showModal();
    };
    const continuePendingBooking = () => {
      if (!pendingBookingCard) return false;
      const card = pendingBookingCard;
      pendingBookingCard = null;
      if (!checkoutEnabled) {
        toast(translate("Secure checkout is not ready yet. Please try again later."));
        return true;
      }
      showBookingDialog(card);
      return true;
    };
    bookingButtons.forEach((button) => button.addEventListener("click", () => {
      const card = button.closest(".event-card");
      if (!signedInUser) {
        pendingBookingCard = card;
        const form = document.getElementById("loginForm");
        form.reset();
        setAuthMode("login");
        document.getElementById("loginDialog").showModal();
        return;
      }
      if (!checkoutEnabled) {
        toast(translate("Secure checkout is not ready yet. Please try again later."));
        return;
      }
      showBookingDialog(card);
    }));
    document.querySelectorAll("[data-tea-menu]").forEach((button) => button.addEventListener("click", () => {
      document.getElementById("teaMenuDialog").showModal();
    }));
    document.getElementById("bookTeaCeremony").addEventListener("click", () => {
      document.getElementById("teaMenuDialog").close();
      document.querySelector('[data-event="Kyoto tea ceremony and seasonal sweets"] .book-button').click();
    });
    document.getElementById("bookingForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = form.querySelector(".form-message");
      if (!form.reportValidity()) {
        message.textContent = translate("Enter your name and a valid email address to continue.");
        message.classList.add("error");
        message.style.display = "block";
        return;
      }
      const submitButton = form.querySelector("[type='submit']");
      const formData = new FormData(form);
      message.classList.remove("error");
      message.style.display = "block";
      message.textContent = translate("Opening secure Stripe checkout…");
      submitButton.disabled = true;
      try {
        const payload = await accountApiRequest("/api/checkout", {
          method: "POST",
          body: JSON.stringify({
            event: form.dataset.eventName,
            name: formData.get("name"),
            email: formData.get("email"),
            guests: Number.parseInt(formData.get("guests"), 10),
            language: formData.get("language")
          })
        });
        const checkoutUrl = new URL(payload.checkout_url);
        if (checkoutUrl.protocol !== "https:" || checkoutUrl.hostname !== "checkout.stripe.com") {
          throw new Error("Stripe returned an invalid checkout destination.");
        }
        window.location.assign(checkoutUrl.href);
      } catch (error) {
        console.error("Could not start Stripe checkout:", error);
        message.textContent = translate(error.message);
        message.classList.add("error");
      } finally {
        submitButton.disabled = false;
      }
    });
    document.getElementById("loginTab").addEventListener("click", () => setAuthMode("login"));
    document.getElementById("registerTab").addEventListener("click", () => setAuthMode("register"));
    document.querySelectorAll("[data-password-toggle]").forEach((button) => button.addEventListener("click", () => {
      const password = document.getElementById(button.getAttribute("aria-controls"));
      const isVisible = password.type === "password";
      password.type = isVisible ? "text" : "password";
      button.setAttribute("aria-pressed", String(isVisible));
      button.setAttribute("aria-label", translate(isVisible ? "Hide password" : "Show password"));
    }));
    document.getElementById("loginButton").addEventListener("click", async () => {
      if (signedInUser) {
        try {
          await accountApiRequest("/api/logout", { method: "POST", body: "{}" });
          signedInUser = null;
          renderAuthButton();
          toast(translate("You have been logged out."));
        } catch (error) {
          console.error("Account logout failed:", error);
          toast(error.message.includes("fetch") ? translate("The local account server is offline. Your session was not changed.") : translate(error.message));
        }
        return;
      }
      const form = document.getElementById("loginForm");
      form.reset();
      setAuthMode("login");
      document.getElementById("loginDialog").showModal();
    });
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const isRegistering = document.getElementById("registerTab").getAttribute("aria-selected") === "true";
      const submitButton = document.getElementById("authSubmit");
      try {
        submitButton.disabled = true;
        submitButton.textContent = translate(isRegistering ? "Creating account…" : "Signing in…");
        if (isRegistering) {
          const name = document.getElementById("registerName").value.trim();
          const confirmation = document.getElementById("confirmPassword").value;
          if (password.length < 8) {
            setAuthMessage(translate("Choose a password with at least 8 characters."), true);
            return;
          }
          if (password !== confirmation) {
            setAuthMessage(translate("Those passwords don't match. Please check and try again."), true);
            return;
          }
          const payload = await accountApiRequest("/api/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password })
          });
          signedInUser = payload.user;
          renderAuthButton();
          document.getElementById("loginDialog").close();
          if (!continuePendingBooking()) {
            toast(translate("Welcome to TableMates, {name}! Your member ID is {id}.").replace("{name}", signedInUser.name).replace("{id}", signedInUser.id));
          }
          return;
        }
        const payload = await accountApiRequest("/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        });
        signedInUser = payload.user;
        renderAuthButton();
        document.getElementById("loginDialog").close();
        if (!continuePendingBooking()) {
          toast(translate("Welcome back to TableMates, {name}!").replace("{name}", signedInUser.name));
        }
      } catch (error) {
        console.error("Account sign-in failed:", error);
        setAuthMessage(error.message.includes("fetch")
          ? translate("The local account server is offline. Run python server.py in the project folder, then try again.")
          : translate(error.message), true);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = translate(document.getElementById("registerTab").getAttribute("aria-selected") === "true" ? "Create account" : "Log in");
      }
    });
    const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    const renderCommunityPosts = (posts) => {
      const feed = document.getElementById("communityFeed");
      if (!posts.length) {
        const emptyState = document.createElement("p");
        emptyState.className = "community-empty";
        emptyState.textContent = translate("No community stories yet. Be the first to share a table moment.");
        feed.replaceChildren(emptyState);
        return;
      }
      feed.replaceChildren(...posts.map((post) => {
        const article = document.createElement("article");
        article.className = "community-post";
        const media = post.media_type.startsWith("video/")
          ? document.createElement("video")
          : document.createElement("img");
        media.className = "community-post-media";
        media.src = post.media_url;
        if (media instanceof HTMLVideoElement) {
          media.controls = true;
          media.preload = "metadata";
          media.playsInline = true;
        } else {
          media.alt = post.caption;
          media.loading = "lazy";
        }
        const body = document.createElement("div");
        body.className = "community-post-body";
        const meta = document.createElement("div");
        meta.className = "community-post-meta";
        const author = document.createElement("strong");
        author.textContent = post.name;
        const timeLabel = document.createElement("time");
        const createdAt = new Date(post.created_at);
        timeLabel.textContent = Number.isNaN(createdAt.getTime())
          ? ""
          : createdAt.toLocaleDateString(languageLocales[document.getElementById("languageSelect").value]);
        meta.append(author, timeLabel);
        const caption = document.createElement("p");
        caption.textContent = post.caption;
        const report = document.createElement("a");
        report.className = "community-report";
        report.href = `mailto:hello@tablemates.jp?subject=${encodeURIComponent("Request to remove a community post")}&body=${encodeURIComponent(`Post ID: ${post.id}`)}`;
        report.textContent = translate("Report or request removal");
        body.append(meta, caption, report);
        article.append(media, body);
        return article;
      }));
    };
    const loadCommunityPosts = async () => {
      const feed = document.getElementById("communityFeed");
      if (!feed) return;
      try {
        const response = await accountApiRequest("/api/community");
        renderCommunityPosts(response.posts);
      } catch (error) {
        console.error("Could not load community posts:", error);
        feed.textContent = translate("Community stories could not be loaded. Please try again later.");
      }
    };
    const showCheckoutReturn = async () => {
      const params = new URLSearchParams(window.location.search);
      const checkoutNotice = document.getElementById("checkoutNotice");
      const outcome = params.get("checkout");
      if (outcome === "cancelled") {
        checkoutNotice.textContent = translate("Checkout was cancelled. No payment was taken.");
        checkoutNotice.hidden = false;
        window.history.replaceState({}, "", `${window.location.pathname}#experiences`);
        return;
      }
      if (outcome !== "success") return;
      const sessionId = params.get("session_id");
      checkoutNotice.textContent = translate("Checking your payment with Stripe…");
      checkoutNotice.hidden = false;
      window.history.replaceState({}, "", `${window.location.pathname}#home`);
      if (!sessionId) {
        checkoutNotice.textContent = translate("We couldn't verify the checkout session. Check your Stripe receipt before trying again.");
        checkoutNotice.classList.add("error");
        return;
      }
      try {
        let result;
        for (let attempt = 0; attempt < 3; attempt += 1) {
          result = await accountApiRequest(`/api/checkout/confirm?${new URLSearchParams({ session_id: sessionId })}`);
          if (result.status === "paid") break;
          await new Promise((resolve) => window.setTimeout(resolve, 1200));
        }
        checkoutNotice.textContent = result.status === "paid"
          ? translate("Payment confirmed for {event}. Your place is reserved for {date}.").replace("{event}", result.booking.event_name).replace("{date}", result.booking.event_date)
          : translate("Your payment is still being confirmed. Check your Stripe receipt before trying again.");
        checkoutNotice.classList.toggle("error", result.status !== "paid");
      } catch (error) {
        console.error("Could not verify the checkout return:", error);
        checkoutNotice.textContent = translate("We couldn't verify your payment yet. Check your Stripe receipt before trying again.");
        checkoutNotice.classList.add("error");
      }
    };
    document.getElementById("mediaForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = document.getElementById("mediaMessage");
      const submitButton = document.getElementById("mediaSubmit");
      if (!signedInUser) {
        message.textContent = translate("Log in or create an account before sharing a photo or video.");
        message.classList.add("error");
        message.style.display = "block";
        setAuthMode("login");
        document.getElementById("loginDialog").showModal();
        return;
      }
      if (!form.reportValidity()) return;
      const file = form.elements.media.files[0];
      const allowedSizes = {
        "image/jpeg": 5 * 1024 * 1024,
        "image/png": 5 * 1024 * 1024,
        "image/webp": 5 * 1024 * 1024,
        "video/mp4": 20 * 1024 * 1024,
        "video/webm": 20 * 1024 * 1024
      };
      if (!file || !allowedSizes[file.type] || file.size > allowedSizes[file.type]) {
        message.textContent = translate("Choose a JPEG, PNG, or WebP photo up to 5 MB, or an MP4 or WebM video up to 20 MB.");
        message.classList.add("error");
        message.style.display = "block";
        return;
      }
      message.classList.remove("error");
      message.textContent = translate("Sharing your story…");
      message.style.display = "block";
      submitButton.disabled = true;
      try {
        const response = await fetch("/api/community", {
          method: "POST",
          credentials: "same-origin",
          body: new FormData(form)
        });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Your post could not be shared.");
        form.reset();
        message.textContent = translate("Your post is now public. Thanks for sharing!");
        await loadCommunityPosts();
      } catch (error) {
        console.error("Could not share community media:", error);
        message.textContent = translate(error.message);
        message.classList.add("error");
      } finally {
        submitButton.disabled = false;
      }
    });
    const renderComments = (rows) => {
      const list = document.getElementById("commentsList");
      if (!rows.length) {
        list.textContent = translate("Be the first to share a helpful note about this experience.");
        return;
      }
      list.innerHTML = rows.map((item) => {
        const createdAt = new Date(item.created_at);
          const locale = languageLocales[document.getElementById("languageSelect").value];
          const dateLabel = Number.isNaN(createdAt.getTime()) ? "" : createdAt.toLocaleDateString(locale);
          return `<article class="comment"><strong>${escapeHtml(item.name)}</strong><span class="comment-stars" aria-label="${item.rating} ${escapeHtml(translate("out of 5 stars"))}"> ${"★".repeat(item.rating)}${"☆".repeat(5 - item.rating)}</span><time>${escapeHtml(dateLabel)}</time><p>${escapeHtml(item.comment)}</p></article>`;
      }).join("");
    };
    const updateReviewCount = (eventName, count) => {
      const card = Array.from(document.querySelectorAll(".event-card")).find((item) => item.dataset.event === eventName);
      if (card) card.querySelector("[data-review-count]").textContent = String(count);
    };
    const loadCommentCounts = async () => {
      const cards = Array.from(document.querySelectorAll(".event-card"));
      await Promise.all(cards.map(async (card) => {
        try {
          const params = new URLSearchParams({ event: card.dataset.event });
          const response = await accountApiRequest(`/api/comments?${params}`);
          updateReviewCount(card.dataset.event, response.count);
        } catch (error) {
          console.error(`Could not load review count for ${card.dataset.event}:`, error);
        }
      }));
    };
    document.querySelectorAll("[data-comments]").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      const card = link.closest(".event-card");
      const eventName = card.dataset.event;
      currentCommentsEvent = eventName;
      document.getElementById("commentsTitle").textContent = translate("Table stories");
      document.getElementById("commentsEventName").textContent = card.querySelector("h3").textContent;
      const form = document.getElementById("commentForm");
      const formMessage = form.querySelector(".form-message");
      const availability = document.getElementById("commentsAvailability");
      const japanToday = new Intl.DateTimeFormat("sv-SE", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());
      const eventHasPassed = card.dataset.date < japanToday;
      form.reset();
      form.hidden = !eventHasPassed;
      formMessage.style.display = "none";
      availability.classList.remove("error");
      availability.textContent = eventHasPassed
        ? translate("Reviews are open. Please share a helpful, respectful note.")
        : translate("You can share a story after the event date.");
      document.getElementById("commentsList").textContent = translate("Loading stories…");
      document.getElementById("commentsDialog").showModal();
      const params = new URLSearchParams({ event: eventName });
      accountApiRequest(`/api/comments?${params}`)
        .then((response) => {
          if (currentCommentsEvent === eventName) renderComments(response.comments);
        })
        .catch((error) => {
          console.error("Could not load event comments:", error);
          if (currentCommentsEvent !== eventName) return;
          document.getElementById("commentsList").textContent = translate("Stories could not be loaded. Please try again.");
          availability.textContent = translate(error.message);
          availability.classList.add("error");
        });
    }));
    document.getElementById("commentForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const formData = new FormData(form);
      const eventName = currentCommentsEvent;
      const message = form.querySelector(".form-message");
      const submitButton = form.querySelector("[type='submit']");
      submitButton.disabled = true;
      message.style.display = "block";
      message.classList.remove("error");
      message.textContent = translate("Saving your story…");
      try {
        await accountApiRequest("/api/comments", {
          method: "POST",
          body: JSON.stringify({
            event: eventName,
            name: formData.get("name"),
            rating: Number(formData.get("rating")),
            comment: formData.get("comment")
          })
        });
        const params = new URLSearchParams({ event: eventName });
        const response = await accountApiRequest(`/api/comments?${params}`);
        if (currentCommentsEvent === eventName) renderComments(response.comments);
        updateReviewCount(eventName, response.count);
        form.reset();
        message.textContent = translate("Thanks for sharing your story.");
      } catch (error) {
        console.error("Could not save event comment:", error);
        message.textContent = translate(error.message);
        message.classList.add("error");
      } finally {
        submitButton.disabled = false;
      }
    });
    document.getElementById("languageSelect").addEventListener("change", (event) => {
      const language = event.target.value;
      localizePage(language);
      applyEventFilters();
      updateAccountServerStatus(accountServerConnected);
      if (document.getElementById("commentsDialog").open && currentCommentsEvent) {
        document.getElementById("commentsTitle").textContent = translate("Table stories");
        const card = Array.from(document.querySelectorAll(".event-card")).find((item) => item.dataset.event === currentCommentsEvent);
        if (card) document.getElementById("commentsEventName").textContent = card.querySelector("h3").textContent;
        const params = new URLSearchParams({ event: currentCommentsEvent });
        accountApiRequest(`/api/comments?${params}`).then((response) => renderComments(response.comments));
      }
      renderAuthButton();
      refreshSignedInUser();
    });
    localizePage(document.getElementById("languageSelect").value);
    renderAuthButton();
    const pageByTargetId = {
      home: "home",
      experiences: "experiences",
      services: "experiences",
      community: "community",
      about: "about",
    };
    const pageForCurrentHash = () => pageByTargetId[window.location.hash.slice(1)] || "home";
    const showPage = (page, updateHistory = true) => {
      document.body.dataset.currentPage = page;
      document.querySelectorAll("[data-page-view]").forEach((view) => {
        view.hidden = view.dataset.pageView !== page;
      });
      document.querySelectorAll("#navLinks a").forEach((link) => {
        const isActive = pageByTargetId[link.hash.slice(1)] === page;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
      if (updateHistory && window.location.hash !== `#${page}`) {
        window.history.pushState({ page }, "", `#${page}`);
      }
      window.scrollTo(0, 0);
    };
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const page = pageByTargetId[link.hash.slice(1)];
      if (!page) return;
      event.preventDefault();
      showPage(page);
    });
    window.addEventListener("popstate", () => showPage(pageForCurrentHash(), false));
    showPage(pageForCurrentHash(), false);
    const menuToggle = document.getElementById("menuToggle");
    menuToggle.addEventListener("click", () => {
      const open = document.getElementById("navLinks").classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });
    document.querySelectorAll("#navLinks a").forEach((link) => link.addEventListener("click", () => {
      document.getElementById("navLinks").classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    }));
    applyEventFilters();
    loadCommentCounts();
    loadCommunityPosts();
    refreshBookingAvailability();
    showCheckoutReturn();
