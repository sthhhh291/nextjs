import Navbar from "./report-nav"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}