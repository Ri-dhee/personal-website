export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>&copy; {new Date().getFullYear()} Rinzin Dorji. All rights reserved.</p>
        <p>
          Writing on{' '}
          <a href="https://abetterlifelearning.blogspot.com" target="_blank" rel="noopener noreferrer">
            Reading Venture
          </a>
        </p>
      </div>
    </footer>
  )
}
