import styles from './Marquee.module.css'

export function Marquee({ text, id }: { text: string; id: string }) {
  const items = Array.from({ length: 4 }, (_, index) => index)
  return (
    <div className={styles.marquee}>
      <h2 id={id} className="visually-hidden">
        {text}
      </h2>
      <div className={styles.track} aria-hidden="true">
        {items.map((index) => (
          <span key={index} className={styles.item}>
            {text}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
