/**
 * FerdiNet - Gündəlik borc/bağlanma bildirişi
 * Hər gün saat 09:00 (Asia/Baku) işə düşür.
 * Bağlanma tarixinə 3 gün qalan müştəriləri tapır və "mail" kolleksiyasına
 * email sənədi yazır (Firebase "Trigger Email" əlavəsi bunu oxuyub göndərir).
 */

const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore("ferdinet");

exports.dailyDisconnectWarning = onSchedule(
  { schedule: "0 9 * * *", timeZone: "Asia/Baku" },
  async (event) => {
    const now = new Date();
    const targetDate = new Date(now);
    targetDate.setDate(targetDate.getDate() + 3);

    // 3 gün sonrakı günün başlanğıcı və sonu (saat fərqlərini əhatə etmək üçün)
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const snap = await db
      .collection("customers")
      .where("baglanmaTarixi", ">=", Timestamp.fromDate(startOfDay))
      .where("baglanmaTarixi", "<=", Timestamp.fromDate(endOfDay))
      .get();

    if (snap.empty) {
      console.log("Bu gün üçün bildiriş tələb edən müştəri yoxdur.");
      return;
    }

    const jobs = [];

    snap.forEach((doc) => {
      const d = doc.data();
      if (!d.email) {
        console.log(`Müştəri ${d.abonentKod} üçün email ünvanı yoxdur, keçildi.`);
        return;
      }
      // Artıq bağlı və ya bildiriş göndərilmiş müştəriləri ötür
      if (d.status === "bagli") return;

      const baglanma = d.baglanmaTarixi.toDate();
      const tarixStr = baglanma.toLocaleDateString("az-AZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const balans = typeof d.balans === "number" ? d.balans : 0;

      const mailDoc = {
        to: [d.email],
        message: {
          subject: "FerdiNet — Xidmətinizin bağlanmasına 3 gün qalıb",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f2faf3;border-radius:12px">
              <h2 style="color:#1f7a38;margin-bottom:6px">FerdiNet</h2>
              <p>Hörmətli ${d.ad || "Müştəri"},</p>
              <p>
                <strong>${d.abonentKod}</strong> nömrəli abunəliyinizin xidməti
                <strong>${tarixStr}</strong> tarixində bağlanacaq.
              </p>
              ${
                balans < 0
                  ? `<p style="color:#b42318"><strong>Hazırkı borcunuz: ${Math.abs(balans).toFixed(2)} ₼</strong></p>`
                  : ""
              }
              <p>Xidmətin kəsilməməsi üçün, xahiş edirik ödənişi vaxtında edin.</p>
              <p style="margin-top:24px">
                <a href="https://samir210-az.github.io/FerdiNet/kabinet.html"
                   style="background:#2e9e4d;color:#fff;padding:10px 22px;border-radius:50px;text-decoration:none;font-weight:600">
                  Şəxsi Kabinetə Keç
                </a>
              </p>
              <p style="margin-top:24px;font-size:.85rem;color:#5d7568">
                Hörmətlə,<br>FerdiNet komandası
              </p>
            </div>
          `,
        },
      };

      jobs.push(db.collection("mail").add(mailDoc));
      console.log(`Bildiriş hazırlanır: ${d.email} (${d.abonentKod})`);
    });

    await Promise.all(jobs);
    console.log(`${jobs.length} bildiriş "mail" kolleksiyasına yazıldı.`);
  }
);
