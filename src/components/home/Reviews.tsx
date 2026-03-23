import styles from './Reviews.module.css';

const reviews = [
  {
    name: 'Ayşe K.',
    initials: 'AK',
    rating: 5,
    text: 'Ethiopia Yirgacheffe muhteşem bir kahve. Çiçeksi aroması ve dengeli asidiliği ile her sabah keyifle içiyorum. Kargo da çok hızlı geldi!',
    date: '2 hafta önce',
  },
  {
    name: 'Mehmet T.',
    initials: 'MT',
    rating: 5,
    text: 'Hario V60 setini aldım, kalitesi mükemmel. Kahve demleme deneyimimi tamamen değiştirdi. Kesinlikle tavsiye ederim.',
    date: '1 ay önce',
  },
  {
    name: 'Zeynep D.',
    initials: 'ZD',
    rating: 4,
    text: "Colombia Supremo'nun karamel notaları gerçekten harika. Teslimat hızlı, paketleme özenli. Tek eksik daha fazla çeşit olması.",
    date: '3 hafta önce',
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? '#c8973a' : 'none'}
      stroke="#c8973a"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>
        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.name} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.avatar}>{review.initials}</div>
                <div>
                  <div className={styles.name}>{review.name}</div>
                  <div className={styles.date}>{review.date}</div>
                </div>
              </div>
              <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>
              <p className={styles.text}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
