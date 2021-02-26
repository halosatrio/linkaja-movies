const Footer = () => {
  return (
    <footer className="mt-12 font-sans h-20 flex justify-center items-center text-sm border-t border-gray-400">
      <p>
        by ⚡ {" "}
        <a
          href="https://github.com/halosatrio"
          target="_blank"
          className="no-underline font-semibold hover:text-gray-700 text-red-600 hover:underline"
        >
           Satrio
        </a>{" "}
        | using {" "}
        <a
          href="https://nextjs.org"
          className="no-underline font-semibold hover:text-gray-700 text-red-600 hover:underline"
        >
          Next.js{" "}
        </a>
        | visit the {" "}
        <a
          href="https://github.com/halosatrio/linkaja-movies"
          className="no-underline font-semibold hover:text-gray-700 text-red-600 hover:underline"
        >
          Project Repo
        </a>
      </p>
    </footer>
  )
}

export default Footer
