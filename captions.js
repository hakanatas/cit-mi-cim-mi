/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Nokta’nın bahçesi 8 m’ye 5 m', en: 'Nokta’s garden is 8 m by 5 m',
      note: 'Nokta’nın dikdörtgen biçiminde bir bahçesi var. Uzun kenarı 8 metre, kısa kenarı 5 metre.' },
    { scene: 2, start: 10.6, end: 16.4, tr: 'Etrafına çit çekecek, içine çim ekecek', en: 'A fence goes around it, grass goes inside',
      note: 'Nokta bahçenin etrafına çit çekmek, içine de çim ekmek istiyor. İki soru var: Kaç metre çit lazım? Kaç metrekare çim lazım?' },
    { scene: 2, start: 16.8, end: 21.4, tr: 'Önce anla: çit etrafı sarar, çim içini kaplar', en: 'First understand: fence goes around, grass covers the inside',
      note: 'Çözmeden önce soruyu anlayalım. Çit bahçenin etrafını sarıyor; çim ise bahçenin içini kaplıyor.' },
    { scene: 2, start: 21.8, end: 25.6, tr: 'Çit için çevre, çim için alan lazım', en: 'The fence needs the perimeter, the grass needs the area',
      note: 'Demek ki çit için çevre uzunluğunu, çim için alanı bulmalıyız.' },
    { scene: 3, start: 26.4, end: 29.8, tr: 'Önce tahmin edelim: 25 m kadar', en: 'Let’s guess first: about 25 m',
      note: 'Önce bir tahmin yapalım. Kenarlar 8 ve 5; çit 25 metre kadar tutar gibi.' },
    { scene: 3, start: 30.2, end: 34.4, tr: 'Çit: 8 + 5 + 8 + 5 = 26 m', en: 'Fence: 8 + 5 + 8 + 5 = 26 m',
      note: 'Şimdi çözelim. İpi bahçenin etrafında dolaştıralım: 8 artı 5 artı 8 artı 5, 26 metre. Tahminimize çok yakın.' },
    { scene: 3, start: 34.8, end: 40.2, tr: 'Çim: 8’erli 5 sıra, 8 × 5 = 40 m²', en: 'Grass: 5 rows of 8, 8 × 5 = 40 m²',
      note: 'Çim için bahçeyi 1 metrekarelik karelerle dolduralım. Her sırada 8 kare, 5 sıra var: 8 çarpı 5, 40 metrekare.' },
    { scene: 3, start: 40.6, end: 45.6, tr: 'Kontrol: 2 × (8 + 5) de 26 eder', en: 'Check: 2 × (8 + 5) is also 26',
      note: 'Sonucu başka bir yolla kontrol edelim. Uzun ve kısa kenarı toplayıp ikiyle çarparsak da 26 buluruz. Çözüm doğru.' },
    { scene: 4, start: 46.6, end: 50.8, tr: 'Şimdi fayans ustasıyız: taban 24 m², bir kenarı 6 m', en: 'Now we’re tilers: the floor is 24 m², one side is 6 m',
      note: 'Şimdi fayans ustası olalım. Bir odanın tabanı 24 metrekare, bir kenarı 6 metre. Duvar diplerine süpürgelik takılacak. Kaç metre süpürgelik lazım?' },
    { scene: 4, start: 51.2, end: 55.8, tr: 'Fayansları 6’şar dizelim: 4 sıra oldu', en: 'Lay the tiles 6 per row: that makes 4 rows',
      note: 'Diğer kenarı bilmiyoruz. Fayansları 6’şar 6’şar dizelim: 6, 12, 18, 24. Dört sıra oldu. Kısa yoldan: 24 bölü 6, 4 metre.' },
    { scene: 4, start: 56.2, end: 60.6, tr: 'Süpürgelik etrafı sarar: 6 + 4 + 6 + 4 = 20 m', en: 'The skirting goes around: 6 + 4 + 6 + 4 = 20 m',
      note: 'Süpürgelik odanın etrafını sarar, yani çevreyi buluyoruz: 6 artı 4 artı 6 artı 4, 20 metre.' },
    { scene: 4, start: 61.0, end: 67.4, tr: 'Kontrol: 6 × 4 = 24 m², doğru!', en: 'Check: 6 × 4 = 24 m², correct!',
      note: 'Kontrol edelim: 6 çarpı 4, 24 metrekare. Verilen alanla aynı; çözümümüz doğru.' },
    { scene: 5, start: 68.6, end: 73.8, tr: 'Etrafı soruluyorsa çevre, içi soruluyorsa alan', en: 'Around it? Perimeter. Inside it? Area.',
      note: 'Bunu başka problemlere de uygulayabiliriz. Çit, süpürgelik, çerçeve etrafı sarar: çevre. Çim, fayans, halı içini kaplar: alan.' },
    { scene: 5, start: 74.2, end: 79.6, tr: 'Anla, çiz, tahmin et, çöz, kontrol et', en: 'Understand, draw, guess, solve, check',
      note: 'Problem çözerken adımlarımız: anla, şeklini çiz, tahmin et, çöz ve kontrol et.' },
    { scene: 6, start: 80.6, end: 86.2, tr: 'Her problemde önce ne sorulduğunu anla', en: 'In every problem, first understand what is asked',
      note: 'Her problemde önce ne sorulduğunu anlayalım: etrafı mı, içi mi?' },
    { scene: 6, start: 86.6, end: 91.0, tr: 'Çit çevreyle, çim alanla bulunur', en: 'Fence: perimeter. Grass: area.',
      note: 'Çit çevreyle, çim alanla bulunur. Çit mi, çim mi? Sen de artık biliyorsun!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
