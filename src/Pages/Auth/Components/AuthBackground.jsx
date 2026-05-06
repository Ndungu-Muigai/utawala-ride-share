const AuthBackground = () => (
    <>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(245,240,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute -top-24 -right-24 w-150 h-150 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,104,216,0.2) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-12 left-[10%] w-100 h-100 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,104,216,0.1) 0%, transparent 70%)" }} />
    </>
)

export default AuthBackground