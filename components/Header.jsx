import Link from "next/link"

const Header = (props) => {
  return (
    props.isHome ? (
      <h1 className="text-center mb-8 text-3xl font-semibold tracking-wider text-red-400">LinkAja Movies Database</h1>
    ) : (
      <div className="border-b border-gray-500 max-w-2xl">
        <Link href="/" passHref>
          <a>
        <h1 className=" text-red-400 text-center py-3 hover:text-gray-700 text-md font-medium tracking-wide">LinkAja Movies Database</h1>
          </a>
        </Link>
      </div>
    )
  )
}

export default Header
